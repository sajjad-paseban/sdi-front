<template>
    <div style="height:100%;width:100%" class="pa-2  myForm">
        <v-row class="ma-0 p-0   rounded-lg" style="height: 100%" justify="center">
            <v-col cols="12" md="10" style="height: 100%;overflow: auto" class="">
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
                    <v-table v-if="initData&&selectedBuilding_clone&&false" density="compact" height="50vh"
                             style="min-width: 400px" fixed-header class="rounded-lg elevation-4 mt-3 border">
                        <thead class="bg-grey-lighten-4">
                        <tr class="bg-grey-lighten-4">
                            <th class="text-right font-weight-bold bg-grey-lighten-2"
                                v-for="(i,index) in headers" :key="index">
                                {{ i }}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                v-for="(item,index) in selectedBuilding_clone.building_floor"
                                :key="index"
                        >
                            <td class="font-weight-bold" style="width: 35%">
                                <v-autocomplete
                                        v-if="code_floortype"
                                        :items="code_floortype.items"
                                        v-model="item.floor_type"
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
                            <td class="font-weight-bold" style="width: 20%">
                                <v-text-field
                                        density="compact"
                                        variant="solo"
                                        type="number"
                                        required
                                        class="mt-1"
                                        v-model="item.area"
                                >

                                </v-text-field>
                            </td>
                            <td class="font-weight-bold" style="width: 25%">
                                <v-text-field
                                        density="compact"
                                        variant="solo"
                                        type="number"
                                        required
                                        class="mt-1"
                                        v-model="item.progress_area"
                                >

                                </v-text-field>
                            </td>

                            <td class="font-weight-bold" style="width: 20%">
                                <v-text-field
                                        density="compact"
                                        variant="solo"
                                        type="number"
                                        required
                                        class="mt-1"
                                        v-model="item.units_number"
                                >

                                </v-text-field>
                            </td>
                        </tr>
                        </tbody>
                    </v-table>
                    <v-row v-if="initData&&selectedBuilding_clone&&true"  class="ma-0 pa-0 rounded-lg "
                            style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;width:100%"
                            justify="center">
                        <div v-for="(item,index) in selectedBuilding_clone.building_floor"
                             :key="item.id"
                             style="width: 100%"
                             class=" pa-1 ">
                            <div class="bg-white elevation-3 rounded-lg border-t ">
                                <v-row class="ma-0 pa-0 myForm " style="font-size: 11px" justify="center">
                                    <v-col cols="12" sm="3">
                                        <v-autocomplete
                                                v-if="code_floortype"
                                                :items="code_floortype.items"
                                                v-model="item.floor_type"
                                                item-title="title"
                                                item-value="pk"
                                                density="compact"
                                                readonly
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
                                    <v-col cols="12" sm="3">
                                        <v-text-field
                                                density="compact"
                                                v-model="item.area"
                                                variant="solo"
                                                @update:modelValue="correctFloat(item,'area')"
                                                type="number"
                                                required
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">مساحت طبقه</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="3">
                                        <v-text-field
                                                density="compact"
                                                v-model="item.progress_area"
                                                variant="solo"
                                                @update:modelValue="correctFloat(item,'progress_area')"
                                                type="number"
                                                required
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">مساحت پیشامدگی</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field
                                                density="compact"
                                                v-model="item.units_number"
                                                variant="solo"
                                                type="number"
                                                required
                                        >
                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="text-blue-darken-4">تعداد واحد ها</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>

                            </div>

                        </div>
                    </v-row>
                </v-fade-transition>

            </v-col>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {EnumField, FloorInfo, ProgressInfo, SelectedBuilding} from "@/models/Survey.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {CodingTableRecord} from "@/store/survey/types";
import {BuildingResultTableNextPageFuncRes} from "@/map_modules/survey/components/building/buildingProgressRef";


export default defineComponent({
    name: "BuildingProgressResultTableComponent",

    components: {},


    props: {
        selectedBuilding: {
            type: Object as PropType<SelectedBuilding | null>,
            required: true
        },
        step: {
            type: Number,
            required: true
        },


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const floors = ref<FloorInfo[]>([])
        const {getEnumsTable, addBuildingFloor,correctFloat} = survey_functions()

        const initData = ref(false)
        const code_floortype = ref<EnumField>()
        const selectedBuilding_clone = ref<SelectedBuilding>()

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
                })
            )

        }

        function init_floors(selectedBuildingValue: SelectedBuilding) {
            if (selectedBuildingValue) {
                const building_area = selectedBuildingValue.extra_info.roof_area
                const floors = selectedBuildingValue.extra_info.floors_num
                let edit = false
                let building_floor_clone
                if (selectedBuildingValue.building_floor) {
                    edit = true
                    building_floor_clone= [...selectedBuildingValue.building_floor]
                }
                selectedBuildingValue.building_floor = []


                for (let i = 0; i < floors; i++) {
                    if (selectedBuildingValue.progressInfo && selectedBuildingValue.progressInfo.length > 0 && selectedBuildingValue.progressInfo[0].floors) {
                        const name = selectedBuildingValue.progressInfo[0].floors[i].floor
                        let progress_area = 0
                        selectedBuildingValue.progressInfo.map((progress) => {
                            if (progress.floors && progress.floors[i].value) {
                                progress_area = progress_area + progress.area
                            }
                        })

                        selectedBuildingValue.building_floor.push({
                            floor_type: edit?building_floor_clone[i].floor_type:name,
                            area: building_area,
                            progress_area: progress_area,
                            units_number: edit?building_floor_clone[i].units_number:0
                        })

                    } else {
                        selectedBuildingValue.building_floor.push({
                            floor_type: edit?building_floor_clone[i].floor_type:(i+1),
                            area: building_area,
                            progress_area: 0,
                            units_number: edit?building_floor_clone[i].units_number:0
                        })
                    }
                }
            }

        }


        onMounted(async () => {
            console.log(props.selectedBuilding, 'selectedBuilding_clone in result table')
            if (props.selectedBuilding)
                selectedBuilding_clone.value = {...props.selectedBuilding}
            if (selectedBuilding_clone.value) {
                init_floors(selectedBuilding_clone.value)
            }


            await setCodingFieldsName()
            initData.value = true

        })


        return {
            store, toast, router, code_floortype, initData, selectedBuilding_clone, addBuildingFloor,correctFloat
        }
    },

    data() {
        return {
            headers: [
                'طبقه', 'مساحت طبقه', 'مساحت پیشامدگی', 'تعداد واحد'
            ],
        }
    },
    methods: {

        async nextPageFunc(): BuildingResultTableNextPageFuncRes {
            if (this.selectedBuilding_clone && this.selectedBuilding_clone.building_floor && this.selectedBuilding_clone.id) {
                const res = await this.addBuildingFloor({building_floor: this.selectedBuilding_clone.building_floor}, this.selectedBuilding_clone.id)
                if (res) {
                    return {
                        error: null,
                        result: this.selectedBuilding_clone
                    }
                }
            }

            return {
                error: 'خطا در ویرایش اطلاعات طبقات',
                result: null
            }

        }
    },


    watch: {},


});
</script>


<style scoped>



</style>
