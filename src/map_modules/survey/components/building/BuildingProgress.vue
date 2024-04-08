<template>
    <div style="height:100%;width:100%" class=" ">


        <v-row class="ma-0 pa-0 my-1 px-2" justify="center">
            <v-col cols="12" sm="12" class="bg-white rounded elevation-1">
                <p style="font-size: 10px; line-height: 20px" class=" ">
                    جهت اضافه کردن پیشامدگی به ساختمان مورد نظر ، دکمه + را انتخاب کنید
                </p>
            </v-col>

        </v-row>

        <v-row class="ma-0 pa-0" style="height:calc(100% - 50px);position: relative" justify="center" align="center">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>

            <v-slide-y-transition>
                <v-col v-if="initData&&selectedProgress&&progressFeatures.length>0" cols="12" class="rounded-lg ma-0 "
                       style="height:100%;position:relative ">
                    <v-row class="ma-0 pa-0 bg-white elevation-3 rounded-lg" style="height: 40px">
                        <div class="pa-0 ma-0 "
                             style="width:100%;overflow-x: auto;white-space: nowrap;align-items:center;display: flex">
                            <v-chip
                                    class="ma-2 border"
                                    v-for="(i,index) in progressFeatures"
                                    :key="index"
                                    :color="selectedProgress?(selectedProgress.index===index?'dark_blue':''):''"


                                    size="small"
                            >

                                <p @click="selectProgress(index)" style="cursor: pointer;margin-top:2px">پیشامدگی
                                    {{ index+1 }}</p>
                                <!--                            <v-icon color="error" @click="deleteProgress(index)" end icon="mdi-delete"></v-icon>-->
                            </v-chip>
                        </div>
                    </v-row>

                    <div class="ma-0 pa-0 elevation-2 bg-grey-lighten-4 rounded-lg mt-2"

                         style="height:calc(100% - 48px);position: absolute;overflow-y: auto;width: calc(100% - 20px);bottom:0;">
                        <v-row
                                class="ma-0 pa-0 myForm"
                                align="start"

                                style="height:calc(100% - 38px);overflow-y: auto;display: flex;align-content: flex-start;">
                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_direction"
                                        :items="code_direction.items"
                                        v-model="selectedProgress.progress.direction"
                                        item-title="title"
                                        item-value="pk"
                                        density="compact"
                                        variant="solo"
                                        class="mt-1"
                                        required
                                >

                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">جهت پیشامدگی</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        variant="solo"
                                        v-model="selectedProgress.progress.area"
                                        @update:modelValue="correctFloat(selectedProgress.progress,'area')"
                                        type="number"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">مساحت </p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4" class="pa-0 ma-0 pt-2">
                                <v-checkbox v-model="selectedProgress.progress.in_maabar" color="info"
                                            class="font-weight-bold"
                                            label="در معبر است"></v-checkbox>
                            </v-col>

                            <v-col cols="12" sm="4" class="ma-0 pa-0">
                                <v-row class="ma-0 pa-0" align="start">
                                    <v-col cols="12">
                                        <v-autocomplete
                                                v-if="code_direction"
                                                :items="code_direction.items"
                                                v-model="selectedProgress.progress.building_district_direction"
                                                item-value="pk"
                                                density="compact"

                                                variant="solo"

                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">کدام ضلع از ساختمان </p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-autocomplete
                                                v-if="code_balconytype"
                                                :items="code_balconytype.items"
                                                item-value="pk"
                                                v-model="selectedProgress.progress.balcony_type"
                                                density="compact"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">{{ code_balconytype.pName }}</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                                density="compact"
                                                v-model="selectedProgress.progress.lon"
                                                variant="solo"
                                                type="number"
                                                @update:modelValue="correctFloat(selectedProgress.progress,'lon')"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">طول</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                                density="compact"
                                                v-model="selectedProgress.progress.lat"
                                                variant="solo"
                                                type="number"
                                                @update:modelValue="correctFloat(selectedProgress.progress,'lat')"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">عرض</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col cols="12" sm="8">
                                <v-table v-if="selectedProgress.progress.floors" density="compact"
                                         style="overflow-y: auto" fixed-header height="200px"
                                         class="rounded-lg elevation-3">
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
                                            v-for="(item,index) in selectedProgress.progress.floors"
                                            :key="index"
                                    >
                                        <td class="font-weight-bold" style="width: 70%">
                                            <v-autocomplete
                                                    v-if="code_floortype"
                                                    :items="code_floortype.items"
                                                    item-value="pk"
                                                    v-model="item.floor"
                                                    @update:model-value="updateFloorsName(item.floor,index)"
                                                    density="compact"
                                                    variant="solo"

                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">{{ code_floortype.pName }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </td>
                                        <td class="font-weight-bold">
                                            <v-checkbox v-model="item.value" color="info"
                                                        class="font-weight-bold"></v-checkbox>
                                        </td>
                                    </tr>
                                    </tbody>
                                </v-table>
                            </v-col>


                        </v-row>
                        <v-row class="ma-0 pa-0 pa-2 border-t" justify="start">
                            <v-btn @click="deleteProgressFunc(selectedProgress.index)" class=" font-weight-bold"
                                   size="x-small" color="error" append-icon="mdi-delete"> حذف
                            </v-btn>
                        </v-row>
                    </div>
                </v-col>
            </v-slide-y-transition>
            <v-slide-y-transition>
                <v-row v-if="!selectedProgress&&initData" justify="center" align="center"
                       class="rounded-lg ma-0 bg-white mx-2 pt-1 elevation-3"
                       style="height:100% ">
                    <v-col cols="12">
                        <v-row class="ma-0 pa-0">
                            <v-img style="" height="100"
                                   class=""
                                   src="@/assets/gifs/location_not_found.gif"
                                   alt="John"
                            ></v-img>
                        </v-row>
                        <v-row class="ma-0 pa-0 mt-2" justify="center">
                            <p class="font-weight-bold">پیشامدگی ترسیم نشده است</p>
                        </v-row>
                    </v-col>


                </v-row>
            </v-slide-y-transition>
            <v-btn class="elevation-4" size="small" @click="drawProgress"
                   style="position: absolute;left:30px;bottom:10px" color="info" icon="mdi-plus"></v-btn>

        </v-row>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import Feature from 'ol/Feature.js';
import {OpenLayerAction} from "@/store/openLayer/actions";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {LayerItem} from "@/store/openLayer/types";
import feature_functions from "@/componentFunctions/feature_functions";
import {EnumField, ProgressInfo, SelectedBuilding} from "@/models/Survey.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import {CodingTableRecord} from "@/store/survey/types";
import {ProgressNextPageFuncRes} from "@/map_modules/survey/components/building/buildingProgressRef";
import {addProgressInterface} from "@/api/survey/SD.Models/addProgress.sd";
import * as turf from "@turf/turf";
import {SurveyAction} from "@/store/survey/actions";


export default defineComponent({
    name: "BuildingProgressComponent",

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

        const {featureToJson} = source_functions()
        const {getProgressFeatureInfo, getEnumsTable, addProgress, deleteProgress,correctFloat} = survey_functions()

        const progressFeatures = ref<ProgressInfo[]>([]) as Ref<ProgressInfo[]>
        const initData = ref(false)
        const code_balconytype = ref<EnumField>()
        const code_floortype = ref<EnumField>()
        const code_direction = ref<EnumField>()

        async function updateSelectedProgress() {

            await store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
            await store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, store.getters.getArseInfo)
            if (progressFeatures.value.length > 0) {

                const lastIndex = progressFeatures.value.length - 1
                console.log(lastIndex)
                selectedProgress.value = {
                    index: lastIndex,
                    progress: progressFeatures.value[lastIndex]
                }
            } else {
                store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
                router.push({
                    name: 'showBuildingFeature'
                })
            }
        }

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_balconytype') {
                        const items = await getEnumsTable({name: item.title})
                        code_balconytype.value = {
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

        const show = ref(false)
        const selectedProgress = ref<{
            progress: ProgressInfo,
            index: number
        } | null>(null)
        const f = ref<any>()


        function checkOverlapFeatures(feature: Feature) {
            if (props.selectedBuilding){
                const features: any[] = []
                const feature_obj = featureToJson(feature, true)

                let error = false

                if (props.selectedBuilding.feature){
                    const buildingFeature = featureToJson(props.selectedBuilding.feature, true)
                    const res = turf.booleanDisjoint(buildingFeature,feature_obj)
                    if (res){
                        error = true
                        toast.add({
                            group: 'br',
                            life: 5000,
                            severity: 'error',
                            summary: ' خطا',
                            detail: 'پیشامدگی باید در ساختمان باشد'
                        });
                    }
                }

                return error

            }
        }



        watch(() => store.getters.getDrawFeature, async (value: Feature | null) => {
            if (value && props.step === 2 && props.selectedBuilding && props.selectedBuilding.feature) {
                const data: any = featureToJson(value, true)
                const b_data: any = featureToJson(props.selectedBuilding.feature, true)
                f.value = data
                const res: ProgressInfo | undefined = await getProgressFeatureInfo({
                    geoJson: f.value,
                    b_geoJson: b_data
                })
                if (res && props.selectedBuilding) {
                    const floors: any[] = []
                    if (props.selectedBuilding.building_floor){
                        props.selectedBuilding.building_floor.map((floor)=>{
                            floors.push({
                                floor: floor.floor_type,
                                value: true
                            })
                        })
                    }else {
                        let firstIndex = 0
                        code_floortype.value?.items.map((item,index)=>{
                            if (item.title==="نيم طبقه همکف"){
                                firstIndex = index+1
                            }
                        })
                        const floors_num:any =props.selectedBuilding.extra_info.floors_num
                        for (let i = 1; i < (parseInt(floors_num)+1); i++) {
                            floors.push({
                                floor: i+firstIndex,
                                value: true
                            })
                        }
                    }


                    if (!checkOverlapFeatures(value)){
                        progressFeatures.value.push({
                            feature: value,
                            floors: floors,
                            balcony_type: 1,
                            ...res
                        })


                    }
                    await updateSelectedProgress()

                }


                console.log(progressFeatures, 'progress add')
            }
        })

        watch(() => props.selectedBuilding?.extra_info.floors_num, (floors: number) => {
            const floors_value: any[] = []
            for (let i = 0; i < floors; i++) {
                floors_value.push({
                    floor: i,
                    value: true
                })
            }
            progressFeatures.value.map((progress) => {
                progress.floors = floors_value
            })
        })

        onMounted(async () => {
            await setCodingFieldsName()
            console.log(props.selectedBuilding,'select building')
            if (props.selectedBuilding&&props.selectedBuilding.progressInfo){
                progressFeatures.value = props.selectedBuilding.progressInfo
                if (props.selectedBuilding.progressInfo.length>0){
                    selectedProgress.value = {
                        progress:props.selectedBuilding.progressInfo[0],
                        index:0
                    }
                }
                console.log(progressFeatures.value,'progressFeatures')
            }

            initData.value = true
        })

        return {
            correctFloat,
            store,
            toast,
            router,
            show,
            f, deleteProgress,
            getProgressFeatureInfo,
            progressFeatures,
            selectedProgress,
            updateSelectedProgress,
            featureToJson, addProgress,
            code_balconytype, initData, code_floortype, code_direction
        }
    },

    data() {
        return {
            headers: [
                'طبقه', 'پیشامدگی'
            ],
        }
    },
    emits: ['selectBuilding'],
    methods: {
        async drawProgress() {
            await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
            await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, this.store.getters.getArseInfo)
            this.store.commit(SurveyMutations.SET_ACTIVE_DRAW, true)
            if (this.selectedBuilding && this.selectedBuilding.feature) {
                const buildingFeature = this.selectedBuilding.feature.clone()
                buildingFeature.set('group', 1)
                const progress_features = []
                this.progressFeatures.map((progress) => {
                    if (progress.feature) {
                        const f = progress.feature.clone()
                        f.set('group', 2)
                        progress_features.push(f)
                    }
                })
                await this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
                this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [...progress_features])
                await this.router.push({name: 'drawBuildingFeature', params: {layer: 0}})
            }

        },

        async deleteProgressFunc(index: number) {

            this.store.commit('setConfirmDialog', {
                massage: 'آیا حذف مورد تایید است ؟',
                topic: 'اخطار',
                active: true,
                accept: async () => {
                    let has_error = false

                    if (this.progressFeatures[index].id) {
                        const res = await this.deleteProgress(this.progressFeatures[index].id)
                        if (!res) {
                            has_error = true
                        }
                    }

                    if (!has_error) {
                        this.progressFeatures.splice(index, 1)
                        this.selectedProgress = null
                        await this.updateSelectedProgress()

                    }
                },
                reject: () => {
                    console.log('reject')
                },

            })


        },
        selectProgress(index: number) {
            this.selectedProgress = {
                progress: this.progressFeatures[index],
                index: index
            }
        },

        updateFloorsName(value: number, index: number) {
            this.progressFeatures.map((progress) => {
                if (progress.floors) {
                    progress.floors[index].floor = value
                }
            })

            if (this.selectedBuilding&&this.selectedBuilding.building_floor&&this.selectedBuilding.building_floor.length>0){
                this.selectedBuilding.building_floor[index].floor_type = value
            }

            console.log(this.progressFeatures,this.selectedBuilding)
        },

        async nextPageFunc(): ProgressNextPageFuncRes {

            if (this.selectedBuilding && this.selectedBuilding.id) {
                const data: addProgressInterface = {
                    progress: [],
                    building: this.selectedBuilding.id
                }
                this.progressFeatures.map((progress) => {
                    data.progress.push({
                        geometry: progress.feature ? {geoJson: this.featureToJson(progress.feature, true)} : null,
                        ...progress
                    })
                })

                let  error =false
                data.progress.map((progress)=>{
                    if (this.selectedBuilding&&this.selectedBuilding.extra_info){
                        if (progress.area>this.selectedBuilding.extra_info.roof_area){
                            error=true
                        }
                    }
                })
                if (error){
                    return {
                        result: null,
                        error: 'مقدار مساحت پیشامدگی صحیح نیست'
                    }
                }

                const res = await this.addProgress(data)
                if (res.result && res.text.length == 0) {
                    this.progressFeatures.map((progress, index) => {
                        progress.id = res.result.progress[index].id
                    })

                    return {
                        result: this.progressFeatures,
                        error: null
                    }
                }

                return {
                    error: 'خطا در ذخیره پیشامدگی ها',
                    result: null
                }

            } else {
                return {
                    error: 'اطلاعات ساختمان وجود ندارد',
                    result: null
                }
            }


        }
    },


    watch: {
        async selectedProgress() {
            await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
            await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, this.store.getters.getArseInfo)
            if (this.selectedProgress && this.selectedProgress.progress.feature && this.selectedBuilding && this.selectedBuilding.feature) {
                const select_feature = this.selectedProgress.progress.feature.clone()
                select_feature.set('active', true)
                const buildingFeature = this.selectedBuilding.feature.clone()
                buildingFeature.set('group', 1)
                const progress_features = []
                this.progressFeatures.map((progress) => {
                    if (progress.feature) {
                        const f = progress.feature.clone()
                        f.set('group', 2)
                        progress_features.push(f)
                    }
                })

                await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [...progress_features, select_feature])
                await this.router.push({
                    name: 'showBuildingFeature'
                })
            } else {
                if (this.selectedBuilding && this.selectedBuilding.feature) {
                    const buildingFeature = this.selectedBuilding.feature.clone()
                    buildingFeature.set('group', 1)
                    await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [buildingFeature])
                } else {
                    await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
                }

            }


        },

        async selectedBuilding() {

            this.progressFeatures = []
            this.selectedProgress = null

            if (!this.selectedBuilding) {
                this.progressFeatures = []
                this.selectedProgress = null
            }
        },

    },

    mounted(): void {
        setTimeout(() => {
            this.show = true
        }, 500)
    }


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
