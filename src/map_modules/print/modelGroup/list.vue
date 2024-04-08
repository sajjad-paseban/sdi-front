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
                            :items="tempGroupList"
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
    import EditableTable, {TableValuesTypes} from "@/components/common/editableTable.vue";
    import {defineComponent, onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import print_functions from "@/componentFunctions/print_functions";


    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},

        setup() {

            const {list,tempGroupList,deleteTempGroup} = print_functions()

            const initData = ref(false)
            const store = useStore()


            onMounted(async () => {
                await list()
                tempGroupList.value = tempGroupList.value.map((item)=>{
                    return {...item,parent_name:item.print_template_group?item.print_template_group.name:null}
                })

                setTimeout(() => {
                    initData.value = true
                }, 300)

            })

            return {initData, store,list,tempGroupList,deleteTempGroup}
        },

        data() {
            return {
                showType: false, //true:list  false:tree
                show: false,
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "آیدی", value: "id", width: "5%",type: TableValuesTypes.number},
                    {text: "نام گروه ", value: "name", width: "20%",type: TableValuesTypes.string},
                    {text: "نام والد", value: "parent_name", width: "20%",type: TableValuesTypes.number},
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
                        name:'editModelGroup',
                        params:{data:item.id}
                    })
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active:true,
                        accept: async () => {
                            console.log(item)
                            await this.deleteTempGroup(item.id)
                            await this.list()
                            this.tempGroupList = this.tempGroupList.map((item)=>{
                                return {...item,parent_name:item.print_template_group?item.print_template_group.name:null}
                            })

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
