<template>
    <div style="height:100%;width:100%" class="pa-2">
        <v-row class="pa-0 ma-0 rounded-lg" style="height:100%;position: relative" justify="center" align="center">
            <v-col cols="12" sm="10" style="height:100%;position: absolute;overflow-y: auto"
                   class="rounded-lg elevation-3 pa-4 bg-grey-lighten-4">

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
                    <v-row v-if="initData&&arse_clone" class="ma-0 pa-0 myForm rounded-lg" style="height:100%;"
                           align="start"
                           justify="center">
                        <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold" multiple>

                            <v-expansion-panel
                                    class="rounded-lg border bg-white"
                                    :title="'نوع استفاده ملک'"
                            >
                                <template v-slot:text>
                                    <div style="width:100% " class="rounded-lg ">
                                        <v-row class="ma-0 pa-0" justify="start">
                                            <v-btn @click="addUseTypeItem" color="info" class="font-weight-bold rounded"
                                                   style="font-size: 9px" size="x-small"
                                                   prepend-icon="mdi-plus">اضافه کردن نوع استفاده
                                            </v-btn>
                                        </v-row>
                                        <v-row class="pa-0 ma-0 pt-2" style="height:calc(100% - 60px)" justify="center"
                                               align="start">
                                            <v-form class="myForm py-2 pl-2"
                                                    style="height: 100%;width: 100%;overflow-y: auto">
                                                <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                                                    <v-expansion-panel
                                                            class="rounded-lg border bg-white"
                                                            v-for="(item,index) in arse_clone.arse_using"
                                                            :key="index"
                                                            :title="`استفاده شماره ${index+1}`"
                                                    >
                                                        <template v-slot:text>
                                                            <v-row class="ma-0 pa-0">
                                                                <v-col cols="12" sm="6">
                                                                    <v-autocomplete
                                                                            v-if="code_masterusing"
                                                                            :items="code_masterusing.items"
                                                                            density="compact"
                                                                            item-value="pk"
                                                                            variant="solo"
                                                                            v-model="item.main_use"
                                                                            required
                                                                    >
                                                                        <template v-slot:prepend-inner>
                                                                            <v-icon color="dark_blue"
                                                                                    icon="mdi-sitemap"/>
                                                                        </template>

                                                                        <template v-slot:label>
                                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                            <p class="">{{ code_masterusing.pName }}</p>
                                                                        </template>
                                                                    </v-autocomplete>
                                                                </v-col>

                                                                <v-col cols="12" sm="6">
                                                                    <v-text-field
                                                                            density="compact"
                                                                            :rules="floatRule"
                                                                            variant="solo"
                                                                            type="number"
                                                                            v-model="item.area"
                                                                            @update:modelValue="correctFloat(item,'area')"
                                                                            required
                                                                    >
                                                                        <template v-slot:prepend-inner>
                                                                            <v-icon color="dark_blue"
                                                                                    icon="mdi-format-color-text"/>
                                                                        </template>

                                                                        <template v-slot:label>
                                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                            <p class="">مساحت</p>
                                                                        </template>
                                                                    </v-text-field>
                                                                </v-col>


                                                            </v-row>
                                                            <v-row class="ma-0 pa-0" justify="end">
                                                                <v-btn @click="deleteUseTypeItem(index)" color="error"
                                                                       class="font-weight-bold"
                                                                       style="font-size: 9px" size="x-small"
                                                                       append-icon="mdi-delete">حذف
                                                                </v-btn>
                                                            </v-row>
                                                        </template>
                                                    </v-expansion-panel>
                                                </v-expansion-panels>
                                            </v-form>

                                        </v-row>


                                    </div>
                                </template>
                            </v-expansion-panel>
                            <v-expansion-panel
                                    class="rounded-lg border bg-white"
                                    :title="'حیاط'"
                            >
                                <template v-slot:text>
                                    <v-row class="ma-0 pa-0" v-if="arse_clone.arse_yard">
                                        <v-col cols="12" sm="4">
                                            <v-autocomplete
                                                    v-if="code_watersource"
                                                    :items="code_watersource.items"
                                                    item-value="pk"
                                                    v-model="arse_clone.arse_yard.water_supply_source"
                                                    density="compact"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">{{ code_watersource.pName }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" sm="4">
                                            <v-autocomplete
                                                    v-if="code_wateringtype"
                                                    :items="code_wateringtype.items"
                                                    item-value="pk"
                                                    v-model="arse_clone.arse_yard.watering_type"
                                                    density="compact"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">{{ code_wateringtype.pName }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" sm="4">
                                            <v-text-field
                                                    density="compact"
                                                    :rules="floatRule"
                                                    v-model="arse_clone.arse_yard.well_number"
                                                    variant="solo"
                                                    type="number"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">تعداد چاه</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" sm="4">
                                            <v-autocomplete
                                                    v-if="code_welltype"
                                                    :items="code_welltype.items"
                                                    v-model="arse_clone.arse_yard.well_type"
                                                    density="compact"
                                                    item-value="pk"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">{{ code_welltype.pName }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" sm="4">
                                            <v-text-field
                                                    density="compact"
                                                    :rules="floatRule"
                                                    v-model="arse_clone.arse_yard.garden_area"
                                                    variant="solo"
                                                    type="number"
                                                    @update:modelValue="correctFloat(arse_clone.arse_yard,'garden_area')"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">مساحت فضای سبز</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="6" sm="4">
                                            <v-btn color="info" class="font-weight-bold mt-1" style="font-size: 10px"
                                                   @click="drawGarden" size="small"
                                                   append-icon="mdi-pine-tree">ترسیم فضای سبز
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="6" sm="4">
                                            <v-btn color="info" class="font-weight-bold mt-1 ml-1"
                                                   style="font-size: 10px"
                                                   @click="dialog=true" size="small"
                                                   append-icon="mdi-pine-tree">درختان
                                            </v-btn>

                                        </v-col>

                                    </v-row>
                                </template>
                            </v-expansion-panel>
                            <v-expansion-panel
                                    class="rounded-lg border bg-white"
                                    :title="'پارکینگ'"
                            >
                                <template v-slot:text>
                                    <v-row class="ma-0 pa-0">


                                        <v-col cols="12" sm="4">
                                            <v-text-field
                                                    v-if="arse_clone.arse_parking"
                                                    density="compact"
                                                    :rules="floatRule"
                                                    v-model="arse_clone.arse_parking.area"
                                                    variant="solo"
                                                    type="number"
                                                    @update:modelValue="correctFloat(arse_clone.arse_parking,'area')"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">مساحت</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>


                                    </v-row>
                                </template>
                            </v-expansion-panel>
                            <v-expansion-panel
                                    class="rounded-lg border bg-white"
                                    :title="'اطلاعات محدوده'"
                            >
                                <template v-slot:text>
                                    <div style="width:100% " class="rounded-lg ">
                                        <v-row class="ma-0 pa-0" justify="start">
                                            <v-btn @click="addMahdodeItem" color="info" class="font-weight-bold"
                                                   style="font-size: 9px" size="x-small"
                                                   prepend-icon="mdi-plus">اضافه کردن محدوده
                                            </v-btn>
                                        </v-row>
                                        <v-row class="pa-0 ma-0 pt-2" style="height:calc(100% - 60px)" justify="center"
                                               align="start">
                                            <v-form class="myForm py-2 pl-2"
                                                    style="height: 100%;width: 100%;overflow-y: auto">
                                                <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                                                    <v-expansion-panel
                                                            class="rounded-lg border bg-white"
                                                            v-for="(item,index) in arse_clone.arse_range"
                                                            :key="index"
                                                            :title="`محدوده شماره ${index+1}`"
                                                    >
                                                        <template v-slot:text>
                                                            <v-row class="ma-0 pa-0">
                                                                <v-col cols="12" sm="6">
                                                                    <v-autocomplete
                                                                            v-if="code_texturetypemastergroup"
                                                                            :items="code_texturetypemastergroup.items"
                                                                            item-value="pk"
                                                                            v-model="item.code_texture_type_master_group"
                                                                            density="compact"
                                                                            variant="solo"
                                                                            :rules="nameRule"
                                                                            required
                                                                    >
                                                                        <template v-slot:prepend-inner>
                                                                            <v-icon color="dark_blue"
                                                                                    icon="mdi-sitemap"/>
                                                                        </template>

                                                                        <template v-slot:label>
                                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                            <p class="">
                                                                                {{
                                                                                    code_texturetypemastergroup.pName
                                                                                }}</p>
                                                                        </template>
                                                                    </v-autocomplete>
                                                                </v-col>

                                                                <v-col cols="12" sm="6">
                                                                    <v-autocomplete
                                                                            v-if="item.code_texture_type_master_group&&code_texturetypeslavegroup_all"
                                                                            :items="get_slave_group(item.code_texture_type_master_group)"
                                                                            density="compact"
                                                                            item-value="pk"
                                                                            v-model="item.code_texture_type_slave_group"
                                                                            variant="solo"
                                                                            :rules="nameRule"
                                                                            required
                                                                    >
                                                                        <template v-slot:prepend-inner>
                                                                            <v-icon color="dark_blue"
                                                                                    icon="mdi-sitemap"/>
                                                                        </template>

                                                                        <template v-slot:label>
                                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                            <p class="">
                                                                                {{
                                                                                    code_texturetypeslavegroup_all.pName
                                                                                }}</p>
                                                                        </template>
                                                                    </v-autocomplete>
                                                                </v-col>

                                                                <v-col cols="12" sm="6">
                                                                    <v-text-field
                                                                            density="compact"
                                                                            :rules="floatRule"
                                                                            v-model="item.area"
                                                                            variant="solo"
                                                                            type="number"
                                                                            @update:modelValue="correctFloat(item,'area')"
                                                                            required
                                                                    >
                                                                        <template v-slot:prepend-inner>
                                                                            <v-icon color="dark_blue"
                                                                                    icon="mdi-format-color-text"/>
                                                                        </template>

                                                                        <template v-slot:label>
                                                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                                            <p class="">مساحت</p>
                                                                        </template>
                                                                    </v-text-field>
                                                                </v-col>


                                                            </v-row>
                                                            <v-row class="ma-0 pa-0" justify="end">
                                                                <v-btn @click="deleteMahdodeItem(index)" color="error"
                                                                       class="font-weight-bold"
                                                                       style="font-size: 9px" size="x-small"
                                                                       append-icon="mdi-delete">حذف
                                                                </v-btn>
                                                            </v-row>
                                                        </template>
                                                    </v-expansion-panel>
                                                </v-expansion-panels>
                                            </v-form>

                                        </v-row>


                                    </div>
                                </template>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-row>
                </v-fade-transition>


            </v-col>
        </v-row>

        <simple-dialog
                :show="dialog"
                :topic="'درختان'"
                width="50vw"
                height="60vh"
                :current_height="'80vh'"
                @closeDialog="saveTrees('close')"
                class="bg-grey-lighten-2"
        >
            <div style="height: 100%;width:100%;overflow-y: hidden">
                <div style="height:100%;width:100% " class="pa-2 bg-grey-lighten-4"
                     v-if="arse_clone&&arse_clone.arse_yard">
                    <v-row class="ma-0 pa-0" justify="start">
                        <v-btn @click="addTree" color="info" class="font-weight-bold" style="font-size: 10px"
                               size="small"
                               prepend-icon="mdi-plus">اضافه کردن درخت
                        </v-btn>
                    </v-row>
                    <v-row class="pa-0 ma-0 pt-2" style="height:calc(100% - 60px)" justify="center" align="start">
                        <v-form class="myForm py-2 pl-2" style="height: 100%;width: 100%;overflow-y: auto">
                            <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                                <v-expansion-panel
                                        class="rounded-lg border bg-white"
                                        v-for="(item,index) in arse_clone.arse_yard.yard_trees"
                                        :key="index"
                                        :title="`درخت شماره  ${index+1}`"
                                >
                                    <template v-slot:text>
                                        <v-row class="ma-0 pa-0">
                                            <v-col cols="12" sm="4">
                                                <v-autocomplete
                                                        v-if="code_treetype"
                                                        :items="code_treetype.items"
                                                        item-value="pk"
                                                        v-model="item.tree_type"
                                                        density="compact"
                                                        variant="solo"
                                                        :rules="nameRule"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">{{ code_treetype.pName }}</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>


                                            <v-col cols="12" sm="4">
                                                <v-text-field
                                                        density="compact"
                                                        :rules="floatRule"

                                                        v-model="item.tree_number"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">تعداد درخت</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <v-text-field
                                                        density="compact"
                                                        :rules="floatRule"
                                                        v-model="item.cut_down_numbers"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">تعداد درخت قطع شده</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4">
                                                <v-text-field
                                                        density="compact"
                                                        :rules="floatRule"
                                                        v-model="item.planting_year"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">سال تخمینی کاشت</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>


                                            <v-col cols="12" sm="4">
                                                <v-text-field
                                                        density="compact"
                                                        :rules="floatRule"
                                                        v-model="item.allowed_cut_down_number"
                                                        variant="solo"
                                                        type="number"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                        <p class="">تعداد درخت مجاز به قطع</p>
                                                    </template>
                                                </v-text-field>
                                            </v-col>


                                        </v-row>
                                        <v-row class="ma-0 pa-0" justify="end">
                                            <v-btn @click="deleteItem(index)" color="error" class="font-weight-bold"
                                                   style="font-size: 9px" size="x-small"
                                                   append-icon="mdi-delete">حذف
                                            </v-btn>
                                        </v-row>
                                    </template>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-form>

                    </v-row>
                    <v-row class="ma-0 pa-0" justify="end">
                        <v-btn @click="saveTrees('save')" color="info" class="font-weight-bold" style="font-size: 10px"
                               size="small"
                               append-icon="mdi-content-save">ذخیره
                        </v-btn>
                    </v-row>

                </div>

            </div>

        </simple-dialog>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, Ref, onUpdated, onBeforeUpdate, onUnmounted} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import rules from "@/componentFunctions/rules_functions";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {Arse, DarbInfo, EnumField, EnumsTableItem, ParkingAndStoreEnums, Yard} from "@/models/Survey.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import {CodingTableRecord} from "@/store/survey/types";
import {PropType} from "vue/dist/vue";
import {ArseNextPageFuncRes} from "@/map_modules/survey/components/arse/AresRef";
import {SurveyMutations} from "@/store/survey/mutations";
import {useRouter} from "vue-router";
import Feature from "ol/Feature";
import source_functions from "@/components/openLayers/componentFunctions/source";
import GeoJSONFeature from "ol/format/GeoJSON";


export default defineComponent({
    name: "ArseExtraInfoComponent",

    components: {
        SimpleDialog
    },

    props: {
        map: {
            required: true,
            type: map
        },

        arse: {
            required: true,
            type: Object as PropType<Arse>
        },


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {nameRule, floatRule, phoneRule} = rules()
        const {getEnumsTable, saveArseExtraInfo, correctFloat} = survey_functions()
        const {formatArea, featureToJson} = source_functions()

        const code_masterusing = ref<EnumField>()
        const code_watersource = ref<EnumField>()
        const code_wateringtype = ref<EnumField>()
        const code_welltype = ref<EnumField>()
        const code_treetype = ref<EnumField>()
        const code_texturetypemastergroup = ref<EnumField>()
        const code_texturetypeslavegroup_all = ref<EnumField>()


        const initData = ref(false)
        const arse_clone = ref<Arse>()
        const yard_feature = ref<Feature | null>(null) as Ref<Feature | null>

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_masterusing') {
                        const items = await getEnumsTable({name: item.title})
                        code_masterusing.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_watersource') {
                        const items = await getEnumsTable({name: item.title})
                        code_watersource.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_wateringtype') {
                        const items = await getEnumsTable({name: item.title})
                        code_wateringtype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_welltype') {
                        const items = await getEnumsTable({name: item.title})
                        code_welltype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_treetype') {
                        const items = await getEnumsTable({name: item.title})
                        code_treetype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_texturetypemastergroup') {
                        const items = await getEnumsTable({name: item.title})
                        code_texturetypemastergroup.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_texturetypeslavegroup') {
                        const items = await getEnumsTable({name: item.title})
                        code_texturetypeslavegroup_all.value = {
                            pName: item.alias,
                            items: items
                        }
                    }

                })
            )

        }

        async function showFeatures() {
            if (yard_feature.value) {
                const f = yard_feature.value?.clone()
                if (f) {
                    f.set('group', 6)

                    store.commit(SurveyMutations.SET_SHOW_FEATURES, [f])
                }

            }
        }

        onMounted(async () => {
            await setCodingFieldsName()
            arse_clone.value = props.arse

            if (props.arse.arse_yard && props.arse.arse_yard.feature) {
                yard_feature.value = props.arse.arse_yard.feature
                await showFeatures()
            }
            initData.value = true
        })

        onUnmounted(() => {
            store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
        })

      watch(() => store.getters.getCloseDrawFeature, async (value: boolean) => {
        if (value) {
          showFeatures()
          store.commit(SurveyMutations.SET_CLOSE_DRAW_FEATURE,!store.getters.getCloseDrawFeature)

        }

      })

        watch(() => store.getters.getDrawFeature, async (value: Feature | null) => {
            if (value && arse_clone.value) {
                yard_feature.value = value

                if ("arse_yard" in arse_clone.value) {
                    arse_clone.value.arse_yard.garden_area = formatArea(value.getGeometry())
                }
            }
            await showFeatures()
            await router.push({name: 'showArseFeature'})
        })

        return {
            yard_feature,
            correctFloat,
            store,
            toast,
            nameRule,
            floatRule,
            phoneRule,
            initData,
            code_masterusing,
            code_watersource,
            code_wateringtype,
            code_welltype,
            code_treetype,
            code_texturetypemastergroup,
            code_texturetypeslavegroup_all,
            arse_clone, saveArseExtraInfo, router, featureToJson
        }
    },

    data() {
        return {
            dialog: false,
            treeItems: [] as (object)[],
            mahdodeItems: [] as (object)[],
            useTypeItems: [] as (object)[],

            masterUse: ''
        }
    },
    methods: {
        addTree() {
            if (this.arse_clone && this.arse_clone.arse_yard) {

                let error = false
                if(this.arse_clone.arse_yard.yard_trees){
                    this.arse_clone.arse_yard.yard_trees.map((item) => {
                        if (!item.tree_type || item.tree_number === 0) {
                            error = true
                        }
                    })
                }


                if (error) {
                    this.$toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'اطلاعات درخت قبلی کامل نمیباشد.'
                    });
                } else {
                    if(!this.arse_clone.arse_yard.yard_trees){
                        this.arse_clone.arse_yard.yard_trees = []
                    }
                    this.arse_clone.arse_yard.yard_trees.push({
                        allowed_cut_down_number: null,
                        cut_down_numbers: 0,
                        planting_year: null,
                        tree_number: 0,
                        tree_type: null
                    })
                }


            }

        },

        saveTrees(kind: 'close' | 'save') {
            if (this.arse_clone && this.arse_clone.arse_yard) {

                if (kind === 'close') {
                    this.arse_clone.arse_yard.yard_trees.map((item, index) => {
                        if (!item.tree_type || item.tree_number === 0) {
                            if (this.arse_clone && this.arse_clone.arse_yard && this.arse_clone.arse_yard.yard_trees)
                                this.arse_clone.arse_yard.yard_trees.splice(index, 1)
                        }
                    })

                    this.dialog = false
                } else {
                    let error = false
                    let item_index = 0
                    this.arse_clone.arse_yard.yard_trees.map((item, index) => {
                        if (!item.tree_type || item.tree_number === 0) {
                            error = true
                            item_index = index
                        }
                    })

                    if (error) {
                        this.$toast.add({
                            group: 'br',
                            life: 2000,
                            severity: 'error',
                            summary: ' خطا در عملیات',
                            detail: ` اطلاعات درخت ${item_index} کامل نمیباشد `
                        });
                    } else {
                        this.dialog = false
                    }
                }


            }
        },

        deleteItem(index: number) {
            if (this.arse_clone && this.arse_clone.arse_yard) {
                this.arse_clone.arse_yard.yard_trees.splice(index, 1);
            }
        },

        addMahdodeItem() {
            this.mahdodeItems.push({})

            if (this.arse_clone) {
                if (this.arse_clone.arse_range) {

                    let error = false
                    let all_area = 0
                    this.arse_clone.arse_range.map((item) => {
                        if (!item.code_texture_type_master_group || !item.code_texture_type_slave_group || item.area === 0) {
                            error = true
                        } else {
                            all_area = all_area + item.area
                        }
                    })

                    if (error) {
                        this.$toast.add({
                            group: 'br',
                            life: 2000,
                            severity: 'error',
                            summary: ' خطا در عملیات',
                            detail: 'اطلاعات آیتم قبلی کامل نمیباشد.'
                        });
                    } else {
                        this.arse_clone.arse_range.push({
                            code_texture_type_master_group: null,
                            code_texture_type_slave_group: null,
                            area: (this.arse_clone.area - all_area)
                        })
                    }

                } else {
                    this.arse_clone.arse_range = []
                    this.arse_clone.arse_range.push({
                        code_texture_type_master_group: null,
                        code_texture_type_slave_group: null,
                        area: this.arse_clone.area
                    })
                }

            }
        },

        deleteMahdodeItem(index: number) {

            if (this.arse_clone && this.arse_clone.arse_range) {
                this.arse_clone.arse_range.splice(index, 1);
            }
        },

        addUseTypeItem() {
            if (this.arse_clone) {
                if (this.arse_clone.arse_using) {
                    let error = false
                    let all_area = 0
                    this.arse_clone.arse_using.map((item) => {
                        if (item.main_use == 0 || item.area == 0) {
                            error = true
                        } else {
                            all_area = all_area + item.area
                        }
                    })
                    if (error) {
                        this.$toast.add({
                            group: 'br',
                            life: 2000,
                            severity: 'error',
                            summary: ' خطا در عملیات',
                            detail: 'اطلاعات آیتم قبلی کامل نمیباشد.'
                        });
                    } else {
                        this.arse_clone.arse_using.push({main_use: 0, area: (this.arse_clone.area - all_area)})
                    }

                } else {
                    this.arse_clone.arse_using = []
                    this.arse_clone.arse_using.push({main_use: 0, area: this.arse_clone.area})
                }

            }

        },

        deleteUseTypeItem(index: number) {
            if (this.arse_clone && this.arse_clone.arse_using) {
                this.arse_clone.arse_using.splice(index, 1);
            }

        },

        get_slave_group(master_id: number): EnumsTableItem[] {
            let master: EnumsTableItem | null = null
            if (this.code_texturetypemastergroup) {
                this.code_texturetypemastergroup.items.map((item) => {
                    if (item.pk === master_id) {
                        master = item
                    }
                })
            }
            if (this.code_texturetypeslavegroup_all && master) {
                const items: EnumsTableItem[] = []
                this.code_texturetypeslavegroup_all.items.map((item) => {
                    if (item.code_texturetypemastergroup === master?.value) {
                        items.push(item)
                    }
                })

                return items
            }

            return []

        },

        async nextPageFunc(): ArseNextPageFuncRes {
            if (this.arse_clone) {
                if (this.arse_clone.arse_using) {
                    let error = false
                    let error_text = ''
                    let all_arse_using_area = 0
                    this.arse_clone.arse_using.map((item) => {
                        if (item.main_use == 0 || item.area == 0) {
                            error = true
                            error_text = 'نوع استفاده ملک تکمیل نیست'
                        } else {
                            all_arse_using_area = all_arse_using_area + item.area
                        }
                    })
                    if (all_arse_using_area > this.arse_clone.area) {
                        error = true
                        error_text = 'مجموع مساحت نوع ملک صحیح نیست'
                    }
                    if (this.arse_clone.arse_using.length === 0) {
                        delete this.arse_clone.arse_using
                    }
                    if (error) {
                        return {
                            error: error_text,
                            result: null
                        }
                    }
                }
                // ---------------//
                if (this.arse_clone.arse_range) {
                    let error = false
                    let error_text = ''
                    let all_arse_range_area = 0
                    this.arse_clone.arse_range.map((item) => {
                        if (!item.code_texture_type_master_group || !item.code_texture_type_slave_group || item.area === 0) {
                            error = true
                            error_text = 'نوع محدوده ملک تکمیل نیست'
                        } else {
                            all_arse_range_area = all_arse_range_area + item.area
                        }
                    })

                    if (all_arse_range_area > this.arse_clone.area) {
                        error = true
                        error_text = 'مجموع مساحت محدوده صحیح نیست'
                    }

                    if (this.arse_clone.arse_range.length === 0) {
                        delete this.arse_clone.arse_range
                    }
                    if (error) {
                        return {
                            error: error_text,
                            result: null
                        }
                    }
                }
                //-----------------//
                if (this.arse_clone.arse_parking && this.arse_clone.arse_parking.area === 0) {
                    delete this.arse_clone.arse_parking
                }
                //----------------//
                if (this.arse_clone.arse_yard) {
                    let error = false
                    let error_text = ''
                    if (this.arse_clone.arse_yard.garden_area && this.arse_clone.arse_yard.garden_area > this.arse_clone.area) {
                        error_text = 'مساحت فضای سبز مجاز نیست'
                        error = true
                    }
                    if (this.arse_clone.arse_yard.well_number && this.arse_clone.arse_yard.well_number > 100) {
                        error_text = 'تعداد چاه بیش از 100 نباید باشد'
                        error = true
                    }
                    if (error) {
                        return {
                            error: error_text,
                            result: null
                        }
                    }
                }
                //----------------//
                if (this.arse_clone.arse_parking) {
                    let error = false
                    let error_text = ''
                    if (this.arse_clone.arse_parking.area > this.arse_clone.area) {
                        error_text = 'مساحت  پارکینگ مجاز نیست'
                        error = true
                    }
                    if (error) {
                        return {
                            error: error_text,
                            result: null
                        }
                    }
                }


                //----------------//

                if (this.arse_clone && this.arse_clone.id) {

                    let yard_clone: (Yard & {
                        geometry: { geoJson: GeoJSONFeature } | null
                    }) | null = this.arse_clone.arse_yard ? {...this.arse_clone.arse_yard, geometry: null} : null
                    if (this.yard_feature) {
                        yard_clone = this.arse_clone.arse_yard ? {
                            ...this.arse_clone.arse_yard,
                            feature: this.yard_feature,
                            geometry: {geoJson: this.featureToJson(this.yard_feature, true)}
                        } : null
                    }


                    const res = await this.saveArseExtraInfo({
                        arse_parking: this.arse_clone.arse_parking,
                        arse_range: this.arse_clone.arse_range,
                        arse_using: this.arse_clone.arse_using,
                        arse_yard: yard_clone
                    }, this.arse_clone.id)

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
                            result: {...this.arse_clone, arse_yard: yard_clone}
                        }
                    } else {
                        return {
                            error: 'ذخیره اطلاعات انجام نشد',
                            result: null
                        }
                    }
                }


                return {
                    error: null,
                    result: this.arse_clone
                }
            }

            return {
                error: 'خطای نامشخص',
                result: null
            }
        },

        async drawGarden() {
            if (this.arse_clone) {
                if (!this.yard_feature) {
                    this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
                    await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
                    await this.router.push({name: 'drawArseFeature', params: {layer: 0}})
                } else {
                    await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
                    this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [this.yard_feature.clone()])
                    await this.router.push({name: 'drawArseFeature', params: {layer: 0}})
                }
            }


        },
    },


    watch: {
        arse_clone() {
            if (this.arse_clone && !this.arse_clone.arse_yard) {
                this.arse_clone.arse_yard = {
                    garden_area: 0,
                    water_supply_source: null,
                    watering_type: null,
                    well_number: 0,
                    well_type: null,
                    yard_trees: []
                }

            }
            if (this.arse_clone && !this.arse_clone.arse_parking) {
                this.arse_clone.arse_parking = {
                    area: 0, kind: ParkingAndStoreEnums.Yard, numbers: 1

                }
            }
        }
    },


});
</script>


<style>

.p-splitter .p-splitter-gutter .p-splitter-gutter-handle {
    background: #0461be !important;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.p-splitter .p-splitter-gutter {
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
    background: #adadad !important;
}
</style>
