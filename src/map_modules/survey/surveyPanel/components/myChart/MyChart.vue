<template>

    <div style="height:100%;width:100%;overflow-y: hidden" class=" pa-1">
        <v-row class="ma-0 pa-0" style="height:calc(100% - 50px)">
            <Bar
                    v-if="showType=='bar'"
                    id="my-chart-id"
                    :options="chartOptions"
                    :data="chartData"
                    :dataset-id-key="'label'"
            />
            <Doughnut
                    v-if="showType=='circle'"

                    id="my-chart-id"
                    :options="chartOptions"
                    :data="chartData"
                    :dataset-id-key="'label'"
            />
            <Line
                    v-if="showType=='line'"
                    id="my-chart-id"
                    :options="chartOptions"
                    :data="chartData"
                    :dataset-id-key="'label'"
            />
        </v-row>
        <v-row class="ma-0 pa-0 px-2 mt-3 rounded-lg elevation-2 bg-white"
               style="height:40px;overflow-x:auto;display: flex;flex-wrap: nowrap;" align="center">
            <v-btn @click="changeShowType('bar')" style="" v-tooltip.top="'ستونی'" class="mx-2" variant="text"
                   :style="showType=='bar'?'background-color: rgba(95,95,95,0.4)':''" icon density="compact">
                <v-avatar size="22" class="">
                    <v-img
                            class=""
                            src="@/assets/icons/barChart.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>
            <v-btn v-show="false" @click="changeShowType('circle')"
                   :style="showType=='circle'?'background-color: rgba(95,95,95,0.4)':''" v-tooltip.top="'دایره ای'"
                   class="mx-2" variant="text" style="" icon density="compact">
                <v-avatar size="22" class="">
                    <v-img
                            class=""
                            src="@/assets/icons/circleChart.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>
            <v-btn @click="changeShowType('line')" :style="showType=='line'?'background-color: rgba(95,95,95,0.4)':''"
                   v-tooltip.top="'خطی'" class="mx-2" variant="text" style="" icon density="compact">
                <v-avatar size="22" class="">
                    <v-img
                            class=""
                            src="@/assets/icons/lineChart.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>


        </v-row>

        <simple-dialog
                :show="dialog"
                :topic="'تنظیمات نمودار'"
                width="50vw"
                height="60vh"
                :current_height="'80vh'"
                @closeDialog="dialog=false"
                class="bg-grey-lighten-2"
        >
            <v-row class="ma-0 pa-0 pt-2 bg-grey-lighten-3" style="height:100%;position: relative" justify="center">
                <v-btn @click="addItem" v-tooltip.top="'اضافه کردن ستون'" class="elevation-5"
                       style="position: absolute;left:20px;bottom:20px" color="info" icon="mdi-plus"
                       size="small"></v-btn>
                <v-col cols="12" sm="10" class="pr-4 pl-1" style="overflow-y: auto;height:100%">
                    <v-row v-for="(i,index) in columns_clone" :key="index" style="position: relative"
                           class="border-t rounded-lg elevation-2 pt-2 my-2  bg-white pa-0 ma-0 myForm">
                        <v-btn @click="removeItem(index)" v-tooltip.bottom="'حذف'" icon="mdi-close" density="compact"
                               color="error" style="position: absolute;right:-10px;top:-5px;z-index: 1001"
                               size="small"></v-btn>
                        <v-col cols="12" sm="6">
                            <v-autocomplete

                                    v-model="i.name"
                                    :items="settingFields"
                                    density="compact"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                </template>


                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">انتخاب فیلد</p>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="6" sm="6" style="display: flex;align-items: center">

                            <v-btn size="small" class="mt-1 font-weight-bold myForm" variant="tonal" color="info"> رنگ
                                داخلی
                                <v-menu :close-on-content-click="false" activator="parent"
                                        transition="slide-y-transition">
                                    <div class="bg-white myForm" style="height:100px;width:200px">
                                        <v-color-picker
                                                canvas-height="60"
                                                v-model="i.backcolor"
                                                hide-inputs></v-color-picker>
                                    </div>
                                </v-menu>
                            </v-btn>
                            <div class="rounded mr-6 mt-1" style="width:20px;height:20px;"
                                 :style="`background-color : ${i.backcolor}`"></div>
                        </v-col>
                        <v-col cols="6" sm="6" style="display: flex;align-items: center">
                            <v-btn size="small" class="mt-1 font-weight-bold myForm" variant="tonal" color="info"> رنگ
                                خط
                                <v-menu class="rounded-lg" :close-on-content-click="false" activator="parent"
                                        transition="slide-y-transition">
                                    <div class="bg-white myForm rounded-lg" style="height:100px;width:200px">
                                        <v-color-picker
                                                canvas-height="60"
                                                v-model="i.borderColor"
                                                hide-inputs></v-color-picker>
                                    </div>

                                </v-menu>
                            </v-btn>
                            <div class="rounded mr-6 mt-1" style="width:20px;height:20px;"
                                 :style="`background-color : ${i.borderColor}`"></div>

                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </simple-dialog>

    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {Chart, ArcElement} from 'chart.js'
import {Bar, Doughnut, Line} from 'vue-chartjs'
import {
    Title, Tooltip, Legend, BarElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js'
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {ChartColumn} from "@/map_modules/survey/surveyPanel/components/myChart/myChartModels";
import {object} from "zod";


export default defineComponent({
    name: "MyChartComponent",

    components: {SimpleDialog, Bar, Doughnut, Line},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const initData = ref(false)
        const columns_clone = ref<ChartColumn[]>([])


        Chart.register(ArcElement);
        Chart.defaults.font.family = "IRANSansWeb_UltraLight"
        Chart.defaults.font.weight = "bold"
        // Chart.defaults.datasets.bar.barThickness = 50;
        Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

        function prepareData() {
            console.log('s')
        }

        onMounted(() => {
            columns_clone.value = [...props.columns]
        })

        return {
            store,
            toast,
            router,
            route,
            initData, columns_clone

        }
    },

    props: {
        data: {
            type: Array,
            required: true
        },
        columns: {
            type: Array as PropType<ChartColumn[]>,
            required: true
        }
    },

    data() {
        return {
            showType: 'bar',
            dialog: false,
            colorTest: 'rgba(6,198,245,0.85)',
            items: [],
        }
    },

    computed: {
        chartData() {
            const labels = this.data.map((item) => {
                return item.name
            })

            const dataSets = this.columns_clone.map((column) => {
                const data = this.data.map((i) => {

                    return i.item[column.name]
                })
                return {
                    borderColor: column.borderColor,
                    label: column.name,
                    backgroundColor: column.backcolor,
                    data: data
                }
            })
            return {

                labels: labels,
                datasets: dataSets
            }
        },
        chartOptions() {
            return {
                responsive: true,
                onClick: this.clickEvent,
                maintainAspectRatio: false,

            }
        },
        settingFields() {
            if (this.data.length > 0) {
                return Object.keys(this.data[0].item)
            } else {
                return []
            }
        }
    },
    methods: {
        clickEvent(data) {
            console.log(data)
        },
        changeShowType(data: string) {
            this.showType = data
        },
        showDialog(data: boolean) {
            this.dialog = data
        },
        addItem() {
            this.columns_clone.push({...this.columns_clone[0]})
        },
        removeItem(index: number) {
            if (this.columns_clone.length>1){
                this.columns_clone.splice(index, 1)
            }else {
                this.toast.add({group: 'br', life: 4000, severity: 'error', summary: ' خطا در عملیات', detail: 'تعداد ستون ها نمیتواند صفر باشد'});
            }

        }
    }

});
</script>


<style>


</style>
