<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="pa-0 ma-0" justify="space-between">
                <v-btn
                        variant="text"
                        size="small"
                        color="primary"
                        @click="showType = !showType"
                        style="font-weight: bold !important"
                        v-tooltip.top="showType ? 'نمایش لیستی' : 'نمایش درختی'"
                >
                    <v-avatar v-if="!showType" size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/tree.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>

                    <v-avatar v-if="showType" size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/list.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                </v-btn>

                <v-btn
                        variant="text"
                        size="small"
                        color="primary"
                        @click="initAccess"
                        style="font-weight: bold !important"
                        v-tooltip.top="'آپدیت مسیر های دسترسی به صورت خودکار'"
                >
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/blue_reset.png"
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
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>

                <v-slide-y-transition>
                    <EditableTable
                            v-if="!showType"
                            ref="editTable"
                            :headers="headers"
                            :items="accessWithParentName"
                            :action="actions"
                            :checkBox="false"
                            :height="height"
                            :saveEditItemCallback="editAccess"
                            :filter-activate="tableFilterActivate"
                            @actionClick="actionsClick"
                            style="background-color: white"
                    ></EditableTable>
                </v-slide-y-transition>

                <v-slide-y-transition>
                    <v-row
                            v-if="showType"
                            class="pa-0 ma-0"
                            justify="center"
                            style="height: 100%; overflow: auto"
                    >
                        <v-col
                                cols="12"
                                md="8"
                                class="elevation-1 rounded-lg"
                                style="height: max-content"
                        >
                            <Tree
                                    v-for="item in accessesTree"
                                    :key="item.id"
                                    :item="item"
                                    :label="'e_name'"
                                    :activeCheckBox="true"
                                    dir="rtl"
                            >

                            </Tree>
                        </v-col>
                    </v-row>
                </v-slide-y-transition>
            </div>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import EditableTable, {TableValuesTypes} from "@/components/common/editableTable.vue";
    import Tree from "@/components/common/tree.vue";
    import {defineComponent, onMounted, ref} from "vue";

    import access from "@/componentFunctions/access_functions";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";



    export default defineComponent({
        name: "listComponent",
        components: {EditableTable, Tree},

        setup() {
            const {
                getAccessWithParentName,createInitAccess, accessWithParentName, getAccessTree, deleteAccess,editAccess,
                accessesTree //tree
            } = access()

            const store = useStore()
            const toast = useToast()
            const initData = ref(false)
            const router = useRouter()

            onMounted(async () => {
                await getAccessWithParentName()
                await getAccessTree()
                initData.value = true

            })

            return {
                accessWithParentName,
                getAccessWithParentName,
                accessesTree,
                getAccessTree,
                store,
                deleteAccess,
                router,
                toast,
                initData,editAccess,
                createInitAccess
            }
        },

        data() {
            return {
                show: false,
                showType: false, //true:list  false:tree

                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [

                    {text: "نام انگلیسی دسترسی", value: "e_name", width: "20%"},
                    {text: "نام فارسی دسترسی", value: "f_name", width: "20%"},
                    {text: "والد", value: "parent", width: "20%"},
                    {text: "وضعیت", value: "is_active", width: "5%", type: TableValuesTypes.bool},
                    {text: "api", value: "api", width: "20%"},
                    {text: "api نوع", value: "api_type", width: "5%"},
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
        watch:{
            initData(){
                this.screenResizeHandler()
            }
        },
        methods: {


            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.$router.push({
                        name:'editAccess',
                        params:{data:item.e_name}
                    })
                } else if (value === "حذف") {

                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active:true,
                        accept: async () => {

                            const result = await this.deleteAccess({e_name: item.e_name})
                            console.log(item)
                            if (result) {
                                this.accessWithParentName = items.filter((i: any) => {
                                    return i.e_name !== item.e_name;
                                });
                            }
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

            async initAccess() {

                const res = await this.createInitAccess(this.router.options.routes)
                if (res) {
                    this.toast.add({
                        group: 'tr',
                        life: 7000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'درخواست انجام شد .'
                    });
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
    .v-btn-group--density-compact.v-btn-group {
        height: 25px;
    }
</style>
