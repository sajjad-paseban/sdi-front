<template>
    <Text_style :fill-color="'rgba(255,225,13,0.36)'" ref="textStyleRef"></Text_style>

</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import VectorSource from 'ol/source/Vector.js';
    import Modify from 'ol/interaction/Modify.js';
    import {DrawEvent, DrawType} from "@/components/openLayers/interactions/draw/model";

    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue"
    import {TextStyleInterface} from "@/components/openLayers/textStyle/TextStyle.interface";

    export default defineComponent({
        name: "ModifyComponent",
        components: {Text_style},
        setup() {
            const modify = ref<Modify>()
            const textStyleRef = ref<TextStyleInterface>()
            return {modify, textStyleRef}
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
        emits: ['modifystart', 'modifyend'],
        mounted(): void {

            this.startModify()

        },
        computed: {},
        beforeUnmount(): void {
            this.finishModify()
        },
        data() {
            return {
                tip: ' شروع ویرایش'
            };
        },
        methods: {


            startModify() {
                this.modify = new Modify({
                    source: this.source, style: (feature: any) => {
                        if (this.textStyleRef) {
                            return this.textStyleRef.styleFunction(feature, true, DrawType.POLYGON, this.tip)
                        }
                    }
                })

                this.modify.on("modifystart", (target: any) => {
                    this.tip = ''
                    this.$emit('modifystart', target)
                })

                this.modify.on("modifyend", (target: any) => {
                    this.tip = ' شروع ویرایش'
                    this.$emit('modifyend', target)
                })


                this.map.addInteraction(this.modify)
            },
            finishModify() {
                if (this.modify)
                    this.map.removeInteraction(this.modify)
            }
        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
