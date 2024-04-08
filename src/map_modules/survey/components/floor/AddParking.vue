<template>
    <div style="height:100%;width:100%;overflow-y: auto" class="pa-2  myForm">

        <v-row class="ma-0 pa-0 my-2" justify="center">
            <v-col cols="12" sm="10" class="bg-white rounded elevation-1">
                <p style="font-size: 10px; line-height: 20px" class=" ">
                    در این قسمت اگر در طبقه انتخاب شده پارکینگ یا انباری یا راهرو وجود دارد ، میتوانید در این قسمت به
                    اطلاعات طبقه اضافه کنید.
                </p>
            </v-col>

        </v-row>


        <v-row class="ma-0 pa-0 mt-2" justify="center">

            <v-col cols="12" sm="10" class="bg-white rounded-lg elevation-3 myForm py-2">

                <v-expansion-panels class="rounded-lg elevation-1 font-weight-bold">
                    <v-expansion-panel
                            class="rounded-lg border bg-white"
                            v-for="(item,index) in items"
                            :key="index"
                            :title="item.name"
                    >
                        <template v-slot:text>
                            <v-row class="ma-0 pa-0">
                                <template v-if="item.name !== 'راهرو'">
                                    <v-col cols="12" sm="4">
                                        <v-autocomplete
                                                :items="['بخشی از طبقه','طبقه کامل']"
                                                density="compact"
                                                variant="solo"
                                                v-model="item.value.kind"
                                                :rules="nameRule"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-list-checkbox"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">نوع</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="4">

                                        <v-text-field
                                                density="compact"
                                                :rules="floatRule"
                                                variant="solo"
                                                type="number"
                                                v-model="item.value.numbers"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-numeric"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">تعداد</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </template>


                                <v-col cols="12" sm="4">
                                    <v-text-field
                                            density="compact"
                                            :rules="floatRule"
                                            variant="solo"
                                            type="number"
                                            v-model="item.value.area"
                                            @update:modelValue="correctFloat(item.value,'area')"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-texture-box"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class=""> مساحت</p>
                                        </template>
                                    </v-text-field>
                                </v-col>


                            </v-row>
                            <v-row class="ma-0 pa-0" justify="end">

                                <v-btn @click="clearObject(item)" color="error" class="font-weight-bold"
                                       style="font-size: 9px" size="x-small"
                                       append-icon="mdi-delete">حذف
                                </v-btn>
                            </v-row>
                        </template>
                    </v-expansion-panel>
                </v-expansion-panels>


            </v-col>

        </v-row>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import {DarbInfo, FloorInfo, ParkingAndStoreAndCommons} from "@/models/Survey.interface";
import {PropType} from "vue/dist/vue";
import {FloorNextPageFuncRes} from "@/map_modules/survey/components/floor/FloorInfoRef";
import survey_functions from "@/componentFunctions/survey_functions";


export default defineComponent({
    name: "AddParkingComponent",

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

    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()

        const {nameRule, floatRule, phoneRule} = rules()
        const {addFloorCommons,correctFloat} = survey_functions()

        const items = ref<ParkingAndStoreAndCommons[]>([{
            name: 'پارکینگ',
            value: {
                numbers: null,
                area: 0,
                kind: null
            }
        }, {
            name: 'انباری',
            value: {
                numbers: null,
                area: 0,
                kind: null
            }
        }, {
            name: 'راهرو',
            value: {
                area: 0
            }
        },])

        onMounted(() => {
            if (props.selectedFloor && props.selectedFloor.parking_store_commons) {
                props.selectedFloor.parking_store_commons.map((common) => {
                    items.value.map((item) => {
                        if (item.name === common.name) {
                            item.value = common.value
                        }
                    })
                })

            }
        })
        return {
            store, toast, router, nameRule, floatRule, items,addFloorCommons,correctFloat
        }
    },

    data: function () {
        return {}
    },

    methods: {
        clearObject(item: any) {
            for (let [index, key] of Object.keys(item.value).entries()) {
                item.value[key] = null
            }
        },

        async nextPageFunc(): FloorNextPageFuncRes {
            if (this.items && this.selectedFloor&&this.selectedFloor.id) {
                const result: ParkingAndStoreAndCommons[] = []
                let hasError = false
                this.items.map((item) => {
                    if (item.value.area && item.value.area !== 0 && item.value.area !== '0') {
                        if ('kind' in item.value&&!item.value.kind){
                            this.toast.add({
                                group: 'br',
                                life: 3000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'نوع مشخص نشده است'
                            });
                            hasError = true
                            return {
                                error: 'نوع مشخص نشده است',
                                result: null
                            }
                        }
                        if ('numbers' in item.value&&!item.value.numbers){
                            this.toast.add({
                                group: 'br',
                                life: 3000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'تعداد مشخص نشده است'
                            });
                            hasError = true
                            return {
                                error: 'تعداد مشخص نشده است',
                                result: null
                            }
                        }
                        result.push(item)
                    }
                })
                if (hasError){
                    return {
                        error: 'خطا در ذخیره اطلاعات',
                        result: null
                    }
                }
                console.log({...this.selectedFloor, parking_store_commons: result})

                const res = await this.addFloorCommons({commons:result},this.selectedFloor.id)
                if (res){
                    return {
                        error: null,
                        result: {...this.selectedFloor, parking_store_commons: result}
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
