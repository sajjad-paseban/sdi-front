<template>

    <popupWindow :topic="'اطلاعات حفاری'" @close-window="router.push({name:'haffari'})" :close-btn="true"
                 :resize="true"
                 :top="winSize>500?'10px':'10px'"
                 :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
                 :min_width="winSize>500?'650px':'90dvw'" :max_height="winSize>500?'100vh':'100vh'"
                 :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'60vh':'50vh'"
                 :width="winSize>500?'50vw':'90vw'">

      <div style="height:100%;width:100%;overflow-y: hidden" class="bg-white">
        <v-fade-transition>
          <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            ></v-progress-circular>
          </v-row>
        </v-fade-transition>
        <v-fade-transition>
          <v-row v-if="initData" style="height:100%" class="ma-0 pa-2" justify="center" align="center">
            test
          </v-row>
        </v-fade-transition>
      </div>

    </popupWindow>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import layerTree from "@/map_modules/layer/common/layerTree.vue";
import {LayerTree} from "@/models/Layer.Interface";
import ArchiveTree from "@/map_modules/survey/components/archive/archiveTree.vue";
import {Archive, ArchiveGroup, Arse} from "@/models/Survey.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import {ArchiveData} from "@/store/survey/types";
import popupWindow from "@/components/common/popupWindow.vue";


export default defineComponent({
  name: "AddArchiveComponent",

  components: {popupWindow, SimpleDialog},


  setup(props) {
    const store = useStore();
    const toast = useToast()
    const router = useRouter()
    const route = useRoute()
    const {nameRule, floatRule, phoneRule} = rules()

    const initData = ref(false)

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
      initData,

    }
  },
  computed: {
    winSize() {
      return window.innerWidth
    },
  },
  data() {
    return {}
  },
  methods: {},

  watch: {},


});
</script>


<style>


</style>
