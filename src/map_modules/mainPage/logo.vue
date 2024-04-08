<template>

  <div>
    <v-row>
      <v-col>

        <v-img  class="profImage rounded-circle"
        src="@/assets/cImages/logo.png"
        alt="John"
      ></v-img>


    

      </v-col>
    </v-row>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "logoComponent",
  components: {},
  data() {
    return {};
  },
  props: {
    msg: String,
  },
  methods:{

  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.profImage{
  width: 15px!important;
    /* height: 2vh!important; */
    margin-left: 1vw!important;
 
}
</style>
