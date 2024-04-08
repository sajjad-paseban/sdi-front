<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import {TranslateEvent} from 'ol/interaction/Translate'
    import Feature from 'ol/Feature.js';
    import Collection from 'ol/Collection.js';
    import VectorSource from 'ol/source/Vector.js';
    import {
        Select,
        Translate,
        defaults as defaultInteractions,
    } from 'ol/interaction.js';

    export default defineComponent({
        name: "TranslateComponent",
        components: {},
        setup() {
            const select = ref<Select>()
            const translate = ref<Translate>()
            // const textStyleRef = ref<TextStyleInterface>()
            return {select, translate}
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
        emits: ['translateEnd', 'translateStart'],
        async mounted() {
            await this.initSelect()
            await this.initTranslate()
        },
        computed: {},
        beforeUnmount(): void {
            this.finishTranslate()
        },
        data() {
            return {
                translateVersions: [] as Collection<Feature>[]

            };
        },
        methods: {
            initSelect() {

                this.select = new Select({
                    filter:(feature:any,layer)=>{ return this.source.hasFeature(feature)}
                })
                this.map.addInteraction(this.select)


            },

            initTranslate() {
                if (this.select) {
                    this.translate = new Translate({
                        features: this.select.getFeatures(),
                    });
                    this.translate.on('translateend', (data: TranslateEvent) => {
                        console.log(data.features.getArray()[0].getGeometry())
                        this.$emit('translateEnd', data)
                    })
                    this.translate.on('translatestart', (data: TranslateEvent) => {

                        console.log(this.source.getFeatures())
                        const features = this.source.getFeatures().map((feature) => {
                            return feature.clone()
                        })
                        this.translateVersions.push(new Collection(features))

                        this.$emit('translateStart', data)
                    })
                    this.map.addInteraction(this.translate)
                    document.addEventListener("keydown", this.onKeydown);
                }
            },

            finishTranslate() {
                if (this.translate)
                    this.map.removeInteraction(this.translate)
                if (this.select){
                    this.select.setActive(false)
                    this.map.removeInteraction(this.select)
                }

                document.removeEventListener("keydown", this.onKeydown);
            },

            onKeydown(event: { key: string }) {


                if (event.key === "u" || event.key === "U") {
                    if (this.translate && this.translateVersions.length > 0) {
                        const lastVersion = this.translateVersions.length - 1

                        this.source.clear()
                        this.translateVersions[lastVersion].getArray().map((feature)=>{
                            this.source.addFeature(new Feature({
                                geometry:feature.getGeometry()
                            }))
                        })
                        this.translateVersions.pop()


                    }

                }

            },

        },
        watch: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
