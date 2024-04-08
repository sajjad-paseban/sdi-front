<template>
  <v-slide-y-transition>
    <div v-if="show" class="py-1" style="height: 100%">
      <v-card
        class="ma-0 pa-0"
        style="height: 100%; display: grid; overflow: auto"
      >
        <div class="pa-2 pt-4">
          <v-row class="ma-0 pa-0 mysub">
            <p style="font-size: 10px; line-height: 20px">
              لطفا در صورتی که از انجام مراحل ۱ تا ۴ مطمئن هستید کلید ثبت را
              فشار دهید. در غیر این صورت از کلید های قبلی و بعدی لایه را ویرایش
              کنید.
            </p>
          </v-row>
        </div>
        <v-row class="ma-0 pt-0 ">
          <v-row class="ma-0 pa-0">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="tonal"
              append-icon="mdi-content-save"
              rounded="lg"
              class="elevation-1"
              @click="saveLayerDialog = true"
            >
              ثبت
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-row>
      </v-card>
    </div>
  </v-slide-y-transition>
  <v-dialog v-model="saveLayerDialog" height="70vh" scrollable>
    <v-row justify="center" class="ma-0 pa-0" style="height: 100%">
      <v-card
        style="overflow: auto"
        dir="rtl"
        width="60%"
        max-height="100%"
        height="max-content"
        min-width="350px"
      >
        <div dir="ltr">
          <div class="startBar">
            <v-btn
              @click="saveLayerDialog = false"
              style="z-index: 1001 !important; margin-top: -10px"
              class="ml-1"
              width="20px"
              height="20px"
              position="fixed"
              color="white"
              size="small"
              variant="text"
            >
              <v-icon>mdi-close</v-icon></v-btn
            >
          </div>

          <div dir="rtl">
            <v-slide-y-transition>
              <v-btn
                style="
                  z-index: 1000 !important;
                  font-size: 12px;
                  height: 20px;
                  color: white;
                  margin-top: -10px;
                  width: 60%;
                  min-width:350px!important
                "
                flat
                class="metaDataDialog"
                color="dialogBar"
                position="fixed"
                size="x-small"
              >
                عملیات ذخیره لایه
              </v-btn>
            </v-slide-y-transition>
          </div>
        </div>

        <div
          class="pa-2"
          dir="rtl"
          style="
            padding-top: 15px !important;
            overflow: auto;
            height: 100%;
            background-color: #dee2e62b;
          "
        >
          <Fieldset
            style="height: max-content; margin-inline: 20px !important"
            legend="ذخیره لایه"
          >
            <p class="pb-2">
              لطفا تا اتمام تک تک مراحل اضافه کردن لایه ُ شکیبا باشد تا لایه به
              صورت کامل در سامانه قرار گیرد.
            </p>
            <p></p>
          </Fieldset>

          <v-card
            class="ma-0 pa-0"
            style="
              height: max-content;
              display: grid;
              overflow: auto;
              margin-block: 10px !important;
              margin-inline: 20px !important;
            "
          >
            <div class="pa-4 px-8" style="height: max-content">
              <v-timeline
                style="height: 66%"
                side="end"
                truncate-line="both"
                density="compact"
                class=""
              >
                <v-timeline-item
                  v-for="item in items"
                  :key="item.id"
                  :dot-color="item.color"
                  size="small"
                  :icon="item.icon"
                >
                  <p style="font-size: 12px">
                    {{ item.text }}
                  </p>
                </v-timeline-item>
              </v-timeline>

              <v-row class="ma-0 pa-0">
                <v-spacer></v-spacer>
                <div style="display: grid">
                  <v-progress-circular
                    :rotate="360"
                    :size="60"
                    :width="5"
                    :model-value="value"
                    color="primary"
                  >
                    {{ value }}
                  </v-progress-circular>
                  <p style="font-size: 12px">لطفا صبر کنید</p>
                </div>

                <v-spacer></v-spacer>
              </v-row>

              <v-row class="ma-0 pa-0">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="text"
                  rounded="lg"
                  style="font-weight: bold !important"
                  size="small"
                  @click="saveLayerDialog = true"
                >
                  تایید
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </div>
      </v-card>
    </v-row>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Fieldset from "primevue/fieldset";
export default defineComponent({
  name: "saveLayerComponent",
  components: { Fieldset },
  data() {
    return {
      show: false,

      saveLayerDialog: false,

      items: [
        {
          id: 1,
          text: "بارگزاری فایل ",
          color: "info",
          icon: "mdi-information-variant",
        },
        {
          id: 2,
          color: "info",
          text: "تنظیم مشخصات لایه",
          icon: "mdi-information-variant",
        },
        {
          id: 3,
          text: "تنظیم مشخصات ظاهر لایه",
          color: "info",
          icon: "mdi-information-variant",
        },
        {
          id: 4,
          color: "info",
          text: "تنظیم اقلام توصیفی",
          icon: "mdi-information-variant",
        },
      ],

      interval: 0 as any,
      value: 0,
    };
  },
  props: {},
  methods: {
    changeIconTimer(active: boolean) {
      if (active) {
        setTimeout(() => {
          this.items[0].color = "success";
          this.items[0].icon = "mdi-check";
        }, 2000);
        setTimeout(() => {
          this.items[1].color = "success";
          this.items[1].icon = "mdi-check";
        }, 4000);
        setTimeout(() => {
          this.items[2].color = "success";
          this.items[2].icon = "mdi-check";
        }, 6000);
        setTimeout(() => {
          this.items[3].color = "success";
          this.items[3].icon = "mdi-check";
        }, 8000);
      } else {
        this.items = [
          {
            id: 1,
            text: "بارگزاری فایل ",
            color: "info",
            icon: "mdi-information-variant",
          },
          {
            id: 2,
            color: "info",
            text: "تنظیم مشخصات لایه",
            icon: "mdi-information-variant",
          },
          {
            id: 3,
            text: "تنظیم مشخصات ظاهر لایه",
            color: "info",
            icon: "mdi-information-variant",
          },
          {
            id: 4,
            color: "info",
            text: "تنظیم اقلام توصیفی",
            icon: "mdi-information-variant",
          },
        ];
      }
    },
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 300);
  },

  watch: {
    saveLayerDialog() {
      if (this.saveLayerDialog) {
        setTimeout(() => {
          this.changeIconTimer(true);
        }, 300);

        this.interval = setInterval(() => {
          if (this.value === 75) {
            clearInterval(this.interval);
          }
          this.value += 25;
        }, 1900);
      } else {
        clearInterval(this.interval);
        this.value = 0;
        this.changeIconTimer(false);
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-timeline--vertical.v-timeline {
  grid-row-gap: 11px !important;
  height: 100%;
}
</style>
