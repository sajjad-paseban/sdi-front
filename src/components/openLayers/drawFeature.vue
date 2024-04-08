<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import TileWMS from 'ol/source/TileWMS.js';

    export default defineComponent({
        name: "drawFeatureComponent",
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

        unmounted(): void {

        },
        computed: {},
        data() {
            return {

            };
        },
        methods: {

        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
