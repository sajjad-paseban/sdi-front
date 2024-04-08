<template>
    <v-slide-x-reverse-transition>
        <div class="ml-2 layerActiveName" v-if="show&&store.getters.getActiveLayer">
            <span> لایه فعال : {{store.getters.getActiveLayer.name}}</span>
        </div>
        <div class="ml-2 layerActiveName text-center" v-else>
            <span>لایه فعالی وجود ندارد</span>
        </div>
    </v-slide-x-reverse-transition>

</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import {useStore} from "vuex";

    export default defineComponent({
        name: "layerActiveName",
        components: {},

        setup() {
            const store = useStore()
            return {
                store
            }
        },

        data() {
            return {
                show: false
            };
        },
        methods: {},
        watch: {},
        mounted() {
            setTimeout(() => {
                this.show = true
            }, 3000)
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .layerActiveName {
        position: absolute;
        right: 10px;
        font-size: 9px;
        font-family: "IRANSansWeb_UltraLight" !important;
        font-weight: bold;
    }

    @media only screen and (min-width: 1020px) {
        .layerActiveName {
            font-size: 11px;
        }
    }

    @media only screen and(max-width: 800px) {
        .layerActiveName {
            font-size: 5px;
        }
    }

    @media only screen and (max-width: 800px) {
        .layerActiveName {
            font-size: 8px;
        }
    }

    @media only screen and (max-width: 730px) {
        .layerActiveName {
          font-size: 8px;
        }
    }
</style>
