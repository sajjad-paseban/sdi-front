<template>


    <div dir="rtl" class="rounded-lg  pa-2 pb-1 setting_nav font-weight-bold bg-grey-lighten-4" style="z-index: 1000;height: 100%">
        <v-list-item

                class="mr-n2 "
                two-line
                style="font-weight: bold!important;font-size: 12px!important"
                :prepend-avatar="store.getters.getUser.image?store.state.backendUrl+store.getters.getUser.image:store.state.frontUrl+'/icons/person.png'"
                :title="store.getters.getUser.first_name + ' ' + store.getters.getUser.last_name"
                :subtitle="'نام کاربری : '+store.getters.getUser.user_name"
        ></v-list-item>


        <v-list v-if="panelUser" height="calc(100% - 90px)" style="overflow-y: auto;"
                class="rounded-lg elevation-3 bg-white" density="compact" nav
        >

            <v-list-item v-if="panelUser.user_type == PanelUserType.Manager" @click="router.push({name:'allUsersList'})" :active="false"  density="compact"  title="داشبورد مدیریتی"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="35" class="" >
                        <v-img src="@/assets/icons/dashboard.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>

            <v-list-item v-if="panelUser.user_type == PanelUserType.Checker" @click="router.push({name:'allCheckerExtentsList',params:{id:panelUser.id,name:`${panelUser.info.first_name} ${panelUser.info.last_name}`}})" :active="false"  density="compact"  title="داشبورد کنترلر"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="35" class="" >
                        <v-img src="@/assets/icons/dashboard.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>

            <v-list-item v-if="panelUser.user_type == PanelUserType.Survey" @click="router.push({name:'allUserExtentsList',params:{id:panelUser.id,name:`${panelUser.info.first_name} ${panelUser.info.last_name}`}})" :active="false"  density="compact"  title="داشبورد ممیزکار"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="35" class="" >
                        <v-img src="@/assets/icons/dashboard.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>

            <v-list-item v-if="panelUser.user_type == PanelUserType.Manager"  @click="router.push({name:'surveyProcessList'})" :active="false"  density="compact"  title="مدیریت محدوده های ممیزی"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="35" class="" >
                        <v-img src="@/assets/icons/baseMap.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>

            <v-list-item v-if="panelUser.user_type == PanelUserType.Manager"  @click="router.push({name:'userConfig'})" :active="false"  density="compact"  title="تنظیمات کاربران"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="35" class="" >
                        <v-img src="@/assets/icons/person.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>
            <v-list-item v-if="panelUser.user_type == PanelUserType.Manager"  @click="addSurvey('Arse')" :active="false"  density="compact"  title="افزودن ملک جدید"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="30" class="" >
                        <v-img src="@/assets/icons/add.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>
            <v-list-item v-if="panelUser.user_type == PanelUserType.Manager" @click="addSurvey('selectMap')" :active="false"  density="compact"  title="ویرایش ملک موجود"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="30" class="" >
                        <v-img src="@/assets/icons/edit2.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>
        <div style="height: 40px;width: 100%;">
            <v-row class="ma-0 pa-0 " style="height: 100%" justify="center" align="end">

                <v-btn
                        @click="closeWindow"
                        style="height: 30px;width: 100%"
                        prepend-icon="mdi-logout"
                        color="info"
                >
                    صفحه اصلی
                </v-btn>
            </v-row>

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {MyChartRefInterface} from "@/map_modules/survey/surveyPanel/components/myChart/myChartModels";
import {PanelUser, PanelUserType} from "@/models/SurveyPanel.interface";
import {Ref} from "vue/dist/vue";


export default defineComponent({
    name: "SidebarComponent",
    computed: {
        PanelUserType() {
            return PanelUserType
        }
    },

    components: {},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const initData = ref(false)
        const myChartRef = ref<MyChartRefInterface>()

        const panelUser = computed(()=>{
            return store.getters.getPanelUser
        }) as Ref<PanelUser>


        return {
            store,
            toast,
            router,
            route,
            initData,
            myChartRef,
            panelUser,
        }
    },

    data() {
        return {

        }
    },
    methods:{
        closeWindow(){

            this.store.commit('setConfirmDialog', {
                massage: 'آیا صفحه بسته شود ؟',
                topic: 'اخطار',
                active: true,
                accept: async () => {
                    window.close()
                },
                reject: () => {
                    console.log('reject')
                },

            })

        },
        addSurvey(routeName:string){
            const routeData = this.router.resolve({name: routeName});
            window.open(routeData.href, '_blank');
        }
    }

});
</script>


<style>


</style>
