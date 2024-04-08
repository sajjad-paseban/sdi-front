<template>
    <popupWindow :close-btn="true" v-if="winSize!==0" :resize="true" :top="winSize>500?'10px':'10px'"
                 :left="winSize>500?'10px':'10px'" :max_width="winSize>500?'100vw':'100vw'"
                 :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                 :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'50vh':'50vh'"
                 :width="winSize>500?'25vw':'60vw'" @closeWindow="$emit('closeWindow',true)">


        <v-card dir="rtl"
                style="height: 100%"
                class="bg-white pa-2 rounded-b-lg myForm">
            <v-fade-transition>
                <v-row justify="space-between" class="ma-0 pa-0 mb-1 mt-1 myForm">
                    <v-btn
                            variant="tonal"
                            rounded="xl"
                            size="x-small"
                            class="mt-n1 elevation-1"
                            color="primary"
                            @click="addPoint"
                    >
                        <v-icon size="large" class="ma-n2 pa-0">
                            mdi-plus
                        </v-icon>
                        <v-tooltip activator="parent" location="right">افزودن نقطه</v-tooltip>
                    </v-btn>
                    <v-btn-toggle
                            density="compact"
                            rounded
                            class="ml-1 mt-n1  rounded-xl pa-0 myForm"
                            color="primary"
                            v-model="pointsType"
                    >
                        <v-btn
                                value="dd"
                                variant="tonal"
                                size="x-small"
                                color="primary"

                        >
                            <p style="margin-top: 1px" class=" font-weight-bold">DD</p>
                        </v-btn>
                        <v-btn
                                value="utm"
                                variant="tonal"
                                size="x-small"
                                color="primary"

                        >
                            <p style="margin-top: 1px" class=" font-weight-bold">UTM</p>
                        </v-btn>

                    </v-btn-toggle>
                </v-row>
            </v-fade-transition>
            <v-fade-transition>
                <v-card style="height: calc(100% - 53px);overflow: auto"
                        class="pa-2 elevation-0 ">
                    <v-row v-for="(item,index) in points" :key="index" class="pa-0 ma-0 mb-2 border  rounded-lg">
                        <v-btn @click="removePoint(index)" color="error" density="compact" style="position: absolute"
                               icon size="x-small" class="mt-n1 mr-n2">
                            <v-tooltip activator="parent" location="right">حذف نقطه</v-tooltip>
                            <v-icon size="small" icon="mdi-minus"></v-icon>
                        </v-btn>
                        <v-col class="ma-0 " cols="6" dir="ltr">
                            <v-text-field
                                    density="compact"
                                    variant="solo"
                                    class="mb-n2"
                                    v-model="item.y"
                                    type="text"
                                    :rules="textFloat"
                            >
                                <template v-slot:label>
                                    <p class="text-primary"> Y</p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col class="ma-0 " cols="6" dir="ltr">
                            <v-text-field
                                    density="compact"
                                    variant="solo"
                                    class="mb-n2"
                                    type="text"
                                    v-model="item.x"
                                    :rules="textFloat"
                            >
                                <template v-slot:label>
                                    <p class="text-primary">X</p>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </v-fade-transition>
            <v-fade-transition>
                <v-row justify="space-between" class="ma-0 pa-0 ">
                    <v-btn
                            variant="tonal"
                            rounded="lg"
                            @click="clearPoints"
                            style="font-weight: bold !important;font-size: 10px"
                            size="x-small"
                            class="mt-2 elevation-1"
                            color="error"
                    >
                        پاکسازی
                    </v-btn>
                    <v-btn
                            variant="tonal"
                            rounded="lg"
                            @click="applyPoints"
                            style="font-weight: bold !important;font-size: 10px"
                            size="x-small"
                            class="mt-2 elevation-1"
                            color="info"
                    >
                        اعمال
                    </v-btn>
                </v-row>
            </v-fade-transition>
        </v-card>


    </popupWindow>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import popupWindow from "@/components/common/popupWindow.vue";
    import Map from 'ol/Map.js';
    import VectorSource from 'ol/source/Vector.js';

    import {Coordinate} from 'ol/coordinate';
    import Polygon from 'ol/geom/Polygon.js';
    import LineString from 'ol/geom/LineString.js';
    import Point from 'ol/geom/Point.js';
    import Feature from 'ol/Feature.js';
    import Geometry from 'ol/geom/Geometry.js';
    import {Select} from "ol/interaction";
    import {SelectEvent} from "ol/interaction/Select";
    import rules from "@/componentFunctions/rules_functions";
    import {Layer_types} from "@/models/Layer.Interface";
    import {useToast} from "primevue/usetoast";
    import {useStore} from "vuex";
    import {LatLon, Utm} from 'geodesy/mgrs.js';

    export interface PointForm {
        x: number,
        y: number
    }

    export default defineComponent({
        name: "DrawByCoordinatesComponent",
        components: {popupWindow},
        setup() {
            const select = ref<Select>()
            const {textFloat} = rules()
            const toast = useToast()
            const store = useStore()

            return {select, textFloat, toast, store}
        },
        props: {

            map: {
                required: true,
                type: Map,
            },
            source: {
                required: true,
                type: VectorSource,
            },
            layerType: {
                required: true,
                type: String as PropType<Layer_types>,
            }


        },
        mounted(): void {
            this.winSize = window.innerWidth
            this.initSelect()

        },
        updated(): void {
            this.winSize = window.innerWidth
        },
        // computed: {},
        beforeUnmount(): void {
            if (this.select) {
                this.select.setActive(false)
                this.map.removeInteraction(this.select)
            }
        },
        data() {
            return {
                winSize: 0,
                // points: [
                //     {y: 59.60413, x: 36.29764},
                //     {y: 59.60627, x: 36.29938},
                //     {y: 59.60533, x: 36.29650},
                //     {y: 59.60413, x: 36.29764}
                // ] as PointForm[],
                // points: [
                //     {y: 4020109, x: 733843},
                //     {y: 4020307, x: 734030},
                //     {y: 4020176, x: 734155},
                //     {y: 4019985, x: 733954}
                // ] as PointForm[],
                points: [] as PointForm[],
                pointsType: 'dd' as string,
                selectedFeature: null as Feature | null,
            };
        },
        emits: ['selected','closeWindow'],
        methods: {
            drawPolygon(coords: Coordinate[]) {
                this.addFeature(new Polygon([coords]))

            },
            drawLine(coords: Coordinate[]) {
                this.addFeature(new LineString(coords))
            },
            drawPoint(coordinate: Coordinate) {
                this.addFeature(new Point(coordinate))
            },
            addFeature(geo: Geometry) {
                if (this.selectedFeature) {
                    this.selectedFeature.setGeometry(geo)
                } else {
                    this.source.addFeature(new Feature({
                        geometry: geo
                    }))
                }

                this.map.getView().fit(geo.getExtent(), {duration: 1500, padding: [200, 200, 200, 200], maxZoom: 19})

            },
            initSelect() {
                this.select = new Select({
                    filter: (feature: any, layer) => {
                        return this.source.hasFeature(feature)
                    }
                })
                this.map.addInteraction(this.select)
                this.select.on('select', (target: SelectEvent) => {
                    if (target.selected.length > 0) {
                        this.selectedFeature = target.selected[0]
                        const geo: any = target.selected[0].getGeometry()
                        if (geo) {
                            this.points = []
                            for (let i = 0; i < geo.flatCoordinates.length; i = i + 2) {
                                if (this.pointsType === 'utm') {
                                    const latLongP = new LatLon(geo.flatCoordinates[i + 1], geo.flatCoordinates[(i)]);
                                    const utmCoord = latLongP.toUtm();
                                    this.points.push({
                                        y: parseFloat(utmCoord.northing.toFixed(8)),
                                        x: parseFloat(utmCoord.easting.toFixed(8))
                                    })
                                } else {
                                    this.points.push({
                                        y: parseFloat(geo.flatCoordinates[i].toFixed(6)),
                                        x: parseFloat(geo.flatCoordinates[(i + 1)].toFixed(6))
                                    })
                                }
                            }
                        }

                        this.$emit('selected', target.selected)
                    } else {
                        this.points = []
                        this.selectedFeature = null
                    }
                })
            },

            clearSelected() {
                if (this.select) {
                    this.select.getFeatures().clear()
                }
            },

            prepareCoords(): Coordinate[] {
                const coords: Coordinate[] = []

                if (this.points.length>0){
                    if (this.layerType === Layer_types.Polygon || this.layerType === Layer_types.MultiPolygon) {
                        if (this.points[(this.points.length - 1)].x !== this.points[0].x) {
                            this.points.push(this.points[0])
                        }
                    }

                    if (this.pointsType === 'utm') {
                        this.points.map((point) => {
                            const latLon = new Utm(this.store.getters.getZone, 'N', point.x, point.y).toLatLon()
                            coords.push([
                                latLon.lng, latLon.lat
                            ])
                        })

                    } else {
                        this.points.map((point) => {
                            coords.push([
                                point.y, point.x
                            ])
                        })
                    }
                }

                return coords
            },

            // --------form handler----------//
            addPoint() {
                this.points.push({
                    x: 0,
                    y: 0
                })
            },
            removePoint(index: number) {
                if (this.points.length > 0) {
                    this.points.splice(index, 1)
                }
            },
            applyPoints() {
                if (this.layerType) {
                    if (this.points.length>0){
                        if (this.layerType === Layer_types.Polygon || this.layerType === Layer_types.MultiPolygon) {
                            this.drawPolygon(this.prepareCoords())
                        } else if (this.layerType === Layer_types.Line || this.layerType === Layer_types.MultiLine) {
                            this.drawLine(this.prepareCoords())
                        } else if (this.layerType === Layer_types.Point || this.layerType === Layer_types.MultiPoint) {
                            this.prepareCoords().map((coordinate) => {
                                this.drawPoint(coordinate)
                            })
                        }
                    }
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'نوع لایه رسم مشخص نیست'
                    });

                }
            },
            clearPoints() {
                this.points = []
            }

        },
        watch: {
            pointsType() {
                if (this.pointsType === 'utm') {
                    const newPoints: PointForm[] = []
                    this.points.map((point) => {
                        const latLongP = new LatLon(point.x, point.y);
                        const utmCoord = latLongP.toUtm();
                        newPoints.push({
                            y: parseFloat(utmCoord.northing.toFixed(6)),
                            x: parseFloat(utmCoord.easting.toFixed(6))
                        })
                    })
                    this.points = newPoints
                } else {
                    const newPoints: PointForm[] = []
                    this.points.map((point) => {
                        const latLon = new Utm(this.store.getters.getZone, 'N', point.x, point.y).toLatLon()
                        newPoints.push({
                            y:parseFloat(latLon.lng.toFixed(6)),
                            x: parseFloat(latLon.lat.toFixed(6))

                        })
                    })
                    this.points = newPoints
                }
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .v-btn-group--density-compact.v-btn-group {
        height: 20px !important;
    }
</style>
