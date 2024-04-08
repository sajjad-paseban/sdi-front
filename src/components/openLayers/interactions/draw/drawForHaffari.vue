<template>
    <Text_style :modify="modify" :fill-color="'rgba(255,225,13,0.36)'" ref="textStyleRef"></Text_style>
    <div  v-if="height&&width&&touchScreen" :style="`top:${height-5}px;right:${width-6}px`" style="position: absolute;width:10px;height:10px;z-index: 10001;border: 2px black solid"
          class="bg-red rounded-lg "></div>
    <v-btn v-if="touchScreen" @click="addPoint" style="position: absolute;right:45dvw;bottom:20px;z-index: 1001" icon size="small">
        <v-avatar size="25" class="mx-2">
            <v-img src="@/assets/icons/add.png" alt="John"></v-img>
        </v-avatar>
    </v-btn>
    <v-btn v-if="touchScreen" @click="finishPoints" style="position: absolute;right:calc(45dvw + 50px);bottom:20px;z-index: 1001" icon size="small">
        <v-avatar size="25" class="mx-2">
            <v-img src="@/assets/icons/stop.png" alt="John"></v-img>
        </v-avatar>
    </v-btn>
    <v-btn v-if="touchScreen&&draw" @click="removeLastPoint" style="position: absolute;right:calc(45dvw + 100px);bottom:20px;z-index: 1001" icon size="small">
        <v-avatar size="25" class="mx-2">
            <v-img src="@/assets/icons/back.png" alt="John"></v-img>
        </v-avatar>
    </v-btn>
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
    import {Coordinate} from "ol/coordinate";

    export default defineComponent({
        name: "DrawForHaffariComponent",
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
            this.touchScreen = "ontouchstart" in document.documentElement

            if (this.touchScreen){
                const coords:Coordinate|undefined = this.map.getView().getCenter()

                if (coords){
                    const pixel = this.map.getPixelFromCoordinate(coords);
                    this.width = pixel[0]
                    this.height = pixel[1]
                }
            }


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
                modify:null as Modify|null,

                height:0,
                width:0,
                touchScreen:false

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
                    if (!this.touchScreen){
                        this.tip = ' دابل کلیک برای اتمام رسم'
                    }else {
                        this.tip = ''
                    }

                    this.$emit('drawstart', target)
                })

                this.draw.on("drawend", (target: DrawEvent) => {
                    if (!this.touchScreen){
                        this.tip = ' کلیک برای شروع رسم'
                    }else {
                        this.tip = ''
                    }
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

            addPoint() {
                if (this.draw) {
                    const coordinate: Coordinate | undefined = this.map.getView().getCenter()
                    if (coordinate)
                        this.draw.appendCoordinates([coordinate])
                }
            },
            finishPoints(){
                if (this.draw){
                    this.draw.finishDrawing()
                }
            }

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
