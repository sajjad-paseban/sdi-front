<template>
    <v-locale-provider rtl>
        <v-fade-transition mode="out-in">
            <Loader v-if="loading"></Loader>
        </v-fade-transition>
        <template v-if="isLogin">
            <div style="height: 100dvh;width:100dvw;">
                <v-row style="height:35px;width:100%;"
                       class="rounded-b pa-0 ma-0 px-3 bg-light-blue-darken-4 elevation-3"
                       align="center">

                    <v-btn
                            :disabled="route.name=='selectMap'"
                            variant="flat"
                            size="x-small"
                            color="white"
                            class=""
                            @click="drawer=true"
                            style="font-weight: bold !important;width: 30px;height: 25px"
                            v-tooltip.right="'منو فرم ها'"
                    >
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/menu.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>
                    </v-btn>
                    <div>
                        <v-row class="ma-0 pa-0 px-6" align="center">
                            <p class="font-weight-bold" style="font-size:15px;font-family: 'Roboto';color:#ffffffcc">
                                GeoNik </p>
                            &nbsp &nbsp
                            <p class=" mt-n1" style="font-size:18px;font-family: SOGAND">مـمیـزی </p>
                        </v-row>

                    </div>
                    <v-spacer></v-spacer>

                    <v-btn
                            :disabled="store.getters.getMapDisable"
                            variant="flat"
                            size="x-small"
                            color="white"
                            class=""
                            @click="show3DMap"
                            style="font-weight: bold !important;width: 30px;height: 25px"
                            v-tooltip.right="'نمایش نقشه 3D'"
                    >
                        <v-avatar size="25" class="">
                            <!-- <v-img
                                    class=""
                                    src="@/assets/icons/3D.png"
                                    alt="John"
                            ></v-img> -->
                        </v-avatar>

                    </v-btn>

                    <v-btn
                            :disabled="store.getters.getMapDisable"
                            variant="flat"
                            size="x-small"
                            color="white"
                            class="mr-1"
                            @click="maxMap()"
                            style="font-weight: bold !important;width: 30px;height: 25px"
                            v-tooltip.right="'نمایش نقشه'"
                    >
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/baseMap.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>

                    </v-btn>
                    <v-btn
                            :disabled="store.getters.getMapDisable"
                            variant="flat"
                            size="x-small"
                            color="white"
                            class="mx-1"
                            @click="minMap()"
                            style="font-weight: bold !important;width: 30px;height: 25px"
                            v-tooltip.right="'نمایش فرم'"
                    >
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/fullscreen.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>

                    </v-btn>
                    <v-btn
                            :disabled="store.getters.getMapDisable"
                            variant="flat"
                            size="x-small"
                            color="white"
                            class=""
                            @click="middleMap()"
                            style="font-weight: bold !important;width: 30px;height: 25px"
                            v-tooltip.right="'نمایش نقشه و فرم'"
                    >
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/middlePage.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>

                    </v-btn>

                </v-row>

                <div dir="ltr" class="" style=" height: calc(100% - 60px);">

                    <Splitter :layout="mobile?'vertical':'horizontal'" style="height: 100%"
                              class="ma-0 pa-0 rounded-lg elevation-3">
                        <template v-if="true">
                            <SplitterPanel
                                    id="map_container"
                                    class=""
                                    dir="ltr"
                                    :size="map_size">

                                <div style="height:100%;width: 100%;" dir="ltr" class="bg-grey-lighten-3">
                                    <Splitter :style="map_size==0?'width:0':''"
                                              :layout="!mobile?(map_size!==100?'vertical':'horizontal'):'vertical'"
                                              style="height: 100%;min-width: 0!important;"
                                              class="ma-0 pa-0 rounded-lg elevation-3">
                                        <SplitterPanel

                                                class=""
                                                id="map_2d"

                                                dir="rtl"
                                                :size="map_2d_size">

                                            <div style="height:100%;width: 100%;" dir="rtl" class="bg-grey-lighten-3">


                                                <View v-if="getMapInitData" :page="false" :full-screen="true">
                                                </View>
                                            </div>

                                        </SplitterPanel>
                                        <SplitterPanel

                                                class=""
                                                id="map_3d"

                                                dir="rtl"
                                                :size="map_3d_size">

                                            <div v-if="show3D" style="height:100%;width: 100%;" dir="ltr"
                                                 class="bg-grey-lighten-3">
                                                <iframe style="width:100%;height:100%"
                                                        :src="getDialogLink('3D')"></iframe>
                                            </div>

                                        </SplitterPanel>
                                    </Splitter>
                                    <!--                                    <View v-if="getMapInitData" :page="false" :full-screen="true">-->
                                    <!--                                    </View>-->
                                </div>

                            </SplitterPanel>
                            <SplitterPanel
                                    dir="ltr"
                                    class=""
                                    id="formPanel"
                                    style="overflow-y: auto !important;"
                                    :size="form_size"
                            >
                                <div style="height:100%;width: 100%;position: relative" dir="rtl"
                                     class="bg-grey-lighten-3">
                                    <v-row v-if="store.getters.getSurveyLayers.length===0" class="pa-0 ma-0 "
                                           align="center" style="height: 100%" justify="center">
                                        <v-fade-transition>
                                            <v-progress-circular
                                                    :size="50"
                                                    color="primary"
                                                    indeterminate
                                            ></v-progress-circular>
                                        </v-fade-transition>
                                    </v-row>
                                    <template v-else>
                                        <router-view :formSize="form_size" :mobile="mobile"
                                                     v-if="sub_map&&getMapInitData" :map="sub_map"
                                                     name="form"></router-view>
                                    </template>


                                </div>

                            </SplitterPanel>
                        </template>


                    </Splitter>
                </div>

                <!--taskbar-->
                <v-row :style="$vuetify.display.smAndDown?'font-size:9px':'font-size:11px'"
                       class="pa-0 ma-0 rounded-t bg-blue-lighten-4 border-t px-3 elevation-3"
                       style="height: 25px;padding-top: 2px!important;"
                       align="center" justify="start">
                    <div class="rounded bg-white elevation-3 mt-n1 px-2 font-weight-bold"
                         style="height:18px;display: flex;justify-content: center;flex-direction: column-reverse;">
                        <template v-if="store.getters.getTaskBarInfo.panelName">
                            {{ store.getters.getTaskBarInfo.panelName }}
                        </template>
                        <template v-else>
                            نامشحص
                        </template>

                    </div>

                    <div class="rounded bg-white elevation-3 mt-n1 px-2 font-weight-bold mx-1"
                         style="height:18px;display: flex;justify-content: center;flex-direction: column-reverse;">
                        <v-row class="ma-0 pa-0 " align="center" style="height: 90%">
                            <template v-if="store.getters.getTaskBarInfo.code">
                                <p>
                                    {{
                                        changeCodeDisplay(store.getters.getTaskBarInfo.code.code, store.getters.getTaskBarInfo.code.name)
                                    }}

                                </p>
                            </template>
                            <template v-else>
                                بدون کد
                            </template>
                        </v-row>
                    </div>
                    <div class="" v-if="store.getters.getArseInfo"
                         style="height:18px;display: flex;justify-content: center;flex-direction: column-reverse;">
                        <v-btn @click="showArseStatusDialog = !showArseStatusDialog" color="info" light
                               class="rounded  mt-n1  "
                                style="height:18px;"
                               :style="$vuetify.display.smAndDown?'font-size:9px':'font-size:11px'">وضعیت برداشت
                        </v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <div v-show="store.getters.getTaskBarInfo.features.length>0">

                        <v-btn @click="showFeatureDialog = !showFeatureDialog" color="info" light
                               class="rounded elevation-3 mt-n1 text-black "
                               append-icon="mdi-vector-polygon" style="height:18px;"
                               :style="$vuetify.display.smAndDown?'font-size:9px':'font-size:11px'">عارضه های عرصه
                        </v-btn>

                        <div v-show="showFeatureDialog" class="rounded bg-white elevation-7 pa-2 pl-4 pr-0"
                             style="height:max-content;width:max-content;min-width:140px;overflow-y: auto;overflow-x: auto;position: absolute;left:10px;bottom:27px;z-index: 10003">
                            <v-fade-transition v-for="item in taskbar_features" :key="item.id">
                                <Tree1
                                        :key-object="'id'"
                                        :item="item"
                                        class="pr-2"
                                        :activeCheckBox="true"
                                        @checkBoxChange="changeShowLayers"
                                        :label="'name'"
                                        dir="rtl"
                                >
                                </Tree1>
                            </v-fade-transition>
                        </div>

                    </div>


                </v-row>
                <!--taskbar-->

                <v-navigation-drawer
                        v-model="drawer"
                        location="right"
                        class="rounded-lg"
                        style="z-index: 10001"
                        temporary
                >
                    <Sidebar :activeItem="'Arse'"></Sidebar>
                </v-navigation-drawer>

                <simple-dialog
                        :show="mainDialog.show"
                        :topic="String(mainDialog.title)"
                        :init-full="true"
                        width="50vw"
                        height="90vh"
                        :current_height="'80vh'"
                        @closeDialog="mainDialog.show=false"
                        class="bg-grey-lighten-2"
                >
                    <div style="height: 100%;width:100%;overflow-y: hidden" v-if="mainDialog.component">
                        <iframe style="width:100%;height:100%" :src="getDialogLink(mainDialog.component)"></iframe>

                    </div>

                </simple-dialog>

                <simple-dialog
                        :show="showArseStatusDialog"
                        :topic="'فرم وضعیت برداشت'"

                        width="50dvw"
                        height="80dvh"
                        :current_height="'80dvh'"
                        @closeDialog="showArseStatusDialog=false"
                        class="bg-grey-lighten-2"
                >
                    <ArseStatus @close="showArseStatusDialog=false"></ArseStatus>
                </simple-dialog>

            </div>
        </template>

    </v-locale-provider>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, Ref} from "vue";
import View from "@/map_modules/mainPage/view.vue";
import {useStore} from "vuex";
import {UserActions} from "@/store/user/actions";

import {useToast} from "primevue/usetoast";
import {OpenLayerAction} from "@/store/openLayer/actions";
import {openLayer} from "@/store/openLayer";
import {OpenLayerMutations} from "@/store/openLayer/mutations";
import baseMap from "@/componentFunctions/baseMap_functions";
import JWTs from "@/componentFunctions/jwt_functions";
import {useRoute, useRouter} from "vue-router";
import {UserMutations} from "@/store/user/mutations";
import Loader from "@/components/common/loader.vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import DrawFeature from '@/map_modules/survey/components/mapComponents/drawFeature.vue'
import Sidebar from '@/map_modules/survey/components/Sidebar.vue'
import {SurveyAction} from "@/store/survey/actions";
import {SurveyMutations} from "@/store/survey/mutations";
import Logo from "@/map_modules/mainPage/logo.vue";
import Clock from "@/map_modules/mainPage/Clock.vue";
import survey_functions from "@/componentFunctions/survey_functions";
import {MainDialog, TaskbarInfoFeatures, UpdateShowTree} from "@/store/survey/types";
import Tree1 from "@/components/common/tree.vue";
import Feature from "ol/Feature.js";
import BuildingExtraInfo from "@/map_modules/survey/components/building/BuildingExtraInfo.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {Arse} from "@/models/Survey.interface";
import {getCenter} from 'ol/extent';
import Geometry from "ol/geom/Geometry.js";
import ArseStatus from "@/map_modules/survey/components/ArseStatus.vue";

// Components

export default defineComponent({
    name: "SurveyComponent",

    components: {SimpleDialog, BuildingExtraInfo, Tree1, Clock, Logo, Loader, Splitter, SplitterPanel, View, Sidebar,ArseStatus},

    setup() {
        const store = useStore();
        const toast = useToast()
        const isLogin = ref<boolean>(false)
        const getMapInitData = ref<boolean>(false)
        const {getUserInfo} = JWTs()
        const {getActiveBaseMap} = baseMap()
        const {changeCodeDisplay} = survey_functions()
        const router = useRouter()
        const route = useRoute()
        const showFeatureDialog = ref(false)

        const map_size = ref(40)
        const form_size = ref(60)
        const map_3d_size = ref(0)
        const map_2d_size = ref(100)
        const resizeable = ref(true)


        const map = computed(() => {
            return store.getters.getMap
        });
        const mapSizeInit = ref(false)
        const show3D = ref(true)

        const map_container = ref()

        const sub_map = computed(() => {
            return store.getters.getSubMap
        });

        //--------------------dialog--------//
        const mainDialog = ref<MainDialog>({show: false, title: '', component: null}) as Ref<MainDialog>
        //--------------------dialog--------//

        const getMapInfoInit = async () => {
            // await store.dispatch(OpenLayerAction.GET_LAYERS, toast)

            const activeBaseMap = await getActiveBaseMap()
            await store.commit(OpenLayerMutations.SET_SUB_BASE_MAP, activeBaseMap)
            await store.dispatch(OpenLayerAction.SET_INIT_FROM_LOCAL, toast)
            await store.dispatch(OpenLayerAction.SET_MAP_CONFIG, toast)
            await store.dispatch(SurveyAction.GET_USER_INFO_PANEL, toast)
        }

        function observeHeight() {
            const resizeObserver = new ResizeObserver((e: ResizeObserverEntry[]) => {
                if (sub_map.value) {
                    sub_map.value.updateSize();
                    mapSizeInit.value = true
                }
            });
            const element = document.getElementById('map_container')
            if (element)
                resizeObserver.observe(element)
        }

        async function initSurveyRouterRoute() {
            await store.dispatch(SurveyAction.INIT_SURVEY, toast)
            taskbar_features.value = store.getters.getTaskBarInfo.features
            await store.commit(SurveyMutations.SET_ARSE_INFO, null)

        }

        function show3DMap() {
            if (!show3D.value) {
                document.getElementById('map_2d').style.transition = '1000ms'
                document.getElementById('map_3d').style.transition = '1000ms'
                setTimeout(() => {
                    document.getElementById('map_2d').style.flexBasis = 'calc(60% - 4px)'
                    document.getElementById('map_3d').style.flexBasis = 'calc(40%)'
                    setTimeout(() => {
                        document.getElementById('map_2d').style.transition = ''
                        document.getElementById('map_3d').style.transition = ''
                    }, 1000)
                }, 100)

                map_3d_size.value = 40
                map_2d_size.value = 60
                show3D.value = true
            } else {
                document.getElementById('map_2d').style.transition = '1000ms'
                document.getElementById('map_3d').style.transition = '1000ms'
                setTimeout(() => {
                    document.getElementById('map_2d').style.flexBasis = 'calc(100% - 4px)'
                    document.getElementById('map_3d').style.flexBasis = 'calc(0%)'
                    setTimeout(() => {
                        document.getElementById('map_2d').style.transition = ''
                        document.getElementById('map_3d').style.transition = ''
                    }, 1000)
                }, 100)

                map_3d_size.value = 0
                map_2d_size.value = 100
                show3D.value = false
            }

        }

        function minMap() {
            // this.resizeable = !this.resizeable


            document.getElementById('formPanel').style.transition = '1000ms'
            document.getElementById('map_container').style.transition = '1000ms'
            setTimeout(() => {
                document.getElementById('formPanel').style.flexBasis = 'calc(100% - 4px)'
                document.getElementById('map_container').style.flexBasis = 'calc(0%)'
                setTimeout(() => {
                    document.getElementById('formPanel').style.transition = ''
                    document.getElementById('map_container').style.transition = ''
                }, 1000)
            }, 100)

            map_size.value = 0
            form_size.value = 100
        }

        function maxMap() {
            document.getElementById('formPanel').style.transition = '1000ms'
            document.getElementById('map_container').style.transition = '1000ms'
            setTimeout(() => {
                document.getElementById('formPanel').style.flexBasis = 'calc(0%)'
                document.getElementById('map_container').style.flexBasis = 'calc(100% - 4px)'
                setTimeout(() => {
                    document.getElementById('formPanel').style.transition = ''
                    document.getElementById('map_container').style.transition = ''
                }, 1000)
            }, 100)

            map_size.value = 100
            form_size.value = 0
        }

        function middleMap() {
            document.getElementById('formPanel').style.transition = '1000ms'
            document.getElementById('map_container').style.transition = '1000ms'
            setTimeout(() => {
                document.getElementById('formPanel').style.flexBasis = 'calc(60% - 4px)'
                document.getElementById('map_container').style.flexBasis = 'calc(40%)'
                setTimeout(() => {
                    document.getElementById('formPanel').style.transition = ''
                    document.getElementById('map_container').style.transition = ''
                }, 1000)
            }, 100)

            map_size.value = 40
            form_size.value = 60
        }

        const observer = new ResizeObserver(entries => {

            form_size.value = document.getElementById('formPanel').offsetHeight

        })

        function getDialogLink(model: string) {

            const arse: Arse = store.getters.getArseInfo
            if (model === '3D') {
              if (sub_map.value){
                const center =sub_map.value.getView().getCenter()
                const zoom = sub_map.value.getView().getZoom()
                return `http://5.160.232.203:3380/map/myNew3d/?x=${center[1]}&y=${center[0]}&zoom=17.4`
              }
            } else {
                if (arse.geometry) {
                    const geo: Geometry = arse.geometry.getGeometry()
                    const center = getCenter(geo.getExtent())
                    return `https://map-1.kashan.ir/map/myNew3d/panorama/${center[0]}/${center[1]}`
                } else {
                    return 'https://map-1.kashan.ir/map/myNew3d/panorama/'
                }
            }

            // 'http://5.160.232.203:3380/map/myNew3d/?x=33.98440126900316&y=51.40721471969488&zoom=17.67783985915527'
        }

        const taskbar_features = ref<TaskbarInfoFeatures[]>([])

        onMounted(async () => {
            isLogin.value = await store.dispatch(UserActions.CHECK_USER)

            if (isLogin.value) {
                await getMapInfoInit()
            }

            setTimeout(async () => {
                await observeHeight()
                await initSurveyRouterRoute()
                getMapInitData.value = true

            }, 200)

            observer.observe(document.getElementById('formPanel'))
            show3DMap()

        })

        watch(() => store.state.router_access_denied_alert, () => {

            if (store.state.router_access_denied_alert) {
                // alert('دسترسی ندارید')
                toast.add({group: 'br', life: 2000, severity: 'error', summary: ' خطا', detail: 'دسترسی ندارید'});

                store.commit('set_router_access_denied_alert', false)
            }

        })

        watch(() => store.getters.getMapDisable, (value: boolean) => {


            if (value) {
                minMap()
                resizeable.value = false

                if (route.name == 'selectMap') {
                    maxMap()
                    resizeable.value = false
                }

            } else {
                middleMap()
                resizeable.value = true

            }
        })

        watch(() => store.getters.getTaskBarInfo.features, (value: TaskbarInfoFeatures[]) => {
            taskbar_features.value = value
            console.log(value)
        })

        watch(() => store.getters.getMainDialog, (value: MainDialog) => {
            if (value && value.show) {
                mainDialog.value = value
            }
        })

        return {
            map_3d_size,
            map_2d_size,
            showFeatureDialog,
            observer,
            maxMap, minMap, middleMap,
            getDialogLink,
            mainDialog,
            taskbar_features,
            changeCodeDisplay,
            store,
            isLogin,
            getMapInitData,
            map,
            sub_map,
            map_container,
            mapSizeInit,
            route,
            map_size,
            form_size,
            resizeable,
            show3DMap, show3D,
        }
    },

    data() {
        return {
            loading: true,
            fullScreen: true,

            mobile: false,

            drawer: false,

            showArseStatusDialog:false,

        }
    },

    props: {
        page: {
            type: Boolean,
            default: false
        }
    },


    methods: {
        setMassage() {
            alert()
        },

        myEventHandler() {
            this.mobile = window.innerWidth < 600
            // this.mobile = false
        },

        getShowFeaturesFromFeaturesInTaskbar(showFeatures: Feature[], id: number, features: TaskbarInfoFeatures[]) {
            features.map((feature) => {
                if ('children' in feature) {
                    this.getShowFeaturesFromFeaturesInTaskbar(showFeatures, id, feature.children)
                } else {
                    if (feature.id === id) {

                        feature.feature.map((item) => {
                            const f = item.clone()
                            f.set('group', feature.group)
                            f.set('id', id)
                            showFeatures.push(f)
                        })


                    }
                }
            })
        },

        async changeShowLayers(data: { value: boolean; id: number }) {
            const features = this.store.getters.getTaskBarInfo.features
            const showFeatures: Feature[] = this.store.getters.getShowFeatures
            if (data.value) {
                let exist = false
                showFeatures.map((feature) => {
                    if (feature.get('id') && feature.get('id') === data.id) {
                        exist = true
                    }
                })
                if (!exist) {
                    this.getShowFeaturesFromFeaturesInTaskbar(showFeatures, data.id, features)
                    this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [...showFeatures])
                }


            } else {
                let findId = false
                do {
                    findId = false
                    showFeatures.map((item, index) => {
                        if (item.get('id') && item.get('id') === data.id) {
                            showFeatures.splice(index, 1)
                            findId = true
                            return
                        }
                    })
                } while (findId)


                this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [...showFeatures])
            }

        }


    },
    watch: {
        map() {
            if (!this.fullScreen && this.map) {
                setTimeout(() => {
                    this.loading = false
                }, 1000)
            }

        },

        sub_map() {
            if (this.fullScreen && this.sub_map) {
                setTimeout(() => {
                    this.loading = false
                }, 1000)
            }
        },


    },


    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    unmounted() {
        this.observer.disconnect()
        window.removeEventListener("resize", this.myEventHandler);
    },
    mounted(): void {
        this.myEventHandler()
    }


});
</script>


<style>
@import url('@/assets/main_style.css');

.p-splitter .p-splitter-gutter .p-splitter-gutter-handle {
    background: #0461be !important;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.p-splitter .p-splitter-gutter {
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
    background: #adadad !important;
}

.hideCheckboxDetails .v-input__details {
    display: none !important;

}
</style>
