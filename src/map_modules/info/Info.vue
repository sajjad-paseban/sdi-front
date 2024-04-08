<template>
    <div style="position: relative">
        <template v-if="activeClick&&!store.getters.getActiveLayer">
            <Layer_click :show-layers="showLayers" @listItemClick="setActiveLayer" :map="map"></Layer_click>
        </template>

        <template v-if="store.getters.getActiveLayer">
            <Feature_click :externalApi="Api" @featureClick="featureClick" @coordinateClick="coordinateClick" :activeClick="activeClick"
                           ref="featureClickRef" :map="map">
                <template #extraBtn="{feature}">
                    <slot name="extra" :feature="feature"></slot>
                </template>
            </Feature_click>
        </template>

        <v-scale-transition>
            <v-btn
                    @click="clearActiveLayer"
                    icon
                    v-if="showClear&&!hideResetBtn"
                    bottom
                    right
                    size="small"
                    class="my-1 mr-3"
                    style="position: fixed;right:70px;z-index: 1001"
                    :style="fullScreen?'bottom: 18px;':'bottom: 48px;'"
            >
                <v-avatar size="25" class="mx-2">
                    <v-img src="@/assets/icons/reset.png" alt="John"></v-img>
                </v-avatar>
            </v-btn>
        </v-scale-transition>

        <v-scale-transition>
            <v-btn

                    @click="measureFeatureSide=!measureFeatureSide"
                    icon
                    v-if="fullScreen&&showClear"
                    bottom
                    right
                    size="small"
                    class="my-1 mr-3"
                    style="position: fixed;right:70px;z-index: 1001"
                    :style="fullScreen?(hideResetBtn?'bottom: 16px;':'bottom: 66px;'):'bottom: 96px;'"
            >
                <v-avatar size="25" class="mx-2">
                    <v-img src="@/assets/icons/mesure2.png" alt="John"></v-img>
                </v-avatar>
            </v-btn>
        </v-scale-transition>
        <template v-if="fullScreen&&featureClickRef">
            <ExternalPage :measure-feature-side="measureFeatureSide" @setExternalApi="setExternalApi"
                          @setActiveClick="setActiveClick" :featureClickInject="featureClickInject" :clickInjectCoordinate="clickInjectCoordinate"
                          :featureClickRef="featureClickRef" :map="map"></ExternalPage>
        </template>


    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, provide, ref, watch} from "vue";
    import {default as map} from "ol/Map";

    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {default as ExternalPage} from "@/map_modules/info/externalPage.vue"

    import {default as Layer_click} from "@/components/openLayers/click/overlay/layer_click.vue";
    import {default as Feature_click} from "@/components/openLayers/click/overlay/feature_click.vue";
    import {LayerItem} from "@/store/openLayer/types";
    import {OpenLayerMutations} from "@/store/openLayer/mutations";
    import {FeatureClickInterface} from "@/components/openLayers/click/overlay/feature_click_interface";
    import {ExternalApiInterface} from "@/models/Conncections.interface";
    import {Coordinate} from "ol/coordinate";

    export default defineComponent({
        name: "InfoComponent",
        components: {
            ExternalPage,
            Layer_click,
            Feature_click
        },

        setup(props) {
            const store = useStore();
            const toast = useToast()
            const featureClickRef = ref<FeatureClickInterface>()
            const showLayers = ref<LayerItem[]>([])

            const featureClickInject = ref<JSON>()
            const clickInjectCoordinate = ref<Coordinate>()

            function featureClick(featureJson: JSON) {
                featureClickInject.value = featureJson
            }

            function coordinateClick(coordinate:Coordinate){
                clickInjectCoordinate.value = coordinate
            }

            watch(() => store.getters.getShowLayers, (value: LayerItem[]) => {
                if (!props.fullScreen)
                    showLayers.value = value
            });

            watch(() => store.getters.getSubShowLayers, (value: LayerItem[]) => {
                if (props.fullScreen)
                    showLayers.value = value
            });



            return {
                store, toast, featureClickRef, showLayers, featureClick, featureClickInject,clickInjectCoordinate,coordinateClick
            }

        },

        props: {
            map: {
                required: true,
                type: map
            },
            fullScreen: {
                type: Boolean,
                default: false
            },
            hideResetBtn:{
                type:Boolean,
                default:false
            }
        },


        data() {
            return {
                showClear: false,
                activeClick: true,
                Api: null as ExternalApiInterface | null,
                measureFeatureSide: false
            };
        },

        methods: {
            setActiveLayer(id: number, clickCoordinate: [number, number]) {
                this.store.getters.getLayers.map(async (layer: LayerItem) => {
                    if (layer.id === id) {
                        await this.store.commit(OpenLayerMutations.SET_ACTIVE_LAYER, layer)
                        console.log(clickCoordinate)
                        if (this.featureClickRef)
                            this.featureClickRef.clickByCoordinate(clickCoordinate)
                    }
                })
            },
            async clearActiveLayer() {
                await this.store.commit(OpenLayerMutations.SET_ACTIVE_LAYER, undefined)

            },

            setActiveClick(value: boolean) {
                this.activeClick = value
            },


            setExternalApi(res: ExternalApiInterface) {
                this.Api = res
            }


        },
        mounted(): void {
            console.log(this.fullScreen, 'active fullScreen')

            if (this.fullScreen) {
                this.showLayers = this.store.getters.getSubShowLayers
            } else {
                this.showLayers = this.store.getters.getShowLayers
            }

            setTimeout(() => {
                this.showClear = true
            }, 500)
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
