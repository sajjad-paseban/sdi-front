<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import VectorSource from 'ol/source/Vector.js';
    import Draw, {
        createBox,
        createRegularPolygon,
    } from 'ol/interaction/Draw.js';
    import {DrawEvent, ShapeTypes} from "@/components/openLayers/interactions/draw/model";

    export default defineComponent({
        name: "DrawComponent",
        components: {},
        setup() {
            const draw = ref<Draw>()

            return {draw}
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
            shapeType: {
                required: true,
                type: String as PropType<ShapeTypes>
            }


        },
        mounted(): void {

            this.addInteraction()


        },
        computed: {},
        beforeUnmount(): void {
            this.finishDraw()
        },
        data() {
            return {};
        },
        emits: [ 'drawend'],
        methods: {
            addInteraction() {

                if (this.shapeType) {
                    let geometryFunction;
                    if (this.shapeType === ShapeTypes.SQUARE) {
                        geometryFunction = createRegularPolygon(4);
                    } else if (this.shapeType === ShapeTypes.BOX) {
                        geometryFunction = createBox();
                    }

                    this.draw = new Draw({
                        source: this.source,
                        type: 'Circle',
                        geometryFunction: geometryFunction,
                    });

                    this.draw.on("drawend", (target: DrawEvent) => {
                        this.$emit('drawend', target)
                    })
                    this.map.addInteraction(this.draw);
                    document.addEventListener("keydown", this.onKeydown);
                }
            },
            onKeydown(event:{key:string}){
                if (event.key === "Escape") {
                    if (this.draw)
                        this.abortDrawing()
                }

            },
            abortDrawing() {
                if (this.draw)
                    this.draw.abortDrawing()
            },
            finishDraw() {
                if (this.draw)
                    this.map.removeInteraction(this.draw)
                document.removeEventListener("keydown", this.onKeydown);
            },
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
