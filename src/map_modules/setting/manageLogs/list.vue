<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
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
            <div
                    class="ma-0 pa-0 px-2"
                    id="table"
                    style="height: calc(100% - 40px); margin-top: 10px !important"
            >

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
                            v-if="initData"
                            :headers="headers"
                            :items="RequestLogs"
                            :checkBox="false"
                            :height="height"
                            :filter-activate="tableFilterActivate"
                            style="background-color: white"
                    ></EditableTable>
                </v-fade-transition>
            </div>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import EditableTable from "@/components/common/editableTable.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import logs from "@/componentFunctions/logs_functions";



    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},

        setup() {
            const {RequestLogs, getLogs} = logs()

            const initData = ref(false)

            onMounted(async () => {
                await getLogs()


                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                RequestLogs, getLogs, initData
            }
        },

        data() {
            return {
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "ردیف", value: "row_number", width: "5%"},
                    {text: "تاریخ", value: "created_at", width: "10%"},
                    {text: "آدرس آیپی", value: "ip", width: "15%"},
                    {text: "نام کاربری", value: "user", width: "15%"},
                    {text: "مرورگر", value: "browser", width: "5%"},
                    {text: "سیستم عامل", value: "os", width: "10%"},
                    {text: "نوع درخواست", value: "method", width: "5%"},
                    {text: "بازگشت درخواست", value: "is_response", width: "5%"},
                    {text: "فایل", value: "has_file", width: "5%"},
                    {text: "خطا", value: "has_error", width: "5%"},
                    {text: "عملیات", value: "description", width: "25%"},
                ],


                // /-------table data---------/
            };
        },
        props: {},
        watch: {
            initData() {
                this.screenResizeHandler()
            }
        },
        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },
        },

        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 300);
        },

        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
