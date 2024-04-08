<template>
    <div>
        <vector_layer :map="map" :visible="measureFeatureSide">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">
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

                    <template v-if="activeSelect" #select="{vectorSource}">
                        <select_interaction @selected="selectedEvent" :cluster="true" ref="selectInteractionRef"
                                            :map="map" :source="vectorSource" :vector="vector"></select_interaction>
                    </template>
                </cluster_source>
            </template>

        </vector_layer>

    </div>
</template>

<script lang="ts">
    import {defineComponent, inject, onMounted, PropType, ref, watch} from "vue";
    import {default as map} from "ol/Map";
    import Feature from 'ol/Feature.js';
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {GetFeatureModel} from "@/map_modules/info/externalPage.interface";
    import {LayerItem} from "@/store/openLayer/types";
    import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {default as select_interaction} from "@/components/openLayers/interactions/select/Select.vue";
    import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue";
    import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
    import {SelectComponentInterface} from "@/components/openLayers/interactions/select/model";
    import {SelectEvent} from "ol/interaction/Select";
    import {FeatureClickInterface} from "@/components/openLayers/click/overlay/feature_click_interface";
    import {OpenLayerMutations} from "@/store/openLayer/mutations";
    import Geometry from 'ol/geom/Geometry.js';
    import GeometryCollection from 'ol/geom/GeometryCollection.js';
    import {OpenLayerAction} from "@/store/openLayer/actions";
    import ExternalApis from "@/componentFunctions/connection_externalApi_functions";
    import {Coordinate} from "ol/coordinate";

    export interface JsonFeature {
        layer_code: string,
        feature: JSON
    }

    export default defineComponent({
        name: "ExternalPageComponent",
        components: {
            vector_layer,
            vector_source,
            Text_style,
            select_interaction,
            cluster_source,

        },

        setup(props) {
            const store = useStore();
            const toast = useToast()

            const {getFeatureByField} = wfs_functions()
            const {addFeature,getJsonFeaturesInfo, getCenterOfFeature, getJsonFeatureInfo,getClosestPointFeatureFromCoordinate,featureToJson} = source_functions()
            const {getExternalApisByName} = ExternalApis()

            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const drawClusterSourceRef = ref<ClusterSourceInterface>()
            const selectInteractionRef = ref<SelectComponentInterface>()

            watch(() => store.getters.getActiveLayer, (value: LayerItem | null) => {
                if (drawClusterSourceRef.value && drawVectorSourceRef.value && value == null) {
                    drawClusterSourceRef.value.removeFeatures()
                    drawVectorSourceRef.value.removeFeatures()
                }
            });
            return {
                store,
                toast,
                getFeatureByField,
                addFeature,
                drawVectorSourceRef,
                drawClusterSourceRef,
                selectInteractionRef,getClosestPointFeatureFromCoordinate,getJsonFeaturesInfo,
                getCenterOfFeature, getJsonFeatureInfo,getExternalApisByName,featureToJson
            }

        },

        props: {
            map: {
                required: true,
                type: map
            },

            featureClickRef: {
                required: true,
                type: Object as PropType<FeatureClickInterface>
            },

            featureClickInject: {
                required: false,
                type: Object as PropType<any>
            },

            clickInjectCoordinate: {
                required: false,
                type: Object as PropType<Coordinate>
            },

            measureFeatureSide:{
                type:Boolean,
                default:false
            }


        },


        data() {
            return {
                mapFeatures: [] as JsonFeature[],
                activeSelect: false,
                selectedFeature: null as JsonFeature | null,
            };
        },

        emits: [
            'setActiveClick','setExternalApi'
        ],

        methods: {

            mapInitExternal: function (data: any) {
                data.detail.initData(this.store.getters.getSubMap, this.store.getters.getLayers,
                    this.getFeaturesJsonByFieldName, this.addFeaturesToMap, this.setActiveLayer, this.setActiveSelect,
                    this.setActiveClick, this.selectFeature,this.setShowLayers,this.setExternalApi)
            },

            async getFeaturesJsonByFieldName(features: GetFeatureModel[]) {
                const jsonFeatures: JsonFeature[] = []
                for (let i = 0; i < features.length; i++) {
                    const feature = features[i]
                    let layer: LayerItem | null = null
                    this.store.getters.getLayers.map((item: LayerItem) => {
                        if (String(feature.layer_code) === String(item.code)) {
                            layer = item
                        }
                    })
                    if (layer) {
                        const res = await this.getFeatureByField(layer, feature.name, feature.value)
                        res.features.map((feature: JSON) => {
                            jsonFeatures.push({
                                layer_code: layer?.code ? layer.code : '',
                                feature: feature
                            })
                        })
                    }


                }
                return jsonFeatures
            },

            addFeaturesToMap(features: JsonFeature[]) {
                console.log(features)
                this.selectedFeature = null
                this.mapFeatures = features
                if (this.drawVectorSourceRef && this.drawClusterSourceRef) {
                    // this.addFeature(this.drawVectorSourceRef.getSource(),features)
                    const featuresJson: any = features.map((feature) => {
                        return feature.feature
                    })
                    this.drawClusterSourceRef.removeFeatures()
                    this.drawClusterSourceRef.drawFeature(featuresJson)
                    this.fitMapViewToFeatures(this.drawClusterSourceRef.getFeatures())
                }
            },

            fitMapViewToFeatures(features: Feature[]) {

                const geos: Geometry[] = []
                features.map((feature) => {
                    const featureGeo = feature.getGeometry()
                    if (featureGeo) {
                        geos.push(featureGeo)
                    }
                })

                const collection = new GeometryCollection(geos)

                this.map.getView().fit(collection.getExtent(), {
                    padding: [100, 100, 100, 100],
                    duration: 1000,
                    maxZoom: 19
                })

            },

            selectedEvent(event: SelectEvent) {
                const featureId = event.selected[0].getId()
                const center: any = this.getCenterOfFeature(event.selected[0])?.coordinates
                this.mapFeatures.map(async (feature: any) => {
                    if (feature.feature?.id === featureId) {
                        await this.setActiveLayer(feature.layer_code)

                        this.selectedFeature = feature

                        if (this.featureClickRef) {
                            this.featureClickRef.clickByCoordinate(center)
                        }
                    }
                })
            },

            setActiveLayer(layer_code: string) {
                this.store.commit(OpenLayerMutations.SET_ACTIVE_LAYER, null)
                this.store.getters.getLayers.map((layer: LayerItem) => {
                    if (layer.code === layer_code) {
                        this.store.commit(OpenLayerMutations.SET_ACTIVE_LAYER, layer)
                    }
                })
            },

            setActiveSelect(value: boolean) {
                this.activeSelect = value
            },

            setActiveClick(value: boolean) {
                this.$emit('setActiveClick', value)
            },

            async selectFeature(feature: JsonFeature) {
                this.selectedFeature = feature
                const featureObject = this.getJsonFeatureInfo(feature.feature)
                await this.setActiveLayer(feature.layer_code)
                const center: any = this.getCenterOfFeature(featureObject)?.coordinates
                if (this.drawClusterSourceRef) {
                    this.drawClusterSourceRef.removeFeatures()
                    this.drawClusterSourceRef.drawFeature(feature.feature)
                    this.fitMapViewToFeatures(this.drawClusterSourceRef.getFeatures())
                    if (this.featureClickRef) {
                        this.featureClickRef.clickByCoordinate(center)
                    }
                }

            },

            async setShowLayers(data: string[]) {
                const res: number[] = []

                data.map((code) => {
                    this.store.getters.getLayers.map((layer: LayerItem) => {
                        if (layer.code === code) {
                            res.push(layer.id)
                        }
                    })
                })


                this.store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS,res)
            },

            async setExternalApi(name: string) {
                if (name){
                    const res = await this.getExternalApisByName({name: name})
                    if(res){
                        this.$emit('setExternalApi',res)
                    }
                }else {
                    this.$emit('setExternalApi',null)
                }

            },

        },

        mounted(): void {
            window.addEventListener('mapInitExternal', this.mapInitExternal)
        },
        unmounted(): void {
            window.removeEventListener('mapInitExternal', this.mapInitExternal)
        },

        watch: {
            // selectedFeature() {
            //     if (this.drawVectorSourceRef) {
            //         this.drawVectorSourceRef.removeFeatures()
            //
            //         if (this.selectedFeature) {
            //             this.addFeature(this.drawVectorSourceRef.getSource(), this.selectedFeature.feature)
            //         }
            //     }
            //
            // },
            featureClickInject() {
                if (this.drawClusterSourceRef && this.drawVectorSourceRef) {
                    // this.drawClusterSourceRef.removeFeatures()
                    this.drawVectorSourceRef.removeFeatures()
                }
                if (this.featureClickInject && this.featureClickInject.features.length > 0) {

                    const layer: LayerItem = this.store.getters.getActiveLayer
                    if (this.clickInjectCoordinate){
                        let features = this.getJsonFeaturesInfo(this.featureClickInject)
                        const f = this.getClosestPointFeatureFromCoordinate(features,this.clickInjectCoordinate)
                        if (f){
                            const jsonFeature= this.featureToJson(f)
                            this.selectedFeature = {
                                feature: jsonFeature,
                                layer_code: layer.code ? layer.code : ''
                            }
                        }

                    }else {
                        this.selectedFeature = {
                            feature: this.featureClickInject.features[0],
                            layer_code: layer.code ? layer.code : ''
                        }
                    }


                    if (this.selectedFeature && this.drawVectorSourceRef) {
                        this.addFeature(this.drawVectorSourceRef.getSource(), this.selectedFeature.feature)
                    }
                }
            }
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
