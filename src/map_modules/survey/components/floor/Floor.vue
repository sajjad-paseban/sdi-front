<template>
    <div style="height:100%;width:100%" class="pa-2 bg-grey-lighten-2">


        <v-row class="ma-0 pa-0 elevation-3 rounded-lg border " style="height:calc(100% - 1px);position: relative">
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
                <v-stepper v-if="initData" v-model="step" show-actions class="rounded-lg" alt-labels
                           style="width: 100%;height: 100%"
                           non-linear :mobile="mobile">
                    <template v-slot:default="{ prev, next }">
                        <v-stepper-header class="bg-white">
                            <v-stepper-item :color="step===1?'info':''" class="font-weight-bold" editable :value="1"
                                            title="ساختمان و طبقه ">
                                <template v-slot:icon>
                                    <v-icon>mdi-office-building</v-icon>
                                </template>
                            </v-stepper-item>

                            <v-divider></v-divider>

                            <v-stepper-item :color="step===2?'info':''" class="font-weight-bold" editable :value="2"
                                            title="اطلاعات تکمیلی ">
                                <template v-slot:icon>
                                    <v-icon>mdi-car-back</v-icon>
                                </template>

                            </v-stepper-item>

                            <v-divider></v-divider>

                            <v-stepper-item :color="step===3?'info':''" class="font-weight-bold" editable :value="3"
                                            title="انباری پارکینگ راهرو">
                                <template v-slot:icon>
                                    <v-icon>mdi-car-back</v-icon>
                                </template>

                            </v-stepper-item>

                            <v-divider></v-divider>

                            <v-stepper-item :color="step===4?'info':''" class="font-weight-bold" :value="4"
                                            title="کاربری">
                                <template v-slot:icon>
                                    <v-icon>mdi-clipboard-list</v-icon>
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
                        <v-img src="@/assets/cImages/1.jpg" style=";width: 100%" :style="mobile?`height:calc(${formSize}px - 65px)`:'height:calc(100dvh - 135px)'"  cover="">
                            <v-stepper-window :touch="false">
                                <v-stepper-window-item :value="1">
                                    <div style="height:100%!important;width: 100%!important" class="">
                                        <select-floor @selected-building="selectBuildingEmit" @select-floor="selectFloorEmit" :step="step"></select-floor>
                                    </div>
                                </v-stepper-window-item>
                                <v-stepper-window-item :value="2">
                                    <div style="height:100%!important;width: 100%!important" v-if="step==2&&selectedBuilding">
                                        <FloorExtraInfo :selected-building="selectedBuilding" ref="extraInfoRef" :selected-floor="selectedFloor" :step="step"></FloorExtraInfo>
                                    </div>
                                </v-stepper-window-item>
                                <v-stepper-window-item :value="3">
                                    <div style="height:100%!important;width: 100%!important"  v-if="step==3">
                                        <AddParking :selected-floor="selectedFloor" ref="addParkingRef" :step="step"></AddParking>
                                    </div>
                                </v-stepper-window-item>
                                <v-stepper-window-item :value="4">
                                    <div style="height:100%!important;width: 100%!important"  v-if="step==4">
                                        <FloorUseType ref="floorUsingRef" :selected-floor="selectedFloor"
                                                      :step="step"></FloorUseType>
                                    </div>
                                </v-stepper-window-item>


                                <v-stepper-window-item :value="5">
                                    <div style="height:100%!important;width: 100%!important">
                                        <SaveFloorInfo></SaveFloorInfo>
                                    </div>
                                </v-stepper-window-item>

                            </v-stepper-window>


                            <v-row class="ma-0 pa-0 px-2" justify="space-between">
                                <v-btn :disabled="step===1" color="info" class="font-weight-bold"
                                       style="font-size: 10px"
                                       @click="prev" size="small"
                                       prepend-icon="mdi-chevron-right"> مرحله قبل
                                </v-btn>
                                <v-btn :disabled="!selectedFloor" v-if="step!==5" color="info" class="font-weight-bold"
                                       style="font-size: 10px"
                                       @click="nextStepClick(next)" size="small"
                                       append-icon="mdi-chevron-left"> مرحله بعد
                                </v-btn>
                                <v-btn v-if="step===5" color="info" class="font-weight-bold" style="font-size: 10px"
                                       @click="next" size="small"
                                       append-icon="mdi-content-save">لیست طبقات
                                </v-btn>
                            </v-row>
                        </v-img>

                    </template>
                </v-stepper>
            </v-fade-transition>

        </v-row>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import Feature from 'ol/Feature.js';
import {OpenLayerAction} from "@/store/openLayer/actions";
import {useRouter} from "vue-router";

import SelectFloor from "@/map_modules/survey/components/floor/SelectFloor.vue";
import AddParking from "@/map_modules/survey/components/floor/AddParking.vue";
import FloorUseType from "@/map_modules/survey/components/floor/FloorUseType.vue";
import SaveFloorInfo from "@/map_modules/survey/components/floor/SaveFloorInfo.vue";
import {BuildingResultTableRef} from "@/map_modules/survey/components/building/buildingProgressRef";
import {FloorInfo, ParkingAndStoreAndCommons, SelectedBuilding} from "@/models/Survey.interface";
import {SurveyMutations} from "@/store/survey/mutations";
import {SurveyLayers} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import {AddParkingRef, FloorExtraInfoRef} from "@/map_modules/survey/components/floor/FloorInfoRef";
import FloorExtraInfo from "@/map_modules/survey/components/floor/FloorExtraInfo.vue";


export default defineComponent({
    name: "FloorComponent",

    components: {SelectFloor, AddParking, FloorUseType, SaveFloorInfo, FloorExtraInfo},

    props: {
        formSize:{
            required:false,
            type:Number
        },
        mobile:{
            required:false,
            type:Boolean
        }


    },


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()

        const addParkingRef = ref<FloorExtraInfoRef>()
        const extraInfoRef = ref<FloorExtraInfoRef>()
        const floorUsingRef = ref<FloorExtraInfoRef>()
        const selectedBuilding = ref<SelectedBuilding|null>(null) as Ref<SelectedBuilding>
        const {arseInfoList, getArse, getArseInfo} = survey_functions()

        const initData = ref(false)


        return {
            store, toast, router, addParkingRef, getArse, arseInfoList, initData, getArseInfo, extraInfoRef,floorUsingRef,selectedBuilding
        }
    },

    data() {
        return {
            step: 1,
            parking_store_commons: [] as ParkingAndStoreAndCommons[],
            selectFloor: '',
            mobile: false,

            selectedFloor: null as FloorInfo | null

        }
    },
    methods: {
        async showLayersSet() {
            const layersId = []
            this.store.getters.getSurveyLayers.map((item: SurveyLayers) => {
                if (item.name === 'بلوک' || item.name === 'معبر') {
                    layersId.push(item.layer.id)
                }
            })
            await this.store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, layersId)
        },


        async nextStepClick(next: any) {
            if (this.selectedFloor) {
                let resultError: string | null = 'خطا'

                if (this.step === 1) {
                    next()
                    return
                }

                if (this.step === 2 && this.extraInfoRef) {
                    const res = await this.extraInfoRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.selectedFloor = res.result
                        console.log(this.selectedFloor,'selectedFloor')
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                if (this.step === 3 && this.addParkingRef) {
                    const res = await this.addParkingRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.selectedFloor = res.result
                        console.log(this.selectedFloor,'selectedFloor')
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                if (this.step === 4 && this.floorUsingRef) {
                    const res = await this.floorUsingRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.selectedFloor = res.result
                        console.log(this.selectedFloor,'selectedFloor')
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                this.toast.add({
                    group: 'br',
                    life: 3000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: resultError
                });
            } else {
                this.toast.add({
                    group: 'br',
                    life: 3000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: 'طبقه ای انتخاب نشده است'
                });
            }
        },

        myEventHandler() {
            this.mobile = window.innerWidth < 600
        },

        selectFloorEmit(floor: FloorInfo) {
            this.selectedFloor = floor
        },

        selectBuildingEmit(building: SelectedBuilding) {
            this.selectedBuilding =building
        }
    },

    watch: {},

    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },

    async mounted(): Promise<void> {

        if (!this.store.getters.getArseInfo) {
            this.toast.add({
                group: 'br',
                life: 3000,
                severity: 'error',
                summary: ' خطا',
                detail: 'عرصه یافت نشد'
            });
            await this.router.push({name: 'Arse'})
        }
        this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)

        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME, 'طبقات')

        console.log(this.store.getters.getMapDisable)
        await this.showLayersSet()
        this.myEventHandler()
        this.initData = true
    }

});
</script>


<style>


</style>
