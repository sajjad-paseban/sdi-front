<template>
    <div style="height:100%;width:100%" class="pa-2">
        <v-row class="pa-0 ma-0" style="height:100%" justify="center" align="center">
            <v-col cols="12" sm="10" id="table" style="height:70%" class="rounded-lg elevation-3 pa-0 bg-white">
                <v-row class="ma-0 pa-2" style="height:100%" align="center" justify="center">

                    <p class="font-weight-bold " style="font-size: 13px;line-height: 30px;">اگر از صحت اطلاعات عرصه مطمئن هستید ، برای ثبت اطلاعات ساختمان دکمه <span class="text-blue">اطلاعات ساختمان </span> را کلیک کنید .</p>

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
import {Arse} from "@/models/Survey.interface";
import {ArseNextPageFuncRes} from "@/map_modules/survey/components/arse/AresRef";



    export default defineComponent({
        name: "SaveArseComponent",

        components:{

        },

        props: {
            map: {
                required: true,
                type: map
            },
            arse: {
                required: true,
                type: Object as PropType<Arse>
            },

        },

        setup(props){
            const store = useStore();
            const toast = useToast()

            const arse_clone = ref<Arse>()

            onMounted(()=>{
                arse_clone.value = props.arse
            })

            return{
                store,toast,arse_clone
            }
        },

        data(){
            return{

            }
        },
        methods:{
            async nextPageFunc(): ArseNextPageFuncRes {
                if (this.arse_clone){
                    this.$router.push({name:'building'})

                }else {
                    return {
                        error:'اطلاعات عرصه وجود ندارد',
                        result:'null'
                    }
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
