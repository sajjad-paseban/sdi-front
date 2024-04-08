<template>

    <div class="" style=" height:100%;">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <p class="font-weight-bold pr-4"> اجرای مدل</p>
                <v-spacer></v-spacer>

                <v-btn
                        variant="flat"
                        size="x-small"
                        color="white"
                        class="ml-2"
                        @click="router.push({name:'analyzeModelsList'})"
                        style="font-weight: bold !important;width: 40px;height: 30px"
                        v-tooltip.right="'بازگشت به لیست مدل ها'"
                >
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/back.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>

                </v-btn>

            </v-row>


        </v-toolbar>
        <div style="height: calc(100% - 49px);overflow-y: hidden" class="">
            <v-row style="height:100%" class="ma-0 pa-0 " justify="center" align="center">
                <v-row class="ma-0 pa-0 " justify="center">
                    <v-col cols="12" sm="4" class="d-flex justify-center">
                        <div @click="runModel('showMap')" class="rounded-lg elevation-3 d-flex justify-center bg-indigo"
                             v-ripple style="height: 80px;width:150px;align-items: center;cursor: pointer">
                            نمایش در نقشه
                        </div>
                    </v-col>

                    <v-col cols="12" sm="4" class="d-flex justify-center">
                        <div @click="runModel('showTable')" class="rounded-lg elevation-3 d-flex justify-center bg-indigo"
                             v-ripple
                             style="height: 80px;width:150px;align-items: center;cursor: pointer">
                            نمایش در جدول
                        </div>
                    </v-col>

                    <v-col cols="12" sm="4" class="d-flex justify-center">
                        <div @click="runModel('exportAnalyze')"
                             class="rounded-lg elevation-3 d-flex justify-center bg-indigo" v-ripple
                             style="height: 80px;width:150px;align-items: center;cursor: pointer">
                            خروجی
                        </div>
                    </v-col>
                </v-row>
            </v-row>

            <simple-dialog
                    :show="showDialog"
                    topic="اجرای مدل"
                    width="60vw"
                    height="80vh"
                    :current_height="'80vh'"
                    @closeDialog="()=>{
                    showDialog = false
                    router.push({name:'runAnalyze'})
                }"
                    class="bg-grey-lighten-2"
            >
                <div style="height: 100%;width:100%;overflow-y: hidden">
                    <template v-if="dialogType === 'showMap'">
                        <View :page="false" :full-screen="true">
                            <template #default="{map}">
                                <show-features-with-click
                                        :field-show="analyzeItemValue.process.output_type === processOutput.Geometry?null:{field:'analyzeResult',nameShow:'نتیجه'}"
                                        :map="map"
                                        :features="mapFeatures"></show-features-with-click>
                            </template>
                        </View>
                    </template>

                    <template v-if="dialogType === 'showTable'">
                        <show-table :process-output="analyzeItemValue.process.output_type"
                                    :tableFeatures="tableFeatures"></show-table>
                    </template>

                    <template v-if="dialogType === 'exportAnalyze'">
                        <exportAnalyze :analyze_model="analyzeItemValue"></exportAnalyze>
                    </template>
                </div>
            </simple-dialog>
        </div>

    </div>

</template>

<script lang="ts">


    import {defineComponent, onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import View from "@/map_modules/mainPage/view.vue";
    import showFeaturesWithClick from "@/components/openLayers/click/showFeaturesWithClick.vue"
    import {AnalyzeExportType, AnalyzeRunResult, ProcessOutput} from "@/models/Analyze.interface";
    import ShowTable from '@/map_modules/analyze/runAnalyze/showTable.vue'
    import exportAnalyze from '@/map_modules/analyze/runAnalyze/exportAnalyze.vue'

    export default defineComponent({
        name: "RunModelAnalyze",
        components: {SimpleDialog, View, showFeaturesWithClick, ShowTable, exportAnalyze},

        setup() {

            const store = useStore()
            const route = useRoute()
            const toast = useToast()
            const router = useRouter()

            const {getAnalyzeItem, analyzeItemValue, runAnalyzeResult, runAnalyzeResultValueList} = analyze_functions()
            const {getJsonFeatureInfo} = source_functions()

            const processOutput = ProcessOutput

            onMounted(async () => {
                if (!route.params.id) {

                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'مدل مشخص نیست'
                    });
                    router.go(-1)
                } else {
                    await getAnalyzeItem(parseInt(String(route.params.id)))
                }
            })


            return {
                store, getAnalyzeItem, analyzeItemValue, router,toast,
                runAnalyzeResult, runAnalyzeResultValueList, getJsonFeatureInfo, processOutput
            }
        },

        data() {
            return {
                showDialog: false,
                dialogType: '',

                mapFeatures: [] as JSON[],
                tableFeatures: [] as AnalyzeRunResult[],
            };
        },
        props: {
            msg: String,
        },
        methods: {
            async runModel(runType: string) {
                if (this.analyzeItemValue) {

                    this.showDialog = true
                    if (this.runAnalyzeResultValueList.length == 0 && runType !== 'exportAnalyze') {
                        await this.runAnalyzeResult(this.analyzeItemValue.id)
                    }

                    if (runType === 'showMap') {

                        this.mapFeatures = []

                        if (this.analyzeItemValue.process.output_type === ProcessOutput.Geometry) {
                            this.runAnalyzeResultValueList.map((item: any) => {
                                if (item.feature && item.result) {
                                    item.feature.geometry = JSON.parse(item.result)
                                    this.mapFeatures.push(item.feature)
                                }
                            })
                        } else {
                            this.runAnalyzeResultValueList.map((item: any) => {
                                if (item.feature && item.result) {
                                    item.feature.properties['analyzeResult'] = item.result
                                    this.mapFeatures.push(item.feature)
                                }
                            })
                        }

                        this.dialogType = 'showMap'
                    } else if (runType === 'showTable') {
                        this.tableFeatures = this.runAnalyzeResultValueList
                        this.dialogType = 'showTable'

                    } else if (runType === 'exportAnalyze') {
                        if (this.analyzeItemValue.export_type == AnalyzeExportType.File || this.analyzeItemValue.export_type == AnalyzeExportType.Exel){
                            this.dialogType = 'exportAnalyze'
                        }else {
                            this.showDialog = false
                            this.toast.add({
                                group: 'br',
                                life: 4000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'این مدل خروجی فایل یا اکسل ندارد'
                            });
                        }


                    }
                }

            }
        },


        computed: {},
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .v-timeline--horizontal.v-timeline.v-timeline--side-end .v-timeline-item .v-timeline-item__body {
        padding-block-start: 1px !important;
    }

    .v-timeline--horizontal.v-timeline.v-timeline--side-end .v-timeline-item .v-timeline-item__opposite {

        padding-block-end: 7px !important;

    }
</style>
