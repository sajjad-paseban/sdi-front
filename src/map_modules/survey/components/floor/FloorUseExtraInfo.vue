<template>
    <div style="height:100%;width:100%" class="pa-2 bg-grey-lighten-2 myForm">


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
                    <v-form v-if="initData" style="width: 100%;height:100%;overflow-y: auto" class="myForm">
                        <v-row class="ma-0 pa-0">

                            <v-col cols="12" md="4" class="rounded-lg">

                                <p class="text-grey-darken-3" style="font-size: 9px">
                                    {{ ' تاریخ  ساخت' }}</p>
                                <date-picker v-model="selectedExtraInfoItem_clone.finish_year" format="YYYY-MM-DD"
                                             display-format="jYYYY-jMM-jDD"
                                             editable
                                             color="rgb(var(--v-theme-info))"
                                             placeholder=" تاریخ  ساخت"></date-picker>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_stagebuilding"
                                        :items="code_stagebuilding.items"
                                        density="compact"
                                        v-model="selectedExtraInfoItem_clone.stage_building"
                                        item-value="pk"
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
                                        v-if="code_groupbuilding"
                                        :items="code_groupbuilding.items"
                                        density="compact"
                                        v-model="selectedExtraInfoItem_clone.group_building"
                                        item-value="pk"
                                        variant="solo"

                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                        <p class="">{{code_groupbuilding.pName}}</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-autocomplete
                                        v-if="code_buildingtype"
                                        :items="code_buildingtype.items"
                                        density="compact"
                                        v-model="selectedExtraInfoItem_clone.building_type"
                                        item-value="pk"
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
                                <v-checkbox label="موثر در تعداد واحد" color="info"
                                            v-model="selectedExtraInfoItem_clone.effective_in_units_number"
                                            class="font-weight-bold"></v-checkbox>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-checkbox label="اشتراکی " color="info"
                                            v-model="selectedExtraInfoItem_clone.sharing"
                                            class="font-weight-bold"></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-fade-transition>



            </v-col>

        </v-row>

        <v-row class="ma-0 pa-0" justify="end">
            <v-btn @click="saveInfo"  color="info" class="font-weight-bold ml-2" style="font-size: 10px" size="small"
                    append-icon="mdi-content-save">ذخیره
            </v-btn>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, watch, ref, computed} from "vue";
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {useRouter} from "vue-router";
    import rules from "@/componentFunctions/rules_functions";
    import {DarbInfo, EnumField, FloorInfo, floorUsage, ParkingAndStoreAndCommons} from "@/models/Survey.interface";
    import survey_functions from "@/componentFunctions/survey_functions";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import {CodingTableRecord} from "@/store/survey/types";
    import {PropType} from "vue/dist/vue";


    export default defineComponent({
        name: "FloorExtraInfoComponent",

        components: {},

        emits:['close'],
        props: {
            selectedExtraInfoItem: {
                type: Object as PropType<floorUsage>,
                required: true
            },
        },

        setup(props) {
            const store = useStore();
            const toast = useToast()
            const router = useRouter()

            const {nameRule, floatRule, phoneRule} = rules()
            const {getEnumsTable} = survey_functions()

            const selectedExtraInfoItem_clone = ref<floorUsage>({...props.selectedExtraInfoItem})
            const initData = ref(false)
            const code_stagebuilding = ref<EnumField>()
            const code_groupbuilding = ref<EnumField>()
            const code_buildingtype = ref<EnumField>()

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
                        if (item.title === 'code_groupbuilding') {
                            const items = await getEnumsTable({name: item.title})
                            code_groupbuilding.value = {
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
                    })
                )

            }

            onMounted(async () => {
                await setCodingFieldsName()
                initData.value = true
            })


            return {
                selectedExtraInfoItem_clone,
                store, toast, router, nameRule, floatRule,initData,code_stagebuilding,code_groupbuilding,code_buildingtype
            }
        },

        data: function () {
            return {



            }
        },

        methods: {


            saveInfo(){
                this.$emit('close',this.selectedExtraInfoItem_clone)
            }
        },


        watch: {},


    });
</script>


<style scoped>

</style>
