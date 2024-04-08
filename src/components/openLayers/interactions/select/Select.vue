<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import VectorLayer from 'ol/layer/Vector.js';
    import VectorSource from 'ol/source/Vector.js';
    import {Select} from "ol/interaction";
    import {SelectEvent} from "ol/interaction/Select"
    import Collection from 'ol/Collection.js';
    import Feature from 'ol/Feature.js';
    import {extend,createEmpty} from 'ol/extent';

    export default defineComponent({
        name: "SelectComponent",
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
            },
            cluster:{
                type:Boolean,
                default:false
            }


        },
        emits: ['selected','outSelected'],
        mounted(): void {
            setTimeout(()=>{
                this.initSelect()
                document.addEventListener("keydown", this.onKeydown);
            },1000)



        },
        computed: {},
        beforeUnmount(): void {
            this.finish()
        },
        data() {
            return {};
        },
        methods: {
            initSelect() {
                if (this.cluster){
                    this.select = new Select({
                        filter:(feature:any,layer)=>{ return feature?this.source.hasFeature(feature.get('features')?feature.get('features')[0]:feature):false}
                    })
                    this.map.addInteraction(this.select)
                    this.select.on('select',(event:SelectEvent)=>{
                        const newEvent = {...event}
                        console.log(event)
                        if (event.selected.length>0){
                            newEvent.selected = event.selected.map((feature)=>{
                                if(feature.get('features')){
                                    return feature.get('features')[0]
                                }else {
                                    return feature
                                }

                            })
                            this.$emit('selected',newEvent)
                        }else {
                            this.$emit('outSelected',newEvent)
                        }

                    })
                    this.select.on('select',(event:SelectEvent)=>{
                        const newEvent = {...event}
                        console.log(event)
                        if (event.selected.length>0){
                            newEvent.selected = event.selected.map((feature)=>{
                                if(feature.get('features')){
                                    return feature.get('features')[0]
                                }else {
                                    return feature
                                }

                            })
                            this.$emit('selected',newEvent)
                        }else {
                            this.$emit('outSelected',newEvent)
                        }

                    })
                }else {
                    this.select = new Select({
                        filter:(feature:any,layer)=>{ return this.source.hasFeature(feature)}
                    })
                    this.map.addInteraction(this.select)
                    this.select.on('select',(event:SelectEvent)=>{
                        if (event.selected.length>0){
                            this.$emit('selected',event)
                        }
                        else {
                            this.$emit('outSelected',event)
                        }
                    })
                }

            },

            setSelect(features:Feature[]){
                if (!this.cluster){
                    console.log('ss')
                    this.select?.getFeatures().clear()
                    features.map((feature)=>{
                        console.log(feature)
                        this.select?.getFeatures().push(feature)
                    })
                }

                const extent = createEmpty()
                features.map((feature)=>{
                    const newExtent = feature.getGeometry()?.getExtent()
                    if (newExtent)
                        extend(extent,newExtent)
                })

                this.map.getView().fit(extent,{
                    duration:2000,
                    maxZoom:20,
                    padding:[100,100,100,100]
                })


            },

            finish() {

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


        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
