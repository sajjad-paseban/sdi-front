<template>
    <slot></slot>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import {useStore} from "vuex";


    export default defineComponent({
        name: "wfsClickComponent",
        components: {},

        props: {

            map: {
                required: true,
                type: Map,
            },

        },
        emits: ['clickCallback'],
        setup(){
          const store = useStore()
          return{
              store
          }
        },
        // mounted(): void {
        //
        // },
        // unmounted(): void {
        //
        // },
        computed: {},

        data() {
            return {};
        },
        methods: {

        },
        watch: {

        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
