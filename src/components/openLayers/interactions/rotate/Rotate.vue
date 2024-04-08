<template>
    <slot></slot>
</template>

<script lang="ts">
    import VectorSource from 'ol/source/Vector.js';
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import Modify from 'ol/interaction/Modify.js';
    import Feature from 'ol/Feature.js';
    import {getCenter, getHeight, getWidth} from 'ol/extent.js';
    import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

    import {
        never,
        platformModifierKeyOnly,
        primaryAction,
    } from 'ol/events/condition.js';
    import VectorLayer from 'ol/layer/Vector.js';
    import {MultiPoint, Point} from 'ol/geom.js';

    export default defineComponent({
        name: "RotateComponent",
        components: {},
        setup() {
            const modify = ref<Modify>()
            return {modify}
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
            vector: {
                required: true,
                type: VectorLayer,
            },

        },
        emits: [],
        async mounted() {

            this.initModify()
            this.styleClone = this.vector.getStyle()
            this.vector.setStyle(this.setVectorStyle)
        },
        computed: {},
        beforeUnmount(): void {
            this.vector.setStyle(this.styleClone)
            if (this.modify)
                this.map.removeInteraction(this.modify)
        },
        data() {
            return {
                style: new Style({
                    geometry: (feature) => {
                        const modifyGeometry = feature.get('modifyGeometry');
                        return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
                    },
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                    stroke: new Stroke({
                        color: '#33a0ff',
                        width: 4,
                    }),
                    image: new CircleStyle({
                        radius: 7,
                        fill: new Fill({
                            color: '#ffcc33',
                        }),
                    }),
                }) as any,
                defaultStyle: new Modify({source: this.source}).getOverlay().getStyleFunction(),
                styleClone: null as any

            };
        },
        methods: {
            initModify() {
                this.modify = new Modify({
                    source: this.source,
                    condition: function (event) {
                        return primaryAction(event) && !platformModifierKeyOnly(event);
                    },
                    deleteCondition: never,
                    insertVertexCondition: never,
                    style: (feature: any) => {
                        feature.get('features').forEach((modifyFeature: Feature) => {
                            const modifyGeometry = modifyFeature.get('modifyGeometry');
                            if (modifyGeometry) {
                                const point = feature.getGeometry().getCoordinates();
                                let modifyPoint = modifyGeometry.point;
                                if (!modifyPoint) {
                                    // save the initial geometry and vertex position
                                    modifyPoint = point;
                                    modifyGeometry.point = modifyPoint;
                                    modifyGeometry.geometry0 = modifyGeometry.geometry;
                                    // get anchor and minimum radius of vertices to be used
                                    const result = this.calculateCenter(modifyGeometry.geometry0);
                                    modifyGeometry.center = result.center;
                                    modifyGeometry.minRadius = result.minRadius;
                                }

                                const center = modifyGeometry.center;
                                const minRadius = modifyGeometry.minRadius;
                                let dx, dy;
                                dx = modifyPoint[0] - center[0];
                                dy = modifyPoint[1] - center[1];
                                const initialRadius = Math.sqrt(dx * dx + dy * dy);
                                if (initialRadius > minRadius) {
                                    const initialAngle = Math.atan2(dy, dx);
                                    dx = point[0] - center[0];
                                    dy = point[1] - center[1];
                                    const currentRadius = Math.sqrt(dx * dx + dy * dy);
                                    if (currentRadius > 0) {
                                        const currentAngle = Math.atan2(dy, dx);
                                        const geometry = modifyGeometry.geometry0.clone();
                                        geometry.scale(currentRadius / initialRadius, undefined, center);
                                        geometry.rotate(currentAngle - initialAngle, center);
                                        modifyGeometry.geometry = geometry;
                                    }
                                }
                            }
                        });
                        if (this.defaultStyle)
                            return this.defaultStyle(feature, 0);
                    }
                })

                this.modify.on('modifystart', function (event) {
                    event.features.forEach(function (feature: any) {
                        feature.set(
                            'modifyGeometry',
                            {geometry: feature.getGeometry().clone()},
                            true
                        );
                    });
                });

                this.modify.on('modifyend', function (event) {
                    event.features.forEach(function (feature: any) {
                        const modifyGeometry = feature.get('modifyGeometry');
                        if (modifyGeometry) {
                            feature.setGeometry(modifyGeometry.geometry);
                            feature.unset('modifyGeometry', true);
                        }
                    });
                });

                this.map.addInteraction(this.modify);
            },
            calculateCenter(geometry: any) {
                let center: any, coordinates, minRadius;
                const type = geometry.getType();
                if (type === 'Polygon') {
                    let x = 0;
                    let y = 0;
                    let i = 0;
                    coordinates = geometry.getCoordinates()[0].slice(1);
                    coordinates.forEach(function (coordinate: any) {
                        x += coordinate[0];
                        y += coordinate[1];
                        i++;
                    });
                    center = [x / i, y / i];
                } else if (type === 'LineString') {
                    center = geometry.getCoordinateAt(0.5);
                    coordinates = geometry.getCoordinates();
                } else {
                    center = getCenter(geometry.getExtent());
                }
                let sqDistances;
                if (coordinates) {
                    sqDistances = coordinates.map(function (coordinate: any) {
                        const dx = coordinate[0] - center[0];
                        const dy = coordinate[1] - center[1];
                        return dx * dx + dy * dy;
                    });
                    minRadius = Math.sqrt(Math.max.apply(Math, sqDistances)) / 3;
                } else {
                    minRadius =
                        Math.max(
                            getWidth(geometry.getExtent()),
                            getHeight(geometry.getExtent())
                        ) / 3;
                }
                return {
                    center: center,
                    coordinates: coordinates,
                    minRadius: minRadius,
                    sqDistances: sqDistances,
                };
            },
            setVectorStyle(feature: any): Style[] {
                const styles: Style[] = [this.style];
                const modifyGeometry = feature.get('modifyGeometry');
                const geometry = modifyGeometry
                    ? modifyGeometry.geometry
                    : feature.getGeometry();
                const result = this.calculateCenter(geometry);
                const center = result.center;
                if (center) {
                    styles.push(
                        new Style({
                            geometry: new Point(center),
                            image: new CircleStyle({
                                radius: 7,
                                fill: new Fill({
                                    color: '#20cd36',
                                }),
                                stroke: new Stroke({
                                    color: '#4f4b4b',
                                    width: 2,
                                }),
                            }),

                        })
                    );
                    const coordinates = result.coordinates;
                    if (coordinates) {
                        const minRadius = result.minRadius;
                        const sqDistances = result.sqDistances;
                        const rsq = minRadius * minRadius;
                        const points = coordinates.filter(function (coordinate: any, index: number) {
                            return sqDistances[index] > rsq;
                        });
                        styles.push(
                            new Style({
                                geometry: new MultiPoint(points),
                                image: new CircleStyle({
                                    radius: 8,
                                    fill: new Fill({
                                        color: '#ff3333',
                                    }),
                                }),
                            })
                        );
                    }
                }
                return styles;
            }
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
