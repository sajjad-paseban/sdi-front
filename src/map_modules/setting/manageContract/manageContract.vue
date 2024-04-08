<template>
  <div class="pa-2" dir="rtl" style="height: 100%;width: 100%;min-width: 400px;">
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
  name: "manageContractComponent",
  components: {},
  data() {
    return {
      tab: "manageContractForm",

      items: [
        {
          icon: "phone",
          text: "مدیریت توافق نامه",
          route: "manageContractForm",
        },


      ],
    };
  },
  props: {},
  methods: {

    changeTab(){
      this.$router.push({name:this.tab})
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
