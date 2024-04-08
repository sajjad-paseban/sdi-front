<template>
    <div style="height:100%;width:100% " class="pa-2 bg-grey-lighten-2">
        <v-row class="pa-0 pa-2 ma-0" style="height:calc(100% - 30px)" justify="center" align="center">
            <v-col cols="12" id="table" style="height:100%" class="rounded-lg elevation-3 pa-2 bg-white">
                <v-form ref="sideForm" style="width: 100%;height:100%" class="myForm" v-if="side_clone">
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12" sm="4">
                            <v-text-field
                                    v-if="side.maabar_feature_json"
                                    density="compact"
                                    v-model="side_clone.gozar_lat"
                                    :rules="floatRule"
                                    variant="solo"
                                    type="number"
                                    @update:modelValue="correctFloat(side_clone,'gozar_lat')"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">عرض گذر</p>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                    v-if="side.maabar_feature_json"
                                    density="compact"
                                    :rules="floatRule"
                                    v-model="side_clone.front_area"
                                    variant="solo"
                                    type="number"
                                    @update:modelValue="correctFloat(side_clone,'front_area')"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">جبهه</p>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12" sm="4" align-self="end">
                            <v-checkbox label="پخ بودن" color="info"
                                        class="font-weight-bold"></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    v-model="side_clone.bezel_area"
                                    variant="solo"
                                    @update:modelValue="correctFloat(side_clone,'bezel_area')"
                                    type="number"
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت پخ</p>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="ma-0 pa-0">
                        <v-col cols="12">
                            <v-textarea
                                    dir="rtl"
                                    v-model="side_clone.explanation"
                                    no-resize
                                    class="font-weight-bold"
                                    rows="5"
                                    background-color="light-blue"
                                    color="black"
                                    hint=""
                                    persistent-hint
                                    label="توضیحات تکمیلی"

                                    variant="solo"
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-form>

            </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" justify="end">
            <v-btn @click="save" color="info" class="font-weight-bold ml-2" style="font-size: 10px" size="small"
                   append-icon="mdi-content-save">ذخیره
            </v-btn>
        </v-row>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {Arse, District} from "@/models/Survey.interface";
import rules from "@/componentFunctions/rules_functions";
import VForm from "@/models/VForm.interface";
import survey_functions from "@/componentFunctions/survey_functions";


export default defineComponent({
    name: "ExtraInfoComponent",

    components: {},

    emits: ['saveSideExtraInfo'],

    props: {
        side: {
            type: Object as PropType<District | null>,
            required: true
        }


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()

        const {nameRule, floatRule, phoneRule} = rules()
        const {correctFloat} = survey_functions()
        const sideForm = ref<VForm>()

        return {
            store, toast, nameRule, floatRule, sideForm,correctFloat
        }
    },

    data() {
        return {
            side_clone: null as District | null,
        }
    },
    methods: {
        async save() {
            if (this.sideForm) {
                const res = await this.sideForm.validate()

                if (res.valid && this.side_clone) {
                    const arse:Arse = this.store.getters.getArseInfo
                    let error = false
                    if (this.side_clone.bezel_area>arse.area){
                        this.toast.add({
                            group: 'br',
                            life: 5000,
                            severity: 'error',
                            summary: ' خطا',
                            detail: 'مساحت پخی بیش از مساحت عرصه میباشد'
                        });
                        error = true
                    }
                    console.log(this.side_clone)
                    if (!error){
                        this.$emit('saveSideExtraInfo', this.side_clone)
                    }

                }
            }
        }
    },

    mounted() {
        if (this.side) {
            this.side_clone = {...this.side}

        }
    },

    watch: {},


});
</script>


<style>
.v-input--density-default .v-field--variant-solo, .v-input--density-default .v-field--variant-solo-inverted, .v-input--density-default .v-field--variant-solo-filled, .v-input--density-default .v-field--variant-filled {
    border: 1px solid #0000002e;
}

</style>
