<template>
    <div style="height:100%;width:100% " class="pa-2 bg-grey-lighten-2">
        <v-row class="pa-0 ma-0" style="height:100%" justify="center" align="center">
            <v-col cols="12" sm="10" id="table" style="height:80%" class="rounded-lg elevation-3 pa-2 bg-white">
                <v-form ref="sideForm" class="myForm" style="height: 100%;width:100%">
                    <div style="height:calc(100% - 30px);width:100%">
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
                            <v-row v-if="initData&&side_clone" class="ma-0 pa-0">
                                <v-col cols="12" sm="4">
                                    <v-autocomplete
                                            v-if="code_walltype"
                                            :items="code_walltype.items"
                                            item-value="pk"
                                            density="compact"
                                            v-model="side_clone.wall.wall_type"
                                            variant="solo"
                                            :rules="floatRule"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="">{{ code_walltype.pName }}</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-text-field
                                            density="compact"
                                            :rules="floatRule"
                                            variant="solo"
                                            v-model="side_clone.wall.wall_height"
                                            @update:modelValue="correctFloat(side_clone.wall,'wall_height')"
                                            type="number"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="">ارتفاع حصار</p>
                                        </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4">
                                    <v-text-field
                                            density="compact"
                                            variant="solo"
                                            type="number"
                                            v-model="side_clone.wall.wall_lat"
                                            :rules="floatRule"
                                            @update:modelValue="correctFloat(side_clone.wall,'wall_lat')"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="">ضخامت حصار</p>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" class="rounded-lg">

                                    <p class="text-grey-darken-3" style="font-size: 9px">
                                        {{ ' تاریخ ساخت ' }}</p>
                                    <date-picker v-model="side_clone.wall.wall_creation" format="YYYY-MM-DD"
                                                 display-format="jYYYY-jMM-jDD" editable
                                                 color="rgb(var(--v-theme-info))"
                                                 placeholder=" تاریخ ساخت "></date-picker>
                                </v-col>
                            </v-row>
                        </v-fade-transition>


                    </div>

                    <v-row class="ma-0 pa-0" justify="end">
                        <v-btn @click="save" color="info" class="font-weight-bold" style="font-size: 10px" size="small"
                               append-icon="mdi-content-save">ذخیره
                        </v-btn>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {District, EnumField} from "@/models/Survey.interface";
import rules from "@/componentFunctions/rules_functions";
import VForm from "@/models/VForm.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import {CodingTableRecord} from "@/store/survey/types";


export default defineComponent({
    name: "SideTypeInfoComponent",

    components: {},

    emits: ['saveSideType'],

    props: {
        side: {
            type: Object as PropType<District>,
            required: true
        }


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()

        const {nameRule, floatRule, phoneRule} = rules()
        const sideForm = ref<VForm>()
        const {getEnumsTable,correctFloat} = survey_functions()

        const code_walltype = ref<EnumField>()
        const initData = ref(false)
        const side_clone = ref<District>()

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_walltype') {
                        const items = await getEnumsTable({name: item.title})
                        code_walltype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }

                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            side_clone.value = {...props.side}
            if (!props.side.wall) {
                side_clone.value['wall'] = {}
            }

            console.log(side_clone.value)
            initData.value = true
        })

        return {
            store, toast, nameRule, floatRule, sideForm, code_walltype, initData, side_clone,correctFloat
        }
    },

    data() {
        return {
            sideType: null as string | null,
            sideMaterial: null as string | null,
            side_y: 0,
            side_x: 0,
        }
    },
    methods: {
        async save() {
            if (this.sideForm) {
                const res = await this.sideForm.validate()
                let error = false
                if (res.valid && this.side_clone) {
                    if (this.side_clone.wall?.wall_height>100){
                        this.toast.add({
                            group: 'br',
                            life: 3000,
                            severity: 'error',
                            summary: ' خطا',
                            detail: 'مقدار ارتفاع دیوار بیش از 100 متر است'
                        });
                        error = true
                    }
                    if (this.side_clone.wall?.wall_lat>100){
                        this.toast.add({
                            group: 'br',
                            life: 3000,
                            severity: 'error',
                            summary: ' خطا',
                            detail: 'مقدار عرض دیوار بیش از 100 متر است'
                        });
                        error = true
                    }
                    if (!error)
                        this.$emit('saveSideType', this.side_clone.wall)
                }
            }
        }
    },

    watch: {},


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
