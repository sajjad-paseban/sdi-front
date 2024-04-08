<template>
    <div style="height:100%;width:100%" class="">
        <div style="height:100%;width:100%" class="  myForm">

            <v-row class="ma-0 p-0   rounded-lg" style="height: 100%;position: relative" justify="center">
                <v-scale-transition>
                    <v-btn @click="router.push({name:'apartemanList'})" v-tooltip.right="'لیست واحد های مستقل'"
                           style="position: absolute;left:30px;bottom:70px;z-index: 1001" icon
                           class="elevation-6 border-t">
                        <v-avatar size="35">
                            <v-img
                                    class=""
                                    src="@/assets/icons/dashboard.png"
                                    alt="John"
                            ></v-img>
                        </v-avatar>
                    </v-btn>
                </v-scale-transition>


                <v-col cols="12" sm="12" style="height: 100%;overflow: hidden" class="  ">
                    <v-fade-transition>
                        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                            <v-progress-circular
                                    :size="50"
                                    color="primary"
                                    indeterminate
                            ></v-progress-circular>
                        </v-row>
                    </v-fade-transition>
                    <v-fade-transition>
                        <v-row class="pa-0 ma-0" style="height: 100%" v-if="initData">
                            <v-stepper v-model="step" show-actions class="rounded-lg bg-grey-lighten-3 elevation-2"
                                       :alt-labels="!mobile"
                                       style="width: 100%;height: 100%"
                                       non-linear :mobile="mobile">
                                <template v-slot:default="{ prev, next }">
                                    <v-stepper-header class="bg-blue-lighten-4">
                                        <v-stepper-item :color="step===1?'info':''" class="font-weight-bold" editable
                                                        :value="1"
                                                        title="اطلاعات پایه">
                                            <template v-slot:icon>
                                                <v-icon>mdi-home</v-icon>
                                            </template>
                                        </v-stepper-item>

                                        <v-divider></v-divider>

                                        <v-stepper-item :color="step===2?'info':''" class="font-weight-bold" editable
                                                        :value="2"
                                                        title="اضلاع">
                                            <template v-slot:icon>

                                                <v-icon>mdi-wall</v-icon>
                                            </template>

                                        </v-stepper-item>

                                        <v-divider></v-divider>

                                        <v-stepper-item :color="step===3?'info':''" class="font-weight-bold" editable
                                                        :value="3"
                                                        title="اطلاعات پایه">
                                            <template v-slot:icon>
                                                <v-icon>mdi-home</v-icon>
                                            </template>
                                        </v-stepper-item>

                                        <v-divider></v-divider>

                                        <v-stepper-item :color="step===4?'info':''" class="font-weight-bold" editable
                                                        :value="4"
                                                        title="اطلاعات واحد">
                                            <template v-slot:icon>
                                                <v-icon>mdi-book-outline</v-icon>
                                            </template>

                                        </v-stepper-item>

                                        <v-divider></v-divider>



                                        <v-stepper-item :color="step===5?'info':''" class="font-weight-bold" editable
                                                        :value="5"
                                                        title="تاسیسات و امکانات">
                                            <template v-slot:icon>
                                                <v-icon>mdi-hammer-wrench</v-icon>
                                            </template>

                                        </v-stepper-item>

                                        <v-divider></v-divider>

                                        <v-stepper-item @click="goToArchive" editable
                                                        :color="step===6?'info':''" class="font-weight-bold" :value="6"
                                                        title="آرشیو">
                                            <template v-slot:icon>
                                                <v-icon>mdi-stairs-up</v-icon>
                                            </template>
                                        </v-stepper-item>
                                        <v-divider></v-divider>
                                        <v-stepper-item :color="step===7?'info':''" class="font-weight-bold" :value="7"
                                                        title="ثبت نهایی">
                                            <template v-slot:icon>
                                                <v-icon>mdi-content-save</v-icon>
                                            </template>
                                        </v-stepper-item>
                                    </v-stepper-header>

                                    <v-img src="@/assets/cImages/1.jpg" style=";width: 100%" :style="mobile?`height:calc(${formSize}px - 50px)`:'height:calc(100dvh - 128px)'" cover>

                                            <v-stepper-window :touch="false">
                                                <v-stepper-window-item :value="1">
                                                    <div style="height:100%!important;width: 100%!important" class=""
                                                         v-if="apartmentItem">
                                                        <ApartmentInfo :apartment="apartmentItem" ref="ApartmentInfoRef" ></ApartmentInfo>
                                                    </div>
                                                </v-stepper-window-item>
                                                <v-stepper-window-item :value="2">
                                                    <div style="height:100%!important;width: 100%!important">
                                                        <ApartemanSides :apartment="apartmentItem"
                                                                        ref="DistrictsRef"></ApartemanSides>
                                                    </div>
                                                </v-stepper-window-item>
                                                <v-stepper-window-item :value="3">
                                                    <div style="height:100%!important;width: 100%!important" class=""
                                                         v-if="apartmentItem">
                                                        <BaseInfo :apartment="apartmentItem" ref="BaseInfoRef"></BaseInfo>
                                                    </div>
                                                </v-stepper-window-item>
                                                <v-stepper-window-item :value="4">
                                                    <div style="height:100%!important;width: 100%!important">
                                                        <UnitInfo :apartment="apartmentItem" ref="UnitInfoRef"></UnitInfo>
                                                    </div>
                                                </v-stepper-window-item>

                                                <v-stepper-window-item :value="5">
                                                    <div style="height:100%!important;width: 100%!important">
                                                        <ApartemanFacilities :apartment="apartmentItem"
                                                                             ref="FacilitiesRef"></ApartemanFacilities>
                                                    </div>
                                                </v-stepper-window-item>

                                                <v-stepper-window-item :value="6">
                                                    <div v-if="step==6"
                                                         style="height:100%!important;width: 100%!important">
                                                        <v-row class="ma-0 pa-0 py-1 " style="height:100%" align="center"
                                                               justify="center">
                                                            <router-view class="elevation-2"/>
                                                        </v-row>

                                                    </div>
                                                </v-stepper-window-item>

                                                <v-stepper-window-item :value="7">
                                                    <div style="height:100%!important;width: 100%!important">
                                                        <SaveAparteman></SaveAparteman>
                                                    </div>
                                                </v-stepper-window-item>

                                            </v-stepper-window>
                                            <v-row class="ma-0 pa-0 px-2 " justify="space-between">
                                                <v-btn :disabled="step===1" color="info" class="font-weight-bold"
                                                       style="font-size: 10px"
                                                       @click="previousClick(prev)" size="small"
                                                       prepend-icon="mdi-chevron-right"> مرحله قبل
                                                </v-btn>
                                                <v-btn v-if="step!==7" color="info"
                                                       class="font-weight-bold" style="font-size: 10px"
                                                       @click="nextStepClick(next)" size="small"
                                                       append-icon="mdi-chevron-left"> مرحله بعد
                                                </v-btn>
                                                <v-btn v-if="step===7" color="info" class="font-weight-bold"
                                                       style="font-size: 10px"
                                                       @click="router.push({name:'apartemanList'})" size="small"
                                                       append-icon="mdi-content-save">لیست واحد ها
                                                </v-btn>
                                            </v-row>

                                    </v-img>




                                </template>
                            </v-stepper>
                        </v-row>
                    </v-fade-transition>
                </v-col>
            </v-row>

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRoute, useRouter} from "vue-router";
import {Aparteman, Arse, BuildingExtraInfo, SelectedBuilding} from "@/models/Survey.interface";
import BaseInfo from "@/map_modules/survey/components/aparteman/apartemanConfig/BaseInfo.vue";
import UnitInfo from "@/map_modules/survey/components/aparteman/apartemanConfig/UnitInfo.vue";
import ApartemanSides from "@/map_modules/survey/components/aparteman/apartemanConfig/ApartemanSides.vue";
import ApartemanFacilities from "@/map_modules/survey/components/aparteman/apartemanConfig/ApartemanFacilities.vue";
import SaveAparteman from "@/map_modules/survey/components/aparteman/apartemanConfig/SaveAparteman.vue";
import {ApartmentRef} from "@/map_modules/survey/components/aparteman/apartmenttRef";
import survey_functions from "@/componentFunctions/survey_functions";
import {SurveyMutations} from "@/store/survey/mutations";
import ApartmentInfo from "@/map_modules/survey/components/aparteman/apartemanConfig/ApartmentInfo.vue"

export default defineComponent({
    name: "ApartmentConfigComponent",

    components: {ApartemanSides, BaseInfo, UnitInfo, ApartemanFacilities, SaveAparteman,ApartmentInfo},

    props: {

        formSize:{
            required:false,
            type:Number
        },



    },
    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {apartmentItem, getApartmentItem} = survey_functions()

        const select_aparteman = ref<Aparteman>()
        const initData = ref(false)

        const BaseInfoRef = ref<ApartmentRef>()
        const UnitInfoRef = ref<ApartmentRef>()
        const DistrictsRef = ref<ApartmentRef>()
        const FacilitiesRef = ref<ApartmentRef>()
        const ApartmentInfoRef = ref<ApartmentRef>()


        async function getAparteman() {
            if (route.params.idNumber && typeof route.params.idNumber == 'string') {
                const res = await getApartmentItem(parseInt(route.params.idNumber))
                if (apartmentItem.value) {
                    await store.commit(SurveyMutations.SET_TASKBAR_INFO_CODE, {
                        name: 'apartment',
                        code: apartmentItem.value.building.code + apartmentItem.value.code
                    })
                }
            }
        }


        onMounted(() => {
            getAparteman()
            setTimeout(() => {
                initData.value = true
            }, 300)
        })


        return {
            ApartmentInfoRef,
            FacilitiesRef,
            store,
            toast,
            router,
            route,
            select_aparteman,
            initData,
            BaseInfoRef,
            apartmentItem,
            UnitInfoRef,
            DistrictsRef
        }
    },

    data() {
        return {
            step: 1,
            mobile: false,
        }
    },
    methods: {
        async nextStepClick(next: any) {
            if (this.apartmentItem) {
                let resultError: string | null = 'خطا'


                if (this.step == 1 && this.ApartmentInfoRef) {
                    const res = await this.ApartmentInfoRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.apartmentItem = res.result
                        console.log(this.apartmentItem, 'apartmentItem')
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                if (this.step == 2 && this.DistrictsRef) {
                    const res = await this.DistrictsRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.apartmentItem = res.result
                        console.log(this.apartmentItem, 'apartmentItem')
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                if (this.step == 3 && this.BaseInfoRef) {
                    const res = await this.BaseInfoRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.apartmentItem = res.result
                        console.log(this.apartmentItem, 'apartmentItem')
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }

                if (this.step == 4 && this.UnitInfoRef) {
                    const res = await this.UnitInfoRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.apartmentItem = res.result
                        console.log(this.apartmentItem, 'apartmentItem')
                        next()
                        return
                    } else {
                        resultError = res.error
                    }
                }



                if (this.step == 5 && this.FacilitiesRef) {
                    const res = await this.FacilitiesRef.nextPageFunc()
                    if (!res.error && res.result) {
                        this.apartmentItem = res.result
                        console.log(this.apartmentItem, 'apartmentItem')
                        next()
                        await this.goToArchive()
                        return
                    } else {
                        resultError = res.error
                    }
                }
                if (this.step === 6) {
                    next()
                    await this.router.push({name: 'apartemanConfig'})
                    return
                }
                if (this.step == 7 && this.FacilitiesRef) {
                    await this.router.push({name: 'apartemanList'})
                    return
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

        async previousClick(prev:any){
            if (this.step == 7 ) {
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
        },

        async goToArchive() {
            const arse: Arse = this.store.getters.getArseInfo
            if (this.apartmentItem && arse) {
                const building:BuildingExtraInfo = this.apartmentItem.building
                this.store.commit(SurveyMutations.SET_ARCHIVE_DATA, {
                    arse_id: arse.id,
                    building_id: building.id,
                    apartment_id: this.apartmentItem.id,
                    business_unit_id: null,
                    business_id: null
                })
                await this.router.push({name: 'apartemanArchiveList'})
            }else {
                this.toast.add({
                    group: 'br',
                    life: 3000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: 'واحدی انتخاب نشده است'
                });
            }

        },
    },

    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
    async mounted(): Promise<void> {
        this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)
        this.myEventHandler()
    }


});
</script>


<style>


</style>
