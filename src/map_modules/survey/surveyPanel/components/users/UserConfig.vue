<template>

        <st :close-fun="()=>{router.push({name:'surveyPanel'})}" :header="'تنظیمات کاربران'"  :full="false">
            <div class="rounded-lg" dir="ltr" style="height: 100%;background-color: rgba(171,171,171,0.32);">
                <Splitter style="height: 100%" class="ma-0 pa-0 rounded-lg">
                    <SplitterPanel class="" :size="85" style="overflow-y: hidden !important">
                        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                            <v-fade-transition>
                                <v-progress-circular
                                        :size="50"
                                        color="primary"
                                        indeterminate
                                ></v-progress-circular>
                            </v-fade-transition>
                        </v-row>
                        <v-fade-transition>
                            <SurveyUsers @update-users-list="getUsers" v-if="panelUsers&&group_selected&&group_selected.value=='surveyUsers'"
                                         :users="panelUsers.surveys"></SurveyUsers>
                            <CheckerManger @updateUsers="updateUsers" v-if="panelUsers&&group_selected&&group_selected.value=='checkers'"
                                           :users="panelUsers.checkers"></CheckerManger>
                            <CheckerManger v-if="panelUsers&&group_selected&&group_selected.value=='managers'"
                                           :users="panelUsers.managers" :user-type="'manager'"></CheckerManger>
                        </v-fade-transition>



                    </SplitterPanel>
                    <SplitterPanel
                            dir="rtl"
                            class="rounded-lg"
                            style="overflow-y: auto !important; min-width: 55px !important"
                            :size="15"
                    >
                        <v-list
                                class="MyLayer"
                                :lines="false"
                                density="compact"
                                nav
                                style=""
                        >
                            <v-list-item
                                    v-for="item in items"
                                    :key="item.text"
                                    :value="item"
                                    @click="group_selected = item"
                                    :base-color="item.text === group_selected.text?'info':''"
                                    :active="item.text === group_selected.text"
                            >
                                <template v-slot:prepend>
                                    <v-img
                                            width="35"
                                            height="35"
                                            class="ml-2"
                                            :src="store.state.frontUrl +item.icon"
                                            alt="John"
                                    ></v-img>
                                </template>

                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </SplitterPanel>
                </Splitter>
            </div>
        </st>



</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import survey_functions from "@/componentFunctions/survey_functions";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import {SurveyMutations} from "@/store/survey/mutations";
import SurveyUsers from "@/map_modules/survey/surveyPanel/components/users/SurveyUsers.vue";
import CheckerManger from "@/map_modules/survey/surveyPanel/components/users/CheckerManger.vue";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import St from "@/components/common/startComponent.vue";


export default defineComponent({
    name: "UserConfigComponent",

    components: {
        St,
        Splitter, SplitterPanel, SurveyUsers, CheckerManger
    },


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()
        const {getPanelUsers, panelUsers} = survey_panel_functions()

        const initData = ref(false)

        async function getUsers(){
            await getPanelUsers()
            initData.value = true
        }

        onMounted(async () => {
            store.commit(SurveyMutations.SET_PANEL_TOPIC, 'تنظیمات افراد')
            await getUsers()
        })
        return {
            store, toast, router, route, panelUsers,initData,getUsers
        }
    },

    data() {
        return {
            items: [
                {text: "ممیزکاران", icon: "/icons/surveyMan.png", value: "surveyUsers", name: 'surveyUsers'},
                {text: "کنترلر ها", icon: "/icons/find_user.png", value: "checkers", name: 'checkers'},
                {text: "مدیران", icon: "/icons/manager.png", value: "managers", name: 'managers'},
            ],

            group_selected: {
                text: "ممیزکاران",
                icon: "/icons/worker.png",
                value: "surveyUsers",
                name: 'surveyUsers'
            } as any
        }
    },
    methods: {
        cancelBtn() {
            this.router.go(-1)
        },

        async updateUsers(){
            await this.getUsers()
        }


    },

    watch: {},
    mounted() {
        this.store.commit(SurveyMutations.SET_MAP_DISABLE, true)
        console.log(this.store.getters.getMapDisable)
    }

});
</script>


<style>
.MyLayer .v-list-item__prepend > .v-icon {
    margin-inline-end: 15px !important;
}

</style>
