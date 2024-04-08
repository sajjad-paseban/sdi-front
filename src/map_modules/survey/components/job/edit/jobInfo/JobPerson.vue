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
                            <v-img v-if="items.length===0" style="" height="150"
                                   class=""
                                   src="@/assets/gifs/person_question.gif"
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
                                        :title="`شخص شماره ${index+1} `"
                                >
                                    <template v-slot:text>
                                        <v-row class="ma-0 pa-0 mt-n1">
                                            <v-col cols="12" sm="4">
                                                <v-btn @click="searchUser(item)" size="x-small" color="info">جستجوی شخص </v-btn>
                                            </v-col>

                                        </v-row>
                                        <v-row class="ma-0 pa-0" v-if="item.person">

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"

                                                        readonly
                                                        variant="solo"
                                                        v-model="item.person.name"

                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">نام </p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.person.last_name"
                                                        readonly
                                                        variant="solo"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">نام خانوادگی </p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.person.father_name"
                                                        readonly
                                                        variant="solo"

                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">نام پدر </p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.person.national_code"
                                                        readonly
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">کد ملی</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.person.mobile"
                                                        readonly
                                                        variant="solo"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class=""> موبایل</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>



                                            <v-col cols="12" sm="6" md="4">
                                                <v-autocomplete
                                                        v-if="code_relationshiptype"
                                                        :items="code_relationshiptype.items"
                                                        item-value="pk"
                                                        v-model="item.relationship_type"
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
                                                        <p class="">{{ code_relationshiptype.pName }}</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        density="compact"
                                                        v-model="item.ownership_value"
                                                        variant="solo"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">میزان مالکیت </p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                                <p class="text-grey-darken-3" style="font-size: 9px">{{' تاریخ شروع تصدی'}}</p>
                                                <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD" v-model="item.start_date"
                                                             color="rgb(var(--v-theme-info))" editable
                                                             placeholder=" تاریخ شروع تصدی"></date-picker>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4" class="rounded-lg">
                                                <p class="text-grey-darken-3" style="font-size: 9px">{{' تاریخ پایان تصدی'}}</p>
                                                <date-picker v-model="item.end_date" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                                             color="rgb(var(--v-theme-info))" editable
                                                             placeholder=" تاریخ پایان تصدی"></date-picker>
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

            <v-btn class="font-weight-bold" color="info" size="small" variant="tonal" @click="saveItems">ذخیره اشخاص مرتبط</v-btn>
        </v-row>


        <simple-dialog
                :show="searchUserDialog"
                :topic="'جستجوی کاربر'"
                :overLayer="true"
                width="50vw"
                height="80vh"
                @closeDialog="searchUserDialog = false"
        >
            <v-card style="height:50dvh" class="pa-2">
                <PersonComponent @selectPerson="selectPerson"></PersonComponent>
            </v-card>
        </simple-dialog>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import PersonComponent from "@/map_modules/survey/components/Person/Person.vue";
import {EnumField, BusinessInfo, Person, BusinessPerson} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import rules from "@/componentFunctions/rules_functions";
import SimpleDialog from "@/components/common/simpleDialog.vue";


export default defineComponent({
    name: "JobPersonComponent",

    components: {SimpleDialog,PersonComponent},


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
        const {getEnumsTable,addBusinessPerson} = survey_functions()
        const {nameRule, floatRule, phoneRule} = rules()

        const initData = ref(false)
        const code_relationshiptype = ref<EnumField>()
        const items = ref<BusinessPerson[]>([])

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_relationshiptype') {
                        const items = await getEnumsTable({name: item.title})
                        code_relationshiptype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }


                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            if (props.businessInfo.business_BusinessPerson){
                items.value = [...props.businessInfo.business_BusinessPerson]
            }
            setTimeout(() => {
                initData.value = true
            }, 200)
        })

        return {
            addBusinessPerson,
            items,
            store,
            toast,
            router,
            floatRule,
            code_relationshiptype,
            initData,
            nameRule,
            phoneRule

        }
    },

    data() {
        return {
            selectedItem :null as BusinessPerson|null,
            searchUserDialog :false,
            person:null as Person|null

        }
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        addItem() {
            this.items.push({
                business:this.businessInfo.id,
                end_date: null,
                finish: false,
                ownership_value: "",
                person: null,
                relationship_type: null,
                start_date: null

            })
        },
        deleteItem(index: number) {
            this.items.splice(index, 1);
        },

        searchUser(item:BusinessPerson){
            this.searchUserDialog = true
            this.selectedItem = item
        },

        selectPerson(person:Person){
            if (this.selectedItem){
                console.log(person)
                this.searchUserDialog = false
                this.selectedItem.person = person
            }

        },

        async saveItems() {
            let error = false
            let textError = ''
            this.items.map((item)=>{
                if (!item.person){
                    error = true
                    textError = 'شخصی انتخاب نشده است'
                }
                if (item.person&&!item.relationship_type){
                    error = true
                    textError = 'نوع ارتباط شخص مشخص نیست'
                }
            })

            if (!error){
                const res = await this.addBusinessPerson(this.items)
                if (res){
                    this.toast.add({
                        group: 'tr',
                        life: 4000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'تغییرات ذخیره شد'
                    });

                    this.$emit('saveBusinessPerson',this.items)
                }
            }else {
                this.toast.add({
                    group: 'br',
                    life: 4000,
                    severity: 'error',
                    summary: ' نتیجه درخواست',
                    detail: textError
                });
            }


        }
    },

    emits:['saveBusinessPerson'],
    watch: {},


});
</script>


<style>


</style>
