<template>
    <v-slide-y-transition>
        <div
                style="
        height: 100%;
        width: 100%;
        background-color: #f3f3f3;
        overflow: auto;
      "
        >

            <v-row v-if="!initData" class="pa-4 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-fade-transition>
                <v-row v-if="initData" class="ma-0 pa-0" justify="center">
                    <v-col cols="12" class="">
                        <v-form ref="myAddExternalApi" class="myForm" style="width: 100%; height: 100%">
                            <v-row
                                    class="ma-0 pa-2 rounded-lg elevation-2"
                                    justify="center"
                                    style="background-color: white"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field :rules="nameRule" v-model="ExternalApi.topic" density="compact"
                                                      variant="solo" required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">عنوان API</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-autocomplete
                                                v-model="ExternalApi.method"
                                                :items="ExternalApiMethods"
                                                density="compact"
                                                variant="solo"
                                                required
                                                :rules="nameRule"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نوع درخواست</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-autocomplete
                                                v-model="ExternalApi.depend_api"
                                                :items="ExternalApisList"
                                                item-title="topic"
                                                item-value="id"
                                                density="compact"
                                                variant="solo"
                                                clearable
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">وابسته به api</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="4" lg="4" class="ma-0">
                                        <v-autocomplete
                                                v-model="ExternalApi.resType"
                                                :items="resTypes"
                                                density="compact"
                                                variant="solo"
                                                required
                                                :rules="nameRule"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نوع پاسخ</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="8"  class="ma-0">
                                        <v-text-field :rules="nameRule" v-model="ExternalApi.address" density="compact"
                                                      variant="solo" required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">آدرس</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" class="ma-0 textArea">
                                        <v-textarea
                                                v-model="ExternalApi.description"
                                                dir="rtl"
                                                no-resize
                                                rows="3"
                                                background-color="light-blue"
                                                color="black"
                                                hint=""
                                                persistent-hint
                                                placeholder="توضیحات"
                                                variant="solo"
                                        >
                                        </v-textarea>
                                    </v-col>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row class="pa-0 ma-0">
                                    <p class="pt-2 pr-2" style="font-size: 11px">header</p>
                                    <v-spacer/>
                                    <v-btn
                                            variant="text"
                                            size="small"
                                            color="primary"
                                            style="font-weight: bold !important"
                                            v-tooltip.right="'اضافه کردن هدر'"
                                            @click="addItemToTable('header')"
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

                                <v-col cols="12" class="ma-0 pa-0 px-2 databaseClass" id="table">
                                    <v-slide-y-transition>
                                        <EditableTable
                                                ref="editTable"
                                                :save-edit-item-callback="saveAddParamToT1"
                                                :cancelEditItemCallback="cancelEditItemCallbackT1"
                                                :headers="headers"
                                                :items="t1"
                                                :checkBox="false"
                                                :height="height"
                                                :action="actions"
                                                :editMode="true"
                                                :filter-activate="tableFilterActivate"
                                                @actionClick="actionsClickT1"
                                                style="background-color: white"
                                        ></EditableTable>
                                    </v-slide-y-transition>
                                </v-col>

                                <v-divider class="mt-4"></v-divider>

                                <v-row class="pa-0 ma-0">
                                    <p class="pt-2 pr-2" style="font-size: 11px">queryParams</p>
                                    <v-spacer/>
                                    <v-btn
                                            variant="text"
                                            size="small"
                                            color="primary"
                                            style="font-weight: bold !important"
                                            v-tooltip.right="'اضافه کردن پارامتر'"
                                            @click="addItemToTable('parameter')"
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
                                <v-col cols="12" class="ma-0 pa-0 px-2 databaseClass" id="table">
                                    <v-slide-y-transition>
                                        <EditableTable
                                                ref="editTable"
                                                :headers="headers"
                                                :cancelEditItemCallback="cancelEditItemCallbackT2"
                                                :items="t2"
                                                :checkBox="false"
                                                :height="height"
                                                :action="actions"
                                                :filter-activate="tableFilterActivate"
                                                :editMode="true"
                                                :save-edit-item-callback="saveAddParamToT2"
                                                @actionClick="actionsClickT2"
                                                style="background-color: white"
                                        ></EditableTable>
                                    </v-slide-y-transition>
                                </v-col>
                            </v-row>
                            <v-row class="ma-0 pa-0 mt-2" justify="end">


                                <v-btn
                                        class="elevation-1"
                                        variant="tonal"
                                        append-icon="mdi-content-save"
                                        style="font-weight: bold !important; font-size: 10px"
                                        rounded="lg"
                                        @click="saveApi"
                                        size="small"
                                        color="primary"
                                >ذخیره
                                </v-btn
                                >
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-fade-transition>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import EditableTable, {
        TableValuesTypes
    } from "@/components/common/editableTable.vue";
    import ExternalApis from "@/componentFunctions/connection_externalApi_functions";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {ApiResType, ExternalApi_params} from "@/models/Conncections.interface";


    interface Params {
        name: string
        requirement: boolean
        values: string|null
        editMode?:boolean
    }

    export default defineComponent({
        name: "editApiComponent",
        components: {EditableTable},
        props: {
            id: {
                type: Number,
                required: true,
                default: 0
            }
        },
        setup(props, {emit}) {
            const {addExternalApiAction, getExternalApisById, ExternalApi, getExternalApiMethodsAction, ExternalApiMethods, ExternalApisList, getExternalApis} = ExternalApis()

            const store = useStore()
            const initData = ref(false)
            const {nameRule, textNumber} = rules()
            const myAddExternalApi = ref<VForm>()
            const toast = useToast()

            const resTypes = Object.values(ApiResType)

            onMounted(async () => {

                if (props.id === 0) {
                    emit("closeDialog", false);
                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'API انتخاب نشده است '
                    });
                }
                await getExternalApisById({id: props.id})
                await getExternalApiMethodsAction()
                await getExternalApis()

                ExternalApisList.value = ExternalApisList.value.filter((item)=>{
                    if (ExternalApi.value){
                        return item.topic !== ExternalApi.value.topic
                    }else {
                        return true
                    }
                })

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                addExternalApiAction,
                ExternalApiMethods,
                nameRule,
                textNumber,
                myAddExternalApi,
                initData,
                ExternalApisList,
                store,
                ExternalApi,
                resTypes
            }
        },
        watch:{
            async ExternalApi() {
                if (this.ExternalApi) {
                    await this.getParamsTf(this.ExternalApi.headers, 'header')
                    await this.getParamsTf(this.ExternalApi.params, 'param')
                }

            }
        },
        data() {
            return {


                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "نام", value: "name", width: "20%"},
                    {
                        text: "اجباری",
                        value: "requirement",
                        width: "10%",
                        type: TableValuesTypes.bool,
                    },
                    {text: "ثابت", value: "values", width: "20%",type:TableValuesTypes.string},
                ],

                t1: [] as Params[],

                t2: [] as Params[],

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


        methods: {
            //------------------table-------------------//

            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },

            actionsClickT1(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    item.editMode = true

                }else if (value == "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            this.t1 = items.filter((i: any) => i.name !== item.name)
                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
                }
            },

            actionsClickT2(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    item.editMode = true

                }else if (value == "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            this.t2 = items.filter((i: any) => i.name !== item.name)
                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })

                }
            },

            saveAddParamToT1(item: any) {
                console.log(item, item.index, this.t1)
                this.t1[item.index] = item.newItem
                return true
            },
            saveAddParamToT2(item: any) {
                console.log(item, item.index, this.t2)
                this.t2[item.index] = item.newItem
                return true
            },
            cancelEditItemCallbackT1(item: any) {
                this.t1[item.index] = item.item
            },
            cancelEditItemCallbackT2(item: any) {
                this.t2[item.index] = item.item
            },
            addParamsTf(item: { name: string, requirement: boolean, values: string|null }, type: string) {

                if (item.name && this.ExternalApi) {
                    if (type === 'param') {
                        if (!this.ExternalApi.params) {
                            this.ExternalApi.params = []
                        }

                        if (item.values) {
                            if (this.ExternalApi) {
                                this.ExternalApi.params.push({
                                    name: item.name,
                                    requirement: item.requirement,
                                    fixed_value: true,
                                    value: item.values
                                })
                            }
                        } else {
                            this.ExternalApi.params.push({
                                name: item.name,
                                requirement: item.requirement,
                                fixed_value: false,
                            })
                        }
                    } else {
                        if (!this.ExternalApi.headers) {
                            this.ExternalApi.headers = []
                        }

                        if (item.values) {
                            if (this.ExternalApi) {
                                this.ExternalApi.headers.push({
                                    name: item.name,
                                    requirement: item.requirement,
                                    fixed_value: true,
                                    value: item.values
                                })
                            }
                        } else {
                            this.ExternalApi.headers.push({
                                name: item.name,
                                requirement: item.requirement,
                                fixed_value: false,
                            })
                        }
                    }
                }


            },
            getParamsTf(items: ExternalApi_params[],type:string) {
                if (type === 'header'){
                    items.forEach((item) => {
                        const result = this.t1.filter((param) => param.name === item.name)
                        if (result.length === 0){
                            this.t1.push({values:item.value?item.value:null,...item,editMode:false})
                        }else {
                            if (item.value){
                                result[0].values+='-'+item.value
                            }
                        }
                    })
                }else {
                    items.forEach((item) => {
                        const result = this.t2.filter((header) => header.name === item.name)
                        if (result.length === 0){
                            this.t2.push({values:item.value?item.value:null,...item,editMode:false})
                        }else {
                            if (item.value){
                                result[0].values+='-'+item.value
                            }
                        }
                    })
                }

            },

            //------------------table-------------------//

            addItemToTable(tableName: string) {
                let x;
                if (tableName == "header") {
                    x = this.t1.map((v: any) => ({...v}));
                    x.push({
                        name: "",
                        requirement: false,
                        values: "",
                    });

                    this.t1 = x;
                } else {
                    x = this.t2.map((v: any) => ({...v}));
                    x.push({
                        name: "",
                        requirement: false,
                        values: "",
                    });

                    this.t2 = x;
                }
            },

            async saveApi() {
                if (this.myAddExternalApi) {
                    const res = await this.myAddExternalApi.validate()

                    if (res.valid && this.ExternalApi) {
                        this.ExternalApi.headers = []
                        this.t1.map((item: Params) => {
                            this.addParamsTf({
                                name: item.name,
                                requirement: item.requirement,
                                values: item.values
                            }, 'header')
                        })

                        this.ExternalApi.params = []
                        this.t2.map((item: Params) => {
                            this.addParamsTf({
                                name: item.name,
                                requirement: item.requirement,
                                values: item.values
                            }, 'param')
                        })


                        let response = await this.addExternalApiAction(this.ExternalApi)

                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'api ویرایش شد '
                            });
                            this.$emit("closeDialog", false);
                        }
                    }
                }

            },


        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
