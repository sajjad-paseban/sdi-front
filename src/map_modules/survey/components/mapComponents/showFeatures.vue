<template>
  <div>
    <vector_layer :visible="showVectorLayer" :map="map">
      <template v-if="true" #source="{vector}">
        <vector_source ref="showVectorSourceRef" :map="map" :vector="vector">

          <template v-if="true" #select="{vectorSource}">
            <select_interaction ref="selectInteractionRef" @selected="selectedEvent"
                                @outSelected="selectedEvent" :map="map"
                                :source="vectorSource" :vector="vector"></select_interaction>
          </template>

        </vector_source>
      </template>

      <template v-if="true" #style="{vector}">
        <Text_style :number-in-coords="true" :fill-color="'rgba(233,233,33,0.49)'"
                    :line-color="'rgb(38,179,241)'" :line-width="4"
                    :vector="vector"></Text_style>
      </template>
    </vector_layer>

    <vector_layer :map="map" :z-index="11">
      <template #clusterSource="{vector}">
        <cluster_source :layers="''" ref="drawClusterSourceRef" :map="map" :vector="vector">

        </cluster_source>
      </template>

    </vector_layer>


  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, watch} from "vue";
import Map from 'ol/Map.js';
import Feature from "ol/Feature";
import {useStore} from "vuex";
import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue";
import {default as select_interaction} from "@/components/openLayers/interactions/select/Select.vue";
import {SelectEvent} from "ol/interaction/Select";
import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
import {SelectComponentInterface} from "@/components/openLayers/interactions/select/model";
import source_functions from "@/components/openLayers/componentFunctions/source";
import popupWindow from "@/components/common/popupWindow.vue";
import EditableTable from "@/components/common/editableTable.vue";
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from "ol/style";
import {FillColors} from "@/components/openLayers/textStyle/TextStyle.interface";


export default defineComponent({
  name: "showFeaturesComponent",
  components: {
    vector_layer,
    Text_style,
    vector_source,
    cluster_source,
    select_interaction,

  },

  props: {

    map: {
      required: true,
      type: Map,
    },


  },

  setup(props) {
    const store = useStore()

    const showVectorSourceRef = ref<VectorSourceInterface>()
    const drawClusterSourceRef = ref<ClusterSourceInterface>()
    const selectInteractionRef = ref<SelectComponentInterface>()

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
    const fillColors = FillColors

    const features = ref<any[]>([])

    function drawFeature() {

      if (showVectorSourceRef.value) {

        if (features.value.length > 0) {
          console.log(features.value, 'features for draw')
          showVectorSourceRef.value.getSource().clear()
          features.value.map((feature, index) => {
            const new_baseStyle = baseStyle.clone()
            if (feature.get('active')) {
              feature.setStyle(null)
              showVectorSourceRef.value.drawFeaturesObject([feature])
            } else {
              let text = ''

              if (feature.get('group')) {

                new_baseStyle.setFill(new Fill({
                  color: fillColors[parseInt(feature.get('group'))],
                }))
                if (feature.get('group') == '1') {
                  text = 'ساختمان'
                }
                if (feature.get('group') == '2') {
                  text = 'پیشامدگی'
                }
                if (feature.get('group') == '3') {
                  text = 'آسانسور'
                }
                if (feature.get('group') == '4') {
                  text = 'راه پله'
                }
                if (feature.get('group') == '6') {
                  text = 'فضای سبز'
                }
                if (feature.get('group') == '7') {
                  text = 'واحد مستقل'
                }
                if (feature.get('group') == '8') {
                  new_baseStyle.setFill(new Fill({
                    color: 'rgba(255,255,255,0)',
                  }))
                  new_baseStyle.setStroke(
                      new Stroke({
                        color: 'rgb(10,182,241)',
                        width: 4,
                      }),
                  )
                }
              } else if (feature.get('panel') !== undefined) {
                new_baseStyle.setFill(new Fill({
                  color: fillColors[feature.get('panel') % 10],
                }))
                if (feature.get('text')) {
                  text = feature.get('text')
                }
              } else {
                new_baseStyle.setFill(new Fill({
                  color: fillColors[index % 10],
                }))
                if (feature.get('text')) {
                  text = feature.get('text')
                }
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

              if (text) {
                showVectorSourceRef.value.drawFeaturesObject([feature], new_baseStyle, labelStyle)
              } else {
                showVectorSourceRef.value.drawFeaturesObject([feature], new_baseStyle)
              }


            }


          })
          // showVectorSourceRef.value.drawFeaturesObject(features.value,undefined)
          // props.map.getView().fit(showVectorSourceRef.value.getSource().getExtent(),{duration:1000,maxZoom:18})
        } else {
          showVectorSourceRef.value.getSource().clear()
        }


      }
    }

    onMounted(() => {
      features.value = store.getters.getShowFeatures
      drawFeature()
    })

    watch(() => store.getters.getShowFeatures, async (value: Feature[]) => {
      features.value = value
      drawFeature()
    })


    return {

      features,
      store,
      drawClusterSourceRef,
      showVectorSourceRef,
      selectInteractionRef, drawFeature


    }
  },


  data() {
    return {
      showVectorLayer: true,
    };
  },


  methods: {
    selectedEvent(event: SelectEvent) {

      console.log(this.features, 'all features')
      console.log(event, 'selectedEvent')

      const newFeatures: any[] = []
      this.features.map((feature) => {
        if (!feature.get('active')) {
          newFeatures.push(feature)
        }
      })

      if (event.selected.length > 0) {
        const feature = event.selected[0].clone()
        feature.set('active', true)
        newFeatures.push(feature)
      }

      this.features = newFeatures
      this.drawFeature()

    },


  },

  watch: {


    showVectorSourceRef() {
      this.drawFeature()
    }
  }

  //  برای اندازه ازتفاع جدول //


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > td {
  font-size: 10px !important;
}

.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  padding: 3px 8px !important;
}

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > td,
.v-table--density-compact > .v-table__wrapper > table > thead > tr > td,
.v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
  height: 21px !important;
}
</style>
