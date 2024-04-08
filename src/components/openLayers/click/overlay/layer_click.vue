<template>
    <div dir="ltr" style="position: relative">
        <img v-show="markerOverlay" style="width: 80px;height: 80px" :src="store.state.frontUrl+'/pointIcons/9.png'"
             ref="markerOver"
             title="Marker" class="mb-5">
        <div v-show="layerOverlay" ref="layerOver" class="ol-popup mr-n2 text-center over">
            <v-btn class="elevation-3 border" color="error" size="x-small" density="comfortable" icon=""
                   ref="layerPopupCloser" @click="()=>{
                layerOverlay=false
                markerOverlay=false
            }" style="cursor: pointer;position: absolute;right:-7px;top:-7px">
                <v-icon class="" size="small">mdi-close</v-icon>
            </v-btn>
            <template v-if="layerOverList.length>0">
                <v-list-item class="ma-0 pa-0 rounded  elevation-2 my-1 px-1" style="font-size: 9px!important"
                             v-for="layer in layerOverList"
                             :key="layer.id"
                             :title="layer.name"
                             @click="listItemClick(layer.id)"

                ></v-list-item>
            </template>
            <template v-else>
                <p class="text-center font-weight-bold" style="font-size: 10px">لایه ای یافت نشد</p>
            </template>

        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import TileWMS from 'ol/source/TileWMS.js';
    import Feature from 'ol/Feature.js';
    import Point from 'ol/geom/Point.js';

    import {useStore} from "vuex";
    import MapBrowserEvent from "ol/MapBrowserEvent";
    import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
    import {LayerItem} from "@/store/openLayer/types";
    import Overlay from "ol/Overlay";

    export interface ClickLayerData {
        name: string,
        id: number
    }

    export default defineComponent({
        name: "wfsLayerClickComponent",
        components: {},

        props: {

            map: {
                required: true,
                type: Map,
            },
            showLayers:{
                type:Array as PropType<LayerItem[]>,
                default:()=>{
                    return []
                }
            }


        },
        emits: ['listItemClick'],
        setup() {
            const store = useStore()
            const {getLayersByClick} = wfs_functions()

            const layerOver = ref<HTMLElement>()
            const markerOver = ref<HTMLElement>()

            return {
                store, getLayersByClick, layerOver, markerOver
            }
        },

        computed: {},

        data() {
            return {
                layerOverlay: true,
                markerOverlay: true,
                layerOverList: [] as ClickLayerData[],
                overType: {
                    'layer': null,
                    'marker': null
                } as {
                    layer: any,
                    marker: any
                },
                clickCoordinate: [0, 0]
            };
        },

        mounted(): void {

            this.map.on('click', this.mapClick)
            this.setOverLay(true)

        },
        unmounted(): void {
            this.map.un('click', this.mapClick)
            this.setOverLay(false)
            this.layerOverlay = false
            this.markerOverlay = false
        },

        methods: {
            mapClick: async function (evt: MapBrowserEvent<UIEvent>) {

                this.clickCoordinate = evt.coordinate
                const feature = new Feature({geometry: new Point(evt.coordinate)})

                const ownLayers: LayerItem[] = []
                const serviceLayers: LayerItem[] = []
                this.showLayers.map((layer: LayerItem) => {
                    if (layer.service_profile === null) {
                        ownLayers.push(layer)
                    } else {
                        serviceLayers.push(layer)
                    }
                })

                const ownRes: ClickLayerData[] | null = await this.getLayersByClick(ownLayers, feature, 'own', 5)
                const serviceRes: ClickLayerData[] | null = await this.getLayersByClick(serviceLayers, feature, 'service', 1)

                if (ownRes && serviceRes) {

                    this.layerOverList = ownRes.concat(serviceRes)
                    if (this.overType.layer && this.overType.marker) {
                        this.overType.layer.setPosition(evt.coordinate)
                        this.overType.marker.setPosition(evt.coordinate)
                        this.layerOverlay = true
                        this.markerOverlay = true
                    }
                }


            },

            setOverLay(init: boolean) {

                if (init) {
                    if (this.layerOver) {
                        this.overType.layer = new Overlay({
                            element: this.layerOver,
                            positioning: 'center-center',
                            autoPan: true,
                            autoPanAnimation: {
                                duration: 450,
                            },
                        });

                        this.overType.marker = new Overlay({
                            element: this.markerOver,
                            positioning: 'center-center',
                            autoPan: true,
                            autoPanAnimation: {
                                duration: 450,
                            },
                        });

                        this.map.addOverlay(this.overType.layer)
                        this.map.addOverlay(this.overType.marker)
                    }
                }else{
                    this.map.removeOverlay(this.overType.layer)
                    this.map.removeOverlay(this.overType.marker)
                }


            },

            listItemClick(id: number) {
                this.$emit('listItemClick', id, this.clickCoordinate)
                this.layerOverlay = false
                this.markerOverlay = false
            },
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    #marker {

        width: 105px;
        height: 105px;
        position: absolute;
        bottom: -25px;
        left: -53px;

    }

    .ol-popup {
        position: absolute;
        z-index: 1000000001;
        background-color: white;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 30px;
        left: -50px;
        margin-right: -10px;
        height: max-content;
        width: max-content;

    }

    .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        z-index: 1000000001;
    }

    .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        z-index: 1000000001;
        margin-left: -10px;
    }

    .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        z-index: 1000000001;
        left: 48px;
        margin-left: -11px;
    }

    .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;

    }

    .ol-popup-closer:after {
        content: "✖";
        font-size: 10px;
        color: red;
    }

    .over .v-list-item-title {
        font-size: 10px !important;
    }
</style>
