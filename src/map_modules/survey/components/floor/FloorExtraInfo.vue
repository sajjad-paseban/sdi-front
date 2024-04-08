<template>
    <div style="height:100%;width:100%" class="pa-2  myForm">


        <v-row class="ma-0 pa-0 " justify="center" style="height: 100%">

            <v-col cols="12" sm="10" class="bg-white rounded-lg elevation-3 myForm py-2"
                   style="height:100%;overflow-y: auto">

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
                    <v-form ref="FloorExtraFormRef" v-if="initData" style="height:100%;width:100%" class="myForm">
                        <v-row class="ma-0 pa-0" v-if="floor_clone">
                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_floortype"
                                        :items="code_floortype.items"
                                        item-value="pk"
                                        density="compact"
                                        v-model="floor_clone.floor_type"
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
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        v-model="floor_clone.floor_height"
                                        variant="solo"
                                        type="number"
                                        required
                                        @update:modelValue="correctFloat(floor_clone,'floor_height')"
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-human-male-height-variant"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">ارتفاع سقف طبقه</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        v-model="floor_clone.progress_percent"
                                        :rules="numberPercent"
                                        variant="solo"
                                        type="number"
                                        @update:modelValue="correctFloat(floor_clone,'progress_percent')"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-percent"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> درصد پیشرفت</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        v-model="floor_clone.destruction_area"
                                        variant="solo"
                                        :rules="floatRule"
                                        @update:modelValue="correctFloat(floor_clone,'destruction_area')"
                                        type="number"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-ruler"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">متراژ تخریبی</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        v-model="floor_clone.area"
                                        variant="solo"
                                        type="number"
                                        @update:modelValue="correctFloat(floor_clone,'area')"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-ruler"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">مساحت طبقه</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        v-model="floor_clone.progress_area"
                                        variant="solo"
                                        type="number"
                                        @update:modelValue="correctFloat(floor_clone,'progress_area')"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-ruler"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">مجموع مساحت پیشامدگی</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        v-model="floor_clone.finish_year"
                                        variant="solo"
                                        :rules="floatRule"
                                        type="number"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-office-building"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class=""> سال ساخت</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <!--                            <v-col cols="12" sm="4">-->
                            <!--                                <v-checkbox  label=" تخریبی" color="info"-->
                            <!--                                            class="font-weight-bold"></v-checkbox>-->
                            <!--                            </v-col>-->
                        </v-row>
                    </v-form>
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
import rules from "@/componentFunctions/rules_functions";
import {DarbInfo, EnumField, FloorInfo, ParkingAndStoreAndCommons, SelectedBuilding} from "@/models/Survey.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {CodingTableRecord} from "@/store/survey/types";
import {FloorNextPageFuncRes} from "@/map_modules/survey/components/floor/FloorInfoRef";
import VForm from "@/models/VForm.interface";


export default defineComponent({
    name: "FloorExtraInfoComponent",

    components: {},


    props: {

        step: {
            type: Number,
            required: true
        },
        selectedFloor: {
            type: Object as PropType<FloorInfo | null>,
            required: true
        },

        selectedBuilding: {
            type: Object as PropType<SelectedBuilding>,
            required: true
        },

    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()

        const {nameRule, floatRule, phoneRule, numberPercent} = rules()
        const {getEnumsTable, addFloorInfo, correctFloat} = survey_functions()
        const FloorExtraFormRef = ref<VForm>()


        const initData = ref(false)
        const code_floortype = ref<EnumField>()

        const floor_clone = ref<FloorInfo>()


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
            if (props.selectedFloor) {
                floor_clone.value = {...props.selectedFloor}
                console.log(floor_clone.value, 'floor_clone')
            }
            await setCodingFieldsName()
            initData.value = true
        })

        return {
            numberPercent,
            store,
            toast,
            router,
            nameRule,
            floatRule,
            code_floortype,
            initData,
            floor_clone,
            FloorExtraFormRef,
            addFloorInfo, correctFloat
        }
    },

    data: function () {
        return {}
    },

    methods: {


        async nextPageFunc(): FloorNextPageFuncRes {

            if (this.FloorExtraFormRef && this.floor_clone && this.floor_clone.id) {
                const res = await this.FloorExtraFormRef.validate()
                if (res.valid) {

                    //----------//
                    if (this.selectedBuilding.extra_info && this.selectedBuilding.extra_info.roof_area < this.floor_clone.area) {
                        return {
                            error: 'مساحت طبقه بیش از حد مجار است',
                            result: null
                        }
                    }
                    if (this.selectedBuilding.extra_info && this.selectedBuilding.extra_info.roof_area < this.floor_clone.destruction_area) {
                        return {
                            error: 'مساحت تخریبی بیش از حد مجار است',
                            result: null
                        }
                    }
                    if (this.selectedBuilding.extra_info && this.selectedBuilding.extra_info.roof_area < this.floor_clone.progress_area) {
                        return {
                            error: 'مساحت پیشامدگی بیش از حد مجار است',
                            result: null
                        }
                    }
                    //----------//

                    const res = await this.addFloorInfo(this.floor_clone, this.floor_clone.id)
                    if (res) {
                        return {
                            error: null,
                            result: this.floor_clone
                        }
                    }

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


<style scoped>

</style>
