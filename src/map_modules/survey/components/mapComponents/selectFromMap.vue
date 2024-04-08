<template>
    <div>

        <vector_layer :map="map" v-if="store.getters.getSubActiveLayer">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">
                </vector_source>
            </template>
            <template v-if="true" #style="{vector}">
                <Text_style :layer-type="store.getters.getSubActiveLayer.type_layer" :number-in-coords="true"
                            :fill-color="'rgba(234,221,81,0.63)'"
                            :vector="vector"></Text_style>
            </template>
        </vector_layer>


        <feature_toolbar :showClose="false" @itemClick="toolbarClick" :left="'42vw'" :items="toolbarItems"
                         :width="{mobile:'45px',desktop:'240px'}"
                         :height="{mobile:'240px',desktop:'38px'}">

            <v-slide-y-transition>
                <v-card v-if="[3].includes(activePlugin)"
                        :style="winSize>500?'margin-right: 30px':'margin-right: -155px;margin-top: 30px;'" width="150px"
                        height="200px">
                    <v-row class="ma-0 pa-0 bg-info" justify="center">
                        <p style="font-size: 11px" class="pa-1 font-weight-bold">جستجو نقطه</p>
                    </v-row>
                    <v-form ref="locationSearchForm">
                        <v-row class="ma-0 pa-0 myForm" justify="center">

                            <v-col class="mb-n1" cols="12">
                                <v-text-field v-model="xPoint" density="compact" variant="solo" :rules="textFloat"
                                              required>
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-numeric"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">طول جغرافیایی</p>
                                    </template>


                                </v-text-field>
                            </v-col>
                            <v-col class="my-n1" cols="12">
                                <v-text-field v-model="yPoint" density="compact" variant="solo" :rules="textFloat"
                                              required>
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-numeric"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">عرض جغرافیایی</p>
                                    </template>


                                </v-text-field>
                            </v-col>


                            <v-col cols="12" class="mt-n1">
                                <v-btn-toggle
                                        v-model="projection"
                                        density="compact"
                                        style="height: 20px;width: 100%"
                                        class="rounded pa-0 myForm"
                                        color="info"
                                >
                                    <v-btn
                                            value="dd"
                                            variant="tonal"
                                            size="x-small"
                                            style="width: 50%;"
                                            color="info"

                                    >
                                        <p style="margin-top: 1px" class=" font-weight-bold">DD</p>
                                    </v-btn>
                                    <v-btn
                                            value="utm"
                                            variant="tonal"
                                            size="x-small"
                                            color="info"
                                            style="width: 50%;"

                                    >
                                        <p style="margin-top: 1px" class=" font-weight-bold">UTM</p>
                                    </v-btn>

                                </v-btn-toggle>
                            </v-col>
                            <v-col class="my-n1" cols="12">
                                <v-btn
                                        variant="tonal"
                                        @click="searchByLocation"
                                        style="font-weight: bold !important;width: 100%;font-size: 11px"
                                        rounded="lg"
                                        size="small"
                                        class=""
                                        color="info"


                                >جستجو
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                </v-card>
            </v-slide-y-transition>

            <v-slide-y-transition>
                <v-card v-if="[8].includes(activePlugin)"
                        :style="winSize>500?'margin-right: 30px':'margin-right: -155px;margin-top: 30px;'" width="190px"
                        height="120px">
                    <v-row class="ma-0 pa-0 bg-info" justify="center">
                        <p style="font-size: 11px" class="pa-1 font-weight-bold">جستجو کد نوسازی</p>
                    </v-row>
                    <v-form ref="locationSearchForm">
                        <v-row class="ma-0 pa-0 myForm" justify="center">

                            <v-col class="mb-n1" cols="12">
                                <v-text-field clearable v-model="searchCode" density="compact" variant="solo"
                                              :rules="textFloat"
                                              required>
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-numeric"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">کد نوسازی </p>
                                    </template>


                                </v-text-field>
                            </v-col>

                            <v-col class="my-n1" cols="12">
                                <v-btn
                                        variant="tonal"
                                        @click="searchByCode"
                                        style="font-weight: bold !important;width: 100%;font-size: 11px"
                                        rounded="lg"
                                        size="small"
                                        class=""
                                        color="info"
                                >جستجو
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                </v-card>
            </v-slide-y-transition>

        </feature_toolbar>

        <template v-if="activePlugin===4&&store.getters.getSubActiveLayer">
            <click_wfs :custom-layer-name="store.getters.getSubActiveLayer"
                       @clickCallback="clickCallback" :map="map" :source="this.ownSource"></click_wfs>
        </template>


        <simple-dialog
                :show="searchResultDialog"
                :topic="'انتخاب عارضه'"
                :overLayer="true"
                width="30vw"
                height="70vh"
                @closeDialog="searchResultDialog = false"
        >
            <v-card height="100%" class="pa-2 ma-0 myForm" style="height:60dvh">

                <v-list v-if="featuresFind.length>0"
                        style="overflow-y: auto;background-color: white!important;height:100%"
                        class="rounded-lg elevation-1 border" density="compact" nav
                >

                    <v-list-item @click="selectSearchFeatures(item)" v-for="item in featuresFind" density="compact"
                                 class="rounded-lg elevation-3" :title="item['properties'].code"
                                 :value="item['properties'].code">
                    </v-list-item>
                </v-list>
                <v-row class="ma-0 pa-0" v-else style="height:100%" justify="center" align="center">
                    <p class="font-weight-bold text-blue">عارضه ای یافت نشد</p>
                </v-row>


            </v-card>
        </simple-dialog>

        <v-btn @click="closeWindow" :v-tooltip.top="'نقشه اصلی'"
               style="position: fixed;bottom:48px;right:80px;z-index: 1001" size="small" icon>
            <v-avatar size="25" class="mx-2">
                <v-img src="@/assets/icons/home.png" alt="John"></v-img>
            </v-avatar>
        </v-btn>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, provide, ref, watch} from "vue";
import {default as map} from "ol/Map";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";

import {LayerItem} from "@/store/openLayer/types";
import {default as feature_toolbar} from "@/components/common/featureToolbar/featureToolbar.vue";
import {SurveyMutations} from "@/store/survey/mutations";
import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
import click_wfs from "@/components/openLayers/click/wfs.vue";
import TileWMS from "ol/source/TileWMS";
import {SurveyLayers} from "@/store/survey/types";
import {OpenLayerMutations} from "@/store/openLayer/mutations";
import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
import Feature from "ol/Feature";
import source_functions from "@/components/openLayers/componentFunctions/source";
import Point from "ol/geom/Point";
import {Utm} from "geodesy/mgrs";
import VForm from "@/models/VForm.interface";
import rules from "@/componentFunctions/rules_functions";
import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
import {JsonFeature} from "@/map_modules/info/externalPage.vue";
import layerTree from "@/map_modules/layer/common/layerTree.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {useRoute, useRouter} from "vue-router";
import {OpenLayerAction} from "@/store/openLayer/actions";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";

export default defineComponent({
    name: "SelectFromMapComponent",
    components: {
        SimpleDialog,
        click_wfs,
        feature_toolbar,
        vector_layer,
        vector_source,
        Text_style,
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {getJsonFeaturesInfo, refreshLayer, addFeaturesObject, zoomToFeatures} = source_functions()
        const {getFeatureByField} = wfs_functions()
        const {getProcessItem, processItemValue} = survey_panel_functions()

        const showLayers = ref<LayerItem[]>([])
        const activePlugin = ref<number>(0)
        const ownSource = ref<TileWMS>()
        const drawVectorSourceRef = ref<VectorSourceInterface>()
        const selectedFeature = ref<Feature>()
        const locationSearchForm = ref<VForm>()
        const {textFloat} = rules()


        watch(() => store.getters.getShowLayers, (value: LayerItem[]) => {
            if (!props.fullScreen)
                showLayers.value = value
        });

        watch(() => store.getters.getSubShowLayers, (value: LayerItem[]) => {
            if (props.fullScreen)
                showLayers.value = value
        });


        return {
            locationSearchForm,
            addFeaturesObject,
            textFloat,
            getFeatureByField,
            router,
            zoomToFeatures,
            route,
            getProcessItem,
            processItemValue,
            store,
            toast,
            showLayers,
            activePlugin,
            ownSource,
            drawVectorSourceRef,
            selectedFeature,
            getJsonFeaturesInfo
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
        }
    },


    data() {
        return {

            toolbarItems: [
                {
                    id: 1,
                    icon: '/icons/reset.png',
                    name: 'ریست',
                    disabled: false
                },
                {
                    id: 2,
                    icon: '',
                    name: '',
                    divider: true
                },
                {
                    id: 3,
                    icon: '/icons/location_search.png',
                    name: 'جتسجو با مختصات',
                    disabled: false
                },
                {
                    id: 8,
                    icon: '/icons/code_number.png',
                    name: 'جتسجو با کد نوسازی',
                    disabled: false
                },
                {
                    id: 4,
                    icon: '/icons/click.png',
                    name: 'کلیک روی نقشه',
                    disabled: false
                },
                {
                    id: 6,
                    icon: '',
                    name: '',
                    divider: true
                },
                {
                    id: 7,
                    icon: '/icons/save.png',
                    name: 'انتخاب ملک',
                    disabled: false
                },
            ] as FTItemsInterface[],

            //-----search by location-------//
            projection: 'utm',
            xPoint: '',
            yPoint: '',

            searchCode: '',
            featuresFind: [] as JSON[],
            searchResultDialog: false,

            process_id: null as null | number,
        };
    },

    methods: {

        closeWindow() {

            this.store.commit('setConfirmDialog', {
                massage: 'آیا صفحه بسته شود ؟',
                topic: 'اخطار',
                active: true,
                accept: async () => {
                    window.close()
                },
                reject: () => {
                    console.log('reject')
                },

            })

        },

        toolbarClick(item: FTItemsInterface) {
            if (item.id === 7) {
                this.toolbarItems.map((item) => {
                    item.disabled = false
                })
                this.saveSelectFeature()
            }
            if (this.activePlugin == 0) {
                this.toolbarItems.map((item) => {
                    item.disabled = true
                })

                if (item.id === 4) {
                    item.disabled = false
                    this.activePlugin = 4
                }

                if (item.id === 3) {
                    item.disabled = false
                    this.activePlugin = 3
                }

                if (item.id === 8) {
                    item.disabled = false
                    this.activePlugin = 8
                }

                if (item.id === 1) {
                    this.toolbarItems.map((item) => {
                        item.disabled = false
                    })
                    this.reset()
                }

            } else {
                this.toolbarItems.map((item) => {
                    item.disabled = false
                })
                this.activePlugin = 0
            }

            this.toolbarItems.map((item) => {
                if (item.id === 7) {
                    item.disabled = false
                }
            })

        },

        reset() {
            if (this.drawVectorSourceRef) {
                this.drawVectorSourceRef.removeFeatures()
                this.selectedFeature = undefined
            }

        },

        clickCallback(data: any) {
            console.log(data)
            if (this.drawVectorSourceRef) {
                this.selectedFeature = this.getJsonFeaturesInfo(data)[0]

                this.drawVectorSourceRef.removeFeatures()
                this.drawVectorSourceRef.drawFeature(data.features[0])
            }
        },

        async searchByLocation() {
            if (this.locationSearchForm) {
                const res = await this.locationSearchForm.validate()
                if (res.valid && this.drawVectorSourceRef) {
                    if (this.projection === 'dd') {
                        const feature = new Feature({
                            geometry: new Point([parseFloat(this.xPoint), parseFloat(this.yPoint)])
                        })
                        this.addFeaturesObject(this.drawVectorSourceRef.getSource(), [feature])
                        this.map.getView().animate({
                            center: [parseFloat(this.xPoint), parseFloat(this.yPoint)],
                            duration: 2000,
                            zoom: 19
                        })
                    } else {
                        const latLon = new Utm(this.store.getters.getZone, 'N', parseFloat(this.xPoint), parseFloat(this.yPoint)).toLatLon()
                        const feature = new Feature({
                            geometry: new Point([latLon.lng, latLon.lat])
                        })
                        this.addFeaturesObject(this.drawVectorSourceRef.getSource(), [feature])
                        this.map.getView().animate({
                            center: [latLon.lng, latLon.lat],
                            duration: 2000,
                            zoom: 19
                        })
                    }

                }
            }

        },

        async searchByCode() {

            const res = await this.getFeatureByField(this.store.getters.getSubActiveLayer, 'code', this.searchCode, 10)
            this.featuresFind = res.features
            this.searchResultDialog = true
        },

        selectSearchFeatures(item: JSON) {
            console.log(item, 'selectSearchFeatures')
            if (this.drawVectorSourceRef) {
                this.drawVectorSourceRef.removeFeatures()
                this.drawVectorSourceRef.drawFeature(item)
                const features = this.drawVectorSourceRef.getFeatures()
                if (features.length > 0) {
                    this.selectedFeature = features[0]
                    const geo = features[0].getGeometry()
                    if (geo) {
                        this.map.getView().fit(geo.getExtent(), {
                            duration: 1000,
                            maxZoom: 19,
                            padding: [40, 40, 40, 40,]
                        })
                    }

                }
            }
            this.searchResultDialog = false

        },

        async saveSelectFeature() {

            this.store.commit('setConfirmDialog', {
                massage: 'لطفا منبع دریافت اطلاعات را مشخص کنید',
                topic: 'توجه',
                active: true,
                accept: async () => {
                    this.store.commit(SurveyMutations.SET_LOAD_FROM_SDI, true)
                    if (this.selectedFeature) {
                        const props = this.selectedFeature.getProperties()
                        console.log(props['code'])
                        console.log(this.selectedFeature)

                        // if (this.selectedFeature){
                        //     setTimeout(()=>{
                        //         this.zoomToFeatures(this.map,[this.selectedFeature])
                        //     },3000)
                        // }

                        await this.store.commit(SurveyMutations.SET_ARSE_INFO, null)
                        if (this.process_id) {
                            await this.router.push({name: 'Arse', params: {code: props['code'], id: this.process_id}})
                        } else {
                            await this.router.push({name: 'Arse', params: {code: props['code']}})
                        }

                    } else {
                        this.toast.add({
                            group: 'br',
                            life: 4000,
                            severity: 'error',
                            summary: 'خطا',
                            detail: 'ملکی انتخاب نشده است'
                        });
                    }
                },
                reject: async () => {
                    this.store.commit(SurveyMutations.SET_LOAD_FROM_SDI, false)
                    if (this.selectedFeature) {
                        const props = this.selectedFeature.getProperties()
                        console.log(props['code'])

                        await this.store.commit(SurveyMutations.SET_ARSE_INFO, null)
                        if (this.process_id) {
                            await this.router.push({name: 'Arse', params: {code: props['code'], id: this.process_id}})
                        } else {
                            await this.router.push({name: 'Arse', params: {code: props['code']}})
                        }
                    } else {
                        this.toast.add({
                            group: 'br',
                            life: 4000,
                            severity: 'error',
                            summary: 'خطا',
                            detail: 'ملکی انتخاب نشده است'
                        });
                    }
                },
                noBtn: {
                    color: 'info',
                    text: 'انتقال از شهرنگار'
                },
                yesBtn: {
                    color: 'info',
                    text: 'انتقال از Sdi'
                }

            })

        }

    },


    async mounted(): void {
        console.log(this.fullScreen, 'active fullScreen')

        if ('id' in this.route.params && this.route.params.id) {
            this.process_id = parseInt(String(this.route.params.id))
            if (this.process_id) {

                const res = await this.getProcessItem(this.process_id)
                if (res) {
                    this.zoomToFeatures(this.map,[this.processItemValue.feature],[100,100,100,100])
                }

            }
        }

        this.map.getAllLayers().filter((layer: any) => {
            if (layer.get('name') && layer.get('name') === 'ownLayer')
                this.ownSource = layer.getSource()
        })


        this.store.getters.getSurveyLayers.map(async (item: SurveyLayers) => {
            if (item.name === 'ملک') {
                const layersId = this.showLayers.map((i) => {
                    return i.id
                })
                layersId.push(item.layer.id)
                await this.store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, layersId)
                await this.store.commit(OpenLayerMutations.SET_SUB_ACTIVE_LAYER, item.layer)
            }

        })

        this.store.commit(SurveyMutations.SET_MAP_DISABLE, true)

        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME, 'انتخاب ملک از نقشه')

        this.toolbarClick(this.toolbarItems[4])

        this.toast.add({
            group: 'tr',
            life: 7000,
            severity: 'warn',
            summary: 'توجه',
            detail: 'برای انتخاب ملک مورد نظر ، روی نقشه کلیک کنید'
        })
    },

    computed: {
        winSize() {
            return window.innerWidth
        }
    },


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-list-item--density-compact.v-list-item--one-line {
    min-height: 33px !important;
}
</style>
