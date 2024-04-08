<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    در این صفحه میتوانید کاربر هایی که به صورت آنلاین در سامانه قرار دارند
                    را رسد کنید و اطلاعاتی از قبیل نام کاربری و زمان ورود و خروج و ... را
                    مشاهده نمایید.
                </p>
            </v-row>

            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    در صورت لزوم میتوانید کاربر را به صورت دستی از سیستم خارج نمایید.
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

                <v-spacer/>
                <v-btn
                        variant="text"
                        size="small"
                        color="primary"
                        @click="logoutUser"
                        style="font-weight: bold !important"
                        v-tooltip.right="'خروج دستی'"
                >
                    <v-avatar size="22" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/logout.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
            </v-row>
            <div class="ma-0 pa-0 px-2 userLogiendClass" id="table">
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
                            :items="loggedUsers"
                            :checkBox="true"
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
    import EditableTable, {TableValuesTypes} from "@/components/common/editableTable.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import {toArabicNumber} from "@/assets/toFarsi";
    import logs from "@/componentFunctions/logs_functions";
    import {LoggedUserInterface} from "@/models/Logs.interface";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},

        setup() {
            const {getLoggedUserView,loggedUsers,logoutManuallyUser} = logs()

            const initData = ref(false)
            const editTable = ref<{getSelected():Array<any>;}>()

            onMounted(async () => {
                await getLoggedUserView()


                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                getLoggedUserView,loggedUsers, initData,editTable,logoutManuallyUser
            }
        },

        data() {
            return {
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                selected:[] as Array<any>,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "ردیف", value: "row_number", width: "5%"},
                    {text: "تاریخ ورود", value: "created_at", width: "10%"},
                    {text: "تاریخ انقضا", value: "created_at", width: "10%"},
                    {text: "نام کاربری", value: "user", width: "10%"},
                    {text: "آدرس آیپی", value: "ip", width: "10%"},
                    {text: "مرورگر", value: "browser", width: "10%"},
                    {text: "سیستم عامل", value: "os", width: "10%"},
                    {text: "مدل دستگاه", value: "device_model", width: "15%"},
                    {text: "فعال", value: "is_active", width: "5%",type:TableValuesTypes.bool},

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
            async logoutUser() {
                if (this.editTable) {
                    this.selected = this.editTable.getSelected()

                    const response =await this.logoutManuallyUser({ids: this.selected.map((item:LoggedUserInterface)=>{return item.fixed_token })})

                    if (response){
                        await this.getLoggedUserView()
                        this.$toast.add({
                            group: 'tr',
                            life: 7000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'کاربران انتخابی خارج شدند'
                        });
                    }
                }

            }
        },

        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },

        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 300);
        },
        //  برای اندازه ازتفاع جدول //
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .userLogiendClass {
        height: calc(100% - 80px);
        margin-top: 10px !important;
    }

    @media only screen and (max-width: 900px) {
        .userLogiendClass {
            height: calc(100% - 50px);
            margin-top: 10px !important;
        }
    }
</style>
