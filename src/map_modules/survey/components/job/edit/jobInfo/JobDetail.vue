<template>
    <div dir="rtl" style="height:100%;width:100%;overflow-y: hidden" class="">

        <div class="ma-0 pa-2 pr-4 myForm" style="height: calc(100% - 46px);width: 100%;overflow-y: hidden">

            <div style="height: 10px"></div>

            <v-fade-transition>
                <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height:calc(100% - 10px)"
                       justify="center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>
            </v-fade-transition>

            <v-fade-transition>
                <v-row style="overflow-y: auto;height:calc(100% - 10px);display: flex;align-content: flex-start;position: relative"
                       class="ma-0 pa-0 py-4 rounded-lg " v-if="initData">


                    <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                        <v-expansion-panel
                                class="rounded-lg border bg-white"
                                v-for="(item,index) in items"
                                :key="index"
                                :title="`مکان شماره ${index+1} شغل `"
                        >
                            <template v-slot:text>
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                readonly=""
                                                v-model="code"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">کد نوسازی </p>
                                            </template>
                                        </v-text-field>
                                    </v-col>


                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete
                                                v-if="code_possessiontype"
                                                :items="code_possessiontype.items"
                                                item-value="pk"
                                                v-model="item.possession_type"
                                                density="compact"
                                                variant="solo"

                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">{{ code_possessiontype.pName }}</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                        <p class="text-grey-darken-3" style="font-size: 9px">{{' تاریخ شروع در این مکان'}}</p>
                                        <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"   editable
                                                     color="rgb(var(--v-theme-info))" v-model="item.start_date"
                                                     placeholder=" تاریخ شروع در این مکان"></date-picker>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                        <p class="text-grey-darken-3" style="font-size: 9px">{{' تاریخ پایان فعالیت'}}</p>
                                        <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                                     v-model="item.end_date" color="rgb(var(--v-theme-info))" editable
                                                     placeholder=" تاریخ پایان فعالیت "></date-picker>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                        <v-checkbox v-model="item.match" color="info"
                                                    label="تطبیق با فعالیت "></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                        <v-checkbox v-model="item.opening_payment" color="info"
                                                    label=" عوارض افتتاحیه پرداخت شده"></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                        <v-checkbox color="info" v-model="item.board_payment"
                                                    label="عوارض تابلو پرداخت شده "></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                        <v-checkbox color="info" v-model="item.canopy_payment"
                                                    label=" عوارض نصب سایبان پرداخت شده"></v-checkbox>
                                    </v-col>


                                </v-row>
                                <v-row class="ma-0 pa-0" justify="end">
                                    <v-btn :disabled="true" @click="deleteItem(index)" color="error"
                                           class="font-weight-bold"
                                           style="font-size: 9px" size="x-small"
                                           append-icon="mdi-delete">حذف
                                    </v-btn>
                                </v-row>
                            </template>
                        </v-expansion-panel>
                    </v-expansion-panels>


                </v-row>
            </v-fade-transition>


        </div>


        <v-row class="ma-0 pa-0 pa-2 border-t" justify="end">
            <v-btn @click="saveBtn" class="font-weight-bold" color="info" size="small" variant="tonal">ذخیره جزئیات شغل</v-btn>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import {EnumField, BusinessInfo, BusinessUnitInfo} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import rules from "@/componentFunctions/rules_functions";


export default defineComponent({
    name: "JobTableauComponent",

    components: {},


    props: {
        businessUnitInfo: {
            type: Object as PropType<BusinessUnitInfo>,
            required: true
        }
    },

    emits: ['saveDetailInfo'],

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {getEnumsTable, getBusinessUnitCode,editBusinessUnitInfo} = survey_functions()
        const {nameRule, floatRule, phoneRule} = rules()

        const initData = ref(false)
        const code_possessiontype = ref<EnumField>()
        const code = ref<string>('')

        const businessUnitInfo_clone = ref<BusinessUnitInfo>({...props.businessUnitInfo})


        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_possessiontype') {
                        const items = await getEnumsTable({name: item.title})
                        code_possessiontype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }


                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            if (props.businessUnitInfo.id) {
                const res = await getBusinessUnitCode(props.businessUnitInfo.id)
                if (res) {
                    code.value = res
                }
            }

            setTimeout(() => {
                initData.value = true
            }, 200)
        })

        return {
            businessUnitInfo_clone, code,editBusinessUnitInfo,
            store,
            toast,
            router,
            floatRule,
            code_possessiontype,
            initData,
            nameRule,

        }
    },

    data() {
        return {
            items: [] as BusinessUnitInfo[]
        }
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        addItem() {
            this.items.push(this.businessUnitInfo_clone)
        },
        deleteItem(index: number) {
            this.items.splice(index, 1);
        },

        async saveBtn() {
            if (this.businessUnitInfo.id){
                const res = await this.editBusinessUnitInfo(this.businessUnitInfo_clone, this.businessUnitInfo.id)
                if (res) {
                    this.toast.add({
                        group: 'tr',
                        life: 4000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'تغییرات ذخیره شد'
                    });
                    this.$emit('saveDetailInfo', this.businessUnitInfo_clone)
                }
            }

        }
    },

    mounted() {
        this.addItem()
    },

    watch: {},


});
</script>


<style>


</style>
