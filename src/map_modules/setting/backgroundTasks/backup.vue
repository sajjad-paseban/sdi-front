<template>
  <v-slide-y-transition>
    <div
      v-if="show"
      style="height: 100%; width: 100%; background-color: #f3f3f33b;   overflow: auto;"
    >
      <div class="pa-2 mysub">
        <v-row class="ma-0 pa-0">
          <p style="font-size: 10px; line-height: 20px">
            در این صفحه میتوانید تنظیمات پشتیبانی گیری خودکار را انجام دهید.
          </p>
        </v-row>

        <v-row class="ma-0 pa-0">
          <p style="font-size: 10px; line-height: 20px">
            با انتخاب گزینه فعال میتوانید عمل پشتیبانی گیری را غیر فعال کنید. از دکه اصلاح برای ویرایش آن استفاده کنید
          </p>
        </v-row>
      </div>
      <v-row class="ma-0 pa-0 " justify="center">
        <v-col cols="10" md="8" class="">
          <v-form class="myForm" style="width: 100%; height: 100%">
            <v-row
              class="ma-0 pa-2 rounded-lg elevation-2 " justify="space-around" align="center"
              style="background-color: white"
            >
              <v-col class="ma-0 mt-2 pa-0" cols="7" >
                <v-row class="pa-0 ma-0" >
                  <v-col cols="12">
                    <v-text-field
                      density="compact"
                      variant="solo"
                      required
                      type="text"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary" icon="mdi-format-color-text" />
                      </template>

                      <template v-slot:label>
                        <!-- <p  class="text-primary">نام لایه</p> -->
                        <p class="">مسیر ذخیره سازی</p>
                      </template>
                    </v-text-field>
                    </v-col>

                    <v-col cols="12" class="rounded-lg">
                      <date-picker color="rgb(var(--v-theme-primary))" v-model="date"   placeholder="انتخاب تاریخ"></date-picker>
                    </v-col>

                    <v-col cols="12" >
                    <v-autocomplete
                      :items="items"
                      density="compact"
                      variant="solo"
                      required
                      class="mt-4"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary" icon="mdi-sitemap" />
                      </template>

                      <template v-slot:label>
                        <!-- <p  class="text-primary">نام لایه</p> -->
                        <p class="">دوره انجام</p>
                      </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>

                <v-row  class="pa-0 ma-0"  >
                  <v-col cols="5" class="pa-0 ma-0">
                    <v-checkbox label="فعال"></v-checkbox>
                 
                  </v-col>

               
    
                </v-row>



              </v-col>



              <v-col class="ma-0 pa-0" cols="7">
                
              <v-row class="ma-0 pa-0 mt-2" justify="end">
                <v-btn
                  class="elevation-1"
                  variant="tonal"
                  append-icon="mdi-content-save"
                  style="font-weight: bold !important; font-size: 10px"
                  rounded="lg"
                  size="small"
                  color="primary"
                  >اصلاح</v-btn
                >
              </v-row>
              </v-col>

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
  name: "addUserComponent",
  components: {},
  data() {
    return {
      show: false,

      date:'',

      personImageSrc:null,

      items: ["بندر", "مشهد", "لار", "تفت"],
    };
  },
  props: {},
  methods: {
    addImage: function (value:any) {
      var reader = new FileReader();
      console.log(value)
      reader.onload = (e:any) => {
        this.personImageSrc = e.target.result;
      };
      reader.readAsDataURL(value.target.files[0]);
    },
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 300);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
