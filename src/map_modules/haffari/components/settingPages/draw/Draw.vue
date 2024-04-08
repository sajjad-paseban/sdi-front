<template>
    <div class="pa-2" dir="rtl" style="height: 100%;width: 100%;">
        <v-card bg-color="active" class="ma-1" style="height: 100%; overflow: auto; ">
            <v-tabs style="background-color: #e8e8e8;" class="" v-model="tab" color="haffari_primary"    show-arrow @update:modelValue="changeTab">
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
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";


export default defineComponent({
  name: "AddArchiveComponent",

  components: {},


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

  },
  data() {
    return {
        tab: "",

        items: [
            {
                icon: "phone",
                text: "تنظیمات",
                route: "haffariDrawSetting",
            },

            {
                icon: "phone",
                text: "اطلاعات صفحه",
                route: "haffariDrawInfo",
            },

        ],
    }
  },
  methods: {
      changeTab(){
          this.$router.push({name:this.tab})
      }
  },

  watch: {},


});
</script>


<style>


</style>
