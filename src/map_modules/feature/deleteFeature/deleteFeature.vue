`
<template>
    <div>
        <vector_layer :map="map">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">
                </vector_source>
            </template>

            <template v-if="true" #style="{vector}">
                <Text_style :layer-type="drawType" :number-in-coords="true" :fill-color="'rgba(115,114,114,0.2)'"
                            :vector="vector"></Text_style>
            </template>
        </vector_layer>

        <template v-if="activePlugin===1&&store.getters.getActiveLayer">
            <click_wfs :custom-layer-name="store.getters.getActiveLayer"
                       @clickCallback="clickCallback" :map="map"></click_wfs>
        </template>

        <feature_toolbar @itemClick="toolbarClick" :items="toolbarItems" :width="{mobile:'45px',desktop:'95px'}"
                         :height="{mobile:'95px',desktop:'38px'}"></feature_toolbar>


    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, watch} from "vue"
    import {default as map} from "ol/Map";
    import {default as feature_toolbar} from "@/components/common/featureToolbar/featureToolbar.vue";
    import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import click_wfs from "@/components/openLayers/click/wfs.vue";

    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {DrawType} from "@/components/openLayers/interactions/draw/model";
    import {Layer_types} from "@/models/Layer.Interface";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import Feature from "ol/Feature";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import feature_functions from "@/componentFunctions/feature_functions";


    export default defineComponent({
        name: "DeleteFeatureComponent",
        setup(props) {
            const activePlugin = ref<number>(0)
            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const selectedFeature = ref<Feature>()
            const {getJsonFeaturesInfo,refreshLayer} = source_functions()
            const {deleteFeature} = feature_functions()

            const store = useStore();
            const toast = useToast()

            const drawType = ref<DrawType>(store.getters.getActiveLayer ? store.getters.getActiveLayer.type_layer : DrawType.POLYGON)

            watch(() => store.getters.getActiveLayer, (value: any) => {
                if (value.type_layer !== Layer_types.TIFF)
                    drawType.value = value.type_layer
            })

            return {
                activePlugin,
                drawType,
                store,
                toast,
                drawVectorSourceRef,
                selectedFeature,
                getJsonFeaturesInfo,
                deleteFeature,
                refreshLayer
            }
        },
        components: {
            feature_toolbar,
            vector_layer,
            vector_source,
            click_wfs,
            Text_style,


        },
        data() {
            return {
                draw: true,
                snap: false,

                layerFieldsForm: false,
                toolbarItems: [

                    {
                        id: 1,
                        icon: '/icons/click.png',
                        name: 'کلیک روی نقشه',
                        disabled: false
                    },

                    {
                        id: 2,
                        icon: '/icons/delete.png',
                        name: 'حذف',
                        disabled: false
                    },

                ] as FTItemsInterface[],

            };
        },
        directives: {},

        props: {
            map: {
                required: true,
                type: map
            }
        },
        methods: {
            deleteFeatureBtn() {
                if (this.selectedFeature) {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        accept: async () => {
                            if (this.selectedFeature) {
                                const res = await this.deleteFeature(this.store.getters.getActiveLayer.id, this.selectedFeature.get('pk'))
                                if (res) {
                                    this.$toast.add({
                                        group: 'tr',
                                        life: 2000,
                                        severity: 'success',
                                        summary: ' نتیجه درخواست',
                                        detail: 'عارضه با موفقیت حذف شد .'
                                    });

                                    if (this.drawVectorSourceRef)
                                        this.drawVectorSourceRef.removeFeatures()
                                    this.selectedFeature = undefined
                                    this.refreshLayer(this.map)
                                }
                            }

                        },
                        reject: async () => {
                            console.log('reject')
                        },
                        active: true
                    })
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'عارضه ای انتخاب نشده است'
                    });
                }
            },

            clickCallback(data: JSON) {
                if (this.drawVectorSourceRef) {
                    this.selectedFeature = this.getJsonFeaturesInfo(data)[0]

                    this.drawVectorSourceRef.removeFeatures()
                    this.drawVectorSourceRef.drawFeature(data)
                }
            },


            toolbarClick(item: FTItemsInterface) {
                if (this.store.getters.getActiveLayer) {

                    if (item.id === 1) {
                        this.toolbarItems.map((item) => {
                            item.disabled = true
                        })
                        if (this.activePlugin === 0) {
                            this.activePlugin = item.id
                            item.disabled = false
                        } else {
                            this.toolbarItems.map((item) => {
                                item.disabled = false
                            })
                            this.activePlugin = 0
                        }
                    }
                    if (item.id === 2) {
                        this.deleteFeatureBtn()
                    }
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'ابتدا لایه فعال را انتخاب کنید'
                    });
                }
            },

        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
