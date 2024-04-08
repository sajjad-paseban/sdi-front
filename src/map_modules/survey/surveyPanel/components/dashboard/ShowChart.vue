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
            <div style="height:100%;width:100%;position: relative;" class="pa-2 pl-1">

                <v-btn @click="myChartRef?.showDialog(true)" v-tooltip.right="'تنظیمات'" class="elevation-5" style="position: absolute;left:20px;bottom:15px" icon size="small">
                    <v-avatar size="28" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/setting.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
                <v-btn @click="router.go(-1)" v-tooltip.right="'لیست محدوده ها'" class="elevation-5" style="position: absolute;left:20px;bottom:65px" icon size="small">
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/back.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
                <v-row style="height:100%;overflow-y: auto;" class="font-weight-bold ma-0 pa-0"  >
                    <v-spacer/>
                    <div style="width:70%;height:95%">
                        <my-chart :data="data" :columns="columns" ref="myChartRef"></my-chart>
                    </div>
                    <v-spacer/>
                    <v-spacer/>

                </v-row>
            </div>
        </v-fade-transition>




    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import MyChart from '@/map_modules/survey/surveyPanel/components/myChart/MyChart.vue'
import {
    ChartColumn,

    MyChartRefInterface
} from "@/map_modules/survey/surveyPanel/components/myChart/myChartModels";


export default defineComponent({
    name: "ShowChartComponent",

    components: {MyChart},

    props:{
        data:{
            type:Array,
            required:true
        },
        columns:{
            type:Array as PropType<ChartColumn[]>,
            required:true
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const initData = ref(false)
        const myChartRef = ref<MyChartRefInterface>()

        onMounted(() => {
            setTimeout(() => {
                // store.commit(SurveyMutations.SET_PANEL_TOPIC,'علی ناصری : نمودار کل محدوده ها')
                initData.value = true
            }, 1000)
        })


        return {
            store,
            toast,
            router,
            route,
            initData,
            myChartRef

        }
    },

    data() {
        return {

        }
    },

});
</script>


<style>


</style>
