<template>
    <popupWindow :topic="store.getters.getPanelTopic" @close-window="router.push({name:'surveyPanel'})" :close-btn="true" :resize="true"
                 :top="winSize>500?'10px':'10px'"
                 :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
                 :min_width="winSize>500?'650px':'90dvw'" :max_height="winSize>500?'100vh':'100vh'"
                 :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'60vh':'50vh'"
                 :width="winSize>500?'50vw':'90vw'">

        <div style="height:100%;width:100%;overflow-y: hidden" class="bg-white">
            <router-view :map="map"/>
        </div>
    </popupWindow>
    <ShowFeatures   :map="map"></ShowFeatures>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, Ref} from "vue";
import View from "@/map_modules/mainPage/view.vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";

import Sidebar from '@/map_modules/survey/surveyPanel/Sidebar.vue'
import Appbar from "@/map_modules/mainPage/appbar.vue";
import SideBar from "@/map_modules/mainPage/sideBar.vue";
import popupWindow from "@/components/common/popupWindow.vue";
import ShowFeatures from "@/map_modules/survey/components/mapComponents/showFeatures.vue";
import {default as map} from "ol/Map";


// Components

export default defineComponent({
    name: "DashboardComponent",

    components: {
        ShowFeatures,
        popupWindow,
    },

    setup() {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()


        onMounted(async () => {


        })


        return {
            store,
            route,router,toast
        }
    },

    data() {
        return {



        }
    },

    props: {
        map: {
            required: true,
            type: map
        }
    },
    computed:{
        winSize() {
            return window.innerWidth
        },
    },

    methods: {},


});
</script>


<style>
@import url('@/assets/main_style.css');

.p-splitter .p-splitter-gutter .p-splitter-gutter-handle {
    background: #0461be !important;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.p-splitter .p-splitter-gutter {
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
    background: #adadad !important;
}

.hideCheckboxDetails .v-input__details {
    display: none !important;

}
</style>
