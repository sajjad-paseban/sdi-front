<template>
    <div style="height:100%;width:100%" class="pa-2  myForm">

        <v-row class="ma-0 pa-0 mt-2" justify="center">
            <v-col cols="12" sm="11" class="bg-white rounded elevation-1">
                <p style="font-size: 10px; line-height: 20px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;" class=" ">
                    در این قسمت اگر در طبقه انتخاب شده پارکینگ یا انباری یا راهرو وجود دارد ، میتوانید در این قسمت به
                    اطلاعات طبقه اضافه کنید.
                </p>
            </v-col>

        </v-row>


        <v-row class="ma-0 pa-0 mt-2" justify="center" style="height: calc(100% - 50px)">

            <v-col cols="12" sm="11" class="ma-0 border-t pa-0 pa-1 rounded-lg elevation-3  myForm py-2 bg-grey-lighten-3" style="height: 100%;position: relative">
                <v-btn style="position: absolute;left:20px;bottom:15px;z-index: 1001" @click="addFloorUsageItem"
                       color="info" size="small" class="elevation-4"
                       icon="mdi-plus" :v-tooltip.left="'اضافه کردن کاربری'">

                </v-btn>
                <v-row class="ma-0 pa-0 ">

                    <v-col cols="6" md="3" class="">
                        <v-text-field
                                v-if="selectedFloor"
                                density="compact"
                                variant="solo"
                                type="number"
                                required
                                class=""
                                :readonly="true"

                                v-model="selectedFloor.area"
                        >
                            <template v-slot:label>
                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                <p class="">زیر بنای طبقه</p>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="6" md="3" class="">
                        <v-text-field
                                v-if="selectedFloor"
                                density="compact"
                                variant="solo"
                                type="number"
                                required
                                class=""
                                :readonly="true"

                                v-model="allUsingArea"
                        >
                            <template v-slot:label>
                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                <p class="">زیر بنای مجموع کاربری</p>
                            </template>
                        </v-text-field>
                    </v-col>

                </v-row>

                <div class=" border-t  mt-n2"  style="height: calc(100% - 45px);width: 100%">
                    <v-table v-if="false" density="compact" class="rounded-lg elevation-3 myForm" fixed-header
                             style="min-width: 600px!important;height: 95%;overflow-y: auto">
                        <thead class="bg-grey-lighten-4">
                        <tr class="bg-grey-lighten-4 mt-1">
                            <th class="text-right font-weight-bold bg-grey-lighten-2 pt-1"
                                :style="`width:${i.width}%!important`"
                                v-for="(i,index) in headers" :key="index">
                                {{ i.name }}
                            </th>
                        </tr>
                        </thead>
                        <tbody v-if="floorUsageItems.length>0">
                        <tr
                                v-for="(item,index) in floorUsageItems"
                                :key="index"
                        >
                            <td class="font-weight-bold" style="min-width: 170px" v-if="selectedFloor">
                                <v-autocomplete
                                        v-if="code_floortype"
                                        :items="code_floortype.items"
                                        v-model="selectedFloor.floor_type"
                                        item-value="pk"
                                        density="compact"
                                        :readonly="true"
                                        variant="solo"

                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                    </template>


                                </v-autocomplete>
                            </td>
                            <td class="font-weight-bold" style="max-width: 35px;">
                                <v-autocomplete
                                        v-if="code_masterusing"
                                        :items="code_masterusing.items"
                                        item-value="pk"
                                        density="compact"
                                        v-model="item.main_use"
                                        variant="solo"
                                        required
                                >

                                </v-autocomplete>
                            </td>
                            <td class="font-weight-bold" style="max-width: 35px;">
                                <v-autocomplete
                                        v-if="code_slaveusing"
                                        :items="code_slaveusing.items"
                                        density="compact"
                                        item-value="pk"
                                        v-model="item.sub_use"
                                        variant="solo"
                                        required
                                >


                                </v-autocomplete>
                            </td>


                            <td class="font-weight-bold" style="max-width: 35px;">
                                <v-text-field
                                        density="compact"
                                        @update:modelValue="(value)=>{item.area = parseInt(String(value))}"
                                        variant="solo"
                                        type="number"
                                        required
                                        class="mt-1"
                                        :model-value="item.area"
                                >

                                </v-text-field>
                            </td>

                            <td class="font-weight-bold align-center" style="max-width: 35px;">
                                <v-text-field
                                        density="compact"
                                        variant="solo"
                                        @update:modelValue="(value)=>{item.units_number = parseInt(String(value))}"
                                        type="number"
                                        required
                                        class="mt-1"
                                        :model-value="item.units_number"
                                >

                                </v-text-field>
                            </td>
                            <td class="font-weight-bold" style="max-width: 35px;">
                                <v-row class="ma-0 pa-0">
                                    <v-btn @click="deleteFloorUsageItem(index)" class="mx-1" icon size="small"
                                           color="error" density="compact">
                                        <v-icon size="small">mdi-delete</v-icon>
                                    </v-btn>
                                    <v-btn v-tooltip.bottom="'اطلاعات تکمیلی'" class="mx-1" color="info" size="small"
                                           @click="showExtraInfoDialog(item,index)" density="compact" icon>
                                        <v-icon size="">mdi-book-outline</v-icon>
                                    </v-btn>
                                </v-row>
                            </td>
                        </tr>
                        </tbody>
                    </v-table>

                    <v-row class="ma-0 pa-0 rounded-lg pa-1"  v-if="selectedFloor"
                           style="overflow-x: auto;height:100%;display: flex;align-content: flex-start;width:100%"
                           justify="center" id="listDiv">

                        <div v-for="(item,index) in floorUsageItems"
                             :key="index"
                             style="width: 100%"
                             class=" pa-1 ">
                            <div class="bg-white elevation-3 rounded-lg border-t ">
                                <v-row class="ma-0 pa-0 myForm " style="font-size: 11px">
                                    <v-col cols="12" md="4" sm="6">
                                        <v-autocomplete
                                                v-if="code_floortype"
                                                :items="code_floortype.items"
                                                v-model="selectedFloor.floor_type"
                                                item-title="title"
                                                item-value="pk"
                                                density="compact"
                                                variant="solo"
                                                class=""
                                                required
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">{{ code_floortype.pName }}</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="4" sm="6">
                                        <v-autocomplete
                                                v-if="code_masterusing"
                                                :items="code_masterusing.items"
                                                v-model="item.main_use"
                                                item-title="title"
                                                item-value="pk"
                                                density="compact"
                                                variant="solo"
                                                class=""
                                                required
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">{{ code_masterusing.pName }}</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="4" sm="6">
                                        <v-autocomplete
                                                v-if="code_slaveusing"
                                                :items="code_slaveusing.items"
                                                v-model="item.sub_use"
                                                item-title="title"
                                                item-value="pk"
                                                density="compact"
                                                variant="solo"
                                                class=""
                                                required
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">{{ code_slaveusing.pName }}</p>
                                            </template>
                                        </v-autocomplete>

                                    </v-col>

                                    <v-col cols="6" md="4">

                                        <v-text-field

                                                density="compact"
                                                v-model="item.area"
                                                variant="solo"
                                                type="number"
                                                @update:modelValue="setAllUsingArea(item,'area')"
                                                required
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">مساحت</p>
                                            </template>
                                        </v-text-field>

                                    </v-col>

                                    <v-col cols="6" md="4">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                @update:modelValue="(value)=>{item.units_number = parseInt(String(value))}"
                                                type="number"
                                                required
                                                class=""
                                                :model-value="item.units_number"
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">تعداد واحد</p>
                                            </template>
                                        </v-text-field>

                                    </v-col>


                                </v-row>
                                <div style="height:40px;width:100%;" class="border-t rounded-b-lg bg-grey-lighten-2">
                                    <v-row class="ma-0 pa-0 pr-1" justify="start" align="center"
                                           style="height: 100%">


                                        <v-btn color="error"
                                               size="x-small" class="ml-1 mx-1  font-weight-bold"
                                               @click="deleteFloorUsageItem(index)">
                                            <v-icon start size="small">mdi-delete</v-icon>
                                            حذف

                                        </v-btn>
                                        <v-btn color="info"
                                               size="x-small" class="ml-1  mx-1 font-weight-bold"
                                               @click="showExtraInfoDialog(item,index)">
                                            <v-icon start size="small">mdi-pen</v-icon>
                                            اطلاعات تکمیلی
                                        </v-btn>


                                    </v-row>
                                </div>


                            </div>

                        </div>
                    </v-row>

                </div>


            </v-col>

        </v-row>

        <simple-dialog
                :show="dialog"
                :topic="'اطلاعات تکمیلی طبقه'"
                width="50vw"
                height="70vh"
                :current_height="'80vh'"
                @closeDialog="dialog=false"
                class="bg-grey-lighten-2"
        >
            <div style="height: 100%;width:100%;overflow-y: hidden" v-if="selectedExtraInfoItem">

                <FloorUseExtraInfo @close="closeExtraDialog"
                                   :selected-extra-info-item="selectedExtraInfoItem"></FloorUseExtraInfo>
            </div>

        </simple-dialog>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import {EnumField, FloorInfo, floorUsage, ParkingAndStoreAndCommons, SelectedBuilding} from "@/models/Survey.interface";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import FloorUseExtraInfo from "@/map_modules/survey/components/floor/FloorUseExtraInfo.vue";
import survey_functions from "@/componentFunctions/survey_functions";
import {CodingTableRecord} from "@/store/survey/types";
import {FloorNextPageFuncRes} from "@/map_modules/survey/components/floor/FloorInfoRef";


export default defineComponent({
    name: "FloorUseTypeComponent",

    components: {SimpleDialog, FloorUseExtraInfo},


    props: {

        step: {
            type: Number,
            required: true
        },

        selectedFloor: {
            type: Object as PropType<FloorInfo | null>,
            required: true
        },

    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()

        const {nameRule, floatRule, phoneRule} = rules()
        const {getEnumsTable, initFloorUsingList, getInitFloorUsing, addFloorUsing,correctFloat} = survey_functions()


        const floorUsageItems = ref<floorUsage[]>([]) as Ref<floorUsage[]>
        const initData = ref(false)
        const code_masterusing = ref<EnumField>()
        const code_slaveusing = ref<EnumField>()
        const code_floortype = ref<EnumField>()
        const selectedExtraInfoItem = ref<floorUsage | null>(null)
        const selectedExtraInfoItemIndex = ref<number>(0)

        const allUsingArea = ref(0)


        async function initFloorUsageItems(floor: FloorInfo) {

            if (floor.floor_using && floor.floor_using.length > 0) {
                floorUsageItems.value = [...floor.floor_using]
            } else {
                if (floor.id) {
                    const res = await getInitFloorUsing(floor.id)
                    if (initFloorUsingList.value) {
                        floorUsageItems.value = initFloorUsingList.value
                    }

                }
            }

            //---------init allUsingArea------//
            let sum_area=  0
            floorUsageItems.value.map((i)=>{
                sum_area = sum_area + parseFloat(i.area)
            })
            sum_area = parseFloat(sum_area.toFixed(2))
            allUsingArea.value = sum_area

        }

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_masterusing') {
                        const items = await getEnumsTable({name: item.title})
                        code_masterusing.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_floortype') {
                        const items = await getEnumsTable({name: item.title})
                        code_floortype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_slaveusing') {
                        const items = await getEnumsTable({name: item.title})
                        code_slaveusing.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                })
            )

        }


        onMounted(async () => {

            await setCodingFieldsName()
            if (props.selectedFloor) {
                await initFloorUsageItems(props.selectedFloor)
            }

            initData.value = true
        })

        return {
            correctFloat,allUsingArea,
            store,
            toast, code_floortype, addFloorUsing,
            router,
            nameRule,
            floatRule,
            selectedExtraInfoItem,
            floorUsageItems, initData, code_slaveusing, code_masterusing, selectedExtraInfoItemIndex, initFloorUsingList
        }
    },

    data: function () {
        return {
            headers: [
                {
                    name: 'طبقه',
                    width: 10
                },
                {
                    name: 'استفاده اصلی',
                    width: 25
                },
                {
                    name: 'استفاده فرعی',
                    width: 25
                },
                {
                    name: 'مساحت',
                    width: 15
                },
                {
                    name: 'ت واحد',
                    width: 10
                },
                {
                    name: 'عملیات',
                    width: 15
                }
            ],
            dialog: false

        }
    },

    methods: {
        addFloorUsageItem() {

            let sumArea = 0
            this.floorUsageItems.map((item) => {
                sumArea = sumArea + parseFloat(String(item.area))
            })
            sumArea = parseFloat(sumArea.toFixed(2))
            if (this.selectedFloor && (parseFloat(String(this.selectedFloor.area)) - sumArea) > .1) {
                const item = {
                    area: parseFloat((parseFloat(String(this.selectedFloor.area)) - sumArea).toFixed(2)),
                    main_use: 1,
                    sub_use: 1,
                    units_number: 'numbers' in this.selectedFloor ? this.selectedFloor.numbers : 0,
                    sharing: false
                }
                this.floorUsageItems.push(item)
                this.setAllUsingArea(item,'area')

            } else {
                this.toast.add({
                    group: 'br',
                    life: 5000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: 'ظرفیت زیربنای طبقه تکمیل است'
                });
            }

            setTimeout(()=>{
                let element:HTMLElement = document.getElementById("listDiv");
                element.scrollTo({ top:element.scrollHeight,behavior: "smooth"});
                element.scrollTop = element.scrollHeight;

            },150)

        },

        showExtraInfoDialog(item: floorUsage, index: number) {
            this.selectedExtraInfoItem = item
            this.selectedExtraInfoItemIndex = index
            this.dialog = true
        },

        closeExtraDialog(item: floorUsage) {
            this.floorUsageItems[this.selectedExtraInfoItemIndex] = item
            this.selectedExtraInfoItemIndex = 0
            this.selectedExtraInfoItem = null
            this.dialog = false
        },

        deleteFloorUsageItem(index: number) {
            this.floorUsageItems.splice(index, 1)

            let sum_area=  0
            this.floorUsageItems.map((i)=>{
                sum_area = sum_area + parseFloat(i.area)
            })
            sum_area = parseFloat(sum_area.toFixed(2))
            this.allUsingArea = sum_area
        },

        async nextPageFunc(): FloorNextPageFuncRes {

            if (this.selectedFloor && this.selectedFloor.id) {
                const res = await this.addFloorUsing({floor_using: this.floorUsageItems}, this.selectedFloor.id)
                if (res) {
                    return {
                        error: null,
                        result: {...this.selectedFloor, floor_using: this.initFloorUsingList}
                    }
                }
            }
            return {
                error: 'خطا در ذخیره اطلاعات',
                result: null
            }

        },

        setAllUsingArea(item:any,name:string){
            this.correctFloat(item,'area')
            let sum_area=  0
            this.floorUsageItems.map((i)=>{
                sum_area = sum_area + parseFloat(i.area)
            })
            sum_area = parseFloat(sum_area.toFixed(2))
            this.allUsingArea = sum_area
            if (this.allUsingArea>this.selectedFloor?.area){
                this.toast.add({
                    group: 'br',
                    life: 3000,
                    severity: 'warn',
                    summary: ' اخطار',
                    detail: 'ظرفیت زیربنای طبقه تکمیل است'
                });
            }
        }
    },


});
</script>


<style scoped>

</style>
