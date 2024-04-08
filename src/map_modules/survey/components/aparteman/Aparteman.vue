<template>
    <div style="height:100%;width:100%" class=" bg-grey-lighten-2">

        <router-view :formSize="formSize"/>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";


export default defineComponent({
    name: "ApartmentComponent",

    components: {},

    props: {
        formSize: {
            required: false,
            type: Number
        },
    },


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()


        return {
            store, toast, router
        }
    },

    data() {
        return {}
    },
    methods: {},

    watch: {},

    mounted() {

        console.log(this.store.getters.getMapDisable)
        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME, 'واحد های مستقل')
        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
    },
    unmounted() {
        this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)
    }


});
</script>


<style>


</style>
