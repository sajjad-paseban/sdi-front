<template>
    <div style="height:100%;width:100%" class=" bg-grey-lighten-2">

        <v-img src="@/assets/cImages/1.jpg" style="height:calc(100dvh - 50px);width: 100%" cover>
            <v-row class="ma-0 pa-0 pa-2" style="height:100%" justify="center" align="center">
                <v-col class="bg-white rounded-lg elevation-2" cols="12" md="10" style="height:95%;position: relative">
                    <router-view></router-view>
                </v-col>
            </v-row>

        </v-img>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {SurveyMutations} from "@/store/survey/mutations";


export default defineComponent({
    name: "JobComponent",

    components: {},




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
    methods: {

    },

    watch: {},

    mounted() {
        this.store.commit(SurveyMutations.SET_MAP_DISABLE, true)
        console.log(this.store.getters.getMapDisable)
        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME, 'واحد شغلی')
        this.store.commit(SurveyMutations.SET_TASKBAR_INFO_FEATURES, [])
    },




});
</script>


<style>


</style>
