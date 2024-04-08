<template>
    <div style="height:100%;width:100%;"
         class="pa-2  myForm">

        <v-row class="ma-0 pa-0 pa-1" justify="center">
            <v-col cols="12" sm="11" class="bg-white rounded elevation-1">
                <p style="font-size: 10px; line-height: 20px" class=" ">
                    جهت اضافه کردن آساسنسور و یا راه پله ، در قسمت مربوطه با کلیک بر روی دکمه + میتوانید عارضه خود را
                    اضافه کنید
                </p>
            </v-col>

        </v-row>

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

            <v-row v-if="initData" class="ma-0 pa-0 pt-2" style="height: calc(100% - 35px)" justify="center"
                   align="center">
                <v-col cols="12" sm="11" class="pa-0 ma-0" style="height: 100%" align-self="center">
                    <v-row style="height: 100%;position: relative;overflow-y:hidden "
                           class="  rounded-lg  ma-0 pa-0 myForm">

                        <v-menu :location="'top'" offset="5px">
                            <template v-slot:activator="{ props }">

                                <v-btn v-bind="props" v-tooltip.left="'افزودن عارضه'"
                                       color="info"
                                       size="small"
                                       icon="mdi-plus"
                                       style="position: absolute;bottom:18px;left:18px;z-index: 1001"></v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                        v-for="(item, index) in items"
                                        :key="index"
                                        :value="index"
                                >
                                    <v-list-item-title @click="addDraw(item.value)">{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <v-fade-transition>

                            <v-row v-if="elevator_info.length===0&&staircase_info.length==0" justify="center"
                                   align="center"
                                   class="rounded-lg ma-0 bg-white  pt-1 elevation-1"
                                   style="height:100% ">
                                <v-col cols="12">
                                    <v-row class="ma-0 pa-0">
                                        <v-img style="" height="100"
                                               class=""
                                               src="@/assets/gifs/elevator.gif"
                                               alt="John"
                                        ></v-img>
                                    </v-row>
                                    <v-row class="ma-0 pa-0 mt-2" justify="center">
                                        <p class="font-weight-bold">آسانسور و را پله ای ترسیم نشده است</p>
                                    </v-row>
                                </v-col>


                            </v-row>
                        </v-fade-transition>

                        <v-slide-y-transition>
                            <div style="height: 100%;width:100%;overflow-y: auto">
                                <v-table v-if="elevator_info.length>0&&false" density="compact" class=""
                                         style="height: 100%;width:100%;min-width: 300px" :fixed-header="true">
                                    <thead class="bg-grey-lighten-4">
                                    <tr class="bg-grey-lighten-4">
                                        <th class="text-center font-weight-bold bg-grey-lighten-2" v-for="i in headers"
                                            :key="i">
                                            {{ i }}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                            v-for="(item,index) in elevator_info"
                                            :key="index"
                                    >

                                        <td class="font-weight-bold text-center" style="width:20%">{{ index }}</td>
                                        <td class="font-weight-bold text-center" style="width:30%">
                                            <v-text-field
                                                    density="compact"
                                                    v-model="item.area"
                                                    variant="solo"
                                                    type="number"
                                                    required
                                                    class="mt-2"
                                            >

                                            </v-text-field>
                                        </td>
                                        <td class="text-center" style="width:50%">
                                            <v-row v-if="elevator_info" class="ma-0 pa-0" justify="center">
                                                <v-btn @click="deleteBtn(elevator_info,index)" v-tooltip.bottom="'حذف'"
                                                       class="mx-1"
                                                       color="error" size="small" density="compact" icon>
                                                    <v-icon size="">mdi-delete</v-icon>
                                                </v-btn>
                                                <v-btn @click="showFloorConfigDialog(elevator_info,index)"
                                                       v-tooltip.bottom="'طبقات'" class="mx-1" color="info" size="small"
                                                       density="compact" icon>
                                                    <v-icon size="">mdi-book-outline</v-icon>
                                                </v-btn>
                                            </v-row>
                                        </td>


                                    </tr>
                                    </tbody>
                                </v-table>
                                <v-row v-if="elevator_info.length>0||staircase_info.length>0"
                                       class="ma-0 pa-0 rounded-lg "
                                       style="height:100%;overflow-y: auto;display: flex;align-content: flex-start;width:100%"
                                       justify="center">
                                    <div v-for="(item,index) in elevator_info"
                                         :key="index"
                                         style="width: 100%"
                                         class=" pa-1 ">
                                        <div class="bg-white elevation-3 rounded-lg border-t ">
                                            <v-row class="ma-0 pa-0 myForm mt-1" style="font-size: 11px"
                                                   justify="start">
                                                <v-col cols="6" sm="2">
                                                    <v-text-field
                                                            density="compact"
                                                            :model-value="index+1"
                                                            variant="solo"
                                                            readonly
                                                            type="number"
                                                            required
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">شماره</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="6" sm="3">
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
                                                            <p class="text-blue-darken-4">مساحت</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                            density="compact"
                                                            model-value="آسانسور"
                                                            variant="solo"
                                                            readonly
                                                            required
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">نوع عارضه</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>

                                            </v-row>
                                            <div style="height:40px;width:100%"
                                                 class="bg-grey-lighten-2 border-t rounded-b-lg">
                                                <v-row class="ma-0 pa-0 pr-1" justify="start" align="center"
                                                       style="height: 100%">
                                                    <v-btn color="error"
                                                           size="x-small" class="ml-1 mx-1  font-weight-bold"
                                                           @click="deleteBtn(elevator_info,index)">
                                                        <v-icon start size="small">mdi-delete</v-icon>
                                                        حذف

                                                    </v-btn>

                                                    <v-btn color="info"
                                                           size="x-small" class="ml-1  mx-1 font-weight-bold"
                                                           @click="showFloorConfigDialog(elevator_info,index)">
                                                        <v-icon start size="small">mdi-book-outline</v-icon>
                                                        اختصاص به طبقات
                                                    </v-btn>

                                                    <v-btn color="info"
                                                           size="x-small" class="ml-1  mx-1 font-weight-bold"
                                                           @click="editFeature(item)">
                                                        <v-icon start size="small">mdi-pen</v-icon>
                                                        ویرایش
                                                    </v-btn>
                                                </v-row>
                                            </div>


                                        </div>

                                    </div>
                                    <div v-for="(item,index) in staircase_info"
                                         :key="index"
                                         style="width: 100%"
                                         class=" pa-1 ">
                                        <div class="bg-white elevation-3 rounded-lg border-t ">
                                            <v-row class="ma-0 pa-0 myForm mt-1" style="font-size: 11px"
                                                   justify="start">
                                                <v-col cols="6" sm="2">
                                                    <v-text-field
                                                            density="compact"
                                                            :model-value="index+1"
                                                            variant="solo"
                                                            readonly
                                                            type="number"
                                                            required
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">شماره</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="6" sm="3">
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
                                                            <p class="text-blue-darken-4">مساحت</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-text-field
                                                            density="compact"
                                                            model-value="راه پله"
                                                            variant="solo"
                                                            readonly
                                                            required
                                                    >
                                                        <template v-slot:label>
                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                            <p class="text-blue-darken-4">نوع عارضه</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>

                                            </v-row>
                                            <div style="height:40px;width:100%"
                                                 class="bg-grey-lighten-2 border-t rounded-b-lg">
                                                <v-row class="ma-0 pa-0 pr-1" justify="start" align="center"
                                                       style="height: 100%">
                                                    <v-btn color="error"
                                                           size="x-small" class="ml-1 mx-1  font-weight-bold"
                                                           @click="deleteBtn(staircase_info,index)">
                                                        <v-icon start size="small">mdi-delete</v-icon>
                                                        حذف

                                                    </v-btn>

                                                    <v-btn color="info"
                                                           size="x-small" class="ml-1  mx-1 font-weight-bold"
                                                           @click="showFloorConfigDialog(elevator_info,index)">
                                                        <v-icon start size="small">mdi-book-outline</v-icon>
                                                        اختصاص به طبقات
                                                    </v-btn>
                                                    <v-btn color="info"
                                                           size="x-small" class="ml-1  mx-1 font-weight-bold"
                                                           @click="editFeature(item)">
                                                        <v-icon start size="small">mdi-pen</v-icon>
                                                        ویرایش
                                                    </v-btn>
                                                </v-row>
                                            </div>


                                        </div>

                                    </div>
                                </v-row>
                            </div>

                        </v-slide-y-transition>

                    </v-row>

                </v-col>
            </v-row>
        </v-fade-transition>


        <simple-dialog
                :show="dialog"
                :topic="'اطلاعات تکمیلی'"
                width="50vw"
                height="70vh"
                :current_height="'80vh'"
                @closeDialog="dialog=false"
                class="bg-grey-lighten-2"
        >
            <div style="height: 100%;width:100%;overflow-y: hidden">

                <v-row class="ma-0 pa-0 MyTableCss bg-grey-lighten-4" style="height:100%;overflow-y: auto"
                       justify="center" align="center">
                    <v-col cols="12" sm="10" class="myForm mt-n1" style="height:90%">
                        <v-table v-if="activeFloorConfig" density="compact" class="bg-white rounded-lg elevation-2"
                                 style="height: 100%;width:100%;min-width: 300px" :fixed-header="true">
                            <thead class="bg-grey-lighten-4">
                            <tr class="bg-grey-lighten-4">
                                <th class="text-center font-weight-bold bg-grey-lighten-2" v-for="i in ['طبقه','فعال']"
                                    :key="i">
                                    {{ i }}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                    v-for="(item,index) in activeFloorConfig.floors"
                                    :key="index"
                            >

                                <td class="font-weight-bold text-center" style="width:50%">
                                    <v-autocomplete
                                            v-if="code_floortype"
                                            :items="code_floortype.items"
                                            item-value="pk"
                                            v-model="item.floor"
                                            :readonly="true"
                                            density="compact"
                                            variant="solo"

                                            required
                                    >
                                    </v-autocomplete>
                                </td>
                                <td class="font-weight-bold" just style="width:50%">
                                    <v-row class="ma-0 pa-0" justify="center">
                                        <div style="width: 30px">
                                            <v-checkbox class="" color="info" v-model="item.value"
                                            ></v-checkbox>
                                        </div>

                                    </v-row>
                                </td>


                            </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </div>

        </simple-dialog>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, onBeforeUpdate, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import Feature from "ol/Feature";
import {ElevatorInfo, EnumField, SelectedBuilding} from "@/models/Survey.interface";
import source_functions from "@/components/openLayers/componentFunctions/source";
import BuildingExtraInfo from "@/map_modules/survey/components/building/BuildingExtraInfo.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {CodingTableRecord, TaskbarInfo, TaskbarInfoFeatures} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import {addStairCaseInterface} from "@/api/survey/SD.Models/addStaircase.sd";
import {BuildingResultTableNextPageFuncRes} from "@/map_modules/survey/components/building/buildingProgressRef";
import * as turf from "@turf/turf";
import {all} from "axios";
import {OpenLayerAction} from "@/store/openLayer/actions";
import {SurveyAction} from "@/store/survey/actions";


export default defineComponent({
    name: "StaircaseComponent",

    components: {SimpleDialog, BuildingExtraInfo},


    props: {
        step: {
            type: Number,
            required: true
        },
        selectedBuilding: {
            type: Object as PropType<SelectedBuilding | null>,
            required: true
        },
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()

        const {formatArea, featureToJson} = source_functions()
        const {getEnumsTable, addBuildingStaircase, correctFloat} = survey_functions()

        const initData = ref(false)

        const addType = ref('staircase')
        const elevator_info = ref<ElevatorInfo[]>([]) as Ref<ElevatorInfo[]>
        const staircase_info = ref<ElevatorInfo[]>([]) as Ref<ElevatorInfo[]>
        const code_floortype = ref<EnumField>()

        const editMode = ref(false)
        const editItemSelected = ref<ElevatorInfo | null>(null)
        const taskbarFeaturesShow = ref<Feature[]>([])

        function showTaskbarFeature(features:TaskbarInfoFeatures[]){
            features.map((item)=>{
                if('children' in item){
                    showTaskbarFeature(item.children)
                }else {
                    if (item.show){
                        if (item.name.includes('آسانسور')){
                            item.feature.map((f)=>{
                                const fe = f.clone()
                                fe.set('group', 3)
                                taskbarFeaturesShow.value.push(fe)
                            })

                        }
                        if (item.name.includes('پیشامدگی')){
                            item.feature.map((f)=>{
                                const fe = f.clone()
                                fe.set('group', 2)
                                taskbarFeaturesShow.value.push(fe)
                            })

                        }
                        if (item.name.includes('راه پله')){
                            item.feature.map((f)=>{
                                const fe = f.clone()
                                fe.set('group', 4)
                                taskbarFeaturesShow.value.push(fe)
                            })

                        }
                        if (item.name.includes('ساختمان')){
                            item.feature.map((f)=>{
                                const fe = f.clone()
                                fe.set('group', 1)
                                taskbarFeaturesShow.value.push(fe)
                            })

                        }
                        if (item.name.includes('عرصه')){
                            item.feature.map((f)=>{
                                const fe = f.clone()
                                fe.set('group', 5)
                                taskbarFeaturesShow.value.push(fe)
                            })

                        }
                    }
                }
            })

        }

        async function showFeatures() {
            if (props.selectedBuilding && props.selectedBuilding.feature) {
                // const buildingFeature = props.selectedBuilding.feature.clone()
                // buildingFeature.set('group', 1)
                // const progress_features = []
                // if (props.selectedBuilding.progressInfo) {
                //     props.selectedBuilding.progressInfo.map((progress) => {
                //         if (progress.feature) {
                //             const f = progress.feature.clone()
                //             f.set('group', 2)
                //             progress_features.push(f)
                //         }
                //     })
                // }


                const elevator_features = []
                if (elevator_info.value) {
                    elevator_info.value.map((elevator) => {
                        if (elevator.feature) {
                            const f = elevator.feature.clone()
                            f.set('group', 3)
                            elevator_features.push(f)
                        }
                    })
                }

                const staircase_features = []
                if (staircase_info.value) {
                    staircase_info.value.map((staircase) => {
                        if (staircase.feature) {
                            const f = staircase.feature.clone()
                            f.set('group', 4)
                            staircase_features.push(f)
                        }
                    })
                }
                await store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
                await store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, store.getters.getArseInfo)

                store.commit(SurveyMutations.SET_SHOW_FEATURES, [...staircase_features, ...elevator_features])

                // store.commit(SurveyMutations.SET_SHOW_FEATURES, [buildingFeature, ...progress_features, ...staircase_features, ...elevator_features])
            }
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


                })
            )

        }

        function checkOverlapFeatures(feature: Feature) {
            if (props.selectedBuilding) {
                const feature_obj = featureToJson(feature, true)

                let error = false

                if (props.selectedBuilding.feature) {
                    const buildingFeature = featureToJson(props.selectedBuilding.feature, true)
                    const res = turf.booleanDisjoint(buildingFeature, feature_obj)
                    if (res) {
                        error = true
                        toast.add({
                            group: 'br',
                            life: 5000,
                            severity: 'error',
                            summary: ' خطا',
                            detail: 'ترسیم باید در ساختمان باشد'
                        });
                    }
                }

                return error

            }
        }

        watch(() => store.getters.getDrawFeature, async (value: Feature | null) => {
            if (value && props.step === 4 && props.selectedBuilding && props.selectedBuilding.building_floor) {

                if (editMode.value && editItemSelected.value) {
                    if (!checkOverlapFeatures(value)) {
                        editItemSelected.value.feature = value
                        editMode.value = false
                        editItemSelected.value = null
                    }

                } else {
                    const floors = props.selectedBuilding.building_floor.map((floor) => {
                        return {
                            floor: floor.floor_type,
                            value: true
                        }
                    })
                    const geo = value.getGeometry()
                    let area = 0
                    if (geo) {
                        area = formatArea(geo)
                    }


                    if (!checkOverlapFeatures(value)) {
                        if (addType.value === 'staircase') {
                            staircase_info.value.push({
                                feature: value,
                                area: area,
                                floors: floors
                            })
                        } else {
                            elevator_info.value.push({
                                feature: value,
                                area: area,
                                floors: floors
                            })
                        }
                    }


                }


                await showFeatures()

                await router.push({name: 'showBuildingFeature'})


            }
        })


        onBeforeUpdate(() => {
            console.log(props.selectedBuilding, 'selectedBuilding in staircase')
        })

        onMounted(async () => {
            store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
            await setCodingFieldsName()
            if (props.selectedBuilding && props.selectedBuilding.elevator_info) {
                elevator_info.value = props.selectedBuilding.elevator_info
            }
            if (props.selectedBuilding && props.selectedBuilding.staircase_info) {
                staircase_info.value = props.selectedBuilding.staircase_info
            }
            showFeatures()

            await router.push({name: 'showBuildingFeature'})
            initData.value = true

        })

        return {
            editItemSelected, editMode,
            store,
            correctFloat,
            toast,
            router,
            addType,
            staircase_info,
            elevator_info,
            showFeatures,
            code_floortype,
            featureToJson,
            addBuildingStaircase, initData
        }
    },

    data() {
        return {
            headers: [
                'شماره', 'مساحت', 'عملیات'
            ],
            items: [
                {title: 'ترسیم آسانسور', value: 'elevator'},
                {title: 'ترسیم راه پله', value: 'staircase'},

            ],

            dialog: false,
            activeFloorConfig: null as ElevatorInfo | null

        }
    },

    methods: {
        async addDraw(type: string) {
            this.addType = type
            this.store.commit(SurveyMutations.SET_ACTIVE_DRAW, true)

            this.showFeatures()
            await this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
            await this.router.push({name: 'drawBuildingFeature', params: {layer: 0}})


        },
        deleteBtn(value: ElevatorInfo[], index: number) {

            this.store.commit('setConfirmDialog', {
                massage: 'آیا حذف مورد تایید است ؟',
                topic: 'اخطار',
                active: true,
                accept: async () => {
                    value.splice(index, 1)
                    this.showFeatures()
                },
                reject: () => {
                    console.log('reject')
                },

            })


        },
        showFloorConfigDialog(value: ElevatorInfo[], index) {
            this.activeFloorConfig = value[index]
            this.dialog = true
        },

        async nextPageFunc(): BuildingResultTableNextPageFuncRes {
            const selectedBuilding_clone = {
                ...this.selectedBuilding,
                elevator_info: this.elevator_info,
                staircase_info: this.staircase_info
            }

            if (this.selectedBuilding && this.selectedBuilding.id) {
                const data: addStairCaseInterface = {elevator_info: [], staircase_info: []}
                this.elevator_info.map((item) => {
                    data.elevator_info.push({
                        geometry: item.feature ? {geoJson: this.featureToJson(item.feature, true)} : null,
                        ...item
                    })
                })
                this.staircase_info.map((item) => {
                    data.staircase_info.push({
                        geometry: item.feature ? {geoJson: this.featureToJson(item.feature, true)} : null,
                        ...item
                    })
                })

                //----------//
                let error = false
                let all_area = 0
                data.staircase_info.map((item) => {
                    all_area = all_area + item.area

                })
                data.elevator_info.map((item) => {
                    all_area = all_area + item.area

                })
                if (this.selectedBuilding && this.selectedBuilding.extra_info) {
                    if (all_area > this.selectedBuilding.extra_info.roof_area) {
                        error = true
                    }
                }
                if (error) {
                    return {
                        error: 'مساحت های ترسیم بیش از حد مجاز است',
                        result: null
                    }
                }
                //----------//

                const res = await this.addBuildingStaircase(data, this.selectedBuilding.id)
                if (res) {
                    return {
                        error: null,
                        result: selectedBuilding_clone
                    }
                }
            }


            return {
                error: 'خطا در ویرایش اطلاعات راه پله و آسانسور',
                result: null
            }


        },

        async editFeature(item: ElevatorInfo) {
            console.log(item, 'editItem')

            // const index = this.selectedBuilding[0]
            if (item.feature) {
                const feature = item.feature.clone()
                feature.set('active', true)

                await this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [feature])

            }
            this.editMode = true
            this.editItemSelected = item


            this.store.commit(SurveyMutations.SET_ACTIVE_DRAW, true)
            await this.router.push({name: 'drawBuildingFeature', params: {layer: 0}})
        }

    },


    watch: {},


});
</script>


<style scoped>
.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > td {
    font-size: 10px !important;
}

.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
    padding: 3px 8px !important;
}

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > td,
.v-table--density-compact > .v-table__wrapper > table > thead > tr > td,
.v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
    height: 21px !important;
}

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > th, .v-table--density-compact > .v-table__wrapper > table > thead > tr > th, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > th {
    /* height: calc(var(--v-table-header-height) - 16px); */
    height: 20px !important;
    font-size: 13px !important;
    color: #0461be !important;
}

</style>
