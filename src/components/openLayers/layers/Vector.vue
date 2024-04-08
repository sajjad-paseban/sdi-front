<template>
    <slot v-if="Vector" :vector="Vector" name="source"></slot>
    <slot v-if="Vector" :vector="Vector" name="style"></slot>
    <slot v-if="Vector" :vector="Vector" name="clusterSource"></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import View from 'ol/View.js';
    import Map from 'ol/Map.js';
    import VectorLayer from 'ol/layer/Vector.js';
    import VectorSource from 'ol/source/Vector.js';

    import {Style} from "ol/style";

    export default defineComponent({
        name: "VectorComponent",
        components: {},
        setup() {
            const Vector = ref<VectorLayer<VectorSource>>()
            return {Vector}
        },
        props: {

            map: {
                required: true,
                type: Map,
            },
            style:{
                required: false,
                type:Style
            },
            zIndex:{
                required:false,
                type:Number
            },
            minZoom:{
                required:false,
                type:Number
            },
            maxZoom:{
                required:false,
                type:Number
            },
            visible:{
                type:Boolean,
                default:true
            }

        },
        mounted(): void {
            this.Vector = new VectorLayer({
                declutter: true,
            })
            if (this.minZoom){
                this.Vector.setMinZoom(this.minZoom)
            }
            if (this.maxZoom){
                this.Vector.setMaxZoom(this.maxZoom)
            }
            if (this.style){
                this.Vector.setStyle(this.style)
            }
            if (this.zIndex){
                this.Vector.setZIndex(this.zIndex)
            }
            this.Vector.setVisible(this.visible)
            this.map.addLayer(this.Vector)

        },
        beforeUnmount(): void {
            if (this.Vector)
                 this.map.removeLayer(this.Vector)
        },
        computed: {},
        data() {
            return {};
        },
        methods: {},
        watch: {
            visible(){
                this.Vector?.setVisible(this.visible)
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
