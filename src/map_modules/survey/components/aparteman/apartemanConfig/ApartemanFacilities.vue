<template>
    <div style="height:100%;width:100%;overflow-y: hidden" class=" pa-2">

        <v-fade-transition>
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-row>
        </v-fade-transition>
        <v-fade-transition>

            <v-row class="ma-0 pa-0  " v-if="initData" style="overflow-y: auto;height: 100%;" justify="center">


                <v-col cols="12" sm="12" id="table" style="height:100%;overflow-x: auto;position: relative"
                       class="rounded-lg  pa-0 MyTableCss">
                    <v-fade-transition>
                        <v-row class="ma-0 pa-0 pa-2" style="height:100%" justify="center" align="start">

                            <v-col cols="12" class="ma-0 pa-0 rounded-lg elevation-3 bg-grey-lighten-4"
                                   style="position: relative;height: 100%;;overflow-y: hidden">
                                <v-slide-y-transition>
                                    <div style="height: 100%;width: 100%" v-if="facilities.length==0">
                                        <v-row class="ma-0 pa-0" justify="center">
                                            <p class="pa-6 pb-2" style="line-height: 30px">
                                                جهت اضافه کردن اشتراکات واحد آپارتمانی مورد نظر ، دکمه + را انتخاب کنید
                                                .
                                            </p>
                                        </v-row>

                                        <v-row class="ma-0 pa-0 mt-6">
                                            <v-img style="" height="150"
                                                   class=""
                                                   src="@/assets/gifs/water_meter.gif"
                                                   alt="John"
                                            ></v-img>
                                        </v-row>
                                    </div>
                                </v-slide-y-transition>

                                <v-fade-transition>
                                    <v-row class="ma-0 pa-0" v-if="facilities.length>0"
                                           style="overflow-y: auto;height: 100%;display: flex;align-content: flex-start;">
                                        <v-col cols="12" sm="4" v-for="(item,index) in facilities" :key="index"
                                               class="pa-2">
                                            <div class="rounded elevation-3 bg-white " style="height:100px">
                                                <v-row class="pa-0 ma-0 bg-info rounded-t" style="height: 40px"
                                                       justify="center" align="center">
                                                    <p class=""> {{ getFacilitiesName(item.facilities_type) }}</p>
                                                </v-row>
                                                <v-row class="pa-0 ma-0" style="height: 30px;font-size: 10px"
                                                       justify="center" align="center">
                                                    <v-col cols="6">
                                                        <p class="font-weight-bold">مساحت/تعداد : {{
                                                                item.area_count
                                                            }}</p>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <p class="font-weight-bold">شماره اشتراک : {{ item.code }}</p>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="ma-0 pa-0" align="center" style="height:30px"
                                                       justify="end">
                                                    <v-btn @click="editItem(item)" size="small" icon density="compact"
                                                           color="info">
                                                        <v-icon size="small">mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <v-btn @click="deleteFacilities(index)" class="mx-2" size="small"
                                                           icon density="compact" color="error">
                                                        <v-icon size="small">mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-fade-transition>


                                <v-btn @click="addFacilities" class="elevation-4" icon="mdi-plus" color="info"
                                       style="position: absolute;right:20px;bottom:20px"></v-btn>
                            </v-col>


                        </v-row>
                    </v-fade-transition>


                </v-col>
            </v-row>
        </v-fade-transition>

        <simple-dialog
                :show="dialog"
                :topic="'اطلاعات امکانات'"
                width="50vw"
                height="60vh"
                :current_height="'80vh'"
                @closeDialog="dialog=false"
                class="bg-grey-lighten-2"
        >
            <div class="bg-grey-lighten-2" style="height: 100%;width:100%;overflow-y: hidden">

                <v-row class="ma-0 pa-0" style="height:calc(100% - 40px)" justify="center" align="center">

                    <v-col cols="12" sm="10" class="elevation-3 rounded-lg bg-white" style="height: 90%">
                        <v-form ref="facilitiesForm" style="height:100%;width: 100%">
                            <v-row class="ma-0 pa-0 myForm " v-if="activeItem"
                                   style="height:100%;display: flex;align-content: flex-start;">
                                <v-col cols="12" sm="4">
                                    <v-autocomplete
                                            v-if="code_facilitiestype"
                                            :items="code_facilitiestype.items"
                                            item-value="pk"
                                            density="compact"
                                            v-model="activeItem.facilities_type"
                                            variant="solo"
                                            :rules="nameRule"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="">{{ code_facilitiestype.pName }}</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>

                                <v-col cols="12" sm="4">
                                    <v-text-field
                                            density="compact"
                                            :rules="textFloat"
                                            variant="solo"
                                            v-model="activeItem.area_count"
                                            type="number"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="">تعداد / مساحت</p>
                                        </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4">
                                    <v-text-field
                                            density="compact"
                                            :rules="textFloat"
                                            variant="solo"
                                            v-model="activeItem.code"
                                            type="number"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class=""> شماره اشتراک</p>
                                        </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-textarea
                                            dir="rtl"
                                            no-resize
                                            class="font-weight-bold"
                                            rows="5"
                                            background-color="light-blue"
                                            color="black"
                                            hint=""
                                            persistent-hint
                                            label="توضیحات تکمیلی"
                                            v-model="activeItem.description"
                                            variant="solo"
                                    >
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        </v-form>

                    </v-col>

                </v-row>

                <v-row class="ma-0 pa-0" justify="end">
                    <v-btn @click="saveBtn" color="info" class="font-weight-bold mx-2" style="font-size: 10px"
                           size="small"
                           append-icon="mdi-content-save">ذخیره
                    </v-btn>
                </v-row>
            </div>

        </simple-dialog>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {Aparteman, EnumField, Facilities} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import VForm from "@/models/VForm.interface";
import {ApartmentNextPageFuncRes} from "@/map_modules/survey/components/aparteman/apartmenttRef";


export default defineComponent({
    name: "ApartemanSidesComponent",

    components: {SimpleDialog},


    props: {
        apartment: {
            required: true,
            type: Object as PropType<Aparteman>
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {getEnumsTable, apartmentSetFacilities} = survey_functions()

        const initData = ref(false)
        const {nameRule, floatRule, phoneRule, textFloat} = rules()
        const facilities = ref<Facilities[]>([])
        const facilitiesForm = ref<VForm>()

        const code_facilitiestype = ref<EnumField>()

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_facilitiestype') {
                        const items = await getEnumsTable({name: item.title})
                        code_facilitiestype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                })
            )

        }


        onMounted(async () => {
            await setCodingFieldsName()
            if (props.apartment.apartment_facilities) {
                facilities.value = [...props.apartment.apartment_facilities]
            }
            setTimeout(() => {
                initData.value = true
            }, 100)
        })

        return {
            store,
            apartmentSetFacilities,
            toast,
            router,
            nameRule,
            floatRule,
            textFloat,
            initData,
            facilities,
            code_facilitiestype,
            facilitiesForm
        }
    },

    data() {
        return {
            dialog: false,
            activeItem: null as Facilities | null,

        }
    },
    methods: {
        addFacilities() {
            this.activeItem = {
                facilities_type: 1,
                area_count: 1,
                code: '0',
                description: ''
            }
            this.facilities.push(this.activeItem)
            this.dialog = true
        },
        deleteFacilities(index: number) {
            this.store.commit('setConfirmDialog', {
                massage: 'آیا حذف مورد تایید است ؟',
                topic: 'اخطار',
                active: true,
                accept: async () => {
                    this.facilities.splice(index, 1)
                },
                reject: () => {
                    console.log('reject')
                },

            })

        },

        editItem(item: Facilities) {
            this.activeItem = item
            this.dialog = true
        },

        async saveBtn() {
            if (this.facilitiesForm) {
                const res = await this.facilitiesForm.validate()

                if (res.valid && this.activeItem) {
                    console.log(this.activeItem)
                    this.dialog = false

                }
            }
        },

        getFacilitiesName(id: number): string {
            let res = ''
            if (this.code_facilitiestype) {
                this.code_facilitiestype.items.map((item) => {
                    if (item.pk === id) {
                        res = item.title
                    }
                })
            }

            return res

        },

        async nextPageFunc(): ApartmentNextPageFuncRes {
            const res = await this.apartmentSetFacilities(this.facilities, this.apartment.id)
            if (res){
                return {
                    result:{...this.apartment,apartment_facilities:this.facilities},
                    error:null
                }
            }

            return {
                error: 'خطا در ذخیره اطلاعات',
                result: null
            }
        }
    },


});
</script>


<style>


</style>
