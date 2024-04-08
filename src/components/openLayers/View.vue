<template>
    <slot ></slot>
</template>

<script lang="ts">

    import View from 'ol/View.js';
    import Map from 'ol/Map.js';
    import {defineComponent, PropType, ref} from "vue";

    export default defineComponent({
        name: "ViewComponent",
        components: {},
        setup() {
            const view = ref<View>()
            return {view}
        },
        props: {
            center: {
                required: true,
                type: Array as PropType<Array<number>>,
                default: ()=>[0,0]
            },
            zoom: {
                required: false,
                type: Number,
                default: 1
            },

            max_zoom: {
                required: false,
                type: Number,
                default: 24
            },
            min_zoom: {
                required: false,
                type: Number,
                default: 1
            },

            projection: {
                required: false,
                type: String,
                default: 'EPSG:4326'
            },
            map: {
                required: true,
                type: Map,
            }
        },
        mounted(): void {
            console.log(this.map, this.center, this.zoom,this.min_zoom,this.max_zoom)
            this.map.setView(new View({
                center: this.center,
                zoom: this.zoom,
                minZoom: this.min_zoom,
                maxZoom: this.max_zoom,
                projection: this.projection,
            }))

        },
        computed: {},
        data() {
            return {};
        },
        methods: {},
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
