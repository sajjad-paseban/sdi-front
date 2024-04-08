<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    در این صفحه لیست نقشه های زیرین وجود دارد که امکان فیلتر نیز برای
                    نمایش و دسته بندی آن نیز وجود دارد. نقشه های زیرن میتواند برای کاربران
                    متفاوت باشد ،
                </p>
            </v-row>
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    که برای این کار بعد از ایجاد نقشه زیرین دلخواه ، میتوانید در قسمت
                    مدیریت کاربران ، آن را برای کاربر مورد نظر تنظیم کنید. دکمه افزودن ،
                    این امکان را میدهد که نقشه زیرین جدید ایجاد کنید.
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
                <v-fade-transition>
                    <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                        <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                    </v-row>
                </v-fade-transition>
                <v-slide-y-transition>
                    <EditableTable
                            v-show="initShow"
                            ref="editTable"
                            :headers="headers"
                            :items="baseMaps"
                            :checkBox="false"
                            :height="height"
                            :action="actions"
                            @actionClick="actionsClick"
                            :filter-activate="tableFilterActivate"
                            style="background-color: white"
                    ></EditableTable>
                </v-slide-y-transition>
            </div>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import EditableTable from "@/components/common/editableTable.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import {toArabicNumber} from "@/assets/toFarsi";
    import baseMap from "@/componentFunctions/baseMap_functions";
    import {useStore} from "vuex";

    interface Item {
        key: string;
        label: string;
        children: Item[];
    }

    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},


        setup() {
            const {getBaseMaps, baseMaps,deleteBaseMap} = baseMap()
            const initData = ref(false)
            const store = useStore()

            onMounted(async () => {
                await getBaseMaps()
                initData.value =true
            })

            return {
                baseMaps,initData,store,deleteBaseMap
            }
        },

        data() {
            return {
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                initShow:false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "شناسه", value: "code", width: "5%"},
                    {text: "نام", value: "name", width: "15%"},
                    {text: "آدرس فراخوانی", value: "address", width: "50%"},
                    {text: "پیشرفض", value: "default", width: "5%"},
                    {text: "آنلاین", value: "online", width: "5%"},
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
        watch:{

            initData(){
                if(this.initData){
                    setTimeout(()=>{
                        this.initShow = true
                        this.screenResizeHandler()
                    },300)
                }
            }
        },
        props: {},
        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.$router.push({
                        name:'editBaseMap',
                        params:{data:item.name}
                    })
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active:true,
                        accept: async () => {
                            const result = await this.deleteBaseMap({name: item.name})

                            if (result) {
                                this.baseMaps = items.filter((i: any) => {
                                    return i.name !== item.name;
                                });
                            }
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
            }, 300);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .IPClass {
        height: calc(100% - 80px);
        margin-top: 10px !important;
    }

    @media only screen and (max-width: 900px) {
        .IPClass {
            height: calc(100% - 40px);
            margin-top: 10px !important;
        }
    }
</style>
