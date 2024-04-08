<template>

    <v-layout style="height:100%;width:100%;position: relative;overflow-y: hidden" class="pa-2">
        <div style="position: absolute;right:100px;bottom:32px;z-index: 102" class="pa-2 rounded-lg bg-white elevation-2">
            <div class="ml-2 subLayerActiveName " v-if="store.getters.getSubActiveLayer">
                <span> لایه فعال : {{store.getters.getSubActiveLayer.name}}</span>
            </div>
            <div class="ml-2 subLayerActiveName text-center" v-else>
                <span>لایه فعالی وجود ندارد</span>
            </div>
        </div>
        <View :page="false" :full-screen="true" class="rounded-lg"/>

    </v-layout>


</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import View from "@/map_modules/mainPage/view.vue";


export default defineComponent({
    name: "MapComponent",
    components: {View},
    setup() {
        const store = useStore()
        const router = useRouter()

        const initData = ref(false)
        onMounted(() => {
            setTimeout(() => {
                initData.value = true
            }, 1000)
        })



        return {
            store, initData, router
        }
    },
    data() {
        return {};
    },
    props: {},
    methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.subLayerActiveName {

    font-size: 9px;
    font-family: "IRANSansWeb_UltraLight" !important;
    font-weight: bold;
}

@media only screen and (min-width: 1020px) {
    .subLayerActiveName {
        font-size: 11px;
    }
}

@media only screen and(max-width: 800px) {
    .subLayerActiveName {
        font-size: 5px;
    }
}

@media only screen and (max-width: 800px) {
    .subLayerActiveName {
        font-size: 8px;
    }
}

@media only screen and (max-width: 730px) {
    .subLayerActiveName {
        display: none;
    }
}
</style>
