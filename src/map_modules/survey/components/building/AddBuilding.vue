<template>
  <div style="height:100%;width:100%" class="pa-2">

    <v-row class="ma-0 pa-0 " justify="center">
      <v-col cols="12" sm="11" class="bg-white rounded elevation-1">
        <p style="font-size: 10px; line-height: 20px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden"
           class=" ">
          جهت برداشت اطلاعات ساختمان طبق مراحل فوق اقدام و جهت
          ترسیم محدوده ساختمان در نقشه ، در ابتدا کلید ترسیم ساختمان را انتخاب کنید.
        </p>
      </v-col>

    </v-row>

    <v-row class="ma-0 pa-0  " style="height:calc(100% - 12px);" justify="center" align="center">
      <v-col cols="12" sm="11" class="pa-0 ma-0 ma-0 myForm border-b "
             style="height:90%;position: relative">
        <v-slide-y-transition>
          <v-table v-if="buildings&&buildings.length>0&&false" density="compact"
                   style="height: 100%;width:100%;min-width: 600px" fixed-header="true">
            <thead class="bg-grey-lighten-4">
            <tr class="bg-grey-lighten-4">
              <th class="text-right font-weight-bold bg-grey-lighten-2" v-for="i in headers"
                  :key="i.text">
                {{ i.text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item,index) in buildings"
                :key="index"
            >
              <td class="font-weight-bold">
                <v-radio
                    color="info"
                    :value="index"
                    v-model="selectedBuilding"
                    @click="updateSelectBuilding(index)"
                ></v-radio>
              </td>
              <td class="font-weight-bold">{{ item.extra_info.b_number }}</td>
              <td class="font-weight-bold">
                <td class="font-weight-bold">
                  <v-autocomplete
                      v-if="code_direction"
                      :items="code_direction.items"
                      v-model="item.extra_info.direction"
                      item-title="title"
                      item-value="pk"
                      density="compact"
                      variant="solo"
                      class="mt-1"
                      required
                  >
                  </v-autocomplete>
                </td>
              </td>
              <td class="font-weight-bold">
                <v-text-field
                    density="compact"
                    variant="solo"
                    required
                    class="mt-1"
                    v-model="item.extra_info.name"
                >

                </v-text-field>
              </td>
              <td class="font-weight-bold" style="max-width: 35px;">
                <v-text-field

                    density="compact"
                    variant="solo"
                    required
                    class="mt-1"
                    :readonly="item.id !== undefined"
                    @update:model-value="updateFloorNum(item)"
                    v-model="item.extra_info.floors_num"
                >

                </v-text-field>
              </td>
              <td class="font-weight-bold">{{ item.extra_info.roof_area }}</td>
              <td class="font-weight-bold">
                {{ item.extra_info.infrastructure_area }}
              </td>
              <td class="">
                <v-row class="ma-0 pa-0">
                  <v-btn v-tooltip.bottom="'ویرایش عارضه ساختمان'" class="mx-1" color="info"
                         size="small"
                         @click="editSelectFeature(item)" density="compact" icon>
                    <v-icon size="">mdi-pen</v-icon>
                  </v-btn>
                  <v-btn v-tooltip.bottom="'حذف'" class="mx-1" @click="deleteBuilding_func(index)"
                         color="error" size="small" density="compact" icon>
                    <v-icon size="">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn v-tooltip.bottom="'اطلاعات تکمیلی'" class="mx-1" color="info" size="small"
                         @click="showExtraInfoDialog(item)" density="compact" icon>
                    <v-icon size="">mdi-book-outline</v-icon>
                  </v-btn>
                </v-row>
              </td>


            </tr>
            </tbody>
          </v-table>
          <v-form class="rounded-lg" v-if="buildings&&buildings.length>0&&true" ref="addBuildingFormRef"
                  style="width:100%;height:100%;overflow-y: auto">
            <v-row class="ma-0 pa-0 rounded-lg "
                   style="height:100%;display: flex;align-content: flex-start;width:100%"
                   justify="center">
              <div v-for="(item,index) in buildings"
                   :key="item.id"
                   style="width: 100%"
                   class=" pa-1 ">
                <div class="bg-white elevation-3 rounded-lg border-t ">
                  <v-row class="ma-0 pa-0 myForm " style="font-size: 11px" justify="center">
                    <v-col cols="4" sm="4">
                      <v-text-field
                          density="compact"
                          v-model="item.extra_info.b_number"
                          variant="solo"
                          type="number"
                          required
                      >
                        <template v-slot:label>
                          <!-- <p  class="text-dark_blue">نام لایه</p> -->
                          <p class="text-blue-darken-4">شماره</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4" sm="4">
                      <v-text-field
                          density="compact"
                          v-model="item.extra_info.name"
                          variant="solo"
                          :rules="nameRule"
                          required
                      >
                        <template v-slot:label>
                          <!-- <p  class="text-dark_blue">نام لایه</p> -->
                          <p class="text-blue-darken-4">نام ساختمان</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="4" sm="4">
                      <v-text-field
                          density="compact"
                          :readonly="item.id !== undefined"
                          @update:model-value="updateFloorNum(item)"
                          v-model="item.extra_info.floors_num"
                          variant="solo"
                          type="number"
                          required
                      >
                        <template v-slot:label>
                          <!-- <p  class="text-dark_blue">نام لایه</p> -->
                          <p class="text-blue-darken-4">تعداد طبقات</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                          density="compact"
                          v-model="item.extra_info.roof_area "
                          variant="solo"
                          type="number"
                          @update:modelValue="correctFloat(item.extra_info,'roof_area')"
                          required
                      >
                        <template v-slot:label>
                          <!-- <p  class="text-dark_blue">نام لایه</p> -->
                          <p class="text-blue-darken-4">مساحت سقف</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                          density="compact"
                          v-model="item.extra_info.infrastructure_area"
                          variant="solo"
                          @update:modelValue="correctFloat(item.extra_info,'infrastructure_area')"
                          type="number"
                          required
                      >
                        <template v-slot:label>
                          <!-- <p  class="text-dark_blue">نام لایه</p> -->
                          <p class="text-blue-darken-4">مساحت زیربنا</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-autocomplete
                          v-if="code_direction"
                          :items="code_direction.items"
                          v-model="item.extra_info.direction"
                          item-title="title"
                          item-value="pk"
                          density="compact"
                          variant="solo"
                          class=""
                          required
                      >
                        <template v-slot:label>
                          <!-- <p  class="text-dark_blue">نام لایه</p> -->
                          <p class="text-blue-darken-4">{{ code_direction.pName }}</p>
                        </template>
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                  <div style="height:40px;width:100%" class="bg-grey-lighten-2 border-t rounded-b-lg">
                    <v-row class="ma-0 pa-0 pr-1" justify="start" align="center"
                           style="height: 100%">
                      <v-radio
                          color="info"
                          :value="index"
                          v-model="selectedBuilding"
                          @click="updateSelectBuilding(index)"
                      ></v-radio>
                      <v-btn v-tooltip.bottom="'ویرایش عارضه ساختمان'" class="mx-1" color="info"
                             size="small"
                             @click="editSelectFeature" density="compact" icon>
                        <v-icon size="">mdi-pen</v-icon>
                      </v-btn>
                      <v-btn v-tooltip.bottom="'حذف'" class="mx-1"
                             @click="deleteBuilding_func(index)"
                             color="error" size="small" density="compact" icon>
                        <v-icon size="">mdi-delete</v-icon>
                      </v-btn>
                      <v-btn v-tooltip.bottom="'اطلاعات تکمیلی'" class="mx-1" color="info"
                             size="small"
                             @click="showExtraInfoDialog(item)" density="compact" icon>
                        <v-icon size="">mdi-book-outline</v-icon>
                      </v-btn>


                    </v-row>
                  </div>


                </div>

              </div>
            </v-row>
          </v-form>

        </v-slide-y-transition>
        <v-slide-y-transition>

          <v-row v-if="buildings.length===0" justify="center" align="center"
                 class="rounded-lg ma-0 bg-white  pt-1 elevation-3"
                 style="height:100% ">
            <v-col cols="12">
              <v-row class="ma-0 pa-0">
                <v-img style="" height="150"
                       class=""
                       src="@/assets/gifs/building2.gif"
                       alt="John"
                ></v-img>
              </v-row>
              <v-row class="ma-0 pa-0 mt-2" justify="center">
                <p class="font-weight-bold">ساختمانی ترسیم نشده است</p>
              </v-row>
            </v-col>


          </v-row>
        </v-slide-y-transition>

        <v-btn v-tooltip.left="'ترسیم ساختمان در نقشه'" @click="drawBuilding" color="info" size="small"
               icon="mdi-plus" class="elevation-4"
               style="position: absolute;bottom:20px;left:15px;z-index:1001"></v-btn>
      </v-col>
    </v-row>

    <simple-dialog
        :show="dialog"
        :topic="'اطلاعات تکمیلی ساختمان'"
        width="50vw"
        height="70vh"
        :current_height="'80vh'"
        @closeDialog="dialog=false"
        class="bg-grey-lighten-2"
    >
      <div style="height: 100%;width:100%;overflow-y: hidden" v-if="buildingExtraInfoSelected">

        <BuildingExtraInfo @saveExtraInfo="saveBuildingExtraInfo"
                           :selectedBuilding="buildingExtraInfoSelected"></BuildingExtraInfo>
      </div>

    </simple-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import * as turf from '@turf/turf'
import Feature from 'ol/Feature.js';
import {OpenLayerAction} from "@/store/openLayer/actions";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import source_functions from "@/components/openLayers/componentFunctions/source";
import {LayerItem} from "@/store/openLayer/types";
import feature_functions from "@/componentFunctions/feature_functions";
import {Arse, EnumField, SelectedBuilding} from "@/models/Survey.interface";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import BuildingExtraInfo from "@/map_modules/survey/components/building/BuildingExtraInfo.vue";
import {BuildingNextPageFuncRes} from "@/map_modules/survey/components/building/buildingProgressRef";
import {CodingTableRecord} from "@/store/survey/types";
import survey_functions from "@/componentFunctions/survey_functions";
import {addBuildingInterface} from "@/api/survey/SD.Models/addBuilding.sd";
import building from "@/map_modules/survey/components/building/Building.vue";
import {SurveyAction} from "@/store/survey/actions";
import VForm from "@/models/VForm.interface";
import rules from "@/componentFunctions/rules_functions";


export default defineComponent({
  name: "AddBuildingComponent",

  components: {SimpleDialog, BuildingExtraInfo},


  props: {

    step: {
      type: Number,
      required: true
    },

    buildingLayerId: {
      type: Number,
      required: true
    }

  },

  setup(props) {
    const store = useStore();
    const toast = useToast()
    const router = useRouter()

    const {formatArea, featureToJson} = source_functions()
    const {getEnumsTable, addBuilding, editBuilding, deleteBuilding, correctFloat} = survey_functions()
    const {activeLayerFieldsList, getActiveLayerFields} = feature_functions()

    const buildings = ref<SelectedBuilding[]>([]) as Ref<SelectedBuilding[]>
    const arseFeature = ref<Feature | null>(null)
    const buildingExtraInfoSelected = ref<SelectedBuilding>()
    const buildingNameField = ref('')
    const initData = ref(false)
    const code_direction = ref<EnumField>()
    const editMode = ref(false)
    const selectedBuilding = ref<number[]>([])
    const addBuildingFormRef = ref<VForm>()
    const {nameRule} = rules()

    async function setCodingFieldsName() {
      const coding: CodingTableRecord[] = store.getters.getSurveyCoding
      await Promise.all(
          coding.map(async (item) => {
            if (item.title === 'code_direction') {
              const items = await getEnumsTable({name: item.title})
              code_direction.value = {
                pName: item.alias,
                items: items
              }
            }


          })
      )

    }


    function checkOverlapFeatures(feature: Feature) {
      const features: any[] = []
      const feature_obj = featureToJson(feature, true)
      buildings.value.map((item, index) => {
        if (item.feature) {
          if (editMode.value && selectedBuilding.value[0] == index) {
            console.log('edit feature')
          } else {
            features.push(featureToJson(item.feature, true))
          }

        }
      })
      let error = false
      features.map((item) => {
        const res = turf.intersect(item, feature_obj)
        console.log(res, 'checkOverlapFeatures res')
        if (res !== null) {
          error = true
          toast.add({
            group: 'br',
            life: 5000,
            severity: 'error',
            summary: ' خطا',
            detail: 'ساختمان جدید داخل ساختمان دیگر قرار دارد'
          });
        }
      })
      return error
    }

    watch(() => store.getters.getDrawFeature, async (value: Feature | null) => {
      if (value && props.step === 1) {
        if (editMode.value && selectedBuilding.value.length > 0 && buildings.value.length > 0) {
          const building: SelectedBuilding = buildings.value[selectedBuilding.value[0]]
          const area = formatArea(value.getGeometry())
          if (!checkOverlapFeatures(value)) {
            building.feature = value
            building.extra_info.roof_area = area
            building.extra_info.infrastructure_area = (area * building.extra_info.floors_num)

            const feature_clone = value.clone()
            feature_clone.set('active', true)
            await store.commit(SurveyMutations.SET_SHOW_FEATURES, [feature_clone])
            await router.push({
              name: 'showBuildingFeature'
            })
          } else {
            await store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
            await router.push({
              name: 'showBuildingFeature'
            })
          }

          await store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
          editMode.value = false
        } else {
          const area = formatArea(value.getGeometry())
          if (!checkOverlapFeatures(value)) {
            buildings.value.push({
              feature: value, extra_info: {
                direction: 1,
                floors_num: 1,
                b_number: buildings.value.length + 1,
                name: '',
                roof_area: area,
                infrastructure_area: area,
              }
            })
          }

          const building_features = []
          buildings.value.map((building) => {
            if (building.feature) {
              const f = building.feature.clone()
              f.set('group', 1)
              building_features.push(f)
            }
          })
          await router.push({
            name: 'showBuildingFeature'
          })
          store.commit(SurveyMutations.SET_SHOW_FEATURES, [...building_features])

          console.log(buildings.value, 'buildings')
        }

      }
    })

    watch(() => store.getters.getCloseDrawFeature, async (value: boolean) => {
      if (value) {
        const arse: Arse = store.getters.getArseInfo
        if (arse && arse.buildings) {
          const building_features = []
          buildings.value = arse.buildings
          buildings.value.map((building) => {
            if (building.feature) {
              const f = building.feature.clone()
              f.set('group', 1)
              building_features.push(f)
            }
          })
          store.commit(SurveyMutations.SET_SHOW_FEATURES, [...building_features])
        }
        store.commit(SurveyMutations.SET_CLOSE_DRAW_FEATURE,!store.getters.getCloseDrawFeature)

      }

    })

    onMounted(async () => {
      store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
      await setCodingFieldsName()
      await getActiveLayerFields(props.buildingLayerId)
      store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
      activeLayerFieldsList.value.map((field) => {
        if (field.name === 'name') {
          buildingNameField.value = String(field.id)
        }
      })


      const arse: Arse = store.getters.getArseInfo
      if (arse && arse.buildings) {
        const building_features = []
        buildings.value = arse.buildings
        buildings.value.map((building) => {
          if (building.feature) {
            const f = building.feature.clone()
            f.set('group', 1)
            building_features.push(f)
          }
        })
        store.commit(SurveyMutations.SET_SHOW_FEATURES, [...building_features])
      }

      await store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
      await store.dispatch(SurveyAction.SET_TASKBAR_INFO_FEATURES, arse)
      initData.value = true

    })

    return {
      nameRule,
      addBuildingFormRef,
      correctFloat,
      arseFeature,
      selectedBuilding,
      editMode,
      store,
      addBuilding,
      toast,
      featureToJson,
      router,
      buildings,
      formatArea,
      buildingNameField,
      buildingExtraInfoSelected,
      initData,
      code_direction,
      deleteBuilding,
      editBuilding
    }
  },

  data() {
    return {
      headers: [
        {text: "انتخاب", value: "choose", width: "5%"},
        {text: "شماره", value: "index", width: "5%"},
        {text: "جهت ", value: "direction", width: "15%"},
        {text: "نام ساختمان", value: "direction", width: "15%"},
        {text: "طبقات", value: "length", width: "10%"},
        {text: "مساحت سقف", value: "roof_area", width: "15%"},
        {text: "مساحت زیربنا", value: "all_area", width: "15%"},
        {text: "عملیات", value: "operation", width: "30%"},

      ],


      dialog: false
    }
  },
  emits: ['selectBuilding'],
  methods: {
    async drawBuilding() {
      const building_features = []
      const arse = []
      if (this.arseFeature) {
        const f = this.arseFeature.clone()
        f.set('group', 5)
        arse.push(f)
      }
      this.buildings.map((building) => {
        if (building.feature) {
          const f = building.feature.clone()
          f.set('group', 1)
          building_features.push(f)
        }
      })

      this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [...building_features, ...arse])
      this.store.commit(SurveyMutations.SET_ACTIVE_DRAW, true)
      await this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [])
      await this.router.push({name: 'drawBuildingFeature', params: {layer: this.buildingLayerId}})

    },
    updateSelectBuilding(index: number) {
      setTimeout(async () => {
        this.selectedBuilding = [index]
        this.$emit('selectBuilding', this.buildings[index])

        // --for show feature on map after select --
        await this.router.push({
          name: 'showBuildingFeature'
        })
        if (this.buildings && this.buildings[index] && this.buildings[index].feature && this.arseFeature) {
          const feature = this.buildings[index].feature.clone()
          feature.set('active', true)

          const f = this.arseFeature.clone()
          f.set('group', 5)


          await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [f, feature])
          await this.router.push({
            name: 'showBuildingFeature'
          })
        }


      }, 100)
    },

    async editSelectFeature() {
      this.store.commit('setConfirmDialog', {
        massage: 'در صورت ویرایش ، باید عارضه های پیشامدگی و دیگر قسمت ها را نیز ویرایش کنید ؟',
        topic: '',
        active: true,
        accept: async () => {
          if (this.selectedBuilding.length > 0) {

            const index = this.selectedBuilding[0]
            if (this.buildings && this.buildings[index] && this.buildings[index].feature) {
              const feature = this.buildings[index].feature.clone()
              feature.set('active', true)

              await this.store.commit(SurveyMutations.SET_EDIT_FEATURES, [feature])

            }
            this.editMode = true

            const arse = []
            if (this.arseFeature) {
              const f = this.arseFeature.clone()
              f.set('group', 1)
              arse.push(f)
            }
            await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [...arse])
            this.store.commit(SurveyMutations.SET_ACTIVE_DRAW, true)
            await this.router.push({name: 'drawBuildingFeature', params: {layer: this.buildingLayerId}})
          }

        },
        reject: () => {
          console.log('reject')
        },

      })
    },

    async deleteBuilding_func(index: number) {

      this.store.commit('setConfirmDialog', {
        massage: 'آیا حذف مورد تایید است ؟',
        topic: 'اخطار',
        active: true,
        accept: async () => {
          if (this.buildings.length > 0) {
            let has_error = false
            console.log(this.buildings[index])
            const building_id: number | undefined = this.buildings[index].id
            if (building_id) {
              const res = await this.deleteBuilding(building_id)
              if (!res) {
                has_error = true
                this.toast.add({
                  group: 'br',
                  life: 2000,
                  severity: 'error',
                  summary: ' خطا در عملیات',
                  detail: 'حذف ساختمان موفق نبود'
                });
              }
            }

            if (!has_error) {
              this.selectedBuilding = []
              await this.store.commit(SurveyMutations.SET_SHOW_FEATURES, [])
              this.$emit('selectBuilding', null)
              await this.router.push({
                name: 'showBuildingFeature'
              })
              this.buildings.splice(index, 1)
            }


          }
        },
        reject: () => {
          console.log('reject')
        },

      })

    },
    showExtraInfoDialog(item: SelectedBuilding) {
      this.buildingExtraInfoSelected = item
      this.dialog = true
    },
    saveBuildingExtraInfo(building: SelectedBuilding) {
      this.buildings.map((item) => {
        if (item.extra_info.b_number === building.extra_info.b_number) {
          item = building
        }
      })
      this.dialog = false
    },
    updateFloorNum(item: SelectedBuilding) {
      setTimeout(() => {
        item.extra_info.infrastructure_area = item.extra_info.floors_num * item.extra_info.roof_area
      }, 100)
    },

    async nextPageFunc(): BuildingNextPageFuncRes {

      if (this.addBuildingFormRef) {
        const res = await this.addBuildingFormRef.validate()
        const select_building: any = this.buildings[this.selectedBuilding[0]]
        if (!select_building) {
          return {
            error: 'ساختمانی انتخاب نشده است',
            result: null
          }
        }
        if (select_building.feature && res.valid && this.store.getters.getArseInfo.id) {
          console.log(select_building.extra_info.area, this.store.getters.getArseInfo.area, 'sss')
          if (select_building.extra_info.roof_area > this.store.getters.getArseInfo.area) {
            return {
              error: 'مساحت ساختمان بیش از عرصه است',
              result: null
            }
          }
          const data: addBuildingInterface = {
            geometry: {geoJson: this.featureToJson(select_building.feature, true)},
            info: select_building.extra_info
          }
          console.log(data)
          let res
          if (select_building.id) {
            res = await this.editBuilding(data, select_building.id)

          } else {
            res = await this.addBuilding(data, this.store.getters.getArseInfo.id)
          }
          if (res.result?.id) {
            select_building.id = res.result.id
            select_building.code = res.result.code
            this.$emit('selectBuilding', select_building)
            return {
              error: null,
              result: null
            }
          }
          return {
            error: 'خطا در ذخیره ساختمان',
            result: null
          }
        }

        return {
          error: 'اطلاعات برای ذخیره ساختمان کافی نیست',
          result: null
        }
      }

    }
  },


  watch: {},


});
</script>


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

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > th, .v-table--density-compact > .v-table__wrapper > table > thead > tr > th, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > th {
  /* height: calc(var(--v-table-header-height) - 16px); */
  height: 30px !important;
  font-size: 13px !important;
  color: #0c0c0c !important;
}

</style>
