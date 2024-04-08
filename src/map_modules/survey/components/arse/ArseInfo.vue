<template>
  <div style="height:100%;width:100%">

    <v-row class="ma-0 pa-2 pt-2" justify="center" align="center"
           style="height:100%;position: relative">

      <v-col cols="12" sm="10" style="height:100%;position: relative"
             class="rounded-lg elevation-2 border bg-white">
        <v-btn v-tooltip.left="`${feature!==null?' ویرایش عرصه در نقشه':'ترسیم عرصه در نقشه'}`" ripple
               @click="drawArse" class="elevation-6" icon color="info"
               style="position: absolute;bottom: 10px;right:10px;z-index: 10002">
          <v-icon>
            mdi-vector-polygon
          </v-icon>
        </v-btn>

        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
          <v-fade-transition>
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
          </v-fade-transition>
        </v-row>
        <v-slide-y-transition>
          <v-row v-if="initData&&overlay" class="ma-0 pa-0 " style="height:100%" justify="center" align="start">
            <v-col cols="12">
              <v-row class="ma-0 pa-0">
                <p class="pa-6 pb-2" style="line-height: 30px"> جهت برداشت اطلاعات عرصه طبق مراحل فوق
                  اقدام و جهت
                  ترسیم محدوده عرصه در نقشه ، در ابتدا کلید ترسیم عرصه را انتخاب کنید.</p>
              </v-row>

              <v-row class="ma-0 pa-0 mt-6">
                <v-img style="" height="150"
                       class=""
                       src="@/assets/gifs/map.gif"
                       alt="John"
                ></v-img>
              </v-row>
            </v-col>

          </v-row>
        </v-slide-y-transition>
        <v-fade-transition>
          <v-form ref="arseInfoFormRef" v-if="initData&&!overlay&&arse_clone"
                  style="height:100%;width: 100%;overflow-y: auto" class="myForm ">
            <v-row class="ma-0 pa-0" align="start" style="">
              <v-col cols="12" sm="4">
                <v-text-field
                    density="compact"
                    v-model="arse_clone.area"
                    variant="solo"
                    type="number"
                    :rules="floatRule"
                    @update:modelValue="correctFloat(arse_clone,'area')"
                    required
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                  </template>

                  <template v-slot:label>
                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                    <p class="">مساحت زمین</p>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-autocomplete
                    v-if="code_physicalnatures"
                    :items="code_physicalnatures.items"
                    density="compact"
                    v-model="arse_clone.code_physical_natures"
                    item-title="title"
                    item-value="pk"
                    variant="solo"
                    :rules="floatRule"
                    required
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                  </template>

                  <template v-slot:label>
                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                    <p class="">{{ code_physicalnatures.pName }}</p>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4">
                <v-autocomplete
                    v-if="code_location"
                    :items="code_location.items"
                    density="compact"
                    item-title="title"
                    item-value="pk"
                    variant="solo"
                    :rules="floatRule"
                    v-model="arse_clone.code_location"
                    required
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="dark_blue" icon="mdi-sitemap"/>
                  </template>

                  <template v-slot:label>
                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                    <p class="">{{ code_location.pName }}</p>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    v-model="arse_clone.explanation"
                    dir="rtl"
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
                </v-textarea
                >
              </v-col>
            </v-row>
          </v-form>
        </v-fade-transition>


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
import {default as map} from "ol/Map";
import {getArea, getLength} from 'ol/sphere.js';
import source_functions from "@/components/openLayers/componentFunctions/source";
import survey_functions from "@/componentFunctions/survey_functions";
import {CodingTableRecord} from "@/store/survey/types";
import {Arse, EnumField} from "@/models/Survey.interface";
import {useRouter} from "vue-router";
import {emit} from "process";

import {ArseNextPageFuncRes} from "@/map_modules/survey/components/arse/AresRef";
import VForm from "@/models/VForm.interface";
import rules from "@/componentFunctions/rules_functions";
import {SurveyMutations} from "@/store/survey/mutations";
import {addArseInterface} from "@/api/survey/SD.Models/addArse.sd";
import {OpenLayerAction} from "@/store/openLayer/actions";


export default defineComponent({
  name: "ArseInfoComponent",


  components: {},

  props: {
    map: {
      required: true,
      type: map
    },
    feature: {
      required: true,
      type: [Object, null] as PropType<Feature | null>
    },
    arse: {
      required: true,
      type: Object as PropType<Arse>
    },
    arseLayerId: {
      required: true,
      type: Number
    },

    process_id: {
      required: false,
      type: Number
    },
    process_feature: {
      type: Feature,
      required: false
    }

  },

  emits: ['drawnFeature'],

  setup(props, {emit}) {
    const store = useStore();
    const toast = useToast()
    const router = useRouter()

    const {getEnumsTable, addArse, editArse, correctFloat, getArseCodeLocation, arseCodeLocation} = survey_functions()
    const {featureToJson, formatArea, zoomToFeatures} = source_functions()

    const initData = ref(false)
    const code_physicalnatures = ref<EnumField>()
    const code_location = ref<EnumField>()
    const overlay = ref(true)
    const arse_clone = ref<Arse>()
    const arseInfoFormRef = ref<VForm>()
    const {nameRule, floatRule} = rules()

    async function setCodingFieldsName() {
      const coding: CodingTableRecord[] = store.getters.getSurveyCoding
      await Promise.all(
          coding.map(async (item) => {
            if (item.title === 'code_physicalnatures') {
              const items = await getEnumsTable({name: item.title})
              code_physicalnatures.value = {
                pName: item.alias,
                items: items
              }
            }
            if (item.title === 'code_location') {
              const items = await getEnumsTable({name: item.title})
              code_location.value = {
                pName: item.alias,
                items: items
              }
            }
          })
      )

    }

    watch(() => store.getters.getDrawFeature, async (value: Feature | null) => {
      if (value) {
        emit('drawnFeature', value)
        arse_clone.value = {...arse_clone.value, geometry: value}

        const data: any = featureToJson(value, true)
        await getArseCodeLocation({geoJson: data})
        if ("code_location" in arse_clone.value) {
          arse_clone.value.code_location = arseCodeLocation.value
        }
        overlay.value = false
        this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [])

      } else {
        overlay.value = true
      }

    })

    watch(() => store.getters.getCloseDrawFeature, async (value: boolean) => {
      if (value) {
        if (props.feature) {
          overlay.value = false
          const features = []
          const f = props.feature.clone()
          f.set('group', 5)
          features.push(f)
          await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
          await router.push({name: 'showArseFeature'})

        }

        if (props.process_feature && !props.feature) {
          overlay.value = false
          const features = []
          const f = props.process_feature.clone()
          f.set('group', 8)
          features.push(f)
          await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
          await router.push({name: 'showArseFeature'})
          setTimeout(() => {
            zoomToFeatures(props.map, features, [100, 100, 100, 100])
          }, 1000)
        }

        store.commit(SurveyMutations.SET_CLOSE_DRAW_FEATURE,!store.getters.getCloseDrawFeature)

      }

    })

    onMounted(async () => {
      await store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, [])
      store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
      await setCodingFieldsName()
      arse_clone.value = props.arse
      initData.value = true
      console.log(props.feature)

      if (props.feature) {
        overlay.value = false
        const features = []
        const f = props.feature.clone()
        f.set('group', 5)
        features.push(f)
        await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
        await router.push({name: 'showArseFeature'})

      }

      if (props.process_feature && !props.feature) {
        overlay.value = false
        const features = []
        const f = props.process_feature.clone()
        f.set('group', 8)
        features.push(f)
        await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
        await router.push({name: 'showArseFeature'})
        setTimeout(() => {
          zoomToFeatures(props.map, features, [100, 100, 100, 100])
        }, 1000)
      }
    })


    return {
      store, toast, formatArea, nameRule, floatRule, featureToJson, addArse, correctFloat,
      initData, code_physicalnatures, code_location, overlay, router, arse_clone, arseInfoFormRef, editArse
    }
  },

  data() {
    return {
      featureArea: 0,
      showInfo: false
    }
  },
  methods: {
    async drawArse() {
      if (!this.feature) {
        this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
        await this.router.push({name: 'drawArseFeature', params: {layer: this.arseLayerId}})
      } else {
        this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
        this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [this.feature.clone()])
        await this.router.push({name: 'drawArseFeature', params: {layer: this.arseLayerId}})
      }

    },
    async nextPageFunc(): ArseNextPageFuncRes {
      if (this.arseInfoFormRef) {
        const res = await this.arseInfoFormRef.validate()

        if (res.valid && this.arse_clone && this.arse_clone.geometry) {
          console.log(this.arse_clone)
          const addArseData: addArseInterface = {
            area: this.arse_clone.area,
            code_location: this.arse_clone.code_location,
            code_physical_natures: this.arse_clone.code_physical_natures,
            explanation: this.arse_clone.explanation,
            geometry: {geoJson: this.featureToJson(this.arse_clone.geometry, true)},
            relation_id: this.arse_clone.relation_id,
            process_id: this.process_id ? this.process_id : null
          }

          if (this.arse_clone.code) {
            addArseData.code = this.arse_clone.code
          }

          let res
          if (this.arse_clone.id) {
            res = await this.editArse(addArseData, this.arse_clone.id)
          } else {
            res = await this.addArse(addArseData)
          }

          if (res && res.result) {
            this.arse_clone.id = res.result.id
            this.arse_clone.code = res.result.code
            this.$toast.add({
              group: 'tr',
              life: 3000,
              severity: 'success',
              summary: ' نتیجه درخواست',
              detail: 'اطلاعات ذخیره شد'
            });
            return {
              error: null,
              result: this.arse_clone
            }
          } else {
            return {
              error: 'ذخیره اطلاعات انجام نشد',
              result: null
            }
          }


        }
      }
      return {
        error: 'اطلاعات تکمیل نیست',
        result: null
      }
    }
  },

  watch: {
    feature() {
      if (this.feature) {
        const geo = this.feature.getGeometry()
        if (geo && this.arse_clone) {
          this.arse_clone.geometry = this.feature
          this.arse_clone.area = this.formatArea(geo)
        }
      }
    },
    overlay() {
      if (this.overlay) {
        setTimeout(() => {
          this.showInfo = true
        }, 300)
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
