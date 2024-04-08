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
                        <select_interaction ref="selectInteractionRef" :map="map"
                                            :source="vectorSource" :vector="vector"></select_interaction>
                    </template>
                </vector_source>
            </template>

            <template v-if="true" #style="{vector}">
                <Text_style :number-in-coords="true" :fill-color="'rgba(137,231,234,0.58)'" :line-color="'rgba(20,126,239,0.9)'"
                            :vector="vector"></Text_style>
            </template>
        </vector_layer>




        <feature_toolbar @itemClick="toolbarClick" :left="'300px'" :items="toolbarItems" :show-close="false"
                         :width="{mobile:'45px',desktop:'310px'}"
                         :height="{mobile:'340px',desktop:'38px'}">

            <v-slide-y-transition>
                <v-card v-if="[3,4].includes(activePlugin)&&false"
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

        </feature_toolbar>
    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, PropType, ref} from "vue";

    import {useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {default as feature_toolbar} from "@/components/common/featureToolbar/featureToolbar.vue";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as select_interaction} from "@/components/openLayers/interactions/select/Select.vue";
    import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {default as draw_interaction} from "@/components/openLayers/interactions/draw/Draw.vue";
    import {default as draw_shape_interaction} from "@/components/openLayers/interactions/draw/Shape.vue";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import {useToast} from "primevue/usetoast";
    import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
    import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
    import {default as map} from "ol/Map";
    import {LayerItem} from "@/store/openLayer/types";
    import {DrawEvent, DrawType, ShapeTypes} from "@/components/openLayers/interactions/draw/model";
    import featureBC, {featureBCEnums} from "@/broadcast/featureBroadcast";
    import Feature from "ol/Feature";


    export default defineComponent({
        name: "DrawFeatureAsModelInputComponent",
        components: {
            feature_toolbar,
            vector_layer,
            select_interaction,
            Text_style,
            draw_interaction,
            draw_shape_interaction,
            vector_source,
        },
        setup(props) {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const toast = useToast()

            const activePlugin = ref<number>(0)
            const {getFeaturesByDraw} = wfs_functions()
            const drawType = ref('point')
            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const {setFeaturesBC,featureBroadcast} = featureBC()



            return {
                store,
                router,
                activePlugin,
                drawType,
                getFeaturesByDraw,
                drawVectorSourceRef,
                toast,setFeaturesBC,featureBroadcast,route
            }
        },
        data() {
            return {
                initData: false,

                toolbarItems: [
                    {
                        id: 1,
                        icon: '/icons/reset.png',
                        name: 'ریست',
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
                        id: 11,
                        icon: '',
                        name: '',
                        divider: true
                    },

                    {
                        id: 7,
                        icon: '/icons/save.png',
                        name: 'ذخیره',
                        disabled: false
                    },


                ] as FTItemsInterface[],
                buffer: 0,
            };
        },
        props: {
            map: {
                required: true,
                type: map
            },
        },
        emits: [
            'setDrawFeatures', 'reset', 'saveBtn'
        ],

        methods: {



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

            saveDrawFeatures(){

                const features:Feature[] = this.drawVectorSourceRef?this.drawVectorSourceRef.getFeatures():[]

                if (features?.length=== 0){
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'ترسیمی وجود ندارد'
                    });
                }else {

                    this.setFeaturesBC(features,String(this.route.name))

                }


            },

            toolbarClick(item: FTItemsInterface) {

                this.toolbarItems.map((item) => {
                    item.disabled = true
                })
                if (this.activePlugin === 0) {
                    if (item.id === 1) {
                        this.toolbarItems.map((item) => {
                            item.disabled = false
                        })
                        if (this.drawVectorSourceRef) {
                            this.drawVectorSourceRef.removeFeatures()
                        }
                        this.$emit('reset', true)
                    } else if (item.id === 7) {

                        this.saveDrawFeatures()
                        this.toolbarItems.map((item) => {
                            item.disabled = false
                        })
                    } else {
                        this.activePlugin = item.id
                        item.disabled = false
                        if (this.drawVectorSourceRef) {
                            this.drawVectorSourceRef.removeFeatures()
                        }
                    }

                } else {
                    this.toolbarItems.map((item) => {
                        item.disabled = false
                    })
                    this.activePlugin = 0
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
