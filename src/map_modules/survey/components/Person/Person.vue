<template>
    <div dir="rtl" style="height:100%;width:100%;overflow-y: hidden" class="">

        <div class="" style="height: calc(100% - 30px);width:100%">
            <v-row class="ma-0 pa-0  mb-n2 myForm" align="center">
                <v-col cols="10">
                    <v-text-field
                            density="compact"
                            variant="solo"
                            v-model="searchText"
                            @update:model-value="search"
                            clearable
                            required
                    >
                        <template v-slot:prepend-inner>
                            <v-icon color="dark_blue" icon="mdi-account-search"/>
                        </template>

                        <template v-slot:label>
                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                            <p class="">جستجو کد ملی </p>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="2" class="text-left">
                    <v-tooltip text="اضافه کردن شخص" style="z-index: 100003">
                        <template v-slot:activator="{ props }">
                            <v-avatar style="cursor: pointer" @click="addOwnerForm = true" size="25" class="mb-3"
                                      v-bind="props">
                                <v-img
                                        class=""
                                        src="@/assets/icons/add.png"
                                        alt="John"
                                ></v-img>
                            </v-avatar>
                        </template>
                    </v-tooltip>

                </v-col>
            </v-row>
            <v-row v-if="!addOwnerForm&&initData" class="ma-0 pa-0 border-b border-t"
                   style="height:calc(100% - 60px);position: relative">
                <v-list
                        :lines="false"
                        style="height: 100%;width:100%"
                        @click:select="selectItem"
                        density="compact"
                >
                    <v-list-item
                            v-for="(item, i) in personsList"
                            :key="i"
                            :value="item"

                    >
                        <template v-slot:prepend>
                            <v-avatar size="25" class="">
                                <v-img
                                        class=""
                                        src="@/assets/icons/person.png"
                                        alt="John"
                                ></v-img>
                            </v-avatar>
                        </template>

                        <v-list-item-title v-text="`${item.name} ${item.last_name} ----- ${item.national_code}`"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-row>
            <v-fade-transition>
                <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 90%" justify="center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>
            </v-fade-transition>

            <v-row v-if="addOwnerForm" class="ma-0 pa-0 border-b border-t myForm"
                   style="height:calc(100% - 60px);position: relative;overflow-y: auto;display: flex;align-content: flex-start;">
                <v-form ref="addPersonFormRef">
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    density="compact"
                                    :rules="nameRule"
                                    variant="solo"
                                    v-model="personItem.name"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">نام</p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    density="compact"
                                    :rules="nameRule"
                                    variant="solo"
                                    v-model="personItem.last_name"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">نام خانوادگی</p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    density="compact"
                                    :rules="nameRule"
                                    variant="solo"
                                    v-model="personItem.father_name"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">نام پدر</p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    density="compact"
                                    :rules="nameRule"
                                    variant="solo"
                                    v-model="personItem.national_code"
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
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    density="compact"
                                    :rules="phoneRule"
                                    v-model="personItem.mobile"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">تلفن همراه</p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    density="compact"
                                    v-model="personItem.phone"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">تلفن</p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="text-grey-darken-3" style="font-size: 9px">{{ ' تاریخ تولد' }}</p>
                            <date-picker format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"
                                         color="rgb(var(--v-theme-info))"
                                         v-model="personItem.birthday"
                                         placeholder=" تاریخ تولد "></date-picker>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    density="compact"
                                    v-model="personItem.postal_code"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">کد پستی </p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                    density="compact"
                                    v-model="personItem.address"
                                    variant="solo"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">آدرس </p>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-row>
        </div>
        <v-row class="ma-0 pa-0 " justify="end" align="center">
            <v-btn
                    v-if="!addOwnerForm"
                    @click="selectPerson"
                    variant="tonal"
                    prepend-icon="mdi-content-save-move"
                    style="font-weight: bold !important"
                    size="small"
                    color="info"
            >انتخاب
            </v-btn>
            <v-btn
                    v-if="addOwnerForm"
                    variant="text"
                    style="font-weight: bold !important"
                    size="small"
                    @click="addOwnerForm=false"
                    color="error"
            >انصراف
            </v-btn>
            <v-btn
                    v-if="addOwnerForm"
                    variant="tonal"
                    prepend-icon="mdi-content-save-move"
                    style="font-weight: bold !important"
                    size="small"
                    @click="savePerson"
                    color="info"
            >ذخیره
            </v-btn>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";

import rules from "@/componentFunctions/rules_functions";
import {Person} from "@/models/Survey.interface";
import VForm from "@/models/VForm.interface";
import survey_functions from "@/componentFunctions/survey_functions";

export default defineComponent({
    name: "PersonComponent",

    components: {},

    emits:['selectPerson'],

    props: {},

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const addPersonFormRef = ref<VForm>()
        const {nameRule, floatRule, phoneRule} = rules()
        const {addPerson, getPersons, personsList} = survey_functions()

        const initData = ref(false)


        onMounted(async () => {
            setTimeout(() => {
                initData.value = true
            }, 300)
        })

        return {
            addPerson, getPersons, personsList,
            addPersonFormRef,
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
            addOwnerForm: false,

            selectedPerson:null as Person|null,

            personItem: {} as Person,
            searchText: '',
        }
    },
    methods: {
        async savePerson() {

            if (this.addPersonFormRef) {
                const res = await this.addPersonFormRef.validate()

                if (res.valid) {
                    console.log(this.personItem, 'personItem')
                    const res = await this.addPerson(this.personItem)
                    if (res){
                        this.personItem = {
                            address: null,
                            birthday: null,
                            code: null,
                            father_name: "",
                            last_name: "",
                            mobile: null,
                            name: "",
                            national_code: "",
                            phone: null,
                            postal_code: null
                        }

                        this.toast.add({
                            group: 'tr',
                            life: 4000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'تغییرات ذخیره شد'
                        });
                        this.addOwnerForm = false
                        await this.search()

                    }
                }
            }
        },
        async search() {
            console.log(this.searchText,'searchText')
            if (this.searchText){
                this.initData = false
                await this.getPersons(this.searchText)
                this.initData = true
            }else {
                this.initData = false
                await this.getPersons('0')
                this.initData = true
            }

        },
        selectPerson(){
            console.log(this.selectedPerson,'selectedPerson')
            this.$emit('selectPerson',this.selectedPerson)
        },

        selectItem(data:any){
            this.selectedPerson = data.id
        }
    },

    mounted() {
        this.search()
    },


    watch: {},


});
</script>


<style>


</style>
