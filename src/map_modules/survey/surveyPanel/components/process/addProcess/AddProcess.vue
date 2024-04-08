<template>
    <div>
        <div :style="$vuetify.display.smAndUp?'bottom:50px':'bottom:20px'"
             style="position: absolute;left:7px;height:50px;min-width:290px;z-index: 101;display: flex;flex-direction: row-reverse;align-content: center;flex-wrap: wrap;"
             class="bg-white rounded-lg elevation-3 px-1">
            <div style="display: flex;flex-direction: column;align-items: center;">
                <v-btn @click="activePage=pages[0].page" size="small" density="compact"
                       :color="activePage==pages[0].page?'info':'grey'" icon></v-btn>
                <span class="font-weight-bold mr-1" style="font-size: 12px">ممیزکار</span>
            </div>

            <div style="width:20px;border-top: 1px dashed grey;margin-top:10px" class=""></div>
            <div style="display: flex;flex-direction: column;align-items: center;">
                <v-btn @click="activePage=pages[1].page" size="small" density="compact"
                       :color="activePage==pages[1].page?'info':'grey'" icon></v-btn>
                <span class="font-weight-bold mx-1" style="font-size: 12px">کنترلر</span>
            </div>
            <div style="width:20px;border-top: 1px dashed grey;margin-top:10px" class=""></div>
            <div style="display: flex;flex-direction: column;align-items: center;">
                <v-btn @click="activePage=pages[2].page" size="small" density="compact"
                       :color="activePage==pages[2].page?'info':'grey'" icon></v-btn>
                <span class="font-weight-bold mx-n1" style="font-size: 12px">محدوده</span>
            </div>
            <div style="width:20px;border-top: 1px dashed grey;margin-top:10px" class=""></div>
            <div style="display: flex;flex-direction: column;align-items: center;">
                <v-btn @click="activePage=pages[3].page" size="small" density="compact"
                       :color="activePage==pages[3].page?'info':'grey'" icon></v-btn>
                <span class="font-weight-bold mr-n1" style="font-size: 12px">تنظیمات</span>
            </div>

            <v-spacer/>
            <v-btn @click="nextPage" class="mt-2" density="compact" color="info" size="small"
                   style="font-size: 10px;height:20px;width:60px">مرحله بعد
            </v-btn>
        </div>

        <v-btn @click="drawer=true" v-tooltip.left="'مشاهده نتیجه'" class="elevation-5 border-t"
               style="position: absolute;right:23px;bottom:168px;z-index: 101" icon size="small">
            <v-avatar size="25" class="">
                <v-img
                        class=""
                        src="@/assets/icons/list (2).png"
                        alt="John"
                ></v-img>
            </v-avatar>
        </v-btn>
        <router-view v-if="this.pages[2].page=='drawRegion'" :closeBtn="false" :map="map"/>
        <router-view v-else/>

        <ShowFeatures v-if="sub_map&&route.name !== 'drawRegion'" :map="sub_map"></ShowFeatures>
        <v-navigation-drawer
                v-model="drawer"
                location="right"
                class="rounded-lg pt-2"
                style="z-index: 10000001;width: max-content;height:calc(100% - 20px);margin-top: 18px"
                temporary
        >
            <div style="height: 100%;width: 100%;display: flex;justify-content: center;flex-direction: column;"
                 class="pa-2">
                <v-timeline side="end" align="start" class="mr-n3 ml-10">
                    <v-timeline-item
                            v-for="(item,index) in pages"
                            :key="index"
                            :dot-color="pages[index].color"
                            size="small"
                            class="m"
                    >
                        <div>
                            <v-row class="ma-0 pa-0 font-weight-bold">
                                <p>{{ pages[index].name }}</p>
                            </v-row>
                            <v-row class="ma-0 pa-0 mt-4" justify="center">
                                <p v-if="pages[index].value" style="font-size: 11px">{{ pages[index].value }}</p>
                                <p v-else style="font-size: 11px">خالی</p>
                            </v-row>
                        </div>
                    </v-timeline-item>

                </v-timeline>
            </div>
        </v-navigation-drawer>
    </div>


</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, provide, Ref, onUnmounted} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import MyChart from '@/map_modules/survey/surveyPanel/components/myChart/MyChart.vue'
import View from "@/map_modules/mainPage/view.vue";
import ShowFeatures from "@/map_modules/survey/components/mapComponents/showFeatures.vue";
import Feature from "ol/Feature";
import {AddProcessItem} from "@/api/surveyPanel/SD.Models/addProcess.sd";
import {SurveyMutations} from "@/store/survey/mutations";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {StoreActions} from "@/store";
import {default as map} from "ol/Map";


export default defineComponent({
    name: "AddProcessComponent",

    components: {View, MyChart, ShowFeatures},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        provide(/* key */ 'setSidebarInfo', /* value */ (index: number, value: string) => {
            pages.value[index].value = value
        })

        const {
            getProcessList,
            processList,
            processItem,
            addProcess,
            getProcessItem,
            processItemValue,updateProcess
        } = survey_panel_functions()
        const {featureToJson,zoomToFeatures} = source_functions()

        const initData = ref(false)
        const activePage = ref('selectWorker')
        const pages = ref([
            {
                page: 'selectWorker',
                name: 'ممیزکار',
                color: 'grey',
                value: ''
            },
            {
                page: 'selectChecker',
                name: 'کنترلر',
                color: 'teal-lighten-3',
                value: ''
            },
            {
                page: 'drawRegion',
                name: 'محدوده',
                color: 'blue',
                value: 'نامشخص'
            },
            {
                page: 'processConfig',
                name: 'تنظیمات',
                color: 'teal-lighten-1',
                value: 'تکمیل نشده'
            },
        ])
        const sub_map = computed(() => {
            return store.getters.getSubMap
        });
        const processId = ref(0)

        const regionFeature = ref<Feature | null>(null) as Ref<Feature>


        async function setProcessInitData(id: number) {
            await getProcessItem(id)
            regionFeature.value = processItemValue.value.feature
            processItem.value = {
                checker: processItemValue.value.checker.id,
                end_date: processItemValue.value.end_date,
                estimated_features: processItemValue.value.estimated_features,
                geometry: null,
                code:processItemValue.value.code,
                lock_in_place: processItemValue.value.lock_in_place,
                manager: processItemValue.value.manager.id,
                start_date: processItemValue.value.start_date,
                survey_person: processItemValue.value.survey_person.id
            }
            pages.value[0].value =`${processItemValue.value.survey_person.user.first_name} ${processItemValue.value.survey_person.user.last_name}`
            pages.value[1].value = `${processItemValue.value.checker.user.first_name} ${processItemValue.value.checker.user.last_name}`
            pages.value[2].value = 'ترسیم شده'
            pages.value[3].value = 'تکمیل شده'
            await router.push({name:'selectWorker'})
        }

        async function saveAddProcess() {
            if (processItem.value && regionFeature.value) {
                processItem.value.geometry = {geoJson: featureToJson(regionFeature.value, true)}
                let res = false
                if (processId.value !== 0) {
                    res = await updateProcess(processItem.value,processId.value)
                }else {
                    res = await addProcess(processItem.value)
                }

                if (res) {
                    toast.add({
                        group: 'tr',
                        life: 4000,
                        severity: 'success',
                        summary: ' نتیجه عملیات',
                        detail: 'درخواست ثبت شد'
                    });
                    processItem.value = {
                        checker: null,
                        end_date: null,
                        estimated_features: null,
                        geometry: null,
                        lock_in_place: true,
                        manager: null,
                        start_date: null,
                        survey_person: null
                    }
                    await router.push({name: 'surveyProcessList'})
                }
            } else {
                toast.add({
                    group: 'br',
                    life: 4000,
                    severity: 'error',
                    summary: 'خطا',
                    detail: 'اطلاعات تکمیل نیست'
                });
            }
        }

        async function setProcessFeatures() {
            const features: Feature[] = []
            processList.value.map((item, index) => {
                const f: Feature = item.feature.clone()
                f.set('panel', index)
                f.set('text', `${item.code}`)
                features.push(f)
            })
            await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
        }

        async function nextPage() {
            const active_index = pages.value.findIndex(x => x.page === activePage.value);
            console.log(processItem.value)
            if (active_index == 0) {
                if (processItem.value.survey_person == null) {
                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: 'خطا',
                        detail: 'ممیزی انتخاب نشده است'
                    });
                } else {
                    activePage.value = pages.value[active_index + 1].page
                }
            } else if (active_index == 1) {
                if (processItem.value.checker == null) {
                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: 'خطا',
                        detail: 'کنترلر انتخاب نشده است'
                    });
                } else {
                    await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
                    await getProcessList()
                    await setProcessFeatures()
                    await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
                    activePage.value = pages.value[active_index + 1].page
                }
            } else if (active_index == 2) {
                if (regionFeature.value !== null) {
                    await store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
                    activePage.value = pages.value[active_index + 1].page
                } else {
                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: 'خطا',
                        detail: 'ناحیه ای ترسیم نشده است'
                    });
                }
            } else if (active_index == 3 && processItem.value) {

                if (processItem.value?.start_date && processItem.value?.end_date && processItem.value?.estimated_features) {
                    await saveAddProcess()
                } else {
                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: 'خطا',
                        detail: 'اطلاعات فرم تکمیل نیست'
                    });
                }
            }
        }

        watch(() => store.getters.getDrawFeature, async (value: Feature | null) => {

            if (value) {
                regionFeature.value = value
                pages.value[2].value = 'ترسیم شده'
                await nextPage()
            }
        })


        onMounted(async () => {

            if (route.params.id && typeof route.params.id === 'string') {
                processId.value = parseInt(route.params.id)
                await setProcessInitData(parseInt(route.params.id))
            } else {
                processItem.value = {
                    checker: null,
                    end_date: null,
                    estimated_features: null,
                    geometry: null,
                    lock_in_place: true,
                    manager: null,
                    start_date: null,
                    survey_person: null
                }
            }
        })

        onUnmounted(() => {
            processItem.value = {
                checker: null,
                end_date: null,
                estimated_features: null,
                geometry: null,
                lock_in_place: true,
                manager: null,
                start_date: null,
                survey_person: null
            }
        })

        return {
            store,
            toast,
            router,
            route,
            initData,
            pages, getProcessList, processList, setProcessFeatures, nextPage,
            activePage, saveAddProcess, regionFeature, sub_map,zoomToFeatures

        }
    },

    data() {
        return {
            drawer: false
        }
    },
    methods: {},
    props: {
        map: {
            required: true,
            type: map
        }
    },
    watch: {
        activePage() {
            if (this.activePage == this.pages[2].page) {
                if (this.regionFeature) {
                    this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [this.regionFeature.clone()])
                    this.zoomToFeatures(this.sub_map,[this.regionFeature.clone()],[100,100,100,100])
                }else {
                    this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
                }
                this.router.push({name: this.activePage, params: {layer: 0}})
            }else if (this.activePage == this.pages[3].page ){
                if (this.regionFeature) {
                    this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [this.regionFeature.clone()])
                    this.zoomToFeatures(this.sub_map,[this.regionFeature.clone()],[100,100,100,100])
                }else {
                    this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
                }
                this.router.push({name: this.activePage})
            }else {
                this.router.push({name: this.activePage})
            }

        }
    },

});
</script>


<style>


</style>
