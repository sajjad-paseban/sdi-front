<template>
  <v-slide-y-transition>
    <div dir="ltr" v-if="show" class="clock">{{ hr }}&nbsp;:&nbsp;{{ min }}&nbsp;:&nbsp;{{ sec }}</div>
  </v-slide-y-transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import{toArabicNumber} from '@/assets/toFarsi'

export default defineComponent({
  name: "ClockCompon",
  components: {},

  data() {
    return {
      show: false,



      time: new Date(),
      sec: '',
      min: '',
      hr: '',
    };
  },
  methods: {
    getTime() {
      
      this.time= new Date(),
     
      this.sec = toArabicNumber(String(this.time.getSeconds()));
      this.min =toArabicNumber(String( this.time.getMinutes()));
      this.hr =toArabicNumber (String(this.time.getHours()));

    },

  },


  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 3000);
    
    setInterval(this.getTime,1000)
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.clock {
  
  font-size: 11px;
  font-family: "IRANSansWeb_UltraLight" !important;
  font-weight: bold;
}

</style>
