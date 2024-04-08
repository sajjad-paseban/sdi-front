<template>
    <div dir="ltr">
        <v-btn v-if="!showConfigDialog" dir="rtl" @click="showConfigDialog=true" prepend-icon="mdi-cog" size="small"
               class="font-weight-bold rounded-lg elevation-3" color="info" :style="$vuetify.display.smAndUp?'bottom:105px':'bottom:80px'"
               style="position: absolute;left:8px;z-index: 101;font-size:11px">
            تنظیمات
        </v-btn>
        <template v-if="showConfigDialog">
            <popupWindow :topic="'تنظیمات'" :close-btn="true" v-if="winSize!==0" :resize="true" :top="winSize>500?'10px':'10px'"
                         :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
                         :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                         :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'50vh':'50vh'"
                         :width="winSize>500?'40vw':'80vw'" @closeWindow="showConfigDialog=false">


                <v-card dir="rtl"
                        style="height: 100%;overflow-x:auto"
                        class="bg-white pa-0 rounded-b-lg myForm">
                    <div style="height:100%;width:100%;;position: relative;"
                         :style="winSize>500?'min-width:500px':'min-width:300px'" class="font-weight-bold ">

                        <div class="myForm" style="">
                            <v-row class="ma-0 pa-0 mt-4">
                                <v-col cols="12" sm="5"  style="height: 100%">
                                    <v-text-field
                                            density="compact"
                                            v-model="processItem.estimated_features"
                                            variant="solo"
                                            type="number"
                                            :rules="floatRule"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                            <p class="">تعدا عارضه تخمینی</p>
                                        </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="ma-0 pa-0 mt-8" style="font-size: 11px">
                                <v-col cols="12" sm="5"  class="py-2 font-weight-bold">
                                    <p class="text-grey-darken-3 mb-1" style="font-size: 9px">
                                        {{ ' تاریخ شروع' }}</p>
                                    <date-picker format="YYYY-MM-DD"
                                                 display-format="jYYYY-jMM-jDD"
                                                 editable
                                                 v-model="processItem.start_date"

                                                 color="rgb(var(--v-theme-info))"
                                                 :placeholder="'تاریخ شروع'"></date-picker>
                                </v-col>
                                <v-col cols="12" sm="5"  class="py-2 font-weight-bold">
                                    <p class="text-grey-darken-3 mb-1" style="font-size: 9px">
                                        {{ ' تاریخ پایان' }}</p>
                                    <date-picker format="YYYY-MM-DD"
                                                 display-format="jYYYY-jMM-jDD"
                                                 editable
                                                 v-model="processItem.end_date"
                                                 color="rgb(var(--v-theme-info))"
                                                 :placeholder="'تاریخ پایان'"></date-picker>
                                </v-col>
                            </v-row>
                            <v-row class="pa-0 ma-0 mt-16 mr-1">
                                <v-col cols="6" sm="4" class="pa-0 ma-0">
                                    <v-checkbox v-model="processItem.lock_in_place" label="ممیزی در محل"></v-checkbox>

                                </v-col>
                            </v-row>
                        </div>

                    </div>
                </v-card>
            </popupWindow>
        </template>
    </div>



</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import rules from "@/componentFunctions/rules_functions";
import popupWindow from "@/components/common/popupWindow.vue";


export default defineComponent({
    name: "ProcessConfigComponent",

    components: {popupWindow},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {processItem} = survey_panel_functions()

        const {} = survey_panel_functions()
        const {nameRule, floatRule} = rules()

        const initData = ref(false)
        const winSize = ref(0)

        onMounted(()=>{
            winSize.value = window.innerWidth
        })


        return {
            store,
            toast,
            router,
            route,
            winSize, floatRule, processItem
        }
    },


    data() {
        return {
            showConfigDialog:true
        }
    },
    methods: {},
    watch: {}

});
</script>


<style>


</style>
