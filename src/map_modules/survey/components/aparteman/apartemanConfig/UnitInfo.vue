<template>
    <div style="height:100%;width:100%;overflow-y: auto" class=" pa-4">

        <v-row class="ma-0 pa-0" justify="center" style="height: 100%">
            <v-col cols="12" sm="12" style="overflow-y: hidden;height:100%"
                   class="rounded-lg elevation-2 bg-white pa-0">
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

                    <v-row class="ma-0 pa-0 pa-2" v-if="initData" style="overflow-y: auto;height: 100%">
                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    v-model="apartment_clone.area"

                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت مفید </p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    v-model="apartment_clone.share_area"
                                    @update:modelValue="correctFloat(apartment_clone,'share_area')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">سهم از مساحت اشتراکات </p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    v-model="apartment_clone.share_arse_area"
                                    @update:modelValue="correctFloat(apartment_clone,'share_arse_area')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت سهم العرصه </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-autocomplete
                                    v-if="code_floortype"
                                    :items="code_floortype.items"
                                    v-model="apartment_clone.floor_type"
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
                                    <p class="">طبقه وقوع آپارتمان</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-autocomplete
                                    v-if="code_floortype"
                                    :items="code_floortype.items"
                                    v-model="apartment_clone.parking_floor_type"
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
                                    <p class="">طبقه وقوع پارکینگ</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-autocomplete
                                    v-if="code_floortype"
                                    :items="code_floortype.items"
                                    v-model="apartment_clone.store_floor_type"
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
                                    <p class="">طبقه وقوع انباری</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"
                                    v-model="apartment_clone.yard_parking_area"
                                    @update:modelValue="correctFloat(apartment_clone,'yard_parking_area')"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت پارکینگ در حیاط </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"

                                    v-model="apartment_clone.yard_parking_number"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">تعداد پارکینگ در حیاط </p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    variant="solo"

                                    v-model="apartment_clone.persons_number"
                                    type="number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class=""> تعداد افراد ساکن </p>
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
                                    label="توضیحات تکمیلی"
                                    v-model="apartment_clone.description"
                                    variant="solo"
                            >
                            </v-textarea>
                        </v-col>
                        <v-divider></v-divider>

                        <v-col cols="12" sm="4" class="py-2 font-weight-bold">
                            <p class="text-grey-darken-3 mb-1" style="font-size: 9px">
                                {{ ' تاریخ بازدید' }}</p>
                            <date-picker v-model="apartment_clone.fill_info_date" format="YYYY-MM-DD"
                                         display-format="jYYYY-jMM-jDD"
                                         editable
                                         color="rgb(var(--v-theme-info))"
                                         placeholder=" تاریخ بازدید "></date-picker>
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
                                    label="توضیحات برداشت"
                                    v-model="apartment_clone.survey_description"
                                    variant="solo"
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-fade-transition>
            </v-col>

        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import {Aparteman, Arse, EnumField, Owner} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import {ApartmentNextPageFuncRes} from "@/map_modules/survey/components/aparteman/apartmenttRef";


export default defineComponent({
    name: "UnitInfoComponent",

    components: {},


    props: {
        apartment: {
            required: true,
            type: Object as PropType<Aparteman>
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()

        const {nameRule, floatRule, phoneRule} = rules()
        const {getEnumsTable,updateApartment,correctFloat,getRegistrationValues,registrationValues} = survey_functions()
        const initData = ref(false)
        const apartment_clone = ref<Aparteman>({...props.apartment})

        const code_floortype = ref<EnumField>()

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
                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            const arse :Arse = store.getters.getArseInfo

            if (!apartment_clone.value.fill_info_date){
                apartment_clone.value.fill_info_date = new Date().toISOString().slice(0, 10)
            }

            if (!apartment_clone.value.share_area&&!apartment_clone.value.share_arse_area&&arse.id){

                const res = await getRegistrationValues({arse_id:arse.id,unit_area:props.apartment.area})
                if (res){
                    apartment_clone.value = {...apartment_clone.value,...registrationValues.value}
                }
            }

            setTimeout(() => {
                initData.value = true
            }, 100)
        })

        return {
            correctFloat,store, toast, router, nameRule, floatRule, phoneRule, initData, code_floortype, apartment_clone,updateApartment
        }
    },

    data() {
        return {}
    },
    methods: {
        async nextPageFunc(): ApartmentNextPageFuncRes {

            // console.log(this.apartment_clone,'this.apartment_clone')

            const res  = await this.updateApartment(this.apartment_clone,this.apartment_clone.id)
            if (res){
                return {
                    error: null,
                    result: this.apartment_clone
                }
            }
            return {
                error: 'خطا در ذخیره اطلاعات',
                result: null
            }


        }
    },

    watch: {},


});
</script>


<style>


</style>
