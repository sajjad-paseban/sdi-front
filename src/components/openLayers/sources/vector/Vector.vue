<template>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="draw"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="snap"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="modify"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="shape"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="translate"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="hole"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="rotate"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="delete"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="drawByCoords"></slot>
    <slot v-if="vectorSource" :vectorSource="vectorSource" name="select"></slot>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";

    import Map from 'ol/Map.js';
    import VectorLayer from 'ol/layer/Vector.js';
    import VectorSource from 'ol/source/Vector.js';
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import {GetFeatureForSave} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {useStore} from "vuex";
    import {Layer_types} from "@/models/Layer.Interface";
    import Geometry from 'ol/geom/Geometry.js';
    import Feature from 'ol/Feature.js';
    import {Style} from "ol/style";
    import {LayerItem} from "@/store/openLayer/types";

    export default defineComponent({
        name: "VectorSourceComponent",
        components: {},
        setup() {
            const store = useStore()
            const vectorSource = ref<VectorSource>()
            const {addFeature,addFeatureObject} = source_functions()
            return {vectorSource, addFeature, store,addFeatureObject}
        },
        props: {

            map: {
                required: true,
                type: Map,
            },
            vector: {
                required: true,
                type: VectorLayer,
            }
        },
        mounted(): void {
            this.vectorSource = new VectorSource({})
            this.vector.setSource(this.vectorSource)
        },
        computed: {},
        data() {
            return {};
        },
        methods: {
            drawFeature(features: JSON|JSON[],style?:Style) {
                if (this.vectorSource)
                    this.addFeature(this.vectorSource, features,style)
            },
            drawFeaturesObject(features: Feature[],style?:Style,LStyle?: Style) {
                if (this.vectorSource)
                    this.addFeatureObject(this.vectorSource, features,style,LStyle)
            },

            getSource() {
                if (this.vectorSource) {
                    return this.vectorSource
                }
            },
            removeFeatures(features:Feature[]=[]) {
                if (this.vectorSource)
                    if (features.length>0){
                        features.map((feature)=>{
                            this.vectorSource?.removeFeature(feature)
                        })
                    }else
                        this.vectorSource.clear()
            },
            getFeatureForSave(activeLayer:LayerItem|null=null,layerType:(Layer_types|null)=null): GetFeatureForSave {

                const activeLayerType: Layer_types = activeLayer?activeLayer.type_layer:(layerType?layerType:this.store.getters.getActiveLayer.type_layer)
                if (this.vectorSource) {
                    const features = this.vectorSource.getFeatures().filter((feature: any) => {
                        return feature.getGeometry().getType() === activeLayerType
                    })
                    const featuresGeo: Geometry[] = []

                    if (activeLayerType === Layer_types.MultiPolygon) {

                        features.map((feature: any) => {
                            feature.getGeometry().getPolygons().map((geo: Geometry) => {
                                featuresGeo.push(geo)
                            })
                        })
                    } else if (activeLayerType === Layer_types.MultiLine) {
                        features.map((feature: any) => {
                            feature.getGeometry().getLineStrings().map((geo: Geometry) => {
                                featuresGeo.push(geo)
                            })
                        })
                    } else if (activeLayerType === Layer_types.MultiPoint) {
                        features.map((feature: any) => {
                            feature.getGeometry().getPoints().map((geo: Geometry) => {
                                featuresGeo.push(geo)
                            })
                        })
                    } else {
                        features.map((feature: any) => {
                            featuresGeo.push(feature.getGeometry())
                        })
                        if (features.length > 1) {
                            return {
                                geometries: null,
                                error: ['تعداد عارضه صحیح نیست']
                            }
                        }
                        if (features.length === 0){
                            return {
                                geometries: null,
                                error: ['عارضه ای ترسیم نشده است']
                            }
                        }
                    }
                    return {
                        geometries: featuresGeo,
                        error: []
                    }
                }

                return {
                    geometries: null,
                    error: []
                }
            },

            getFeatures():Feature[]{
                if (this.vectorSource)
                    return this.vectorSource.getFeatures()
                else
                    return []
            }
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
