<template>
    <div style="height:100%;width:100%;overflow-y: hidden" class="">
        <div style="height:100%;width:100%" class="pa-2  myForm hideDetail">
            <v-btn @click="addJob" style="position: absolute;left:40px;bottom:60px;z-index: 1001" color="info"
                   icon="mdi-plus"></v-btn>
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
                <v-row v-if="initData&&businessUnitInfoList.length>0" class="ma-0 pa-0 rounded-lg font-weight-bold "
                       style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;width:100%"
                       justify="center">
                    <div v-for="(item,index) in businessUnitInfoList"
                         :key="item.id"
                         style="width: 100%"
                         class=" pa-1  ">
                        <div class="bg-white elevation-2 rounded-lg " style="border: 1px solid rgba(0,0,0,0.32)">
                            <v-row class="ma-0 pa-0 myForm pa-2 bg-grey-lighten-4 rounded-lg" style="font-size: 11px">
                                <v-col cols="6" sm="4" md="2" class=""
                                       style="height: 45px"
                                >
                                    <div class="bg-white elevation-2 border-t rounded pa-2"
                                         style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                        <p style="color:#0461be">{{ 'نام متصدی : ' }}</p>
                                        &nbsp;
                                        <template v-if="item.businessUnit_business?.business_BusinessPerson?.length>0">
                                            {{ item.businessUnit_business.business_BusinessPerson[0].person.last_name }}
                                        </template>
                                        <template v-else>
                                            {{ 'نامشخص' }}
                                        </template>
                                    </div>

                                </v-col>
                                <v-col cols="6" sm="4" md="2" class=""
                                       style="height: 45px;">
                                    <div class="bg-white elevation-2 border-t rounded pa-2"
                                         style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">

                                        <p style="color:#0461be">{{ 'نام شغل : ' }}</p>
                                        &nbsp;
                                        <template v-if="item.businessUnit_business">
                                            {{ item.businessUnit_business.name }}
                                        </template>
                                        <template v-else>
                                            {{ 'نامشخص' }}
                                        </template>
                                    </div>

                                </v-col>

                                <v-col v-if="code_businessjobreference&&item.businessUnit_business" cols="12" sm="4"
                                       md="3">
                                    <v-autocomplete
                                            class="border-t rounded"
                                            :items="code_businessjobreference.items"
                                            item-value="pk"
                                            v-model="item.businessUnit_business.business_job_reference"
                                            :readonly="true"
                                            density="compact"
                                            variant="solo"

                                            required
                                    >
                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="text-blue-darken-4">{{ code_businessjobreference.pName }}</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <template v-else>
                                    <v-col cols="12" sm="4" md="2"
                                           style="height: 45px">
                                        <div class="bg-white elevation-2 border-t rounded pa-2"
                                             style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                            <p style="color:#0461be">{{ 'مرجع شغلی : ' }}</p>
                                            &nbsp;
                                            {{ 'نامشخص' }}
                                        </div>


                                    </v-col>
                                </template>

                                <template v-if="item.businessUnit_business&&item.businessUnit_business.start_date">
                                    <v-col cols="6" sm="4" md="2" class=" mt-n1">
                                        <p class="text-grey-darken-3" style="font-size: 9px">{{ 'تاریخ شروع' }}</p>
                                        <date-picker :disabled="true" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                                     color="rgb(var(--v-theme-info))"
                                                     v-model="item.businessUnit_business.start_date "
                                        ></date-picker>
                                    </v-col>
                                </template>
                                <template v-else>
                                    <v-col cols="6" sm="4" md="2"
                                           class=""
                                           style="height: 45px">
                                        <div class="bg-white elevation-2 border-t rounded pa-2"
                                             style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                            <p style="color:#0461be">{{ 'تاریخ شروع : ' }}</p>
                                            &nbsp;
                                            {{ 'نامشخص' }}
                                        </div>

                                    </v-col>
                                </template>

                                <template v-if="item.businessUnit_business&&item.businessUnit_business.end_date">
                                    <v-col cols="6" sm="4" md="2" class="mt-n1">
                                        <p class="text-grey-darken-3" style="font-size: 9px">{{ 'تاریخ پایان' }}</p>
                                        <date-picker :disabled="true" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                                     color="rgb(var(--v-theme-info))"
                                                     v-model="item.businessUnit_business.end_date "
                                        ></date-picker>
                                    </v-col>
                                </template>
                                <template v-else>
                                    <v-col cols="6" sm="4" md="2"
                                           style="height: 45px;">
                                        <div class="bg-white elevation-2 border-t rounded pa-2"
                                             style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                            <p style="color:#0461be">{{ 'تاریخ پایان : ' }}</p>
                                            &nbsp;
                                            {{ 'نامشخص' }}
                                        </div>
                                    </v-col>
                                </template>

                                <v-col v-if="code_businessjobcategory&&item.businessUnit_business" cols="12" sm="4"
                                       md="2">
                                    <v-autocomplete
                                            v-if="code_businessjobcategory&&item.businessUnit_business"
                                            :items="code_businessjobcategory.items"
                                            item-value="pk"
                                            v-model="item.businessUnit_business.business_job_category"
                                            :readonly="true"
                                            density="compact"
                                            variant="solo"
                                            class=" border-t rounded"
                                            required
                                    >
                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="text-blue-darken-4">{{ code_businessjobcategory.pName }}</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <template v-else>
                                    <v-col cols="12" sm="4" md="2"
                                           style="height: 45px;">
                                        <div class="bg-white elevation-2 border-t rounded pa-2"
                                             style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                            <p style="color:#0461be">{{ 'رده شغل : ' }}</p>
                                            &nbsp;
                                            {{ 'نامشخص' }}
                                        </div>

                                    </v-col>
                                </template>

                                <v-col v-if="code_businesslevel&&item.businessUnit_business" cols="12" sm="4" md="2">
                                    <v-autocomplete
                                            v-if="code_businesslevel&&item.businessUnit_business"
                                            :items="code_businesslevel.items"
                                            item-value="pk"
                                            v-model="item.businessUnit_business.business_level"
                                            :readonly="true"
                                            density="compact"
                                            variant="solo"

                                            required
                                    >
                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="text-blue-darken-4">{{ code_businesslevel.pName }}</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <template v-else>

                                    <v-col cols="12" sm="4" md="2"
                                           style="height: 45px;">
                                        <div class="bg-white elevation-2 border-t rounded pa-2"
                                             style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                            <p style="color:#0461be">{{ 'درجه شغل : ' }}</p>
                                            &nbsp;
                                            {{ 'نامشخص' }}
                                        </div>

                                    </v-col>
                                </template>

                            </v-row>
                            <div style="height:40px;width:100%" class="bg-grey-lighten-1 border-t rounded-b-lg">
                                <v-row class="ma-0 pa-0 pr-1 border-t" justify="start" align="center"
                                       style="height: 100%">
                                    <v-btn
                                            icon
                                            variant="text"
                                            @click="editBusiness(item)"
                                            size="x-small"
                                            color="primary"
                                            style="font-weight: bold !important"
                                    >
                                        <v-img
                                                width="22"
                                                class=""
                                                src="@/assets/icons/see.png"
                                                alt="John"
                                        ></v-img>
                                    </v-btn>
                                    <div class="ma-0 pa-0 pa-1 mr-2 bg-white rounded-lg elevation-2"
                                         style="height:70%;width:190px!important;display: flex;flex-direction: column;flex-wrap: wrap;align-content: space-around;justify-content: space-evenly;">
                                        <p class="font-weight-bold" style="font-size:9px">
                                            {{ 'کد واحد شغلی  : ' }}</p>
                                        <p class="font-weight-bold" style="font-size:10px">
                                            {{ getBusinessUnitCode(item) }}</p>
                                    </div>

                                    <div class="ma-0 pa-0 pa-1 mr-2 bg-white rounded-lg elevation-2"
                                         style="height:70%;width:70px!important;display: flex;flex-direction: column;flex-wrap: wrap;align-content: space-around;justify-content: space-evenly;">
                                        <p class="font-weight-bold" style="font-size:9px">
                                            {{ 'ردیف شغلی : ' }}</p>
                                        <p class="font-weight-bold" style="font-size:9px">{{ item.code }}</p>
                                    </div>

                                </v-row>
                            </div>


                        </div>

                    </div>
                </v-row>
            </v-fade-transition>
            <v-fade-transition>
                <v-row v-if="initData&&businessUnitInfoList.length==0"  justify="center" align="center"
                       class="ma-0 pa-0"
                       style="height:100% ">
                    <v-col cols="12"
                           style="display: flex;flex-direction: column;align-content: center;flex-wrap: wrap;">

                        <v-img style="" height="250"
                               width="250"
                               cover=""
                               class="rounded-pill "
                               src="@/assets/gifs/shopStore.gif"
                               alt="John"
                        ></v-img>

                        <v-row class="ma-0 pa-0 mt-4" justify="center">
                            <p class="font-weight-bold">واحد شغلی ای یافت نشد</p>
                        </v-row>
                    </v-col>


                </v-row>
            </v-fade-transition>
        </div>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import {EnumField, BusinessInfo, Arse, BusinessUnitInfo} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";


export default defineComponent({
    name: "JobComponent",

    components: {},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {getEnumsTable, businessUnitInfoList, getBusinessUnitList, changeCodeDisplay} = survey_functions()

        const initData = ref(false)
        const code_businesslevel = ref<EnumField>()
        const code_businessjobcategory = ref<EnumField>()
        const code_businessjobreference = ref<EnumField>()

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_businesslevel') {
                        const items = await getEnumsTable({name: item.title})
                        code_businesslevel.value = {
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
                    if (item.title === 'code_businessjobreference') {
                        const items = await getEnumsTable({name: item.title})
                        code_businessjobreference.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            const arse: Arse = store.getters.getArseInfo
            if (arse && arse.id) {
                await getBusinessUnitList(arse.id)
            }
            setTimeout(() => {
                initData.value = true
            }, 200)
        })


        return {
            businessUnitInfoList, changeCodeDisplay,
            store, toast, router, initData, code_businesslevel, code_businessjobcategory, code_businessjobreference
        }
    },

    data() {
        return {
        }
    },
    methods: {
        addJob() {
            this.router.push({name: 'addJob'})
        },
        async editBusiness(item: BusinessUnitInfo) {
            await this.store.commit(SurveyMutations.SET_BUSINESS_UNIT_INFO, item)
            await this.router.push({name: 'editJob', params: {code: item.id}})
            let code = ''
            if (item.building && item.building.extra_info.code) {
                code = (item.building.extra_info.code + '000' + item.code)
            } else if (item.apartment) {
                code = (item.apartment.building.code + item.apartment.code + item.code)
            }
            await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_CODE, {
                name: 'job',
                code: code
            })

        },

        getBusinessUnitCode(item: BusinessUnitInfo) {
            if (item.building && item.building.extra_info.code) {
                return this.changeCodeDisplay((item.building.extra_info.code), 'building')
            } else if (item.apartment) {
                return this.changeCodeDisplay((item.apartment.building.code + item.apartment.code), 'apartment')
            }
        }
    },

    watch: {},


});
</script>


<style>


</style>
