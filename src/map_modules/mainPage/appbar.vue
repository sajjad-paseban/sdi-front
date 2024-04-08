<template>
  <v-row
    style="
      border-bottom-right-radius: 0.375rem !important;
      border-bottom-left-radius: 0.375rem !important;position: absolute;z-index: 100001;width:100%;height: 15px;
    "
    color=""
    location="top"
    class="ma-0 pa-0 bg-themeBars elevation-3"
  >
    <v-avatar size="15" class="mx-3" @click="startClick" style="cursor: pointer;">
      <v-img class="" src="@/assets/icons/slider.png" alt="John"></v-img>
    </v-avatar>

    <v-spacer></v-spacer>
    <clock></clock>
    <v-spacer></v-spacer>
    <logo></logo>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Logo from "./logo.vue";
import Clock from "./Clock.vue";

export default defineComponent({
  name: "appBar",
  components: { Logo, Clock },
  data() {
    return {};
  },
  props: {
    msg: String,
  },
  methods: {
    startClick: function () {
      this.$emit("settingClick", true);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.myAppBarclass .v-toolbar__content {
  height: 15px !important;
}
</style>
>
