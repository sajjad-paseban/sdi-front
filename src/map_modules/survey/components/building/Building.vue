<template>

    <div style="height:100%;width:100%" class="pa-2 ">


        <v-row class="ma-0 pa-0 elevation-3 rounded-lg border " style="height:calc(100% - 1px);position: relative">


            <v-stepper v-model="step" show-actions class="rounded-lg " alt-labels
                       style="width: 100%;height: 100%"
                       non-linear :mobile="mobile">
                <template v-slot:default="{ prev, next }">
                    <v-stepper-header class="bg-white">
                        <v-stepper-item :color="step===1?'info':''" class="font-weight-bold" editable :value="1"
                                        title="ساختمان ها">
                            <template v-slot:icon>
                                <v-icon>mdi-office-building</v-icon>
                            </template>
                        </v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item :color="step===2?'info':''" class="font-weight-bold" editable :value="2"
                                        title="پیشامدگی">
                            <template v-slot:icon>
                                <v-icon>mdi-arrow-left-right</v-icon>
                            </template>

                        </v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item :color="step===3?'info':''" class="font-weight-bold" :value="3"
                                        title="خلاصه وضعیت">
                            <template v-slot:icon>
                                <v-icon>mdi-clipboard-list</v-icon>
                            </template>
                        </v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item :color="step===4?'info':''" class="font-weight-bold" :value="4"
                                        title="راه پله و آسانسور">
                            <template v-slot:icon>
                                <v-icon>mdi-stairs-up</v-icon>
                            </template>
                        </v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item @click="goToArchive" editable
                                        :color="step===5?'info':''" class="font-weight-bold" :value="5"
                                        title="آرشیو">
                            <template v-slot:icon>
                                <v-icon>mdi-stairs-up</v-icon>
                            </template>
                        </v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item :color="step===6?'info':''" class="font-weight-bold" :value="6"
                                        title="ثبت نهایی">
                            <template v-slot:icon>
                                <v-icon>mdi-content-save</v-icon>
                            </template>
                        </v-stepper-item>


                    </v-stepper-header>

                    <v-img src="@/assets/cImages/1.jpg" style=";width: 100%" :style="mobile?`height:calc(${formSize}px - 70px)`:'height:calc(100dvh - 135px)'"  cover="">
                        <v-stepper-window :touch="false">
                            <v-stepper-window-item :value="1">
                                <div style="height:100%!important;width: 100%!important" class=""
                                     v-if="buildingLayerId">
                                    <AddBuilding ref="addBuildingRef" :buildingLayerId="buildingLayerId" :step="step"
                                                 @selectBuilding="selectBuilding"></AddBuilding>
                                </div>
                            </v-stepper-window-item>
                            <v-stepper-window-item :value="2" v-if="selectedBuilding&&step===2">
                                <div style="height:100%!important;width: 100%!important">
                                    <BuildingProgress ref="buildingProgressRef" :step="step"
                                                      :selected-building="selectedBuilding"></BuildingProgress>
                                </div>
                            </v-stepper-window-item>
                            <v-stepper-window-item :value="3">
                                <div v-if="selectedBuilding&&step===3"
                                     style="height:100%!important;width: 100%!important">
                                    <BuildingResultTable :step="step" ref="buildingResultTableRef"
                                                         :selected-building="selectedBuilding"></BuildingResultTable>
                                </div>
                            </v-stepper-window-item>

                            <v-stepper-window-item :value="4">
                                <div v-if="selectedBuilding&&step===4"
                                     style="height:100%!important;width: 100%!important">
                                    <Staircase ref="staircaseRef" :selected-building="selectedBuilding"
                                               :step="step"></Staircase>
                                </div>
                            </v-stepper-window-item>

                            <v-stepper-window-item :value="5">
                                <div v-if="selectedBuilding&&step==5"
                                     style="height:100%!important;width: 100%!important">
                                    <v-row class="ma-0 pa-0 pa-2 rounded-lg " style="height:100%" align="center"
                                           justify="center">
                                        <router-view class="elevation-2"/>
                                    </v-row>

                                </div>
                            </v-stepper-window-item>

                            <v-stepper-window-item :value="6">
                                <div v-if="selectedBuilding&&step==6"
                                     style="height:100%!important;width: 100%!important">
                                    <save-building ref="saveBuildingRef"
                                                   :selected-building="selectedBuilding"></save-building>
                                </div>
                            </v-stepper-window-item>

                        </v-stepper-window>


                        <v-row class="ma-0 pa-0 px-2 " justify="space-between">
                            <v-btn :disabled="step===1" color="info" class="font-weight-bold" style="font-size: 10px"
                                   @click="previousClick(prev)" size="small"
                                   prepend-icon="mdi-chevron-right"> مرحله قبل
                            </v-btn>
                            <v-btn :disabled="!selectedBuilding" v-if="step!==6" color="info" class="font-weight-bold"
                                   style="font-size: 10px"
                                   @click="nextStepClick(next)" size="small"
                                   append-icon="mdi-chevron-left"> مرحله بعد
                            </v-btn>
                            <v-btn v-if="step===6" color="info" class="font-weight-bold" style="font-size: 10px"
                                   @click="nextStepClick(next)" size="small"
                                   append-icon="mdi-content-save">اطلاعات طبقات
                            </v-btn>
                        </v-row>
                    </v-img>


                </template>
            </v-stepper>
        </v-row>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import Feature from 'ol/Feature.js';
import {OpenLayerAction} from "@/store/openLayer/actions";
import {useRouter} from "vue-router";
import AddBuilding from "@/map_modules/survey/components/building/AddBuilding.vue";
import {Arse, SelectedBuilding} from "@/models/Survey.interface";
import BuildingProgress from "@/map_modules/survey/components/building/BuildingProgress.vue";
import {
    AddBuildingFuncRes,
    BuildingProgressRef,
    BuildingResultTableRef
} from "@/map_modules/survey/components/building/buildingProgressRef";
import BuildingResultTable from "@/map_modules/survey/components/building/BuildingProgressResultTable.vue";
import Staircase from "@/map_modules/survey/components/building/Staircase.vue";
import SaveBuilding from "@/map_modules/survey/components/building/SaveBuilding.vue";
import {SurveyMutations} from "@/store/survey/mutations";
import {SurveyLayers} from "@/store/survey/types";
import {SurveyAction} from "@/store/survey/actions";
import survey_functions from "@/componentFunctions/survey_functions";


export default defineComponent({
    name: "BuildingComponent",

    components: {AddBuilding, BuildingProgress, BuildingResultTable, Staircase, SaveBuilding},


    props: {
        map: {
            required: true,
            type: map
        },
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

        const addBuildingRef = ref<AddBuildingFuncRes>()
        const buildingProgressRef = ref<BuildingProgressRef>()
        const buildingResultTableRef = ref<BuildingResultTableRef>()
        const staircaseRef = ref<BuildingResultTableRef>()
        const saveBuildingRef = ref<BuildingResultTableRef>()
        const {getArse, getArseInfo} = survey_functions()

        const buildingLayerId = ref<number>()


        return {
            store,
            toast,
            router,
            buildingProgressRef,
            buildingResultTableRef,
            staircaseRef,
            buildingLayerId,
            addBuildingRef,
            saveBuildingRef, getArse, getArseInfo
        }
    },

    data() {
        return {
            mobile: false,
            step: 1,
            selectedBuilding: null as SelectedBuilding | null
        }
    },
    methods: {

        async goToArchive() {
            const arse: Arse = this.store.getters.getArseInfo
            if (this.selectedBuilding && arse) {

                this.store.commit(SurveyMutations.SET_ARCHIVE_DATA, {
                    arse_id: arse.id,
                    building_id: this.selectedBuilding.id,
                    apartment_id: null,
                    business_unit_id: null,
                    business_id: null
                })
                await this.router.push({name: 'buildingArchiveList'})
            }else {
                this.toast.add({
                    group: 'br',
                    life: 3000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: 'ساختمانی انتخاب نشده است'
                });
            }

        },

        async showLayersSet() {
            const layersId = []
            this.store.getters.getSurveyLayers.map((item: SurveyLayers) => {
                if (item.name === 'ساختمان') {
                    this.buildingLayerId = item.layer.id
                }
                if (item.name === 'بلوک' || item.name === 'معبر') {
                    layersId.push(item.layer.id)
                }
            })
            await this.store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, layersId)
        },

        async selectBuilding(building: SelectedBuilding) {
            this.selectedBuilding = {...this.selectedBuilding, ...building}
            if (this.selectedBuilding.extra_info.code) {
                await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_CODE, {
                    name: 'building',
                    code: this.selectedBuilding.extra_info.code
                })
            }
            const arse: Arse = this.store.getters.getArseInfo
            if (arse && arse.code) {
                await this.getArse(arse.code)
                if (this.getArseInfo) {
                    await this.store.commit(SurveyMutations.SET_ARSE_INFO, this.getArseInfo)
                    await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, this.getArseInfo)
                }
            }

        },

        async nextStepClick(next: any) {
            if (this.selectedBuilding) {
                let resultError: string | null = 'خطا'

                if (this.step === 1 && this.addBuildingRef) {
                    const res = await this.addBuildingRef.nextPageFunc()
                    console.log(res)
                    if (!res.error) {
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                if (this.step === 2 && this.buildingProgressRef) {
                    const res = await this.buildingProgressRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.selectedBuilding.progressInfo = res.result
                        const arse: Arse = this.store.getters.getArseInfo
                        arse.buildings?.map(async (building) => {
                            if (building.id == this.selectedBuilding?.id && res.result) {
                                building.progressInfo = res.result
                                await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, arse)
                            }
                        })

                        next()
                        return
                    } else {
                        resultError = res.error
                    }

                }
                if (this.step === 3 && this.buildingResultTableRef) {
                    const res = await this.buildingResultTableRef.nextPageFunc()
                    if (!res.error && res.result) {
                        console.log(res.result, 'result')
                        this.selectedBuilding = res.result
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }
                if (this.step === 4 && this.staircaseRef) {
                    const res = await this.staircaseRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.selectedBuilding = res.result
                        const arse: Arse = this.store.getters.getArseInfo
                        arse.buildings?.map(async (building) => {
                            if (building.id == this.selectedBuilding?.id && res.result) {
                                building.elevator_info = res.result.elevator_info
                                building.staircase_info = res.result.staircase_info
                                await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, arse)
                            }
                        })
                        next()
                        await this.goToArchive()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                if (this.step === 5) {
                    next()
                    await this.router.push({name: 'building'})
                    return
                }


                if (this.step === 6 && this.saveBuildingRef) {
                    const res = await this.saveBuildingRef.nextPageFunc()
                    if (!res.error) {
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
                    detail: 'ساختمانی انتخاب نشده است'
                });
            }

        },

        async previousClick(prev:any){
            if (this.step == 6 ) {
                prev()
                await this.goToArchive()
                return
            }else {
                prev()
                return
            }
        },

        myEventHandler() {
            this.mobile = window.innerWidth < 600
        }

    },

    watch: {},

    async mounted(): Promise<void> {

        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME, 'ساختمان')


        this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)
        console.log(this.store.getters.getMapDisable)
        await this.showLayersSet()
        this.myEventHandler()
    },

    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },


});
</script>


<style>


</style>
