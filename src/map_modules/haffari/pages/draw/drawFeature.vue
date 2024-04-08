`
<template>
    <div>
        <vector_layer :map="map">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">

                    <template v-if="activePlugin===2" #draw="{vectorSource}">
                        <DrawForHaffari :active-modify="true" ref="drawRef" @drawend="drawEvent"
                                                 @drawstart="drawEvent"
                                                 :map="map"
                                                 :source="vectorSource" :type="drawType"></DrawForHaffari>
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
                    <template v-if="activePlugin===6" #rotate="{vectorSource}">
                        <rotate_interaction :vector="vector" :map="map" :source="vectorSource"></rotate_interaction>
                    </template>

                    <template v-if="activePlugin===8" #delete="{vectorSource}">
                        <delete_by_select :vector="vector" :map="map" :source="vectorSource"></delete_by_select>
                    </template>

                    <template v-if="activePlugin===10" #drawByCoords="{vectorSource}">
                        <draw_by_coordinates :layer-type="activeLayer.type_layer" ref="selectVectorRef"
                                             @closeWindow="toolbarClick(toolbarItems.filter((item)=>{return item.id===10})[0])"
                                             :map="map" :source="vectorSource"></draw_by_coordinates>
                    </template>

                </vector_source>
            </template>
            <template v-if="true" #style="{vector}">
                <Text_style :layer-type="drawType" :number-in-coords="false" :fill-color="'rgba(232,232,29,0.62)'"
                            :vector="vector"></Text_style>
            </template>
        </vector_layer>


        <feature_toolbar :left="'37vw'" @itemClick="toolbarClick" :items="toolbarItems"
                         :width="{mobile:'45px',desktop:'430px'}"
                         :height="{mobile:'430px',desktop:'38px'}" :show-close="closeBtn"
                         :close-action="()=>{router().go(-1)}" ></feature_toolbar>


        <template v-if="layerFieldsForm">
            <layer-fields-form :layer-id="activeLayer.id" :initFields="featureFields"
                               @closeWindow="layerFieldsForm=false"
                               @saveFieldsForm="setFeatureFields"></layer-fields-form>
        </template>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUpdated, Ref, ref, watch} from "vue"

import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue"
import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue"
import {default as snap} from "@/components/openLayers/interactions/snap/Snap.vue"
import {default as modify_interaction} from "@/components/openLayers/interactions/modify/Modify.vue"
import {default as translate_interaction} from "@/components/openLayers/interactions/translate/Translate.vue"
import rotate_interaction from '@/components/openLayers/interactions/rotate/Rotate.vue';
import hole_interaction from '@/components/openLayers/interactions/hole/Hole.vue';
import {default as draw_interaction} from "@/components/openLayers/interactions/draw/Draw.vue"
import {default as delete_by_select} from "@/components/openLayers/interactions/deleteBySelect/DeleteBySelect.vue"
import {default as map} from "ol/Map";
import {default as sniper_draw_interaction} from "@/components/openLayers/interactions/draw/newDrawWithSniper.vue"
import {DrawEvent, DrawType} from "@/components/openLayers/interactions/draw/model";
import {default as feature_toolbar} from '@/components/common/featureToolbar/featureToolbar.vue'
import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
import draw_by_coordinates from '@/components/openLayers/interactions/draw/drawByCoordinates/DrawByCoordinates.vue'
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import LayerFieldsForm from '@/map_modules/feature/common/layerFieldsForm.vue'
import feature_functions from "@/componentFunctions/feature_functions";
import {Field} from "@/models/Feature.interface";
import {useRoute} from "vue-router";
import {LayerItem} from "@/store/openLayer/types";
import source_functions from "@/components/openLayers/componentFunctions/source";
import router from "@/router";
import DrawForHaffari from "@/components/openLayers/interactions/draw/drawForHaffari.vue";

export default defineComponent({
    name: "DrawComponent",
    setup() {
        const activePlugin = ref<number>(0)
        const store = useStore();
        const toast = useToast()
        const route = useRoute()
        const drawVectorSourceRef = ref<VectorSourceInterface>()
        const {makeGeoJsonFeature, addFeature} = feature_functions()
        const {getJsonFeatureInfo, refreshLayer} = source_functions()

        const activeLayer = ref<LayerItem | null>(null)
        const drawType = ref<DrawType>(DrawType.POLYGON)
        const checkLayerFields = ref<boolean>(false)
        const featureFields = ref<Field[]>([])



        return {
            activePlugin,
            drawVectorSourceRef,
            toast,
            store,
            drawType,
            checkLayerFields,
            featureFields,
            makeGeoJsonFeature,
            addFeature,
            activeLayer,
            getJsonFeatureInfo, refreshLayer
        }
    },
    components: {
        draw_by_coordinates,
        modify_interaction,
        snap,
        translate_interaction,
        rotate_interaction,
        vector_layer,
        draw_interaction,
        vector_source,
        Text_style,
        feature_toolbar,
        delete_by_select,
        LayerFieldsForm,
        DrawForHaffari
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
        },
        closeBtn: {
            type: Boolean,
            default: false
        }
    },


    methods: {


        router() {
            return router
        },
        drawEvent(target: DrawEvent) {
            console.log(target, 'drawEvent')
            if (target.type === "drawend") {
                this.draw = false
            }

        },
        modifyEvent(target: any) {
            console.log(target, 'modifyEvent')
        },
        // -----------------------//
        async saveFeature() {
            this.toast.add({
                group: 'br',
                life: 2000,
                severity: 'error',
                summary: ' خطا در عملیات',
                detail: 'اقلام توصیفی بررسی نشده است'
            });
        },


        setFeatureFields(fields: Field[]) {
            console.log(fields)
            this.checkLayerFields = true
            this.featureFields = fields
        },

        toolbarClick(item: FTItemsInterface) {
            if (this.activeLayer) {
                if (item.id === 1) {
                    if (this.drawVectorSourceRef) {
                        this.drawVectorSourceRef.removeFeatures()

                    }

                } else if (item.id === 7) {
                    if (this.activeLayer) {
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

            this.toolbarItems.map((item) => {
                if (item.id === 9) {
                    item.disabled = false
                }
            })
        },
    },


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
