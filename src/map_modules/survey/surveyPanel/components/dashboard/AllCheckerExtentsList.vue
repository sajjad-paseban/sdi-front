<template>

    <div style="height:100%;width:100%;overflow-y: hidden" class=" ">
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
            <div v-if="initData&&route.name=='allCheckerExtentsList'" style="height:100%;width:100%;position: relative;" class="pa-1">
                <v-btn @click="router.go(-1)" v-tooltip.right="'لیست افراد'" class="elevation-5"
                       style="position: absolute;left:20px;bottom:20px" icon size="small">
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/back.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
                <v-btn @click="showFilter" v-tooltip.right="'فیلتر'" class="elevation-5"
                       style="position: absolute;left:20px;bottom:70px" icon size="small">
                    <v-avatar size="22" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/filter.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
                <v-btn @click="router.push({name:'allCheckerExtentsListChart'})" v-tooltip.right="'نمودار'" class="elevation-5"
                       style="position: absolute;left:20px;bottom:120px" icon size="small">
                    <v-avatar size="30" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/circleChart.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>

                <div style="height:100%;width:100%;overflow-y: auto" class="font-weight-bold pl-1">
                    <v-row v-if="showCheckerProcessList.length>0" class="ma-0 pa-0" justify="center">
                        <v-col cols="12" >
                            <div v-for="(item,index) in showCheckerProcessList"
                                 :key="index"
                                 style="width: 100%"
                                 class=" pa-1 my-1">
                                <div class="bg-white elevation-2 rounded-lg "
                                     style="border: 1px solid rgba(0,0,0,0.32)">
                                    <v-row class="ma-0 pa-0 myForm pa-2 bg-grey-lighten-4 rounded-lg"
                                           style="font-size: 10px">

                                        <v-col cols="6" sm="6" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'کد : ' }}</p>
                                                &nbsp;
                                                {{ item.code }}
                                            </div>

                                        </v-col>
                                        <v-col cols="6" sm="6" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'عارضه تخمینی : ' }}</p>
                                                &nbsp;
                                                {{ item.estimated_features }}
                                            </div>

                                        </v-col>
                                        <v-col cols="6" sm="4" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'نام ممیزکار :  ' }}</p>
                                                &nbsp;
                                                {{ `${item.survey_person.user.first_name} ${item.survey_person.user.last_name}` }}
                                            </div>

                                        </v-col>
                                        <v-col cols="6" sm="4" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'در دست کنترلر :  ' }}</p>
                                                &nbsp;
                                                {{ item.referral_to_checker }}
                                            </div>

                                        </v-col>

                                        <v-col cols="6" sm="4" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'ارجاع به مدیر : ' }}</p>
                                                &nbsp;
                                                {{ item.referral_to_manager }}
                                            </div>

                                        </v-col>
                                        <v-col cols="6" sm="4" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'بازگشت به ممیزکار : ' }}</p>
                                                &nbsp;
                                                {{ item.referral_to_survey }}
                                            </div>

                                        </v-col>
                                        <v-col cols="6" sm="6" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'تایید نهایی : ' }}</p>
                                                &nbsp;
                                                {{ item.finalConfirm }}
                                            </div>

                                        </v-col>
                                        <v-col cols="6" sm="6" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'تاریخ شروع : ' }}</p>
                                                &nbsp;
                                                {{ getDate(item.start_date) }}
                                            </div>

                                        </v-col>
                                        <v-col cols="6" sm="6" md="3" class=""
                                               style="height: 35px"
                                        >
                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                <p style="color:#0461be">{{ 'تاریخ پایان : ' }}</p>
                                                &nbsp;
                                                {{ getDate(item.end_date) }}
                                            </div>

                                        </v-col>


                                    </v-row>
                                    <div style="height:40px;width:100%" class="bg-grey-lighten-1 border-t rounded-b-lg">
                                        <v-row class="ma-0 pa-0 pr-3 border-t" justify="start" align="center"
                                               style="height: 100%">
                                            <v-btn
                                                    v-tooltip.top="'مشاهده'"
                                                    @click="router.push({name:'checkerProcessMelks',params:{id:item.id,code:item.code,name:user_name}})"
                                                    icon
                                                    variant="text"
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
                                            <v-btn
                                                    icon
                                                    v-if="false"
                                                    variant="text"
                                                    size="x-small"
                                                    color="primary"
                                                    style="font-weight: bold !important"
                                                    class="mr-2"
                                                    @click="chartDialog=true"
                                            >
                                                <v-img
                                                        width="25"
                                                        class=""
                                                        src="@/assets/icons/circleChart.png"
                                                        alt="John"
                                                ></v-img>
                                            </v-btn>
                                            <v-btn
                                                    v-tooltip.top="'زوم روی محدوده'"
                                                    @click="zoomToFeatures(sub_map,[item.feature],[100,100,100,100])"
                                                    icon
                                                    variant="text"
                                                    size="x-small"
                                                    color="primary"
                                                    class="mr-2"
                                                    style="font-weight: bold !important"
                                            >
                                                <v-img
                                                        width="27"
                                                        class=""
                                                        src="@/assets/icons/location.png"
                                                        alt="John"
                                                ></v-img>
                                            </v-btn>

                                            <div v-if="item.color" class="rounded mr-2  bg-white" style="width:22px;height:22px;">
                                                <div style="width:22px;height:22px;" class="rounded"
                                                     :style="`background-color : ${item.color}`"></div>
                                            </div>
                                        </v-row>
                                    </div>


                                </div>

                            </div>
                        </v-col>
                    </v-row>

                    <v-fade-transition>
                        <v-row v-if="showCheckerProcessList.length==0"  justify="center" align="center"
                               class="ma-0 pa-0"
                               style="height:100% ">
                            <v-col cols="12"
                                   style="display: flex;flex-direction: column;align-content: center;flex-wrap: wrap;">

                                <v-img style="" height="250"
                                       width="250"
                                       cover=""
                                       class="rounded-pill "
                                       src="@/assets/gifs/empty_state.gif"
                                       alt="John"
                                ></v-img>

                                <v-row class="ma-0 pa-0 mt-4" justify="center">
                                    <p class="font-weight-bold">موردی یافت نشد</p>
                                </v-row>
                            </v-col>


                        </v-row>
                    </v-fade-transition>

                </div>
            </div>
        </v-fade-transition>

        <v-fade-transition>
            <div v-if="initData&&route.name=='allCheckerExtentsListChart'" style="height:100%;width:100%;position: relative;"
                 class="pa-2 pl-1">
                <router-view :data="chartData" :columns="chartColumns"></router-view>
            </div>
        </v-fade-transition>




        <simple-dialog
                :show="filterDialog"
                :topic="'تنظیمات فیلتر'"
                width="50vw"
                :height="$vuetify.display.smAndUp?'60vh':'80vh'"
                :current_height="'80vh'"
                @closeDialog="filterDialog=false"
                class="bg-grey-lighten-2"
        >
            <Filter v-if="filterInitData" @do-filter="doFilter" :filterKeys="filterKeys"
                    :init="filterInitData"></Filter>
            <Filter v-else @do-filter="doFilter" :filterKeys="filterKeys"></Filter>

        </simple-dialog>

    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import MyChart from "@/map_modules/survey/surveyPanel/components/myChart/MyChart.vue";
import {ChartColumn, MyChartRefInterface} from "@/map_modules/survey/surveyPanel/components/myChart/myChartModels";
import Filter from "@/map_modules/survey/surveyPanel/components/myFilter/Filter.vue";
import {DoFilterResult, KeyModel} from "@/map_modules/survey/surveyPanel/components/myFilter/myFilterModels";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import {CheckerProcessItem, SurveyProcessItem} from "@/models/SurveyPanel.interface";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {Ref} from "vue/dist/vue";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";

export default defineComponent({
    name: "AllCheckerExtentsListComponent",

    components: {MyChart, SimpleDialog, Filter},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const initData = ref(false)
        const myChartRef = ref<MyChartRefInterface>()
        const {getCheckerProcessList,checkerProcessList,getDate} = survey_panel_functions()
        const {zoomToFeatures} = source_functions()

        const user_id = ref<number | null>(null)
        const user_name = ref<string>('')
        const showCheckerProcessList = ref<CheckerProcessItem[]>([]) as Ref<CheckerProcessItem[]>
        const sub_map = computed(() => {
            return store.getters.getSubMap
        });


        async function setShowFeatures() {
            const features: Feature[] = []
            const geoJsonFormat = new GeoJSON({})

            showCheckerProcessList.value.map((item, index) => {
                let find = false
                features.map((f) => {
                    if (JSON.stringify(geoJsonFormat.writeGeometry(f.getGeometry())) === JSON.stringify(geoJsonFormat.writeGeometry(item.feature.getGeometry()))) {
                        f.set('text', `${f.get('text')} \n ${item.code}`)
                        // if (f.get('text') !== `${item.user.first_name} ${item.user.last_name}`)
                        //     f.set('panel',index)
                        find = true
                    }
                })


                if (!find) {
                    const f: Feature = item.feature.clone()
                    f.set('panel', index)
                    f.set('text', `${item.code}`)
                    features.push(f)
                }
            })
            zoomToFeatures(sub_map.value,features,[50,50,50,50])
            await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
        }

        function setFeaturesColors() {
            const features = store.getters.getShowFeatures
            showCheckerProcessList.value.map((process) => {
                features.map((feature) => {
                    if (feature.get('text')) {
                        if (feature.get('text').includes(`${process.code}`)) {
                            const color = feature.getStyle()[0].getFill().getColor()
                            if (color) {
                                process.color = color
                            }

                        }
                    }

                })
            })

        }


        onMounted(async () => {

            if (route.params.id && typeof route.params.id === 'string'&&route.params.name&&typeof route.params.name === 'string') {
                user_id.value = parseInt(route.params.id)
                await getCheckerProcessList(parseInt(route.params.id))
                showCheckerProcessList.value = [...checkerProcessList.value]
                user_name.value =route.params.name
                store.commit(SurveyMutations.SET_PANEL_TOPIC, `کنترلر ${route.params.name} : لیست کل محدوده ها`)

                await setShowFeatures()
                setFeaturesColors()
            }

            initData.value = true
        })


        return {
            getDate,
            store,
            toast,
            router,
            route,
            initData,
            myChartRef,
            showCheckerProcessList,checkerProcessList,user_name,zoomToFeatures,sub_map,setShowFeatures,setFeaturesColors

        }
    },

    data() {
        return {

            chartDialog: false,
            chartColumns:[
                {name:'عارضه تخمینی',backcolor:'rgba(6,198,245,0.85)',borderColor:'rgba(6,198,245,0.85)'}
            ] as ChartColumn[],

            filterDialog: false,
            filterKeys: [] as KeyModel[],
            filterInitData: null as DoFilterResult | null,
        }
    },
    methods: {


        async doFilter(data: DoFilterResult) {
            this.showCheckerProcessList = [...this.checkerProcessList]
            data.keys.map((item) => {
                if (item.value !== null) {
                    if (item.name == 'end_date') {
                        this.showCheckerProcessList = this.showCheckerProcessList.filter((i) => {
                            if (i.end_date) {
                                return Date.parse(item.value[0]) < Date.parse(i.end_date) && Date.parse(i.end_date) < Date.parse(item.value[1])
                            } else return false

                        })
                    } else if (item.name == 'start_date') {
                        this.showCheckerProcessList = this.showCheckerProcessList.filter((i) => {
                            if (i.start_date) {
                                return Date.parse(item.value[0]) < Date.parse(i.start_date) && Date.parse(i.start_date) < Date.parse(item.value[1])
                            } else return false

                        })

                    } else if (item.name == 'survey_name') {
                        this.showCheckerProcessList = this.showCheckerProcessList.filter((i) => {
                            return `${i.survey_person.user.first_name} ${i.survey_person.user.last_name}`.includes(item.value)
                        })

                    } else {
                        this.showCheckerProcessList = this.showCheckerProcessList.filter((i) => {
                            if (item.type == 'string') {
                                return i[item.name].includes(item.value)
                            } else {
                                if (item.type === 'number') {
                                    return i[item.name] === parseFloat(item.value)
                                } else {
                                    return i[item.name] === item.value
                                }

                            }
                        })
                    }
                }

            })

            this.showCheckerProcessList.sort((a, b) => {
                if (data.sortValue == 'کم به زیاد') {
                    if (a[data.sortKeyName] < b[data.sortKeyName]) return -1
                    if (a[data.sortKeyName] > b[data.sortKeyName]) return 1
                    else return 0
                } else {
                    if (a[data.sortKeyName] < b[data.sortKeyName]) return 1
                    if (a[data.sortKeyName] > b[data.sortKeyName]) return -1
                    else return 0
                }

            })
            this.filterDialog = false
            this.filterInitData = data

            await this.setShowFeatures()
            this.setFeaturesColors()
        },
        showFilter(show:boolean) {
            this.filterKeys = [

                {
                    name: 'referral_to_checker',
                    f_name: 'در حال انجام',
                    type: 'number',
                    value: null
                },
                {
                    name: 'referral_to_manager',
                    f_name: 'ارجاع به مدیر',
                    type: 'number',
                    value: null
                },
                {
                    name: 'finalConfirm',
                    f_name: 'تایید نهایی',
                    type: 'number',
                    value: null
                },
                {
                    name: 'survey_name',
                    f_name: 'نام ممیزکار',
                    type: 'string',
                    value: null
                },
                {
                    name: 'referral_to_survey',
                    f_name: 'بازگشت به ممیزکار',
                    type: 'number',
                    value: null
                },
                {
                    name: 'estimated_features',
                    f_name: 'عارضه تخمینی',
                    type: 'number',
                    value: null
                },
                {
                    name: 'code',
                    f_name: 'کد',
                    type: 'string',
                    value: null
                },
                {
                    name: 'start_date',
                    f_name: 'تاریخ شروع',
                    type: 'date',
                    value: null
                },
                {
                    name: 'end_date',
                    f_name: 'تاریخ پایان',
                    type: 'date',
                    value: null
                },
            ]

            if (show)
                this.filterDialog = true
        },


    },

    mounted() {
        this.showFilter(false)
    },

    computed:{
        chartData(){
            return this.showCheckerProcessList.map((item)=>{

                const newItem = {}

                this.filterKeys.map((i)=>{
                    if (i.type === 'number'){
                        newItem[i.f_name] = item[i.name]
                    }
                })
                console.log(newItem)

                return {
                    name:`${item.code}`,
                    item:newItem
                }
            })
        }
    }

});
</script>


<style>


</style>
