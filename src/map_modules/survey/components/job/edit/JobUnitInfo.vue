<template>
    <div dir="rtl" style="height:100%;width:100%;overflow-y: hidden" class="">

        <div class="ma-0 pa-2 pr-4 myForm" style="height: calc(100% - 46px);width: 100%;overflow-y: hidden">
            <v-row class="ma-0 pa-0 " justify="center">
                <v-col cols="12" class="pa-2 bg-grey-lighten-4 rounded elevation-1">
                    <p style="font-size: 10px; line-height: 20px" class="">
                        در این پنجره باید اطلاعات مکانی مربوط به شغل را پر کنید .
                    </p>
                </v-col>
            </v-row>
            <div style="height: 30px"></div>

            <v-fade-transition>
                <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height:calc(100% - 65px)"
                       justify="center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>
            </v-fade-transition>

            <v-fade-transition>
                <v-form  v-if="initData" style="width:100%;height:calc(100% - 65px)" ref="jobUnitInfoForm">
                    <v-row style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;"
                           class="ma-0 pa-0 py-4 rounded-lg border elevation-2 bg-grey-lighten-3">
                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    v-model="businessUnitInfo_clone.area"
                                    @update:modelValue="correctFloat(businessUnitInfo_clone,'area')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت زیربنا </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    v-model="businessUnitInfo_clone.store_area"
                                    @update:modelValue="correctFloat(businessUnitInfo_clone,'store_area')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت انباری </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"

                                    v-model="businessUnitInfo_clone.out_area"
                                    @update:modelValue="correctFloat(businessUnitInfo_clone,'out_area')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت فضای باز </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_floortype"
                                    :items="code_floortype.items"
                                    v-model="businessUnitInfo_clone.floor_type"
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
                                    <p class="">طبقه وقوع </p>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_businessmabartype"
                                    :items="code_businessmabartype.items"
                                    v-model="businessUnitInfo_clone.business_mabar_type"
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
                                    <p class="">{{ code_businessmabartype.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    v-model="businessUnitInfo_clone.canopy_area"
                                    @update:modelValue="correctFloat(businessUnitInfo_clone,'canopy_area')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت سایبان </p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_businesslocationposition"
                                    :items="code_businesslocationposition.items"
                                    v-model="businessUnitInfo_clone.business_location_position"
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
                                    <p class="">{{ code_businesslocationposition.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <v-autocomplete
                                    v-if="code_businesslocationtype"
                                    :items="code_businesslocationtype.items"
                                    v-model="businessUnitInfo_clone.business_location_type"
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
                                    <p class="">{{ code_businesslocationtype.pName }}</p>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="3">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"

                                    v-model="businessUnitInfo_clone.maabar_lat"
                                    @update:modelValue="correctFloat(businessUnitInfo_clone,'maabar_lat')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">عرض معبر </p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                    dir="rtl"
                                    no-resize
                                    class="font-weight-bold"
                                    rows="5"
                                    background-color="light-blue"
                                    color="black"
                                    hint=""
                                    persistent-hint
                                    label="توضیحات "
                                    v-model="businessUnitInfo_clone.description"
                                    variant="solo"
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-form>

            </v-fade-transition>


        </div>


        <v-row class="ma-0 pa-0 pa-2 border-t" justify="end">

            <v-btn @click="saveBtn" class="font-weight-bold" color="info" size="small" variant="tonal">ذخیره واحد شغلی
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
import {SurveyMutations} from "@/store/survey/mutations";
import {EnumField, BusinessInfo, BusinessUnitInfo} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import rules from "@/componentFunctions/rules_functions";
import VForm from "@/models/VForm.interface";

export default defineComponent({
    name: "JobUnitInfoComponent",

    components: {},

    emits: ['updateBusinessUnitInfo'],
    props: {
        businessUnitInfo: {
            type: Object as PropType<BusinessUnitInfo>,
            required: true
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {getEnumsTable, editBusinessUnitInfo,correctFloat} = survey_functions()
        const {nameRule, floatRule, phoneRule} = rules()

        const initData = ref(false)
        const code_floortype = ref<EnumField>()
        const code_businessmabartype = ref<EnumField>()
        const code_businesslocationposition = ref<EnumField>()
        const code_businesslocationtype = ref<EnumField>()

        const businessUnitInfo_clone = ref<BusinessUnitInfo>(props.businessUnitInfo)
        const jobUnitInfoForm = ref<VForm>()

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_floortype') {
                        const items = await getEnumsTable({name: item.title})
                        code_floortype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_businessmabartype') {
                        const items = await getEnumsTable({name: item.title})
                        code_businessmabartype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_businesslocationposition') {
                        const items = await getEnumsTable({name: item.title})
                        code_businesslocationposition.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_businesslocationtype') {
                        const items = await getEnumsTable({name: item.title})
                        code_businesslocationtype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            setTimeout(() => {
                initData.value = true
            }, 1000)
        })

        return {correctFloat,
            store, jobUnitInfoForm,
            toast,
            router,
            floatRule,
            code_floortype,
            initData,
            code_businessmabartype,
            code_businesslocationposition,
            businessUnitInfo_clone,
            code_businesslocationtype, editBusinessUnitInfo,
        }
    },

    data() {
        return {}
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        async saveBtn() {

            if (this.jobUnitInfoForm) {
                const res = await this.jobUnitInfoForm.validate()

                if (res.valid && this.businessUnitInfo.id) {
                    const res = await this.editBusinessUnitInfo(this.businessUnitInfo_clone, this.businessUnitInfo.id)
                    if (res) {
                        this.toast.add({
                            group: 'tr',
                            life: 4000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'تغییرات ذخیره شد'
                        });
                        this.$emit('updateBusinessUnitInfo', this.businessUnitInfo_clone)
                    }
                }
            }


        }
    },

    watch: {},


});
</script>


<style>


</style>
