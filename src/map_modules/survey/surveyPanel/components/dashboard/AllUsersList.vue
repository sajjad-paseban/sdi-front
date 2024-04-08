<template>
  <div style="height:100%;width:100%;overflow-y: hidden" class="bg-white">
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
      <div v-if="initData&&route.name=='allUsersList'" style="height:100%;width:100%;position: relative;"
           class="pa-1 pl-1">
        <v-btn @click="showFilter" v-tooltip.right="'فیلتر'" class="elevation-5"
               style="position: absolute;left:20px;bottom:23px"
               icon size="small">
          <v-avatar size="22" class="">
            <v-img
                class=""
                src="@/assets/icons/filter.png"
                alt="John"
            ></v-img>
          </v-avatar>
        </v-btn>
        <v-btn @click="router.push({name:'allUsersListChart'})" v-tooltip.right="'نمودار'"
               class="elevation-5"
               style="position: absolute;left:20px;bottom:72px"
               icon size="small">
          <v-avatar size="30" class="">
            <v-img
                class=""
                src="@/assets/icons/circleChart.png"
                alt="John"
            ></v-img>
          </v-avatar>
        </v-btn>
        <v-row class="ma-0 pa-0  px-3 rounded-lg mx-n1  elevation-2 " style="height:25px">
          <v-btn @click="filterByUserType=='کنترلر'?filterByUserType=null:filterByUserType='کنترلر'"
                 :style="filterByUserType=='کنترلر'?'background-color:#a6d5fa8c;':''"
                 class="font-weight-bold rounded-pill mx-1" style="font-size: 9px!important;" size="x-small"
                 variant="outlined" color="info">کنترلر
          </v-btn>
          <v-btn @click="filterByUserType=='ممیزی'?filterByUserType=null:filterByUserType='ممیزی'"
                 :style="filterByUserType=='ممیزی'?'background-color:#a6d5fa8c;':''"
                 class="font-weight-bold rounded-pill mx-1 " style="font-size: 9px!important;" size="x-small"
                 variant="outlined" color="info">ممیزکار
          </v-btn>
        </v-row>
        <div style="height:calc(100% - 25px);width:100%;overflow-y: auto" class="font-weight-bold pl-1 mt-1">

          <v-row class="ma-0 pa-0  mt-n2" justify="center">
            <v-col cols="12" sm="12">
              <div v-for="(item,index) in showUsersList"
                   :key="index"
                   style="width: 100%"
                   class=" pa-1 my-1">
                <div class="bg-white elevation-2 rounded-lg "
                     style="border: 1px solid rgba(0,0,0,0.32)">
                  <v-row class="ma-0 pa-0 myForm pa-2 bg-grey-lighten-4 rounded-lg"
                         style="font-size: 10px">

                    <v-col cols="12" sm="6" md="4" class=""
                           style="height: 35px"
                    >
                      <div class="bg-white elevation-2 border-t rounded pa-2"
                           style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                        <p style="color:#0461be">{{ 'نام متصدی : ' }}</p>
                        &nbsp;
                        {{ item.user.first_name }} &nbsp;{{ item.user.last_name }}
                      </div>

                    </v-col>
                    <v-col cols="12" sm="6" md="4" class=""
                           style="height: 35px"
                    >
                      <div class="bg-white elevation-2 border-t rounded pa-2"
                           style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                        <p style="color:#0461be">{{ 'تعداد کل ملک های محدوده : ' }}</p>
                        &nbsp;
                        {{ item.all_estimated_features }}
                      </div>

                    </v-col>
                    <v-col cols="9" sm="6" md="4" class=""
                           style="height: 35px"
                    >
                      <div class="bg-white elevation-2 border-t rounded pa-2"
                           style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                        <p style="color:#0461be">{{ 'تعداد کل ملک های انجام شده :  ' }}</p>
                        &nbsp;
                        {{ item.features_done }}
                      </div>

                    </v-col>

                    <v-col cols="6" sm="6" md="4" class=""
                           style="height: 35px"
                    >
                      <div class="bg-white elevation-2 border-t rounded pa-2"
                           style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                        <p style="color:#0461be">{{ 'درصد پیشرفت : ' }}</p>
                        &nbsp;
                        {{
                          item.features_done !== 0 ? (item.all_estimated_features / item.features_done * 100).toFixed(2) : 0
                        }}&nbsp;%
                      </div>

                    </v-col>
                    <v-col cols="6" sm="6" md="4" class=""
                           style="height: 35px"
                    >
                      <div class="bg-white elevation-2 border-t rounded pa-2"
                           style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">
                        <p style="color:#0461be">{{ 'تاریخ پایان : ' }}</p>
                        &nbsp;
                        {{
                          item.biggest_end_date ? getDate(item.biggest_end_date) : 'بدون تاریخ'
                        }}
                      </div>

                    </v-col>

                    <v-col cols="12" sm="6" md="4" class="ma-0 pa-0  text-center"
                           style="height: 50px;"
                    >
                      <!--                                            <div class="bg-white elevation-2 border-t rounded pa-2"-->
                      <!--                                                 style="display:flex;;flex-wrap: wrap;align-content: center;height: 100%">-->
                      <!--                                                <p style="color:#0461be">{{ 'نوع کاربر: ' }}</p>-->
                      <!--                                                &nbsp;-->
                      <!--                                                {{ item.user_type }}&nbsp;-->
                      <!--                                            </div>-->
                      <v-row class="pa-0 ma-0" style="position: relative" justify="center">
                        <v-img v-if="item.user_type=='کنترلر'" width="55" height="55" src="@/assets/icons/find_user.png"
                               alt="John"></v-img>
                        <v-img v-else width="55" height="55" class="ma-n1" src="@/assets/icons/surveyMan.png"
                               alt="John"></v-img>
                        <v-avatar style="position: absolute;left:58%;top:30%;z-index: 1001" size="40"
                                  class="elevation-2">
                          <v-img cover class="ma-1"
                                 :src="item.user.image?store.state.backendUrl+item.user.image:store.state.frontUrl+'/icons/person.png'"
                                 alt="John"></v-img>
                        </v-avatar>

                      </v-row>


                    </v-col>


                  </v-row>
                  <div style="height:40px;width:100%"
                       class="bg-grey-lighten-1 border-t rounded-b-lg">
                    <v-row class="ma-0 pa-0 pr-3 border-t" justify="start" align="center"
                           style="height: 100%">
                      <v-btn
                          v-tooltip.top="'مشاهده'"
                          @click="item.user_type == 'ممیزی'?router.push({name:'allUserExtentsList',params:{id:item.id,name:`${item.user.first_name} ${item.user.last_name}`}}):router.push({name:'allCheckerExtentsList',params:{id:item.id,name:`${item.user.first_name} ${item.user.last_name}`}})"
                          icon
                          variant="text"
                          size="x-small"
                          color="primary"
                          style="font-weight: bold !important"
                      >
                        <v-img
                            width="22"
                            class=""
                            src="@/assets/icons/see.png"
                            alt="John"
                        ></v-img>
                      </v-btn>

                      <div v-if="item.color" class="rounded mr-4  bg-white"
                           style="width:22px;height:22px;">
                        <div style="width:22px;height:22px;" class="rounded"
                             :style="`background-color : ${item.color}`"></div>
                      </div>

                      <v-btn
                          v-show="false"
                          icon
                          variant="text"
                          size="x-small"
                          color="primary"
                          style="font-weight: bold !important"
                          class="mr-2"
                      >
                        <v-img
                            width="25"
                            class=""
                            src="@/assets/icons/circleChart.png"
                            alt="John"
                        ></v-img>
                      </v-btn>

                    </v-row>
                  </div>


                </div>

              </div>
            </v-col>
          </v-row>

        </div>


      </div>
    </v-fade-transition>

    <v-fade-transition>
      <div v-if="initData&&route.name=='allUsersListChart'" style="height:100%;width:100%;position: relative;"
           class="pa-2 pl-1">
        <router-view :data="chartData" :columns="chartColumns"></router-view>
      </div>
    </v-fade-transition>

    <simple-dialog
        :show="filterDialog"
        :topic="'تنظیمات فیلتر'"
        width="50vw"
        :height="$vuetify.display.smAndUp?'50vh':'70vh'"
        :current_height="'80vh'"
        @closeDialog="filterDialog=false"
        class="bg-grey-lighten-2"
    >
      <Filter v-if="filterInitData" @do-filter="doFilter" :filterKeys="filterKeys"
              :init="filterInitData"></Filter>
      <Filter v-else @do-filter="doFilter" :filterKeys="filterKeys"></Filter>

    </simple-dialog>


  </div>


</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import ArseInfo from "@/map_modules/survey/components/arse/ArseInfo.vue";
import SaveArse from "@/map_modules/survey/components/arse/SaveArse.vue";
import SidesInfo from "@/map_modules/survey/components/arse/sidesInfo/SidesInfo.vue";
import ArseExtraInfo from "@/map_modules/survey/components/arse/ArseExtraInfo.vue";
import {SurveyMutations} from "@/store/survey/mutations";
import ArseBaseInfoComponent from "@/map_modules/survey/components/arse/ArseBaseInfo.vue";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import {AllUsersList, CheckerRegionInfo, SurveyRegionInfo} from "@/models/SurveyPanel.interface";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import Filter from "@/map_modules/survey/surveyPanel/components/myFilter/Filter.vue";
import {DoFilterResult, KeyModel} from "@/map_modules/survey/surveyPanel/components/myFilter/myFilterModels";
import {ChartColumn} from "@/map_modules/survey/surveyPanel/components/myChart/myChartModels";
import {OpenLayerAction} from "@/store/openLayer/actions";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import {color} from "chart.js/helpers";

import {default as map} from "ol/Map";

export default defineComponent({
  name: "AllUsersListComponent",

  components: {

    Filter,
    SimpleDialog,
    ArseBaseInfoComponent,
    ArseInfo,
    SaveArse,
    SidesInfo,
    ArseExtraInfo,

  },


  setup(props) {
    const store = useStore();
    const toast = useToast()
    const router = useRouter()
    const route = useRoute()

    const usersList = ref<AllUsersList[]>([])
    const showUsersList = ref<AllUsersList[]>([])
    const sub_map = computed(() => {
      return store.getters.getSubMap
    });


    const {
      getSurveyRegionInfo,
      surveyRegionInfoList,
      getCheckerRegionInfo,
      checkerRegionInfoList,
      getDate
    } = survey_panel_functions()


    function getUsersList(surveys: SurveyRegionInfo[], checkers: CheckerRegionInfo[]) {
      usersList.value = []
      surveys.map((item) => {
        usersList.value.push({...item, user_type: 'ممیزی'})
      })
      checkers.map((item) => {
        usersList.value.push({...item, user_type: 'کنترلر'})
      })

      showUsersList.value = [...usersList.value]

    }

    async function setShowFeatures() {
      const features: Feature[] = []
      const geoJsonFormat = new GeoJSON({})

      showUsersList.value.map((item, index) => {
        item.features.map((i) => {
          let find = false
          features.map((f) => {
            if (JSON.stringify(geoJsonFormat.writeGeometry(f.getGeometry())) === JSON.stringify(geoJsonFormat.writeGeometry(i.getGeometry()))) {
              f.set('text', `${f.get('text')} \n ${item.user.first_name} ${item.user.last_name}`)
              // if (f.get('text') !== `${item.user.first_name} ${item.user.last_name}`)
              //     f.set('panel',index)
              find = true
            }
          })


          if (!find) {
            const f: Feature = i.clone()
            f.set('panel', index)
            f.set('text', `${item.user.first_name} ${item.user.last_name}`)
            features.push(f)
          }

        })
      })
      await store.commit(SurveyMutations.SET_SHOW_FEATURES, features)
    }

    function setFeaturesColors() {
      const features = store.getters.getShowFeatures
      showUsersList.value.map((user) => {
        features.map((feature) => {
          if (feature.get('text')) {
            if (feature.get('text').includes(`${user.user.first_name} ${user.user.last_name}`) && feature.getStyle()) {
              const color = feature.getStyle()[0].getFill().getColor()
              if (color) {
                user.color = color
              }

            }
          }

        })
      })

    }

    const initData = ref(false)

    onMounted(async () => {

      store.commit(SurveyMutations.SET_PANEL_TOPIC, 'داشبورد مدیریتی')
      if (sub_map.value) {
        const center = store.getters.getMapConfig.center
        const zoom = store.getters.getMapConfig.currentZoom
        sub_map.value.getView().animate({zoom: zoom}, {center: center})
      }

      await getSurveyRegionInfo()
      await getCheckerRegionInfo()
      getUsersList(surveyRegionInfoList.value, checkerRegionInfoList.value)
      await setShowFeatures()
      setFeaturesColors()

      await store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, [])

      initData.value = true
    })


    return {
      getDate,
      store,
      toast,
      router,
      route,
      sub_map,
      initData,
      surveyRegionInfoList,
      checkerRegionInfoList,
      usersList,
      showUsersList,
      setShowFeatures,
      setFeaturesColors

    }
  },

  data() {
    return {
      filterDialog: false,
      filterKeys: [] as KeyModel[],
      filterInitData: null as DoFilterResult | null,

      chartColumns: [
        {name: 'کل ملک های محدوده', backcolor: 'rgba(6,198,245,0.85)', borderColor: 'rgba(6,198,245,0.85)'}
      ] as ChartColumn[],

      filterByUserType: null as string | null
    }
  },
  methods: {
    async doFilter(data: DoFilterResult) {
      this.showUsersList = [...this.usersList]
      data.keys.map((item) => {
        if (item.value !== null) {
          if (item.name == 'userName') {
            this.showUsersList = this.showUsersList.filter((i) => {
              return `${i.user.first_name} ${i.user.last_name}`.includes(item.value)
            })
          } else if (item.name == 'biggest_end_date') {
            this.showUsersList = this.showUsersList.filter((i) => {
              if (i.biggest_end_date) {
                return Date.parse(item.value[0]) < Date.parse(i.biggest_end_date) && Date.parse(i.biggest_end_date) < Date.parse(item.value[1])
              } else return false

            })

          } else if (item.name == 'index') {
            this.showUsersList = this.showUsersList.filter((i, index) => {
              return index + 1 === parseFloat(item.value)
            })

          } else {
            this.showUsersList = this.showUsersList.filter((i) => {
              if (item.type == 'string') {
                return i[item.name].includes(item.value)
              } else {
                console.log(typeof item.value, typeof i[item.name])
                if (item.type === 'number') {
                  return i[item.name] === parseFloat(item.value)
                } else {
                  return i[item.name] === item.value
                }

              }
            })
          }
        }

      })

      this.showUsersList.sort((a, b) => {
        if (data.sortValue == 'کم به زیاد') {
          if (a[data.sortKeyName] < b[data.sortKeyName]) return -1
          if (a[data.sortKeyName] > b[data.sortKeyName]) return 1
          else return 0
        } else {
          if (a[data.sortKeyName] < b[data.sortKeyName]) return 1
          if (a[data.sortKeyName] > b[data.sortKeyName]) return -1
          else return 0
        }

      })
      this.filterDialog = false
      this.filterInitData = data

      await this.setShowFeatures()
      this.setFeaturesColors()
      this.filterByUserType = null
    },
    showFilter() {
      this.filterKeys = [
        {
          name: 'userName',
          f_name: 'نام متصدی',
          type: 'string',
          value: null
        },
        {
          name: 'all_estimated_features',
          f_name: 'تعداد کل ملک های محدوده',
          type: 'number',
          value: null
        },
        {
          name: 'features_done',
          f_name: 'تعداد کل ملک های انجام شده',
          type: 'number',
          value: null
        },
        {
          name: 'biggest_end_date',
          f_name: 'تاریخ پایان',
          type: 'date',
          value: null
        },
        {
          name: 'user_type',
          f_name: 'نوع کاربر',
          type: 'string',
          value: null
        },

      ]

      this.filterDialog = true
    },
  },
  computed: {
    chartData() {
      return this.showUsersList.map((item) => {

        const newItem = {
          'کل ملک های محدوده': item.all_estimated_features,
          'کل ملک های انجام شده': item.features_done,
          'درصد پیشرفت': item.features_done !== 0 ? parseFloat((item.all_estimated_features / item.features_done * 100).toFixed(2)) : 0
        }

        return {
          name: `${item.user.first_name} ${item.user.last_name}`,
          item: newItem
        }
      })
    },

  },
  watch: {
    filterByUserType() {
      this.showUsersList = [...this.usersList]
      if (this.filterByUserType) {
        this.showUsersList = this.showUsersList.filter((item) => {
          return item.user_type == this.filterByUserType;
        })
      }
    }
  },
  props: {
    map: {
      required: true,
      type: map
    }
  },

});
</script>


<style>


</style>
