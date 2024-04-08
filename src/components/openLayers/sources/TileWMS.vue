<template>
    <slot v-if="tileWMS" :wmsSource="tileWMS" name="click"></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import TileLayer from 'ol/layer/Tile.js';
    import TileWMS from 'ol/source/TileWMS.js';
    import {useStore} from "vuex";


    export default defineComponent({
        name: "TileWMSComponent",
        components: {},
        setup() {
            const tileWMS = ref<TileWMS>()
            const store = useStore()
            return {tileWMS, store}
        },
        props: {

            map: {
                required: true,
                type: Map,
            },
            tile: {
                required: true,
                type: TileLayer,
            },
            layers: {
                required: true,
                type: String,
            },
            url: {
                required: true,
                type: String,
            },
            authKey: {
                required: false,
                type: String,
                default: ''
            },

        },
        mounted(): void {
            this.initWms()

        },
        updated(): void {
            this.updateWms()
        },
        computed: {},
        unmounted(): void {
            this.tile.setSource(null)
        },
        data() {
            return {};
        },
        methods: {
            initWms() {
                this.tileWMS = new TileWMS({
                    url: this.url,
                    params: {
                        LAYERS: this.layers,
                        TILED: true,
                        VERSION: '1.1.1',
                        authkey: this.authKey,
                        FORMAT: "image/png8",
                        WIDTH: "600",
                        HEIGHT: "600",
                    },
                    serverType: 'geoserver',
                    crossOrigin: "anonymous",


                    // Countries have transparency, so do not fade tiles:
                })
                this.tile.setSource(this.tileWMS)
                this.tile.setZIndex(10)
            },
            updateWms() {
                if (this.tileWMS)
                    this.tileWMS.updateParams({
                        LAYERS: this.layers,
                        TILED: true,
                        VERSION: '1.1.1',
                        authkey: this.authKey,
                        FORMAT: "image/png8",
                        WIDTH: "600",
                        HEIGHT: "600",
                    },)
            }
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
