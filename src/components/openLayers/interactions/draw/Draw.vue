<template>
    <Text_style :modify="modify" :fill-color="'rgba(255,225,13,0.36)'" ref="textStyleRef"></Text_style>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import VectorSource from 'ol/source/Vector.js';
    import Draw from 'ol/interaction/Draw.js';
    import {DrawEvent, DrawType} from "@/components/openLayers/interactions/draw/model";

    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue"
    import {TextStyleInterface} from "@/components/openLayers/textStyle/TextStyle.interface";
    import Modify from 'ol/interaction/Modify.js';

    export default defineComponent({
        name: "DrawComponent",
        components: {Text_style},
        setup() {
            const draw = ref<Draw>()
            const textStyleRef = ref<TextStyleInterface>()
            return {draw, textStyleRef}
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
            type: {
                required: true,
                type: String as PropType<DrawType>
            },
            activeModify:{
                required: false,
                type: Boolean,
                default:false
            }

        },
        emits: ['drawstart', 'drawend'],
        mounted(): void {

            this.startDraw()
            if (this.activeModify){
                setTimeout(()=>{
                    this.map.getInteractions().getArray().map((item)=>{
                        if (item instanceof Modify)
                            this.modify = item
                    })

                },2000)
            }


        },
        computed: {},
        beforeUnmount(): void {
            this.finishDraw()
        },
        data() {
            return {
                tip: ' کلیک برای شروع رسم',
                modify:null as Modify|null

            };
        },
        methods: {
            removeLastPoint() {
                if (this.draw)
                    this.draw.removeLastPoint()
            },
            abortDrawing() {
                if (this.draw)
                    this.draw.abortDrawing()
            },
            startDraw() {
                this.draw = new Draw({
                    source: this.source, type: this.type, style: (feature: any) => {
                        if (this.textStyleRef) {
                            return this.textStyleRef.styleFunction(feature, true, this.type, this.tip)
                        }
                    }
                })

                this.draw.on("drawstart", (target: DrawEvent) => {
                    this.tip = ' دابل کلیک برای اتمام رسم'
                    this.$emit('drawstart', target)
                })

                this.draw.on("drawend", (target: DrawEvent) => {
                    this.tip = ' کلیک برای شروع رسم'
                    this.$emit('drawend', target)
                })
                this.map.addInteraction(this.draw)
                document.addEventListener("keydown", this.onKeydown);

            },
            finishDraw() {
                if (this.draw)
                    this.map.removeInteraction(this.draw)
                document.removeEventListener("keydown", this.onKeydown);
            },
            onKeydown(event:{key:string}){
                if (event.key === "Escape") {
                    if (this.draw)
                        this.abortDrawing()
                }

                if (event.key === "u"||event.key === "U") {
                    if (this.draw)
                        this.removeLastPoint()
                }

            },

        },
        watch: {
            activeModify(){
                if (this.activeModify){
                    setTimeout(()=>{
                        this.map.getInteractions().getArray().map((item)=>{
                            if (item instanceof Modify)
                                this.modify = item
                        })

                    },2000)
                }
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
