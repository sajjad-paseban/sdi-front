<template>

    <div dir="ltr">
        <v-btn v-if="!showWorkersDialog" dir="rtl" @click="showWorkersDialog=true" prepend-icon="mdi-account" size="small"
               class="font-weight-bold rounded-lg elevation-3" color="info" :style="$vuetify.display.smAndUp?'bottom:105px':'bottom:80px'"
               style="position: absolute;left:8px;z-index: 101;font-size:11px">
            انتخاب کنترلر
        </v-btn>

        <template v-if="showWorkersDialog">
            <popupWindow :topic="'انتخاب کنترلر'" :close-btn="true" v-if="winSize!==0" :resize="true" :top="winSize>500?'10px':'10px'"
                         :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
                         :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                         :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'50vh':'50vh'"
                         :width="winSize>500?'40vw':'80vw'" @closeWindow="showWorkersDialog=false">


                <v-card dir="rtl"
                        style="height: 100%;overflow-x:auto"
                        class="bg-white pa-0 rounded-b-lg myForm">
                    <div style="height:100%;width:100%;;position: relative;"
                         :style="winSize>500?'min-width:500px':'min-width:300px'" class="font-weight-bold ">
                        <v-row class="ma-0 pa-0" justify="center" style="height:100%;overflow-y: auto">
                            <v-col cols="12" style="">
                                <div v-for="(item,index) in showCheckerRegionInfoList"
                                     :key="index"
                                     style="width: 100%"
                                     class=" pa-1 my-1">
                                    <div class="bg-white elevation-2 rounded-lg "
                                         style="border: 1px solid rgba(0,0,0,0.32)">
                                        <v-row class="ma-0 pa-0 myForm pa-2 bg-grey-lighten-4 rounded-t-lg"
                                               style="font-size: 10px"
                                               :style="selectedWorker==item.id?'background-color: #1b7bc85e!important':''">

                                            <v-col cols="12" sm="6" class=""
                                                   style="height: 35px"
                                            >
                                                <div class="bg-white elevation-2 border-t rounded pa-2"
                                                     style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                    <p style="color:#0461be">{{ 'نام متصدی : ' }}</p>
                                                    &nbsp;
                                                    {{ item.user.first_name }} &nbsp;{{ item.user.last_name }}
                                                </div>

                                            </v-col>
                                            <v-col cols="12" sm="6" class=""
                                                   style="height: 35px"
                                            >
                                                <div class="bg-white elevation-2 border-t rounded pa-2"
                                                     style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                    <p style="color:#0461be">{{ 'تعداد کل ملک های محدوده : ' }}</p>
                                                    &nbsp;
                                                    {{ item.all_estimated_features }}
                                                </div>

                                            </v-col>
                                            <v-col cols="9" sm="6" class=""
                                                   style="height: 35px"
                                            >
                                                <div class="bg-white elevation-2 border-t rounded pa-2"
                                                     style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                    <p style="color:#0461be">{{ 'تعداد کل ملک های انجام شده :  ' }}</p>
                                                    &nbsp;
                                                    {{ item.features_done }}
                                                </div>

                                            </v-col>

                                            <v-col cols="6" sm="6" class=""
                                                   style="height: 35px"
                                            >
                                                <div class="bg-white elevation-2 border-t rounded pa-2"
                                                     style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                    <p style="color:#0461be">{{ 'درصد پیشرفت : ' }}</p>
                                                    &nbsp;
                                                    {{
                                                        item.features_done !== 0 ? (item.all_estimated_features / item.features_done * 100).toFixed(2) : 0
                                                    }}&nbsp;%
                                                </div>

                                            </v-col>
                                            <v-col cols="6" sm="6" class=""
                                                   style="height: 35px"
                                            >
                                                <div class="bg-white elevation-2 border-t rounded pa-2"
                                                     style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                    <p style="color:#0461be">{{ 'تاریخ پایان : ' }}</p>
                                                    &nbsp;
                                                    {{
                                                        item.biggest_end_date ? getDate(item.biggest_end_date) : 'بدون تاریخ'
                                                    }}
                                                </div>

                                            </v-col>


                                        </v-row>
                                        <div style="height:30px;width:100%"
                                             class="bg-grey-lighten-1 border-t rounded-b-lg">
                                            <v-row class="ma-0 pa-0 pr-3 border-t" justify="start" align="center"
                                                   style="height: 100%">

                                                <v-btn
                                                        v-if="item.id == selectedWorker"
                                                        icon
                                                        variant="text"
                                                        size="x-small"
                                                        color="primary"
                                                        style="font-weight: bold !important"
                                                        class=""
                                                >
                                                    <v-img
                                                            width="22"
                                                            class=""
                                                            src="@/assets/icons/active.png"
                                                            alt="John"
                                                    ></v-img>
                                                </v-btn>
                                                <v-btn
                                                        v-else
                                                        @click="selectWorker(item)"
                                                        icon
                                                        variant="text"
                                                        size="x-small"
                                                        color="primary"
                                                        style="font-weight: bold !important"
                                                        class=""
                                                >
                                                    <v-img
                                                            width="22"
                                                            class=""
                                                            src="@/assets/icons/circle.png"
                                                            alt="John"
                                                    ></v-img>
                                                </v-btn>

                                                <div v-if="item.color" class="rounded mr-2  bg-white"
                                                     style="width:20px;height:20px;">
                                                    <div style="width:20px;height:20px;" class="rounded"
                                                         :style="`background-color : ${item.color}`"></div>
                                                </div>

                                            </v-row>
                                        </div>


                                    </div>

                                </div>
                            </v-col>
                        </v-row>
                        <v-btn @click="showFilter" v-tooltip.right="'فیلتر'" class="elevation-5 border-t"
                               style="position: absolute;left:10px;bottom:10px" icon size="small">
                            <v-avatar size="22" class="">
                                <v-img
                                        class=""
                                        src="@/assets/icons/filter.png"
                                        alt="John"
                                ></v-img>
                            </v-avatar>
                        </v-btn>
                    </div>
                </v-card>
            </popupWindow>
        </template>

        <simple-dialog
                :show="filterDialog"
                :topic="'تنظیمات فیلتر'"
                width="50vw"
                :height="$vuetify.display.smAndUp?'50vh':'70vh'"
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
import {defineComponent, onMounted, watch, ref, computed, inject} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import popupWindow from "@/components/common/popupWindow.vue";
import Filter from "@/map_modules/survey/surveyPanel/components/myFilter/Filter.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {DoFilterResult, KeyModel} from "@/map_modules/survey/surveyPanel/components/myFilter/myFilterModels";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import {SurveyRegionInfo} from "@/models/SurveyPanel.interface";
import Feature from "ol/Feature";
import {SurveyMutations} from "@/store/survey/mutations";
import {StoreActions} from "@/store";
import {number} from "zod";



export default defineComponent({
    name: "SelectCheckerComponent",

    components: {SimpleDialog, Filter, popupWindow},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {getCheckerRegionInfo,checkerRegionInfoList,getDate,processItem} = survey_panel_functions()

        const initData = ref(false)
        const winSize = ref(0)
        const showWorkersDialog = ref(true)
        const showCheckerRegionInfoList = ref<SurveyRegionInfo[]>([])
        const selectedWorker = ref<null|number>(null)
        const setSidebarInfo = inject('setSidebarInfo')

        async function setShowFeatures() {
            const features: Feature[] = []
            showCheckerRegionInfoList.value.map((item,index) => {
                item.features.map((i) => {
                    const f: Feature = i.clone()
                    f.set('panel',index)
                    f.set('text', `${item.user.first_name} ${item.user.last_name}`)
                    features.push(f)
                })
            })
            await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
        }
        function setFeaturesColors(){
            const features = store.getters.getShowFeatures
            showCheckerRegionInfoList.value.map((user)=>{
                features.map((feature)=>{
                    if (feature.get('text')){
                        if (feature.get('text').includes(`${user.user.first_name} ${user.user.last_name}`)){
                            const color = feature.getStyle()[0].getFill().getColor()
                            if (color){
                                user.color = color
                            }

                        }
                    }

                })
            })

        }

        onMounted(async () => {
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
            await getCheckerRegionInfo()
            showCheckerRegionInfoList.value = [...checkerRegionInfoList.value]
            winSize.value = window.innerWidth
            await setShowFeatures()
            setFeaturesColors()
            if (processItem.value.checker){
                selectedWorker.value = processItem.value.checker
            }

            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        })
        return {
            store,
            toast,
            router,
            route,getDate,setSidebarInfo,
            initData,checkerRegionInfoList,showCheckerRegionInfoList,selectedWorker,
            winSize, showWorkersDialog,setShowFeatures,setFeaturesColors,processItem
        }
    },

    data() {
        return {

            filterDialog: false,
            filterKeys: [] as KeyModel[],
            filterInitData: null as DoFilterResult | null,
        }
    },
    methods: {
        selectWorker(item:SurveyRegionInfo){
            this.selectedWorker = item.id
            this.setSidebarInfo(1,`${item.user.first_name} ${item.user.last_name}`)
        },

        async doFilter(data: DoFilterResult) {
            this.showCheckerRegionInfoList = [...this.checkerRegionInfoList]
            data.keys.map((item) => {
                if (item.value !== null) {
                    if (item.name == 'userName') {
                        this.showCheckerRegionInfoList = this.showCheckerRegionInfoList.filter((i) => {
                            return `${i.user.first_name} ${i.user.last_name}`.includes(item.value)
                        })
                    } else if (item.name == 'biggest_end_date') {
                        this.showCheckerRegionInfoList = this.showCheckerRegionInfoList.filter((i) => {
                            if (i.biggest_end_date) {
                                return Date.parse(item.value[0]) < Date.parse(i.biggest_end_date) && Date.parse(i.biggest_end_date) < Date.parse(item.value[1])
                            } else return false

                        })

                    } else {
                        this.showCheckerRegionInfoList = this.showCheckerRegionInfoList.filter((i) => {
                            if (item.type == 'string') {
                                return i[item.name].includes(item.value)
                            } else {
                                console.log(typeof item.value, typeof i[item.name])
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

            this.showCheckerRegionInfoList.sort((a, b) => {
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
        showFilter() {
            this.filterKeys = [
                {
                    name: 'userName',
                    f_name: 'نام کنترلر',
                    type: 'string',
                    value: null
                },
                {
                    name: 'all_estimated_features',
                    f_name: 'تعداد کل ملک های محدوده',
                    type: 'number',
                    value: null
                },
                {
                    name: 'features_done',
                    f_name: 'تعداد کل ملک های انجام شده',
                    type: 'number',
                    value: null
                },
                {
                    name: 'biggest_end_date',
                    f_name: 'تاریخ پایان',
                    type: 'date',
                    value: null
                },


            ]

            this.filterDialog = true
        },
    },
    watch:{
        selectedWorker(){
            if (this.selectedWorker!== null){

                this.processItem.checker = this.selectedWorker
            }
        }
    }

});
</script>


<style>


</style>
