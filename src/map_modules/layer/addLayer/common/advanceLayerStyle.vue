<template>
    <simple-dialog
            :width="'70vw'"
            :height="'85dvh'"
            :topic="'تنظیمات مشخصات پیشرفت لایه'"
            :show="showDialog"
            @closeDialog="$emit('hide', false)"
    >
        <div style="min-height: 70dvh;max-height:83vh;width: 100%;background-color: #f3f3f3;" class="myForm">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 83vh" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <template v-else>
                <v-row class="ma-0 pa-2 pr-4">

                    <v-btn
                            @click="addRule"
                            size="x-small"
                            prepend-icon="mdi-plus"
                            variant="tonal"
                            style="font-weight: bold !important"
                            color="primary"
                            class="elevation-1 ml-2"
                    >اضافه کردن
                    </v-btn>

                </v-row>
                <v-row class="ma-0 " style="height: calc(83dvh - 90px)!important;overflow-y: auto">
                    <v-col sm="6" cols="12" v-for="(rule,index) in advanceStyle.rules" v-bind:key="rule.style">
                        <v-card class="rounded-lg" height="130px">
                            <v-row class="ma-0 pa-0">
                                <v-col cols="7" sm="6">
                                    <v-autocomplete
                                            :items="filterTypes"
                                            density="compact"
                                            variant="solo"
                                            v-model="rule.filter_type"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-code-brackets"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">انتخاب نوع شرط</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn
                                            @click="selectStyle(rule)"
                                            size="small"
                                            variant="tonal"
                                            style="font-weight: bold !important"
                                            color="primary"
                                            class="elevation-1 ml-2"
                                    >استایل
                                    </v-btn>
                                </v-col>

                                <v-spacer></v-spacer>
                                <v-col cols="4" class="ma-0 pa-1 ">
                                    <v-row class="ma-0 pa-0 mt-1" justify="end">
                                        <v-btn
                                                density="comfortable"
                                                size="x-small"
                                                @click="addCondition(rule)"
                                                icon="mdi-plus"
                                                variant="text"
                                                color="primary"
                                                class=" ml-2"
                                        >
                                        </v-btn>
                                        <v-btn
                                                density="comfortable"
                                                size="x-small"
                                                icon="mdi-delete-outline"
                                                variant="text"
                                                color="error"
                                                class=" ml-2"
                                                @click="deleteRule(index)"
                                        >
                                        </v-btn>
                                    </v-row>

                                </v-col>
                            </v-row>
                            <div class="px-1 ma-0 mt-n2" style="  overflow: auto;white-space: nowrap;">
                                <div style="position: relative; display: inline-block; width: 70%;
                            height: 65px;background-color: #f3f3f3;" class="ma-1 rounded elevation-1"
                                     v-for="(condition,index) in rule.conditions " v-bind:key="condition.operator">

                                    <v-btn
                                            density="comfortable"
                                            @click="deleteCondition(rule,index)"
                                            size="x-small"
                                            icon="mdi-minus"
                                            style="position: absolute; left: -12px;top: -4px;z-index: 100001"
                                            color="error"
                                            class=" ml-2"
                                    >
                                    </v-btn>
                                    <v-row class="ma-0 pa-0 pt-3" align="center" style="height: 100%">
                                        <v-col cols="6" class="ma-0 pa-1">
                                            <v-autocomplete
                                                    :items="filterOperators"
                                                    density="compact"
                                                    variant="solo"
                                                    v-model="condition.operator"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-code-brackets"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">انتخاب نوع قاعده</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="6" class="ma-0 pa-1">
                                            <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    v-model="condition.value"

                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">مقدار</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                    </v-row>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-2" justify="end">

                    <v-btn
                            v-if="layerFieldStyleId===0"
                            variant="tonal"
                            @click="saveAdvanceStyle"
                            prepend-icon="mdi-content-save"
                            style="font-weight: bold !important"
                            rounded="lg"
                            size="small"
                            class="mt-1"
                            color="primary"
                    >ذخیره
                    </v-btn>
                    <v-btn
                            v-else
                            variant="tonal"
                            @click="saveAdvanceStyle"
                            prepend-icon="mdi-content-save"
                            style="font-weight: bold !important"
                            rounded="lg"
                            size="small"
                            class="mt-1"
                            color="primary"
                    >ویرایش
                    </v-btn>

                </v-row>
            </template>

        </div>


        <base-layer-style

                :show="styleDialog"
                @hide="styleDialog = false"
                :layerTypeProp="layerType"
                :layer-id="layerId"
                :advanceStyle="true"
                :styleObject="styleInit"
                @saveAdvanceStyle="getStyle"

        ></base-layer-style>

    </simple-dialog>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import simpleDialog from "@/components/common/simpleDialog.vue";
    import {AdvanceStyle} from "@/models/Style.interface";
    import {default as advance_function} from "@/componentFunctions/advanceStyle_functions";
    import BaseLayerStyle from "@/map_modules/layer/addLayer/common/baseLayerStyle.vue";

    export interface Conditions {
        operator: string | null
        value: string | null
    }

    export interface Rule {
        style: any
        filter_type: string | null
        conditions: Conditions[]
    }

    export default defineComponent({
        name: "AdvanceLayerStyle",
        components: {simpleDialog, BaseLayerStyle},

        setup(props) {
            const {
                editAdvanceModelStyle, getListFilterOperators,
                getListFilterTypes, filterTypes, filterOperators,
                addAdvanceModelStyle, getItemAdvanceStyle, advanceStyleItem
            } = advance_function()

            const advanceStyle = ref<AdvanceStyle>({
                prop: 0,
                rules: []
            })

            const initData = ref(false)

            onMounted(async () => {
                await getListFilterOperators()
                await getListFilterTypes()

                setTimeout(() => {
                    initData.value = true
                }, 200)


            })

            return {
                advanceStyle,
                filterTypes,
                filterOperators,
                addAdvanceModelStyle,
                getItemAdvanceStyle,
                advanceStyleItem,
                editAdvanceModelStyle,
                initData
            }
        },
        data() {
            return {
                showDialog: false,

                styleDialog: false,
                layerType: 'POLYGON',
                layerId: 50,
                selectedRuleStyle: null as null | Rule,
                styleInit: null as any,
            };
        },
        props: {
            show: Boolean,
            layerFieldId: {
                type: Number,
                required: false,
                default: 0
            },
            layerFieldStyleId: {
                type: Number,
                required: false,
                default: 0
            },
            layerTypeProp: {
                type: String,
                default: ''
            },
        },
        methods: {
            addRule() {
                if (this.advanceStyle) {
                    this.advanceStyle.rules.push({
                        style: null,
                        conditions: [],
                        filter_type: null
                    })
                }
            },
            addCondition(rule: Rule) {
                rule.conditions.push({
                    operator: null,
                    value: null
                })
            },

            deleteCondition(rule: Rule, index: number) {
                rule.conditions.splice(index, 1)

            },
            deleteRule(index: number) {
                this.advanceStyle.rules.splice(index, 1)
            },

            getStyle(value: any) {
                if (this.selectedRuleStyle)
                    this.selectedRuleStyle.style = value
                this.selectedRuleStyle = null
            },
            selectStyle(rule: Rule) {
                this.styleInit = rule.style
                this.styleDialog = true
                this.selectedRuleStyle = rule
            },
            async saveAdvanceStyle() {
                let response
                if (this.layerFieldStyleId === 0) {
                    response = await this.addAdvanceModelStyle(this.advanceStyle)
                } else {
                    response = await this.editAdvanceModelStyle(this.advanceStyle, this.layerFieldStyleId)
                }

                if (response) {
                    this.$toast.add({
                        group: 'tr',
                        life: 7000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'مدل پیشرفته استایل ذخیره شد '
                    });

                    this.$emit('setLayerFieldStyleId', response.id)
                    this.$emit('hide', false)
                }

            }
        },
        watch: {
            show() {
                this.showDialog = this.show;
            },
            layerFieldId() {
                if (this.layerFieldId) {
                    this.advanceStyle.prop = this.layerFieldId
                    this.advanceStyle.rules = []
                }

            },

            layerTypeProp() {
                if (this.layerTypeProp !== '') {
                    this.layerType = this.layerTypeProp
                }
            },
            async layerFieldStyleId() {
                if (this.layerFieldStyleId) {
                    this.initData = false
                    await this.getItemAdvanceStyle(this.layerFieldStyleId)
                    if (this.advanceStyleItem)
                        this.advanceStyle = this.advanceStyleItem
                    setTimeout(() => {
                        this.initData = true
                    }, 300)
                }
            }
        },
        updated(): void {
            if (this.layerTypeProp !== '') {
                this.layerType = this.layerTypeProp
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
