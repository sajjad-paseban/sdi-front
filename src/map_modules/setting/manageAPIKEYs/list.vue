<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    در این صفحه به کاربران پیشرفته این امکان را میدهد که بدون لاگین مردن
                    بتوانند از Api های سیستم در برنامه خود استفاده کنند .
                </p>
            </v-row>

            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    برای استفاده باید مدت اعتبار و نوع متد و تعداد در خواست و کاربر مورد
                    نظر انتخاب شود.
                </p>
            </v-row>

            <v-row class="pa-0 ma-0">
                <v-btn
                        variant="text"
                        size="small"
                        color="primary"
                        @click="tableFilterActivate = !tableFilterActivate"
                        style="font-weight: bold !important"
                        v-tooltip.left="'فیلتر'"
                >
                    <v-avatar size="22" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/filter.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
            </v-row>
            <div class="ma-0 pa-0 px-2 IPClass" id="table">
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
                            :headers="headers"
                            v-if="initData"
                            :items="keysList"
                            :checkBox="false"
                            :height="height"
                            :action="actions"
                            @actionClick="actionsClick"
                            :filter-activate="tableFilterActivate"
                            style="background-color: white"
                    ></EditableTable>
                </v-fade-transition>
            </div>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import staticJWTs from "@/componentFunctions/staticJWT_functions";
import EditableTable from "@/components/common/editableTable.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import {useStore} from "vuex";




    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},

        setup(){

            const{keysList,getKeys,deleteJWT}=staticJWTs()

            const initData = ref(false)
            const store = useStore()

            onMounted(async () => {

                await getKeys()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return{
                keysList,getKeys,store,initData,deleteJWT
            }
        },

        data() {
            return {
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "نام کاربری", value: "user", width: "15%"},
                    {text: "شروع تاریخ اعتبار", value: "start_time", width: "20%"},
                    {text: "پایان تاریخ اعتبار", value: "expire", width: "20%"},
                    {text: "تعداد درخواست در دقیقه", value: "max_request_per_min", width: "5%"},
                    {text: "فعال", value: "is_active", width: "10%"},
                ],


                actions: [
                    {
                        text: "ویرایش",
                        icon: "mdi-pencil-circle",
                        color: "info",
                    },
                    {
                        text: "حذف",
                        icon: "mdi-trash-can",
                        color: "error",
                    },
                    {
                        text: "کپی کلید",
                        icon: "mdi-content-copy",
                        color: "success",
                    },

                ],

                // /-------table data---------/
            };
        },
        props: {},
        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },

            copy(text:string){
                const input = document.createElement('textarea');
                input.innerHTML = text;
                document.body.appendChild(input);
                input.select();
                var result = document.execCommand('copy');
                document.body.removeChild(input);
                console.log(result)
            },

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.$router.push({
                        name:'editKEY',
                        params:{data:item.id}
                    })
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            await this.deleteJWT({id: item.id})
                            await this.getKeys()
                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
                }else if(value === "کپی کلید"){
                    this.copy(item.access_token)
                }
            },
        },

        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //

        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 300);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .IPClass {
        height: calc(100% - 90px);
        margin-top: 10px !important;
    }

    @media only screen and (max-width: 900px) {
        .IPClass {
            height: calc(100% - 40px);
            margin-top: 10px !important;
        }
    }
</style>
