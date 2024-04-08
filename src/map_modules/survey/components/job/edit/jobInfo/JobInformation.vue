<template>
    <div dir="rtl" style="height:100%;width:100%;overflow-y: hidden" class="">

        <div class="ma-0 pa-2 pr-4 myForm" style="height: calc(100% - 46px);width: 100%;overflow-y: hidden">

            <div style="height: 10px"></div>

            <v-fade-transition>
                <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height:calc(100% - 10px)"
                       justify="center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>
            </v-fade-transition>

            <v-fade-transition>
                <v-form v-if="initData&&business_clone" ref="jobInfoFormRef"
                        style="height:calc(100% - 10px);width:100%">
                    <v-row style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;"
                           class="ma-0 pa-0 py-4 rounded-lg border elevation-2 bg-grey-lighten-4 font-weight-bold">

                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"
                                    :rules="nameRule"
                                    variant="solo"
                                    v-model="business_clone.name"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">نام شغل </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_businessjobreference"
                                    :items="code_businessjobreference.items"
                                    v-model="business_clone.business_job_reference"
                                    item-value="pk"
                                    :rules="floatRule"
                                    density="compact"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">{{ code_businessjobreference.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_businessjobcategory"
                                    :items="code_businessjobcategory.items"
                                    v-model="business_clone.business_job_category"
                                    item-value="pk"
                                    density="compact"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">{{ code_businessjobcategory.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_businesslevel"
                                    :items="code_businesslevel.items"
                                    v-model="business_clone.business_level"
                                    item-value="pk"
                                    density="compact"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">{{ code_businesslevel.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="3" class="rounded-lg mt-n1">
                            <p class="text-grey-darken-3" style="font-size: 9px">{{ ' تاریخ شروع فعالیت' }}</p>
                            <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                         color="rgb(var(--v-theme-info))" editable
                                         v-model="business_clone.start_date"
                                         placeholder=" تاریخ شروع فعالیت"></date-picker>
                        </v-col>

                        <v-col cols="12" sm="4" md="3" class="rounded-lg mt-n1">
                            <p class="text-grey-darken-3" style="font-size: 9px">{{ ' تاریخ پایان فعالیت' }}</p>
                            <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                         color="rgb(var(--v-theme-info))" editable
                                         v-model="business_clone.end_date"
                                         placeholder=" تاریخ پایان فعالیت"></date-picker>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_businesspollutionlevel"
                                    :items="code_businesspollutionlevel.items"
                                    v-model="business_clone.business_pollution_level"
                                    item-value="pk"
                                    density="compact"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">{{ code_businesspollutionlevel.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_nolicensereason"
                                    :items="code_nolicensereason.items"
                                    v-model="business_clone.no_license_reason"
                                    item-value="pk"
                                    density="compact"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">{{ code_nolicensereason.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_ownershipunittype"
                                    :items="code_ownershipunittype.items"
                                    v-model="business_clone.ownership_unit_type"
                                    item-value="pk"
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">{{ code_ownershipunittype.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"
                                    variant="solo"
                                    :rules="[...nameRule,dongRule(business_clone.ownership_unit_type,business_clone.ownership_value)]"
                                    v-model="business_clone.ownership_value"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">سهم مالکیت </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"

                                    variant="solo"
                                    v-model="business_clone.pollution_value"

                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">میزان پسماند </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"

                                    variant="solo"
                                    v-model="business_clone.employee_count"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class=""> تعداد کارکنان </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="3" class="rounded-lg mt-n1">
                            <p class="text-grey-darken-3" style="font-size: 9px">{{ 'تاریخ تسویه' }}</p>
                            <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD" editable
                                         color=" rgb(var(--v-theme-info))" v-model="business_clone.settlement_date"
                                         placeholder=" تاریخ تسویه "></date-picker>
                        </v-col>

                        <v-col cols="12" sm="4" md="3" class="rounded-lg">
                            <v-checkbox v-model="business_clone.special_pollution" label="دارای پسماند"></v-checkbox>
                        </v-col>


                        <v-col cols="12" sm="4" md="3" class="rounded-lg">
                            <v-checkbox v-model="business_clone.temporary" label="پروانه موقت است"></v-checkbox>
                        </v-col>


                        <v-col cols="12" sm="4" md="3" class="rounded-lg">
                            <v-checkbox v-model="business_clone.star_business" label=" شغل ستاره دار"></v-checkbox>
                        </v-col>


                    </v-row>
                </v-form>

            </v-fade-transition>


        </div>


        <v-row class="ma-0 pa-0 pa-2 border-t" justify="end">

            <v-btn @click="saveBtn" class="font-weight-bold" color="info" size="small" variant="tonal">ذخیره اطلاعات
                شغل
            </v-btn>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import VForm from "@/models/VForm.interface";
import {EnumField, BusinessInfo, BusinessUnitInfo} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import rules from "@/componentFunctions/rules_functions";


export default defineComponent({
    name: "JobInformationComponent",

    components: {},


    props: {
        businessInfo: {
            type: Object as PropType<BusinessInfo | null | undefined>,
            required: false,
            default: null,
        },
        businessUnitId: {
            type: [Number],
            required: true
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {getEnumsTable, addBusiness, editBusiness,} = survey_functions()
        const {nameRule, floatRule, phoneRule} = rules()

        const initData = ref(false)
        const code_businessjobreference = ref<EnumField>()
        const code_businessjobcategory = ref<EnumField>()
        const code_businesslevel = ref<EnumField>()
        const code_businesspollutionlevel = ref<EnumField>()
        const code_nolicensereason = ref<EnumField>()
        const code_ownershipunittype = ref<EnumField>()

        const business_clone = ref<BusinessInfo>({
            business_job_category: 1,
            business_job_reference: null,
            business_level: 1,
            business_pollution_level: null,
            employee_count: null,
            end_date: null,
            name: "",
            no_license_reason: null,
            ownership_unit_type: null,
            ownership_value: null,
            pollution_value: '0',
            settlement_date: null,
            special_pollution: null,
            star_business: null,
            start_date: null,
            temporary: null
        })
        const jobInfoFormRef = ref<VForm>()


        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_businessjobreference') {
                        const items = await getEnumsTable({name: item.title})
                        code_businessjobreference.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_businessjobcategory') {
                        const items = await getEnumsTable({name: item.title})
                        code_businessjobcategory.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_businesslevel') {
                        const items = await getEnumsTable({name: item.title})
                        code_businesslevel.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_businesspollutionlevel') {
                        const items = await getEnumsTable({name: item.title})
                        code_businesspollutionlevel.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_nolicensereason') {
                        const items = await getEnumsTable({name: item.title})
                        code_nolicensereason.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_ownershipunittype') {
                        const items = await getEnumsTable({name: item.title})
                        code_ownershipunittype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()

            if (props.businessInfo) {
                business_clone.value = props.businessInfo
            }

            setTimeout(() => {
                initData.value = true
            }, 200)
        })

        return {
            jobInfoFormRef,
            addBusiness, editBusiness,
            business_clone,
            store,
            toast,
            router,
            floatRule,
            code_businessjobreference,
            initData,
            code_businessjobcategory,
            code_businesslevel,
            nameRule,
            code_businesspollutionlevel,
            code_nolicensereason,
            code_ownershipunittype
        }
    },

    data() {
        return {}
    },
    methods: {

        dongRule(value,data){
            if (value==2&&data>6){
                return 'مقدار از 6 بیشتر نمیتواند باشد'
            }else {
                return true
            }

        },

        cancelBtn() {
            this.router.go(-1)
        },

        async saveBtn() {

            if (this.jobInfoFormRef) {
                const res = await this.jobInfoFormRef.validate()

                if (res.valid) {
                    if (this.business_clone.id) {
                        const res = await this.editBusiness(this.business_clone, this.business_clone.id)
                        if (res) {
                            this.$emit('saveBusinessInfo', this.business_clone)
                            this.toast.add({
                                group: 'tr',
                                life: 4000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'تغییرات ذخیره شد'
                            });
                        }
                    } else {
                        const res = await this.addBusiness(this.business_clone, this.businessUnitId)
                        if (typeof res == "number") {
                            this.business_clone.id = res
                            this.$emit('saveBusinessInfo', this.business_clone)
                            this.toast.add({
                                group: 'tr',
                                life: 4000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'تغییرات ذخیره شد'
                            });

                        }

                    }
                }
            }
        }
    },

    emits: ['saveBusinessInfo'],

    watch: {},


});
</script>


<style>


</style>
