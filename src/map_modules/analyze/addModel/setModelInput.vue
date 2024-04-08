<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center" justify="start">
                <p class="font-weight-bold pr-4">{{processName}}</p>
            </v-row>
        </v-toolbar>
        <div style="height: calc(100% - 48px);overflow-y: hidden" class="bg-grey-lighten-2">
            <v-row class="ma-0 pa-0 " style="height:100%;width:100%;overflow-y: auto" justify="center" align="center">
                <v-col cols="12" sm="7" style="height: 100%;">
                    <v-row v-for="(menu,index) in processMenuInput" :key="index"
                           class="ma-0 pa-0 my-5 rounded-lg elevation-3 border bg-white myForm"
                           style="height:40%;min-height:160px;position: relative" align="center">
                        <v-btn size="small" variant="flat" class="rounded" color="dark_blue"
                               style="position:absolute;top:-10px;right:15px;font-size: 13px">
                            {{menu.topic}}
                        </v-btn>
                        <div style="height: 22px;width: 100%"></div>

                        <div v-if="menu.type==='features'" style="height:calc(100% - 55px);width:100%;overflow-y: auto"
                             class="d-flex align-center">
                            <v-radio-group density="compact" class="font-weight-bold mr-2" color="dark_blue"
                                           v-model="menu.addType">
                                <v-radio label="انتخاب لایه مد نظر" :value="processInputInputType.Layer"></v-radio>
                                <v-radio label="انتخاب خروجی پردازش شده مدل دیگر"
                                         :value="processInputInputType.Model"></v-radio>
                                <v-radio :disabled="true" label="انتخاب از طریق API" :value="processInputInputType.Api"></v-radio>
                            </v-radio-group>
                        </div>
                        <div v-if="menu.type==='number'" style="height:calc(100% - 55px);width:100%;overflow-y: auto"
                             class="d-flex align-center">
                            <v-radio-group density="compact" class="font-weight-bold mr-2" color="dark_blue"
                                           v-model="menu.addType">
                                <v-radio label="مقدار دهی دستی" :value="processInputInputType.Number">
                                </v-radio>

                                <v-radio :disabled="true" label="انتخاب از طریق API" :value="processInputInputType.Api"></v-radio>
                            </v-radio-group>
                        </div>
                        <div v-if="menu.type==='feature'" style="height:calc(100% - 55px);width:100%;overflow-y: auto"
                             class="d-flex align-center">
                            <v-radio-group density="compact" class="font-weight-bold mr-2" color="dark_blue"
                                           v-model="menu.addType">
                                <v-radio label="ترسیم عارضه" :value="processInputInputType.Feature"></v-radio>
                                <v-radio label="انتخاب خروجی پردازش شده مدل دیگر"
                                         :value="processInputInputType.Model"></v-radio>
                                <v-radio :disabled="true" label="انتخاب از طریق API" :value="processInputInputType.Api"></v-radio>
                            </v-radio-group>
                        </div>

                        <v-spacer></v-spacer>
                        <v-row class="ma-0 pa-0" style="height: 30px" align="center" justify="end">
                            <v-btn @click="showFilterDialog(menu.addType)" class="ml-2 font-weight-bold"
                                   color="dark_blue"
                                   size="x-small" variant="tonal">
                                تنظیمات ورودی
                            </v-btn>
                        </v-row>
                    </v-row>


                    <div style="height: 10px"></div>

                </v-col>
            </v-row>
        </div>

        <simple-dialog
                :show="filterDialog"
                topic="تنظیمات ورودی"
                width="60vw"
                height="80vh"
                :current_height="'80vh'"
                @closeDialog="()=>{
                    filterDialog = false
                    router.push({name:'setModelInput'})
                }"
                class="bg-grey-lighten-2"
        >
            <div style="height: 100%;width:100%;overflow-y: hidden">
                <router-view @getFeaturesData="getFeaturesData"></router-view>
            </div>
        </simple-dialog>


    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref, watch} from "vue";
    import Feature from 'ol/Feature.js';
    import {useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import {useToast} from "primevue/usetoast";
    import {
        AddAnalyze,
        GetLayerInputFeaturesData, ModelInput,
        ProcessInput,
        ProcessInputInputType
    } from "@/models/Analyze.interface";
    import featureBC, {featureBCEnums} from "@/broadcast/featureBroadcast";
    import source_functions from "@/components/openLayers/componentFunctions/source";


    export default defineComponent({
        name: "SetModelInputComponent",
        components: {SimpleDialog},
        setup() {
            const store = useStore()
            const toast = useToast()
            const router = useRouter()
            const route = useRoute()

            const {featureBroadcast} = featureBC()
            const {getGeometryFromFeatures,geometryToJson} = source_functions()

            const processInputType = ref<any>(null)
            const processMenuInput = ref<ModelInput[]>([])
            const processInputInputType = ProcessInputInputType
            const processName = ref('')
            const filterDialog = ref(false)
            const activeInputAddType = ref<ProcessInputInputType>()

            onMounted(() => {
                if (route.params.inputType && route.params.processName) {
                    processInputType.value = route.params.inputType
                    setProcessMenuInput(processInputType.value)
                    processName.value = String(route.params.processName)
                } else {
                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'عملگر مشخص نیست'
                    });
                    router.go(-1)
                }
            })

            watch(featureBroadcast, (item) => {
                if (item.id === 'modelDrawFeature') {
                    filterDialog.value = false
                    if (item.value){
                        const geometry = getGeometryFromFeatures(item.value)
                        const geometryStr = geometryToJson(geometry)
                        console.log(geometryStr,'draw feature string')

                        processMenuInput.value.map((item)=>{
                            if (item.addType === activeInputAddType.value){
                                item.value = {
                                    type:'draw',
                                    data:geometryStr
                                }
                            }
                        })

                        router.push({name:'setModelInput'})
                    }


                }
            })

            function setProcessMenuInput(value: any) {
                processMenuInput.value = []
                if (value === ProcessInput.FeaturesAndFeature) {
                    processMenuInput.value.push({
                        topic: 'چند عارضه',
                        type: 'features',
                        value: null,
                        addType: ProcessInputInputType.Layer
                    })

                    processMenuInput.value.push({
                        topic: 'عارضه',
                        type: 'feature',
                        value: null,
                        addType: ProcessInputInputType.Feature
                    })
                } else if (value === ProcessInput.Features) {
                    processMenuInput.value.push({
                        topic: 'چند عارضه',
                        type: 'features',
                        value: null,
                        addType: ProcessInputInputType.Layer
                    })
                } else {
                    processMenuInput.value.push({
                        topic: 'چند عارضه',
                        type: 'features',
                        value: null,
                        addType: ProcessInputInputType.Layer
                    })
                    processMenuInput.value.push({
                        topic: 'مقدار عددی',
                        type: 'number',
                        value: null,
                        addType: ProcessInputInputType.Number
                    })
                }
            }

            return {
                store, router, toast, processMenuInput, processInputInputType, processName, filterDialog,activeInputAddType
            }
        },
        data() {
            return {};
        },
        props: {},

        methods: {
            showFilterDialog(type: ProcessInputInputType) {
                if (type === ProcessInputInputType.Layer) {
                    this.filterDialog = true
                    this.activeInputAddType =ProcessInputInputType.Layer
                    setTimeout(() => {
                        this.router.push({name: 'selectLayer'})
                    }, 200)
                } else if (type === ProcessInputInputType.Model) {
                    this.filterDialog = true
                    this.activeInputAddType =ProcessInputInputType.Model
                    setTimeout(() => {
                        this.router.push({name: 'modelInput'})
                    }, 200)
                } else if (type === ProcessInputInputType.Number) {
                    this.activeInputAddType =ProcessInputInputType.Number
                    this.filterDialog = true
                    setTimeout(() => {
                        this.router.push({name: 'numberInput'})
                    }, 200)
                } else if (type === ProcessInputInputType.Feature) {
                    this.filterDialog = true
                    this.activeInputAddType =ProcessInputInputType.Feature
                    setTimeout(() => {
                        this.router.push({name: 'modelDrawFeature'})
                    }, 200)
                }
            },

            getFeaturesData(data:GetLayerInputFeaturesData){
                
                this.processMenuInput.map((item)=>{
                    if (item.addType === this.activeInputAddType){
                        item.value = data
                    }
                })
                
                this.filterDialog = false
            },

            nextPageFunc(analyze:AddAnalyze){
                let checkFlag = true
                this.processMenuInput.map((item)=>{
                    if (item.value === null){
                        checkFlag = false
                    }
                })

                console.log(this.processMenuInput,'processMenuInput')

                if (checkFlag){
                    analyze.inputs = this.processMenuInput
                    console.log(analyze,'analyze')
                    return{
                        result:true
                    }
                }else {
                    this.toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'تنظیمات ورودی ها اعمال نشده است'
                    });
                    return{
                        result:false
                    }
                }

            }
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
