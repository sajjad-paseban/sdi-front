<template>
    <slot v-if="tile" :tile="tile" name="source"></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import View from 'ol/View.js';
    import Map from 'ol/Map.js';
    import TileLayer from 'ol/layer/Tile.js';
    import TileSource from 'ol/source/Tile.js';


    export default defineComponent({
        name: "TileComponent",
        components: {},
        setup() {
            const tile = ref<TileLayer<TileSource>>()
            return {tile}
        },
        props: {

            map: {
                required: true,
                type: Map,
            },
            name: {
                required: false,
                type: String,
            },
        },
        mounted(): void {
            this.tile = new TileLayer({})
            if (this.name)
                this.tile.set('name', this.name)
            this.map.addLayer(this.tile)


        },
        unmounted(): void {
            if (this.tile)
                this.map.removeLayer(this.tile)
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
