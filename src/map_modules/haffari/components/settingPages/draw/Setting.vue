<template>
    <div class="pa-2" dir="rtl" style="height: 100%;width: 100%;">
        <div class="px-1" style="height:calc(100% - 35px);width:100%;overflow-y: auto">

            <div style="width:100%" class="rounded-lg elevation-3 pa-2 border-t ">
                <v-row class="ma-0 pa-0">
                    <p class="font-weight-bold text-haffari_primary">لایه های شامل</p>
                    <v-spacer/>
                    <v-btn @click="addLayerDialog=true" style="width:100px;height:25px;font-size:11px" class="font-weight-bold mr-1"
                           color="haffari_primary">اضافه کردن لایه
                    </v-btn>
                </v-row>

                <div class=""
                     style="align-items: center;overflow-x:auto; height:120px;width:100%;  display: flex;flex-wrap: nowrap;">
                    <v-hover v-for="i in [1,2,3,4,5]" :key="i"
                             v-slot="{ isHovering, props }"
                             open-delay="100"
                    >
                        <div v-bind="props"
                             class="rounded-lg elevation-2 mx-1 pa-1 border bg-haffari_side_back font-weight-bold"
                             style="height:100px;min-width:160px;font-size:11.5px;line-height: 22px;position: relative">
                            <v-fade-transition>
                                <v-btn v-if="isHovering" color="error" icon size="small" density="compact"
                                       style="position: absolute;left:5px;top:5px">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-fade-transition>

                            <v-row class="ma-0 pa-0">
                                نام لایه : {{ `سواره رو` }}
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                نوع : {{ `تمام` }}
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                ویرایش : {{ `فعال` }}
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                <p style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width:150px; /* some width */">
                                    متن خطا : {{ `باید شامل سواره رو باشد` }}
                                </p>

                            </v-row>
                        </div>

                    </v-hover>

                </div>
            </div>

            <div style="width:100%" class="rounded-lg elevation-3 pa-2 border-t mt-4">
                <v-row class="ma-0 pa-0">
                    <p class="font-weight-bold text-haffari_primary">لایه های عدم برخورد</p>
                    <v-spacer/>
                    <v-btn style="width:100px;height:25px;font-size:11px" class="font-weight-bold mr-1"
                           color="haffari_primary">اضافه کردن لایه
                    </v-btn>
                </v-row>

                <div class=""
                     style="align-items: center;overflow-x:auto; height:120px;width:100%;  display: flex;flex-wrap: nowrap;">
                    <v-hover v-for="i in [1,2,3,4,5]" :key="i"
                             v-slot="{ isHovering, props }"
                             open-delay="100"
                    >
                        <div v-bind="props"
                             class="rounded-lg elevation-2 mx-1 pa-1 border bg-haffari_side_back font-weight-bold"
                             style="height:100px;min-width:160px;font-size:11.5px;line-height: 22px;position: relative">
                            <v-fade-transition>
                                <v-btn v-if="isHovering" color="error" icon size="small" density="compact"
                                       style="position: absolute;left:5px;top:5px">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-fade-transition>

                            <v-row class="ma-0 pa-0">
                                نام لایه : {{ `سواره رو` }}
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                نوع : {{ `تمام` }}
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                ویرایش : {{ `فعال` }}
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                <p style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width:150px; /* some width */">
                                    متن خطا : {{ `باید شامل سواره رو باشد` }}
                                </p>

                            </v-row>
                        </div>

                    </v-hover>
                </div>
            </div>

            <v-row class="ma-0 pa-0 mt-4 mb-4" style="">
                <v-col cols="12" sm="4" class="rounded-lg elevation-2 pt-4 mt-2 border bg-haffari_side_back">
                    <v-row class="ma-0 pa-0 myForm" align="center">
                        <v-text-field density="compact" class="mx-1"
                                      variant="solo"
                                      label="کمتر"
                                      style="width:50px!important;"></v-text-field>
                        <p class="font-weight-bold mt-n2 mx-1">       {{`< طول ترسیم <`}}</p>
                        <v-text-field density="compact" label="بیشتر" class="mx-1"
                                      variant="solo" style="width:50px!important;"></v-text-field>
                    </v-row>
                </v-col>
                <v-spacer/>
                <v-col cols="12" sm="4"  class="rounded-lg elevation-2 pt-4 mt-2 border bg-haffari_side_back">
                    <v-row class="ma-0 pa-0 myForm" align="center">
                        <v-text-field density="compact"
                                      variant="solo" class="mx-1"
                                      label="کمتر"
                                      style="width:50px!important;"></v-text-field>
                        <p class="font-weight-bold mt-n2 mx-1">       {{`< طول مقطع <`}}</p>
                        <v-text-field density="compact" label="بیشتر" class="mx-1"
                                      variant="solo" style="width:50px!important;"></v-text-field>
                    </v-row>
                </v-col>
                <v-spacer/>
                <v-spacer/>
            </v-row>

        </div>
        <v-row class="ma-0 pa-0 border-t pt-1 ma-1" justify="end" style="">
            <v-btn variant="text" color="error" class="font-weight-bold" size="small">انصراف</v-btn>
            <v-btn variant="tonal" color="haffari_primary" class="font-weight-bold" size="small">ذخیره</v-btn>
        </v-row>
        <simple-dialog
            :show="addLayerDialog"
            :topic="'اضافه کردن لایه'"
            width="50vw"
            height="70vh"
            :current_height="'70vh'"
            @closeDialog="addLayerDialog=false"
            class="bg-grey-lighten-2"
        >
            <div style="height: 100%;width:100%;overflow-y: hidden" >
                <SelectLayer></SelectLayer>

            </div>

        </simple-dialog>
    </div>


</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import SelectLayer from "@/map_modules/haffari/components/settingPages/draw/SelectLayer.vue";


export default defineComponent({
    name: "HaffariDrawSettingComponent",

    components: {SimpleDialog,SelectLayer},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()
        const {nameRule, floatRule, phoneRule} = rules()

        const initData = ref(false)
        const addLayerDialog = ref(false)

        onMounted(async () => {

            setTimeout(() => {
                initData.value = true
            }, 500)
        })

        return {
            store,
            toast,
            router,
            nameRule,
            initData,addLayerDialog

        }
    },
    computed: {},
    data() {
        return {}
    },
    methods: {},

    watch: {},


});
</script>


<style>


</style>
