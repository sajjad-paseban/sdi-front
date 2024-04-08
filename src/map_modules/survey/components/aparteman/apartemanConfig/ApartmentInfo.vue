<template>
    <div style="height:100%;width:100%">
        <v-row class="ma-0 pa-2 pt-2" justify="center" align="center"
               style="height:100%;position: relative">

            <v-col cols="12" sm="10" style="height:100%;position: relative"
                   class="rounded-lg">
                <v-btn @click="drawFeature" v-tooltip.left="`ترسیم واحد در نقشه`" ripple
                       class="elevation-6" icon color="info"
                       style="position: absolute;bottom: 10px;right:10px;z-index: 10002">
                    <v-icon>
                        mdi-vector-polygon
                    </v-icon>
                </v-btn>

                <div class="ma-0 pa-0 rounded-lg elevation-2 border bg-white" style="">
                    <v-row class="ma-0 pa-0">
                        <p class="pa-3 pb-8" style="line-height: 30px;font-size: 13px"> جهت
                            ترسیم واحد مستقل در نقشه ، در ابتدا کلید ترسیم واحد را انتخاب کنید.</p>
                    </v-row>
                    <v-row class="ma-0 pa-0 pb-2">
                        <v-col cols="12" sm="4">
                            <v-text-field
                                    density="compact"
                                    v-if="apartment_clone"
                                    v-model="apartment_clone.area"
                                    variant="solo"
                                    type="number"
                                    :rules="floatRule"
                                    @update:modelValue="correctFloat(apartment_clone,'area')"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                    <p class="">مساحت واحد</p>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>

                </div>


            </v-col>


        </v-row>

    </div>
</template>

<script lang="ts">
import Geometry from 'ol/geom/Geometry.js';
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import Feature from 'ol/Feature.js';
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import survey_functions from "@/componentFunctions/survey_functions";
import {SurveyLayers} from "@/store/survey/types";
import {LayerItem} from "@/store/openLayer/types";
import {Aparteman} from "@/models/Survey.interface";
import {SurveyMutations} from "@/store/survey/mutations";
import {SurveyAction} from "@/store/survey/actions";
import {geometry} from "@turf/turf";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {ApartmentNextPageFuncRes} from "@/map_modules/survey/components/aparteman/apartmenttRef";


export default defineComponent({
    name: "ApartmentInfoComponent",


    components: {},

    props: {
        apartment: {
            required: true,
            type: Object as PropType<Aparteman>
        }
    },

    emits: ['drawnFeature'],

    setup(props, {emit}) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const {nameRule, floatRule} = rules()
        const {correctFloat,saveApartmentFeature} = survey_functions()
        const {formatArea, featureToJson} = source_functions()

        const unitLayer = ref<LayerItem | null>(null)
        const apartment_clone = ref<Aparteman>()

        async function showFeatures() {

            const features: Feature[] = []

            if (apartment_clone.value && 'geometry' in apartment_clone.value && apartment_clone.value.geometry) {
                const f = apartment_clone.value.geometry.clone()
                f.set('group', 7)
                features.push(f)
            }


            await store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
            await store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, store.getters.getArseInfo)
            store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
        }

        watch(() => store.getters.getDrawFeature, async (value: Feature | null) => {
            if (value) {
                console.log(value)

                if (apartment_clone.value && 'geometry' in apartment_clone.value){
                    apartment_clone.value.geometry = value
                    apartment_clone.value.area = formatArea(value.getGeometry())
                }
                await showFeatures()
                await router.push({
                    name: 'apartemanConfig',
                    params: {idNumber: apartment_clone.value?.id}
                });
            }
        })

        onMounted(async () => {
            apartment_clone.value = {...props.apartment}
            store.getters.getSurveyLayers.map((item: SurveyLayers) => {
                if (item.name === 'واحدهای مستقل') {
                    unitLayer.value = item.layer
                }
            })
            await showFeatures()

        })

        return {
            floatRule, correctFloat, router, unitLayer, store,apartment_clone,saveApartmentFeature,featureToJson
        }
    },

    data() {
        return {}
    },
    methods: {
        async drawFeature() {
            if (this.unitLayer) {
                this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
                await this.store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
                await this.store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, this.store.getters.getArseInfo)

                if (this.apartment_clone&&this.apartment_clone.geometry) {
                    const feature = this.apartment_clone.geometry.clone()
                    feature.set('active', true)

                    await this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [feature])

                }else {
                    await this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
                }

                await this.router.push({name: 'drawApartemanConfig', params: {layer: this.unitLayer.id}})
            }

        },

        async nextPageFunc(): ApartmentNextPageFuncRes {
            if (this.apartment_clone&&this.apartment_clone.area&&this.apartment_clone.area>0){
                const sendData ={
                    geometry:this.apartment_clone.geometry ? {geoJson: this.featureToJson(this.apartment_clone.geometry , true)} : null,
                }
                if (sendData.geometry){
                    const res = await this.saveApartmentFeature(sendData,this.apartment_clone.id)
                    if (res){
                        return {
                            error: null,
                            result: {...this.apartment_clone}
                        }
                    }
                }else {
                    return {
                        error: null,
                        result: {...this.apartment_clone}
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


<style>


</style>
