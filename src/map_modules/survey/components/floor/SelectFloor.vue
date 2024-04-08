<template>
    <div style="height:100%;width:100%;overflow-y: auto" class="pa-2  myForm">

        <v-row class="ma-0 pa-0 my-2" justify="center">
            <v-col cols="12" sm="10" class="bg-white rounded elevation-1">
                <p style="font-size: 10px; line-height: 20px" class=" ">
                    در این قسمت برای انجام تنظیمات طبقه ، ابتدا باید ساختمان مورد نظر خود را انتخاب کنید و در مرحله بعد
                    طبقه مورد نظر خود را برای تکمیل اطلاعات آن انتخاب کنید و در نهایت دکمه مرحله بعدی را در گوشه پایین
                    سمت چپ انتخاب کنید.
                </p>
            </v-col>

        </v-row>


        <v-row class="ma-0 pa-0 mt-2" justify="center">

            <v-col cols="12" sm="10" class="bg-white rounded-lg elevation-3">

                <v-row class="ma-0 pa-0" v-if="store.getters.getArseInfo">
                    <v-col cols="12">
                        <v-autocomplete
                                :items="store.getters.getArseInfo.buildings"
                                item-title="extra_info.name"
                                item-value="id"
                                v-model="selectBuildingId"
                                density="compact"
                                variant="solo"
                                :rules="nameRule"
                                required
                        >
                            <template v-slot:prepend-inner>
                                <v-icon color="dark_blue" icon="mdi-office-building"/>
                            </template>

                            <template v-slot:label>
                                <p class="">انتخاب ساختمان </p>
                            </template>
                        </v-autocomplete>
                    </v-col>

                </v-row>


                <v-row class="ma-0 pa-0" v-if="selectedBuilding">
                    <v-col cols="12">
                        <v-list class="rounded-lg elevation-3 border">
                            <p class="font-weight-bold mr-6 text-blue-darken-3 " style="font-size:13px">انتخاب طبقه</p>

                            <v-radio-group v-model="floorSelected">

                                <v-list-item
                                        v-for="(floor,index) in selectedBuilding.building_floor"
                                        :key="floor.floor_type"

                                >
                                    <template v-slot:prepend>
                                        <v-radio color="info" :value="floor.floor_type"></v-radio>
                                    </template>

                                    <template v-slot:title>
                                        <v-autocomplete
                                                v-if="code_floortype"
                                                :items="code_floortype.items"
                                                v-model="floor.floor_type"
                                                item-value="pk"
                                                density="compact"
                                                :readonly="true"
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
                                    </template>


                                </v-list-item>
                            </v-radio-group>

                        </v-list>
                    </v-col>
                </v-row>


            </v-col>

        </v-row>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
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
import {Arse, EnumField, SelectedBuilding} from "@/models/Survey.interface";
import rules from "@/componentFunctions/rules_functions";
import Fieldset from "primevue/fieldset";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import {SurveyAction} from "@/store/survey/actions";


export default defineComponent({
    name: "SelectFloorComponent",

    components: {},


    props: {

        step: {
            type: Number,
            required: true
        },


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()

        const {getEnumsTable} = survey_functions()
        const {nameRule, floatRule, phoneRule} = rules()

        const code_floortype = ref<EnumField>()


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

        onMounted(async () => {
            await setCodingFieldsName()
        })


        return {
            store, toast, router, nameRule, code_floortype
        }
    },

    emits: ['selectFloor','selectedBuilding'],

    data() {
        return {


            selectBuildingId: null as null | number,
            selectedBuilding: null as SelectedBuilding | null,

            floorSelected: null as null|number,
        }
    },

    methods: {

        nextPageFunc() {
            return this.floorSelected
        },


    },


    watch: {
        async selectBuildingId() {
            const arseInfo: Arse | null = this.store.getters.getArseInfo
            if (arseInfo) {
                arseInfo.buildings?.map(async (building) => {
                    if (building.id === this.selectBuildingId) {
                        this.selectedBuilding = building
                        this.$emit('selectedBuilding',this.selectedBuilding)
                        await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_CODE, {
                            name: 'building',
                            code: this.selectedBuilding.extra_info.code
                        })
                    }
                })
            }
        },

        floorSelected() {
            if (this.selectedBuilding && this.selectedBuilding.building_floor&&this.floorSelected) {
                this.selectedBuilding.building_floor.map((floor) => {
                    if (floor.floor_type === this.floorSelected) {
                        this.$emit('selectFloor', floor)
                    }
                })
            }
            console.log(this.floorSelected)
        },

        selectedBuilding(){
            const arseInfo: Arse | null = this.store.getters.getArseInfo
            if (this.selectedBuilding&&arseInfo){
                const features = []
                if (this.selectedBuilding.feature){
                    const f = this.selectedBuilding.feature.clone()
                    f.set('group', 1)
                    features.push(f)
                }

                if (this.selectedBuilding.progressInfo){
                    this.selectedBuilding.progressInfo.map((progress)=>{
                        if (progress.feature) {
                            const f = progress.feature.clone()
                            f.set('group', 2)
                            features.push(f)
                        }
                    })
                }

                if (this.selectedBuilding.elevator_info){
                    this.selectedBuilding.elevator_info.map((item)=>{
                        if (item.feature) {
                            const f = item.feature.clone()
                            f.set('group', 3)
                            features.push(f)
                        }
                    })
                }

                if (this.selectedBuilding.staircase_info){
                    this.selectedBuilding.staircase_info.map((item)=>{
                        if (item.feature) {
                            const f = item.feature.clone()
                            f.set('group', 4)
                            features.push(f)
                        }
                    })
                }

                this.store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
                this.router.push({name: 'showFloorFeature'})

            }
        }
    },


});
</script>


<style scoped>

</style>
