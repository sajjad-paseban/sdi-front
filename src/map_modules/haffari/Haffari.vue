<template>
    <v-locale-provider rtl>
        <v-fade-transition mode="out-in">
            <Loader v-if="loading"></Loader>
        </v-fade-transition>
        <template v-if="isLogin&&getMapInitData">
            <v-row style="height:35px;width:100%;position: fixed;top:0;right:0;z-index: 10001"
                   class="rounded-b pa-0 ma-0 px-3 bg-haffari_app_bar elevation-3"
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
                        <p class=" mt-n1" style="font-size:18px;font-family: SOGAND">حفاری </p>
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


            <v-btn @click="router.push({name:'haffari'})" v-tooltip.left="'صفحه اصلی'" class="elevation-3"
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
                    <div :style="$vuetify.display.smAndDown?'bottom:20px':'bottom:50px'"
                         style="position: absolute;left:8px;z-index: 101;width: 140px;height: 32.5px"
                         class="bg-themeBars rounded-lg elevation-3 pt-2 text-center">
                        <layer-active-name></layer-active-name>
                    </div>
                    <info v-if="sub_map" :map="sub_map" :fullScreen="true"
                          :hide-reset-btn="false">
                        <template #extra="{feature}">

                            <v-btn @click="threeDClick" class="elevation-3 border" color="haffari_primary"
                                   size="small" density="comfortable" icon=""
                                   style="cursor: pointer;position: absolute;left:-10px;top:-10px">
                                <v-icon size="large" class="">mdi-video-3d</v-icon>
                            </v-btn>
                            <v-btn @click="router.push({name:'haffariArchiveList'})" class="elevation-3 border"
                                   color="haffari_primary"
                                   size="small" density="comfortable" icon=""
                                   style="cursor: pointer;position: absolute;left:22px;top:-10px">
                                <v-icon class="">mdi-camera</v-icon>
                            </v-btn>
                            <v-btn @click="router.push({name:'haffariInfo'})" class="elevation-3 border"
                                   color="haffari_primary"
                                   size="small" density="comfortable" icon=""
                                   style="cursor: pointer;position: absolute;left:55px;top:-10px">
                                <v-icon class="">mdi-information-variant</v-icon>
                            </v-btn>

                            <div style="height:13px"></div>
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
            <HSideBar></HSideBar>
            </v-navigation-drawer>


        </template>

    </v-locale-provider>


</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, onUpdated, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import Loader from "@/components/common/loader.vue";
import View from "@/map_modules/mainPage/view.vue";
import JWTs from "@/componentFunctions/jwt_functions";
import baseMap from "@/componentFunctions/baseMap_functions";
import {OpenLayerMutations} from "@/store/openLayer/mutations";
import {OpenLayerAction} from "@/store/openLayer/actions";
import {UserActions} from "@/store/user/actions";
import router from "@/router";
import info from "@/map_modules/info/Info.vue"
import LayerActiveName from "@/map_modules/mainPage/layerActiveName.vue";
import HSideBar from "@/map_modules/haffari/components/Sidebar.vue";


export default defineComponent({
    name: "HaffariComponent",


    components: {
        LayerActiveName,
        View, Loader, info,HSideBar
    },


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const route = useRoute()
        const isLogin = ref<boolean>(false)
        const getMapInitData = ref<boolean>(false)
        const {getUserInfo} = JWTs()
        const {getActiveBaseMap} = baseMap()

        const map = computed(() => {
            return store.getters.getMap
        });


        const sub_map = computed(() => {
            return store.getters.getSubMap
        });


        const getMapInfoInit = async () => {
            // await store.dispatch(OpenLayerAction.GET_LAYERS, toast)

            const activeBaseMap = await getActiveBaseMap()
            await store.commit(OpenLayerMutations.SET_SUB_BASE_MAP, activeBaseMap)
            await store.dispatch(OpenLayerAction.SET_INIT_FROM_LOCAL, toast)
            await store.dispatch(OpenLayerAction.SET_MAP_CONFIG, toast)


            getMapInitData.value = true

        }


        onMounted(async () => {
            isLogin.value = await store.dispatch(UserActions.CHECK_USER)
            if (isLogin.value) {

                await getMapInfoInit()

            }


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
            router,

        }
    },


    data() {
        return {
            loading: true,
            //----for sideBar---//
            drawer: false,
            //----for sideBar---//

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
        threeDClick() {
            window.open("http://5.160.232.203:3380/map/myNew3d/");
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


</style>
