<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import TileWMS from 'ol/source/TileWMS.js';
    import MapBrowserEvent from 'ol/MapBrowserEvent'

    export default defineComponent({
        name: "wmsClickComponent",
        components: {},
        props: {

            map: {
                required: true,
                type: Map,
            },
            source: {
                required: true,
                type: TileWMS,
            },




        },
        emits:['clickCallback'],
        mounted(): void {
            this.map.on('click', this.mapClick)


        },
        unmounted(): void {
            this.map.un('click', this.mapClick)
        },
        computed: {},
        data() {
            return {

            };
        },
        methods: {
            mapClick(evt:MapBrowserEvent<UIEvent>){
                const viewResolution = /** @type {number} */ (this.map.getView().getResolution());
                if (viewResolution){
                    const url = this.source.getFeatureInfoUrl(
                        evt.coordinate,
                        viewResolution,
                        'EPSG:4326',
                        {'INFO_FORMAT': 'application/json','FEATURE_COUNT':50}
                    );

                    if (url) {
                        fetch(url)
                            .then((response) => response.text())
                            .then((html) => {
                                const response = JSON.parse(html)
                                this.$emit('clickCallback',response)
                            });
                    }
                }


            }
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
