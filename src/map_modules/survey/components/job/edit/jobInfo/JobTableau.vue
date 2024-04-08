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
                <v-row style="height:calc(100% - 10px);display: flex;align-content: flex-start;position: relative"
                       class="ma-0 pa-0 py-4 rounded-lg " v-if="initData">
                    <v-slide-y-transition>
                        <v-row class="ma-0 pa-0" justify="center" align="center" style="height:100%">
                            <v-img v-if="items.length===0" style="" height="100"
                                   class=""
                                   src="@/assets/icons/sign.png"
                                   alt="John"
                            ></v-img>
                        </v-row>
                    </v-slide-y-transition>

                    <v-slide-y-transition>
                        <div v-if="items.length>0" class="pa-2" style="height:100%;width:100%;overflow-y: auto">
                            <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                                <v-expansion-panel
                                        class="rounded-lg border bg-white"
                                        v-for="(item,index) in items"
                                        :key="index"
                                        :title="`تابلو شماره ${index+1} `"
                                >
                                    <template v-slot:text>
                                        <v-row class="ma-0 pa-0">

                                            <v-col cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                        v-if="code_tableautype"
                                                        :items="code_tableautype.items"
                                                        v-model="item.board_type"
                                                        item-value="pk"
                                                        density="compact"
                                                        variant="solo"
                                                        :rules="floatRule"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">{{ code_tableautype.pName }}</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                        v-if="code_subjecttableau"
                                                        :items="code_subjecttableau.items"
                                                        item-value="pk"
                                                        v-model="item.subject_board"
                                                        density="compact"
                                                        variant="solo"
                                                        :rules="floatRule"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">{{ code_subjecttableau.pName }}</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                        v-if="code_installationlocationtableau"
                                                        :items="code_installationlocationtableau.items"
                                                        item-value="pk"
                                                        v-model="item.installation_location_board"
                                                        density="compact"
                                                        variant="solo"
                                                        :rules="floatRule"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">{{ code_installationlocationtableau.pName }}</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                        v-if="code_installationstatustableau"
                                                        :items="code_installationstatustableau.items"
                                                        v-model="item.installation_status_board"
                                                        item-value="pk"
                                                        density="compact"
                                                        variant="solo"
                                                        :rules="floatRule"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">{{ code_installationstatustableau.pName }}</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                        v-if="code_ownertableautype"
                                                        :items="code_ownertableautype.items"
                                                        item-value="pk"
                                                        v-model="item.owner_board_type"
                                                        density="compact"
                                                        variant="solo"
                                                        :rules="floatRule"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">{{ code_ownertableautype.pName }}</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.board_width"
                                                        @update:modelValue="correctFloat(item,'board_width')"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">پهنای تابلو</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.board_height"
                                                        @update:modelValue="correctFloat(item,'board_height')"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">ارتفاع تابلو</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.height"
                                                        @update:modelValue="correctFloat(item,'height')"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">ارتفاع از زمین</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.board_area"
                                                        @update:modelValue="correctFloat(item,'area')"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">مساحت تابلو</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.progress_area"
                                                        @update:modelValue="correctFloat(item,'progress_area')"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class=""> میزان پیشزدگی</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        :rules="nameRule"
                                                        variant="solo"
                                                        v-model="item.text"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class=""> متن تابلو </p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>


                                            <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                                <p class="text-grey-darken-3" style="font-size: 9px">
                                                    {{ ' تاریخ نصب' }}</p>
                                                <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                                             color="rgb(var(--v-theme-info))"
                                                             v-model="item.start_date" editable
                                                             placeholder=" تاریخ نصب"></date-picker>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                                <p class="text-grey-darken-3" style="font-size: 9px">
                                                    {{ ' تاریخ پایان نصب' }}</p>
                                                <date-picker v-model="item.end_date" format="YYYY-MM-DD"
                                                             display-format="jYYYY-jMM-jDD"
                                                             color="rgb(var(--v-theme-info))"
                                                             editable
                                                             placeholder=" تاریخ پایان نصب"></date-picker>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        :rules="nameRule"
                                                        variant="solo"
                                                        v-model="item.description"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class=""> توضیحات </p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>


                                        </v-row>
                                        <v-row class="ma-0 pa-0 mt-2" justify="end">
                                            <v-btn @click="deleteItem(index)" color="error" class="font-weight-bold"
                                                   style="font-size: 9px" size="x-small"
                                                   append-icon="mdi-delete">حذف
                                            </v-btn>
                                        </v-row>
                                    </template>
                                </v-expansion-panel>
                            </v-expansion-panels>

                        </div>
                    </v-slide-y-transition>


                    <v-btn class="elevation-3" @click="addItem"
                           style="position: absolute;right:10px;bottom:15px;z-index: 10001" color="info"
                           icon="mdi-plus">
                    </v-btn>

                </v-row>
            </v-fade-transition>


        </div>


        <v-row class="ma-0 pa-0 pa-2 border-t" justify="end">

            <v-btn @click="saveBtn" class="font-weight-bold" color="info" size="small" variant="tonal">ذخیره تابلو</v-btn>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import {EnumField, BusinessInfo, BusinessBoard, BusinessUnitInfo} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import rules from "@/componentFunctions/rules_functions";


export default defineComponent({
    name: "JobDetailComponent",

    components: {},


    props: {
        businessInfo: {
            type: Object as PropType<BusinessInfo>,
            required: false,
            default:null
        },
        businessUnitInfo: {
            type: Object as PropType<BusinessUnitInfo>,

        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {getEnumsTable, saveBoards, boardsList,correctFloat} = survey_functions()
        const {nameRule, floatRule, phoneRule} = rules()

        const initData = ref(false)
        const code_tableautype = ref<EnumField>()
        const code_subjecttableau = ref<EnumField>()
        const code_installationlocationtableau = ref<EnumField>()
        const code_installationstatustableau = ref<EnumField>()
        const code_ownertableautype = ref<EnumField>()

        const items = ref<BusinessBoard[]>([])


        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_tableautype') {
                        const items = await getEnumsTable({name: item.title})
                        code_tableautype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_subjecttableau') {
                        const items = await getEnumsTable({name: item.title})
                        code_subjecttableau.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_installationlocationtableau') {
                        const items = await getEnumsTable({name: item.title})
                        code_installationlocationtableau.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_installationstatustableau') {
                        const items = await getEnumsTable({name: item.title})
                        code_installationstatustableau.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_ownertableautype') {
                        const items = await getEnumsTable({name: item.title})
                        code_ownertableautype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }


                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            if (props.businessInfo?.id && props.businessUnitInfo?.id) {
                await saveBoards({business: props.businessInfo.id}, props.businessUnitInfo.id)
                items.value = boardsList.value
            }

            setTimeout(() => {
                initData.value = true
            }, 200)
        })

        return {
            saveBoards, boardsList,correctFloat,
            items,
            store,
            toast,
            router,
            floatRule,
            code_ownertableautype,
            code_installationstatustableau,
            code_installationlocationtableau,
            code_subjecttableau,
            code_tableautype,
            initData,
            nameRule,

        }
    },

    data() {
        return {}
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        addItem() {
            this.items.push({
                    board_area: 0,
                    board_height: 0,
                    board_type: 1,
                    board_width: 0,
                    description: "",
                    end_date: null,
                    height: 0,
                    installation_location_board: 1,
                    installation_status_board: 1,
                    owner_board_type: 1,
                    progress_area: 0,
                    start_date: null,
                    subject_board: 1,
                    text: ""
                }
            )
        },
        deleteItem(index: number) {
            this.items.splice(index, 1);
        },


        async saveBtn() {


            if (this.businessInfo?.id && this.businessUnitInfo?.id) {
                let error = false
                this.items.map((item)=>{
                    if (!item.text){
                        error = true
                    }
                })
                if (!error){
                    const res = await this.saveBoards({
                        business: this.businessInfo.id,
                        boards: this.items
                    }, this.businessUnitInfo.id)

                    if (res){
                        this.toast.add({
                            group: 'tr',
                            life: 4000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'تغییرات ذخیره شد'
                        });
                    }
                }else {
                    this.toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: 'خطا',
                        detail: 'متن تابلو مشخص نیست'
                    });
                }

            }
            else {
                this.toast.add({
                    group: 'br',
                    life: 4000,
                    severity: 'error',
                    summary: 'خطا',
                    detail: 'ابتدا اطلاعات واحد شغلی و شغل را تکمیل نمایید'
                });
            }
        }
    },


    watch: {},


});
</script>


<style>


</style>
