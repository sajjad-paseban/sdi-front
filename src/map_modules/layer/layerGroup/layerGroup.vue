<template>
  <div class="pa-2" dir="rtl" style="height: 100%;width: 100%">
    <v-card bg-color="active" class="ma-1" style="height: 100%; overflow: auto; ">
      <v-tabs style="background-color: #e8e8e8;" class="" v-model="tab" color="primary"    show-arrow @update:modelValue="changeTab">
        <v-tab  :value="item.route" v-for="item in items" :key="item.text">
          <!-- <v-icon>mdi-{{ item.icon }}</v-icon> -->
          {{ item.text }}
        </v-tab>
      </v-tabs>

      <v-window v-model="tab" style="height: calc(100% - 31px);width: 100%;" >

        <router-view></router-view>

      </v-window>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";



export default defineComponent({
  name: "LayerGroupComponent",
  components: {},
  data() {
    return {
      tab: "groupLayerList",

      items: [
        {
          icon: "phone",
          text: "مدیریت گروه ها",
          route: "groupLayerList",
        },
        {
          icon: "phone",
          text: "افزودن گروه",
          route: "addLayerGroup",
        },
        {
          icon: "phone",
          text: "ویرایش گروه",
          route: "editGroup",
        },

      ],
    };
  },
  watch:{
    $route (to){
      this.tab = to.name
    }
  },
  props: {},
  methods: {

    changeTab: function () {
      if (this.tab !== 'editGroup') {
        this.$router.push({name: this.tab})
      } else {
        this.tab = String(this.$route.name)
        this.$toast.add({group: 'br', life: 4000, severity: 'error', summary: ' خطا', detail: 'گروه انتخاب نشده است '});
      }
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
