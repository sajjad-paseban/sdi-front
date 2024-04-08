<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import TileWMS from 'ol/source/TileWMS.js';
    import MapBrowserEvent from 'ol/MapBrowserEvent'
    import {intersects} from 'ol/format/filter';
    import {GeoJSON, WFS} from 'ol/format.js';
    import Point from 'ol/geom/Point.js';
    import {StoreActions} from "@/store";
    import {useStore} from "vuex";
    import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
    import Feature from 'ol/Feature.js';
    import {LayerItem} from "@/store/openLayer/types";

    export default defineComponent({
        name: "wfsClickComponent",
        components: {},

        props: {

            map: {
                required: true,
                type: Map,
            },
            source: {
                required: false,
                type: TileWMS,
            },

            customLayerName: {
                required: false,
                type: Object as PropType<LayerItem>,
            },

            maxFeatures: {
                required: false,
                type: Number,
                default: 1
            },


        },
        emits: ['clickCallback'],
        setup() {
            const store = useStore()
            const {getFeaturesByDraw} = wfs_functions()
            const authKey = store.getters.getUser.jwt.access
            return {
                store, authKey,getFeaturesByDraw
            }
        },
        mounted(): void {
            if (this.source || this.customLayerName) {
                this.map.on('click', this.mapClick)
            } else {
                this.$toast.add({
                    group: 'br',
                    life: 2000,
                    severity: 'error',
                    summary: ' خطا در کلیک',
                    detail: 'هیچ لایه نمایشی فعال نیست'
                });

            }
        },
        unmounted(): void {
            this.map.un('click', this.mapClick)
        },
        computed: {},

        data() {
            return {};
        },
        methods: {
            mapClick: async function (evt: MapBrowserEvent<UIEvent>) {

                if (this.customLayerName){
                    const feature = new Feature({geometry:new Point(evt.coordinate)})
                    const data = await this.getFeaturesByDraw(this.customLayerName,feature,1)
                    this.$emit('clickCallback', data)

                }


            }
        },
        watch: {
            source() {
                if (this.source) {
                    this.map.on('click', this.mapClick)
                } else {
                    this.$toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در کلیک',
                        detail: 'هیچ لایه نمایشی فعال نیست'
                    });
                    this.map.un('click', this.mapClick)
                }
            },
            customLayerName() {
                if (this.customLayerName) {
                    this.map.on('click', this.mapClick)
                } else {
                    this.$toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در کلیک',
                        detail: 'لایه فعال نیست'
                    });
                    this.map.un('click', this.mapClick)
                }
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
