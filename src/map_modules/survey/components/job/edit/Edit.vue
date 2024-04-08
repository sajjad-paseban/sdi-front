<template>
    <div style="height:100%;width:100%;overflow-y: hidden;position: relative" class="" dir="ltr">
        <v-scale-transition>
            <v-btn @click="router.push({name:'jobList'})" v-tooltip.right="'لیست واحد های شغلی'"
                   style="position: absolute;left:30px;bottom:75px;z-index: 1001" icon
                   class="elevation-4 border-t">
                <v-avatar size="35">
                    <v-img
                            class=""
                            src="@/assets/icons/dashboard.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>
        </v-scale-transition>
        <Splitter style="height: 100%" class="ma-0 pa-0 rounded-lg">
            <SplitterPanel class="" :size="85" style="overflow-y: auto !important" >
                <template v-if="group_selected.value === 'JobUnitInfo'&&selectedBusinessUnitInfo">
                    <job-unit-info-component @updateBusinessUnitInfo="updateBusinessUnitInfo" :business-unit-info="selectedBusinessUnitInfo"></job-unit-info-component>
                </template>

                <template v-if="group_selected.value === 'JobInfo'&&selectedBusinessUnitInfo">
                    <job-info-component :business-unit-info="selectedBusinessUnitInfo"></job-info-component>
                </template>
                <template v-if="group_selected.value === 'archive'">
                    <div dir="rtl" style="height:100%;width:100%;position: relative">
                        <router-view/>
                    </div>

                </template>
            </SplitterPanel>
            <SplitterPanel
                    dir="rtl"
                    class="rounded-lg"
                    style="overflow-y: auto !important; min-width: 55px !important"
                    :size="15"
            >
                <v-list
                        class="MyLayer"
                        :lines="false"
                        density="compact"
                        nav
                        @click:select="selectNav"
                        style=""
                >
                    <v-list-item
                            v-for="item in items"
                            :key="item.text"
                            :value="item"
                            :base-color="item.text === group_selected.text?'info':''"
                            :active="item.text === group_selected.text"
                    >
                        <template v-slot:prepend>
                            <v-avatar size="25" class="">
                                <v-img
                                        class=""
                                        :src="store.state.frontUrl +item.icon"
                                        alt="John"
                                ></v-img>
                            </v-avatar>
                        </template>

                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </SplitterPanel>
        </Splitter>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRoute, useRouter} from "vue-router";
import {EnumField, BusinessInfo, BusinessUnitInfo, Arse} from "@/models/Survey.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import JobUnitInfoComponent from "@/map_modules/survey/components/job/edit/JobUnitInfo.vue";
import JobInfoComponent from "@/map_modules/survey/components/job/edit/jobInfo/JobInfo.vue";
import Archive from "@/map_modules/survey/components/archive/Archive.vue";
import {SurveyMutations} from "@/store/survey/mutations";



export default defineComponent({
    name: "AddJobComponent",

    components: {
        Splitter, SplitterPanel,JobUnitInfoComponent,JobInfoComponent,Archive
    },



    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route =useRoute()
        const {getEnumsTable} = survey_functions()

        const selectedBusinessUnitInfo = ref<BusinessUnitInfo|null>(null)

        onMounted(()=>{
           selectedBusinessUnitInfo.value = store.getters.getBusinessUnitInfo
        })
        return {
            store, toast, router,route,selectedBusinessUnitInfo
        }
    },

    data() {
        return {
            items: [
                {text: "واحد شغلی", icon: "/icons/jobUnit.png", value: "JobUnitInfo", name: 'JobUnitInfo'},
                {text: "اطلاعات شغل", icon: "/icons/shopInfo.png", value: "JobInfo", name: 'JobInfo'},
                {text: "آرشیو", icon: "/icons/archive.png", value: "archive", name: 'archive'},
            ],

            group_selected: {text: "واحد شغلی", icon: "/icons/role.png", value: "JobUnitInfo", name: 'JobUnitInfo'} as any
        }
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        selectNav(item: any) {
            console.log(this.group_selected)

            this.group_selected = item.id
            if (this.group_selected.value === 'archive'){
                if (this.selectedBusinessUnitInfo&&this.selectedBusinessUnitInfo.id){
                    const arse:Arse = this.store.getters.getArseInfo
                    this.store.commit(SurveyMutations.SET_ARCHIVE_DATA,{business_unit_id:this.selectedBusinessUnitInfo.id,
                        arse_id:arse.id,
                        building_id:this.selectedBusinessUnitInfo.building?this.selectedBusinessUnitInfo.building.id:null,
                        apartment_id:this.selectedBusinessUnitInfo.apartment?this.selectedBusinessUnitInfo.apartment.id:null
                    })
                }
               setTimeout(()=>{
                   this.router.push({name:'jobArchiveList'})
               },300)
            }

        },

        updateBusinessUnitInfo(data:BusinessUnitInfo){
            this.selectedBusinessUnitInfo = data
        }
    },

    watch: {},


});
</script>


<style>
.MyLayer .v-list-item__prepend > .v-icon {
    margin-inline-end: 15px !important;
}

</style>
