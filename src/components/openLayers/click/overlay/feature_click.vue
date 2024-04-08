<template>
    <div dir="ltr" style="position: relative">
        <img v-show="markerOverlay" style="width: 80px;height: 80px" :src="store.state.frontUrl+'/pointIcons/9.png'"
             ref="markerOver"
             title="Marker" class="mb-5">
        <div v-show="featureOverlay" ref="featureOver" style="min-width:150px" class="ol-popup mr-n2 text-center over">
            <v-btn class="elevation-3 border" color="error" size="x-small" density="comfortable" icon=""
                   ref="layerPopupCloser" @click="()=>{
                featureOverlay=false
                markerOverlay=false
                $emit('featureClick',null)
            }" style="cursor: pointer;position: absolute;right:-7px;top:-7px">
                <v-icon class="" size="small">mdi-close</v-icon>
            </v-btn>

            <slot name="extraBtn"  :feature="closestFeature"></slot>

            <template v-if="externalApi===null">
                <v-table style=" max-height: 40dvh;max-width:60vw;overflow-x:auto;overflow-y: auto"
                         class="border elevation-2 rounded " density="compact">
                    <thead>

                    </thead>
                    <tbody>
                    <tr
                            v-for="(value, name, index) in featureOverList"
                            :key="index"
                    >
                        <td class="font-weight-bold">{{ value }}</td>
                        <td class="font-weight-bold">{{ name }}</td>

                    </tr>
                    </tbody>
                </v-table>

            </template>
            <template v-else>
                <v-row v-if="ExternalApiLoading" class="pa-0 ma-0 " align="center" style="height: 100%"
                       justify="center">
                    <v-fade-transition>
                        <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                    </v-fade-transition>
                </v-row>
                <template v-if="externalApi.resType=== ExternalApiResType.HTML">
                    <div v-html="ApiResponse"
                         style="max-height: 40dvh;max-width:60vw;overflow-x:auto;overflow-y: auto;min-width: 100px;min-height:50px">
                    </div>
                </template>
                <template v-if="externalApi.resType=== ExternalApiResType.ArrayJSON">
                    <v-table v-if="ApiResponse"
                             style=" max-height: 40dvh;max-width:60vw;overflow-x:auto;overflow-y: auto;"
                             class="border elevation-2 rounded " density="compact">
                        <thead>

                        </thead>
                        <tbody>
                        <tr
                                v-for="(value, name, index) in ApiResponse"
                                :key="index"
                        >
                            <td class="font-weight-bold">{{ value }}</td>
                            <td class="font-weight-bold">{{ name }}</td>

                        </tr>
                        </tbody>
                    </v-table>
                </template>
            </template>


        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, watch} from "vue";
import Map from 'ol/Map.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import {useStore} from "vuex";
import MapBrowserEvent from "ol/MapBrowserEvent";
import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
import {LayerItem} from "@/store/openLayer/types";
import Overlay from "ol/Overlay";
import source_functions from "@/components/openLayers/componentFunctions/source";
import * as turf from "@turf/turf";
import {ApiResType, ExternalApiInterface} from "@/models/Conncections.interface";
import axios from "axios";
import {object} from "zod";
import layer_functions from "@/componentFunctions/layer_functions";


export default defineComponent({
    name: "wfsFeatureClickComponent",
    components: {},

    props: {

        map: {
            required: true,
            type: Map,
        },

        activeClick: {
            type: Boolean,
            default: true
        },

        externalApi: {
            type: Object as PropType<ExternalApiInterface | null>,
            default: null
        }


    },
    emits: ['featureClick','coordinateClick'],
    setup() {
        const store = useStore()
        const {getFeaturesByDraw} = wfs_functions()
        const {getJsonFeaturesInfo, getCenterOfFeature, getClosestPointFeatureFromCoordinate} = source_functions()
        const {getLayerFields,layerFieldsList} = layer_functions()

        const featureOver = ref<HTMLElement>()
        const markerOver = ref<HTMLElement>()
        const ExternalApiResType = ApiResType


        return {
            getLayerFields,
            getClosestPointFeatureFromCoordinate,
            store,
            getFeaturesByDraw,
            featureOver,
            markerOver,
            getJsonFeaturesInfo,
            getCenterOfFeature,
            ExternalApiResType,
            layerFieldsList
        }
    },

    computed: {},

    data() {
        return {
            featureOverlay: true,
            markerOverlay: true,
            closestFeature:null as null|Feature,
            featureOverList: {} as any,
            overType: {
                'feature': null,
                'marker': null
            } as {
                feature: any,
                marker: any
            },
            clickCoordinate: [0, 0],

            ApiResponse: null as any,
            ExternalApiLoading: false,
            externalApiRes: null as any,
        };
    },

    async mounted(): void {

        if (this.activeClick) {
            this.map.on('click', this.mapClick)
        } else {
            this.map.un('click', this.mapClick)
        }

        this.setOverLay(true)

    },
    unmounted(): void {
        this.map.un('click', this.mapClick)
        this.setOverLay(false)
        this.featureOverlay = false
        this.markerOverlay = false
    },

    methods: {
        mapClick: async function (evt: MapBrowserEvent<UIEvent>) {
            this.clickCoordinate = evt.coordinate
            const feature = new Feature({geometry: new Point(evt.coordinate)})

            this.ExternalApiLoading = true
            const res = await this.getFeaturesByDraw(this.store.getters.getActiveLayer, feature, 5, false)
            this.ExternalApiLoading = false

            let features = this.getJsonFeaturesInfo(res)

            const closest_feature = this.getClosestPointFeatureFromCoordinate(features, this.clickCoordinate)
            if (closest_feature) {
                features[0] = closest_feature
                this.closestFeature = closest_feature
            }

            this.$emit('featureClick', res)
            this.$emit('coordinateClick',this.clickCoordinate)
            if (features.length > 0) {
                const position: turf.Point | null = this.getCenterOfFeature(features[0])
                if (position) {
                    this.overType.marker.setPosition(position.coordinates)
                    this.overType.feature.setPosition(position.coordinates)

                    await this.setOverlayInfo(features[0])

                    this.featureOverlay = true
                    this.markerOverlay = true
                }
            } else {
                this.featureOverlay = false
                this.markerOverlay = false
            }


        },

        async clickByCoordinate(coordinate: [number, number]) {
            this.clickCoordinate = coordinate
            if (this.layerFieldsList == undefined){
                const layer: LayerItem = this.store.getters.getActiveLayer
                await this.getLayerFields(layer.id)

            }
            const feature = new Feature({geometry: new Point(coordinate)})

            this.ExternalApiLoading = true
            const res = await this.getFeaturesByDraw(this.store.getters.getActiveLayer, feature, 5, false)
            this.ExternalApiLoading = false

            this.$emit('featureClick', res)
            const features = this.getJsonFeaturesInfo(res)

            const position: turf.Point | null = this.getCenterOfFeature(features[0])
            if (position) {
                this.overType.marker.setPosition(position.coordinates)
                this.overType.feature.setPosition(position.coordinates)

                await this.setOverlayInfo(features[0])

                this.featureOverlay = true
                this.markerOverlay = true
            }

        },

        setOverLay(init: boolean) {

            if (init) {
                if (this.featureOver) {
                    this.overType.feature = new Overlay({
                        element: this.featureOver,
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

                    this.map.addOverlay(this.overType.feature)
                    this.map.addOverlay(this.overType.marker)
                }
            } else {
                this.map.removeOverlay(this.overType.feature)
                this.map.removeOverlay(this.overType.marker)
            }


        },

        set_p_topic_to_featureOverList(){
            const new_featureOverList = {}
            for (let key in this.featureOverList) {

                let find = false

                if (this.layerFieldsList){
                    this.layerFieldsList.map((item)=>{
                        if (item.name==key&&item.p_topic){
                            new_featureOverList[item.p_topic] = this.featureOverList[key]
                            find = true
                        }
                    })
                }

                if (!find){
                    new_featureOverList[key] = this.featureOverList[key]
                }
            }
            this.featureOverList = {...new_featureOverList}
        },

        async setOverlayInfo(feature: Feature) {
            this.ExternalApiLoading = true
            if (this.externalApi === null) {
                this.featureOverList = feature.getProperties()
                delete this.featureOverList.geometry
                this.set_p_topic_to_featureOverList()
                this.ExternalApiLoading = false
            } else {
                try {
                    const params: any = {}
                    this.externalApi.params.map((param) => {
                        console.log(param)
                        if (param.name === "layer_code") {
                            const layer: LayerItem = this.store.getters.getActiveLayer
                            params['layer_code'] = layer.code
                        } else {
                            if (param.fixed_value) {
                                params[param.name] = param.value
                            } else {
                                if (param.name in feature.getProperties()) {
                                    params[param.name] = feature.getProperties()[param.name]
                                }
                            }
                        }
                    })

                    const headers: any = {}
                    this.externalApi.headers.map((param) => {
                        if (param.fixed_value) {
                            headers[param.name] = param.value
                        }
                    })

                    const response = await axios({
                        method: this.externalApi.method,
                        url: this.externalApi.address,
                        params: params,
                        headers: headers
                    })

                    console.log(response.data, 'setOverlayInfo response')

                    this.ApiResponse = response.data

                    this.ExternalApiLoading = false
                } catch (e) {
                    console.log(e)
                    this.ExternalApiLoading = false
                }
            }

        }


    },
    watch: {
        activeClick() {
            if (this.activeClick) {
                this.map.on('click', this.mapClick)
            } else {
                this.map.un('click', this.mapClick)
            }
        },

        ExternalApiLoading() {
            if (this.ExternalApiLoading)
                this.ApiResponse = null
        }
    },

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 30px;
    left: -50px;
    margin-right: -10px;
    height: max-content;
    width: max-content;
    min-width: 80px;
    min-height: 50px


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

.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > td {
    font-size: 10px !important;
}

.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
    padding: 3px 8px !important;
}

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > td,
.v-table--density-compact > .v-table__wrapper > table > thead > tr > td,
.v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
    height: 21px !important;
}
</style>
