<template>
    <div style="height:100%;width:100% " class="pa-2 bg-grey-lighten-4">
        <v-row class="ma-0 pa-0" justify="start">
            <v-btn @click="addItem" color="info" class="font-weight-bold" style="font-size: 10px" size="small"
                   prepend-icon="mdi-plus">اضافه کردن درب
            </v-btn>
        </v-row>
        <v-row class="pa-0 ma-0 pt-2" style="height:calc(100% - 60px)" justify="center" align="start">
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
                <v-form ref="darbForm" v-if="initData" class="myForm py-2 pl-2"
                        style="height: 100%;width: 100%;overflow-y: auto">
                    <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                        <v-expansion-panel
                                class="rounded-lg border bg-white"
                                v-for="(item,index) in doors"
                                :key="index"
                                :title="`درب شماره ${index+1}`"
                        >
                            <template v-slot:text>
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12" sm="4">
                                        <v-autocomplete
                                                v-if="code_materialtype"
                                                :items="code_materialtype.items"
                                                item-value="pk"
                                                v-model="item.door_material"
                                                density="compact"
                                                variant="solo"
                                                :rules="floatRule"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">{{ code_materialtype.pName }}</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <v-autocomplete
                                                v-if="code_doortype"
                                                :items="code_doortype.items"
                                                item-value="pk"
                                                density="compact"
                                                v-model="item.door_type"
                                                variant="solo"
                                                :rules="nameRule"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">{{ code_doortype.pName }}</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <v-autocomplete
                                                v-if="code_doorsize"
                                                :items="code_doorsize.items"
                                                item-value="pk"
                                                density="compact"
                                                v-model="item.door_size"
                                                variant="solo"
                                                :rules="nameRule"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">{{ code_doorsize.pName }}</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <v-text-field
                                                density="compact"
                                                :rules="floatRule"
                                                variant="solo"
                                                v-model="item.door_height"
                                                type="number"
                                                @update:modelValue="correctFloat(item,'door_height')"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">ارتفاع درب</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <v-text-field
                                                density="compact"
                                                :rules="floatRule"
                                                variant="solo"
                                                type="number"
                                                v-model="item.door_lat"
                                                @update:modelValue="correctFloat(item,'door_lat')"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">عرض درب</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="6" sm="4" class="pa-0 ma-0" style="align-self: center">
                                        <v-checkbox color="info" class="font-weight-bold"
                                                    label="درب اصلی "></v-checkbox>

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
            </v-fade-transition>


        </v-row>
        <v-row class="ma-0 pa-0" justify="end">
            <v-btn @click="saveBtn" color="info" class="font-weight-bold" style="font-size: 10px" size="small"
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
import rules from "@/componentFunctions/rules_functions";
import VForm from "@/models/VForm.interface";
import {District, DarbInfo, EnumField} from "@/models/Survey.interface";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import {object} from "zod";


export default defineComponent({
    name: "DarbInfoComponent",

    components: {},
    emits: ['saveDoorsInfo'],

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
        const darbForm = ref<VForm>()
        const {getEnumsTable,correctFloat} = survey_functions()

        const code_doortype = ref<EnumField>()
        const code_materialtype = ref<EnumField>()
        const code_doorsize = ref<EnumField>()


        const initData = ref(false)
        const doors = ref<(DarbInfo | object)[]>([])

        async function setCodingFieldsName() {
            const coding: CodingTableRecord[] = store.getters.getSurveyCoding
            await Promise.all(
                coding.map(async (item) => {
                    if (item.title === 'code_doortype') {
                        const items = await getEnumsTable({name: item.title})
                        code_doortype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_materialtype') {
                        const items = await getEnumsTable({name: item.title})
                        code_materialtype.value = {
                            pName: item.alias,
                            items: items
                        }
                    }
                    if (item.title === 'code_doorsize') {
                        const items = await getEnumsTable({name: item.title})
                        code_doorsize.value = {
                            pName: item.alias,
                            items: items
                        }
                    }

                })
            )

        }

        onMounted(async () => {
            await setCodingFieldsName()
            if (props.side && props.side.doors) {
                doors.value = [...props.side.doors]
            }
            initData.value = true
        })


        return {
            correctFloat,
            store,
            toast,
            darbForm,
            nameRule,
            floatRule,
            initData,
            code_doortype,
            code_materialtype,
            doors,
            code_doorsize
        }
    },

    data() {
        return{}
    },
    methods: {
        addItem() {
            this.doors.push({})
        },
        deleteItem(index: number) {
            this.doors.splice(index, 1);
        },
        async saveBtn() {
            if (this.darbForm) {
                const res = await this.darbForm.validate()

                if (res.valid && this.doors) {
                    let error = false
                    this.doors.map((door: DarbInfo, index) => {
                        if (!(door.door_material && door.door_type && door.door_height && door.door_lat && door.door_size)) {
                            this.toast.add({
                                group: 'br',
                                life: 3000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: `اطلاعات درب ${index} کامل نیست `
                            });
                            error = true
                        }
                        if (door.door_height&&door.door_height>100){
                            this.toast.add({
                                group: 'br',
                                life: 3000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'مقدار ارتفاع درب بیش از 100 متر است'
                            });
                            error = true
                        }
                        if (door.door_lat&&door.door_lat>100){
                            this.toast.add({
                                group: 'br',
                                life: 3000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'مقدار عرض درب بیش از 100 متر است'
                            });
                            error = true
                        }
                    })

                    if (!error) {
                        this.$emit('saveDoorsInfo', this.doors)
                    }
                }
            }
        }
    },

    watch: {},


});
</script>


<style scoped>


</style>
