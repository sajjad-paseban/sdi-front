<template>
    <slot v-if="source" :vectorSource="source" name="select"></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import VectorSource from 'ol/source/Vector.js';
    import VectorLayer from 'ol/layer/Vector.js';
    import {GeoJSON, WFS} from 'ol/format.js';
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import {Cluster} from 'ol/source.js';
    import {
        Circle as CircleStyle,
        Fill,
        Stroke,
        Style,
        Text,
    } from "ol/style";
    import Feature from "ol/Feature";
    import {useStore} from "vuex";
    import axios from "axios";

    export default defineComponent({
        name: "ClusterComponent",
        components: {},
        setup() {
            const {addFeature, featuresToCenterPointFeatures,addFeatureObject} = source_functions()
            const source = ref<VectorSource>()
            const store = useStore()
            // const textStyleRef = ref<TextStyleInterface>()
            return {addFeature, source, featuresToCenterPointFeatures,addFeatureObject, store}
        },
        props: {

            map: {
                required: true,
                type: Map,
            },
            vector: {
                required: true,
                type: VectorLayer,
            },
            layers: {
                required: true,
                type: String,
                default:''
            },
            authKey: {
                required: false,
                type: String,
                default: ''
            },


        },

        unmounted(): void {
            this.deleteClusterSource()
        },

        mounted(): void {
            this.initSource()
            this.getFeature()

        },
        computed: {},

        data() {
            return {};
        },
        methods: {

            async getFeature() {
                if (this.layers !== ''){
                    const response = await axios({
                        method: "get",
                        url: this.store.state.geoUrl + '/wfs',
                        params: {
                            service: 'WFS',
                            request: 'GetFeature',
                            outputFormat: 'application/json',
                            typeName: this.layers,
                            srsName: "EPSG:4326",
                            authkey: this.authKey
                        },

                    })
                    if (this.source) {
                        this.addFeature(this.source, response.data)
                        this.initCluster()
                    }
                }

            },
            initSource() {
                this.source = new VectorSource()
            },

            drawFeature(data: JSON|JSON[]) {

                if (this.source) {
                    this.addFeature(this.source, this.featuresToCenterPointFeatures(data))
                    this.initCluster()
                }
            },
            removeFeatures(features: Feature[] = []) {
                if (this.source)
                    if (features.length > 0) {
                        features.map((feature) => {
                            this.source?.removeFeature(feature)
                        })
                    } else
                        this.source.clear()
            },
            initCluster() {
                const clusterSource = new Cluster({
                    distance: 25,
                    minDistance: 10,
                    source: this.source,
                });
                const styleCache: any = {};
                this.vector.setStyle((feature) => {
                    const size = feature.get('features').length;
                    let style = styleCache[size];
                    if (!style) {
                        style = new Style({
                            image: new CircleStyle({
                                radius: 10,
                                stroke: new Stroke({
                                    color: '#fff',
                                }),
                                fill: new Fill({
                                    color: '#3399cc',
                                }),
                            }),
                            text: new Text({
                                text: size.toString(),
                                fill: new Fill({
                                    color: '#fff',
                                }),
                            }),
                        });
                        styleCache[size] = style;
                    }
                    return style;
                })
                this.vector.setSource(clusterSource)
            },
            deleteClusterSource() {
                this.vector.setSource(null)
            },

            getFeatures():Feature[]{
                if (this.source)
                    return this.source.getFeatures()
                else
                    return []
            },
            getSource() {
                if (this.source) {
                    return this.source
                }
            },
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
