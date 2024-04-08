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
                            <v-img v-if="items.length===0" style="" height="130"
                                   class=""
                                   src="@/assets/gifs/clock.gif"
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
                                        :title="`تعطیلی شماره ${index+1} `"
                                >
                                    <template v-slot:text>
                                        <v-row class="ma-0 pa-0">


                                            <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                                <p class="text-grey-darken-3" style="font-size: 9px">
                                                    {{ ' تاریخ شروع تعطیلات' }}</p>
                                                <date-picker v-model="item.start_date" format="YYYY-MM-DD"
                                                             display-format="jYYYY-jMM-jDD"
                                                             color="rgb(var(--v-theme-info))" editable
                                                             placeholder=" تاریخ شروع تعطیلات"></date-picker>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4" class="rounded-lg">

                                                <p class="text-grey-darken-3" style="font-size: 9px">
                                                    {{ ' تاریخ پایان تعطیلات' }}</p>
                                                <date-picker v-model="item.end_date" format="YYYY-MM-DD"
                                                             display-format="jYYYY-jMM-jDD"
                                                             color="rgb(var(--v-theme-info))" editable
                                                             placeholder=" تاریخ پایان تعطیلات"></date-picker>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-textarea
                                                        dir="rtl"
                                                        no-resize
                                                        class="font-weight-bold"
                                                        rows="3"
                                                        background-color="light-blue"
                                                        color="black"
                                                        hint=""
                                                        persistent-hint
                                                        label="توضیحات "
                                                        v-model="item.description"
                                                        variant="solo"
                                                >
                                                </v-textarea>
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


                    <v-btn class="elevation-3" @click="addItem" s
                           style="position: absolute;right:10px;bottom:15px;z-index: 10001" color="info"
                           icon="mdi-plus">
                    </v-btn>

                </v-row>
            </v-fade-transition>


        </div>


        <v-row class="ma-0 pa-0 pa-2 border-t" justify="end">

            <v-btn @click="saveBtn" class="font-weight-bold" color="info" size="small" variant="tonal">ذخیره تعطیلات</v-btn>
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
import {EnumField, BusinessInfo, BusinessVacation, BusinessPerson} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import rules from "@/componentFunctions/rules_functions";


export default defineComponent({
    name: "JobHolidayComponent",

    components: {},


    props: {
        businessInfo: {
            type: Object as PropType<BusinessInfo>,
            required: true
        },
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {nameRule, floatRule, phoneRule} = rules()

        const {addBusinessVacation} = survey_functions()
        const items = ref<BusinessVacation[]>([])
        const initData = ref(false)


        onMounted(async () => {

            if (props.businessInfo.business_BusinessVacation){
                items.value = [...props.businessInfo.business_BusinessVacation]
            }

            setTimeout(() => {
                initData.value = true
            }, 200)
        })

        return {
            addBusinessVacation,
            items,
            store,
            toast,
            router,
            floatRule,
            initData,
            nameRule,
            phoneRule

        }
    },

    data() {
        return {
        }
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        addItem() {
            this.items.push({
                business:this.businessInfo.id,
                description: null, end_date: null, start_date: null

            })
        },
        deleteItem(index: number) {
            this.items.splice(index, 1);
        },

        async saveBtn() {
            let error = false
            let textError = []
            this.items.map((item)=>{
                if (!item.start_date){
                    error = true
                    textError.push('تاریخ شروع مشخص نیست')
                }
                if (!item.end_date){
                    error = true
                    textError.push( 'تاریخ پایان مشخص نیست')
                }
                if (!item.description){
                    error = true
                    textError.push('توضیحات نباید خالی باشد')
                }
            })

            if (!error){
                const res = await this.addBusinessVacation(this.items)
                if (res){
                    this.toast.add({
                        group: 'tr',
                        life: 4000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'تغییرات ذخیره شد'
                    });
                }
                this.$emit('saveBusinessVacation',this.items)
            }else {
                textError.map((item)=>{
                    this.toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: item
                    });
                })

            }


        }
    },

    emits:['saveBusinessVacation'],
    watch: {},


});
</script>


<style>


</style>
