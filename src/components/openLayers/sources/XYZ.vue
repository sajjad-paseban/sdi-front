<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";

    import Map from 'ol/Map.js';
    import TileLayer from 'ol/layer/Tile.js';
    import XYZ from "ol/source/XYZ";

    export default defineComponent({
        name: "TileSourceComponent",
        components: {},
        setup() {
            const tileXyz = ref<XYZ>()
            return {tileXyz}
        },
        props: {

            map: {
                required: true,
                type: Map,
            },
            tile: {
                required: true,
                type: TileLayer,
            },
            url:{
                required:true,
                type:String
            },
            name:{
                required:false,
                type:String
            }
        },
        mounted(): void {
            if (this.url){
                this.tileXyz= new XYZ({ url: this.url, crossOrigin: 'anonymous', })

                this.tile.setSource(this.tileXyz)
                this.tile.setZIndex(1)
                if (this.name)
                    this.tile.set('name',this.name)
            }

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
