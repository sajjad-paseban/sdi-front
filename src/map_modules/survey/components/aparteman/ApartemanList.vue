<template>
    <div style="height:100%;width:100%" class=" ">
        <div style="height:100%;width:100%" class="  myForm">
            <v-img src="@/assets/cImages/1.jpg" style=";width: 100%;height:100%"  cover class="pa-2">
                <v-row class="ma-0 pa-0   rounded-lg" style="height: 100%" justify="center">
                    <v-col cols="12" sm="10" style="height: 100%;overflow-y: hidden;position: relative"
                           class="rounded-lg elevation-4 bg-white pa-2 px-4   ">
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

                            <v-row class="pa-0 ma-0 pa-1" v-if="buildingsItem.length>0"
                                   style="height:100%;width:100%;overflow-y: auto;display: flex;align-content: flex-start">

                                <v-expansion-panels v-if="true" class="rounded-lg elevation-1 font-weight-bold">
                                    <v-expansion-panel
                                            class="rounded-lg border bg-white"
                                            v-for="(item,index) in buildingsItem"
                                            :key="index"

                                    >
                                        <template v-slot:text>
                                            <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                                                <v-expansion-panel
                                                        class="rounded-lg border bg-white"
                                                        v-for="(floorItem,index) in item.floors"
                                                        :key="index"
                                                        :title="`${getFloorName(floorItem.name)}`"
                                                >
                                                    <template v-slot:text>
                                                        <v-row v-if="floorItem.apartments.length>0" class="ma-0 pa-0 rounded-lg "
                                                               style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;width:100%"
                                                               justify="center">
                                                            <div v-for="(item,index) in floorItem.apartments"
                                                                 :key="item.id"
                                                                 style="width: 100%"
                                                                 class=" pa-1 ">
                                                                <div class="bg-white elevation-4 rounded-lg border-t ">
                                                                    <v-row class="ma-0 pa-0 myForm " style="font-size: 11px">

                                                                        <v-col cols="6" sm="3" md="2">
                                                                            <v-autocomplete
                                                                                    v-if="code_floortype"
                                                                                    :items="code_floortype.items"
                                                                                    item-value="pk"
                                                                                    v-model="item.floor_type"
                                                                                    :readonly="true"
                                                                                    density="compact"
                                                                                    variant="solo"

                                                                                    required
                                                                            >
                                                                                <template v-slot:label>
                                                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                                    <p class="text-blue-darken-4">{{ code_floortype.pName }}</p>
                                                                                </template>
                                                                            </v-autocomplete>
                                                                        </v-col>
                                                                        <v-col cols="6" sm="2">
                                                                            <v-text-field
                                                                                    density="compact"
                                                                                    v-model="item.area "
                                                                                    variant="solo"
                                                                                    type="number"
                                                                                    required
                                                                                    readonly
                                                                            >
                                                                                <template v-slot:label>
                                                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                                    <p class="text-blue-darken-4">مساحت</p>
                                                                                </template>
                                                                            </v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="3">
                                                                            <v-autocomplete
                                                                                    v-if="code_masterusing"
                                                                                    :items="code_masterusing.items"
                                                                                    item-value="pk"
                                                                                    v-model="item.floor_using[0].main_use"
                                                                                    :readonly="true"
                                                                                    density="compact"
                                                                                    variant="solo"

                                                                                    required
                                                                            >
                                                                                <template v-slot:label>
                                                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                                    <p class="text-blue-darken-4">{{ code_masterusing.pName }}</p>
                                                                                </template>
                                                                            </v-autocomplete>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="3">
                                                                            <v-autocomplete
                                                                                    v-if="code_slaveusing"
                                                                                    :items="code_slaveusing.items"
                                                                                    item-value="pk"
                                                                                    v-model="item.floor_using[0].sub_use"
                                                                                    :readonly="true"
                                                                                    density="compact"
                                                                                    variant="solo"

                                                                                    required
                                                                            >
                                                                                <template v-slot:label>
                                                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                                    <p class="text-blue-darken-4">{{ code_slaveusing.pName }}</p>
                                                                                </template>
                                                                            </v-autocomplete>
                                                                        </v-col>


                                                                    </v-row>
                                                                    <div style="height:max-content;width:100%" class="bg-grey-lighten-2 border-t rounded-b-lg">
                                                                        <v-row class="ma-0 pa-0 pr-1 pb-1 border-t" justify="start" align="center"
                                                                               style="height: 100%">
                                                                            <v-btn
                                                                                    icon
                                                                                    @click="selectAparteman(item.id)"
                                                                                    variant="text"

                                                                                    size="x-small"
                                                                                    color="primary"
                                                                                    style="font-weight: bold !important"
                                                                            >
                                                                                <v-img
                                                                                        width="22"
                                                                                        class=""
                                                                                        src="@/assets/icons/see.png"
                                                                                        alt="John"
                                                                                ></v-img>
                                                                            </v-btn>
                                                                            <div class="ma-0 pa-0 pa-1 mr-2 bg-white rounded-lg elevation-2"
                                                                                 style="height:70%;width:180px!important;display: flex;flex-direction: row;flex-wrap: wrap;align-content: space-around;justify-content: space-evenly;">
                                                                                <p class="font-weight-bold" style="font-size:10px">
                                                                                    {{ 'کد ساختمان : ' }}</p>
                                                                                <p class="font-weight-bold" style="font-size:10px">
                                                                                    {{ changeCodeDisplay(item.building.code, 'building') }}</p>
                                                                            </div>

                                                                            <div class="ma-0 pa-0 pa-1 mr-2 bg-white rounded-lg elevation-2"
                                                                                 style="height:70%;width:75px!important;display: flex;flex-direction: row;flex-wrap: wrap;align-content: space-around;justify-content: space-evenly;">
                                                                                <p class="font-weight-bold" style="font-size:10px">
                                                                                    {{ 'شماره واحد : ' }}</p>
                                                                                <p class="font-weight-bold" style="font-size:10px">{{ item.code }}</p>
                                                                            </div>

                                                                        </v-row>
                                                                    </div>


                                                                </div>

                                                            </div>
                                                        </v-row>
                                                    </template>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </template>
                                        <template v-slot:title>
                                            <p class="mr-n2" :style="$vuetify.display.smAndUp?'font-size:12px':'font-size:10px'" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">نام ساختمان : {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;کد : {{item.code}}</p>
                                        </template>
                                    </v-expansion-panel>
                                </v-expansion-panels>

                            </v-row>


                        </v-fade-transition>
                        <v-fade-transition>
                            <v-row v-if="initData&&apartmentList.length==0" justify="center" align="center"
                                   class="ma-0 pa-0"
                                   style="height:100% ">
                                <v-col cols="12"
                                       style="display: flex;flex-direction: column;align-content: center;flex-wrap: wrap;">

                                    <v-img style="" height="250"
                                           width="250"
                                           cover=""
                                           class="rounded-pill elevation-2"
                                           src="@/assets/gifs/apartmentUnit.gif"
                                           alt="John"
                                    ></v-img>

                                    <v-row class="ma-0 pa-0 mt-4" justify="center">
                                        <p class="font-weight-bold">واحد مستقلی یافت نشد</p>
                                    </v-row>
                                </v-col>


                            </v-row>
                        </v-fade-transition>


                        <v-btn @click="initApartmentsFunc" v-tooltip.right="'یکسان سازی واحد های مستقل با کاربری طبقات'"
                               style="position: absolute;left:20px;bottom:20px;z-index: 1001" icon
                               class="elevation-4 border-t">
                            <v-avatar size="30">
                                <v-img
                                        class=""
                                        src="@/assets/icons/reset.png"
                                        alt="John"
                                ></v-img>
                            </v-avatar>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-img>


        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import {
    Aparteman,
    Arse,
    BuildingExtraInfo,
    EnumField,
    ParkingAndStoreAndCommons,
    SelectedBuilding
} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import ExpandPanelComponent from "@/components/common/expandPanel.vue";
import {SurveyMutations} from "@/store/survey/mutations";

interface Building extends BuildingExtraInfo {
    apartment?: Aparteman[]
}

export default defineComponent({
    name: "ApartmentListComponent",

    components: {ExpandPanelComponent},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {getEnumsTable, apartmentList, getApartments, changeCodeDisplay, initApartments} = survey_functions()

        const initData = ref(false)
        const code_floortype = ref<EnumField>()
        const code_masterusing = ref<EnumField>()
        const code_slaveusing = ref<EnumField>()
        const buildingsItem = ref<Building[]>([])


        function getBuildingFromApartments(apartmentList: Aparteman[]) {
            const buildings: Building[] = []
            apartmentList.map((apartment) => {
                if (apartment.building) {
                    let find = false
                    buildings.map((item) => {
                        if (item.id === apartment.building.id) {
                            find = true
                            item['apartments'].push(apartment)
                        }
                    })
                    if (!find) {
                        apartment.building['apartments'] = []
                        apartment.building['apartments'].push(apartment)
                        buildings.push(apartment.building)
                    }
                }
            })

            buildings.map((building)=>{
                if (!('floors' in building)){
                    building['floors'] = []
                }
                building.apartments.map((apartment:Aparteman)=>{
                    let find = false
                    building['floors'].map((floor)=>{
                        if (floor.name == apartment.floor_type){
                            floor.apartments.push(apartment)
                            find = true
                        }
                    })
                    if (!find){
                        building['floors'].push({
                            name:apartment.floor_type,
                            apartments:[apartment]
                        })
                    }
                })
            })

            buildingsItem.value = buildings
            console.log(buildings, 'buildings')
        }


        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_floortype') {
                        const items = await getEnumsTable({name: item.title})
                        code_floortype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_masterusing') {
                        const items = await getEnumsTable({name: item.title})
                        code_masterusing.value = {
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
            if (store.getters.getArseInfo.id) {
                store.commit(SurveyMutations.SET_MAP_DISABLE, true)
                await setCodingFieldsName()
                await getApartments(store.getters.getArseInfo.id)
                getBuildingFromApartments(apartmentList.value)

                setTimeout(() => {
                    initData.value = true
                }, 100)
            }

        })


        return {
            changeCodeDisplay, initApartments, getApartments, buildingsItem,getBuildingFromApartments,

            store, toast, router, initData, apartmentList, code_slaveusing, code_masterusing, code_floortype
        }
    },

    data() {
        return {
            headers: [
                'مشاهده', 'ردیف واحد', 'کد ساختمان', 'طبقه وقوع', 'کاربری اصلی', 'کاربری فرعی', 'مساحت'
            ],
        }
    },
    methods: {
        getFloorName(pk:number){
            let name = ''
            if(this.code_floortype){
                this.code_floortype.items.map((item)=>{
                    if (item.pk == pk){
                        name = item.title
                    }
                })
            }
            return name
        },
        selectAparteman(id: number) {
            this.router.push({
                name: 'apartemanConfig',
                params: {idNumber: id}
            });
        },
        async initApartmentsFunc() {
            const arse: Arse = this.store.getters.getArseInfo
            if (arse && arse.id) {
                const res = await this.initApartments(arse.id)
                if (res) {
                    await this.getApartments(arse.id)
                    this.getBuildingFromApartments(this.apartmentList)
                }
            }
        }

    },

    watch: {},


});
</script>


<style>
.v-expansion-panel-text__wrapper {
    padding: 8px 10px 16px !important;
}

</style>
