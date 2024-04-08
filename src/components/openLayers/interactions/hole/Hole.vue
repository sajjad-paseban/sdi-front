<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';

    import VectorSource from 'ol/source/Vector.js';
    import VectorLayer from "ol/layer/Vector";
    import DrawHole from "ol-ext/interaction/DrawHole"
    import Collection from "ol/Collection";
    import {
        Select,
        Translate,
        defaults as defaultInteractions,
    } from 'ol/interaction.js';
    import {DrawEvent} from "@/components/openLayers/interactions/draw/model";

    export default defineComponent({
        name: "HoleComponent",
        components: {},
        setup() {
            const drawHole = ref<DrawHole>()
            const select = ref<Select>()
            return {drawHole,select}
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
        unmounted(): void {
            this.finishHole()
        },

        async mounted() {

            this.initHole()


        },
        computed: {},

        data() {
            return {};
        },
        emits: ['drawstart', 'drawend'],
        methods: {
            initHole(){
                this.drawHole = new DrawHole({
                    type:'Polygon'
                })
                this.drawHole.on('drawstart',(target: DrawEvent)=>{
                    this.$emit('drawstart', target)
                })
                this.drawHole.on('drawend',(target: DrawEvent)=>{
                    this.$emit('drawend', target)
                })
                this.drawHole.setActive(true);
                this.map.addInteraction(this.drawHole)
            },

            finishHole(){
                if (this.drawHole){
                    this.map.removeInteraction(this.drawHole)
                }
            },


        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
