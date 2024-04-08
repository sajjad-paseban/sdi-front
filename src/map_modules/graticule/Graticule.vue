<template>
    <div>
        test

    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import {default as map} from "ol/Map";

    import {useToast} from "primevue/usetoast";
    import {useStore} from "vuex";



    export default defineComponent({
        name: "GraticuleComponent",
        components: {

        },

        setup() {
            const store = useStore();
            const toast = useToast()

            return {
                store, toast
            }

        },

        props: {
            map: {
                required: true,
                type: map
            },
        },


        data() {
            return {

            };
        },

        methods: {

        },



    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
