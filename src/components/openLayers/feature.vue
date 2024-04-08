<template>
    <div>
        <template v-if="true">
            <vector_layer :map="map">
                <template v-if="true" #source="{vector}">
                    <vector_source ref="drawVectorRef" :map="map" :vector="vector">
                        <template v-if="false" #draw="{vectorSource}">
                            <draw_interaction :active-modify="true" ref="drawRef" @drawend="drawEvent"
                                              @drawstart="drawEvent"
                                              :map="map"
                                              :source="vectorSource" :type="drawType"></draw_interaction>
                        </template>
                        <template v-if="false" #translate="{vectorSource}">
                            <translate_interaction :source="vectorSource" :map="map"></translate_interaction>
                        </template>

                        <template v-if="false" #shape="{vectorSource}">
                            <draw_shape_interaction
                                    :map="map"
                                    :shape-type="
                                           shape_types.CIRCLE"
                                    :source="vectorSource"></draw_shape_interaction>
                        </template>
                        <template v-if="false" #snap="{vectorSource}">
                            <snap :source="vectorSource" :map="map"></snap>
                        </template>
                        <template v-if="false" #modify="{vectorSource}">
                            <modify_interaction ref="modifyRef" @modifystart="modifyEvent" @modifyend="modifyEvent"
                                                :map="map"
                                                :source="vectorSource"></modify_interaction>
                        </template>
                        <template v-if="false" #hole="{vectorSource}">
                            <hole_interaction :map="map" :source="vectorSource"></hole_interaction>
                        </template>
                        <template v-if="false" #rotate="{vectorSource}">
                            <rotate_interaction :vector="vector" :map="map" :source="vectorSource"></rotate_interaction>
                        </template>
                        <template v-if="false" #drawByCoords="{vectorSource}">
                            <draw-by-coordinates :layer-type="layerTypes.Polygon" ref="selectVectorRef" @selected="selectedEvent" :map="map" :source="vectorSource"></draw-by-coordinates>
                        </template>

                        <template v-if="false" #select="{vectorSource}">
                            <select_interaction  ref="selectVectorRef" @selected="selectedEvent"  :map="map" :source="vectorSource" :vector="vector"></select_interaction>
                        </template>
                    </vector_source>
                </template>

                <!--            برای نشان دادن در لار نقطه نقشه ست شود-->
                <template v-if="false" #clusterSource="{vector}">
                    <cluster_source :map="map" :vector="vector"></cluster_source>
                </template>

                <template v-if="true" #style="{vector}">
                    <Text_style :number-in-coords="true" :fill-color="'rgba(115,114,114,0.2)'"
                                :vector="vector"></Text_style>
                </template>


            </vector_layer>
            <template v-if="false">
                <popupWindow v-if="winSize!==0" :resize="false" :top="winSize>500?'30px':'100px'"
                             :left="winSize>500?'38vw':'10px'" :max_width="winSize>500?'500px':'50px'"
                             :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100px':'400px'"
                             :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'38px':'380px'"
                             :width="winSize>500?'380px':'45px'">
                    <div dir="rtl" style="background-color: rgba(255,255,255,0);height: 100%"
                         class="bg-grey-lighten-5 rounded-lg ">
                        <v-btn density="compact" icon size="small" position="fixed" class="mt-n2 mr-n2">
                            <v-tooltip activator="parent" location="right">صفحه اصلی</v-tooltip>
                            <v-icon size="x-small" icon="mdi-close"></v-icon>
                        </v-btn>
                        <v-row class="ma-0 pa-0 " justify="center" align="center" style="height: 100%">
                            <v-btn size="x-small" icon class="  rounded-lg " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">ریست</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/reset.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>
                            <v-btn size="x-small" icon class="  rounded-lg " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">ترسیم</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/draw.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>
                            <v-btn size="x-small" icon class="  rounded-lg " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">ویرایش</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/edit.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>
                            <v-btn size="x-small" icon class="  rounded-lg" color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">انتقال</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/transfer.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>
                            <v-btn size="x-small" icon class="  rounded-lg " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">جابه جایی</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/transition.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>
                            <v-btn size="x-small" icon class="  rounded-lg  " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">چرخش</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/rotate.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>
                            <v-btn size="x-small" icon class="  rounded-lg  " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">اقلام توصیفی</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/extraList.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>

                            <v-btn size="x-small" icon class="  rounded-lg " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">حذف</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/delete.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>
                            <v-btn size="x-small" icon class="  rounded-lg " color="" :class="winSize>500?'mr-2':''">
                                <v-tooltip activator="parent" location="bottom">ذخیره</v-tooltip>
                                <v-avatar size="17" class="">
                                    <v-img src="@/assets/icons/save.png" alt="John"></v-img>
                                </v-avatar>
                            </v-btn>


                        </v-row>
                    </div>
                </popupWindow>

                <!--            <popupWindow width="20vw" height="90vh" :close-btn="true">-->
                <!--                <div class="bg-white rounded-b-lg" style="height: 100%">-->
                <!--                    test-->
                <!--                </div>-->
                <!--            </popupWindow>-->
            </template>
        </template>

        <v-btn style="position: fixed;left: 10px;bottom: 50px;z-index: 100001" @click="run">test</v-btn>
        <!--        <router-view v-if="map" :map="map"></router-view>-->

    </div>
    <template v-if="false">
        <click_wfs @clickCallback="clickCallback" :map="map" :source="this.ownSource"></click_wfs>
    </template>

</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";

    import Map from "@/components/openLayers/Map.vue";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue"
    import {default as draw_interaction} from "@/components/openLayers/interactions/draw/Draw.vue"
    import {default as draw_shape_interaction} from "@/components/openLayers/interactions/draw/Shape.vue"
    import {DrawComponentInterface, DrawEvent, DrawType} from "@/components/openLayers/interactions/draw/model";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue"
    import {default as snap} from "@/components/openLayers/interactions/snap/Snap.vue"
    import {default as modify_interaction} from "@/components/openLayers/interactions/modify/Modify.vue"
    import {default as translate_interaction} from "@/components/openLayers/interactions/translate/Translate.vue"
    import {default as select_interaction} from "@/components/openLayers/interactions/select/Select.vue"
    import {ModifyComponentInterface} from "@/components/openLayers/interactions/modify/model";
    import click_wms from "@/components/openLayers/click/wms.vue"
    import click_wfs from "@/components/openLayers/click/wfs.vue"
    import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue"
    import {default as map} from 'ol/Map.js';
    import rotate_interaction from '@/components/openLayers/interactions/rotate/Rotate.vue';
    import TileWMS from 'ol/source/TileWMS.js';
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {ShapeTypes} from '@/components/openLayers/interactions/draw/model';
    import hole_interaction from '@/components/openLayers/interactions/hole/Hole.vue';
    import popupWindow from "@/components/common/popupWindow.vue";
    import drawByCoordinates from '@/components/openLayers/interactions/draw/drawByCoordinates/DrawByCoordinates.vue'
    import {SelectEvent} from "ol/interaction/Select";
    import {DrawByCoordinatesInterface} from "@/components/openLayers/interactions/draw/drawByCoordinates/model";
    import {Layer_types} from "@/models/Layer.Interface";

    export default defineComponent({
        extends: {},
        name: "FeatureComponent",
        components: {
            rotate_interaction,
            popupWindow,
            cluster_source,
            hole_interaction,
            vector_source,
            vector_layer,
            draw_interaction,
            Text_style,
            snap,
            modify_interaction,
            click_wfs,
            draw_shape_interaction,
            translate_interaction,
            drawByCoordinates,
            select_interaction

        },
        setup() {
            const drawRef = ref<DrawComponentInterface>()
            const modifyRef = ref<ModifyComponentInterface>()
            const drawVectorRef = ref<VectorSourceInterface>()
            const selectVectorRef = ref<DrawByCoordinatesInterface>()
            return {
                drawRef, modifyRef, drawVectorRef,selectVectorRef
            }
        },
        data() {
            return {
                drawType: DrawType.POLYGON,
                layerTypes:Layer_types,
                ownSource: null as null | TileWMS,
                shape_types: ShapeTypes,
                draw: true,
                drawNumber: 0,
                winSize: 0,
            }
        },
        props: {
            map: {
                required: true,
                type: map
            }
        },

        watch: {},
        methods: {
            drawEvent(target: DrawEvent) {
                console.log(target, 'ddddddddddd')
                if (target.type === "drawend") {
                    this.drawNumber++
                    if (this.drawNumber === 2)
                        setTimeout(()=>{
                            this.draw = false
                        },1000)
                }

            },
            modifyEvent(target: any) {
                console.log(target, 'mmmmmmmmmmm')
            },
            selectedEvent(target: SelectEvent) {
                console.log(target, 'dddddddddd')
            },
            clickCallback(data: JSON) {
                if (this.drawVectorRef) {
                    this.drawVectorRef.drawFeature(data)
                    this.ownSource = null
                }
            },
            run(){
                if(this.selectVectorRef)
                    this.selectVectorRef.clearSelected()
            }
        },
        mounted(): void {
            this.map.getAllLayers().filter((layer: any) => {
                if (layer.get('name') && layer.get('name') === 'ownLayer')
                    this.ownSource = layer.getSource()
            })
            this.winSize = window.innerWidth


        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
