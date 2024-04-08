<template>
    <div style="height:100%;width:100%" class="pa-2">
        <v-row class="pa-0 ma-0" style="height:100%" justify="center" align="center">
            <v-col cols="12" sm="10" id="table" style="height:70%" class="rounded-lg elevation-3 pa-0 bg-white">
                <v-row class="ma-0 pa-2" style="height:100%" align="center" justify="center">

                    <p class="font-weight-bold " style="font-size: 13px;line-height: 30px;">اگر از صحت اطلاعات ساختمان مطمئن هستید ، برای ثبت اطلاعات طبقات دکمه <span class="text-blue">اطلاعات طبقات </span> را کلیک کنید .</p>
                </v-row>

            </v-col>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";

    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {default as map} from "ol/Map";
import {Arse, SelectedBuilding} from "@/models/Survey.interface";
import {BuildingResultTableNextPageFuncRes} from "@/map_modules/survey/components/building/buildingProgressRef";
import {SurveyMutations} from "@/store/survey/mutations";
import survey_functions from "@/componentFunctions/survey_functions";
import {StoreActions} from "@/store";



    export default defineComponent({
        name: "SaveBuildingComponent",

        components:{

        },

        props: {

            selectedBuilding: {
                type: Object as PropType<SelectedBuilding | null>,
                required: true
            },

        },

        setup(props){
            const store = useStore();
            const toast = useToast()

            const {getArse, getArseInfo} = survey_functions()

            onMounted(()=>{
                console.log(props.selectedBuilding,'selected building in save building')
            })

            return{
                store,toast,getArse, getArseInfo
            }
        },

        data(){
            return{

            }
        },
        methods:{
            async nextPageFunc(): BuildingResultTableNextPageFuncRes {
                const arse:Arse = this.store.getters.getArseInfo
                if (arse&&arse.code){
                    await this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
                    await this.getArse(arse.code)
                    await this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
                    this.$router.push({name:'showFloorFeature'})
                    if (this.getArseInfo) {
                        await this.store.commit(SurveyMutations.SET_ARSE_INFO, this.getArseInfo)
                        return {
                            error:null,
                            result:null
                        }
                    }
                }
                return {
                    error:'خطا در ذخیره اطلاعات',
                    result:null
                }
            }
        },

        watch:{

        },



    });
</script>


<style>

    .p-splitter .p-splitter-gutter .p-splitter-gutter-handle {
        background: #0461be !important;
        transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    }

    .p-splitter .p-splitter-gutter {
        transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
        background: #adadad !important;
    }
</style>
