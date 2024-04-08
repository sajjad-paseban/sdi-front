<template>
    <div>
        <v-scale-transition>

            <v-btn
                    v-if="initData"
                    icon
                    class="elevation-3"
                    @click="transitionBtnClick('کپی')"
                    style="font-weight: bold !important;position: fixed;top:30px;right:20px;z-index:1001"
                    v-tooltip.left="'کپی عارضه های پیدا شده'"
            >
                <v-avatar size="44" class=" pa-2">
                    <v-img
                            class=""
                            src="@/assets/icons/copy.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>
        </v-scale-transition>
        <v-scale-transition>
            <v-btn
                    v-if="initData"
                    icon
                    @click="transitionBtnClick('انتقال')"
                    class="elevation-3"
                    style="font-weight: bold !important;position: fixed;top:90px;right:20px;z-index:1001"
                    v-tooltip.left="'انتقال عارضه های پیدا شده'"
            >
                <v-avatar size="44" class=" pa-2">
                    <v-img
                            class=""
                            src="@/assets/icons/transfer.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>
        </v-scale-transition>
        <v-scale-transition>
            <v-btn
                    icon
                    v-if="initData"
                    @click="showFindFeaturesDialog"
                    class="elevation-3"
                    style="font-weight: bold !important;position: fixed;top:150px;right:20px;z-index:1001"
                    v-tooltip.left="'جدول عارضه های پیدا شده'"
            >
                <v-avatar size="44" class=" pa-2">
                    <v-img
                            class=""
                            src="@/assets/icons/info.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>

        </v-scale-transition>
        <v-scale-transition>
            <v-btn
                    icon
                    v-if="initData"
                    @click="searchLayerDialog=true"
                    class="elevation-3"
                    style="font-weight: bold !important;position: fixed;top:210px;right:20px;z-index:1001"
                    v-tooltip.left="'انتخاب لایه جستجو'"
            >
                <v-avatar size="44" class=" pa-2">
                    <v-img
                            class=""
                            src="@/assets/icons/layer.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>

        </v-scale-transition>

        <router-view @changeShowType="changeShowType" @changeDrawShowType="changeDrawShowType"
                     @setFindFeatures="setFindFeatures" v-if="map" :map="map"
                     :searchLayer="searchLayer" :selectedFeature="selectedFeature"
                     @mapFeatureSelect="mapFeatureSelect" @reset="reset"></router-view>

        <popupWindow :close-btn="true" v-if="winSize!==0&&findFeatures.length>0&&findFeaturesDialog" :resize="true"
                     :top="winSize>500?'10px':'10px'"
                     :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
                     :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                     :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'50vh':'50vh'"
                     :width="winSize>500?'25vw':'80vw'" @closeWindow="findFeaturesDialog = false">
            <v-card height="100%" width="100%" class="pa-2">
                <div id="table2" class=" elevation-2 rounded-lg border" style="height: 100%">
                    <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                        <v-fade-transition>
                            <v-progress-circular
                                    :size="50"
                                    color="primary"
                                    indeterminate
                            ></v-progress-circular>
                        </v-fade-transition>
                    </v-row>
                    <v-fade-transition>
                        <EditableTable
                                v-if="headers.length>0"
                                ref="editTable"
                                :headers="headers"
                                class="rounded-lg"
                                :items="findFeatures"
                                @itemClick="featureClick"
                                :checkBox="false"
                                :height="height"
                                :filter-activate="tableFilterActivate"
                                style="background-color: white"
                        ></EditableTable>
                    </v-fade-transition>
                </div>
            </v-card>
        </popupWindow>

        <popupWindow :close-btn="true" v-if="winSize!==0&&selectedFeature" :resize="true"
                     :top="winSize>500?'55vh':'55vh'"
                     :left="winSize>500?'60px':'70px'" :max_width="winSize>500?'100vw':'100vw'"
                     :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                     :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'30vh':'30vh'"
                     :width="winSize>500?'20vw':'50vw'" @closeWindow="closeFeatureDialog">
            <v-card height="100%" width="100%" class="pa-2" style="">
                <v-card class="rounded-lg" style="height:100%;width: 100%;overflow-y: auto;overflow-x: auto">
                    <v-table density="compact">
                        <thead>

                        </thead>
                        <tbody>
                        <tr
                                v-for="(value, name, index) in selectedFeature"
                                :key="index"
                        >
                            <td class="font-weight-bold text-blue-darken-4 bg-grey-lighten-4">{{ name}}</td>
                            <td class="font-weight-black">{{ value }}</td>
                        </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-card>
        </popupWindow>

        <simple-dialog
                :show="transitionDialog"
                :topic="'انتخاب لایه'"
                :overLayer="true"
                width="30vw"
                height="80vh"
                @closeDialog="transitionDialog = false"
        >
            <v-card height="100%" class="pa-2">
                <div style="height: calc(100% - 35px)">
                    <layer-tree @treeClick="treeClick" class=""></layer-tree>
                </div>
                <v-row class="ma-0 pa-0" justify="end" align="center">
                    <v-btn
                            variant="tonal"
                            prepend-icon="mdi-content-save-move"
                            style="font-weight: bold !important"
                            size="small"
                            color="primary"
                            @click="transitionFeatures"
                            class="elevation-1  rounded-lg mt-2"
                    >{{transitionOperation}}
                    </v-btn>
                </v-row>
            </v-card>
        </simple-dialog>
        <simple-dialog
                :show="searchLayerDialog"
                :topic="'انتخاب لایه'"
                :overLayer="true"
                width="30vw"
                height="80vh"
                @closeDialog="searchLayerDialog = false"
        >
            <v-card height="100%" class="pa-2 ma-0">
                <div style="height: calc(100% - 5px)">
                    <layer-tree @treeClick="treeClickForSearchLayer" class=""></layer-tree>
                </div>

            </v-card>
        </simple-dialog>

    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref, watch} from "vue";
    import {default as map} from 'ol/Map.js';
    import popupWindow from "@/components/common/popupWindow.vue";
    import EditableTable from "@/components/common/editableTable.vue";
    import tables from "@/componentFunctions/tables_functions";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import layerTree from "@/map_modules/layer/common/layerTree.vue";
    import {LayerItem} from "@/store/openLayer/types";
    import {Layer_types, LayerTree} from "@/models/Layer.Interface";
    import {useStore} from "vuex";
    import Feature from 'ol/Feature.js';
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import GeoJSON from "ol/format/GeoJSON";
    import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import feature_functions from "@/componentFunctions/feature_functions";


    export default defineComponent({
        extends: {},
        name: "SearchComponent",
        components: {popupWindow, EditableTable, SimpleDialog, layerTree},

        setup() {

            const store = useStore();
            const geoJsonFormat = ref<GeoJSON>(new GeoJSON({}))
            const {getJsonFeaturesInfo} = source_functions()
            const {copyFeatures, moveFeatures} = feature_functions()
            const initData = ref(false)
            const selectedFeature = ref(null)
            const selectedMapObjectFeature = ref<Feature | null>(null)
            const findFeatures = ref<any[]>([])
            const jsonCollectionFindFeatures = ref<any>(null)
            const headers = ref<{ text: string, value: string, width: string }[]>([])

            const searchLayer = ref<LayerItem | null>(null)

            onMounted(async () => {
                if (store.getters.getActiveLayer?.type_layer !== Layer_types.TIFF)
                    searchLayer.value = store.getters.getActiveLayer
                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            watch(() => store.getters.getActiveLayer, (value: any) => {
                if (value.type_layer !== Layer_types.TIFF)
                    searchLayer.value = value
            });

            return {
                initData,
                headers,
                selectedFeature,
                findFeatures,
                searchLayer,
                store,
                jsonCollectionFindFeatures,
                geoJsonFormat,
                selectedMapObjectFeature,
                getJsonFeaturesInfo,
                copyFeatures, moveFeatures
            }
        },

        data() {
            return {
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                // /-------table data---------/

                findFeaturesDialog: true,
                transitionDialog: false,
                transitionOperation: '',
                layerTransition: null as LayerTree | null,
                searchLayerDialog: false,

                // ------router data--------
                showType: 'از نو',
                drawShowType: 'point'
            }
        },

        props: {
            map: {
                required: true,
                type: map
            }
        },

        watch: {
            findFeatures() {
                if (this.findFeatures.length > 0) {
                    let entries = Object.entries(this.findFeatures[0])
                    this.headers = []
                    setTimeout(() => {
                        entries.forEach(([key, val]) => {
                            this.headers.push({
                                text: key,
                                value: key,
                                width: "10%"
                            })
                        });
                        if (this.findFeatures.length > 0)
                            this.screenResizeHandler()
                    }, 500)
                }
            },
            initData() {
                if (this.initData)
                    setTimeout(() => {
                        if (this.findFeatures.length > 0)
                            this.screenResizeHandler()
                    }, 200)
            },
            jsonCollectionFindFeatures() {
                if (this.jsonCollectionFindFeatures && this.jsonCollectionFindFeatures.features) {
                    this.findFeatures = this.jsonCollectionFindFeatures.features.map((feature: any) => {
                        return {
                            ...feature.properties,
                            id: feature.id.split('.')[1]
                        }
                    })
                } else {
                    this.findFeatures = []
                }


            }
        },

        methods: {

            // ------router functions--------
            changeShowType(showType: string) {
                this.showType = showType

            },
            changeDrawShowType(drawShowType: string,sourceRef: VectorSourceInterface, clusterRef: ClusterSourceInterface) {
                this.drawShowType = drawShowType
                this.setFindFeatures(this.jsonCollectionFindFeatures,sourceRef,clusterRef)
            },
            setFindFeatures(features: any, sourceRef: VectorSourceInterface, clusterRef: ClusterSourceInterface) {
                if (features && features.features){
                    if (this.showType === 'از نو') {
                        this.jsonCollectionFindFeatures = features
                    } else if (this.showType === 'افزایش') {
                        if (this.jsonCollectionFindFeatures) {
                            features.features.map((feature: any) => {
                                this.jsonCollectionFindFeatures.features.push(feature)
                            })
                            this.jsonCollectionFindFeatures = {...this.jsonCollectionFindFeatures}
                        } else {
                            this.jsonCollectionFindFeatures = features
                        }
                    } else {
                        features.features.map((feature: any) => {
                            this.jsonCollectionFindFeatures.features = this.jsonCollectionFindFeatures.features.filter((f: any) => {
                                return !(f.id === feature.id)
                            })
                        })
                        this.jsonCollectionFindFeatures = {...this.jsonCollectionFindFeatures}
                    }

                    if (this.drawShowType === 'point') {
                        clusterRef.removeFeatures()
                        sourceRef.removeFeatures()
                        clusterRef.drawFeature(this.jsonCollectionFindFeatures.features)
                    } else {
                        clusterRef.removeFeatures()
                        clusterRef.drawFeature(this.jsonCollectionFindFeatures.features)
                        sourceRef.removeFeatures()
                        sourceRef.drawFeature(this.jsonCollectionFindFeatures)
                    }
                }else {
                    this.$toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'عارضه ای یافت نشده است'
                    });
                }



            },

            mapFeatureSelect(pk: number) {
                console.log(pk)
                this.findFeatures.map((feature) => {
                    if (feature.id === pk) {
                        this.selectedFeature = feature
                    }

                })
            },
            reset() {
                this.jsonCollectionFindFeatures = null
                this.selectedMapObjectFeature = null
                this.selectedFeature = null
            },

            // ------router functions--------
            treeClickForSearchLayer(item: any) {
                this.store.getters.getLayers.map((layer: LayerItem) => {
                    if (layer.id === item.id) {
                        this.searchLayer = layer
                    }

                })
            },

            screenResizeHandler() {         //  برای اندازه ازتفاع جدول //
                let x: any = document.getElementById("table2");
                this.height = String(x.offsetHeight);
            },
            featureClick(feature: any) {
                this.selectedFeature = feature
            },
            closeFeatureDialog() {
                this.selectedFeature = null
            },
            showFindFeaturesDialog() {
                if (this.findFeatures.length === 0) {
                    this.$toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'عارضه ای یافت نشده است'
                    });
                } else {
                    this.findFeaturesDialog = true;
                }

            },
            treeClick(item: LayerTree) {
                this.layerTransition = item
            },
            transitionBtnClick(operation: string) {
                if (this.findFeatures.length === 0) {
                    this.$toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'عارضه ای یافت نشده است'
                    });
                } else {
                    this.transitionOperation = operation
                    this.transitionDialog = true
                }

            },
            async transitionFeatures() {
                if (!(this.layerTransition && this.layerTransition.is_service)&&this.searchLayer&&this.layerTransition) {
                    const features_id = this.getJsonFeaturesInfo(this.jsonCollectionFindFeatures).map((feature) => {
                        return feature.get('pk')
                    })
                    if (this.transitionOperation === 'انتقال') {
                        if (this.searchLayer && this.searchLayer.imported_type === 'wms') {
                            this.$toast.add({
                                group: 'br',
                                life: 2000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'لایه مبدا نمیتواند سرویس باشد'
                            });
                        }else {
                            const res = await this.moveFeatures({
                                feature_layer_id: this.searchLayer.id,
                                features_id: features_id
                            }, this.layerTransition.id)
                            if (res){
                                this.$toast.add({
                                    group: 'tr',
                                    life: 2000,
                                    severity: 'success',
                                    summary: ' نتیجه درخواست',
                                    detail: 'عارضه با موفقیت منتقل شد .'
                                });

                                this.transitionDialog = false
                            }
                        }



                    } else {
                        const res = await this.copyFeatures({
                            feature_layer_id: this.searchLayer.id,
                            features_id: features_id
                        }, this.layerTransition.id)
                        if (res){
                            this.$toast.add({
                                group: 'tr',
                                life: 2000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'عارضه با موفقیت کپی شد .'
                            });
                            this.transitionDialog = false
                        }
                    }
                    console.log(this.searchLayer)
                    console.log(this.layerTransition, this.transitionOperation, features_id)
                } else {
                    this.$toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'لایه مقصد نمیتواند سرویس باشد'
                    });
                }
            }
        },
        computed: {
            winSize() {
                return window.innerWidth
            },
            winHeight() {
                console.log(window.innerHeight)
                return window.innerHeight
            }
        },
        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
