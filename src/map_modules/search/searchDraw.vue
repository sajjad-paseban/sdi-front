<template>
    <div>
        <vector_layer :map="map" :z-index="10">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">
                    <template v-if="[2,3,4].includes(activePlugin)" #draw="{vectorSource}">
                        <draw_interaction :active-modify="true" ref="drawRef" @drawend="drawEvent"
                                          @drawstart="drawEvent"
                                          :map="map"
                                          :source="vectorSource" :type="setDrawType(activePlugin)"></draw_interaction>
                    </template>

                    <template v-if="[5,6].includes(activePlugin)" #shape="{vectorSource}">
                        <draw_shape_interaction
                                @drawend="drawEvent"
                                :map="map"
                                :shape-type="setShapeType(activePlugin)"
                                :source="vectorSource"></draw_shape_interaction>
                    </template>

                    <template v-if="!([2,3,4].includes(activePlugin))&&drawType !== 'point'" #select="{vectorSource}">
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

                    <template v-if="!([2,3,4].includes(activePlugin))&&drawType === 'point'" #select="{vectorSource}">
                        <select_interaction :cluster="true" ref="selectInteractionRef" @selected="selectedEvent"
                                            :map="map" :source="vectorSource" :vector="vector"></select_interaction>
                    </template>
                </cluster_source>
            </template>

        </vector_layer>

        <feature_toolbar @itemClick="toolbarClick" :left="'38vw'" :items="toolbarItems"
                         :width="{mobile:'45px',desktop:'530px'}"
                         :height="{mobile:'430px',desktop:'38px'}">

            <v-slide-y-transition>
                <v-card v-if="[3,4].includes(activePlugin)"
                        :style="winSize>500?'margin-right: 155px':'margin-right: -155px;margin-top: 90px;'"
                        width="150px" height="90px">
                    <v-row class="ma-0 pa-0 bg-info" justify="center">
                        <p style="font-size: 11px" class="pa-1 font-weight-bold">بافر ترسیم</p>
                    </v-row>
                    <v-row class="ma-0 pa-0 myForm px-3" justify="center">
                        <v-slider
                                v-model="buffer"
                                :max="100"
                                :min="0"
                                :step="10"
                                thumb-label="always"
                                class="mb-n6 mt-7 "
                                thumb-size="12"
                                color="info"
                        >
                            <template v-slot:thumb-label="{ modelValue }">
                                <p style="font-size: 9px" class="ma-n1 pa-0"> {{modelValue}} متر</p>
                            </template>
                        </v-slider>
                    </v-row>
                </v-card>
            </v-slide-y-transition>

            <v-slide-y-transition>
                <v-card v-if="[12].includes(activePlugin)"
                        :style="winSize>500?'margin-right: 30px':'margin-right: -155px;margin-top: 30px;'" width="150px"
                        height="200px">
                    <v-row class="ma-0 pa-0 bg-info" justify="center">
                        <p style="font-size: 11px" class="pa-1 font-weight-bold">جستجو نقطه</p>
                    </v-row>
                    <v-form ref="locationSearchForm">
                        <v-row class="ma-0 pa-0 myForm" justify="center">

                            <v-col class="mb-n1" cols="12">
                                <v-text-field v-model="xPoint" density="compact" variant="solo" :rules="textFloat"
                                              required>
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-numeric"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">طول جغرافیایی</p>
                                    </template>


                                </v-text-field>
                            </v-col>
                            <v-col class="my-n1" cols="12">
                                <v-text-field v-model="yPoint" density="compact" variant="solo" :rules="textFloat"
                                              required>
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-numeric"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">عرض جغرافیایی</p>
                                    </template>


                                </v-text-field>
                            </v-col>


                            <v-col cols="12" class="mt-n1">
                                <v-btn-toggle
                                        v-model="projection"
                                        density="compact"
                                        style="height: 20px;width: 100%"
                                        class="rounded pa-0 myForm"
                                        color="primary"
                                >
                                    <v-btn
                                            value="dd"
                                            variant="tonal"
                                            size="x-small"
                                            style="width: 50%;"
                                            color="primary"

                                    >
                                        <p style="margin-top: 1px" class=" font-weight-bold">DD</p>
                                    </v-btn>
                                    <v-btn
                                            value="utm"
                                            variant="tonal"
                                            size="x-small"
                                            color="primary"
                                            style="width: 50%;"

                                    >
                                        <p style="margin-top: 1px" class=" font-weight-bold">UTM</p>
                                    </v-btn>

                                </v-btn-toggle>
                            </v-col>
                            <v-col class="my-n1" cols="12">
                                <v-btn
                                        variant="tonal"
                                        @click="searchByLocation"
                                        style="font-weight: bold !important;width: 100%;font-size: 11px"
                                        rounded="lg"
                                        size="small"
                                        class=""
                                        color="primary"


                                >جستجو
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                </v-card>
            </v-slide-y-transition>

        </feature_toolbar>

    </div>


</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import {default as map} from 'ol/Map.js';
    import {default as feature_toolbar} from "@/components/common/featureToolbar/featureToolbar.vue";
    import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as draw_interaction} from "@/components/openLayers/interactions/draw/Draw.vue";
    import {DrawEvent, DrawType, ShapeTypes} from "@/components/openLayers/interactions/draw/model";
    import {default as draw_shape_interaction} from "@/components/openLayers/interactions/draw/Shape.vue";
    import search_functions from "@/componentFunctions/search_functions";
    import rules from "@/componentFunctions/rules_functions";
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {LayerItem} from "@/store/openLayer/types";
    import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {default as select_interaction} from "@/components/openLayers/interactions/select/Select.vue";
    import {SelectEvent} from "ol/interaction/Select"
    import {SelectComponentInterface} from "@/components/openLayers/interactions/select/model";
    import Feature from 'ol/Feature.js';
    import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue";
    import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
    import VForm from "@/models/VForm.interface";
    import {Utm} from "geodesy/mgrs";
    import Point from 'ol/geom/Point.js';
    import source_functions from "@/components/openLayers/componentFunctions/source";


    export default defineComponent({
        extends: {},
        name: "SearchDrawComponent",
        components: {
            feature_toolbar,
            vector_source,
            vector_layer,
            draw_interaction,
            draw_shape_interaction,
            Text_style,
            select_interaction,
            cluster_source,
        },

        setup() {
            const activePlugin = ref<number>(0)
            const {setAddType, addType} = search_functions()
            const {getFeaturesByDraw} = wfs_functions()
            const {addFeaturesObject} = source_functions()
            const drawType = ref('point')

            const locationSearchForm = ref<VForm>()

            const {textFloat} = rules()
            const store = useStore()
            const toast = useToast()

            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const drawClusterSourceRef = ref<ClusterSourceInterface>()
            const selectInteractionRef = ref<SelectComponentInterface>()
            return {
                activePlugin,
                setAddType,
                addType,
                textFloat,
                store,
                toast,
                getFeaturesByDraw,
                drawVectorSourceRef,
                selectInteractionRef,
                drawClusterSourceRef,
                drawType,
                locationSearchForm,
                addFeaturesObject
            }
        },

        data() {
            return {

                toolbarItems: [
                    {
                        id: 1,
                        icon: '/icons/reset.png',
                        name: 'ریست',
                        disabled: false
                    },
                    {
                        id: 12,
                        icon: '/icons/location_search.png',
                        name: 'جتسجو با مختصات',
                        disabled: false
                    },
                    {
                        id: 11,
                        icon: '',
                        name: '',
                        divider: true
                    },
                    {
                        id: 2,
                        icon: '/icons/polygon.png',
                        name: 'ترسیم پالیگون',
                        disabled: false
                    },
                    {
                        id: 3,
                        icon: '/icons/lineString.png',
                        name: 'ترسیم خط',
                        disabled: false
                    },
                    {
                        id: 4,
                        icon: '/icons/point.png',
                        name: 'ترسیم نقطه',
                        disabled: false
                    },
                    {
                        id: 5,
                        icon: '/icons/box.png',
                        name: 'ترسیم باکس',
                        disabled: false
                    },
                    {
                        id: 6,
                        icon: '/icons/circle.png',
                        name: 'ترسیم دایره',
                        disabled: false
                    },
                    {
                        id: 10,
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
                        active: true,
                        disabled: false
                    },
                    {
                        id: 13,
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
                buffer: 0,

                //-----search by location-------//
                projection:'utm',
                xPoint:'',
                yPoint:'',
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

        emits: [
            'changeShowType', 'setFindFeatures', 'mapFeatureSelect', 'changeDrawShowType','reset'
        ],

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

            async searchByLocation(){
                const res = await this.locationSearchForm?.validate()
                if (res?.valid&&this.drawVectorSourceRef){
                    if(this.projection === 'dd'){
                        const feature = new Feature({
                            geometry:new Point([parseFloat(this.yPoint),parseFloat(this.xPoint)])
                        })
                        this.addFeaturesObject(this.drawVectorSourceRef.getSource(),[feature])
                        this.map.getView().animate({
                            center:[parseFloat(this.yPoint),parseFloat(this.xPoint)],
                            duration:2000,
                            zoom:19
                        })
                    }else {
                        const latLon = new Utm(this.store.getters.getZone, 'N', parseFloat(this.xPoint), parseFloat(this.yPoint)).toLatLon()
                        const feature = new Feature({
                            geometry:new Point([latLon.lng, latLon.lat])
                        })
                        this.addFeaturesObject(this.drawVectorSourceRef.getSource(),[feature])
                        this.map.getView().animate({
                            center:[latLon.lng, latLon.lat],
                            duration:2000,
                            zoom:19
                        })
                    }

                }
            },

            async drawEvent(target: DrawEvent) {
                if (target.type === "drawend" && this.searchLayer) {
                    const features = await this.getFeaturesByDraw(this.searchLayer, target.feature, this.buffer)
                    this.$emit('setFindFeatures', features ? features : [], this.drawVectorSourceRef, this.drawClusterSourceRef)
                    this.drawVectorSourceRef?.removeFeatures([target.feature])
                    this.toolbarClick(this.toolbarItems[1])
                }

            },

            selectedEvent(event: SelectEvent) {
                console.log(event)
                this.$emit('mapFeatureSelect', event.selected[0].get('pk'))
            },

            setDrawType(plugin: number) {
                if (plugin === 2)
                    return DrawType.POLYGON
                else if (plugin === 3)
                    return DrawType.LINESTRING
                else
                    return DrawType.POINT
            },
            setShapeType(plugin: number) {
                if (plugin === 5)
                    return ShapeTypes.BOX
                else
                    return ShapeTypes.CIRCLE
            },

            toolbarClick(item: FTItemsInterface) {
                if (this.searchLayer) {
                    this.toolbarItems.map((item) => {
                        item.disabled = true
                    })
                    if (this.activePlugin === 0) {
                        if ([7, 8, 9].includes(item.id)) {
                            this.toolbarItems.map((item) => {
                                if ([7, 8, 9].includes(item.id)) {
                                    item.active = false
                                }
                                item.disabled = false
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
                                item.disabled = false
                            })

                            this.toolbarItems.map((i) => {
                                if (i.id === item.id) {
                                    i.active = true
                                    this.drawType = item.id === 15 ? 'point' : 'feature'
                                    this.$emit('changeDrawShowType', this.drawType,this.drawVectorSourceRef, this.drawClusterSourceRef)

                                }
                            })
                        } else if (item.id === 1) {
                            this.toolbarItems.map((item) => {
                                item.disabled = false
                            })
                            if (this.drawVectorSourceRef && this.drawClusterSourceRef) {
                                this.drawVectorSourceRef.removeFeatures()
                                this.drawClusterSourceRef.removeFeatures()
                            }
                            this.$emit('reset', true)
                        } else {
                            this.activePlugin = item.id
                            item.disabled = false
                            if (this.drawVectorSourceRef && this.drawClusterSourceRef) {
                                this.drawVectorSourceRef.removeFeatures()
                                this.drawClusterSourceRef.removeFeatures()
                            }
                        }

                    } else {
                        this.toolbarItems.map((item) => {
                            item.disabled = false
                        })
                        this.activePlugin = 0
                    }
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'ابتدا لایه را انتخاب کنید'
                    });
                }

            }
        },
        computed: {
            winSize() {
                return window.innerWidth
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
