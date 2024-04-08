<template>
    <slot></slot>
</template>

<script lang="ts">

import {defineComponent, onMounted, ref} from "vue";

import {Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text,} from "ol/style";
import Geometry from 'ol/geom/Geometry.js';
import {getArea, getLength} from 'ol/sphere.js';
import Feature from 'ol/Feature.js';
import {DrawType} from "@/components/openLayers/interactions/draw/model";
import LineString from 'ol/geom/LineString.js';
import {MultiPoint, Point} from 'ol/geom';
import VectorLayer from 'ol/layer/Vector.js';
import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';

export default defineComponent({
    name: "TextStyleComponent",
    components: {},
    setup() {
        const baseStyle = ref<Style>(new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                width: 2,
            }),
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.7)',
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
            }),
        }))
        const labelStyle = ref<Style>(new Style({
            text: new Text({
                font: '14px Calibri,sans-serif',
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 1)',
                }),
                backgroundFill: new Fill({
                    color: 'rgba(0, 0, 0, 0.7)',
                }),
                padding: [3, 3, 3, 3],
                textBaseline: 'bottom',
                offsetY: -15,
            }),
            image: new RegularShape({
                radius: 8,
                points: 3,
                angle: Math.PI,
                displacement: [0, 10],
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.7)',
                }),
            }),
        }))
        const tipStyle = ref<Style>(new Style({
            text: new Text({
                font: '12px Calibri,sans-serif',
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 1)',
                }),
                backgroundFill: new Fill({
                    color: 'rgba(0, 0, 0, 0.4)',
                }),
                padding: [2, 2, 2, 2],
                textAlign: 'left',
                offsetX: 15,
            }),
        }))
        const modifyStyle = ref<Style>(new Style({
            image: new CircleStyle({
                radius: 5,
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.7)',
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.4)',
                }),
            }),
            text: new Text({
                text: 'Drag to modify',
                font: '12px Calibri,sans-serif',
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 1)',
                }),
                backgroundFill: new Fill({
                    color: 'rgba(0, 0, 0, 0.7)',
                }),
                padding: [2, 2, 2, 2],
                textAlign: 'left',
                offsetX: 15,
            }),
        }))
        const segmentStyle = ref<Style>(new Style({
            text: new Text({
                font: '12px Calibri,sans-serif',
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 1)',
                }),
                backgroundFill: new Fill({
                    color: 'rgba(0, 0, 0, 0.4)',
                }),
                padding: [2, 2, 2, 2],
                textBaseline: 'bottom',
                offsetY: -12,
            }),
            image: new RegularShape({
                radius: 6,
                points: 3,
                angle: Math.PI,
                displacement: [0, 8],
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.4)',
                }),
            }),
        }))
        const segmentStyles = ref<Style[]>([])


        onMounted(() => {
            segmentStyles.value.push(segmentStyle.value)
        })

        return {
            baseStyle, labelStyle, tipStyle, modifyStyle, segmentStyle, segmentStyles
        }
    },
    props: {
        vector: {
            required: false,
            type: VectorLayer,
        },
        draw: {
            required: false,
            type: Draw,
        },
        layerType: {
            required: false,
            default: null
        },
        projection: {
            required: false,
            type: String,
            default: 'EPSG:4326'
        },
        fillColor: {
            required: false,
            type: String,
            default: 'rgba(255, 255, 255, 0.2)'
        },
        lineColor: {
            required: false,
            type: String,
            default: 'rgba(0, 0, 0, 0.5)'
        },
        lineWidth: {
            required: false,
            type: Number,
            default: 2
        },
        modify: {
            required: false,
            type: Modify,
            default: null
        },
        numberInCoords: {
            required: false,
            type: Boolean,
            default: false
        },
        area: {
            required: false,
            type: Boolean,
            default: false
        },
        length: {
            required: false,
            type: Boolean,
            default: false
        },


    },
    mounted(): void {
        this.initProps()

        if (this.vector) {
            this.vector.setStyle((feature: any) => {
                return this.styleFunction(feature, true, this.layerType, 'عارضه', this.numberInCoords)
            })
            this.vector.setZIndex(10000001)
        }


    },
    computed: {},
    data() {
        return {};
    },
    methods: {
        formatLength(lineGeo: Geometry): string {
            const length = getLength(lineGeo) * 100000
            return Math.round(length * 100) / 100 + ' m';
        },
        formatArea(polygon: Geometry): string {
            const area = getArea(polygon)*10000000000;
            return Math.round(area * 100) / 100 + ' m\xB2';
        },
        styleFunction(feature: Feature, segments: boolean, drawType: DrawType | null, tip: string, numberInCoords = false): Style[] {
            const styles: Style[] = [this.baseStyle.clone()];
            const geometry: any = feature.getGeometry();
            if (geometry) {
                const type = geometry.getType()

                if (type === DrawType.MultiPolygon) {
                    geometry.getPolygons().map((geometry: any) => {
                        const type = DrawType.POLYGON
                        let point, label, line;
                        if (!drawType || drawType === type || drawType === DrawType.MultiPolygon || drawType === DrawType.MultiLine) {
                            line = new LineString(geometry.getCoordinates()[0]);
                            const coords = geometry.getCoordinates()
                            if (numberInCoords) {
                                let index = 0
                                coords[0].map((point: any) => {
                                    index++
                                    if (index < coords[0].length) {
                                        styles.push(new Style({
                                            geometry: new Point(point),
                                            image: new CircleStyle({
                                                radius: 8,
                                                fill: new Fill({
                                                    color: '#ff0000',
                                                }),
                                                stroke: new Stroke({
                                                    color: 'rgb(0,0,0)',
                                                }),
                                            }),
                                            text: new Text({
                                                text: String(index),
                                                font: '10px Calibri,sans-serif',
                                                fill: new Fill({
                                                    color: 'rgba(255, 255, 255, 1)',
                                                }),

                                                textAlign: 'center',

                                            }),
                                        }))
                                    }

                                })
                            }
                        }

                        if (segments && line) {
                            line.forEachSegment((a: number[], b: number[]) => {
                                const segment = new LineString([a, b]);
                                const label = this.formatLength(segment);
                                const lineSegmentStyle = this.segmentStyle.clone()
                                const segmentPoint = new Point(segment.getCoordinateAt(0.5));
                                lineSegmentStyle.setGeometry(segmentPoint);
                                lineSegmentStyle.getText().setText(label);
                                styles.push(lineSegmentStyle);
                            });
                        }
                    })
                } else if (type === DrawType.MultiLine) {
                    geometry.getLineStrings().map((geometry: any) => {
                        const type = DrawType.LINESTRING
                        let point, label, line;
                        if (!drawType || drawType === type || drawType === DrawType.MultiPolygon || drawType === DrawType.MultiLine) {
                            line = geometry;
                            const coords = geometry.getCoordinates()
                            if (numberInCoords) {
                                let index = 0
                                coords.map((point: any) => {
                                    index++
                                    if (index <= coords.length) {
                                        styles.push(new Style({
                                            geometry: new Point(point),
                                            image: new CircleStyle({
                                                radius: 8,
                                                fill: new Fill({
                                                    color: '#ff0000',
                                                }),
                                                stroke: new Stroke({
                                                    color: 'rgb(0,0,0)',
                                                }),
                                            }),
                                            text: new Text({
                                                text: String(index),
                                                font: '10px Calibri,sans-serif',
                                                fill: new Fill({
                                                    color: 'rgba(255, 255, 255, 1)',
                                                }),

                                                textAlign: 'center',

                                            }),
                                        }))
                                    }

                                })
                            }
                        }

                        if (segments && line) {
                            line.forEachSegment((a: number[], b: number[]) => {
                                const segment = new LineString([a, b]);
                                const label = this.formatLength(segment);
                                const lineSegmentStyle = this.segmentStyle.clone()
                                const segmentPoint = new Point(segment.getCoordinateAt(0.5));
                                lineSegmentStyle.setGeometry(segmentPoint);
                                lineSegmentStyle.getText().setText(label);
                                styles.push(lineSegmentStyle);
                            });
                        }
                    })
                } else {
                    let point, label, line;
                    // console.log(drawType,type)
                    if (!drawType || drawType === type || drawType === DrawType.MultiPolygon || drawType === DrawType.MultiLine) {

                        if (type === DrawType.POLYGON) {
                            point = geometry.getInteriorPoint();
                            label = this.formatArea(geometry);
                            if (this.area) {
                                const lineSegmentStyle = this.segmentStyle.clone()
                                lineSegmentStyle.getText().setText(label);
                                lineSegmentStyle.setGeometry(point);
                                styles.push(lineSegmentStyle);
                            }
                            line = new LineString(geometry.getCoordinates()[0]);
                        } else if (type === DrawType.LINESTRING) {
                            point = new Point(geometry.getLastCoordinate());
                            label = this.formatLength(geometry);
                            line = geometry;
                        }
                        const coords = type === DrawType.POLYGON ? geometry.getCoordinates()[0] : geometry.getCoordinates()
                        // console.log(coords,geometry,line)
                        if (coords) {
                            if (numberInCoords) {
                                let index = 0
                                const coordsLen = (type === DrawType.POLYGON ? coords.length : (coords.length + 1))
                                coords.map((point: any) => {
                                    index++
                                    if (index < coordsLen) {
                                        styles.push(new Style({
                                            geometry: new Point(point),
                                            image: new CircleStyle({
                                                radius: 8,
                                                fill: new Fill({
                                                    color: '#ff0000',
                                                }),
                                                stroke: new Stroke({
                                                    color: 'rgb(0,0,0)',
                                                }),
                                            }),
                                            text: new Text({
                                                text: String(index),
                                                font: '10px Calibri,sans-serif',
                                                fill: new Fill({
                                                    color: 'rgba(255, 255, 255, 1)',
                                                }),

                                                textAlign: 'center',

                                            }),
                                        }))
                                    }

                                })
                            }
                        }
                    }

                    if (segments && line) {
                        if (this.length) {
                            const length = this.formatLength(line);
                            const centerPoint = new Point(line.getCoordinateAt(1));
                            const lineSegmentStyle = this.segmentStyle.clone()
                            lineSegmentStyle.setGeometry(centerPoint);
                            lineSegmentStyle.getText().setText(length);
                            styles.push(lineSegmentStyle);
                        }

                        line.forEachSegment((a: number[], b: number[]) => {
                            const segment = new LineString([a, b]);
                            const label = this.formatLength(segment);
                            const lineSegmentStyle = this.segmentStyle.clone()
                            const segmentPoint = new Point(segment.getCoordinateAt(0.5));
                            lineSegmentStyle.setGeometry(segmentPoint);
                            lineSegmentStyle.getText().setText(label);
                            styles.push(lineSegmentStyle);
                        });
                    }
                    if (tip && type === 'Point') {
                        if (this.modify) {
                            if (!this.modify.getOverlay().getSource().getFeatures().length) {
                                const tipStyle = this.tipStyle.clone()
                                tipStyle.getText().setText(tip);
                                styles.push(tipStyle);
                            }

                        } else {
                            const tipStyle = this.tipStyle.clone()
                            tipStyle.getText().setText(tip);
                            styles.push(tipStyle);
                        }

                    }
                }


            }
            return styles;
        },
        initProps() {
            this.baseStyle.getFill().setColor(this.fillColor)
            this.baseStyle.getStroke().setColor(this.lineColor)
            this.baseStyle.getStroke().setWidth(this.lineWidth)
        }

    },

    watch: {},

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
