<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                class="pa-1"
                style="width: 100%; height: 100%; background-color: #f3f3f33b"
        >
            <v-row class="pa-0 ma-0 myForm">
                <v-col cols="8" md="4" class="myDataBase">
                    <v-autocomplete
                            :items="tablesName"
                            density="compact"
                            v-model="name"
                            variant="solo"
                            required
                            @update:modelValue="setTableName"

                    >
                        <template v-slot:prepend-inner>
                            <v-icon color="primary" icon="mdi-sitemap"/>
                        </template>

                        <template v-slot:label>
                            <!-- <p  class="text-primary">نام لایه</p> -->
                            <p class="">جدول ها</p>
                        </template>
                    </v-autocomplete>
                </v-col>
                <v-spacer></v-spacer>
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
            <div
                    class="ma-0 pa-0 px-2 "
                    id="table"
                    style="height: calc(100% - 50px); margin-top: 10px !important"
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
                            v-if="headers.length>0"
                            ref="editTable"
                            :headers="headers"
                            :items="tableInfo"
                            :checkBox="false"
                            :height="height"
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
    import {toArabicNumber} from "@/assets/toFarsi";
    import logs from "@/componentFunctions/logs_functions";
    import tables from "@/componentFunctions/tables_functions";

    export default defineComponent({
        name: "listComponent",
        components: {EditableTable},
        setup() {
            const {getTablesName, tablesName, getTableInfoByName, tableInfo} = tables()

            const initData = ref(false)
            const headers = ref<{ text: string, value: string, width: string }[]>([])

            onMounted(async () => {
                await getTablesName()


                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                getTablesName, tablesName, getTableInfoByName, tableInfo, initData, headers
            }
        },
        data() {
            return {
                show: false,

                name: '',

                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                // /-------table data---------/
            };
        },
        props: {},
        watch: {
            initData() {
                this.screenResizeHandler()
            },
            tableInfo() {

                let entries = Object.entries(this.tableInfo[0])
                this.headers = []
                setTimeout(()=>{
                    entries.forEach(([key, val]) => {
                        this.headers.push({
                            text: key,
                            value: key,
                            width: "10%"
                        })
                    });
                },500)

            }
        },
        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },
            async setTableName() {
                console.log(this.name)
                await this.getTableInfoByName({name: this.name})
            }
        },

        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 300);
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

    .myForm .myDataBase .v-input__details {
        min-height: 0px !important;
        padding-top: 0px !important;
    }

    .myForm .myDataBase .v-messages {

        min-height: 0px;

    }
</style>
