<template>
    <v-slide-y-transition>
        <div class="py-1" style="height: 100%">

            <v-row v-if="!show" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-fade-transition>
                <v-card
                        class="ma-0 pa-2"
                        style="height: 100%; overflow: auto"
                        v-if="show"
                >
                    <div class="px-2 mysub">
                        <v-row class="ma-0 pa-0 pr-2">
                            <p class="" style="font-size: 10px; line-height: 20px">
                                برای ایجاد لایه از پرسجو از لایه های سامانه ، باید در ابتدا
                                درخواست جستجو را ایجاد نمایید . برای اینکار ایتدا یکی از لایه های
                                درون سامانه را انتخاب کرده و بعد در جدول مشخصات لایه ، عملگر های
                                شرط و دیگر تنظیمات را انجام دهید.
                            </p>
                        </v-row>
                    </div>
                    <v-divider></v-divider>

                    <v-row class="ma-0 px-2">
                        <v-col class="ma-0 pa-0 py-2 myForm addLayer" cols="12" md="3">
                            <v-autocomplete
                                    :items="ownLayersListData"
                                    density="compact"
                                    variant="solo"
                                    item-title="name"
                                    item-value="id"
                                    v-model="layerSelected"
                                    @update:modelValue="selectLayer"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="primary" icon="mdi-layers"/>
                                </template>

                                <template v-slot:label>
                                    <p class="">انتخاب لایه</p>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="ma-0 pa-0 pb-1" cols="12" md="2" align="end">
                            <v-btn
                                    variant="tonal"
                                    prepend-icon="mdi-table"
                                    style="font-weight: bold !important;height: 70%!important"
                                    rounded
                                    @click="showResult"
                                    size="x-small"
                                    color="primary"
                                    class="elevation-1 mt-1 "
                            >مشاهده نتیجه
                            </v-btn>
                        </v-col>
                    </v-row>

                    <div class="px-2 myTb" id="table">
                        <EditableTable
                                v-if="tableData.length>0"
                                ref="editTable"
                                :headers="headers"
                                :items="tableData"
                                :checkBox="true"
                                :editMode="true"
                                :height="height"
                                :filter-activate="tableFilterActivate"
                        ></EditableTable>
                    </div>
                    <v-row class="ma-0 pa-0 pt-1 " justify="end" align="end">
                        <v-btn :disabled="resultSimpleLayerSearchList.length===0" @click="saveBtn"
                               class="mt-4 font-weight-bold" variant="text" size="x-small"
                               color="primary">
                            ذخیره
                        </v-btn>
                    </v-row>
                </v-card>
            </v-fade-transition>
        </div>
    </v-slide-y-transition>
    <simple-dialog
            :show="resultDialog"
            topic=""
            width="75vw"
            height="85dvh"
            @closeDialog="resultDialog = false"
    >
        <div
                class=""
                dir="rtl"
                style="
            overflow: auto;
            height: 100%;
            background-color: #dee2e62b;">
            <v-row class="ma-0 pa-1" align="center" style="height: 100%">
                <v-card
                        width="100%"
                        height="100%"
                        class="ma-0 pa-0 elevation-0"
                        style="overflow-y: auto;background-color: rgba(180,180,180,0)!important;"
                >

                    <div class="px-2 " style="" id="table2">
                        <EditableTable
                                v-if="resultSimpleLayerSearchList.length>0"
                                ref="editTable2"
                                :headers="headers2"
                                :items="resultSimpleLayerSearchList"

                                :height="height2"
                                :filter-activate="tableFilterActivate"
                        ></EditableTable>
                    </div>

                </v-card>
            </v-row>

        </div>
    </simple-dialog>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import EditableTable, {TableValuesTypes} from "@/components/common/editableTable.vue";

    import layer_functions from "@/componentFunctions/layer_functions";
    import {StoreActions} from "@/store";
    import {useStore} from "vuex";
    import {resultSimpleLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleLayerSearch.sd";
    import SimpleDialog from "@/components/common/simpleDialog.vue";


    export default defineComponent({
        name: "searchInLayerComponent",
        components: {EditableTable, SimpleDialog},
        setup() {
            const {
                ownLayersList, ownLayersListData, getLayerFields,
                layerFieldsList, searchLayerConditions, searchLayerConditionsList, resultSimpleLayerSearch, resultSimpleLayerSearchList
            } = layer_functions()

            const store = useStore()
            const editTable = ref<{ getSelected(): Array<any>; }>()
            const show = ref<boolean>(false)

            onMounted(async () => {
                await ownLayersList()
                await searchLayerConditions()

                setTimeout(() => {
                    show.value = true;

                }, 300);
            })

            return {
                ownLayersList,
                ownLayersListData,
                getLayerFields,
                layerFieldsList,
                show,
                store,
                searchLayerConditions,
                searchLayerConditionsList,
                editTable,
                resultSimpleLayerSearch, resultSimpleLayerSearchList
            }
        },
        data() {
            return {
                layerSelected: null as null | number,

                resultDialog: false,
                height2: "",
                tableData2: [] as any[],
                headers2: [] as any[],
                // /-------table data---------/
                height: "", //  برای اندازه ازتفاع جدول //

                tableFilterActivate: false,

                headers: [
                    {text: "نام", value: "name", width: "20%", type: TableValuesTypes.string},
                    {text: "نوع داده", value: "type", width: "7%", type: TableValuesTypes.string},
                    {text: "َشرط", value: "condition", width: "20%", type: TableValuesTypes.list},
                    {text: "مقدار اول", value: "value1", width: "25%", type: TableValuesTypes.string},
                    {text: "مقدار دوم", value: "value2", width: "25%", type: TableValuesTypes.string},
                ],
                tableData: [] as any

            };
        },
        props: {
            msg: String,
        },

        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //

        methods: {
            async selectLayer(data: number) {
                if (data) {
                    this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
                    await this.getLayerFields(data)
                    if (this.layerFieldsList) {
                        this.tableData = this.layerFieldsList.map((item) => {
                            return {
                                name: item.name,
                                id: item.id,
                                type: item.type,
                                condition: {
                                    value: null,
                                    list: this.searchLayerConditionsList
                                },
                                value1: null,
                                value2: null
                            }
                        })
                    }


                    this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

                }
            },

            screenResizeHandler() {
                //  برای اندازه ازتفاع جدول //
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
                if (this.resultDialog) {
                    let y: any = document.getElementById("table2");
                    this.height2 = String(y.offsetHeight);
                    console.log(this.height2)
                }

            },

            async showResult() {
                if (this.editTable && this.layerSelected) {
                    const selected = this.editTable.getSelected()
                    const fields = selected.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            condition: item.condition.value,
                            value1: item.value1,
                            value2: item.value2
                        }
                    })
                    const data: resultSimpleLayerSearchSd = {
                        fields: fields,
                        layer: this.layerSelected
                    }
                    await this.resultSimpleLayerSearch(data)

                    this.headers2 = selected.map((item) => {
                        return {text: item.name, value: item.name, width: "10%"}
                    })
                    this.resultDialog = true

                    setTimeout(() => {
                        this.screenResizeHandler()
                    }, 200)


                }

            },

            saveBtn() {
                if (this.editTable && this.layerSelected) {
                    const selected = this.editTable.getSelected()
                    const fields = selected.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            condition: item.condition.value,
                            value1: item.value1,
                            value2: item.value2
                        }
                    })
                    const data: resultSimpleLayerSearchSd = {
                        fields: fields,
                        layer: this.layerSelected
                    }

                    this.$emit('saveSearch',data)

                }

            },
        },
        emits: ['saveSearch'],
        watch: {
            show() {
                if (this.show) {
                    setTimeout(() => {
                        this.screenResizeHandler()
                    }, 200)
                }

            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .myTb {
        height: calc(100% - 130px);
        width: 100%;
        min-width: 400px;
    }

    @media only screen and (max-height: 500px) {
        .myTb {
            height: calc(100% - 38px);
            width: 100%;
        }


    }

</style>
