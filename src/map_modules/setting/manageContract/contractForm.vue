<template>
  <v-slide-y-transition>
    <div
      v-if="show"
      style="
        height: 100%;
        width: 100%;
        background-color: #f3f3f33b;
        overflow: auto;
      "
    >
      <div class="pa-2 mysub">
        <v-row class="ma-0 pa-0">
          <p style="font-size: 10px; line-height: 20px">
            در این صفحه با تنظیم متن دلخواه میتوانید پیغام مورد نظر خود را در
            هنگام ورود به سامانه به کاربر نشان دهید و نیز این قابلیت وجود دارد
            که آن را غیر فعال نیز بکنید.
          </p>
        </v-row>
      </div>
      <v-row class="ma-0 pa-0" justify="center">
        <v-col cols="12" md="10" class="py-2">
          <v-form class="myForm" style="width: 100%; height: 100%">
            <v-row
              class="ma-0 pa-2 rounded-lg elevation-2"
              style="background-color: white"
            >
              <v-col class="ma-0 pa-0" cols="12">


                <v-row class="ma-0 px-2 pa-2 textArea">
                  <v-textarea
                    dir="rtl"
                    no-resize
                    rows="8"
                    background-color="light-blue"
                    color="black"
                    hint=""
                    persistent-hint
                    placeholder="متن توافق نامه : "
                    variant="solo"
                  >
                  </v-textarea>
                </v-row>

                <v-row class="pa-0 ma-0" justify="">
                  <v-col cols="5" class="pa-0 ma-0">
                    <v-checkbox label="فعال کردن نمایش متن  "></v-checkbox>
                  </v-col>

                </v-row>
              </v-col>

              <v-row class="ma-0 pa-0 mt-2" justify="end">
                <v-btn
                  class="elevation-1"
                  variant="tonal"
                  append-icon="mdi-content-save"
                  style="font-weight: bold !important; font-size: 10px"
                  rounded="lg"
                  size="small"
                  color="primary"
                  >ذخیره</v-btn
                >
              </v-row>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-slide-y-transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "contractFormComponent",
  components: {},
  data() {
    return {
      show: false,

      personImageSrc: null,

      items: ["بندر", "مشهد", "لار", "تفت"],
    };
  },
  props: {},
  methods: {
    addImage: function (value: any) {
      var reader = new FileReader();
      console.log(value);
      reader.onload = (e: any) => {
        this.personImageSrc = e.target.result;
      };
      reader.readAsDataURL(value.target.files[0]);
    },
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 500);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
