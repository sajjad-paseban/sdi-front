<template>
    <slot></slot>
    <v-btn v-if="touchScreen" @click="deleteSelectedFeatures"  style="position: absolute;right:calc(45dvw + 50px);bottom:20px;z-index: 1001" icon size="small">
        <v-avatar size="25" class="mx-2">
            <v-img src="@/assets/icons/delete.png" alt="John"></v-img>
        </v-avatar>
    </v-btn>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import VectorLayer from 'ol/layer/Vector.js';
    import VectorSource from 'ol/source/Vector.js';
    import {Select} from "ol/interaction";
    import Collection from 'ol/Collection.js';


    export default defineComponent({
        name: "DeleteBySelectComponent",
        components: {},
        setup() {
            const select = ref<Select>()
            return {select}
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
            vector: {
                required: true,
                type: VectorLayer,
            }


        },
        emits: [],
        mounted(): void {
            this.touchScreen = "ontouchstart" in document.documentElement

            this.initSelect()
            document.addEventListener("keydown", this.onKeydown);


        },
        computed: {},
        beforeUnmount(): void {
            this.finishDelete()
        },
        data() {
            return {
                touchScreen:false
            };
        },
        methods: {
            initSelect() {
                this.select = new Select({
                   filter:(feature:any,layer)=>{ return this.source.hasFeature(feature)}
                })
                this.map.addInteraction(this.select)
            },

            finishDelete() {

                if (this.select) {
                    this.select.setActive(false)
                    this.map.removeInteraction(this.select)
                }
                document.removeEventListener("keydown", this.onKeydown);

            },

            onKeydown(event: { key: string }) {
                if (event.key === "Delete" ) {
                    if (this.select)
                        this.select.getFeatures().getArray().map((feature)=>{
                            this.source.removeFeature(feature)
                        })
                }
            },

            deleteSelectedFeatures(){
                if (this.select)
                    this.select.getFeatures().getArray().map((feature)=>{
                        this.source.removeFeature(feature)
                    })
            }

        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
