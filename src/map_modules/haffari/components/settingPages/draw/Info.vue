<template>
    <div class="pa-2" dir="rtl" style="height: 100%;width: 100%;min-width: 400px;">
        info
    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";


export default defineComponent({
  name: "HaffariDrawInfoComponent",

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

    }
  },
  methods: {

  },

  watch: {},


});
</script>


<style>


</style>
