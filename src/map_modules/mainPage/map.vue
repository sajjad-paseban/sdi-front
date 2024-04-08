<template>
    <div style="height:100%;width: 100%;position: relative">
        <Map :height="'100%'" :width="'100%'" :id="fullScreen?'sub_map':'main_map'" style="z-index: 100001">
            <template v-if="store.getters.getMapConfig" #view="{map}">
                <View :max_zoom="store.getters.getMapConfig.maxZoom" :min_zoom="store.getters.getMapConfig.minZoom"
                      :center="store.getters.getMapConfig.center" :projection="projection"
                      :zoom="store.getters.getMapConfig.currentZoom" :map="map">

                </View>
            </template>


            <template #tile="{map}">
                <Tile_layer v-if="store.getters.getSubActiveBaseMap&&fullScreen" :map="map">
                    <template #source="{tile}">
                        <Tile_xyz :url="store.getters.getSubActiveBaseMap.address" :name="'baseMap'" :map="map"
                                  :tile="tile"></Tile_xyz>
                    </template>

                </Tile_layer>
                <Tile_layer v-if="store.getters.getActiveBaseMap&&!fullScreen" :map="map">
                    <template #source="{tile}">
                        <Tile_xyz :url="store.getters.getActiveBaseMap.address" :name="'baseMap'" :map="map"
                                  :tile="tile"></Tile_xyz>
                    </template>

                </Tile_layer>

                <Tile_layer v-if="ownLayersName !== ''" :map="map" :name="'ownLayer'">
                    <template #source="{tile}">
                        <Tile_wms :auth-key="authKey" :map="map" :tile="tile"
                                  :url="store.state.geoUrl+'/sdi/wms'"
                                  :layers="'sdi:'+ ownLayersName">
                        </Tile_wms>
                    </template>
                </Tile_layer>
                <template v-if="serviceLayers.length>0">
                    <Tile_layer v-for="item in serviceLayers" :key="item.id" :map="map" :name="String(item.id)">
                        <template #source="{tile}">
                            <Tile_wms :map="map" :tile="tile" :url="item.service_profile.address"
                                      :layers="item.service_profile.layers" :auth-key="item.service_profile.apiKey">
                            </Tile_wms>
                        </template>
                    </Tile_layer>
                </template>

                <!--            cluster layers-->
                <template v-if="fullScreen">
                    <vector_layer  :z-index="index+100" :map="map" v-for="(layer,index) in store.getters.getSubClusterLayers" :key="layer.id">
                        <template v-if="true" #clusterSource="{vector}">
                            <cluster_source :auth-key="authKey" :layers="`sdi:${layer.table_name}`" :map="map" :vector="vector"></cluster_source>
                        </template>
                    </vector_layer>
                </template>

                <template v-if="!fullScreen">
                    <vector_layer  :z-index="index+100" :map="map" v-for="(layer,index) in store.getters.getClusterLayers" :key="layer.id">
                        <template v-if="true" #clusterSource="{vector}">
                            <cluster_source :auth-key="authKey" :layers="`sdi:${layer.table_name}`" :map="map" :vector="vector"></cluster_source>
                        </template>
                    </vector_layer>
                </template>


            </template>



            <template #default>
                <slot></slot>
            </template>

        </Map>

    </div>


</template>

<script lang="ts">
    import {defineComponent, PropType, ref, onMounted, watch} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import Map from "@/components/openLayers/Map.vue";
    import View from "@/components/openLayers/View.vue";
    import Tile_layer from "@/components/openLayers/layers/Tile.vue";
    import Tile_xyz from "@/components/openLayers/sources/XYZ.vue";
    import Tile_wms from "@/components/openLayers/sources/TileWMS.vue";
    import {LayerItem} from "@/store/openLayer/types";
    import DrawFilterFeatureToolbar from './drawFilterFeatureToolbar.vue'
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
    import {useToast} from "primevue/usetoast";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue";


    export default defineComponent({
        name: "mapComponent",
        components: {Map, View, Tile_layer, Tile_xyz, Tile_wms,vector_layer,cluster_source},
        setup(props) {
            const store = useStore();
            const ownLayersName = ref<string>('')
            const serviceLayers = ref<LayerItem[]>([])
            const authKey = store.getters.getUser.jwt.access

            const sortLayer = (layersName: string[]): string[] => {
                const sorted :string[] = []

                store.getters.getLayersSort.map((layer:LayerItem)=>{
                    if (layer.table_name &&layersName.includes(layer.table_name)){
                        sorted.push(layer.table_name)
                    }
                })
                const not_sorted_layers:string[] = layersName.filter((name_table)=>{
                    return !sorted.includes(name_table)
                })

                return sorted.concat(not_sorted_layers)
            }
            const showLayersHandler = (value: LayerItem[]):void=>{
                const layersName: string[] = []
                serviceLayers.value = []
                // console.log(value)
                value.map((layer) => {
                    if (layer.imported_type !== 'wms' && layer.table_name)
                        layersName.push(layer.table_name)
                    else {
                        serviceLayers.value.push(layer)
                    }
                })
                if (layersName.length > 0) {
                    const sortedLayers: string[] = sortLayer(layersName)
                    ownLayersName.value = sortedLayers.reverse().join(',')
                } else
                    ownLayersName.value = ''
            }

            watch(() => store.getters.getShowLayers, (value: LayerItem[]) => {
                if (!props.fullScreen)
                    showLayersHandler(value)
            });

            watch(() => store.getters.getSubShowLayers, (value: LayerItem[]) => {
                if (props.fullScreen)
                    showLayersHandler(value)
            });
            watch(() => store.getters.getLayersSort, (value: LayerItem[]) => {
                showLayersHandler(store.getters.getShowLayers)
            });

            const center = ref([59.60592, 36.29749]);
            const projection = ref("EPSG:4326");
            const zoom = ref(13);
            const rotation = ref(0);

            return {
                center,
                projection,
                zoom,
                rotation,
                ownLayersName,
                serviceLayers,
                store,
                authKey
            };
        },
        data() {
            return {
                initData: false,


            };
        },
        emits: [],

        methods: {


        },
        props:{
            fullScreen:{
                type:Boolean,
                default:false
            }
        },




    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .ol-overviewmap-map .ol-viewport {
        width: 130px !important;
        height: 130px !important;

    }

    .ol-overviewmap-map {
        width: 132px !important;
        height: 132px !important;
        margin-bottom: 5px !important;

    }

    .ol-zoomslider {
        top: 4.5em !important;
        left: .5em;
        height: 240px;
        border: 2px solidrgba(0, 60, 136, .5);
    }

    .ol-zoom {
        top: 14px !important;
        left: 0.6em !important;
    }

    @media only screen and (max-width: 500px) {
        .ol-zoomslider {
            display: none !important;
        }

        .ol-overviewmap-map {
            display: none !important;
        }
    }


    @media only screen and  (max-height: 500px) {
        .ol-zoomslider {
            display: none !important;
        }

        .ol-overviewmap-map {
            display: none !important;
        }
    }

    @media only screen and (max-height: 450px) {
        .ol-overviewmap-map {
            margin-bottom: 20px !important;
        }
    }
</style>
