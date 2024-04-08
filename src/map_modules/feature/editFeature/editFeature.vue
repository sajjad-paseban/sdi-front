`
<template>
    <div>
        <vector_layer :map="map">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">
                    <template v-if="activePlugin===2" #draw="{vectorSource}">
                        <draw_interaction :active-modify="true" ref="drawRef" @drawend="drawEvent"
                                          @drawstart="drawEvent"
                                          :map="map"
                                          :source="vectorSource" :type="drawType"></draw_interaction>
                    </template>
                    <template v-if="activePlugin===4" #translate="{vectorSource}">
                        <translate_interaction :source="vectorSource" :map="map"></translate_interaction>
                    </template>
                    <template v-if="snap" #snap="{vectorSource}">
                        <snap :source="vectorSource" :map="map"></snap>
                    </template>
                    <template v-if="activePlugin===3" #modify="{vectorSource}">
                        <modify_interaction ref="modifyRef" @modifystart="modifyEvent" @modifyend="modifyEvent"
                                            :map="map"
                                            :source="vectorSource"></modify_interaction>
                    </template>
                    <template v-if="activePlugin===5" #hole="{vectorSource}">
                        <hole_interaction :map="map" :source="vectorSource"></hole_interaction>
                    </template>
                    <template v-if="activePlugin===6" #rotate="{vectorSource}">
                        <rotate_interaction :vector="vector" :map="map" :source="vectorSource"></rotate_interaction>
                    </template>

                    <template v-if="activePlugin===8" #delete="{vectorSource}">
                        <delete_by_select :vector="vector" :map="map" :source="vectorSource"></delete_by_select>
                    </template>

                    <template v-if="activePlugin===10" #drawByCoords="{vectorSource}">
                        <draw_by_coordinates :layer-type="store.getters.getActiveLayer.type_layer" ref="selectVectorRef" @closeWindow="toolbarClick(toolbarItems.filter((item)=>{return item.id===10})[0])" :map="map" :source="vectorSource"></draw_by_coordinates>
                    </template>
                </vector_source>
            </template>
            <template v-if="true" #style="{vector}">
                <Text_style :layer-type="drawType" :number-in-coords="true" :fill-color="'rgba(115,114,114,0.2)'"
                            :vector="vector"></Text_style>
            </template>
        </vector_layer>

        <template v-if="activePlugin===11&&store.getters.getActiveLayer">
            <click_wfs :custom-layer-name="store.getters.getActiveLayer"
                       @clickCallback="clickCallback" :map="map" :source="this.ownSource"></click_wfs>
        </template>

        <feature_toolbar :left="'37vw'" @itemClick="toolbarClick" :items="toolbarItems" :width="{mobile:'45px',desktop:'465px'}"
                         :height="{mobile:'465px',desktop:'38px'}"></feature_toolbar>

        <template v-if="layerFieldsForm">
            <layer-fields-form :feature="selectedFeature" :initFields="featureFields" @closeWindow="layerFieldsForm=false"
                               @saveFieldsForm="setFeatureFields"></layer-fields-form>
        </template>

    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, watch} from "vue"
    import {default as map} from "ol/Map";
    import {default as feature_toolbar} from "@/components/common/featureToolbar/featureToolbar.vue";
    import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import click_wfs from "@/components/openLayers/click/wfs.vue";
    import TileWMS from "ol/source/TileWMS";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {DrawEvent, DrawType} from "@/components/openLayers/interactions/draw/model";
    import {Layer_types} from "@/models/Layer.Interface";
    import {Field} from "@/models/Feature.interface";
    import draw_by_coordinates from "@/components/openLayers/interactions/draw/drawByCoordinates/DrawByCoordinates.vue";
    import {default as modify_interaction} from "@/components/openLayers/interactions/modify/Modify.vue";
    import {default as snap} from "@/components/openLayers/interactions/snap/Snap.vue";
    import {default as translate_interaction} from "@/components/openLayers/interactions/translate/Translate.vue";
    import rotate_interaction from "@/components/openLayers/interactions/rotate/Rotate.vue";
    import hole_interaction from "@/components/openLayers/interactions/hole/Hole.vue";
    import {default as draw_interaction} from "@/components/openLayers/interactions/draw/Draw.vue";
    import {default as delete_by_select} from "@/components/openLayers/interactions/deleteBySelect/DeleteBySelect.vue";
    import LayerFieldsForm from "@/map_modules/feature/common/layerFieldsForm.vue";
    import source_functions from "@/components/openLayers/componentFunctions/source";

    import Feature from 'ol/Feature.js';
    import GeoJSONFeature from "ol/format/GeoJSON";
    import feature_functions from "@/componentFunctions/feature_functions";


    export default defineComponent({
        name: "EditFeatureComponent",
        setup(props) {
            const activePlugin = ref<number>(0)
            const store = useStore();
            const toast = useToast()

            const {getJsonFeaturesInfo,refreshLayer}= source_functions()
            const {makeGeoJsonFeature, editFeature} = feature_functions()

            const ownSource = ref<TileWMS>()
            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const drawType = ref<DrawType>(store.getters.getActiveLayer ? store.getters.getActiveLayer.type_layer : DrawType.POLYGON)
            const checkLayerFields = ref<boolean>(false)
            const featureFields = ref<Field[]>([])
            const selectedFeature = ref<Feature>()


            watch(() => store.getters.getActiveLayer, (value: any) => {
                if (value.type_layer !== Layer_types.TIFF)
                    drawType.value = value.type_layer
                checkLayerFields.value = false
                featureFields.value = []
                if (drawVectorSourceRef.value)
                    drawVectorSourceRef.value.removeFeatures()
            });

            return {
                refreshLayer,activePlugin, toast, store, ownSource,drawVectorSourceRef,featureFields,checkLayerFields,drawType,getJsonFeaturesInfo,selectedFeature,makeGeoJsonFeature,editFeature
            }
        },
        components: {
            feature_toolbar,
            vector_layer,
            vector_source,
            click_wfs,
            Text_style,
            draw_by_coordinates,
            modify_interaction,
            snap,
            translate_interaction,
            rotate_interaction,
            hole_interaction,
            draw_interaction,
            delete_by_select,
            LayerFieldsForm

        },
        data() {
            return {
                draw: true,
                snap: false,

                layerFieldsForm: false,
                toolbarItems: [
                    {
                        id: 1,
                        icon: '/icons/reset.png',
                        name: 'ریست',
                        disabled: false
                    },
                    {
                        id: 11,
                        icon: '/icons/click.png',
                        name: 'کلیک روی نقشه',
                        disabled: false
                    },
                    {
                        id: 2,
                        icon: '/icons/draw.png',
                        name: 'ترسیم',
                        disabled: false
                    },
                    {
                        id: 3,
                        icon: '/icons/edit.png',
                        name: 'ویرایش',
                        disabled: false
                    },
                    {
                        id: 4,
                        icon: '/icons/transition.png',
                        name: 'جابه جایی',
                        disabled: false
                    },

                    {
                        id: 5,
                        icon: '/icons/hole.png',
                        name: 'ترسیم چاله',
                        disabled: false
                    },
                    {
                        id: 6,
                        icon: '/icons/rotate.png',
                        name: 'چرخش',
                        disabled: false
                    },
                    {
                        id: 10,
                        icon: '/icons/drawPoints.png',
                        name: 'ترسیم با نقاط',
                        disabled: false
                    },
                    {
                        id: 7,
                        icon: '/icons/extraList.png',
                        name: 'اقلام توصیفی',
                        disabled: false
                    },
                    {
                        id: 8,
                        icon: '/icons/delete.png',
                        name: 'حذف',
                        disabled: false
                    },
                    {
                        id: 9,
                        icon: '/icons/save.png',
                        name: 'ذخیره',
                        disabled: false
                    },
                ] as FTItemsInterface[],

            };
        },
        directives: {},

        props: {
            map: {
                required: true,
                type: map
            }
        },
        methods: {
            drawEvent(target: DrawEvent) {
                console.log(target, 'drawEvent')
                if (target.type === "drawend") {
                    this.draw = false
                }

            },
            modifyEvent(target: any) {
                console.log(target, 'modifyEvent')
            },

            reset(){
                if (this.drawVectorSourceRef){
                    this.drawVectorSourceRef.removeFeatures()
                }
                this.selectedFeature = undefined
            },

            clickCallback(data: JSON) {
                if (this.drawVectorSourceRef) {
                    this.selectedFeature = this.getJsonFeaturesInfo(data)[0]

                    this.drawVectorSourceRef.removeFeatures()
                    this.drawVectorSourceRef.drawFeature(data)
                }
            },

            async saveFeature() {
                if (this.checkLayerFields) {
                    if (this.drawVectorSourceRef) {
                        const result = this.drawVectorSourceRef.getFeatureForSave()
                        if (result.error.length > 0) {
                            result.error.map((error: string) => {
                                this.toast.add({
                                    group: 'br',
                                    life: 2000,
                                    severity: 'error',
                                    summary: ' خطا در عملیات',
                                    detail: error
                                });
                            })
                        } else {
                            if (result.geometries&&this.selectedFeature) {
                                const featureJson: GeoJSONFeature = this.makeGeoJsonFeature(result.geometries, this.featureFields, this.store.getters.getActiveLayer.type_layer)
                                console.log(featureJson)
                                const res = await this.editFeature(featureJson, this.store.getters.getActiveLayer.id,this.selectedFeature.get('pk'))
                                if (res) {
                                    this.$toast.add({
                                        group: 'tr',
                                        life: 3000,
                                        severity: 'success',
                                        summary: ' نتیجه درخواست',
                                        detail: 'عارضه با موفقیت ویرایش شد .'
                                    });

                                    if (this.drawVectorSourceRef)
                                        this.drawVectorSourceRef.removeFeatures()
                                    this.checkLayerFields = false
                                    this.featureFields = []
                                    this.selectedFeature = undefined
                                    this.refreshLayer(this.map)

                                }
                            }
                        }

                    }
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'اقلام توصیفی بررسی نشده است'
                    });
                }
            },

            toolbarClick(item: FTItemsInterface) {
                if (this.store.getters.getActiveLayer) {

                    if (!this.selectedFeature&&item.id !== 11){
                        this.toast.add({
                            group: 'br',
                            life: 2000,
                            severity: 'error',
                            summary: ' خطا در عملیات',
                            detail: 'عارضه ای انتخاب نشده است'
                        });
                        return null
                    }

                    if (item.id === 1) {
                        this.reset()
                    } else if (item.id === 7) {
                        if (this.store.getters.getActiveLayer) {
                            this.layerFieldsForm = true
                        } else {
                            this.toast.add({
                                group: 'br',
                                life: 2000,
                                severity: 'error',
                                summary: ' خطا در عملیات',
                                detail: 'لایه فعال انتخاب نشده است '
                            });
                        }
                    } else if (item.id === 9) {
                        this.saveFeature()
                    } else {
                        this.toolbarItems.map((item) => {
                            item.disabled = true
                        })
                        if (this.activePlugin === 0) {
                            this.activePlugin = item.id
                            setTimeout(() => {
                                this.snap = true
                            }, 1000)
                            item.disabled = false
                        } else {
                            this.toolbarItems.map((item) => {
                                item.disabled = false
                            })
                            this.snap = false
                            this.activePlugin = 0
                        }
                    }
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'ابتدا لایه فعال را انتخاب کنید'
                    });
                }
            },

            setFeatureFields(fields: Field[]) {
                console.log(fields)
                this.checkLayerFields = true
                this.featureFields = fields
            },
        },
        mounted(): void {
            this.map.getAllLayers().filter((layer: any) => {
                if (layer.get('name') && layer.get('name') === 'ownLayer')
                    this.ownSource = layer.getSource()
            })
        },



    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
