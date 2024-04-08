<template>
    <v-slide-y-transition>
        <div
                class="pa-1"
                v-if="show"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    در این قسمت این امکان برای سامانه های دیگر فراهم میشود که با فرستادن
                    اطلاعات یک یا چند عارضه ، عکس آن عارضه همراه با برخی امکانات برای
                    نمایش مختلف عکس فراهم میشود.
                </p>
            </v-row>

            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    برای شروع باید مدلی جدید ایجاد نمایید و بعد از آن کافیست اطلاعات مربوط
                    به مدل را در صفحه رسم کروکی بفرستید تا کروکی را رسم کرده و عکس آن را
                    بفرستد.
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
                        @click="addModelDialog = true"
                        style="font-weight: bold !important"
                        v-tooltip.right="'APIاضافه کردن '"
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
            <div class="ma-0 pa-0 px-2 IPClass" id="table">
                <v-slide-y-transition>
                    <EditableTable
                            ref="editTable"
                            :headers="headers"
                            :items="desserts"
                            :checkBox="false"
                            :height="height"
                            :filter-activate="tableFilterActivate"
                            :action="actions"
                            style="background-color: white"
                    ></EditableTable>
                </v-slide-y-transition>
            </div>
        </div>
    </v-slide-y-transition>

    <simple-dialog
            :show="addModelDialog"
            topic="اضافه کردن مدل"
            width="70vw"
            min-width="400px"
            height="70vh"
            @closeDialog="addModelDialog = false"
    >
        <AddModel></AddModel>
    </simple-dialog>
</template>

<script lang="ts">
    import EditableTable, {TableValuesTypes} from "@/components/common/editableTable.vue";
    import {defineComponent} from "vue";
    import {toArabicNumber} from "@/assets/toFarsi";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import AddModel from "./addModel.vue";

    interface Item {
        key: string;
        label: string;
        children: Item[];
    }

    export default defineComponent({
        name: "listComponent",
        components: {EditableTable, SimpleDialog, AddModel},

        data() {
            return {
                show: false,

                addModelDialog: false,
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "شناسه", value: "code", width: "5%"},
                    {text: "نام مدل", value: "name", width: "20%"},
                    {text: "نام کاربر", value: "userName", width: "10%"},
                    {text: "رنگ داخلی عارضه", value: "color", width: "10%"},
                    {text: "شطرنجی", value: "checkered", width: "5%", type: TableValuesTypes.bool},
                    {text: "قطب نما", value: "Compass", width: "5%", type: TableValuesTypes.bool},
                    {text: "مقیاس", value: "scale", width: "5%", type: TableValuesTypes.bool},
                    {text: "پیشفرض", value: "default", width: "5%", type: TableValuesTypes.bool},

                ],

                desserts: [
                    {
                        code: "12",
                        name: "ملک",
                        userName: "ALI_20",
                        color: "red",
                        checkered: true,
                        Compass: true,
                        scale: true,
                        default: false,

                    },
                    {
                        code: "33",
                        name: "سنف",
                        userName: "ALI_20",
                        color: "red",
                        checkered: true,
                        Compass: true,
                        scale: true,
                        default: false,

                    },
                ] as any,

                actions: [
                    {
                        text: "edit",
                        icon: "mdi-pencil-circle",
                        color: "info",
                    },
                    {
                        text: "delete",
                        icon: "mdi-trash-can",
                        color: "error",
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
