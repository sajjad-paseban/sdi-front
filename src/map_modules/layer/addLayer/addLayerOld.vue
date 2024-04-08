<template>
  <div dir="rtl" style="width: 100%; height: 100%; overflow-x: auto">
    <div class="pa-2" style="width: 100%; height: 100%">
      <div style="width: 100%; height: 100%">
        <v-row class="pa-0 ma-0 addLayer addLayerHeader myForm" align="center" >
          <v-col cols="12" md="12">
            <Fieldset legend="اضافه کردن لایه">
              <p class="pb-2">
                در این فرم امکان افزودن لایه مد نظر از روش های مختلف به سامانه
                مقدور میباشد.
              </p>
              <p>
                با انتخاب روش مد نظر و انجام مراحل آن لایه مورد نظر را به سامانه
                اضافه کنید
              </p>
            </Fieldset>
          </v-col>

          <v-col cols="12" md="4" align="center" class="myFile ">
            <v-select
              v-model="addLayerType"
              chips
              clearable
              prepend-inner-icon="mdi-bookmark-plus-outline"
              variant="solo"
              :items="items"
              item-title="text"
              item-value="value"
              label="انتخاب روش افزودن لایه"
              density="compact"

              @update:modelValue="selectTypeOfAddLayer"
            ></v-select>
          </v-col>
        </v-row>
        <!-- <v-row class="ma-0 pt-0 pa-0">
            <v-col class="ma-0 pa-0 py-2" cols="12" md="4">

            </v-col>
          </v-row> -->

        <div class="pa-0 ma-0 addLayerContent" style="">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tooltip from "primevue/tooltip";
import Fieldset from "primevue/fieldset";
import D from "@/components/d.vue";

interface Items {
  label: string;
  to: string;
  des: string;
}

export default defineComponent({
  name: "AddLayer",
  components: { Fieldset },
  data() {
    return {
      items: [
        {
          text: "افزودن لایه با فایل",
          value: "upload",
        },
        {
          text: "افزودن لایه خام",
          value: "emptyLayerConfig",
        },
        {
          text: "افزودن لایه با پرس جو از یک لایه مد نظر",
          value: "addLsearchInLayer",
        },
        {
          text: "افزودن لایه با پرس جو از چند لایه مد نظر",
          value: "connection",
        },
        {
          text: "ایجاد لایه از پرس جو در دیتابیس متصل و لایه مد نظر ",
          value: "addLsearchInDatabase",
        },
        {
          text: "افزودن لایه از طریق وب سرویس",
          value: "service",
        },
      ],

      addLayerType: "افزودن لایه با فایل",
    };
  },
  directives: {},

  props: {},
  methods: {
    selectTypeOfAddLayer(data: null | string) {
      if (data) {
        this.$router.push({ name: data });
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

@media only screen and (max-width: 900px) {
  .addLayerHeader{
  height: 37px!important;
}
}

  .addLayerHeader{
  height: 130px;
}

.addLayerContent{
  height: calc(100% - 130px)
}
@media only screen and (max-width: 900px) {
.addLayerContent{
  height: calc(100% - 36px)!important;
}
}
</style>
