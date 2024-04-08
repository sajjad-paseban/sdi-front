<template>
    <div>
        <vector_layer :map="map" :z-index="10">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">
                    <template v-if="drawType !== 'point'" #select="{vectorSource}">
                        <select_interaction ref="selectInteractionRef" @selected="selectedEvent" :map="map"
                                            :source="vectorSource" :vector="vector"></select_interaction>
                    </template>
                </vector_source>
            </template>

            <template v-if="true" #style="{vector}">
                <Text_style :number-in-coords="true" :fill-color="'rgba(115,114,114,0.2)'"
                            :vector="vector"></Text_style>
            </template>

        </vector_layer>

        <vector_layer :map="map" :z-index="11">
            <template #clusterSource="{vector}">
                <cluster_source :layers="''" ref="drawClusterSourceRef" :map="map" :vector="vector">

                    <template v-if="drawType === 'point'" #select="{vectorSource}">
                        <select_interaction :cluster="true" ref="selectInteractionRef" @selected="selectedEvent"
                                            :map="map" :source="vectorSource" :vector="vector"></select_interaction>
                    </template>
                </cluster_source>
            </template>

        </vector_layer>

        <feature_toolbar @itemClick="toolbarClick" :left="'35vw'" :items="toolbarItems"
                         :width="{mobile:'45px',desktop:'320px'}"
                         :height="{mobile:'320px',desktop:'38px'}">
        </feature_toolbar>

        <voice-assinst @search-voice="voiceSearch"></voice-assinst>

        <simple-dialog
                :show="settingDialog"
                topic=""
                :overLayer="false"
                width="50vw"
                height="80vh"
                @closeDialog="settingDialog = false"
        >
            <v-card height="100%" class="pa-1">
                <v-row
                        class="ma-0 pa-0 px-2 metaBtn pb-2 myForm"
                        style=" white-space: nowrap !important"
                >
                    <v-btn
                            variant="tonal"
                            prepend-icon="mdi-plus"
                            style="font-weight: bold !important"
                            rounded
                            @click="addCondition(items.children)"
                            size="x-small"
                            color="primary"
                            class="elevation-1 ml-2 mt-1"
                    >افزودن شرط
                    </v-btn>

                    <v-btn
                            variant="tonal"
                            prepend-icon="mdi-plus"
                            style="font-weight: bold !important"
                            @click="addGroup(items.children)"
                            rounded
                            size="x-small"
                            class="elevation-1 mt-1"
                            color="primary"

                    >افزودن گروه
                    </v-btn>
                    <v-spacer>
                    </v-spacer>
                    <v-radio-group v-model="items.type" color="primary" inline class="my-0 py-0 mt-n2">
                        <v-radio label="یا" value="or"></v-radio>
                        <v-radio label="و" value="and"></v-radio>
                    </v-radio-group>
                </v-row>
                <v-card  border class="mx-1" :height="winSize>700?'calc(100% - 70px)':'calc(100% - 100px)'"
                        style="overflow-y: auto">
                    <v-form style="width: 100%;height: 100%" ref="metadataFormRef">
                        <Tree1
                                :keyObject="'id'"
                                class="pr-2"
                                :item="item"
                                v-for="(item,index) in items.children"
                                :first-item="index===0"
                                :last-item="(index+1) === items.length"
                                :key="item.id"
                                :activeCheckBox="false"
                                :expand-all="true"
                                dir="rtl"
                        >
                            <template #label="{item}">
                                <div v-if="item.children" class="my-2 mr-2 elevation-2 border rounded-lg"
                                     style="height: 60px;width: 200px;position: relative">
                                    <v-btn
                                            density="comfortable"
                                            @click="removeGroup(items.children,item)"
                                            size="x-small"
                                            icon
                                            style="position: absolute; left: -12px;top: -6px;z-index: 100001"
                                            color="error"
                                            class=" ml-1"
                                    >
                                        <v-icon size="small"> mdi-trash-can</v-icon>
                                    </v-btn>
                                    <v-row
                                            class="ma-0 pa-0 px-2 metaBtn " align="center"
                                            style=" white-space: nowrap !important;height: 40%"
                                    >
                                        <v-btn
                                                variant="tonal"
                                                prepend-icon="mdi-plus"
                                                style="font-weight: bold !important"
                                                rounded
                                                @click="addCondition(item.children)"
                                                size="x-small"
                                                color="primary"
                                                class="elevation-1 ml-2"
                                        >افزودن شرط
                                        </v-btn>

                                        <v-btn
                                                variant="tonal"
                                                prepend-icon="mdi-plus"
                                                style="font-weight: bold !important"
                                                rounded
                                                @click="addGroup(item.children)"
                                                size="x-small"
                                                class="elevation-1"
                                                color="primary"

                                        >افزودن گروه
                                        </v-btn
                                        >
                                    </v-row>
                                    <v-row
                                            class="ma-0 pa-0  myForm" align="start"
                                            style=" white-space: nowrap !important;height: 60%"
                                    >
                                        <v-radio-group v-model="item.type" color="primary" inline class="my-0 py-0 " :class="winSize>700?'mt-n1':'mt-n6'">
                                            <v-radio label="یا" value="or"></v-radio>
                                            <v-radio label="و" value="and"></v-radio>
                                        </v-radio-group>
                                    </v-row>
                                </div>

                                <div v-else class="my-2 mr-2 elevation-2 border rounded-lg"
                                     style=";width:90%;position: relative">
                                    <v-btn
                                            density="comfortable"
                                            @click="removeCondition(items.children,item)"
                                            size="x-small"
                                            icon="mdi-minus"
                                            style="position: absolute; left: -12px;top: -6px;z-index: 100001"
                                            color="error"
                                            class=" ml-1"
                                    >
                                    </v-btn>
                                    <v-row class="ma-0 pa-0 pt-3">
                                        <v-col class="ma-0 pa-0 px-1" cols="12" sm="4">
                                            <v-autocomplete
                                                    v-model="item.field"
                                                    :items="activeLayerFieldsList"
                                                    density="compact"
                                                    item-title="name"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    item-value="name"
                                                    @update:modelValue="selectField(item)"
                                                    required
                                            >
                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">فیلد</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col class="ma-0 pa-0 px-1" cols="12" sm="4">
                                            <v-autocomplete
                                                    :items="filterOperators"
                                                    v-model="item.operation"
                                                    density="compact"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    required
                                            >
                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">عملیات</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col v-if="item.field" class="ma-0 pa-0 px-1" cols="12" sm="4">
                                            <v-text-field v-if="getActiveLayerFieldsItem(item.field).type === FieldTypes.String"
                                                          density="compact"
                                                          v-model="item['value']"
                                                          variant="solo"
                                                          class=""
                                                          type="text"
                                                          :rules="item.is_required?requiredRule:[]"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">{{item.name}}</p>
                                                </template>
                                            </v-text-field>

                                            <v-text-field v-if="getActiveLayerFieldsItem(item.field).type === FieldTypes.Int"
                                                          density="compact"
                                                          v-model="item.value"
                                                          variant="solo"
                                                          type="text"
                                                          :rules="item.is_required?text_number.concat(requiredRule):text_number"

                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">{{item.name}}</p>
                                                </template>
                                            </v-text-field>

                                            <v-checkbox-btn
                                                    v-if="getActiveLayerFieldsItem(item.field).type === FieldTypes.Boolean"
                                                    density="compact"
                                                    v-model="item.value"

                                                    :rules="item.is_required?requiredRule:[]"

                                            ></v-checkbox-btn>

                                            <v-autocomplete
                                                    v-if="getActiveLayerFieldsItem(item.field).type === FieldTypes.Choice"
                                                    v-model="item.value"
                                                    :items="getActiveLayerFieldsItem(item.field).layer_field_choices"
                                                    density="compact"
                                                    variant="solo"
                                                    :rules="item.is_required?requiredRule:[]"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">{{item.name}}</p>
                                                </template>
                                            </v-autocomplete>

                                            <div v-if="getActiveLayerFieldsItem(item.field).type === FieldTypes.DateTime||getActiveLayerFieldsItem(item.field).type === FieldTypes.Date" class="">
                                                <date-picker color="rgb(var(--v-theme-primary))" :placeholder="item.name"
                                                             :rules="item.is_required?requiredRule:[]"
                                                             type="datetime" v-model="item.value"></date-picker>
                                            </div>
                                            <div v-if="getActiveLayerFieldsItem(item.field).type === FieldTypes.Time" class="">
                                                <date-picker v-model="item.value" color="rgb(var(--v-theme-primary))"
                                                             :placeholder="item.name" :rules="item.is_required?requiredRule:[]"
                                                             type="time"></date-picker>
                                            </div>
                                            <v-text-field v-if="getActiveLayerFieldsItem(item.field).type === FieldTypes.Float"
                                                          density="compact"
                                                          v-model="item.value"
                                                          variant="solo"
                                                          :rules="item.is_required?requiredRule:[]"
                                                          type="number"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">{{item.name}}</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>

                                </div>

                            </template>
                        </Tree1>
                    </v-form>



                </v-card>
                <v-row
                        class="ma-0 pa-0 px-2 " align="center" justify="end"
                        style=" white-space: nowrap !important;height: 40px"
                >
                    <v-btn
                            variant="tonal"
                            prepend-icon="mdi-database-search"
                            style="font-weight: bold !important"
                            @click="searchFeature"
                            size="small"
                            color="success"
                            class="elevation-1 ml-n1 rounded-lg"
                    >اجرا
                    </v-btn>
                </v-row>
            </v-card>
        </simple-dialog>

    </div>


</template>

<script lang="ts">
    import {defineComponent, ref, onMounted, PropType, watch} from "vue";
    import {default as map} from 'ol/Map.js';
    import {default as feature_toolbar} from "@/components/common/featureToolbar/featureToolbar.vue";
    import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
    import SimpleDialog from "@/components/common/simpleDialog.vue";

    import Tree1 from "@/components/common/tree.vue";
    import {SearchMetadataParentItemInterface} from "@/models/Search.interface";
    import {LayerItem} from "@/store/openLayer/types";
    import {useToast} from "primevue/usetoast";
    import extra_layer_functions from "@/componentFunctions/extra_layer_functions";
    import rules from "@/componentFunctions/rules_functions";
    import {default as advance_function} from "@/componentFunctions/advanceStyle_functions";
    import {ActiveLayerFields, LayerFieldTypes} from "@/models/Layer.Interface";
    import VForm from "@/models/VForm.interface";
    import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue";
    import {default as select_interaction} from "@/components/openLayers/interactions/select/Select.vue";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
    import {SelectComponentInterface} from "@/components/openLayers/interactions/select/model";
    import {SelectEvent} from "ol/interaction/Select";
    import Feature from 'ol/Feature.js';
    import VoiceAssinst from "@/map_modules/voiceAssinst/VoiceAssinst.vue";

    export default defineComponent({
        extends: {},
        name: "SearchMetadataComponent",
        components: {
            VoiceAssinst,
            feature_toolbar, SimpleDialog, Tree1,vector_source,
            vector_layer,
            cluster_source,
            select_interaction,
            Text_style,
        },

        setup(props){
            const {activeLayerFieldsList,getActiveLayerFields} = extra_layer_functions()
            const {filterOperators,getListFilterOperators} = advance_function()
            const {getFeaturesByFields} = wfs_functions()
            const {nameRule,text_number, requiredRule} = rules()
            const metadataFormRef = ref<VForm>()

            const toast = useToast()

            const drawType = ref('point')
            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const drawClusterSourceRef = ref<ClusterSourceInterface>()
            const selectInteractionRef = ref<SelectComponentInterface>()

            watch(()=>props.searchLayer,async ()=>{
                if (props.searchLayer)
                    await getActiveLayerFields(props.searchLayer.id)
            })

            onMounted(async ()=>{
                await getListFilterOperators()
                if (props.searchLayer)
                    await getActiveLayerFields(props.searchLayer.id)
            })
            return{
                drawVectorSourceRef,
                selectInteractionRef,
                drawClusterSourceRef,activeLayerFieldsList,toast,nameRule,text_number, requiredRule,filterOperators,metadataFormRef,getFeaturesByFields,drawType
            }
        },

        data() {
            return {
                toolbarItems: [
                    {
                        id: 3,
                        icon: '/icons/reset.png',
                        name: 'ریست',
                        disabled: false
                    },
                    {
                        id: 1,
                        icon: '/icons/setting.png',
                        name: 'تنظیمات',
                        disabled: false
                    },
                    {
                        id: 2,
                        icon: '',
                        name: '',
                        divider: true
                    },
                    {
                        id: 7,
                        icon: '/icons/add.png',
                        name: 'افزایش',
                        disabled: false
                    },
                    {
                        id: 8,
                        icon: '/icons/remove.png',
                        name: 'کاهش',
                        disabled: false
                    },
                    {
                        id: 9,
                        icon: '/icons/blue_reset.png',
                        name: 'از نو',
                        active:true,
                        disabled: false
                    },
                    {
                        id: 6,
                        icon: '',
                        name: '',
                        divider: true
                    },
                    {
                        id: 14,
                        icon: '/icons/mesure.png',
                        name: 'نمایش عارضه',
                        disabled: false
                    },
                    {
                        id: 15,
                        icon: '/icons/drawPoints.png',
                        name: 'نمایش نقطه',
                        active: true,
                        disabled: false
                    },


                ] as FTItemsInterface[],
                settingDialog: false,

                FieldTypes: LayerFieldTypes,

                items: {
                    id:1,
                    children:[],
                    type:"and"
                }as SearchMetadataParentItemInterface,
                maxId: 1,

            }
        },
        props: {
            map: {
                required: true,
                type: map
            },
            searchLayer: {
                required: true,
                type: null as unknown as PropType<LayerItem | null>,
            },
            selectedFeature: {
                required: false,
                type: Object as PropType<any>,
                default: null
            },
        },

        watch: {
            selectedFeature() {
                if (this.selectedFeature && this.drawVectorSourceRef && this.drawClusterSourceRef) {
                    const features: Feature[] = this.drawType === 'point' ? this.drawClusterSourceRef.getFeatures() : this.drawVectorSourceRef.getFeatures()

                    this.selectInteractionRef?.setSelect(features.filter((feature) => {
                        return feature.get('pk') === this.selectedFeature.id
                    }))
                }

            },
            drawType() {
                if (this.drawVectorSourceRef && this.drawClusterSourceRef) {
                    console.log('drawType change')
                }
            }
        },
        methods: {
            toolbarClick(item: FTItemsInterface) {
                if (this.searchLayer) {

                    if ([7, 8, 9].includes(item.id)) {
                        this.toolbarItems.map((item) => {
                            if ([7, 8, 9].includes(item.id)) {
                                item.active = false
                            }
                        })
                        this.toolbarItems.map((i) => {
                            if (i.id === item.id) {
                                i.active = true
                                this.$emit('changeShowType', item.name)
                            }
                        })
                    } else if ([14, 15].includes(item.id)) {
                        this.toolbarItems.map((item) => {
                            if ([14, 15].includes(item.id)) {
                                item.active = false
                            }
                        })

                        this.toolbarItems.map((i) => {
                            if (i.id === item.id) {
                                i.active = true
                                this.drawType = item.id === 15 ? 'point' : 'feature'
                                this.$emit('changeDrawShowType', this.drawType,this.drawVectorSourceRef, this.drawClusterSourceRef)

                            }
                        })
                    } else if (item.id === 3) {
                        if (this.drawVectorSourceRef && this.drawClusterSourceRef) {
                            this.drawVectorSourceRef.removeFeatures()
                            this.drawClusterSourceRef.removeFeatures()
                        }
                        this.$emit('reset', true)
                    } else {
                        this.settingDialog = true
                    }
                }else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'ابتدا لایه را انتخاب کنید'
                    });
                }

            },

            removeGroup(items:any,i: any) {
                items.map((item:any,index:number)=>{
                    if (item.children&&item.children.length>0){
                        this.removeGroup(item.children,i)
                    }
                    if (item.id === i.id){
                        items.splice(index,1)
                    }
                })
            },
            addGroup(itemChildren: any) {
                itemChildren.push({
                    id: this.maxId + 1,
                    children: [],
                    type:'and'
                })
                this.maxId++
            },
            addCondition(itemChildren: any) {
                itemChildren.push({
                    id: this.maxId + 1,
                })
                this.maxId++
            },
            removeCondition(items:any,i: any) {
                items.map((item:any,index:number)=>{
                    if (item.children&&item.children.length>0){
                        this.removeCondition(item.children,i)
                    }
                    if (item.id === i.id){
                        items.splice(index,1)
                    }
                })
            },
            async searchFeature(){
                const res = await this.metadataFormRef?.validate()
                if (res?.valid&&this.metadataFormRef&&this.searchLayer){
                    const features = await this.getFeaturesByFields(this.searchLayer,this.items,1000)
                    if(features.features.length>0){
                        this.settingDialog = false
                    }else {
                        this.toast.add({group: 'br', life: 2000, severity: 'error', summary: ' خطا در دخواست', detail: 'عارضه ای یافت نشد'});
                    }
                    this.$emit('setFindFeatures', features ? features : [], this.drawVectorSourceRef, this.drawClusterSourceRef)
                }
            },
            //-------------------

            selectedEvent(event: SelectEvent) {
                console.log(event)
                this.$emit('mapFeatureSelect', event.selected[0].get('pk'))
            },

            getActiveLayerFieldsItem(name:string):ActiveLayerFields|null{
                const res = this.activeLayerFieldsList.filter((item)=>{
                    return item.name === name
                })
                if(res.length>0){
                    return res[0]
                }else{
                    return null
                }
            },

            selectField(item:SearchMetadataParentItemInterface){
                setTimeout(()=>{
                    this.activeLayerFieldsList.map(i=>{
                        if(item.field === i.name){
                            item.fieldType = i.type
                        }
                    })
                },200)
            },



            async voiceSearch(code:string){
                code
                const newCode =code.match(/\d+/)?.join("")

                const items:any = {
                    "id": 1,
                    "children": [
                        {
                            "id": 2,
                            "field": "code",
                            "fieldType": "String",
                            "operation": "PropertyIsEqualTo",
                            "value": newCode
                        }
                    ],
                    "type": "and"
                }
                if (this.searchLayer){
                    const features = await this.getFeaturesByFields(this.searchLayer,items,1000)
                    if(features.features.length>0){
                        this.settingDialog = false
                    }else {
                        this.toast.add({group: 'br', life: 2000, severity: 'error', summary: ' خطا در دخواست', detail: 'عارضه ای یافت نشد'});
                    }
                    this.$emit('setFindFeatures', features ? features : [], this.drawVectorSourceRef, this.drawClusterSourceRef)
                }

            }


        },
        computed: {
            winSize() {
                return window.innerWidth
            }
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
