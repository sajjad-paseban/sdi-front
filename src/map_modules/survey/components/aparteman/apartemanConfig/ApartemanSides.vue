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

            <v-row class="ma-0 pa-0 pb-2 border-b" v-if="initData" style="overflow-y: auto;height: 100%;" justify="center">



                <v-col cols="12" md="12" id="table" style="height:100%;overflow-x: auto;position: relative"
                       class="rounded-lg  pa-0 ">
                    <v-btn size="small" @click="addSide" class="elevation-2" icon="mdi-plus" color="info" style="position: absolute;right:20px;bottom:20px"></v-btn>


                    <v-fade-transition>
                        <v-table v-if="initData&&false" density="compact"
                                 style="height: 100%;overflow-y: auto;min-width:800px"
                                 :fixed-header="true">
                            <thead>
                            <tr>
                                <th class=" font-weight-bold" v-for="i in headers" :key="i.text">
                                    {{ i.text }}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                    v-for="(item,index) in districts"
                                    :key="item.num"
                                    class="myForm"
                            >
                                <td class="font-weight-bold">{{ item.num }}</td>
                                <td class="font-weight-bold" style="width:15%">
                                    <v-autocomplete
                                            v-if="code_direction"
                                            :items="code_direction.items"
                                            v-model="item.direction"
                                            item-title="title"
                                            item-value="pk"
                                            density="compact"
                                            variant="solo"
                                            class="mt-1"
                                            required
                                    >
                                    </v-autocomplete>
                                </td>
                                <td class="font-weight-bold" style="width:10%">
                                    <v-text-field
                                            density="compact"
                                            variant="solo"
                                            type="number"
                                            required
                                            class="mt-1"
                                            v-model="item.long"
                                    >

                                    </v-text-field>
                                </td>
                                <td class="font-weight-bold">{{ item.bar_long }}</td>

                                <td>
                                    <v-autocomplete
                                            v-if="code_adjacenttype"
                                            :items="code_adjacenttype.items"
                                            v-model="item.adjacent_type"
                                            item-title="title"
                                            item-value="pk"
                                            density="compact"
                                            variant="solo"
                                            class="mt-1"
                                            required
                                    >
                                    </v-autocomplete>

                                </td>
                                <td class="text-center font-weight-bold">
                                    <template v-if="!item.maabar_feature_json">
                                        <p>ندارد</p>
                                    </template>
                                    <template v-else>
                                        <v-btn @click="openDialog('maabarInfo',item)" size="x-small" color="dialogBar">
                                            معبر
                                        </v-btn>
                                    </template>

                                </td>
                                <td>
                                    <v-row class="ma-0 pa-0">
                                        <v-btn class="mx-1" @click="openDialog('darb',item)" size="x-small"
                                               color="dark_blue">درب
                                        </v-btn>
                                        <v-btn class="mx-1" @click="openDialog('sideType',item)" size="x-small"
                                               color="dark_blue">نوع حصار
                                        </v-btn>
                                        <v-btn class="mx-1" @click="openDialog('extraInfo',item)" size="x-small"
                                               color="dark_blue"> اطلاعات تکمیلی
                                        </v-btn>
                                        <v-btn class="mx-1" @click="deleteDistrict(index)" size="x-small"
                                               color="error"> حذف
                                        </v-btn>
                                    </v-row>

                                </td>

                            </tr>
                            </tbody>
                        </v-table>
                        <v-row v-if="initData" class="ma-0 pa-0  "
                               style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;" justify="center">
                            <div v-for="(item,index) in districts"
                                 :key="item.num"
                                 style="width: 98%"
                                 class=" pa-1 ">
                                <div class="bg-white elevation-3 rounded-lg border-t ">
                                    <v-row class="ma-0 pa-0 myForm " style="font-size: 11px" justify="center">
                                        <v-col cols="4" sm="2">
                                            <v-text-field
                                                    density="compact"
                                                    v-model="item.num"
                                                    variant="solo"
                                                    type="number"
                                                    required
                                            >
                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="text-blue-darken-4">شماره</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="4" sm="2">
                                            <v-text-field
                                                    density="compact"
                                                    v-model="item.long"
                                                    variant="solo"
                                                    type="number"
                                                    @update:modelValue="correctFloat(item,'long')"
                                                    required
                                            >
                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="text-blue-darken-4">طول</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="4" sm="2">
                                            <v-text-field

                                                    density="compact"
                                                    v-model="item.bar_long"
                                                    variant="solo"
                                                    class="text-center"
                                                    @update:modelValue="correctFloat(item,'bar_long')"
                                                    type="number"
                                                    required
                                            >
                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="text-blue-darken-4">طول بر</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" sm="3">
                                            <v-autocomplete
                                                    v-if="code_direction"
                                                    :items="code_direction.items"
                                                    v-model="item.direction"
                                                    item-title="title"
                                                    item-value="pk"
                                                    density="compact"
                                                    variant="solo"
                                                    class=""
                                                    required
                                            >
                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="text-blue-darken-4">{{ code_direction.pName }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" sm="3">
                                            <v-autocomplete
                                                    v-if="code_adjacenttype"
                                                    :items="code_adjacenttype.items"
                                                    v-model="item.adjacent_type"
                                                    item-title="title"
                                                    item-value="pk"
                                                    density="compact"
                                                    variant="solo"
                                                    class=""
                                                    required
                                            >
                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="text-blue-darken-4">{{ code_adjacenttype.pName }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>
                                    <div style="height:40px;width:100%" class="bg-grey-lighten-2 border-t rounded-b-lg">
                                        <v-row class="ma-0 pa-0 pr-1" justify="start" align="center" style="height: 100%">
                                            <v-btn size="x-small" class="ml-1 py-1 font-weight-bold" @click="openDialog('darb',item)"  style="font-size: 10px;background-color: #2196f370">درب</v-btn>
                                            <v-btn size="x-small" class="ml-1 py-1 font-weight-bold" @click="openDialog('sideType',item)" color=""  style="font-size: 10px;background-color: #2196f370">نوع حصار</v-btn>
                                            <v-btn size="x-small" class="ml-1 py-1 font-weight-bold" @click="openDialog('extraInfo',item)"  color=""  style="font-size: 10px;background-color: #2196f370"> اطلاعات تکمیلی</v-btn>

                                            <template v-if="item.maabar_feature_json">
                                                <v-btn  @click="openDialog('maabarInfo',item)"  size="x-small" class="ml-1 py-1"  color="dialogBar" style="font-size: 10px">معبر</v-btn>
                                            </template>
                                            <v-btn color="error" size="x-small" class="ml-1 py-1 font-weight-bold" @click="deleteDistrict(index)"   style="font-size: 10px">حذف</v-btn>


                                        </v-row>
                                    </div>


                                </div>

                            </div>
                        </v-row>
                    </v-fade-transition>


                </v-col>
            </v-row>
        </v-fade-transition>
        <simple-dialog
                :show="dialog"
                :topic="activeDialogTopic"
                width="50vw"
                height="60vh"
                :current_height="'80vh'"
                @closeDialog="dialog=false"
                class="bg-grey-lighten-2"
        >
            <div style="height: 100%;width:100%;overflow-y: hidden" v-if="activeItem">
                <template v-if="activeDialogTopic ==='اطلاعات معبر'">
                    <MaabarInfo @main_maabar="setMainMaabar" :side="activeItem"></MaabarInfo>
                </template>
                <template v-if="activeDialogTopic ==='مشخصات نوع ضلع'">
                    <SideType @saveSideType="saveSideType" :side="activeItem"></SideType>
                </template>

                <template v-if="activeDialogTopic ==='تنظیمات درب'">
                    <Darb @save-doors-info="saveDoorsInfo" :side="activeItem"></Darb>
                </template>

                <template v-if="activeDialogTopic ==='اطلاعات تکمیلی'">
                    <ExtraInfo @save-side-extra-info="saveSideExtraInfo" :side="activeItem"></ExtraInfo>
                </template>

            </div>

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
import {Aparteman, DarbInfo, District, EnumField, Owner, Wall} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import SidesInfo from "@/map_modules/survey/components/arse/sidesInfo/SidesInfo.vue";
import Darb from "@/map_modules/survey/components/arse/sidesInfo/Darb.vue";
import ExtraInfo from "@/map_modules/survey/components/arse/sidesInfo/ExtraInfo.vue";
import SideType from "@/map_modules/survey/components/arse/sidesInfo/SideType.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import MaabarInfo from "@/map_modules/survey/components/arse/sidesInfo/MaabarInfo.vue";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {ApartmentNextPageFuncRes} from "@/map_modules/survey/components/aparteman/apartmenttRef";


export default defineComponent({
    name: "ApartemanSidesComponent",

    components: {MaabarInfo, SimpleDialog, SideType, ExtraInfo, Darb, SidesInfo},


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


        const {nameRule, floatRule, phoneRule} = rules()
        const {getEnumsTable,apartmentSetDistricts,correctFloat} = survey_functions()
        const {formatLength} = source_functions()
        const districts = ref<District[]>([])

        const code_adjacenttype = ref<EnumField>()
        const code_direction = ref<EnumField>()
        const initData = ref(false)

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_adjacenttype') {
                        const items = await getEnumsTable({name: item.title})
                        code_adjacenttype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }

                    if (item.title === 'code_direction') {
                        const items = await getEnumsTable({name: item.title})
                        code_direction.value = {
                            pName: item.alias,
                            items: items
                        }
                    }

                })
            )

        }


        onMounted(async()=>{
            await setCodingFieldsName()

            if (props.apartment.apartment_districts){
                districts.value = props.apartment.apartment_districts
            }

            setTimeout(()=>{
                initData.value = true
            },100)
        })

        return {
            apartmentSetDistricts,districts,correctFloat,
            store, toast, router, nameRule, floatRule, phoneRule,initData,code_adjacenttype, formatLength,code_direction
        }
    },

    data() {
        return {
            headers: [
                {text: "شماره", value: "index", width: "5%"},
                {text: "جهت", value: "direction", width: "15%"},
                {text: "طول", value: "length", width: "15%"},
                {text: "طول بر", value: "length", width: "10%"},
                {text: "نوع حد مجاور ", value: "length", width: "15%"},
                {text: "معبر", value: "maabar", width: "10%"},
                {text: "تکمیلی", value: "darb", width: "30%"},
            ],
            dialog: false,
            activeDialogTopic: '',
            activeItem: null as null | District,



            tableFilterActivate: false,

            height: "",  //  برای اندازه ازتفاع جدول //
        }
    },
    methods: {
        addSide(){
            this.districts.push({
                adjacent_type: 1,
                bar_long: 0,
                bezel_area: 0,
                direction: 1,
                explanation: null,
                front_area: 0,
                geo_line: null,
                gozar_lat: 0,
                has_bezel: false,
                long: 0,
                maabar_feature_json: null,
                maabar_lat: 0,
                maabar_long: 0,
                main_maabar: false,
                num: this.districts.length+1,

            })
        },

        deleteDistrict(index:number){
            this.store.commit('setConfirmDialog', {
                massage: 'آیا حذف مورد تایید است ؟',
                topic: 'اخطار',
                active: true,
                accept: async () => {
                    this.districts.splice(index,1)
                },
                reject: () => {
                    console.log('reject')
                },

            })

        },

        openDialog(dialogType: string, item: District) {
            if (dialogType === 'maabarInfo') {
                if (item.maabar_feature_json) {
                    this.activeDialogTopic = 'اطلاعات معبر'
                    this.dialog = true
                    this.activeItem = item
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 3000,
                        severity: 'error',
                        summary: ' خطا در دخواست',
                        detail: 'معبری برای این ضلع پیدا نشد'
                    });
                }
            } else if (dialogType === 'sideType') {
                this.activeDialogTopic = 'مشخصات نوع ضلع'
                this.dialog = true
                this.activeItem = item
            } else if (dialogType === 'darb') {
                this.activeDialogTopic = 'تنظیمات درب'
                this.dialog = true
                this.activeItem = item
            } else if (dialogType === 'extraInfo') {
                this.activeDialogTopic = 'اطلاعات تکمیلی'
                this.dialog = true
                this.activeItem = item
            }

        },

        saveSideType(wall: Wall) {
            this.dialog = false
            this.districts.map((district) => {
                if (district.num === this.activeItem?.num) {
                    district['wall'] = wall
                }
            })

            this.toast.add({
                group: 'tr',
                life: 3000,
                severity: 'success',
                summary: ' نتیجه ویرایش',
                detail: "تنظیمات اعمال شد"
            });
        },

        saveDoorsInfo(doors: DarbInfo[]) {
            this.dialog = false
            this.districts.map((district) => {
                if (district.num === this.activeItem?.num) {
                    district['doors'] = doors
                }
            })

            this.toast.add({
                group: 'tr',
                life: 3000,
                severity: 'success',
                summary: ' نتیجه ویرایش',
                detail: "تنظیمات اعمال شد"
            });
        },

        saveSideExtraInfo(side: District) {
            this.dialog = false
            const new_districts:District[] = []
            this.districts.map((district) => {
                if (district.num === this.activeItem?.num) {
                    new_districts.push(side)
                }else {
                    new_districts.push(district)
                }
            })

            this.districts = new_districts
        },

        setMainMaabar(value: boolean) {
            if (this.activeItem) {
                this.activeItem['main_maabar'] = value
            }
        },

        screenResizeHandler() {
            let x: any = document.getElementById("table");
            this.height = String(x.offsetHeight);

        },

        async nextPageFunc(): ApartmentNextPageFuncRes {

            const res = await this.apartmentSetDistricts(this.districts,this.apartment.id)
            if (res){
                return {
                    result:{...this.apartment,apartment_districts:this.districts},
                    error:null
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
