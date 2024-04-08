<template>

    <div style="height:100%;width:100%;overflow-y: auto" class=" ">
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
            <div  style="height:100%;width:100%;position: relative;"
                 class="pa-1">


                <v-btn @click="router.go(-1)" v-tooltip.right="'لیست فرایند ها'" class="elevation-5"
                       style="position: absolute;left:20px;bottom:20px;z-index: 1001" icon size="small">
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/back.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
                <div id="element" style="height:100%;width:100%;overflow-y: auto" class="font-weight-bold pl-1">
                    <v-row v-if="blockList_clone.length>0" class="ma-0 pa-0" justify="center">
                        <v-col cols="12">
                            <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold" style="z-index: 0">
                                <v-expansion-panel
                                        class="rounded-lg border"

                                        v-for="(block,i) in blockList_clone"
                                >
                                    <template v-slot:title>

                                        <v-row class="ma-0 pa-0 " style="height:100%">
                                            <div v-if="block.color" class="rounded mr-n3 mt-n1 ml-2  bg-white"
                                                 style="width:22px;height:22px;">
                                                <div style="width:22px;height:22px;" class="rounded"
                                                     :style="`background-color : ${block.color}`"></div>
                                            </div>
                                            <p>{{ block.code }}</p>

                                            <v-spacer/>
                                            <p :class="block.status==BlockStatusEnums.ReferralToManager?'text-green':'text-blue'"
                                               class="ml-4" style="font-size: 12px">
                                                {{ `${block.block_arse.length} ملک ${block.status}` }}</p>

                                        </v-row>
                                    </template>
                                    <template v-slot:text>
                                        <v-row class="ma-0 pa-0 myForm">
                                            <v-btn @click="blockDialog=true;selectedBlock=block" variant="tonal"
                                                   color="info"
                                                   prepend-icon="mdi-cog" class=" mr-n4 mb-1 font-weight-bold"
                                                   size="small">
                                                تنظیمات بلوک
                                            </v-btn>
                                            <v-text-field class="mr-2 mt-n1 ml-n3 mb-n2" clearable
                                                          v-model="block.searchText"
                                                          @update:model-value="searchCodeInBlock(block)"
                                                          density="compact" variant="solo"
                                                          required>
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="info" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">جستجوی کد نوسازی</p>
                                                </template>
                                            </v-text-field>
                                        </v-row>
                                        <div :style="`height:${expandHeight}px`" style="min-height:140px;overflow-y: auto " class="mx-n4 mb-n2">
                                            <div v-for="(item,index) in block.show_block_arse"
                                                 :key="index"
                                                 style="width: calc(100% - 5px)"
                                                 class=" my-1">
                                                <div class="bg-white elevation-2 rounded-lg "
                                                     style="border: 1px solid rgba(0,0,0,0.32)">
                                                    <v-row class="ma-0 pa-0 myForm  bg-grey-lighten-4 rounded-lg"
                                                           style="font-size: 10px">

                                                        <v-col cols="12" sm="6" md="4" class=""
                                                               style="height: 35px"
                                                        >
                                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                                <p style="color:#0461be">{{ 'کد نوسازی : ' }}</p>
                                                                &nbsp;
                                                                {{ item.code }}
                                                            </div>

                                                        </v-col>
                                                        <v-col cols="6" sm="6" md="4" class=""
                                                               style="height: 35px"
                                                        >
                                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                                <p style="color:#0461be">{{ 'مساحت : ' }}</p>
                                                                &nbsp;
                                                                {{ item.area }}
                                                            </div>

                                                        </v-col>

                                                        <v-col v-if="item.arse_log.length>0" cols="7" sm="6" md="4"
                                                               class=""
                                                               style="height: 35px"
                                                        >
                                                            <div class="bg-white elevation-2 border-t rounded pa-2"
                                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                                <p style="color:#0461be">{{ 'وضعیت : ' }}</p>
                                                                &nbsp;
                                                                {{ item.arse_log[(item.arse_log.length - 1)].status }}
                                                            </div>

                                                        </v-col>
                                                        <v-col cols="6" sm="6" md="4" class=""
                                                               style="height: 35px"
                                                        >
                                                            <div v-if="code_location"
                                                                 class="bg-white elevation-2 border-t rounded pa-2"
                                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                                <p style="color:#0461be">{{
                                                                        `${code_location.pName}`
                                                                    }}</p>
                                                                &nbsp;
                                                                {{
                                                                    getEnumsTableValue(code_location.items, item.code_location)
                                                                }}
                                                            </div>

                                                        </v-col>

                                                        <v-col cols="12" sm="6" md="4" class=""
                                                               style="height: 35px"
                                                        >
                                                            <div v-if="code_physical_natures"
                                                                 class="bg-white elevation-2 border-t rounded pa-2"
                                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                                                                <p style="color:#0461be">{{
                                                                        `${code_physical_natures.pName}`
                                                                    }}</p>
                                                                &nbsp;
                                                                {{
                                                                    getEnumsTableValue(code_physical_natures.items, item.code_physical_natures)
                                                                }}
                                                            </div>

                                                        </v-col>


                                                    </v-row>
                                                    <div style="height:30px;width:100%"
                                                         class="bg-grey-lighten-1 border-t rounded-b-lg">
                                                        <v-row class="ma-0 pa-0 pr-3 border-t" justify="start"
                                                               align="center"
                                                               style="height: 100%">
                                                            <v-btn
                                                                    @click="zoomToFeatures(sub_map,[item.feature],[100,100,100,100])"
                                                                    icon
                                                                    variant="text"
                                                                    size="x-small"
                                                                    color="primary"
                                                                    style="font-weight: bold !important"
                                                            >
                                                                <v-img
                                                                        width="20"
                                                                        class=""
                                                                        src="@/assets/icons/location.png"
                                                                        alt="John"
                                                                ></v-img>
                                                            </v-btn>
                                                            <v-btn

                                                                    icon
                                                                    variant="text"
                                                                    size="x-small"
                                                                    color="primary"
                                                                    style="font-weight: bold !important"
                                                                    class="mr-2"
                                                            >
                                                                <v-img
                                                                        width="20"
                                                                        class=""
                                                                        src="@/assets/icons/edit2.png"
                                                                        alt="John"
                                                                ></v-img>
                                                            </v-btn>
                                                            <v-btn

                                                                    icon
                                                                    variant="text"
                                                                    size="x-small"
                                                                    color="primary"
                                                                    style="font-weight: bold !important"
                                                                    class="mr-2"
                                                            >
                                                                <v-img
                                                                        width="20"
                                                                        class=""
                                                                        src="@/assets/icons/delete.png"
                                                                        alt="John"
                                                                ></v-img>
                                                            </v-btn>

                                                        </v-row>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>

                                    </template>
                                </v-expansion-panel>


                            </v-expansion-panels>

                        </v-col>
                    </v-row>

                    <v-fade-transition>
                        <v-row v-if="blockList_clone.length==0" justify="center" align="center"
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


        <simple-dialog
                :show="blockDialog"
                :topic="'اطلاعات بلوک'"
                width="50vw"
                :height="$vuetify.display.smAndUp?'':'65vh'"
                :current_height="'80vh'"
                @closeDialog="blockDialog=false"
                class="bg-grey-lighten-2"
        >

            <NextLevel @close="closeNextLevel" v-if="selectedBlock" :block="selectedBlock"></NextLevel>
        </simple-dialog>

    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, Ref, onUnmounted} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import ArseInfo from "@/map_modules/survey/components/arse/ArseInfo.vue";
import SaveArse from "@/map_modules/survey/components/arse/SaveArse.vue";
import SidesInfo from "@/map_modules/survey/components/arse/sidesInfo/SidesInfo.vue";
import ArseExtraInfo from "@/map_modules/survey/components/arse/ArseExtraInfo.vue";
import {SurveyMutations} from "@/store/survey/mutations";
import ArseBaseInfoComponent from "@/map_modules/survey/components/arse/ArseBaseInfo.vue";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import * as jalali from 'jalali-moment';
import {
    AllUsersList,
    ArseItem,
    ArseStatusEnums, BlockItem, BlockStatusEnums,
    CheckerRegionInfo, ShowBlockItem,
    SurveyRegionInfo
} from "@/models/SurveyPanel.interface";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import Filter from "@/map_modules/survey/surveyPanel/components/myFilter/Filter.vue";
import {DoFilterResult, KeyModel} from "@/map_modules/survey/surveyPanel/components/myFilter/myFilterModels";
import {ChartColumn} from "@/map_modules/survey/surveyPanel/components/myChart/myChartModels";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import {EnumField, EnumsTableItem} from "@/models/Survey.interface";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import source_functions from "@/components/openLayers/componentFunctions/source";
import preventDefault from "@ckeditor/ckeditor5-ui/src/bindings/preventdefault";
import NextLevel from '@/map_modules/survey/surveyPanel/components/components/NextLevel.vue'
import {FillColors} from "@/components/openLayers/textStyle/TextStyle.interface";

export default defineComponent({
    name: "ProcessMelksComponent",
    computed: {
        BlockStatusEnums() {
            return BlockStatusEnums
        }
    },

    components: {SimpleDialog, Filter, NextLevel},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {getProcessBlockList,processBlockList} = survey_panel_functions()
        const {getEnumsTable} = survey_functions()
        const {zoomToFeatures} = source_functions()

        const initData = ref(false)
        const blockList_clone = ref<BlockItem[]>([]) as Ref<ShowBlockItem[]>
        const code_location = ref<EnumField>()
        const code_physical_natures = ref<EnumField>()
        const sub_map = computed(() => {
            return store.getters.getSubMap
        });
        const selectedBlock = ref<BlockItem | null>(null) as Ref<BlockItem | null>
        const myObserver = new ResizeObserver(calculateHeight)
        const expandHeight = ref('')
        const routeId = ref(0)
        const blockDialog = ref(false)

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding

            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_location') {
                        const items = await getEnumsTable({name: item.title})
                        code_location.value = {
                            pName: item.alias,
                            items: items
                        }
                    }

                    if (item.title === "code_physicalnatures") {
                        const items = await getEnumsTable({name: item.title})
                        code_physical_natures.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                })
            )

        }

        async function setShowFeatures() {
            const features: Feature[] = []

            blockList_clone.value.map((block, index) => {
                block.color = FillColors[index]
                block.block_arse.map((item) => {
                    const f: Feature = item.feature.clone()
                    f.set('panel', index)
                    f.set('text', `${item.code}`)
                    features.push(f)
                })
            })

            zoomToFeatures(sub_map.value, features, [100, 100, 100, 100])
            await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
        }

        function calculateHeight(element:any) {
            const elementHeight = element[0].target.offsetHeight
            expandHeight.value = String((elementHeight - ((blockList_clone.value.length + 1) * 55)))
        }

        async function closeNextLevel() {
            blockDialog.value=false
            await getProcessBlockList(routeId.value)
            blockList_clone.value = processBlockList.value.map((block) => {
                return {...block, show_block_arse: block.block_arse, searchText: ''}
            })

            await setShowFeatures()

            setTimeout(() => {
                myObserver.observe(document.getElementById('element'))
            }, 200)
        }


        onMounted(async () => {


            if (route.params.id && typeof route.params.id === 'string') {

                await setCodingFieldsName()

                routeId.value = parseInt(route.params.id)


                await getProcessBlockList(parseInt(route.params.id))
                blockList_clone.value = processBlockList.value.map((block) => {
                    return {...block, show_block_arse: block.block_arse, searchText: ''}
                })

                await setShowFeatures()

                setTimeout(()=>{
                    myObserver.observe(document.getElementById('element'))
                },200)

            }

            initData.value = true
        })

        onUnmounted(()=>{
            myObserver.disconnect()
        })


        return {
            store,
            toast,
            router,
            route, zoomToFeatures, sub_map, selectedBlock,expandHeight,closeNextLevel,blockDialog,
            initData, blockList_clone, processBlockList, code_location, code_physical_natures

        }
    },

    data() {
        return {



        }
    },
    methods: {



        getEnumsTableValue(items: EnumsTableItem[], value: any) {
            let res = ''
            items.map((item) => {
                if (item.pk == value) {
                    res = item.title
                }
            })

            return res

        },

        searchCodeInBlock(value: ShowBlockItem) {
            if (value.searchText) {
                value.show_block_arse = value.block_arse.filter((arse) => {
                    return arse.code.includes(value.searchText)
                })
            } else {
                value.show_block_arse = value.block_arse
            }

        }

    },

});
</script>


<style>


</style>
