<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f3"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    در این صفحه میتوانید لیست سرویس های مربوط به Geoserver را مشاهده کرد.
                </p>
            </v-row>

            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    با زدن دکمه افزودن میتوانید سرویس جدیدی به سامانه اضافه کرده و از آن
                    در بخش ایجاد لایه با سرویس استفاده کرد
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
                        v-tooltip.right="'اضافه کردن سرویس'"
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

            <div class="ma-0 pa-0 px-2 serviceClass" id="table">
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
                            :items="servicesList"
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
            topic="اضافه کردن سرویس"
            width="50vw"
            height="70vh"
            @closeDialog="addRowDialog = false"
    >
        <addService  @closeDialog="addRowDialog = false"></addService>
    </simple-dialog>
    <simple-dialog
            :show="editRowDialog"
            topic="ویرایش کردن سرویس"
            width="50vw"
            height="70vh"
            @closeDialog="editRowDialog = false"
    >
        <editService :id="editItemId" @closeDialog="editRowDialog = false"></editService>
    </simple-dialog>
</template>

<script lang="ts">
    import EditableTable from "@/components/common/editableTable.vue";
    import addService from "./add.vue";
    import editService from "./edit.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import {toArabicNumber} from "@/assets/toFarsi";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import services from "@/componentFunctions/connection_service_functions";
    import {useStore} from "vuex";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable, SimpleDialog, addService,editService},

        setup() {

            const {getServices, servicesList,deleteService} = services()

            const initData = ref(false)
            const store = useStore()

            onMounted(async () => {
                await getServices()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })
            return {
                initData, store, servicesList,getServices,deleteService
            }
        },

        data() {
            return {
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "عنوان", value: "topic", width: "10%"},
                    {text: "آدرس", value: "address", width: "30%"},
                    {text: "نوع", value: "type", width: "10%"},
                    {text: "نسخه", value: "version", width: "5%"},
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
                show: false,

                addRowDialog: false,
                editRowDialog:false,
                editItemId:0,
            };
        },
        props: {},
        watch: {
            initData() {
                this.screenResizeHandler()
            },
            async editRowDialog() {
                if (!this.editRowDialog) {
                    await this.getServices()
                }
            },
            async addRowDialog() {
                if (!this.addRowDialog) {
                    await this.getServices()
                }
            }
        },
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
                            await this.deleteService({id: item.id})
                            await this.getServices()
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
    .serviceClass {
        height: calc(100% - 80px);
        margin-top: 10px !important;
    }

    @media only screen and (max-width: 900px) {
        .serviceClass {
            height: calc(100% - 40px);
            margin-top: 10px !important;
        }
    }
</style>
