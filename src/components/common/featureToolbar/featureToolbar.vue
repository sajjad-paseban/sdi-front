<template>
  <popupWindow v-if="winSize!==0" :resize="false" :top="winSize>500?'30px':'50px'"
               :left="winSize>500?(left?left:`${winSize/2}px`):'10px'" :max_width="winSize>500?'500px':'50px'"
               :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100px':'400px'"
               :min_height="winSize>500?'20px':'40px'" :height="winSize>500?height.desktop:height.mobile"
               :width="winSize>500?width.desktop:width.mobile">
    <div dir="rtl" style="background-color: rgba(255,255,255,0);height: 100%"
         class="bg-grey-lighten-5 rounded-lg ">
      <v-btn v-if="showClose" @click="closeClick" density="compact" icon size="small" position="fixed"
             class="mt-n2 mr-n2 ">
        <v-tooltip activator="parent" location="right">صفحه اصلی</v-tooltip>
        <v-icon size="x-small" icon="mdi-close"></v-icon>
      </v-btn>
      <div class="" style="position: fixed;" :style="winSize>500?'margin-top:43px':'margin-top:15px'">
        <slot></slot>
      </div>
      <v-row class="ma-0 pa-0 drag-container3" justify="center" align="center" style="height: 100%">
        <template v-for="(item, index) in items" :key="index">
          <v-divider color="primary" :class="winSize>500?'mr-2':'mx-2'" :inset="winSize>500"
                     :vertical="winSize>500" v-if="item.divider"></v-divider>

          <v-btn v-else @click="$emit('itemClick',item)"
                 :disabled="item.disabled===undefined?false:item.disabled"
                 size="x-small" icon class="  rounded-lg " color=""
                 :class="(winSize>500?'mr-2':'') + (item.active?' featureActive':'')">
            <v-tooltip activator="parent" location="top">{{ item.name }}</v-tooltip>
            <v-avatar size="17" class="">
              <v-img :src="store.state.frontUrl+item.icon" alt="John"></v-img>
            </v-avatar>
          </v-btn>
        </template>


      </v-row>
    </div>
  </popupWindow>

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

import popupWindow from "@/components/common/popupWindow.vue";
import {FTItemsInterface, ToolSize} from "@/components/common/featureToolbar/interface";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Map from 'ol/Map.js';


export default defineComponent({
  name: "FeatureToolbarComponent",
  components: {
    popupWindow
  },
  emits: ['itemClick', 'close'],

  setup() {
    const store = useStore()
    const router = useRouter()
    return {
      store, router
    }
  },

  data() {
    return {
      winSize: 0,
    };
  },

  props: {
    items: {
      type: Array as PropType<FTItemsInterface[]>,
      required: true
    },
    width: {
      type: Object as PropType<ToolSize>,
      required: true
    },
    height: {
      type: Object as PropType<ToolSize>,
      required: true
    },
    left: {
      type: String,
      required: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeAction: {
      type: Function,
      required: false
    }
  },

  methods: {
    closeClick() {
      if (this.closeAction) {
        this.closeAction()
      } else {
        this.router.push({name: 'home'})
      }
      this.$emit('close', true)
    }
  },

  mounted(): void {
    this.winSize = window.innerWidth
    const map: Map = this.store.getters.getSubMap
    if (map) {
      const mapSize = map.getSize()
      if (mapSize) {
        this.winSize = mapSize[0]
        console.log(this.winSize)
      }
    } else {
      const map: Map = this.store.getters.getMap
      const mapSize = map.getSize()
      if (mapSize) {
        this.winSize = mapSize[0]
        console.log(this.winSize)
      }
    }

    console.log(this.items)
  },

  watch: {},


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.featureActive {
  background-color: rgba(var(--v-theme-primary_active)) !important;
}
</style>
