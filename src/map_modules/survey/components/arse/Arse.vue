<template>

    <div style="height:100%;width:100%;" class="pa-2 ">
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
            <v-row class="ma-0 pa-0 elevation-3 rounded-lg border " style="height:100%;position: relative">

                <v-stepper v-if="initData" v-model="step" show-actions class="rounded-lg bg-grey-lighten-2" alt-labels
                           style="width: 100%;height: 100%"
                           non-linear :mobile="mobile">
                    <template v-slot:default="{ prev, next }" style="">
                        <v-stepper-header class="bg-white">
                            <v-stepper-item :color="step===1?'info':''" class="font-weight-bold" editable :value="1"
                                            title="عرصه">
                                <template v-slot:icon>
                                    <v-icon>mdi-home</v-icon>
                                </template>
                            </v-stepper-item>

                            <v-divider></v-divider>

                            <v-stepper-item :color="step===2?'info':''" class="font-weight-bold" editable :value="2"
                                            title="اضلاع">
                                <template v-slot:icon>
                                    <v-icon>mdi-wall</v-icon>
                                </template>

                            </v-stepper-item>

                            <v-divider></v-divider>

                            <v-stepper-item :color="step===3?'info':''" class="font-weight-bold" editable :value="3"
                                            title="اطلاعات تکمیلی">
                                <template v-slot:icon>
                                    <v-icon>mdi-book-outline</v-icon>
                                </template>

                            </v-stepper-item>

                            <v-divider></v-divider>

                            <v-stepper-item :color="step===4?'info':''" class="font-weight-bold" editable :value="4"
                                            title="آدرس ملک">
                                <template v-slot:icon>
                                    <v-icon>mdi-map-marker</v-icon>
                                </template>

                            </v-stepper-item>

                            <v-divider></v-divider>

                            <v-stepper-item :color="step===5?'info':''" class="font-weight-bold" :value="5"
                                            title="ثبت نهایی">
                                <template v-slot:icon>
                                    <v-icon>mdi-content-save</v-icon>
                                </template>
                            </v-stepper-item>
                        </v-stepper-header>

                        <v-img src="@/assets/cImages/1.jpg" style=";width: 100%"
                               :style="mobile?`height:calc(${formSize}px - 65px)`:'height:calc(100dvh - 135px)'" cover>

                            <v-stepper-window :touch="false" v-if="arse">
                                <v-stepper-window-item :value="1">
                                    <div style="height:100%!important;width: 100%!important" class="">
                                        <ArseInfo v-if="step==1" :arse-layer-id="arseLayerId" ref="arseInfoRef"
                                                  :arse="arse" :process_feature="process_feature?process_feature:undefined"
                                                  :process_id="process_id?process_id:undefined"
                                                  @drawn-feature="drawnFeature"
                                                  :feature="featureObject" :map="map"></ArseInfo>
                                    </div>
                                </v-stepper-window-item>
                                <v-stepper-window-item :value="2">
                                    <div style="height:100%!important;width: 100%!important"
                                         v-if="featureObject&&step==2">
                                        <SidesInfo ref="sidesInfoRef" :arse-info-list="arseInfoList" :arse="arse"
                                        ></SidesInfo>
                                    </div>
                                </v-stepper-window-item>
                                <v-stepper-window-item :value="3">
                                    <div style="height:100%!important;width: 100%!important" v-if="arse&&step==3">
                                        <ArseExtraInfo ref="arseExtraInfoRef" :arse="arse" :map="map"></ArseExtraInfo>
                                    </div>
                                </v-stepper-window-item>
                                <v-stepper-window-item :value="4">
                                    <div style="height:100%!important;width: 100%!important" v-if="arse&&step==4">
                                        <ArseBaseInfoComponent ref="arseBaseInfoRef"
                                                               :arse="arse"></ArseBaseInfoComponent>
                                    </div>
                                </v-stepper-window-item>
                                <v-stepper-window-item :value="5">
                                    <div style="height:100%!important;width: 100%!important">
                                        <SaveArse ref="saveArseRef" :arse="arse" :map="map"></SaveArse>
                                    </div>
                                </v-stepper-window-item>

                            </v-stepper-window>


                            <v-row class="ma-0 pa-0 px-2" justify="space-between">
                                <v-btn :disabled="step===1" color="info" class="font-weight-bold"
                                       style="font-size: 10px"
                                       @click="prev" size="small"
                                       prepend-icon="mdi-chevron-right"> مرحله قبل
                                </v-btn>
                                <v-btn :disabled="featureObject===null" v-if="step!==5" color="info"
                                       class="font-weight-bold" style="font-size: 10px"
                                       @click="nextStepClick(next)" size="small"
                                       append-icon="mdi-chevron-left"> مرحله بعد
                                </v-btn>
                                <v-btn v-if="step===5" color="info" class="font-weight-bold" style="font-size: 10px"
                                       @click="nextStepClick(next)" size="small"
                                       append-icon="mdi-office-building">اطلاعات ساختمان
                                </v-btn>
                            </v-row>
                        </v-img>
                    </template>
                </v-stepper>
            </v-row>
        </v-fade-transition>


    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import Geolocation from 'ol/Geolocation';
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import survey_functions from "@/componentFunctions/survey_functions";
import Feature from 'ol/Feature.js';
import {OpenLayerAction} from "@/store/openLayer/actions";
import {useRoute, useRouter} from "vue-router";
import source_functions from "@/components/openLayers/componentFunctions/source";
import ArseInfo from "@/map_modules/survey/components/arse/ArseInfo.vue";
import SaveArse from "@/map_modules/survey/components/arse/SaveArse.vue";
import SidesInfo from "@/map_modules/survey/components/arse/sidesInfo/SidesInfo.vue";
import ArseExtraInfo from "@/map_modules/survey/components/arse/ArseExtraInfo.vue";
import router from "@/router";
import {SurveyMutations} from "@/store/survey/mutations";
import {SurveyLayers} from "@/store/survey/types";
import {Arse, District} from "@/models/Survey.interface";
import {ArseRef, SideInfoRef} from "@/map_modules/survey/components/arse/AresRef";
import {SurveyAction} from "@/store/survey/actions";
import ArseBaseInfoComponent from "@/map_modules/survey/components/arse/ArseBaseInfo.vue";
import {Coordinate} from "ol/coordinate";
import {getAccessInterface} from "@/api/survey/SD.Models/getAccess.sd";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";


export default defineComponent({
    name: "ArseComponent",

    components: {ArseBaseInfoComponent, ArseInfo, SaveArse, SidesInfo, ArseExtraInfo},


    props: {
        map: {
            required: true,
            type: map
        },
        formSize: {
            required: false,
            type: Number
        },


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const code = ref<string>('')
        const featureObject = ref<(Feature | null)>(null)
        const overlay = ref(true)
        const arseExtraInfoRef = ref<ArseRef>()
        const arseInfoRef = ref<ArseRef>()
        const saveArseRef = ref<ArseRef>()
        const sidesInfoRef = ref<SideInfoRef>()
        const arseBaseInfoRef = ref<ArseRef>()

        const arseInfoList = ref<District[]>([])

        const {
            getBolockFeature,
            getArseFeatureInfo,
            arseInfoListData,
            getArse,
            getArseInfo,
            getArseFromExternal
        } = survey_functions()
        const {featureToJson,zoomToFeatures} = source_functions()
        const {getSurveyAccess} = survey_functions()
        const {getProcessItem,processItemValue} = survey_panel_functions()


        return {
            getSurveyAccess,
            arseBaseInfoRef,
            getArseFromExternal,
            route,
            store,
            toast,
            router,
            zoomToFeatures,
            getArseFeatureInfo,
            arseInfoList,
            arseInfoListData,
            overlay,
            featureObject,
            featureToJson,
            arseInfoRef,
            sidesInfoRef,
            arseExtraInfoRef,
            saveArseRef,
            getArse, getArseInfo,
            code,getProcessItem,processItemValue
        }
    },

    data() {
        return {
            step: 1,
            mobile: false,

            initData: false,
            arseLayerId: 0,

            arse: {
                area: 0,
                code_location: 1,
                code_physical_natures: 1,
                explanation: null
            } as Arse | null,

            geolocation: null as Geolocation | null,
            locations: undefined as Coordinate | undefined,
            arse_access:null as boolean|null,
            process_id:null as null|number,
            process_feature:null as null|Feature
        }
    },
    methods: {
        async showLayersSet() {
            const layersId = []
            this.store.getters.getSurveyLayers.map((item: SurveyLayers) => {
                if (item.name === 'ملک' && this.arse) {
                    this.arseLayerId = item.layer.id
                }
                if (item.name === 'بلوک' || item.name === 'معبر') {
                    layersId.push(item.layer.id)
                }

            })
            await this.store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, layersId)
        },

        myEventHandler() {
            this.mobile = window.innerWidth < 600
        },
        async drawnFeature(value: Feature | null) {
            if (value) {
                this.featureObject = value
                const data: any = this.featureToJson(value, true)
                await this.getArseFeatureInfo({geoJson: data})
                this.arseInfoList = this.arseInfoListData
                await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [value])
                await router.push({name: 'showArseFeature'})

            }

        },

        async nextStepClick(next: any) {
            let resultError: string | null = 'خطا'
            if (this.arseInfoRef && this.step == 1) {
                const res = await this.arseInfoRef.nextPageFunc()
                console.log(res)
                if (!res.error) {
                    this.arse = res.result
                    await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, this.arse)
                    if (this.arse && this.arse.code) {
                        await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_CODE, {
                            name: 'arse',
                            code: this.arse.code
                        })
                    }
                    await this.store.commit(SurveyMutations.SET_ARSE_INFO, this.arse)
                    next()
                    return
                } else {
                    resultError = res.error
                }
            }

            if (this.sidesInfoRef && this.step == 2) {
                const res = await this.sidesInfoRef.nextPageFunc()
                console.log(res)
                if (!res.error && this.arse && res.result) {
                    this.arse.districts = res.result
                    await this.store.commit(SurveyMutations.SET_ARSE_INFO, this.arse)
                    next()
                    return
                } else {
                    resultError = res.error
                }
            }

            if (this.arseExtraInfoRef && this.step == 3) {
                const res = await this.arseExtraInfoRef.nextPageFunc()
                console.log(res)
                if (!res.error) {
                    this.arse = res.result
                    await this.store.commit(SurveyMutations.SET_ARSE_INFO, this.arse)
                    next()
                    return
                } else {
                    resultError = res.error
                }
            }

            if (this.arseBaseInfoRef && this.step == 4) {
                const res = await this.arseBaseInfoRef.nextPageFunc()
                console.log(res)
                if (!res.error) {
                    this.arse = res.result
                    await this.store.commit(SurveyMutations.SET_ARSE_INFO, this.arse)
                    next()
                    return
                } else {
                    resultError = res.error
                }
            }

            if (this.saveArseRef && this.step == 5) {
                await this.saveArseRef.nextPageFunc()
                return
            }


            this.toast.add({
                group: 'br',
                life: 3000,
                severity: 'error',
                summary: ' خطا',
                detail: resultError
            });
        },

        async addMelkAccess() {
            if (this.locations && 'id' in this.route.params && this.route.params.id) {
                let mode = 'add'
                if ('code' in this.route.params && this.route.params.code && String(this.route.params.code) !== '0') {
                    mode = 'edit'
                }
                const process_id = parseInt(this.route.params.id)
                const data: getAccessInterface = {
                    long: String(this.locations[0]),
                    lat: String(this.locations[1]),
                    process_id: process_id,
                    mode: mode
                }
                this.arse_access = await this.getSurveyAccess(data)
            }

        },

        getLocation() {
            this.geolocation = new Geolocation({
                // enableHighAccuracy must be set to true to have the heading value.
                trackingOptions: {
                    enableHighAccuracy: true,
                },

            });

            this.geolocation.once('change:accuracyGeometry', async () => {
                if (this.geolocation) {
                    this.locations = this.geolocation.getPosition();
                    const res = await this.addMelkAccess()
                }
            });
            this.geolocation.setTracking(true)
            this.geolocation.once('error', function (error) {
                console.log(error.message,'location error')
            });

        }

    },
    watch:{
        arse_access(){
            if (this.arse_access){
                console.log('-------user has access----')
            }else {
                setTimeout(()=>{
                    window.close()
                },2000)
            }
        }
    },
    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    async mounted(): Promise<void> {
        this.getLocation()

        if ('id' in this.route.params && this.route.params.id){
            this.process_id = parseInt(String(this.route.params.id))
        }

        this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)
        console.log(this.store.getters.getMapDisable)
        await this.showLayersSet()
        this.myEventHandler()

        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME, 'عرصه')
        //--------------//
        if (!this.store.getters.getArseInfo) {


            if ('code' in this.route.params && this.route.params.code && String(this.route.params.code) !== '0') {
                this.code = String(this.route.params.code)
                let res = false
                if (this.store.getters.getLoadDataFromSdi) {
                    const data = this.process_id?[this.code,String(this.process_id)]:this.code
                    res = await this.getArse(data)
                } else {
                    const data = this.process_id?[this.code,String(this.process_id)]:this.code
                    res = await this.getArseFromExternal(data)
                }
                if (!res){
                    setTimeout(()=>{
                        window.close()
                    },3000)
                }
            }


            if (this.getArseInfo) {
                this.arse = this.getArseInfo
                if (this.getArseInfo.geometry) {
                    this.featureObject = this.getArseInfo.geometry
                    setTimeout(()=>{
                        this.zoomToFeatures(this.map,[this.featureObject])
                    },1000)
                }
                if (this.getArseInfo.districts) {
                    this.arseInfoList = this.getArseInfo.districts
                }


                await this.store.commit(SurveyMutations.SET_ARSE_INFO, this.getArseInfo)
                await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_CODE, {
                    name: 'arse',
                    code: this.getArseInfo.code
                })
                await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, this.getArseInfo)
            }else {

                if (this.process_id){

                    const res =await this.getProcessItem(this.process_id)
                    if (res){
                        this.process_feature = this.processItemValue.feature
                    }

                }
            }




        } else {
            this.arse = this.store.getters.getArseInfo
            if (this.arse.geometry) {
                this.featureObject = this.arse.geometry
            }
            if (this.arse.districts) {
                this.arseInfoList = this.arse.districts
            }
            await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
            await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, this.arse)
        }


        this.initData = true
        //-------------//

    }

});
</script>


<style>


</style>
