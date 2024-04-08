<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <div
                    class="ma-0 pa-0 px-2"
                    id="table"
                    style="height: calc(100% - 20px); margin-top: 10px !important"
            >
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
                            :items="usersList"
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
</template>

<script lang="ts">
    import EditableTable from "@/components/common/editableTable.vue";

    import {defineComponent, onMounted, ref} from "vue";

    import {useStore} from "vuex";
    import users from "@/componentFunctions/user_functions";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},

        setup() {

            const {getUsers, usersList,deleteUser} = users()

            const initData = ref(false)
            const store = useStore()


            onMounted(async () => {
                await getUsers()

                setTimeout(() => {
                    initData.value = true
                }, 300)

            })

            return {initData, store, usersList,getUsers,deleteUser}
        },

        data() {
            return {
                showType: false, //true:list  false:tree
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "نام کاربری", value: "user_name", width: "15%"},

                    {text: "نام ", value: "first_name", width: "15%"},
                    {text: "نام خانوادگی", value: "last_name", width: "15%"},
                    {text: "نقش", value: "role", width: "15%"},
                    {text: "تلفن", value: "phone", width: "15%"},
                    {text: "وضعیت", value: "is_active", width: "5%"},
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

        watch: {
            initData() {
                this.screenResizeHandler()
            }
        },
        props: {},
        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 100);
        },
        methods: {
            actionClick(prop: any) {
                //--------for tree-----------//
                console.log(prop.item);
            },

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.$router.push({
                        name:'editUser',
                        params:{data:item.user_name}
                    })
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active:true,
                        accept: async () => {
                            await this.deleteUser({user_name: item.user_name})
                            await this.getUsers()

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
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .v-btn-group--density-compact.v-btn-group {
        height: 25px;
    }
</style>
