<template>
    <div style="height:100%;width:100%;overflow-y: hidden" class="">

        <v-row class="ma-0 pa-0" justify="center" align="center" style="height: 80%;overflow-y: hidden">


            <v-col cols="12" sm="10" md="8" class="elevation-3 rounded-lg bg-grey-lighten-5 border-t mt-6 pb-2"
                   style="height:calc(100% - 40px)">
                <v-fade-transition>
                    <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                        <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                    </v-row>
                </v-fade-transition>
                <v-slide-y-transition>
                    <div v-if="showForm" class="ma-0 pa-0 myForm" style="height: calc(100% - 16px);width: 100%">
                        <p class="mt-n6 rounded-lg pa-2  bg-info text-center" style="width:150px;font-size: 14px">ایجاد
                            واحد
                            شغلی</p>
                        <v-row class="ma-0 pa-0 " justify="center">
                            <v-col cols="12" class="mt-6">
                                <p style="font-size: 10px; line-height: 20px" class=" ">
                                    جهت افزودن واحد شغلی ابتدا مشخص کنید واحد شغلی روی عرصه ایجاد گردد یا واحد مستقل
                                </p>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0 pa-0 mt-8">

                            <v-radio-group
                                    inline
                                    v-model="businessUnitType"
                            >
                                <v-radio
                                        class="mx-2"
                                        color="info"
                                        label="ایجاد واحد شغلی روی عرصه"
                                        value="building"
                                ></v-radio>
                                <v-radio
                                        class="mx-2"
                                        color="info"
                                        label="ایجاد واحد شغلی روی واحد مستقل"
                                        value="apartment"
                                ></v-radio>
                            </v-radio-group>

                        </v-row>

                        <v-row class="ma-0 pa-0 pr-1 mt-8">
                            <v-col cols="12" sm="10" class="">
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete

                                                :items="buildings"
                                                item-value="id"
                                                density="compact"
                                                v-model="selectBuilding"
                                                :item-title="item => item.extra_info.code"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>


                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">انتخاب ساختمان</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-autocomplete
                                                :disabled="businessUnitType=='building'"
                                                :items="apartments"
                                                v-model="selectApartment"
                                                item-value="id"
                                                item-title="code"
                                                density="compact"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">انتخاب واحد</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </div>
                </v-slide-y-transition>


                <v-row class="ma-0 pa-0 pa-2 " justify="end">
                    <v-btn class="font-weight-bold" color="error" size="small" @click="cancelBtn" variant="text">
                        انصراف
                    </v-btn>
                    <v-btn @click="saveBtn" class="font-weight-bold" color="info" size="small" variant="tonal">ذخیره</v-btn>
                </v-row>
            </v-col>


        </v-row>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import {EnumField, BusinessInfo, SelectedBuilding, Arse, Aparteman} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";


export default defineComponent({
    name: "AddJobComponent",

    components: {},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {addBusinessUnit, apartmentList, getApartments,} = survey_functions()
        const buildings = ref<SelectedBuilding[]>([])
        const apartments = ref<Aparteman[]>([])
        const initData = ref(false)

        onMounted(async () => {
            const arse: Arse = store.getters.getArseInfo

            if (arse && arse.buildings && arse.id) {
                await getApartments(arse.id)
                buildings.value = arse.buildings

                setTimeout(() => {
                    initData.value = true
                }, 200)
            }
        })
        return {
            store, toast, router, buildings, initData, apartmentList, apartments, addBusinessUnit
        }
    },

    data() {
        return {
            showForm: false,
            selectBuilding: null as null | number,
            selectApartment: null as null | number,
            businessUnitType: 'apartment',
        }
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        async saveBtn() {
            if (this.businessUnitType === 'building') {
                if (this.selectBuilding) {
                    const res = await this.addBusinessUnit({building: this.selectBuilding})
                    if (res) {
                        this.toast.add({
                            group: 'tr',
                            life: 4000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'واحد شغلی اضافه شد'
                        });

                        setTimeout(() => {
                            this.router.go(-1)
                        }, 1000)
                        return
                    }
                }
            } else {
                if (this.selectBuilding && this.selectApartment) {
                    const res = await this.addBusinessUnit({
                        building: this.selectBuilding,
                        apartment: this.selectApartment
                    })
                    if (res) {
                        if (res) {
                            this.toast.add({
                                group: 'tr',
                                life: 4000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'واحد شغلی اضافه شد'
                            });
                            setTimeout(() => {
                                this.router.go(-1)
                            }, 1000)
                            return
                        }
                    }
                }
            }

            this.toast.add({group: 'br', life: 3000, severity: 'error', summary: ' خطا در ذخیره', detail: 'اطلاعات تکمیل نیست'});
        },
    },

    watch: {
        initData() {
            if (this.initData) {
                setTimeout(() => {
                    this.showForm = true
                }, 300)
            }
        },
        selectBuilding() {
            if (this.selectBuilding !== null) {
                this.apartments = this.apartmentList.filter((item) => {
                    console.log(item.building.id)
                    return item.building.id === this.selectBuilding
                })
            }
        }
    },


});
</script>


<style>


</style>
