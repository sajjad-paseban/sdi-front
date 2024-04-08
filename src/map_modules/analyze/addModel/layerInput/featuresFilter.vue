<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class=" myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <p class="font-weight-bold pr-4 header_font">تنظیمات فیلتر</p>

            </v-row>
        </v-toolbar>
        <div style="height: calc(100% - 49px) ;overflow-y: hidden" class="bg-grey-lighten-2">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-fade-transition>
                <v-row class="pa-0 ma-0 "
                       style="overflow-y: auto;height: 100%"
                       justify="center" align="center">

                    <v-col cols="12" sm="10" style="height: 90%;">
                        <v-row class="pa-0 ma-0 bg-blue-lighten-5  rounded-lg elevation-3"
                               :style="mobile?'min-height:280px;':'min-height:130px;'"
                               style="height:25%;">
                            <v-tabs style=";overflow-x: auto" class="rounded-lg "
                                    v-model="filterTab" color="dark_blue" show-arrow>
                                <v-tab class=" font-weight-bold" :value="item.route" v-for="item in items"
                                       :key="item.text">
                                    <!-- <v-icon>mdi-{{ item.icon }}</v-icon> -->
                                    {{ item.text }}
                                </v-tab>
                            </v-tabs>

                            <v-window v-model="filterTab" class="bg-white rounded-b-lg"
                                      style="height: calc(100% - 31px);width: 100%;">


                                <v-form ref="filterFormRef" v-if="filterTab==='metaFilter'"
                                        style="height:100%;width:100%" class="myForm">

                                    <v-row class="ma-0 pa-0 " style="height: calc(100% - 30px);overflow-y: auto"
                                           align="center">
                                        <v-col cols="12" sm="3" style="height: 48px">
                                            <v-autocomplete

                                                    :items="layers.map((item)=>{return item.layer})"
                                                    item-title="name"
                                                    item-value="id"
                                                    v-model="selectedLayer.layer_id"
                                                    density="compact"
                                                    :rules="nameRule"
                                                    @update:modelValue="()=>{selectedLayer.field = null}"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام لایه</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" sm="3" style="height: 48px">
                                            <v-autocomplete
                                                    :disabled="!selectedLayer.layer_id"
                                                    :items="layerFieldsItems"
                                                    item-title="name"
                                                    return-object
                                                    :rules="nameRule"
                                                    v-model="selectedLayer.field"
                                                    @update:modelValue="()=>{selectedLayer.filter = null}"
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام فیلد</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" style="height: 48px" sm="3">
                                            <v-autocomplete
                                                    :disabled="!selectedLayer.field"
                                                    v-model="selectedLayer.filter"
                                                    @update:modelValue="()=>{selectedLayer.filter_value = null}"
                                                    :items="filterItems"
                                                    item-title="p_name"
                                                    return-object
                                                    density="compact"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام فیلتر</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" style="height: 48px" sm="3">

                                            <v-text-field
                                                    v-if="selectedLayer.filter&&selectedLayer.filter.filter_type === filterTypes.String"
                                                    :disabled="!selectedLayer.filter"
                                                    density="compact"
                                                    v-model="selectedLayer.filter_value"
                                                    variant="solo"
                                                    :rules="floatRule"
                                                    required

                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-magnify"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">مقدار شرط فیلتر </p>
                                                </template>
                                            </v-text-field>
                                            <v-text-field
                                                    v-if="selectedLayer.filter&&selectedLayer.filter.filter_type === filterTypes.Float"
                                                    :disabled="!selectedLayer.filter"
                                                    density="compact"
                                                    v-model="selectedLayer.filter_value"
                                                    variant="solo"
                                                    type="number"
                                                    :rules="nameRule"
                                                    required

                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-magnify"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">مقدار شرط فیلتر </p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                    </v-row>
                                    <v-row class="ma-0 pa-0 mx-2 border-t" justify="start">
                                        <v-btn @click="addMetaFilter" size="x-small" color="info mt-1"
                                               style="height: 20px;width:20px">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-form>

                                <v-form ref="filterFormRef" v-if="filterTab==='locationFilter'"
                                        style="height:100%;width:100%"
                                        class="myForm">

                                    <v-row class="ma-0 pa-0 " style="height: calc(100% - 30px);overflow-y: auto"
                                           align="center">
                                        <v-col cols="12" sm="3" style="height: 48px">
                                            <v-autocomplete

                                                    :items="layers.map((item)=>{return item.layer})"
                                                    item-title="name"
                                                    item-value="id"
                                                    v-model="selectedLayer.layer_id"
                                                    density="compact"
                                                    :rules="nameRule"
                                                    @update:modelValue="()=>{selectedLayer.field = null}"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام لایه</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" style="height: 48px" sm="3">

                                            <v-btn :disabled="!selectedLayer.layer_id"
                                                   @click="drawFeatureOnMap('selectFeature')" class="font-weight-bold"
                                                   size="x-small"
                                                   color="info "
                                                   style="height: 30px;width:100%">
                                                ترسیم در نقشه
                                            </v-btn>
                                        </v-col>

                                    </v-row>
                                    <v-row class="ma-0 pa-0 mx-2 border-t" justify="start">
                                        <v-btn @click="addMetaFilter" size="x-small" color="info mt-1"
                                               style="height: 20px;width:20px">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-form>

                                <v-form ref="filterFormRef" v-if="filterTab==='geoFilter'"
                                        style="height:100%;width:100%" class="myForm">

                                    <v-row class="ma-0 pa-0 " style="height: calc(100% - 30px);overflow-y: auto"
                                           align="center">
                                        <v-col cols="12" sm="3" style="height: 48px">
                                            <v-autocomplete

                                                    :items="layers.map((item)=>{return item.layer})"
                                                    item-title="name"
                                                    item-value="id"
                                                    v-model="selectedLayer.layer_id"
                                                    density="compact"
                                                    :rules="nameRule"
                                                    @update:modelValue="()=>{selectedLayer.field = null}"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام لایه</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" sm="3" style="height: 48px">
                                            <v-autocomplete
                                                    :disabled="!selectedLayer.layer_id"
                                                    :items="geoLayerFieldsItems"
                                                    item-title="name"
                                                    return-object
                                                    :rules="nameRule"
                                                    v-model="selectedLayer.field"
                                                    @update:modelValue="()=>{selectedLayer.filter = null}"
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام فیلد</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" style="height: 48px" sm="3">
                                            <v-autocomplete
                                                    :disabled="!selectedLayer.field"
                                                    v-model="selectedLayer.filter"
                                                    @update:modelValue="()=>{selectedLayer.filter_value = null}"
                                                    :items="filterItems"
                                                    item-title="p_name"
                                                    return-object
                                                    density="compact"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام فیلتر</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" style="height: 48px" sm="3">

                                            <v-btn @click="drawFeatureOnMap('drawFeature')"
                                                   :disabled="!selectedLayer.filter" class="font-weight-bold"
                                                   size="x-small" color="info "
                                                   style="height: 30px;width:90%">
                                                ترسیم در نقشه
                                            </v-btn>
                                        </v-col>

                                    </v-row>
                                    <v-row class="ma-0 pa-0 mx-2 border-t" justify="start">
                                        <v-btn @click="addMetaFilter()" size="x-small" color="info mt-1"
                                               style="height: 20px;width:20px">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-form>


                            </v-window>
                        </v-row>
                        <v-row class="ma-0 pa-0" style="height:10px"></v-row>
                        <v-row class="pa-2 ma-0 rounded-lg bg-white elevation-3" style="height: 300px" id="table">

                            <EditableTable
                                    ref="editTable"
                                    :headers="headers"
                                    :items="tableItems"
                                    :checkBox="false"
                                    :height="height"
                                    :filter-activate="tableFilterActivate"
                                    :action="actions"
                                    @actionClick="actionsClick"
                                    style="background-color: white"
                            ></EditableTable>

                        </v-row>
                        <v-row class="ma-0 pa-0" style="height:20px"></v-row>
                    </v-col>

                </v-row>
            </v-fade-transition>

            <simple-dialog
                    :show="drawDialog"
                    topic="ترسیم در نقشه"
                    width="60vw"
                    height="80vh"
                    :current_height="'80vh'"
                    @closeDialog="()=>{
                        router.push({name:'featuresFilter'})
                    drawDialog = false

                }"
                    class="bg-grey-lighten-2"
            >
                <div style="height: 100%;width:100%;overflow-y: hidden">
                    <router-view></router-view>
                </div>

            </simple-dialog>
        </div>

    </div>

</template>

<script lang="ts">
    import {defineComponent, onMounted, PropType, ref, watch} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import EditableTable from "@/components/common/editableTable.vue";
    import SimpleDialog from "@/components/common/simpleDialog.vue";

    import Feature from 'ol/Feature.js';
    import {AnalyzeFilter, FilterTypes, LayerInputData, LayerInputFilters} from "@/models/Analyze.interface";
    import layer_functions from "@/componentFunctions/layer_functions";
    import {LayerItem} from "@/store/openLayer/types";
    import {LayerFields} from "@/models/Layer.Interface";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import featureBC, {featureBCEnums} from "@/broadcast/featureBroadcast";
    import {useToast} from "primevue/usetoast";

    interface FeaturesFilterLayer {
        layer: LayerItem,
        fields: LayerFields[]
    }

    export default defineComponent({
        name: "SetModelProcessComponent",
        components: {EditableTable, SimpleDialog,},
        setup(props) {
            const store = useStore()
            const router = useRouter()
            const toast = useToast()

            const {filtersListValue, getFiltersList} = analyze_functions()
            const {nameRule, floatRule} = rules()
            const filterFormRef = ref<VForm>()
            const {featureBroadcast} = featureBC()


            const layers = ref<FeaturesFilterLayer[]>([])
            const filterTypes = ref(FilterTypes)
            const initData = ref(false)
            const selectedLayer = ref<LayerInputFilters>({
                layer_id: null, field: null, filter: null, filter_value: null
            })
            const drawDialog = ref(false)
            const addedFilters = ref<LayerInputFilters[]>([])

            const {getLayerFields, layerFieldsList} = layer_functions()

            onMounted(async () => {
                console.log(props.layerInputData, 'layerInputData in features filter')
                await getFiltersList()

                if (props.layerInputData) {
                    for (let index = 0; index < props.layerInputData.layers.length; index++) {
                        await getLayerFields(props.layerInputData.layers[index].id)
                        if (layerFieldsList.value) {
                            layers.value.push({
                                layer: props.layerInputData.layers[index],
                                fields: layerFieldsList.value
                            })
                        }

                    }
                }

                setTimeout(() => {
                    initData.value = true

                }, 300)

            })

            watch(featureBroadcast, (item) => {
                if (item.id === 'featuresFilterDrawFeature') {
                    drawDialog.value = false
                    router.push({name:'featuresFilter'})
                    selectedLayer.value.filter_value = item.value
                } else if (item.id === 'selectFilterFeature') {
                    selectedLayer.value.filter_value = item.value
                    drawDialog.value = false
                    router.push({name:'featuresFilter'})
                    filtersListValue.value.map((filter) => {
                        if (filter.name === 'intersect') {
                            selectedLayer.value.filter = filter
                        }
                    })
                    layers.value.map((item) => {
                        if (item.layer.id === selectedLayer.value.layer_id) {
                            item.fields.filter((field) => {
                                if (field.name === "wkb_geometry") {
                                    selectedLayer.value.field = field
                                }
                            })
                        }
                    })
                }
            })

            return {
                store, router, initData, selectedLayer, layers, filtersListValue, filterTypes, addedFilters,
                nameRule, floatRule, filterFormRef, drawDialog, toast
            }
        },
        data() {
            return {

                mobile: false,

                filterTab: 'mangeUsersList',

                items: [
                    {
                        icon: "phone",
                        text: "فیلتر های توصیفی",
                        route: "metaFilter",
                    },
                    {
                        icon: "phone",
                        text: "فیلتر مکانی",
                        route: "locationFilter",
                    },
                    {
                        icon: "phone",
                        text: "فیلتر های geometry",
                        route: "geoFilter",
                    },

                ],


                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "لایه", value: "layer", width: "20%"},
                    {text: "فیلد لایه", value: "field", width: "20%"},
                    {text: "فیلتر", value: "filter", width: "20%"},
                    {text: "مقدار فیلتر", value: "filter_value", width: "20%"},


                ],

                actions: [

                    {
                        text: "حذف",
                        icon: "mdi-trash-can",
                        color: "error",
                    },

                ],

                // /-------table data---------/
            };
        },
        computed: {
            layerFieldsItems() {
                let res: any[] = []
                this.layers.map((item) => {
                    if (item.layer.id === this.selectedLayer.layer_id) {
                        res = item.fields.filter((field) => {
                            return field.is_geometry === false
                        })
                    }
                })
                return res
            },
            geoLayerFieldsItems() {
                let res: any[] = []
                this.layers.map((item) => {
                    if (item.layer.id === this.selectedLayer.layer_id) {
                        res = item.fields.filter((field) => {
                            return field.is_geometry === true
                        })
                    }
                })
                return res
            },
            filterItems() {
                let res: any[] = []
                res = this.filtersListValue.filter((filter) => {
                    if (filter.filter_type === FilterTypes.Boolean) {
                        return this.selectedLayer.field?.type === 'bool'
                    } else if (filter.filter_type === FilterTypes.Float) {
                        return this.selectedLayer.field?.type === 'int' || this.selectedLayer.field?.type === 'float'
                    } else if (filter.filter_type === FilterTypes.Date) {
                        return this.selectedLayer.field?.type === 'date' || this.selectedLayer.field?.type === 'datetime'
                    } else {
                        return filter.filter_type.toLowerCase() === this.selectedLayer.field?.type.toLowerCase()
                    }

                })
                console.log(res, this.selectedLayer, this.filtersListValue)
                return res
            },
            tableItems() {
                return this.addedFilters.map((item, index) => {
                    let layerName = ''
                    this.layerInputData?.layers.map((layer) => {
                        if (layer.id === item.layer_id)
                            layerName = layer.name
                    })
                    return {
                        'id': index,
                        'layer': layerName,
                        'field': item.field?.name,
                        'filter': item.filter?.p_name,
                        'filter_value': item.field?.is_geometry ? 'عارضه' : item.filter_value
                    }
                })
            }
        },
        props: {
            layerInputData: {
                type: Object as PropType<LayerInputData | null>,
                required: true
            }
        },
        methods: {

            screenResizeHandler() {
                this.mobile = window.innerWidth < 600
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight - 20);
            },

            async addMetaFilter() {
                if (this.filterFormRef) {
                    const res = await this.filterFormRef.validate()

                    if (res.valid) {
                        if (this.selectedLayer.filter_value) {
                            this.addedFilters.push(
                                this.selectedLayer
                            )
                            this.selectedLayer = {
                                layer_id: null, field: null, filter: null, filter_value: null
                            }
                            console.log(this.addedFilters)
                        } else {
                            this.toast.add({
                                group: 'br',
                                life: 2000,
                                severity: 'error',
                                summary: ' خطا در عملیات',
                                detail: 'شرط فیلتر نباید خالی باشد'
                            });
                        }

                    }
                }
            },

            actionsClick(value: string, item: any, items: any) {
                if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            this.addedFilters.splice(item.id, 1)

                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
                }
            },

            drawFeatureOnMap(page: string) {
                if (page === 'drawFeature') {
                    this.drawDialog = true
                    setTimeout(() => {
                        this.router.push({name: 'featuresFilterDrawFeature'})
                    }, 100)
                } else if (page === 'selectFeature') {
                    this.drawDialog = true
                    setTimeout(() => {
                        this.router.push({
                            name: 'selectFilterFeature',
                            params: {'searchLayer': this.selectedLayer.layer_id}
                        })
                    }, 100)


                }
            },

            nextPageFunc() {
                const res = {...this.layerInputData}
                res.filters = this.addedFilters
                return {
                    result:true,
                    data:res
                }
            }

        },

        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //
        watch: {
            initData() {
                if (this.initData) {
                    this.screenResizeHandler()
                }
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @media only screen and (max-width: 600px) {
        .header_font {
            font-size: 10px;
        }
    }
</style>
