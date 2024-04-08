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
            </v-row>
            <div
                    class="ma-0 pa-0 px-2"
                    id="table"
                    style="height: calc(100% - 40px); margin-top: 10px !important"
            >
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
                            v-if="!showType"
                            ref="editTable"
                            :headers="headers"
                            :items="rolesWithParentName"
                            :action="actions"
                            :checkBox="false"
                            :height="height"
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
                                    v-for="item in rolesTree"
                                    :key="item.id"
                                    :item="item"
                                    :label="'name'"
                                    dir="rtl"
                            >
                                <template #action="actionPrps">
                                    <v-btn-toggle
                                            class="my-1"
                                            v-model="actionPrps.item.selected"
                                            dense
                                            multiple
                                            rounded="xl"
                                            density="compact"
                                            color="primary"
                                            divided
                                            :max="0"
                                            style="background-color: #f3f3f3"
                                    >
                                        <v-btn
                                                variant="text"
                                                size="small"
                                                color="primary"
                                                value="1"
                                                @click="actionClick('edit',actionPrps.item)">
                                            <v-tooltip activator="parent" location="bottom">
                                                ویرایش
                                            </v-tooltip>
                                            <v-avatar size="20" class="">
                                                <v-img
                                                        class=""
                                                        src="@/assets/icons/edit.png"
                                                        alt="John"
                                                ></v-img>
                                            </v-avatar>
                                        </v-btn>

                                        <v-btn
                                                variant="text"
                                                size="small"
                                                color="primary"
                                                value="2"
                                                @click="actionClick('delete',actionPrps.item)">

                                            <v-tooltip activator="parent" location="bottom">
                                                حذف
                                            </v-tooltip>
                                            <v-avatar size="20" class="">
                                                <v-img
                                                        class=""
                                                        src="@/assets/icons/delete.png"
                                                        alt="John"
                                                ></v-img>
                                            </v-avatar>
                                        </v-btn>
                                    </v-btn-toggle>
                                </template>
                            </Tree>
                        </v-col>
                    </v-row>
                </v-slide-y-transition>
            </div>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import EditableTable from "@/components/common/editableTable.vue";
    import Tree from "@/components/common/tree.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import {toArabicNumber} from "@/assets/toFarsi";
    import role from "@/componentFunctions/roles_functions";
    import {useStore} from "vuex";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable, Tree},

        setup() {
            const initData = ref(false)
            const {getRolesWithParentName, rolesWithParentName, deleteRole,getRolesTree,rolesTree} = role()

            const store = useStore()


            onMounted(async () => {
                await getRolesWithParentName()
                await getRolesTree()
                setTimeout(() => {
                    initData.value = true
                }, 300)

            })

            return {initData, rolesWithParentName, store, deleteRole,rolesTree,getRolesTree,getRolesWithParentName}
        },

        data() {
            return {
                show: false,
                showType: false, //true:list  false:tree

                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "کد نقش", value: "role_code", width: "5%"},
                    {text: "نام نقش", value: "name", width: "20%"},
                    {text: "وضعیت", value: "is_active", width: "5%"},
                    {text: "گروه نقش", value: "parent", width: "20%"},
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

                //--------for tree-----------//


            };
        },
        props: {},

        watch: {
            initData() {
                this.screenResizeHandler()
            }
        },
        methods: {
            actionClick(action:string,prop: any) {
                console.log(prop)
                if (action === "edit") {
                    this.$router.push({
                        name: 'editRole',
                        params: {data: parseInt(prop.id)}
                    })
                } else if (action === "delete") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            await this.deleteRole({id: prop.id})
                            await this.getRolesTree()
                            await this.getRolesWithParentName()
                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
                }
            },       //--------for tree-----------//

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.$router.push({
                        name: 'editRole',
                        params: {data: parseInt(item.id)}
                    })
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {

                            await this.deleteRole({id: item.id})
                            await this.getRolesTree()
                            await this.getRolesWithParentName()
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
            }, 200);


        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .v-btn-group--density-compact.v-btn-group {
        height: 25px;
    }
</style>
