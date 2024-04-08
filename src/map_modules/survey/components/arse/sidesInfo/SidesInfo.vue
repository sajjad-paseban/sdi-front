<template>

    <div style="height:100%;width:100%">
        <div style="height:100%;width:100%" class="pa-2">
            <v-row class="pa-0 ma-0" style="height:100%" justify="center">
                <v-col cols="12" sm="12" id="table" style="height:100%;overflow-x: auto;position: relative"
                       class="rounded-lg  pa-0 ">

                    <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                        <v-fade-transition>
                            <v-progress-circular
                                    :size="50"
                                    color="primary"
                                    indeterminate
                            ></v-progress-circular>
                        </v-fade-transition>
                    </v-row>

                    <v-fade-transition>
                        <v-table v-if="false" density="compact"
                                 style="height: 100%;overflow-y: auto;min-width: 600px"
                                 :fixed-header="true">
                            <thead>
                            <tr>
                                <th class="text-center font-weight-bold" v-for="i in headers" :key="i.text">
                                    {{ i.text }}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                    v-for="item in districts"
                                    :key="item.num"
                                    class="myForm"
                            >
                                <td class="font-weight-bold">{{ item.num }}</td>
                                <td class="font-weight-bold">
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
                                <td class="font-weight-bold">{{ item.long }}</td>
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
                                    </v-row>

                                </td>

                            </tr>
                            </tbody>
                        </v-table>
                        <v-row v-if="false" class="ma-0 pa-0 rounded-lg border-b"
                               style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;"
                               justify="center">
                            <div v-for="item in districts"
                                 :key="item.num"
                                 style="width: 90%"
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
                                        <v-row class="ma-0 pa-0 pr-1" justify="start" align="center"
                                               style="height: 100%">
                                            <v-btn size="x-small" class="ml-1 py-1 font-weight-bold"
                                                   @click="openDialog('darb',item)"
                                                   style="font-size: 10px;background-color: #2196f370">درب
                                            </v-btn>
                                            <v-btn size="x-small" class="ml-1 py-1 font-weight-bold"
                                                   @click="openDialog('sideType',item)" color=""
                                                   style="font-size: 10px;background-color: #2196f370">نوع حصار
                                            </v-btn>
                                            <v-btn size="x-small" class="ml-1 py-1 font-weight-bold"
                                                   @click="openDialog('extraInfo',item)" color=""
                                                   style="font-size: 10px;background-color: #2196f370"> اطلاعات تکمیلی
                                            </v-btn>

                                            <template v-if="item.maabar_feature_json">
                                                <v-btn @click="openDialog('maabarInfo',item)" size="x-small"
                                                       class="ml-1 py-1" color="dialogBar" style="font-size: 10px">معبر
                                                </v-btn>
                                            </template>


                                        </v-row>
                                    </div>


                                </div>

                            </div>
                        </v-row>
                        <v-row v-if="groupedDistricts.length>0" class="ma-0 pa-0 rounded-lg border-b bg-white px-2"
                               style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;"
                               justify="center">
                            <ExpandPanelComponent style="height:100%" :items="groupedDistricts" id="expandId">
                                <template #item="{item}">
                                    <div style="width:100%;overflow-y: auto" :style="`height:${expandHeight-((groupedDistricts.length * 50) + 35)}px`">
                                        <div v-for="i in item.districts"
                                             :key="i.num"
                                             style="width: 100%"
                                             class=" pa-1 ">
                                            <div class="bg-white elevation-3 rounded-lg border-t myForm">
                                                <v-row class="ma-0 pa-0 rounded-lg "
                                                       style="overflow-y: auto;display: flex;align-content: flex-start;width:100%"
                                                       justify="center">
                                                    <v-col cols="4" sm="2">
                                                        <v-text-field
                                                                density="compact"
                                                                v-model="i.num"
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
                                                                v-model="i.long"
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
                                                                v-model="i.bar_long"
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
                                                                v-model="i.direction"
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
                                                                v-model="i.adjacent_type"
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
                                                    <v-row class="ma-0 pa-0 pr-1" justify="start" align="center"
                                                           style="height: 100%">
                                                        <v-btn size="x-small" class="ml-1 py-1 font-weight-bold"
                                                               @click="openDialog('darb',i)"
                                                               style="font-size: 10px;background-color: #2196f370">درب
                                                        </v-btn>
                                                        <v-btn size="x-small" class="ml-1 py-1 font-weight-bold"
                                                               @click="openDialog('sideType',i)" color=""
                                                               style="font-size: 10px;background-color: #2196f370">نوع حصار
                                                        </v-btn>
                                                        <v-btn size="x-small" class="ml-1 py-1 font-weight-bold"
                                                               @click="openDialog('extraInfo',i)" color=""
                                                               style="font-size: 10px;background-color: #2196f370"> اطلاعات تکمیلی
                                                        </v-btn>

                                                        <template v-if="i.maabar_feature_json">
                                                            <v-btn @click="openDialog('maabarInfo',i)" size="x-small"
                                                                   class="ml-1 py-1" color="dialogBar" style="font-size: 10px">معبر
                                                            </v-btn>
                                                        </template>


                                                    </v-row>
                                                </div>


                                            </div>

                                        </div>
                                    </div>


                                </template>
                                <template #title="{item}">
                                    <v-row class="ma-0 pa-0 " style="width:calc(100% - 50px)" >
                                        <p class="pa-1 mr-2 font-weight-bold border rounded-lg" style="font-size: 12px;background-color: #57acf72e">جهت : {{item.direction_text}}</p>

                                        <p class="pa-1 mr-3  font-weight-bold border rounded-lg" style="font-size: 12px;background-color: #57acf72e">طول : {{ Math.round(item.sum_long * 100) / 100}}</p>

                                        <p class="pa-1 mr-3  font-weight-bold border rounded-lg" style="font-size: 12px;background-color: #57acf72e">طول بر : {{item.sum_bar_long}}</p>
                                        <v-spacer/>

                                    </v-row>


                                </template>
                            </ExpandPanelComponent>
                        </v-row>
                    </v-fade-transition>


                </v-col>
            </v-row>
        </div>

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
import Feature from 'ol/Feature.js';
import {Arse, DarbInfo, District, EnumField, Wall} from "@/models/Survey.interface";
import Geometry from "ol/geom/Geometry";
import {getLength} from "ol/sphere";
import LineString from 'ol/geom/LineString.js';
import SimpleDialog from "@/components/common/simpleDialog.vue";
import MaabarInfo from "@/map_modules/survey/components/arse/sidesInfo/MaabarInfo.vue";
import SideType from "@/map_modules/survey/components/arse/sidesInfo/SideType.vue";
import Darb from "@/map_modules/survey/components/arse/sidesInfo/Darb.vue";
import ExtraInfo from "@/map_modules/survey/components/arse/sidesInfo/ExtraInfo.vue";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {ArseNextPageFuncRes, SideInfoNextPageFuncRes} from "@/map_modules/survey/components/arse/AresRef";
import ExpandPanelComponent from "@/components/common/expandPanel.vue";

export interface GDistricts {
    direction: number,
    direction_text:string,
    sum_long: number,
    sum_bar_long: number
    districts: District[],
}

export default defineComponent({
    name: "SidesInfoComponent",

    components: {ExpandPanelComponent, SimpleDialog, MaabarInfo, SideType, Darb, ExtraInfo},

    props: {


        arseInfoList: {
            required: true,
            type: Array as PropType<District[]>,
            default: () => []
        },

        arse: {
            required: true,
            type: Object as PropType<Arse>
        },


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()

        const {getEnumsTable, getArseFeatureInfo, arseInfoListData, saveDistricts, correctFloat} = survey_functions()
        const {formatLength} = source_functions()

        const code_adjacenttype = ref<EnumField>()
        const code_direction = ref<EnumField>()
        const initData = ref(false)
        const {featureToJson} = source_functions()

        const groupedDistricts = ref<GDistricts[]>([])
        const expandHeight = ref<number>(0)

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


        return {
            setCodingFieldsName,
            groupedDistricts,
            featureToJson,
            store,
            toast,
            code_adjacenttype,
            initData,
            formatLength,
            code_direction,
            saveDistricts,
            getArseFeatureInfo,
            arseInfoListData, correctFloat,expandHeight
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
            districts: [] as District[],

            dialog: false,
            activeDialogTopic: '',
            activeItem: null as null | District,


            tableFilterActivate: false,

            height: "",  //  برای اندازه ازتفاع جدول //

            // /-------table data---------
        }
    },
    methods: {


        async updateItems() {
            if (this.arseInfoList.length > 0) {
                this.districts = this.arseInfoList.map((line) => {

                    if (!line.long) {
                        const geo: any = line.geo_line
                        line.long = this.formatLength(new LineString(geo.coordinates))
                    }

                    return line
                })
            } else {
                const arse: Arse = this.store.getters.getArseInfo
                if (arse && arse.geometry) {
                    const data: any = this.featureToJson(arse.geometry, true)
                    await this.getArseFeatureInfo({geoJson: data})
                    this.districts = this.arseInfoListData.map((line) => {

                        if (!line.long) {
                            const geo: any = line.geo_line
                            line.long = this.formatLength(new LineString(geo.coordinates))
                        }

                        return line
                    })
                }

            }


            this.districts.map((item) => {
                let is_exist = false

                this.groupedDistricts.map((i) => {
                    if (i.direction === item.direction) {
                        is_exist = true
                        i.sum_long = i.sum_long + item.long
                        i.sum_bar_long = i.sum_bar_long + (item.bar_long?item.bar_long:0)
                        i.districts.push(item)
                    }
                })
                if (!is_exist) {
                    let direction_text = ''
                    if (this.code_direction){
                        this.code_direction.items.map((i)=>{
                            if (i.pk=== item.direction){
                                direction_text = i.title
                            }
                        })
                    }
                    this.groupedDistricts.push({
                        direction: item.direction,
                        sum_bar_long: item.bar_long ? item.bar_long : 0,
                        sum_long: item.long,
                        direction_text :direction_text,
                        districts: [item]
                    })
                }

            })
        },

        openDialog(dialogType: string, item: District) {
            console.log(item,'sssssssssss')
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
            const new_districts: District[] = []
            this.districts.map((district) => {
                if (district.num === this.activeItem?.num) {
                    new_districts.push(side)
                } else {
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

            setTimeout(() => {
                const element = document.getElementById('expandId')
                if (element) {
                    this.expandHeight = element.offsetHeight
                }

            }, 500)

        },

        async nextPageFunc(): SideInfoNextPageFuncRes {
            if (this.districts && this.arse.id) {
                const res = await this.saveDistricts({districts: this.districts}, this.arse.id)
                if (res.text.length === 0) {
                    this.$toast.add({
                        group: 'tr',
                        life: 3000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'اطلاعات ذخیره شد'
                    });
                    return {
                        error: null,
                        result: this.districts
                    }
                } else {
                    return {
                        error: 'ذخیره اطلاعات اضلاع انجام نشد',
                        result: null
                    }
                }

            } else {
                return {
                    error: 'اطلاعات تکمیل نیست',
                    result: null
                }
            }

        },


    },

    watch: {
        arseInfoList() {
            this.updateItems()
        }
    },
    async mounted(): void {
        await this.setCodingFieldsName()
        this.initData = true
        await this.updateItems()
        setTimeout(() => {
            this.screenResizeHandler()
        }, 200)
    },

    //  برای اندازه ازتفاع جدول //
    created() {
        window.addEventListener("resize", this.screenResizeHandler);
    },
    unmounted() {
        window.removeEventListener("resize", this.screenResizeHandler);
    },
    //  برای اندازه ازتفاع جدول //


});
</script>


<style>


</style>
