<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import VectorSource from 'ol/source/Vector.js';
    import Snap from 'ol/interaction/Snap.js';
    import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import {Fill, Stroke, Style} from "ol/style";


    export default defineComponent({
        name: "DrawComponent",
        components: {},
        setup() {
            const snap = ref<Snap>()
            const {getShowLayersFeaturesByExtent} = wfs_functions()
            const {addFeature} = source_functions()
            return {snap, getShowLayersFeaturesByExtent, addFeature}
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
        },
        mounted(): void {

            this.snap = new Snap({
                source: this.source
            })


            this.map.addInteraction(this.snap)

        },
        computed: {},
        beforeUnmount(): void {
            if (this.snap)
                this.map.removeInteraction(this.snap)
        },
        data() {
            return {};
        },
        methods: {
            async screenExtendSnap() {
                this.source.clear()
                const features = await this.getShowLayersFeaturesByExtent(this.map)
                this.addFeature(this.source, features, new Style({
                    fill: new Fill({
                        color: 'rgba(208,27,27,0)',
                    }),
                    stroke: new Stroke({
                        color: 'rgba(0,0,0,0)',
                        width: 4,
                    })
                }))

            },
            refreshSnap(){
                if (this.snap)
                    this.map.removeInteraction(this.snap)
                setTimeout(()=>{
                    if (this.snap)
                        this.map.addInteraction(this.snap)
                },200)
            }
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
