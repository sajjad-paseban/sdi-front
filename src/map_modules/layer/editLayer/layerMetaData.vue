<template>
    <v-slide-y-transition>
        <div v-if="show" class="py-1" style="height: 100%">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-slide-y-transition>
                <v-card v-if="initData" class="ma-0 pa-2 px-1" style="height: 100%; overflow: auto">
                    <v-row
                            class="ma-0 px-2 metaBtn"
                            style=" white-space: nowrap !important"
                    >
                        <v-btn

                                @click="tableFilterActivate = !tableFilterActivate"
                                prepend-icon="mdi-filter"
                                variant="tonal"
                                style="font-weight: bold !important"
                                rounded
                                color="primary"
                                size="x-small"
                                class="elevation-1 ml-2"
                        >فیلتر
                        </v-btn>


                        <v-btn
                                variant="tonal"
                                prepend-icon="mdi-plus"
                                style="font-weight: bold !important"
                                rounded
                                @click="addItemToTable"
                                size="x-small"
                                color="primary"
                                class="elevation-1 ml-2"
                        >افزودن عارضه جدول توصیفی
                        </v-btn>

                        <v-btn
                                variant="tonal"
                                prepend-icon="mdi-plus"
                                style="font-weight: bold !important"
                                rounded
                                size="x-small"
                                class="elevation-1"
                                color="primary"
                                @click="connectDataBaseDialog = true"
                        >افزودن اقلام توصیفی ، اتصال از سایر جداول
                        </v-btn
                        >
                    </v-row>

                    <div id="table" class="metaTable">
                        <EditableTable
                                ref="editTable"
                                :save-edit-item-callback="saveEditItemCallback"
                                :headers="headers"
                                :items="metaList"
                                :action="actions"
                                :checkBox="false"
                                :height="height"
                                :filter-activate="tableFilterActivate"
                                @actionClick="actionsClick"
                        ></EditableTable>
                    </div>
                </v-card>
            </v-slide-y-transition>

        </div>
    </v-slide-y-transition>

    <simple-dialog
            :show="connectDataBaseDialog"
            topic=""
            width="50vw"
            height="70vh"
            @closeDialog="connectDataBaseDialog = false"
    >
        <v-card dir="ltr" width="100%" height="100%">


            <div
                    class=""
                    dir="rtl"
                    style="
            padding-top: 15px !important;
            overflow: auto;
            height: 100%;
            background-color: #dee2e62b;">
                <Fieldset
                        style="height: max-content; margin-inline: 20px !important"
                        legend="افزودن اقلام توصیفی"
                        class="myFieldset"
                >
                    <p class="pb-2">
                        برای اتصال جداول برای واکشی اطلاعات باید ارتباط را ایجاد کنید .
                    </p>
                    <p>
                        منظور از جدول مبدا ، همان لایه ای است که در حال اضافه کردن به
                        سامانه میباشد و جدول مقصد همان جدولی است که با آن ارتباط میگیریم.
                    </p>
                </Fieldset>

                <v-row class="ma-0 pa-2 addMetaDialog" align="center">
                    <v-card
                            width="100%"
                            height="100%"
                            class="ma-0 pa-0"
                    >
                        <v-row class="ma-0 pt-0" style="height:calc(100% - 50px);" align="center">
                            <v-form ref="connectionForm" v-model="valid" class="myForm" style="width: 100%">
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12" md="4" lg="3">
                                        <v-autocomplete
                                                :items="databasesList"
                                                item-value="id"
                                                item-title="topic"
                                                v-model="connection.d_database_id"
                                                @update:modelValue="databasesUpdate"
                                                density="compact"
                                                :rules="nameRule"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-database"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">انتخاب دیتابیس</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="4" lg="3">
                                        <v-autocomplete
                                                :disabled="connection.d_database_id== null"
                                                v-model="connection['d_table_name']"
                                                :items="dataBaseTables"
                                                @update:modelValue="tableNameUpdate"
                                                density="compact"
                                                :rules="nameRule"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-table"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">انتخاب جدول</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="5" lg="4">
                                        <v-autocomplete
                                                :disabled="connection['d_table_name'] == null"
                                                v-model="connection['d_selected_field']"
                                                :items="tableFieldsList"
                                                density="compact"
                                                item-value="column_name"
                                                :rules="nameRule"
                                                item-title="column_name"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon
                                                        color="primary"
                                                        icon="mdi-information-variant"
                                                />
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">انتخاب فیلد از جدول مقصد</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row class="pa-0 ma-0">
                                    <p
                                            class="mr-3"
                                            style="font-size: 10px; line-height: 20px; color: #969898"
                                    >
                                        انتخاب کلید ارتباط دو جدول
                                    </p>
                                </v-row>
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12" md="4" lg="3">
                                        <v-autocomplete
                                                :disabled="connection['d_selected_field'] == null"
                                                v-model="connection['d_connection_filed']"
                                                :items="tableFieldsList"
                                                item-value="column_name"
                                                item-title="column_name"
                                                :rules="nameRule"
                                                density="compact"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-key"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">کلید جدول مقصد</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="4" lg="3">
                                        <v-autocomplete
                                                :disabled="connection['d_selected_field'] == null"
                                                v-model="connection['l_connection_filed']"
                                                :items="layerFieldsList"
                                                item-value="name"
                                                item-title="name"
                                                :rules="nameRule"
                                                density="compact"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-key"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">کلید جدول مبدا</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" md="4" lg="3">
                                        <v-text-field
                                                density="compact"
                                                v-model="connection.l_field_topic"
                                                variant="solo"
                                                required
                                                type="text"
                                                :rules="nameRule"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">عنوان فیلد</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-row>

                        <v-row class="ma-0 pa-0  mx-1 mt-3" justify="end">
                            <v-btn
                                    class="elevation-1 mt-1"
                                    :loading="btnLoading"
                                    variant="tonal"
                                    append-icon="mdi-table"
                                    style="font-weight: bold !important; font-size: 9px"
                                    @click="seeResult"
                                    rounded="lg"
                                    size="x-small"
                                    color="primary"
                            >مشاهده نتیجه
                            </v-btn>
                            <!--                            <v-btn
                                                                class="elevation-1 mx-1 mt-1"
                                                                variant="tonal"
                                                                append-icon="mdi-connection"
                                                                style="font-weight: bold !important; font-size: 9px"
                                                                rounded="lg"
                                                                size="x-small"
                                                                color="primary"
                                                        >بررسی ارتباط
                                                        </v-btn>-->

                        </v-row>
                    </v-card>
                </v-row>


                <v-row class="ma-0 pa-0 " align="end">
                    <v-spacer></v-spacer>

                    <v-btn
                            class=""
                            @click="saveAddMetaDataConnection"
                            variant="text"
                            style="
                font-weight: bold !important;
                font-size: 10px;
                margin-inline: 10px !important;
              "
                            rounded="lg"
                            color="info"
                    >ذخیره
                    </v-btn>
                </v-row>
            </div>
        </v-card>
    </simple-dialog>

    <simple-dialog
            :show="addConnectionFieldSample"
            topic=""
            width="70vw"
            height="90vh"
            @closeDialog="addConnectionFieldSample = false"
    >
        <v-card dir="ltr" width="100%" height="100%">


            <div
                    class=""
                    dir="rtl"
                    style="
            padding-top: 15px !important;
            overflow: auto;
            height: 100%;
            background-color: #dee2e62b;">


                <v-row class="ma-0 pa-2" align="center" style="height: 100%">
                    <v-card
                            width="100%"
                            height="100%"
                            class="ma-0 pa-0"
                            min-height="75dvh"
                            style="overflow-y: auto"
                    >
                        <div id="table2" style="height: 100%">
                            <EditableTable
                                    v-if="addConnectionFieldSample"
                                    ref="editTable"
                                    :headers="addConnectionFieldSampleHeaders"
                                    :items="sampleJoinTableList"
                                    :height="height2"

                            ></EditableTable>
                        </div>
                    </v-card>
                </v-row>

            </div>
        </v-card>
    </simple-dialog>

    <LabelLayerStyle
            v-if="metaList.length>0"
            :show="labelDialog"
            @hide="labelDialog = false"
            @setLayerModelId="setFieldTextModelId"
            :layer-id="layerId"
            :layerFieldId="layerFieldId"
            :id="labelDialog?layerFieldTextModelId:0"
    ></LabelLayerStyle>

    <AdvanceLayerStyle
            :show="advanceDialog"
            :layerFieldId="layerFieldId"
            :layerTypeProp="layerType"
            :layerFieldStyleId="layerFieldAdvanceModelId"
            @setLayerFieldStyleId="setFieldAdvanceModelId"
            @hide="()=>{
            this.advanceDialog = false
            this.layerFieldId=0
            this.layerFieldAdvanceModelId=0
        }">
    </AdvanceLayerStyle>

    <simple-dialog
            :show="choiceValuesDialog"
            topic=""
            width="50vw"
            height="44vh"
            @closeDialog="choiceValuesDialog = false"
    >

        <div
                class=""
                dir="rtl"
                style="
            overflow: auto;
            height: 100%;
            background-color: #dee2e62b;">
            <v-row class="ma-0 pa-2" align="center" style="height: 100%">
                <v-card
                        width="100%"
                        height="40dvh"
                        class="ma-0 pa-0 elevation-0"
                        style="overflow-y: auto;background-color: rgba(180,180,180,0)!important;"
                >
                    <v-row class="ma-0 pa-1 pr-4">

                        <v-btn
                                @click="addValue"
                                size="x-small"
                                prepend-icon="mdi-plus"
                                variant="tonal"
                                style="font-weight: bold !important"
                                color="primary"
                                class="elevation-1 ml-2"
                        >اضافه کردن
                        </v-btn>
                        <v-divider class="mt-2"></v-divider>
                    </v-row>
                    <v-row class="ma-0 myForm" style="height: calc(40dvh - 90px)!important;overflow-y: auto" v-if="fieldSelectedForChoice">

                        <v-col sm="4" cols="12" v-for="(value,index) in fieldSelectedForChoice.layer_field_choices"
                               v-bind:key="index">
                            <div style="position: relative;">

                                <v-btn
                                        density="comfortable"
                                        @click="deleteValue(index)"
                                        size="x-small"
                                        icon="mdi-minus"
                                        style="position: absolute; left: -12px;top: -4px;z-index: 100001"
                                        color="error"
                                        class=" ml-2"
                                >
                                </v-btn>
                                <v-text-field
                                        density="compact"
                                        variant="solo"
                                        v-model="fieldSelectedForChoice.layer_field_choices[index]"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                </v-text-field>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="ma-0 pa-2" justify="end">

                        <v-btn
                                @click="saveFieldSelectedForChoice"
                                variant="tonal"
                                prepend-icon="mdi-content-save"
                                style="font-weight: bold !important"
                                rounded="lg"
                                size="small"
                                class="mt-1"
                                color="primary"
                        >ذخیره
                        </v-btn>
                    </v-row>

                </v-card>
            </v-row>

        </div>

    </simple-dialog>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import Fieldset from "primevue/fieldset";
    import EditableTable, {TableValuesTypes} from "@/components/common/editableTable.vue";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import layer_functions from "@/componentFunctions/layer_functions";
    import {Layer_types, LayerFields, LayerFieldTypes, ResponseLayerUpload} from "@/models/Layer.Interface";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import {useStore} from "vuex";
    import LabelLayerStyle from "@/map_modules/layer/addLayer/common/labelLayerStyle.vue";
    import AdvanceLayerStyle from '@/map_modules/layer/addLayer/common/advanceLayerStyle.vue'
    import databases from "@/componentFunctions/connection_database_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {JoinTablesSD} from "@/api/connections/SD.Models/joinTables.sd";


    export default defineComponent({
        name: "editLayerMetaData",
        components: {Fieldset, EditableTable, SimpleDialog, LabelLayerStyle, AdvanceLayerStyle},

        setup() {
            const {layerFieldsList, getLayerFields, getLayerDatabaseInfo, layerDatabaseInfo, deleteLayerMetaData, addLayerMetaData, editLayerMetaData, saveLayerMetaDataChoices} = layer_functions()
            const {
                databasesList, getDatabases, getDataBaseTables,
                dataBaseTables, getTableFields, tableFieldsList, sampleJoinTableList, getSampleJoinTables, saveJoinTables
            } = databases()

            const connectionForm = ref<VForm>()
            const {nameRule} = rules()

            const router = useRouter()
            const route = useRoute()
            const toast = useToast()
            const store = useStore()

            const layerId = ref<number>()
            const layerType = ref<Layer_types>(Layer_types.Polygon)
            const metaList = ref<LayerFields[]>([])
            const initData = ref<boolean>(false)
            const headers = ref([
                {text: "نام", value: "name", width: "15%"},
                {text: "اسم انگلیسی", value: "e_topic", width: "15%"},
                {text: "اسم فارسی", value: "p_topic", width: "15%", type: TableValuesTypes.string},
                {text: "نوع داده", value: "type", width: "10%", type: TableValuesTypes.list},
                {text: "فعال", value: "is_active", width: "5%", type: TableValuesTypes.bool},
                {text: "لیبل", value: "active_label", width: "5%", type: TableValuesTypes.bool},

            ])

            onMounted(async () => {

                if (!route.params.id) {

                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'لایه مشخص نیست'
                    });
                    router.go(-1)
                } else {
                    if (route.path.includes('addEmptyLayer')) {
                        headers.value.push({text: "یکتا", value: "is_unique", width: "5%", type: TableValuesTypes.bool})
                        headers.value.push({
                            text: "الزامی",
                            value: "is_required",
                            width: "5%",
                            type: TableValuesTypes.bool
                        })
                    }

                    layerId.value = parseInt(String(route.params.id))
                    layerType.value = String(route.params.layer_type) as Layer_types

                    await getLayerFields(layerId.value)
                    if (layerFieldsList.value) {
                        metaList.value = layerFieldsList.value.map((item) => {
                            const result = {...item}
                            result.type = {
                                value: item.type,
                                list: Object.values(LayerFieldTypes)
                            }
                            return result
                        })
                    }

                    await getDatabases()
                    await getLayerDatabaseInfo(layerId.value)

                    setTimeout(() => {
                        initData.value = true
                    }, 200)

                }
            })

            return {
                layerFieldsList,
                getLayerFields,
                layerId,
                metaList,
                store,
                databasesList,
                initData,
                getDataBaseTables,
                dataBaseTables,
                getTableFields,
                tableFieldsList,
                nameRule,
                connectionForm,
                sampleJoinTableList,
                getSampleJoinTables,
                layerDatabaseInfo,
                saveJoinTables,
                deleteLayerMetaData,
                addLayerMetaData, editLayerMetaData, headers,
                saveLayerMetaDataChoices,layerType
            }
        },

        data() {
            return {
                valid: false,


                connection: {
                    d_database_id: null,
                    d_table_name: null,
                    d_selected_field: null,
                    d_connection_filed: null,
                    l_connection_filed: null,
                    l_field_topic: null
                } as JoinTablesSD,


                show: false,

                connectDataBaseDialog: false,

                // /-------table data---------/
                tableFilterActivate: false,

                height: "",  //  برای اندازه ازتفاع جدول //

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
                    {
                        text: "تنظیمات استایل لیبل",
                        icon: "mdi-format-textbox",
                        color: "primary",
                    },
                    {
                        text: "تنظیمات استایل پیشرفته",
                        icon: "mdi-palette-swatch",
                        color: "secondary-darken-1",
                    },
                    {
                        text: "مقادیر ثابت فیلد",
                        icon: "mdi-clipboard-list-outline",
                        color: "success-darken-2",
                    },
                ],
                // /-------table data---------/

                labelDialog: false,
                layerFieldTextModelId: 0,
                layerFieldAdvanceModelId: 0,
                layerFieldId: 0,
                advanceDialog: false,
                //-------------------

                addConnectionFieldSample: false,
                height2: '',
                addConnectionFieldSampleHeaders: [] as object[],
                btnLoading: false,

                choiceValuesDialog: false,
                fieldSelectedForChoice: null as LayerFields | null

            };
        },

        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //
        props: {
            msg: String,
        },
        watch: {
            choiceValuesDialog() {
                if (this.choiceValuesDialog === false) {
                    this.fieldSelectedForChoice = null
                }
            }
        },
        methods: {

            async nextPageFunc(): Promise<{ result: boolean, data: ResponseLayerUpload | null }> {
                if (this.layerId&&this.layerType){
                    return {result: true, data: {id:this.layerId,type_layer:this.layerType,name:''}}
                }else {
                    return {result: false, data: null}
                }

            },

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    item.editMode = true;
                } else if (value == "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            if (item.id !== 0) {
                                await this.deleteMetaData(item.id)
                            } else {
                                this.metaList = items.filter((i: any) => {
                                    return i.name !== item.name;
                                });
                            }

                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
                } else if (value == "تنظیمات استایل لیبل") {
                    this.layerFieldId = item.id
                    this.layerFieldTextModelId = item.text_model_style ? item.text_model_style : 0
                    this.labelDialog = true
                } else if (value === 'تنظیمات استایل پیشرفته') {
                    this.layerFieldId = item.id
                    this.layerFieldAdvanceModelId = item.advance_model_style ? item.advance_model_style : 0
                    this.advanceDialog = true
                } else if (value === 'مقادیر ثابت فیلد') {
                    if (item.type.value === 'choice') {
                        this.choiceValuesDialog = true
                        this.fieldSelectedForChoice = item
                    } else {
                        this.$toast.add({
                            group: 'br',
                            life: 4000,
                            severity: 'error',
                            summary: ' خطا',
                            detail: 'این گزینه برای این فیلد فعال نمیباشد'
                        });
                    }
                }
            },

            addItemToTable() {
                let flag = true
                this.metaList.forEach((i) => {
                    if (i.name === '' || i.type.value === '') {
                        console.log(i)
                        flag = false
                    }
                })

                if (flag) {
                    let x = this.metaList.map((v: any) => ({...v}));
                    x.reverse()
                    x.push({
                        editMode: true,
                        name: "",
                        id: 0,
                        e_topic: '',
                        p_topic: '',
                        type: {
                            value: '',
                            list: Object.values( LayerFieldTypes)
                        },
                        is_active: false,
                        is_required: false,
                        is_unique: false,
                        active_label: false,
                    });

                    this.metaList = x;
                    this.metaList.reverse()
                } else {
                    this.$toast.add({
                        group: 'br',
                        life: 3000,
                        severity: 'error',
                        summary: ' اخطار',
                        detail: "آیتمی از لیست اطلاعات آن کامل نمیباشد"
                    });
                }

            },

            async saveEditItemCallback(item: any) {
                if (item.newItem.name && item.newItem.type.value) {
                    let res
                    if (item.item.id === 0) {
                        res = await this.addMetaData(item.newItem)
                    } else {
                        res = await this.editMetaData(item.newItem, item.newItem.id)
                    }
                    return res
                } else {
                    return false
                }

            },

            setFieldTextModelId(data: number) {
                const newMeta: LayerFields[] = this.metaList.map((item) => {
                    if (item.id === this.layerFieldId) {
                        item.text_model_style = data
                    }
                    return item
                })

                this.metaList = [...newMeta]
            },

            setFieldAdvanceModelId(data: number) {
                const newMeta: LayerFields[] = this.metaList.map((item) => {
                    if (item.id === this.layerFieldId) {
                        item.advance_model_style = data
                    }
                    return item
                })

                this.metaList = [...newMeta]
            },

            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);

            },

            screenResizeHandler2() {
                let x2: any = document.getElementById("table2");
                this.height2 = String(x2.offsetHeight);
            },

            async databasesUpdate() {
                if (this.connection.d_database_id) {
                    await this.getDataBaseTables(this.connection.d_database_id)
                }

            },

            async tableNameUpdate() {
                if (this.connection.d_table_name && this.connection.d_database_id) {
                    await this.getTableFields(this.connection.d_table_name, this.connection.d_database_id)
                }
            },

            checkConnection() {
                console.log('check')
            },

            async seeResult() {
                this.btnLoading = true
                if (this.connectionForm) {
                    const res = await this.connectionForm.validate()
                    if (res.valid && this.layerDatabaseInfo) {
                        console.log(this.connection)
                        await this.getSampleJoinTables({
                            ...this.connection,
                            l_database_id: this.layerDatabaseInfo.database_id,
                            l_table_name: this.layerDatabaseInfo.table_name
                        })
                        this.addConnectionFieldSampleHeaders = []

                        for (const [key, value] of Object.entries(this.sampleJoinTableList[0])) {
                            this.addConnectionFieldSampleHeaders.push({text: key, value: key})
                        }
                        this.addConnectionFieldSample = true
                        setTimeout(() => {
                            this.screenResizeHandler2()
                        }, 200)
                    }
                }
                this.btnLoading = false
            },

            async saveAddMetaDataConnection() {
                if (this.connectionForm) {
                    const res = await this.connectionForm.validate()
                    if (res.valid && this.layerDatabaseInfo) {
                        console.log(this.connection)
                        const res = await this.saveJoinTables({
                            ...this.connection,
                            l_database_id: this.layerDatabaseInfo.database_id,
                            l_table_name: this.layerDatabaseInfo.table_name
                        })

                        if (res) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'فیلد به لایه اضافه شد .'
                            });
                            this.connectDataBaseDialog = false
                            this.connection = {
                                d_database_id: null,
                                d_table_name: null,
                                d_selected_field: null,
                                d_connection_filed: null,
                                l_connection_filed: null,
                                l_field_topic: null,
                                l_database_id: null,
                                l_table_name: null
                            }

                            if (this.layerId) {
                                this.initData = false
                                await this.getLayerFields(this.layerId)
                                if (this.layerFieldsList) {
                                    this.metaList = this.layerFieldsList.map((item) => {
                                        const result = {...item}
                                        result.type = {
                                            value: item.type,
                                            list: Object.values(LayerFieldTypes)
                                        }
                                        return result
                                    })
                                }
                                setTimeout(() => {
                                    this.initData = true
                                }, 200)
                            }

                        }

                    }
                }
            },

            //---------------------
            async deleteMetaData(id: number) {
                const res = await this.deleteLayerMetaData(id)
                if (this.layerId) {
                    this.initData = false
                    await this.getLayerFields(this.layerId)
                    if (this.layerFieldsList) {
                        this.metaList = this.layerFieldsList.map((item) => {
                            const result = {...item}
                            result.type = {
                                value: item.type,
                                list: Object.values(LayerFieldTypes)
                            }
                            return result
                        })
                    }
                    setTimeout(() => {
                        this.initData = true
                    }, 200)
                }
                return res
            },

            async addMetaData(item: any) {
                item['type'] = item['type']['value']
                item['layer'] = this.layerId

                const res = await this.addLayerMetaData(item)

                if (this.layerId) {
                    this.initData = false
                    await this.getLayerFields(this.layerId)
                    if (this.layerFieldsList) {
                        this.metaList = this.layerFieldsList.map((item) => {
                            const result = {...item}
                            result.type = {
                                value: item.type,
                                list: Object.values(LayerFieldTypes)
                            }
                            return result
                        })
                    }
                    setTimeout(() => {
                        this.initData = true
                    }, 200)
                }
                return res
            },

            async editMetaData(item: any, id: number) {
                item['type'] = item['type']['value']
                item['layer'] = this.layerId

                const res = await this.editLayerMetaData(item, id)

                if (this.layerId) {
                    this.initData = false
                    await this.getLayerFields(this.layerId)
                    if (this.layerFieldsList) {
                        this.metaList = this.layerFieldsList.map((item) => {
                            const result = {...item}
                            result.type = {
                                value: item.type,
                                list: Object.values(LayerFieldTypes)
                            }
                            return result
                        })
                    }
                    setTimeout(() => {
                        this.initData = true
                    }, 200)
                }
                return res
            },
            //--------------------
            addValue() {
                if (this.fieldSelectedForChoice && this.fieldSelectedForChoice.layer_field_choices) {
                    this.fieldSelectedForChoice.layer_field_choices.push('')
                }

            },
            deleteValue(index: number) {
                if (this.fieldSelectedForChoice && this.fieldSelectedForChoice.layer_field_choices) {
                    this.fieldSelectedForChoice.layer_field_choices.splice(index, 1)
                }

            },
            async saveFieldSelectedForChoice() {
                console.log(this.fieldSelectedForChoice)

                if (this.fieldSelectedForChoice && this.fieldSelectedForChoice.layer_field_choices) {
                    const res = await this.saveLayerMetaDataChoices({
                        layer_field_id: this.fieldSelectedForChoice.id,
                        values: this.fieldSelectedForChoice.layer_field_choices
                    })

                    if (res){
                        this.$toast.add({
                            group: 'tr',
                            life: 3000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'مقادیر ثابت فیلد ذخیره شد .'
                        });
                        this.choiceValuesDialog = false
                    }
                }


            },
            //-------------------
        },


        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 100);


            //  برای اندازه ازتفاع جدول //
            setTimeout(() => {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            }, 300);
            //  برای اندازه ازتفاع جدول //
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .metaBtn {
        height: 30px;
    }

    .metaBtn .v-btn--size-x-small {
        --v-btn-size: 0.625rem;
        --v-btn-height: 18px;
        font-size: 9px;
        min-width: 30px;
        padding: 0px 6px;
    }

    @media only screen and (max-width: 700px) {
        .metaBtn .v-btn--size-x-small {
            --v-btn-size: 0.625rem;
            --v-btn-height: 18px;
            font-size: 7px;
            min-width: 30px;
            padding: 0px 6px;
        }

        .metaBtn {
            height: 50px !important;
        }

        .metaTable {
            height: calc(100% - 52px) !important
        }
    }

    .metaTable {
        height: calc(100% - 32px)
    }

    .addMetaDialog {
        height: calc(100% - 130px)
    }

    @media only screen and (max-width: 900px) {
        .addMetaDialog {
            height: calc(100% - 37px)
        }
    }


</style>
