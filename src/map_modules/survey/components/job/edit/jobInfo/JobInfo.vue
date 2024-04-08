<template>
    <div dir="rtl" style="height:100%;width:100%;overflow-y: hidden" class="">

        <div class="ma-0 pa-2 pr-4 myForm" style="height: calc(100%);width: 100%;overflow-y: hidden">
            <v-row class="ma-0 pa-0 " justify="center">
                <v-col cols="12" class="pa-2 bg-grey-lighten-4 rounded elevation-1">
                    <p style="font-size: 10px; line-height: 20px" class="">
                        در این پنجره باید اطلاعات مربوط به شغل را پر کنید .
                    </p>
                </v-col>
            </v-row>
            <div style="height: 10px"></div>
            <v-row class="ma-0 pa-0  rounded-lg elevation-2" style="height:calc(100% - 45px)">
                <v-tabs class="rounded-t-lg bg-grey-lighten-2" v-model="tab" color="primary" grow show-arrow>
                    <v-tab :value="item.route" v-for="item in items" :key="item.text">
                        <!-- <v-icon>mdi-{{ item.icon }}</v-icon> -->
                        {{ item.text }}
                    </v-tab>
                </v-tabs>

                <v-window v-model="tab" style="height: calc(100% - 31px);width: 100%;">
                    <template v-if="tab==='jobInformation'&&businessUnitInfo.id">
                        <JobInformation @saveBusinessInfo="saveBusinessInfo" :business-unit-id="businessUnitInfo.id"
                                        :business-info="businessUnitInfo.businessUnit_business"></JobInformation>
                    </template>
                    <template v-if="tab==='jobDetail'">
                        <JobDetail @saveDetailInfo="saveDetailInfo" :businessUnitInfo="businessUnitInfo"></JobDetail>
                    </template>
                    <template v-if="tab==='jobTableau'&&businessUnitInfo&&businessUnitInfo.businessUnit_business">
                        <JobTableau :businessUnitInfo="businessUnitInfo"
                                    :business-info="businessUnitInfo.businessUnit_business"></JobTableau>
                    </template>
                    <template v-if="tab==='jobTableau'&&businessUnitInfo&&!businessUnitInfo.businessUnit_business">
                        <JobTableau :businessUnitInfo="businessUnitInfo"></JobTableau>
                    </template>
                    <template v-if="tab==='jobHoliday'&&businessUnitInfo&&businessUnitInfo.businessUnit_business">
                        <JobHoliday @saveBusinessVacation="saveBusinessVacation" :business-info="businessUnitInfo.businessUnit_business"></JobHoliday>
                    </template>
                    <template v-if="tab==='jobPerson'&&businessUnitInfo&&businessUnitInfo.businessUnit_business">
                        <JobPerson @saveBusinessPerson="saveBusinessPerson"
                                   :business-info="businessUnitInfo.businessUnit_business"></JobPerson>
                    </template>
                </v-window>


            </v-row>

        </div>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";

import survey_functions from "@/componentFunctions/survey_functions";
import rules from "@/componentFunctions/rules_functions";
import JobInformation from "@/map_modules/survey/components/job/edit/jobInfo/JobInformation.vue";
import JobDetail from "@/map_modules/survey/components/job/edit/jobInfo/JobDetail.vue";
import JobTableau from "@/map_modules/survey/components/job/edit/jobInfo/JobTableau.vue";
import JobPerson from "@/map_modules/survey/components/job/edit/jobInfo/JobPerson.vue";
import JobHoliday from "@/map_modules/survey/components/job/edit/jobInfo/JobHoliday.vue";
import {BusinessInfo, BusinessPerson, BusinessUnitInfo, BusinessVacation} from "@/models/Survey.interface";


export default defineComponent({
    name: "JobInfoComponent",

    components: {JobInformation, JobDetail, JobTableau, JobPerson, JobHoliday},


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
        const {getEnumsTable} = survey_functions()
        const {nameRule, floatRule, phoneRule} = rules()


        return {
            store,
            toast,
            router,
            floatRule,

        }
    },

    data() {
        return {

            tab: 'jobInformation',

            items: [
                {
                    icon: "phone",
                    text: "اطلاعات شغل",
                    route: "jobInformation",
                },
                {
                    icon: "phone",
                    text: "جزیئات شغل",
                    route: "jobDetail",
                },
                {
                    icon: "phone",
                    text: "تابلو",
                    route: "jobTableau",
                },

                {
                    icon: "phone",
                    text: "اشخاص مرتبط",
                    route: "jobPerson",
                },

                {
                    icon: "phone",
                    text: "تعطیلات",
                    route: "jobHoliday",
                },


            ],


        }
    },
    methods: {

        saveBusinessInfo(data: BusinessInfo) {
            this.businessUnitInfo.businessUnit_business = data
        },

        saveDetailInfo(data: BusinessUnitInfo) {
            this.businessUnitInfo = data
        },

        saveBusinessPerson(items: BusinessPerson[]) {
            if (this.businessUnitInfo && this.businessUnitInfo.businessUnit_business && this.businessUnitInfo.businessUnit_business) {
                this.businessUnitInfo.businessUnit_business.business_BusinessPerson = items
            }
        },

        saveBusinessVacation(items: BusinessVacation[]) {
            if (this.businessUnitInfo && this.businessUnitInfo.businessUnit_business && this.businessUnitInfo.businessUnit_business.business_BusinessVacation) {
                this.businessUnitInfo.businessUnit_business.business_BusinessVacation = items
            }
        },


    },

    watch: {},


});
</script>


<style>


</style>
