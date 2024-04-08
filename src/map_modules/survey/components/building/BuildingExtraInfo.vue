<template>
    <div style="height:100%;width:100% " class="pa-2 bg-grey-lighten-2">
        <v-row class="pa-0 pa-2 ma-0" style="height:calc(100% - 30px)" justify="center" align="center">
            <v-col cols="12"  id="table" style="height:100%" class="rounded-lg elevation-3 pa-2 bg-white">
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
                    <v-form v-if="initData&&selectBuilding_clone" style="width: 100%;height:100%;overflow-y: auto" class="myForm">
                        <v-row class="ma-0 pa-0">

                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_stagebuilding"
                                        :items="code_stagebuilding.items"
                                        v-model="selectBuilding_clone.extra_info.stage_building"
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
                                        <p class="">{{code_stagebuilding.pName}}</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_buildingviewtype"
                                        :items="code_buildingviewtype.items"
                                        v-model="selectBuilding_clone.extra_info.view_type"
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
                                        <p class="">{{code_buildingviewtype.pName}}</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_buildingtype"
                                        :items="code_buildingtype.items"
                                        v-model="selectBuilding_clone.extra_info.building_type"
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
                                        <p class="">{{code_buildingtype.pName}}</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_historicalstatus"
                                        :items="code_historicalstatus.items"
                                        v-model="selectBuilding_clone.extra_info.historical_status"
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
                                        <p class="">{{code_historicalstatus.pName}}</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_ceilingcover"
                                        :items="code_ceilingcover.items"
                                        v-model="selectBuilding_clone.extra_info.ceiling_cover"
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
                                        <p class="">{{code_ceilingcover.pName}}</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>


                            <v-col cols="12" sm="4">
                                <v-text-field
                                        density="compact"
                                        :rules="floatRule"
                                        variant="solo"
                                        v-model="selectBuilding_clone.extra_info.finish_year"

                                        type="number"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-numeric"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">سال اتمام</p>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>


                        <v-row class="ma-0 pa-0">
                            <v-col cols="12">
                                <v-textarea
                                        dir="rtl"
                                        no-resize
                                        class="font-weight-bold"
                                        rows="5"
                                        background-color="light-blue"
                                        color="black"
                                        hint=""
                                        persistent-hint
                                        label="توضیحات تکمیلی"
                                        v-model="selectBuilding_clone.extra_info.explanation"
                                        variant="solo"
                                >
                                </v-textarea
                                >
                            </v-col>
                        </v-row>
                    </v-form>
                </v-fade-transition>



            </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" justify="end">
            <v-btn  color="info" class="font-weight-bold ml-2" style="font-size: 10px" size="small"
                   append-icon="mdi-content-save" @click="$emit('saveExtraInfo',selectBuilding_clone)">ذخیره
            </v-btn>
        </v-row>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";

    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {default as map} from "ol/Map";
    import rules from "@/componentFunctions/rules_functions";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
import {DarbInfo, EnumField, SelectedBuilding} from "@/models/Survey.interface";
    import survey_functions from "@/componentFunctions/survey_functions";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import {CodingTableRecord} from "@/store/survey/types";



    export default defineComponent({
        name: "BuildingExtraInfoComponent",

        components:{
            SimpleDialog
        },

        props:{
            selectedBuilding: {
                type: Object as PropType<SelectedBuilding | null>,
                required: true
            }
        },

        emits:['saveExtraInfo'],
        setup(props){
            const store = useStore();
            const toast = useToast()
            const {nameRule, floatRule, phoneRule} = rules()
            const {getEnumsTable} = survey_functions()


            const initData = ref(false)
            const code_stagebuilding = ref<EnumField>()
            const code_buildingviewtype = ref<EnumField>()
            const code_buildingtype = ref<EnumField>()
            const code_historicalstatus = ref<EnumField>()
            const code_ceilingcover = ref<EnumField>()

            const selectBuilding_clone = ref<SelectedBuilding>()


            async function setCodingFieldsName() {
                const coding: CodingTableRecord[] = store.getters.getSurveyCoding
                await Promise.all(
                    coding.map(async (item) => {
                        if (item.title === 'code_stagebuilding') {
                            const items = await getEnumsTable({name: item.title})
                            code_stagebuilding.value = {
                                pName: item.alias,
                                items: items
                            }
                        }
                        if (item.title === 'code_buildingviewtype') {
                            const items = await getEnumsTable({name: item.title})
                            code_buildingviewtype.value = {
                                pName: item.alias,
                                items: items
                            }
                        }
                        if (item.title === 'code_buildingtype') {
                            const items = await getEnumsTable({name: item.title})
                            code_buildingtype.value = {
                                pName: item.alias,
                                items: items
                            }
                        }
                        if (item.title === 'code_historicalstatus') {
                            const items = await getEnumsTable({name: item.title})
                            code_historicalstatus.value = {
                                pName: item.alias,
                                items: items
                            }
                        }
                        if (item.title === 'code_ceilingcover') {
                            const items = await getEnumsTable({name: item.title})
                            code_ceilingcover.value = {
                                pName: item.alias,
                                items: items
                            }
                        }
                    })
                )

            }

            onMounted(async () => {
                await setCodingFieldsName()
                if (props.selectedBuilding){
                    selectBuilding_clone.value = {...props.selectedBuilding}
                }
                initData.value = true
            })


            return{
                store,toast,nameRule, floatRule, phoneRule,initData,code_stagebuilding
                ,code_buildingviewtype,code_buildingtype,code_historicalstatus,code_ceilingcover,selectBuilding_clone
            }
        },

        data(){
            return{

            }
        },
        methods:{

        },

        watch:{

        },



    });
</script>


<style>

</style>
