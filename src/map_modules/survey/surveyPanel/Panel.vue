<template>
    <v-locale-provider rtl>
        <v-fade-transition mode="out-in">
            <Loader v-if="loading"></Loader>
        </v-fade-transition>
        <template v-if="isLogin&&getMapInitData">
          <v-row style="height:35px;width:100%;position: fixed;top:0;right:0;z-index: 10001"
                 class="rounded-b pa-0 ma-0 px-3 bg-light-blue-darken-4 elevation-3"
                 align="center">
            <v-btn

                variant="flat"
                size="x-small"
                color="white"
                class="mr-2"
                @click="drawer=true"
                style="font-weight: bold !important;width: 30px;height: 25px"
                v-tooltip.right="'منو تنظیمات'"
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
            <v-spacer/>
            <v-avatar size="30" class="">
              <v-img
                  class=""
                  src="@/assets/cImages/logo.png"
                  alt="John"
              ></v-img>
            </v-avatar>
          </v-row>

            <div v-if="route.name == 'surveyPanel'&&panelUser"
                 style="position: absolute;top:50px;right:20px;z-index: 1001;display: flex;flex-direction: column;">
                <v-scale-transition>
                    <v-btn v-if="btn1&&panelUser.user_type == PanelUserType.Manager"
                           @click="router.push({name:'allUsersList'})" v-tooltip.left="'داشبورد مدیریتی'"
                           class="elevation-3 my-1"
                           style="" icon size="small">
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/dashboard.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>
                    </v-btn>
                </v-scale-transition>
                <v-scale-transition>
                    <v-btn v-if="btn1&&panelUser.user_type == PanelUserType.Survey"
                           @click="router.push({name:'allUserExtentsList',params:{id:panelUser.id,name:`${panelUser.info.first_name} ${panelUser.info.last_name}`}})"
                           v-tooltip.left="'داشبورد ممیزکار'"
                           class="elevation-3 my-1"
                           style="" icon size="small">
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/dashboard.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>
                    </v-btn>
                </v-scale-transition>
                <v-scale-transition>
                    <v-btn v-if="btn1&&panelUser.user_type == PanelUserType.Checker"
                           @click="router.push({name:'allCheckerExtentsList',params:{id:panelUser.id,name:`${panelUser.info.first_name} ${panelUser.info.last_name}`}})"
                           v-tooltip.left="'داشبورد کنترلر'"
                           class="elevation-3 my-1"
                           style="" icon size="small">
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/dashboard.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>
                    </v-btn>
                </v-scale-transition>
                <v-scale-transition>
                    <v-btn v-if="btn2&&panelUser.user_type == PanelUserType.Manager"
                           @click="router.push({name:'surveyProcessList'})"
                           v-tooltip.left="'مدیریت محدوده های ممیزی'"
                           class="elevation-3 my-2"
                           style="" icon size="small">
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/baseMap.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>
                    </v-btn>
                </v-scale-transition>

                <v-scale-transition>
                    <v-btn v-if="btn3&&panelUser.user_type == PanelUserType.Manager"
                           @click="router.push({name:'userConfig'})" v-tooltip.left="'تنظیمات کاربران'"
                           class="elevation-3 my-1"
                           style="" icon size="small">
                        <v-avatar size="25" class="">
                            <v-img
                                    class=""
                                    src="@/assets/icons/person.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>
                    </v-btn>
                </v-scale-transition>


            </div>


            <v-btn @click="router.push({name:'surveyPanel'})" v-tooltip.left="'پنل کاربری'" class="elevation-3"
                   style="position: absolute;right:22px;bottom:118px;z-index: 1001" icon size="small">
                <v-avatar size="25" class="">
                    <v-img
                            class=""
                            src="@/assets/icons/home.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>
            <div style="height:calc(100% - 35px);margin-top: 35px;">
                <View :page="false" :full-screen="true">
                    <info v-if="route.name == 'surveyPanel'&&sub_map" :map="sub_map" :fullScreen="true"
                          :hide-reset-btn="true">
                        <template #extra="{feature}">
                            
                            <v-menu :location="'top'" offset="5px">
                                <template v-slot:activator="{ props }">

                                    <v-btn v-bind="props" class="elevation-3 border" color="info"
                                           size="small" density="comfortable" icon=""
                                           style="cursor: pointer;position: absolute;left:-7px;top:-7px">
                                        <v-icon class="">mdi-printer</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                            v-for="(item, index) in ['مشاهده','چاپ']"
                                            :key="index"
                                            :value="index"
                                    >
                                        <v-list-item-title @click="featureInfoDialog(feature,item)">{{
                                                item
                                            }}
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </info>
                </View>
            </div>
            <v-navigation-drawer
                    v-model="drawer"
                    location="right"
                    class="rounded-lg"
                    style="z-index: 10000001;height:calc(100% - 38px);top:38px"
                    temporary
            >
                <Sidebar/>
            </v-navigation-drawer>


            <v-main v-show="false" class="border elevation-2 rounded-lg"
                    style="width: 400px;height:400px;;text-align: right!important;">

                <Editor
                        api-key="no-api-key"
                        :init="init"
                        style=""
                        v-model="editorData"
                >

                </Editor>


            </v-main>

        </template>

    </v-locale-provider>


</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, onUpdated, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import Api from "@/api/survey/routes";
import {CodingTableRecord, SurveyLayers} from "@/store/survey/types";
import Loader from "@/components/common/loader.vue";
import View from "@/map_modules/mainPage/view.vue";
import JWTs from "@/componentFunctions/jwt_functions";
import baseMap from "@/componentFunctions/baseMap_functions";
import {OpenLayerMutations} from "@/store/openLayer/mutations";
import {OpenLayerAction} from "@/store/openLayer/actions";
import {UserActions} from "@/store/user/actions";
import Appbar from "@/map_modules/mainPage/appbar.vue";
import Sidebar from "@/map_modules/survey/surveyPanel/Sidebar.vue";
import {SurveyAction} from "@/store/survey/actions";
import router from "@/router";
import info from "@/map_modules/info/Info.vue"
import Feature from "ol/Feature";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import {StoreActions} from "@/store";
import {PanelUser, PanelUserType} from "@/models/SurveyPanel.interface";


export default defineComponent({
    name: "PanelComponent",
    computed: {
        PanelUserType() {
            return PanelUserType
        }
    },

    components: {
        Appbar, View, Loader, info, Editor,
        Sidebar
    },


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const route = useRoute()
        const isLogin = ref<boolean>(false)
        const getMapInitData = ref<boolean>(false)
        const {getUserInfo} = JWTs()
        const {getActiveBaseMap} = baseMap()
        const router = useRouter()
        const btn1 = ref(false)
        const btn2 = ref(false)
        const btn3 = ref(false)
        const map = computed(() => {
            return store.getters.getMap
        });
        const {get_arse_preview} = survey_panel_functions()

        const sub_map = computed(() => {
            return store.getters.getSubMap
        });

        const panelUser = computed(() => {
            return store.getters.getPanelUser
        }) as Ref<PanelUser>
        const getMapInfoInit = async () => {
            // await store.dispatch(OpenLayerAction.GET_LAYERS, toast)

            const activeBaseMap = await getActiveBaseMap()
            await store.commit(OpenLayerMutations.SET_SUB_BASE_MAP, activeBaseMap)
            await store.dispatch(OpenLayerAction.SET_INIT_FROM_LOCAL, toast)
            await store.dispatch(OpenLayerAction.SET_MAP_CONFIG, toast)


            getMapInitData.value = true

        }

        function showBtn(value: string) {
            if (value == 'surveyPanel') {
                setTimeout(() => {
                    btn1.value = true
                }, 500)
                setTimeout(() => {
                    btn2.value = true
                }, 1000)
                setTimeout(() => {
                    btn3.value = true
                }, 1500)
            } else {
                btn1.value = false
                btn2.value = false
                btn3.value = false
            }
        }


        onMounted(async () => {
            isLogin.value = await store.dispatch(UserActions.CHECK_USER)
            if (isLogin.value) {
                await store.dispatch(SurveyAction.GET_USER_INFO_PANEL, toast)
                await getMapInfoInit()
                await store.dispatch(SurveyAction.INIT_SURVEY, toast)
                store.getters.getSurveyLayers.map(async (item: SurveyLayers) => {
                    if (item.name === 'ملک') {
                        const layersId = []
                        layersId.push(item.layer.id)
                        await store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, layersId)
                        await store.commit(OpenLayerMutations.SET_ACTIVE_LAYER, item.layer)
                    }
                })
                showBtn('surveyPanel')
            }


        })

        onUpdated(() => {
            if (route.name == 'surveyPanel') {
                store.getters.getSurveyLayers.map(async (item: SurveyLayers) => {
                    if (item.name === 'ملک') {
                        const layersId = []
                        layersId.push(item.layer.id)
                        await store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, layersId)
                    }
                })
            }
        })

        watch(() => route.name, (value) => {
            if (value && typeof value == "string")
                showBtn(value)
        })

        watch(() => store.state.router_access_denied_alert, () => {

            if (store.state.router_access_denied_alert) {
                // alert('دسترسی ندارید')
                toast.add({group: 'br', life: 2000, severity: 'error', summary: ' خطا', detail: 'دسترسی ندارید'});

                store.commit('set_router_access_denied_alert', false)
            }

        })

        return {
            store,
            isLogin,
            getMapInitData,
            map,
            sub_map,
            toast,
            route,
            get_arse_preview,
            router,
            btn1,
            btn2,
            btn3,
            panelUser,
            showBtn
        }
    },

    async mounted() {
        const codingResponse = await Api.getSurveyCoding<CodingTableRecord[]>(this.toast)
        if (codingResponse.result) {
            this.store.commit(SurveyMutations.SET_CODING_TABLE, codingResponse.result)
        }


    },

    data() {
        return {
            loading: true,
            //----for sideBar---//
            drawer: false,
            //----for sideBar---//

            init: {
                selector: 'textarea#open-source-plugins',
                plugins: 'export preview',

                menubar: 'file edit view insert format tools table help',

                toolbar: "preview",
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                image_advtab: true,
                link_list: [],
                image_list: [],
                image_class_list: [],
                min_height: 400,
                max_height: 400,
                directionality: 'ltr',
                resize: false,
                importcss_append: true,
                file_picker_callback: (callback, value, meta) => {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === 'file') {
                        callback('https://www.google.com/logos/google.jpg', {text: 'My text'});
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === 'image') {
                        callback('https://www.google.com/logos/google.jpg', {alt: 'My alt text'});
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === 'media') {
                        callback('movie.mp4', {source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg'});
                    }
                },

                Template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                Template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',

                image_caption: true,

                noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link image table',
                content_style: 'body { font-family:Tahoma; font-size:16px }',
                language: 'fa',


            },
            editorData: ''
        }
    },
    props: {
        fullScreen: {
            type: Boolean,
            default: true
        },
        page: {
            type: Boolean,
            default: false
        }
    },


    methods: {

        async featureInfoDialog(feature: Feature, item_type: string) {
            if ('code' in feature.getProperties() && feature.getProperties()['code']) {
                await this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
                const code: string = feature.getProperties()['code']
                const res = await this.get_arse_preview(code)
                if (res) {
                    this.editorData = res
                    if (item_type == 'مشاهده') {
                        setTimeout(() => {
                            tinymce.activeEditor?.execCommand('mcePreview')
                        }, 100)
                    } else {
                        setTimeout(() => {
                            tinymce.activeEditor?.execCommand('mcePrint')
                        }, 100)
                    }
                }
                await this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
            } else {
                this.toast.add({
                    group: 'br',
                    life: 2000,
                    severity: 'error',
                    summary: ' خطا در عملیات',
                    detail: 'عارضه انتخابی کد ندارد'
                });
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
                }, 500)
            }
        }
    },


});
</script>


<style>
.tox .tox-dialog--width-lg {
    height: 80dvh !important;
    width: 80dvw !important;
}

.tox .tox-dialog-wrap__backdrop {
    background-color: rgb(0 0 0 / 51%) !important;
}

@media only screen and (max-width: 700px) {
    .tox .tox-dialog--width-lg {
        top: 10dvh !important;
        height: 80dvh !important;
        width: 80dvw !important;
    }
}

</style>
