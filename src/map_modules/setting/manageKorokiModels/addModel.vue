<template>
  <v-slide-y-transition>
    <div
      v-if="show"
      style="
        height: 100%;
        width: 100%;
        min-width: 300px;
        overflow-x: auto;
        background-color: #f3f3f33b;
        overflow: auto;
      "
    >
      <div class="pa-2 mysub">
        <v-row class="ma-0 pa-0">
          <p style="font-size: 10px; line-height: 20px">
            در این بخش با انتخاب و پر کردن فیلد های زیر میتوانید آیپی مورد نظر
            خود را ایجاد نمایید .
          </p>
        </v-row>
      </div>
      <v-row class="ma-0 pa-0" justify="center">
        <v-col cols="12" class="py-2">
          <v-form class="myForm" style="width: 100%; height: 100%">
            <v-row
              class="ma-0 pa-2 rounded-lg elevation-2"
              style="background-color: white"
            >
              <v-col class="ma-0 pa-0" cols="12">
                <v-row class="pa-0 ma-0">
                  <v-col cols="12" md="4" class="ma-0">
                    <v-text-field density="compact" variant="solo" required>
                      <template v-slot:prepend-inner>
                        <v-icon color="primary" icon="mdi-format-color-text" />
                      </template>

                      <template v-slot:label>
                        <!-- <p  class="text-primary">نام لایه</p> -->
                        <p class="">نام مدل</p>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-autocomplete
                      :items="items"
                      density="compact"
                      variant="solo"
                      required
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary" icon="mdi-sitemap" />
                      </template>

                      <template v-slot:label>
                        <!-- <p  class="text-primary">نام لایه</p> -->
                        <p class="">نام کاربری</p>
                      </template>
                    </v-autocomplete>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-autocomplete
                      :items="items"
                      density="compact"
                      variant="solo"
                      required
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary" icon="mdi-sitemap" />
                      </template>

                      <template v-slot:label>
                        <!-- <p  class="text-primary">نام لایه</p> -->
                        <p class="">نقشه زیرین</p>
                      </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>
                <v-divider class="my-2"></v-divider>

                <v-row class="ma-0 pa-0">


                  <v-col cols="12" md="4">
                    <v-text-field
                      density="compact"
                      variant="solo"
                      required
                      type="number"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary" icon="mdi-numeric" />
                      </template>

                      <template v-slot:label>
                        <!-- <p  class="text-primary">نام لایه</p> -->
                        <p class="">شناسه</p>
                      </template>
                    </v-text-field>
                  </v-col>

                  
                  <v-col cols="12" md="4">
                <v-slider
                  :max="25"
                  :min="9"
                  :step="1"
                
                  strict
                  thumb-label="always"
                  class="mb-n6 mt-5"
                  rounded="true"
                  thumb-size="12"
                >
                  <template v-slot:prepend>
                    <!-- <p  class="text-primary">نام لایه</p> -->
                    <p class="text-caption"> زوم :</p>
                  </template>
                </v-slider>
              </v-col>
                </v-row>

                <v-divider class="my-2"></v-divider>
                <v-row class="ma-0 pa-0">
                  <v-col cols="12" md="4">
                    <div class="d-flex flex-column">
                      <p class="text-caption">رنگ هاله :</p>
                      <v-color-picker v-model="color" hide-canvas>
                      </v-color-picker>
                    </div>
                  </v-col>

                  <v-col cols="12" md="4">
                    <div class="d-flex flex-column">
                      <p class="text-caption">رنگ هاله :</p>
                      <v-color-picker v-model="color" hide-canvas>
                      </v-color-picker>
                    </div>
                  </v-col>
                </v-row>
                <v-divider class="my-2 mt-4"></v-divider>

                <v-row class="pa-0 ma-0">
                  <v-col cols="6" md="4" class="pa-0 ma-0">
                    <v-checkbox label="نمایش قطب نما"></v-checkbox>
                  </v-col>
                  <v-col cols="6" md="4" class="pa-0 ma-0">
                    <v-checkbox label="نماش اندازه اضلاع"></v-checkbox>
                  </v-col>
                  <v-col cols="6" md="4" class="pa-0 ma-0">
                    <v-checkbox label="نمایش مقیاس"></v-checkbox>
                  </v-col>
                  <v-col cols="6" md="4" class="pa-0 ma-0">
                    <v-checkbox label=" نمایش شطرنجی"></v-checkbox>
                  </v-col>
                  <v-col cols="6" md="4" class="pa-0 ma-0">
                    <v-checkbox label="فیکس روی عارضه"></v-checkbox>
                  </v-col>
                  <v-col cols="6" md="4" class="pa-0 ma-0">
                    <v-checkbox label="مدل پیشفرض"></v-checkbox>
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
  name: "addModelComponent",
  components: {},
  data() {
    return {
      show: false,

      date: "",

      color: "#ff00ff",

      personImageSrc: null,

      items: ["بندر", "مشهد", "لار", "تفت"],
    };
  },

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
    this.show = true;
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
