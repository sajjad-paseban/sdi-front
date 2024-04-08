<template>
    <div>


        test3

    </div>


</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import {default as map} from 'ol/Map.js';

    export default defineComponent({
        extends: {},
        name: "SearchFastComponent",
        components: {},

        data() {
            return {}
        },
        props: {
            map: {
                required: true,
                type: map
            }
        },

        watch: {},
        methods: {},

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
