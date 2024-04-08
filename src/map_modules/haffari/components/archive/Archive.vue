<template>

  <popupWindow :topic="'آرشیو حفاری'" @close-window="router.push({name:'haffari'})" :close-btn="true"
               :resize="true"
               :top="winSize>500?'10px':'10px'"
               :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
               :min_width="winSize>500?'650px':'90dvw'" :max_height="winSize>500?'100vh':'100vh'"
               :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'60vh':'50vh'"
               :width="winSize>500?'50vw':'90vw'">

    <div style="height:100%;width:100%;overflow-y: hidden" class="bg-white">
      <div  style="height:100%;width:100%;" class="bg-grey-lighten-2 rounded-lg">

        <v-layout style="height: 100%;width:100%;" class="">
          <v-navigation-drawer
              v-model="drawer"
              :rail="rail"
              class="bg-blue-lighten-5 rounded-lg"
              permanent

          >
            <v-list-item
                prepend-avatar="@/assets/icons/image_folder.png"
                class="mr-2"
                style="cursor: pointer"
                title="گروه آرشیو"
                @click.stop="rail = !rail"
                nav
            >
              <template v-slot:append>
                <v-btn
                    variant="text"
                    size="small"
                    class="font-weight-bold"
                    color="info"
                    icon="mdi-chevron-right"
                    @click.stop="rail = !rail"
                ></v-btn>
              </template>
            </v-list-item>

            <v-divider v-show="!rail"></v-divider>

            <div style="height: calc(100% - 100px)" class="pa-2 ">
              <div v-show="!rail" style="width:100%;height:100%" v-if="archiveGroupList">
                <ArchiveTree :archive-group-list="archiveGroupList" @treeClick="treeClick" :group-select="true"
                             class=""></ArchiveTree>
              </div>
            </div>
            <v-divider></v-divider>
            <v-list-item
                prepend-avatar="@/assets/icons/add.png"
                class="mr-2 "
                style="cursor: pointer"
                title="اضافه کردن عکس"
                @click="addImage"
                nav
            >
              <template v-slot:append>
                <div
                    style="height:36px"
                ></div>
              </template>
            </v-list-item>
          </v-navigation-drawer>
          <v-main style="height:100%;width:100%;" class="" >
            <router-view :inputImages="[]"></router-view>

          </v-main>
        </v-layout>


      </div>
    </div>
  </popupWindow>


</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, onUpdated} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";
import ArchiveTree from "@/map_modules/survey/components/archive/archiveTree.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {ArchiveGroup} from "@/models/Survey.interface";
import {getArchiveListInterface} from "@/api/survey/SD.Models/getArchiveList.sd";
import survey_functions from "@/componentFunctions/survey_functions";
import {ArchiveData} from "@/store/survey/types";
import {da} from "vuetify/locale";
import popupWindow from "@/components/common/popupWindow.vue";


export default defineComponent({
  name: "ArchiveComponent",

  components: {popupWindow, SimpleDialog, ArchiveTree},


  props: {},

  setup(props) {
    const store = useStore();
    const toast = useToast()
    const router = useRouter()
    const route = useRoute()
    const {getArchiveImagesList, archiveImagesList, getArchiveGroup, archiveGroupList} = survey_functions()

    onMounted(async () => {


      await getArchiveGroup()
    })

    onUpdated(async () => {
      const archiveData: ArchiveData = store.getters.getArchiveData
      if (String(route.name).includes('List')) {
        console.log('ssss')
      }

    })

    return {
      store, toast, router, route, getArchiveImagesList, archiveImagesList, archiveGroupList
    }
  },

  data() {
    return {
      drawer: true,
      rail: true,

    }
  },
  methods: {
    addImage() {
      if (!this.route.fullPath.includes('archive/add') && !this.route.fullPath.includes('archive/edit')) {

        this.router.push({path: `${this.route.fullPath}/add`})
      }
    },
    async treeClick(item: ArchiveGroup) {
      let data: getArchiveListInterface = {
        group: null,
        master: null,
        subsystem: null,
        archive_type: null
      }

      if (item.master && item.group && item.subsystem) {
        data['master'] = item.master
        data['subsystem'] = item.subsystem
        data['group'] = item.group
        data['archive_type'] = item.id
      } else if (item.master && item.subsystem) {
        data['master'] = item.master
        data['subsystem'] = item.subsystem
        data['group'] = item.id
        data['archive_type'] = null
      } else if (item.master) {
        data['master'] = item.master
        data['subsystem'] = item.id
        data['group'] = null
        data['archive_type'] = null
      } else {
        data['master'] = item.id
        data['subsystem'] = null
        data['group'] = null
        data['archive_type'] = null
      }

      const archiveData: ArchiveData = this.store.getters.getArchiveData
      data = {...data, ...archiveData}

      await this.getArchiveImagesList(data)


    }
  },

  watch: {},

  computed: {
    winSize() {
      return window.innerWidth
    },
  },

  mounted() {
    // this.store.commit(SurveyMutations.SET_MAP_DISABLE, true)
    // console.log(this.store.getters.getMapDisable)
  },


});
</script>


<style>

</style>
