<template>
    <div style="height:100%;width:100%;overflow-y: auto" class=" pa-4">

        <v-expansion-panels class="rounded-lg elevation-2 font-weight-bold" multiple style="overflow-y: auto">

            <v-expansion-panel
                    class="rounded-lg  bg-white"
                    :title="'آدرس ملک'"
            >
                <template v-slot:text>
                    <div style="width:100% " class="rounded-lg ">
                        <v-row class="ma-0 pa-0" v-if="apartmentAddress">
                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"
                                        v-model="apartmentAddress.major_street"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">خیابان اصلی</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        v-model="apartmentAddress.minor_street"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">خیابان فرعی</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.alley"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> کوچه</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        required
                                        v-model="apartmentAddress.dead_end"
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> بن بست</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.building_block_name"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> مجتمع</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.plaque"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> پلاک</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.block_name"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> نام بلوک</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.unit_number"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">شماره واحد</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.phone"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">شماره تلفن</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.mobile"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> موبایل ملک</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-text-field
                                        density="compact"

                                        variant="solo"
                                        v-model="apartmentAddress.postal_code"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">کد پستی</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                        </v-row>

                    </div>
                </template>
            </v-expansion-panel>
            <v-expansion-panel
                    class="rounded-lg  bg-white"
                    :title="'اطلاعات مالکین'"
            >
                <template v-slot:text>
                    <div style="width:100%;overflow-y: auto" class="rounded-lg ">
                        <v-row class="ma-0 pa-0 mr-1" justify="start" align="center">
                            <v-btn @click="addMalek" color="info" class="font-weight-bold rounded"
                                   style="font-size: 9px" size="x-small"
                                   prepend-icon="mdi-plus">اضافه کردن مالک
                            </v-btn>
                            <v-spacer></v-spacer>


                        </v-row>
                        <v-row class="ma-0 pa-0 myForm mt-2" style="overflow: auto">
                            <v-form style="width:100%;height:100%" ref="ownerFormRef">
                                <v-row class="ma-0 pa-0 rounded-lg "
                                       style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;width:100%">
                                    <div v-for="(item,index) in owners"
                                         :key="index"
                                         style="width: 100%"
                                         class=" pa-1 ">
                                        <div class="bg-white elevation-3 rounded-lg border-t ">
                                            <v-row class="ma-0 pa-0 myForm " style="font-size: 11px">
                                                <v-col cols="4" sm="3" md="3">
                                                    <v-text-field
                                                            v-if="item.person"
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            readonly
                                                            class=""
                                                            v-model="item.person.name"
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">اسم</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col md="3" cols="4" sm="4">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            v-if="item.person"
                                                            required
                                                            readonly
                                                            class=""
                                                            v-model="item.person.last_name"
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">نام خانوادگی</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col md="3" cols="4" sm="4">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            class=""
                                                            v-if="item.person"
                                                            readonly
                                                            v-model="item.person.father_name"
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">نام پدر</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col md="3" cols="6" sm="4">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            class=""
                                                            v-if="item.person"
                                                            readonly
                                                            v-model="item.person.national_code"
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">کد ملی</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col md="3" cols="6" sm="4">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            class=""
                                                            v-if="item.person"
                                                            readonly
                                                            v-model="item.person.mobile"
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">موبایل مالک</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col md="3" cols="6" sm="4">
                                                    <v-autocomplete
                                                            v-if="code_ownershipunittype"
                                                            :items="code_ownershipunittype.items"
                                                            v-model="item.ownership_unit_type"
                                                            item-value="pk"
                                                            density="compact"
                                                            :rules="floatRule"
                                                            variant="solo"

                                                            required
                                                    >
                                                        >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">
                                                                {{ code_ownershipunittype.pName }}</p>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col md="3" cols="6" sm="3">
                                                    <v-autocomplete
                                                            v-if="code_ownershiptype"
                                                            :items="code_ownershiptype.items"
                                                            v-model="item.ownership_type"
                                                            item-value="pk"
                                                            density="compact"
                                                            :rules="floatRule"
                                                            variant="solo"

                                                            required
                                                    >
                                                        >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">{{
                                                                    code_ownershiptype.pName
                                                                }}</p>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col md="3" cols="6" sm="3">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            class=""
                                                            :rules="[...nameRule,dongRule(item.ownership_unit_type,item.ownership_value)]"
                                                            v-model="item.ownership_value"
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">مقدار مالکیت</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col md="3" cols="6" sm="3">
                                                    <v-autocomplete
                                                            v-if="code_ownerstatus"
                                                            :items="code_ownerstatus.items"
                                                            v-model="item.ownership_status"
                                                            item-value="pk"
                                                            density="compact"
                                                            :rules="floatRule"
                                                            variant="solo"

                                                            required
                                                    >
                                                        >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">{{
                                                                    code_ownerstatus.pName
                                                                }}</p>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="4" sm="3" md="2">
                                                    <v-checkbox label="اتمام مالکیت"
                                                                v-model="item.ownership_done"></v-checkbox>
                                                </v-col>
                                            </v-row>
                                            <v-row class="ma-0 pa-0 mt-n1" style="font-size: 11px" align="end">
                                                <v-col cols="6" sm="4" md="4" class="py-2 font-weight-bold">
                                                    <p class="text-grey-darken-3 mb-1" style="font-size: 9px">
                                                        {{ ' تاریخ شروع' }}</p>
                                                    <date-picker v-model="item.begin_date" format="YYYY-MM-DD"
                                                                 display-format="jYYYY-jMM-jDD"
                                                                 editable
                                                                 color="rgb(var(--v-theme-info))"
                                                                 placeholder=" تاریخ شروع "></date-picker>
                                                </v-col>
                                                <v-col cols="6" sm="4" md="4" class="py-2 font-weight-bold">
                                                    <p class="text-grey-darken-3 mb-1" style="font-size: 9px">
                                                        {{ ' تاریخ پایان' }}</p>
                                                    <date-picker v-model="item.end_date" format="YYYY-MM-DD"
                                                                 display-format="jYYYY-jMM-jDD"
                                                                 editable
                                                                 color="rgb(var(--v-theme-info))"
                                                                 placeholder=" تاریخ پایان "></date-picker>
                                                </v-col>
                                                <v-spacer></v-spacer>
                                                <v-btn class="ma-2" @click="deleteMalek(index)" size="x-small"
                                                       color="error">حذف
                                                </v-btn>
                                            </v-row>


                                        </div>

                                    </div>
                                </v-row>
                            </v-form>

                        </v-row>


                    </div>
                </template>
            </v-expansion-panel>
            <v-expansion-panel
                    class="rounded-lg  bg-white"
                    :title="'مشخصات ثبتی آپارتمان'"
            >
                <template v-slot:text>
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12" sm="3">
                            <v-text-field
                                    density="compact"
                                    :rules="floatRule"
                                    type="number"
                                    variant="solo"
                                    v-model="apartmentRegistration.area"
                                    @update:modelValue="correctFloat(apartmentRegistration,'area')"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت مفید</p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-text-field
                                    density="compact"
                                    variant="solo"
                                    type="number"
                                    required
                                    v-model="apartmentRegistration.assigned_area"
                                    @update:modelValue="correctFloat(apartmentRegistration,'assigned_area')"
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class=""> مساحت کاربری های اختصاصی</p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-text-field
                                    density="compact"
                                    v-model="apartmentRegistration.share_area"
                                    @update:modelValue="correctFloat(apartmentRegistration,'share_area')"
                                    variant="solo"
                                    type="number"

                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class=""> سهم از مساحت اشتراک</p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-text-field
                                    density="compact"
                                    v-model="apartmentRegistration.share_arse_area"
                                    @update:modelValue="correctFloat(apartmentRegistration,'share_arse_area')"
                                    variant="solo"
                                    required
                                    type="number"

                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class=""> مساحت سهم العرصه</p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-text-field
                                    density="compact"
                                    v-model="apartmentRegistration.yard_parking_area"
                                    @update:modelValue="correctFloat(apartmentRegistration,'yard_parking_area')"
                                    variant="solo"
                                    type="number"
                                    required

                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class=""> مساحت پارکینک</p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-text-field
                                    density="compact"
                                    :rules="nameRule"
                                    variant="solo"
                                    v-model="apartmentRegistration.yard_parking_number"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class=""> تعداد پارکینگ</p>
                                </template>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3">
                            <v-text-field
                                    density="compact"
                                    :rules="nameRule"
                                    variant="solo"
                                    required
                                    v-model="apartmentRegistration.persons_number"
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">تعداد افراد ساکن </p>
                                </template>
                            </v-text-field>
                        </v-col>


                        <v-col cols="12">
                            <v-textarea
                                    dir="rtl"

                                    no-resize
                                    class="font-weight-bold"
                                    rows="5"
                                    v-model="apartmentRegistration.description"
                                    background-color="light-blue"
                                    color="black"
                                    hint=""
                                    persistent-hint
                                    label="توضیحات تکمیلی"
                                    variant="solo"
                            >
                            </v-textarea>
                        </v-col>


                    </v-row>
                </template>
            </v-expansion-panel>

        </v-expansion-panels>

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
import rules from "@/componentFunctions/rules_functions";
import {
    Aparteman,
    ApartmentAddress,
    ApartmentRegistration,
    Arse,
    EnumField,
    Owner,
    Person
} from "@/models/Survey.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import {ApartmentNextPageFuncRes} from "@/map_modules/survey/components/aparteman/apartmenttRef";
import {CodingTableRecord} from "@/store/survey/types";
import PersonComponent from "@/map_modules/survey/components/Person/Person.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import VForm from "@/models/VForm.interface";


export default defineComponent({
    name: "BaseInfoComponent",

    components: {SimpleDialog, PersonComponent},


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
        const {getEnumsTable, setApartmentAddress, setOwners, setRegistration,correctFloat,getRegistrationValues,registrationValues} = survey_functions()

        const code_ownershipunittype = ref<EnumField>()
        const code_ownershiptype = ref<EnumField>()
        const code_ownerstatus = ref<EnumField>()
        const ownerFormRef = ref<VForm>()

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_ownershipunittype') {
                        const items = await getEnumsTable({name: item.title})
                        code_ownershipunittype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_ownershiptype') {
                        const items = await getEnumsTable({name: item.title})
                        code_ownershiptype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_ownerstatus') {
                        const items = await getEnumsTable({name: item.title})
                        code_ownerstatus.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                })
            )

        }

        const {nameRule, floatRule, phoneRule} = rules()
        const owners = ref<Owner[]>([])
        const apartmentAddress = ref<ApartmentAddress>({
            alley: null,
            block_name: null,
            building_block_name: null,
            dead_end: null,
            major_street: null,
            minor_street: null,
            mobile: null,
            phone: null,
            plaque: null,
            postal_code: null,
            unit_number: null
        })
        const apartmentRegistration = ref<ApartmentRegistration>({
            area: props.apartment.area,
            assigned_area: null,
            description: null,
            yard_parking_area: null,
            yard_parking_number: null,
            persons_number: null,
            share_area: null,
            share_arse_area: null
        })

        onMounted(async () => {
            const arse :Arse = store.getters.getArseInfo
            if (props.apartment.apartment_address) {
                apartmentAddress.value = {...props.apartment.apartment_address}
            }else {
                if (arse.arse_address){
                    apartmentAddress.value = {...arse.arse_address}
                }

            }
            if (props.apartment.apartment_owner) {
                owners.value = [...props.apartment.apartment_owner]
            }

            if (props.apartment.apartment_registration) {
                apartmentRegistration.value = {...props.apartment.apartment_registration,area:props.apartment.area}
            }
            if (!apartmentRegistration.value.share_area&&!apartmentRegistration.value.share_arse_area&&arse.id){

                const res = await getRegistrationValues({arse_id:arse.id,unit_area:props.apartment.area})
                if (res){
                    apartmentRegistration.value = {...apartmentRegistration.value,...registrationValues.value}
                }
            }
            await setCodingFieldsName()
        })

        return {
            ownerFormRef,correctFloat,
            code_ownershipunittype,
            code_ownershiptype,
            code_ownerstatus,
            setApartmentAddress,
            setOwners,
            setRegistration,
            store,
            toast,
            router,
            nameRule,
            floatRule,
            phoneRule,
            owners,
            apartmentAddress,
            apartmentRegistration,
        }
    },

    data() {
        return {
            headers: [
                'نام', 'نام خانوادگی', 'نام پدر', 'کد ملی', 'موبایل', 'شماره تلفن', 'واحد مالکیت',
                'نوع مالکیت', 'میزان مالکیت', 'وضعیت مالکیت', 'تاریخ شروع', 'پایان مالکیت', 'تاریخ پایان', 'عملیات'
            ],

            searchUserDialog: false,
        }
    },
    methods: {

        dongRule(value,data){
            console.log(value,data)
            if (value==2&&data>6){
                return 'مقدار از 6 بیشتر نمیتواند باشد'
            }else {
                return true
            }

        },

        selectPerson(person: Person) {
            console.log(person)
            this.searchUserDialog = false
            this.owners.push({
                begin_date: null,
                end_date: null,
                ownership_done: false,
                ownership_status: null,
                ownership_type: null,
                ownership_unit_type: null,
                ownership_value: "",
                person: person
            })
        },

        addMalek() {
            this.searchUserDialog = true
        },

        deleteMalek(index: number) {
            if (this.owners) {
                this.owners.splice(index, 1)
            }

        },

        async nextPageFunc(): ApartmentNextPageFuncRes {

            const response = await this.setApartmentAddress(this.apartmentAddress, this.apartment.id)

            let response2 = null
            if (this.ownerFormRef) {
                const res = await this.ownerFormRef.validate()
                if (res.valid) {
                    response2 = await this.setOwners(this.owners, this.apartment.id)
                }

            }
            if (response2 === null){
                for (let i=0;i<this.owners.length;i++){
                    if (this.owners[i].ownership_value&&this.owners[i].ownership_status&&this.owners[i].ownership_type&&this.owners[i].ownership_unit_type){
                        console.log('not problem in owners')
                    }else {
                        return {
                            error: 'اطلاعات مالکین تکمیل نیست',
                            result: null
                        }
                    }
                }
                response2 = await this.setOwners(this.owners, this.apartment.id)
            }


            const response3 = await this.setRegistration(this.apartmentRegistration, this.apartment.id)
            console.log(response && response2 && response3,response2)

            if (response && response2 && response3) {
                const res: Aparteman = {
                    ...this.apartment,
                    apartment_owner: this.owners,
                    apartment_address: this.apartmentAddress,
                    apartment_registration: this.apartmentRegistration
                }
                return {
                    error: null,
                    result: res
                }
            }
            return {
                error: 'خطا در ذخیره اطلاعات',
                result: null
            }


        }
    },

    watch: {},


});
</script>


<style>


</style>
