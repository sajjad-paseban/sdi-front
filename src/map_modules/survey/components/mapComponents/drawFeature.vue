`
<template>
  <div>
    <vector_layer :map="map">
      <template v-if="true" #source="{vector}">
        <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">

          <template v-if="activePlugin===2" #draw="{vectorSource}">
            <sniper_draw_interaction :active-modify="true" ref="drawRef" @drawend="drawEvent"
                                     @drawstart="drawEvent"
                                     :map="map"
                                     :source="vectorSource" :type="drawType"></sniper_draw_interaction>
          </template>
          <template v-if="activePlugin===4" #translate="{vectorSource}">
            <translate_interaction :source="vectorSource" :map="map"></translate_interaction>
          </template>
          <template v-if="snap" #snap="{vectorSource}">
            <snap :source="vectorSource" :map="map"></snap>
          </template>
          <template v-if="activePlugin===3" #modify="{vectorSource}">
            <modify_interaction ref="modifyRef" @modifystart="modifyEvent" @modifyend="modifyEvent"
                                :map="map"
                                :source="vectorSource"></modify_interaction>
          </template>
          <template v-if="activePlugin===5" #hole="{vectorSource}">
            <hole_interaction :map="map" :source="vectorSource"></hole_interaction>
          </template>
          <template v-if="activePlugin===6" #rotate="{vectorSource}">
            <rotate_interaction :vector="vector" :map="map" :source="vectorSource"></rotate_interaction>
          </template>

          <template v-if="activePlugin===8" #delete="{vectorSource}">
            <delete_by_select :vector="vector" :map="map" :source="vectorSource"></delete_by_select>
          </template>

          <template v-if="activePlugin===10" #drawByCoords="{vectorSource}">
            <draw_by_coordinates :layer-type="activeLayer.type_layer" ref="selectVectorRef"
                                 @closeWindow="toolbarClick(toolbarItems.filter((item)=>{return item.id===10})[0])"
                                 :map="map" :source="vectorSource"></draw_by_coordinates>
          </template>

        </vector_source>
      </template>
      <template v-if="true" #style="{vector}">
        <Text_style :layer-type="drawType" :number-in-coords="false" :fill-color="'rgba(232,232,29,0.62)'"
                    :vector="vector"></Text_style>
      </template>
    </vector_layer>


    <feature_toolbar :left="'40px'" @itemClick="toolbarClick" :items="toolbarItems"
                     :width="{mobile:'45px',desktop:'430px'}"
                     :height="{mobile:'430px',desktop:'38px'}" :show-close="closeBtn"
                     :close-action="()=>{router().go(-1)}" @close="close_toolBar"></feature_toolbar>


    <template v-if="layerFieldsForm">
      <layer-fields-form :layer-id="activeLayer.id" :initFields="featureFields"
                         @closeWindow="layerFieldsForm=false"
                         @saveFieldsForm="setFeatureFields"></layer-fields-form>
    </template>

  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUpdated, Ref, ref, watch} from "vue"

import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue"
import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue"
import {default as snap} from "@/components/openLayers/interactions/snap/Snap.vue"
import {default as modify_interaction} from "@/components/openLayers/interactions/modify/Modify.vue"
import {default as translate_interaction} from "@/components/openLayers/interactions/translate/Translate.vue"
import rotate_interaction from '@/components/openLayers/interactions/rotate/Rotate.vue';
import hole_interaction from '@/components/openLayers/interactions/hole/Hole.vue';
import {default as draw_interaction} from "@/components/openLayers/interactions/draw/Draw.vue"
import {default as delete_by_select} from "@/components/openLayers/interactions/deleteBySelect/DeleteBySelect.vue"
import {default as map} from "ol/Map";
import {default as sniper_draw_interaction} from "@/components/openLayers/interactions/draw/newDrawWithSniper.vue"
import {DrawEvent, DrawType} from "@/components/openLayers/interactions/draw/model";
import {default as feature_toolbar} from '@/components/common/featureToolbar/featureToolbar.vue'
import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
import draw_by_coordinates from '@/components/openLayers/interactions/draw/drawByCoordinates/DrawByCoordinates.vue'

import {useStore} from "vuex";

import {useToast} from "primevue/usetoast";
import LayerFieldsForm from '@/map_modules/feature/common/layerFieldsForm.vue'
import {Layer_types} from "@/models/Layer.Interface";
import feature_functions from "@/componentFunctions/feature_functions";
import {Field} from "@/models/Feature.interface";
import {addFeatureInterface} from "@/api/feature/SD.Models/addFeature";
import GeoJSONFeature from "ol/format/GeoJSON";
import {useRoute} from "vue-router";
import {LayerItem} from "@/store/openLayer/types";
import {OpenLayerMutations} from "@/store/openLayer/mutations";
import {SurveyMutations} from "@/store/survey/mutations";
import source_functions from "@/components/openLayers/componentFunctions/source";
import Feature from 'ol/Feature.js';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from "ol/style";
import router from "@/router";


export default defineComponent({
  name: "DrawComponent",
  setup() {
    const activePlugin = ref<number>(0)
    const store = useStore();
    const toast = useToast()
    const route = useRoute()
    const drawVectorSourceRef = ref<VectorSourceInterface>()
    const {makeGeoJsonFeature, addFeature} = feature_functions()
    const {getJsonFeatureInfo, refreshLayer} = source_functions()

    const activeLayer = ref<LayerItem | null>(null)
    const drawType = ref<DrawType>(DrawType.POLYGON)
    const checkLayerFields = ref<boolean>(false)
    const featureFields = ref<Field[]>([])
    const drawWithoutLayer = ref(false)
    const baseStyle = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
      }),
    })
    const fillColors = ['rgba(255,118,9,0.37)', 'rgba(39,87,190,0.2)', 'rgba(237,72,57,0.2)', 'rgba(139,234,77,0.3)',
      'rgba(120,54,234,0.66)', 'rgba(208,90,108,0.77)', 'rgba(70,179,150,0.63)', 'rgba(214,64,225,0.65)',
      'rgba(96,213,98,0.68)', 'rgba(246,233,85,0.77)']

    const showFeaturesClone = ref<Feature[]>([]) as Ref<Feature[]>


    watch(() => activeLayer.value, (value: any) => {
      if (value) {
        if (value.type_layer !== Layer_types.TIFF)
          drawType.value = value.type_layer
        checkLayerFields.value = false
        featureFields.value = []
        if (drawVectorSourceRef.value)
          drawVectorSourceRef.value.removeFeatures()
      }

    });

    watch(() => store.getters.getShowFeatures, (value: Feature[]) => {
      initShowFeatures(value)
    });

    watch(() => store.getters.getEditFeatures, (value: Feature[]) => {
      initEditFeatures(value)
    });

    function initShowFeatures(value: Feature[]) {
      const interval = setInterval(() => {
        if (drawVectorSourceRef.value) {
          drawVectorSourceRef.value.removeFeatures()
          showFeaturesClone.value = []
          let text = ''
          value.map((feature, index) => {
            const featureClone: Feature = feature.clone()
            if (featureClone.get('group')) {
              baseStyle.setFill(new Fill({
                color: fillColors[parseInt(featureClone.get('group'))],
              }))
            } else if (featureClone.get('panel') !== undefined) {
              baseStyle.setFill(new Fill({
                color: fillColors[feature.get('panel') % 10],
              }))
              if (featureClone.get('text')) {
                text = feature.get('text')
              }
            } else {
              baseStyle.setFill(new Fill({
                color: fillColors[index],
              }))
            }

            const labelStyle = new Style({
              text: new Text({
                font: '12px Calibri,sans-serif',
                overflow: true,
                fill: new Fill({
                  color: '#000',
                }),
                stroke: new Stroke({
                  color: '#fff',
                  width: 3,
                }),

              }),
            });
            labelStyle.getText().setText(text)

            showFeaturesClone.value.push(featureClone)

            if (text) {
              drawVectorSourceRef.value.drawFeaturesObject([featureClone], baseStyle.clone(), labelStyle)
            } else {
              drawVectorSourceRef.value.drawFeaturesObject([featureClone], baseStyle.clone())
            }


          })

          clearInterval(interval)
        }
      }, 1000)

    }

    function initEditFeatures(value: Feature[]) {
      const interval = setInterval(() => {
        if (drawVectorSourceRef.value) {
          value.map((feature) => {
            drawVectorSourceRef.value.drawFeaturesObject([feature.clone()])

          })

          clearInterval(interval)
        }
      }, 1000)

    }

    function setInitFromParams() {
      const layer_id = route.params.layer
      if (layer_id && String(layer_id) !== '0') {
        store.getters.getLayers.map((layer: LayerItem) => {
          if (String(layer.id) === layer_id) {
            activeLayer.value = layer
            drawWithoutLayer.value = false
          }
        })
      } else if (layer_id && String(layer_id) === '0') {
        drawWithoutLayer.value = true
        activeLayer.value = null
      }
    }

    onMounted(() => {
      setInitFromParams()
      initShowFeatures(store.getters.getShowFeatures)
      initEditFeatures(store.getters.getEditFeatures)
    })

    onUpdated(() => {
      setInitFromParams()
    })


    return {
      showFeaturesClone,
      activePlugin,
      drawVectorSourceRef,
      toast,
      store,
      drawType,
      checkLayerFields,
      featureFields,
      makeGeoJsonFeature,
      addFeature,
      activeLayer,
      getJsonFeatureInfo, drawWithoutLayer, refreshLayer, setInitFromParams, initShowFeatures, initEditFeatures
    }
  },
  components: {
    draw_by_coordinates,
    modify_interaction,
    snap,
    translate_interaction,
    rotate_interaction,
    hole_interaction,
    vector_layer,
    draw_interaction,
    vector_source,
    Text_style,
    feature_toolbar,
    delete_by_select,
    LayerFieldsForm,
    sniper_draw_interaction
  },
  data() {
    return {

      draw: true,
      snap: false,

      layerFieldsForm: false,

      toolbarItems: [
        {
          id: 1,
          icon: '/icons/reset.png',
          name: 'ریست',
          disabled: false
        },
        {
          id: 2,
          icon: '/icons/draw.png',
          name: 'ترسیم',
          disabled: false
        },
        {
          id: 3,
          icon: '/icons/edit.png',
          name: 'ویرایش',
          disabled: false
        },
        {
          id: 4,
          icon: '/icons/transition.png',
          name: 'جابه جایی',
          disabled: false
        },

        {
          id: 5,
          icon: '/icons/hole.png',
          name: 'ترسیم چاله',
          disabled: false
        },
        {
          id: 6,
          icon: '/icons/rotate.png',
          name: 'چرخش',
          disabled: false
        },
        {
          id: 10,
          icon: '/icons/drawPoints.png',
          name: 'ترسیم با نقاط',
          disabled: false
        },
        {
          id: 7,
          icon: '/icons/extraList.png',
          name: 'اقلام توصیفی',
          disabled: false
        },
        {
          id: 8,
          icon: '/icons/delete.png',
          name: 'حذف',
          disabled: false
        },
        {
          id: 9,
          icon: '/icons/save.png',
          name: 'ذخیره',
          disabled: false
        },
      ] as FTItemsInterface[],


    };
  },
  directives: {},

  props: {
    map: {
      required: true,
      type: map
    },
    closeBtn: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    activeDraw() {
      if (this.activeDraw) {
        this.toolbarItems.map((item) => {
          item.disabled = false
        })

        if (this.drawVectorSourceRef)
          this.drawVectorSourceRef.removeFeatures()
      } else {
        this.toolbarItems.map((item) => {
          item.disabled = true
        })
      }
    }
  },

  computed: {
    activeDraw(): boolean {
      return this.store.getters.getActiveDraw
    }
  },
  methods: {
    close_toolBar() {
      this.store.commit(SurveyMutations.SET_CLOSE_DRAW_FEATURE,!this.store.getters.getCloseDrawFeature)
    },

    router() {
      return router
    },
    drawEvent(target: DrawEvent) {
      console.log(target, 'drawEvent')
      if (target.type === "drawend") {
        this.draw = false
      }

    },
    modifyEvent(target: any) {
      console.log(target, 'modifyEvent')
    },
    // -----------------------//
    async saveFeature() {
      if (!this.drawWithoutLayer) {
        if (this.drawVectorSourceRef) {
          if (this.store.getters.getShowFeatures.length > 0) {
            this.drawVectorSourceRef.removeFeatures(this.showFeaturesClone)
          }
          console.log(this.store.getters.getShowFeatures)
          console.log(this.drawVectorSourceRef.getFeatures())
          const result = this.drawVectorSourceRef.getFeatureForSave(this.activeLayer)
          if (result.error.length > 0) {
            result.error.map((error: string) => {
              this.toast.add({
                group: 'br',
                life: 2000,
                severity: 'error',
                summary: ' خطا در عملیات',
                detail: error
              });
            })
          } else {
            if (result.geometries && this.activeLayer) {
              const featureJson: any = this.makeGeoJsonFeature(result.geometries, this.featureFields, this.activeLayer.type_layer)
              // const res = await this.addFeature(featureJson, this.activeLayer.id)
              const res = true
              if (res) {
                this.$toast.add({
                  group: 'tr',
                  life: 3000,
                  severity: 'success',
                  summary: ' نتیجه درخواست',
                  detail: 'عارضه با موفقیت اضافه شد .'
                });

                if (this.drawVectorSourceRef)
                  this.drawVectorSourceRef.removeFeatures()
                this.checkLayerFields = false
                this.featureFields = []
                this.refreshLayer(this.map)
                this.store.commit(SurveyMutations.SET_DRAW_FEATURE, this.getJsonFeatureInfo(featureJson))
                this.store.commit(SurveyMutations.SET_ACTIVE_DRAW, false)

              }

            }
          }

        }
      } else if (this.drawWithoutLayer) {
        if (this.drawVectorSourceRef) {
          if (this.store.getters.getShowFeatures.length > 0) {
            this.drawVectorSourceRef.removeFeatures(this.showFeaturesClone)
          }
          console.log(this.store.getters.getShowFeatures)
          console.log(this.drawVectorSourceRef.getFeatures())
          const result = this.drawVectorSourceRef.getFeatureForSave(null, Layer_types.Polygon)
          if (result.error.length > 0) {
            result.error.map((error: string) => {
              this.toast.add({
                group: 'br',
                life: 2000,
                severity: 'error',
                summary: ' خطا در عملیات',
                detail: error
              });
            })
          } else {
            if (result.geometries) {
              const featureJson: JSON = this.makeGeoJsonFeature(result.geometries, [], Layer_types.Polygon)
              this.store.commit(SurveyMutations.SET_DRAW_FEATURE, this.getJsonFeatureInfo(featureJson))
              this.store.commit(SurveyMutations.SET_ACTIVE_DRAW, false)
            }
          }
        }


      } else {
        this.toast.add({
          group: 'br',
          life: 2000,
          severity: 'error',
          summary: ' خطا در عملیات',
          detail: 'اقلام توصیفی بررسی نشده است'
        });
      }
    },


    setFeatureFields(fields: Field[]) {
      console.log(fields)
      this.checkLayerFields = true
      this.featureFields = fields
    },

    toolbarClick(item: FTItemsInterface) {
      if (this.activeLayer || this.drawWithoutLayer) {
        if (item.id === 1) {
          if (this.drawVectorSourceRef) {
            this.drawVectorSourceRef.removeFeatures()
            this.setInitFromParams()
            this.initShowFeatures(this.store.getters.getShowFeatures)
            this.initEditFeatures(this.store.getters.getEditFeatures)
          }

        } else if (item.id === 7) {
          if (this.activeLayer) {
            this.layerFieldsForm = true
          } else {
            this.toast.add({
              group: 'br',
              life: 2000,
              severity: 'error',
              summary: ' خطا در عملیات',
              detail: 'لایه فعال انتخاب نشده است '
            });
          }
        } else if (item.id === 9) {
          this.saveFeature()
        } else {
          this.toolbarItems.map((item) => {
            item.disabled = true
          })
          if (this.activePlugin === 0) {
            this.activePlugin = item.id
            setTimeout(() => {
              this.snap = true
            }, 1000)
            item.disabled = false
          } else {
            this.toolbarItems.map((item) => {
              item.disabled = false
            })
            this.snap = false
            this.activePlugin = 0
          }
        }
      } else {
        this.toast.add({
          group: 'br',
          life: 2000,
          severity: 'error',
          summary: ' خطا در عملیات',
          detail: 'ابتدا لایه فعال را انتخاب کنید'
        });
      }

      this.toolbarItems.map((item) => {
        if (item.id === 9) {
          item.disabled = false
        }
      })
    },
  },


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
