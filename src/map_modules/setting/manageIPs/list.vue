<template>
    <v-slide-y-transition>
        <div
                class="pa-1"
                v-if="show"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    با این قابلیت میتوانید آی پی سیستم های دلخواه را در لیست مسدود شده
                    قرار دهید و اجازه استفاده از سامانه را ندهید. این قابلیت برای آی پی
                    های مخرب بسیار کارمد میباشد.
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
                            v-if="initData"
                            ref="editTable"
                            :headers="headers"
                            :items="ipsList"
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
    import EditableTable from "@/components/common/editableTable.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import ips from "@/componentFunctions/ip_functions";
    import {useStore} from "vuex";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},
        setup() {

            const {getIps, ipsList, deleteIp} = ips()

            const initData = ref(false)
            const store = useStore()

            onMounted(async () => {
                await getIps()
                setTimeout(() => {
                    initData.value = true
                }, 300)
            })
            return {
                ipsList, initData, store, deleteIp, getIps
            }
        },
        data() {
            return {
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "شماره", value: "id", width: "5%"},
                    {text: "IP", value: "ip", width: "30%"},
                    {text: "تاریخ شروع", value: "active_time_start", width: "20%"},
                    {text: "تاریخ خاتمه", value: "active_time_end", width: "20%"},
                    {text: "وضعیت", value: "is_active", width: "10%"},
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
            }
        },
        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.$router.push({
                        name:'editIp',
                        params:{data:item.id}
                    })
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            await this.deleteIp({id: item.id})
                            await this.getIps()
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
        height: calc(100% - 60px);
        margin-top: 10px !important;
    }

    @media only screen and (max-width: 900px) {
        .IPClass {
            height: calc(100% - 40px);
            margin-top: 10px !important;
        }
    }
</style>
