`
<template>
    <popupWindow :close-btn="true" v-if="winSize!==0" :resize="true" :top="winSize>500?'10px':'10px'"
                 :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
                 :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                 :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'50vh':'50vh'"
                 :width="winSize>500?'30vw':'80vw'" @closeWindow="$emit('closeWindow',true)">


        <v-card dir="rtl"
                style="height: 100%"

                class="bg-white pa-2 rounded-b-lg myForm">


            <simple-dialog
                    :show="choiceValuesDialog"
                    topic=""
                    width="50vw"
                    height="44dvh"
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
                            <v-row class="ma-0 myForm" style="height: calc(40dvh - 90px)!important;overflow-y: auto"
                                   v-if="fieldSelectedForChoice">

                                <v-col sm="4" cols="12" v-for="(value,index) in fieldSelectedForChoice.value"
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
                                                v-model="fieldSelectedForChoice.value[index]"
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

            <v-fade-transition>
                <v-card style="height: calc(100% - 35px);overflow: auto" v-if="fields"
                        class="pa-2 border ">

                    <v-form ref="fieldFormRef">
                        <v-row v-for="item in fields"
                               :key="item.name" class="ma-0 pa-0  border-b">
                            <v-col cols="3">
                                <p style="font-size: 12px" class="mt-2">{{ item.name }}</p>
                            </v-col>

                            <v-col cols="9">

                                <v-text-field v-if="item.type === FieldTypes.String"
                                              density="compact"
                                              v-model="item['value']"
                                              variant="solo"
                                              class="mt-1 mb-n2"
                                              type="text"
                                              :rules="item.is_required?requiredRule:[]"
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">{{item.name}}</p>
                                    </template>
                                </v-text-field>

                                <v-text-field v-if="item.type === FieldTypes.Int"
                                              density="compact"
                                              v-model="item.value"
                                              variant="solo"
                                              class="mb-n2"
                                              type="text"
                                              :rules="item.is_required?text_number.concat(requiredRule):text_number"

                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">{{item.name}}</p>
                                    </template>
                                </v-text-field>

                                <v-checkbox-btn
                                        v-if="item.type === FieldTypes.Boolean"
                                        density="compact"
                                        v-model="item.value"
                                        class="mb-n2"
                                        :rules="item.is_required?requiredRule:[]"

                                ></v-checkbox-btn>

                                <v-autocomplete
                                        v-if="item.type === FieldTypes.Choice"
                                        v-model="item.value"
                                        :items="item.layer_field_choices"
                                        density="compact"
                                        variant="solo"
                                        :rules="item.is_required?requiredRule:[]"
                                        class="mb-n1"
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">{{item.name}}</p>
                                    </template>
                                </v-autocomplete>

                                <div v-if="item.type === FieldTypes.Date" class="pa-1">
                                    <date-picker color="rgb(var(--v-theme-primary))" v-model="item.value"
                                                 :rules="item.is_required?requiredRule:[]"
                                                 :placeholder="item.name"></date-picker>
                                </div>
                                <div v-if="item.type === FieldTypes.DateTime" class="pa-1">
                                    <date-picker color="rgb(var(--v-theme-primary))" :placeholder="item.name"
                                                 :rules="item.is_required?requiredRule:[]"
                                                 type="datetime" v-model="item.value"></date-picker>
                                </div>
                                <div v-if="item.type === FieldTypes.Time" class="pa-1">
                                    <date-picker v-model="item.value" color="rgb(var(--v-theme-primary))"
                                                 :placeholder="item.name" :rules="item.is_required?requiredRule:[]"
                                                 type="time"></date-picker>
                                </div>
                                <v-text-field v-if="item.type === FieldTypes.Float"
                                              density="compact"
                                              v-model="item.value"
                                              variant="solo"
                                              class="mt-1 mb-n2"
                                              :rules="item.is_required?requiredRule:[]"
                                              type="number"
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">{{item.name}}</p>
                                    </template>
                                </v-text-field>
                                <v-btn @click="showChoiceValuesDialog(item)" v-if="item.type === FieldTypes.List"
                                       variant="tonal"
                                       prepend-icon="mdi-format-list-bulleted"
                                       style="font-weight: bold !important;font-size: 10px"
                                       rounded="lg"
                                       size="small"
                                       class="mt-1"
                                       color="primary"
                                >
                                    لیست مقادیر
                                </v-btn>

                            </v-col>
                        </v-row>
                    </v-form>


                </v-card>
            </v-fade-transition>
            <v-fade-transition>
                <v-row justify="end" class="ma-0 pa-2 ml-n2" v-if="fields">
                    <v-btn
                            variant="tonal"
                            prepend-icon="mdi-content-save"
                            style="font-weight: bold !important;font-size: 10px"
                            rounded="lg"
                            size="small"
                            class=""
                            color="primary"
                            @click="saveFieldForm"
                    >
                        ذخیره
                    </v-btn>
                </v-row>
            </v-fade-transition>


        </v-card>


    </popupWindow>


</template>

<script lang="ts">
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import {defineComponent, ref, watch, onMounted, PropType} from "vue"
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {LayerItem} from "@/store/openLayer/types";
    import feature_functions from "@/componentFunctions/feature_functions";
    import popupWindow from "@/components/common/popupWindow.vue";
    import {LayerFields, LayerFieldTypes} from "@/models/Layer.Interface";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import {Field} from "@/models/Feature.interface";
    import Feature from 'ol/Feature.js';
    import extra_layer_functions from "@/componentFunctions/extra_layer_functions";


    export default defineComponent({
        name: "LayerFieldsFormComponent",
        setup(props) {
            const activePlugin = ref<number>(0)
            const store = useStore();
            const toast = useToast()
            const {text_number, requiredRule} = rules()
            const fieldFormRef = ref<VForm>()

            const fields = ref<Field[]>([])

            const initFieldsFun = () => {
                if (activeLayerFieldsList.value.length > 0) {
                    const res = activeLayerFieldsList.value.map((field) => {
                        const res: Field = {
                            id: field.id,
                            OName: field.name,
                            name: field.p_topic ? field.p_topic : field.name,
                            value: null,
                            type: field.type,
                            is_required: field.is_required,
                            layer_field_choices: field.layer_field_choices
                        }
                        return res
                    })
                    if (props.initFields.length > 0)
                        return props.initFields
                    else if (props.feature) {
                        res.map((field) => {
                            if (props.feature)
                                for (let [k, v] of Object.entries(props.feature.getProperties())) {
                                    if (k === field.OName) {
                                        field.value = v
                                    }
                                }
                        })
                        return res
                    } else
                        return res

                } else
                    return []
            }

            const {getLayerFieldsInFeature, activeLayerFieldsList,getActiveLayerFields} = feature_functions()


            watch(() => store.getters.getActiveLayer, (value: LayerItem) => {
                getLayerFieldsInFeature()
            });

            watch(() => props.layerId, async (value: number|undefined) => {
                if (value){
                    await getActiveLayerFields(value)
                }

            });

            onMounted(async () => {
                if (props.layerId){
                    await getActiveLayerFields(props.layerId)
                    fields.value = initFieldsFun()
                }else {
                    await getLayerFieldsInFeature()
                    fields.value = initFieldsFun()
                }

            })

            return {
                activePlugin,
                activeLayerFieldsList,
                toast,
                store,
                text_number,
                fieldFormRef,
                initFieldsFun,
                fields,
                requiredRule
            }
        },
        components: {popupWindow, SimpleDialog},
        emits: ['closeWindow', 'saveFieldsForm'],
        data() {
            return {
                winSize: 0,
                FieldTypes: LayerFieldTypes,
                choiceValuesDialog: false,

                fieldSelectedForChoice: null as Field | null,


            };
        },


        props: {
            initFields: {
                type: Array as PropType<Field[]>,
                required: false,
                default: () => {
                    return []
                }
            },
            feature: {
                type: Feature,
                required: false,
                default: undefined
            },
            layerId:{
                type:Number,
                required:false
            }
        },
        methods: {
            //--------------------
            addValue() {
                if (this.fieldSelectedForChoice && this.fieldSelectedForChoice.value) {
                    this.fieldSelectedForChoice.value.push('')
                }

            },
            deleteValue(index: number) {
                if (this.fieldSelectedForChoice && this.fieldSelectedForChoice.value) {
                    this.fieldSelectedForChoice.value.splice(index, 1)
                }

            },
            async saveFieldSelectedForChoice() {
                if (this.fieldSelectedForChoice && this.fieldSelectedForChoice.value) {
                    this.fields.map((field) => {
                        if (this.fieldSelectedForChoice)
                            if (field.id === this.fieldSelectedForChoice.id) {
                                field.value = this.fieldSelectedForChoice.value
                            }
                    })
                    this.choiceValuesDialog = false
                }
            },

            showChoiceValuesDialog(item: Field) {
                if (!item.value) {
                    item.value = []
                }
                this.fieldSelectedForChoice = item
                this.choiceValuesDialog = true
            },
            //-------------------
            async saveFieldForm() {
                if (this.fieldFormRef) {
                    const res = await this.fieldFormRef.validate()
                    if (res.valid) {
                        this.$emit('saveFieldsForm', this.fields)
                        this.$emit('closeWindow', true)

                    }
                }
            },

        },
        mounted(): void {
            this.winSize = window.innerWidth
        },
        watch: {
            activeLayerFieldsList() {
                this.fields = this.initFieldsFun()
            }
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
