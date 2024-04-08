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
                            :headers="headers"
                            v-if="initData"
                            :items="tableData"
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
            topic="اضافه کردن api"
            width="50vw"
            height="70vh"
            @closeDialog="addRowDialog = false"
    >
        <addApi @closeDialog="addRowDialog = false"></addApi>
    </simple-dialog>
    <simple-dialog
            :show="editRowDialog"
            topic="ویرایش کردن api"
            width="50vw"
            height="70vh"
            @closeDialog="editRowDialog = false"
    >
        <editApi :id="editItemId" @closeDialog="editRowDialog = false"></editApi>
    </simple-dialog>
</template>

<script lang="ts">
    import EditableTable from "@/components/common/editableTable.vue";
    import addApi from "./add.vue";
    import editApi from "./edit.vue";
    import {defineComponent, onMounted, ref} from "vue";

    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import {useStore} from "vuex";
    import ExternalApis from "@/componentFunctions/connection_externalApi_functions";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable, SimpleDialog, addApi,editApi},

        setup() {
            const {getExternalApis,deleteExternalApi,ExternalApisList} = ExternalApis()

            const initData = ref(false)
            const store = useStore()

            onMounted(async () => {
                await getExternalApis()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })
            return {
                initData, store, ExternalApisList,getExternalApis,deleteExternalApi
            }
        },

        data() {
            return {
                show: false,
                tableData:[] as {topic:string,address:string,method:string,depend_api:string|null,id?:number}[],
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "عنوان", value: "topic", width: "15%"},
                    {text: "آدرس", value: "address", width: "30%"},
                    {text: "نوع", value: "method", width: "10%"},
                    {text: "api وابسته", value: "depend_api", width: "15%"},
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
                editRowDialog: false,
                editItemId: 0,
            };
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
                            await this.deleteExternalApi({id: item.id})
                            await this.getExternalApis()
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

        watch: {
            initData() {
                this.screenResizeHandler()
            },
            async editRowDialog() {
                if (!this.editRowDialog) {
                    await this.getExternalApis()
                }
            },
            async addRowDialog() {
                if (!this.addRowDialog) {
                    await this.getExternalApis()
                }
            },
            ExternalApisList(){
                if (this.ExternalApisList){

                    this.tableData = this.ExternalApisList.map((item)=>{
                        let find = this.ExternalApisList.filter((i)=> i.id === item.depend_api)
                        let api = null
                        if (find.length>0){
                            api=find[0].topic
                        }
                        return {...item,depend_api:api}
                    })
                }

            }

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
