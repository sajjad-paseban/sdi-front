<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    در این صفحه میتوانید لیست پایگاه داده های متصل به سامانه را مشاهده
                    کنید .
                </p>
            </v-row>

            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    از پایگاه داده های موجود میتوان برای ایجاد انواع فیلد در هنگام ایجاد
                    عازضه استفاده کرد.همچنین میتوان از طرق دکمه افزودن اقدام به ایجاد
                    ارتباط جدید بفرمایید
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
                        @click="addRowDialog = true"
                        style="font-weight: bold !important"
                        v-tooltip.right="'اضافه کردن دیتابیس'"
                >
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/addRow.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>
            </v-row>
            <div class="ma-0 pa-0 px-2 databaseClass" id="table">

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
                            :items="databasesList"
                            :action="actions"
                            :checkBox="false"
                            :height="height"
                            :filter-activate="tableFilterActivate"
                            @actionClick="actionsClick"
                            style="background-color: white"
                    ></EditableTable>
                </v-fade-transition>
            </div>


        </div>

    </v-slide-y-transition>
    <simple-dialog
            :show="addRowDialog"
            topic="اضافه کردن دیتابیس"
            width="50vw"
            height="70vh"
            @closeDialog="addRowDialog = false"
    >
        <addDataBases @closeDialog="addRowDialog = false"></addDataBases>
    </simple-dialog>


    <simple-dialog
            :show="editRowDialog"
            topic="ویرایش کردن دیتابیس"
            width="50vw"
            height="70vh"
            @closeDialog="editRowDialog = false"
    >
        <editDataBases :id="editItemId" @closeDialog="editRowDialog = false"></editDataBases>
    </simple-dialog>
</template>

<script lang="ts">
    import EditableTable from "@/components/common/editableTable.vue";
    import addDataBases from "./add.vue";
    import editDataBases from "./edit.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import {useStore} from "vuex";
    import databases from "@/componentFunctions/connection_database_functions";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable, SimpleDialog, addDataBases,editDataBases},


        setup() {

            const {getDatabases, databasesList,deleteDataBase} = databases()

            const initData = ref(false)
            const store = useStore()

            onMounted(async () => {
                await getDatabases()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })
            return {
                initData, store, databasesList,getDatabases,deleteDataBase
            }
        },

        data() {
            return {
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "عنوان پایگاه داده", value: "topic", width: "20%"},
                    {text: "نوع", value: "type", width: "10%"},
                    {text: "هاست", value: "host", width: "20%"},
                    {text: "پورت", value: "port", width: "10%"},
                    {text: "نام پایگاه داده", value: "db_name", width: "20%"},
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
                ],

                // /-------table data---------/

                addRowDialog: false,
                editRowDialog:false,
                editItemId:0,
            };
        },

        watch: {
            initData() {
                this.screenResizeHandler()
            },
            async editRowDialog() {
                if (!this.editRowDialog) {
                    await this.getDatabases()
                }
            },
            async addRowDialog() {
                if (!this.addRowDialog) {
                    await this.getDatabases()
                }
            }
        },

        props: {},
        methods: {
            //------------------table-------------------//
            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.editItemId =parseInt(item.id)
                    this.editRowDialog = true

                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            await this.deleteDataBase({id: item.id})
                            await this.getDatabases()
                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
                }
            },

            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },
            //------------------table-------------------//
        },

        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 100);
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
<style>
    .databaseClass {
        height: calc(100% - 80px);
        margin-top: 10px !important;
    }

    @media only screen and (max-width: 900px) {
        .databaseClass {
            height: calc(100% - 40px);
            margin-top: 10px !important;
        }
    }
</style>
