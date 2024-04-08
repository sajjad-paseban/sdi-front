<template>

    <div class="pa-2 bg-grey-lighten-4" style="width: 100%; height: 100%;">

        <Fieldset legend="کارتابل" class="mr-1 ml-2  elevation-1">
            <p class="pb-2 font-weight-bold">
                در این صفحه امکان مشاهده انواع کارها و درخواست ها میباشد
            </p>

        </Fieldset>


        <div style="height:calc(100% - 70px);width:100%">
            <v-row class="ma-0 pa-0 pa-2" style="height:100%" justify="center" align="center">
                <v-col cols="12" style="height:90%" class="bg-white rounded-lg elevation-3 border-t pa-0 ma-0" id="table">


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
                        <EditableTable
                                ref="editTable"
                                class="rounded-lg"
                                v-if="initData"
                                :headers="headers"
                                :items="sample"
                                :checkBox="false"
                                :action="actions"
                                :height="height"
                                :filter-activate="true"
                                @actionClick="actionsClick"
                                style="background-color: white"
                        ></EditableTable>
                    </v-fade-transition>


                </v-col>
            </v-row>
        </div>


    </div>


</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue"
import Fieldset from "primevue/fieldset";
import EditableTable from "@/components/common/editableTable.vue";


export default defineComponent({
    name: "CarTableComponent",
    components: {EditableTable, Fieldset},

    setup() {
        const initData = ref(false)

        onMounted(()=>{
            setTimeout(()=>{
                initData.value=true
            },1000)
        })

        return {
            initData
        }
    },

    data() {
        return {
            // /-------table data---------/
            tableFilterActivate: false,

            height: "", //  برای اندازه ازتفاع جدول //

            headers: [
                {text: "شماره درخواست", value: "requestCode", width: "5%"},
                {text: "محدوده زمانی", value: "request_time", width: "10%"},
                {text: "بلوک برداشت", value: "block", width: "15%"},
                {text: "نام ایجاد کننده", value: "request_creator_name", width: "15%"},

            ],

            actions: [
                {
                    text: "ویرایش کد",
                    icon: "mdi-pencil-circle",
                    color: "info",
                },
                {
                    text: "مشاهده",
                    icon: "mdi-eye-circle",
                    color: "success",
                },

            ],

            sample:[
                {
                    id:1,
                    requestCode:'1223',
                    request_time:'1402/2/4-1403/2/3',
                    block:'2',
                    request_creator_name:'علی مرادی'
                },
                {
                    id:2,
                    requestCode:'1222',
                    request_time:'1402/2/4-1403/2/3',
                    block:'2',
                    request_creator_name:'علی مرادی'
                }
            ]
            // /-------table data---------/
        };
    },
    directives: {},

    props: {},
    methods: {
        screenResizeHandler() {
            let x: any = document.getElementById("table");
            this.height = String(x.offsetHeight);
        },


        actionsClick(value: string, item: any, items: any) {
            console.log(value,item,items,'ddddddddddd')
        },
    },
    //  برای اندازه ازتفاع جدول //
    created() {
        window.addEventListener("resize", this.screenResizeHandler);
    },
    unmounted() {
        window.removeEventListener("resize", this.screenResizeHandler);
    },
    watch: {
        initData() {
            this.screenResizeHandler()
        }
    },
    //  برای اندازه ازتفاع جدول //

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
