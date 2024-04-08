<template>
    <v-slide-y-transition>
        <div v-if="show" class="pa-2" dir="rtl" style="height: 100%;width: 100%;">
            <v-card bg-color="active" class="ma-1" style="height: 100%; overflow: auto; ">
                <v-tabs style="background-color: #e8e8e8;" class="" v-model="tab" color="primary" show-arrow>
                    <v-tab :value="item.route" v-for="item in items" :key="item.text">
                        <!-- <v-icon>mdi-{{ item.icon }}</v-icon> -->
                        {{ item.text }}
                    </v-tab>
                </v-tabs>

                <v-window v-model="tab" style="height: calc(100% - 31px);width: 100%;">


                    <div
                            class="pa-1"

                            style="width: 100%; height: 100%; background-color: #f3f3f33b"
                    >
                        <v-row class="ma-0 pa-0 mysub">
                            <p style="font-size: 10px; line-height: 20px">
                                در این صفحه میتوانید لیست مدل های پایه را مشاهده و ویرایش و حذف نمایید.
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
                            <v-spacer />
                            <v-btn
                                    variant="text"
                                    size="small"
                                    color="primary"
                                    @click="addDialog = true"
                                    style="font-weight: bold !important"
                                    v-tooltip.right="'اضافه کردن مدل'"
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

                            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%"
                                   justify="center">
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
                                        v-if="initData"
                                        ref="editTable"
                                        :headers="headers"
                                        :items="listStyles"
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


                </v-window>
            </v-card>
        </div>
    </v-slide-y-transition>

    <base-layer-style
            :show="addDialog"
            :toLayerSave="false"
            :id="editId"
            @hide="()=>{
                addDialog= false
                editId=0
            }"
    ></base-layer-style>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import EditableTable, {TableValuesTypes} from "@/components/common/editableTable.vue";
    import {useStore} from "vuex";
    import BaseLayerStyle from "@/map_modules/layer/addLayer/common/baseLayerStyle.vue";
    import baseStyle from "@/componentFunctions/baseStyle_functions";


    export default defineComponent({
        name: "BaseModelsComponent",
        components: {EditableTable,BaseLayerStyle},

        setup() {

            const {getListBaseStyles,listStyles,deleteBaseStyle} = baseStyle()

            const initData = ref(false)
            const store = useStore()

            onMounted(async () => {
                await getListBaseStyles('all')
                setTimeout(() => {
                    initData.value = true
                }, 200)
            })
            return {
                 initData, store,listStyles,deleteBaseStyle,getListBaseStyles
            }
        },
        data() {
            return {
                tab: "baseModelStyles",

                addDialog:false,

                items: [
                    {
                        icon: "phone",
                        text: "کاتالوگ پایه",
                        route: "baseModelStyles",
                    },
                ],

                show: false,

                editId:0,

                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "شماره", value: "id", width: "5%",type: TableValuesTypes.string},
                    {text: "لوگو", value: "legend", width: "20%",type: TableValuesTypes.image},
                    {text: "نام", value: "name", width: "20%",type: TableValuesTypes.string},
                    {text: "نوع فرمت", value: "geo_type", width: "20%",type: TableValuesTypes.string},
                    {text: "کاربر", value: "user", width: "20%",type: TableValuesTypes.string},

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
            };
        },
        props: {},
        watch: {
            initData() {
                this.screenResizeHandler()
            },
            async addDialog() {
                if (this.addDialog === false) {
                    await this.getListBaseStyles('all')
                }
            }
        },
        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
                console.log(this.height)
            },

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.editId = item.id
                    this.addDialog = true
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            await this.deleteBaseStyle(item.id)
                            await this.getListBaseStyles('all')
                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
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
            }, 100);
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
