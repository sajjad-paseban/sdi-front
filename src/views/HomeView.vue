<template>

    <v-locale-provider rtl>
        <!-- <v-fade-transition mode="out-in">
            <Loader v-if="loading"></Loader>
        </v-fade-transition> -->
        <template v-if="true">
            <View :page="page" :full-screen="fullScreen"/>
        </template>     
    </v-locale-provider>

</template>

<script lang="ts">
    import {defineComponent, onMounted, watch, ref, computed} from "vue";
    import View from "@/map_modules/mainPage/view.vue";
    import {useStore} from "vuex";
    import {UserActions} from "@/store/user/actions";

    import {useToast} from "primevue/usetoast";
    import {OpenLayerAction} from "@/store/openLayer/actions";
    import {openLayer} from "@/store/openLayer";
    import {OpenLayerMutations} from "@/store/openLayer/mutations";
    import baseMap from "@/componentFunctions/baseMap_functions";
    import JWTs from "@/componentFunctions/jwt_functions";
    import {useRouter} from "vue-router";
    import {UserMutations} from "@/store/user/mutations";
    import Loader from "@/components/common/loader.vue";
    // Components



    export default defineComponent({
        name: "HomeView",


        setup() {
            const store = useStore();
            const toast = useToast()
            const isLogin = ref<boolean>(true)
            const getMapInitData = ref<boolean>(false)
            const {getUserInfo} = JWTs()
            const {getActiveBaseMap} = baseMap()
            const router = useRouter()
            const map = computed(() => {
                return store.getters.getMap
            });

            const sub_map = computed(() => {
                return store.getters.getSubMap
            });

            const getMapInfoInit = async () => {
                // await store.dispatch(OpenLayerAction.GET_LAYERS, toast)

                const activeBaseMap = await getActiveBaseMap()
                await store.commit(OpenLayerMutations.SET_BASE_MAP, activeBaseMap)
                await store.commit(OpenLayerMutations.SET_SUB_BASE_MAP, activeBaseMap)

                await store.dispatch(OpenLayerAction.SET_LAYERS_SORT, toast)

                await store.dispatch(OpenLayerAction.SET_SHOW_LAYERS_INIT, toast)
                await store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS_INIT, toast)

                await store.dispatch(OpenLayerAction.SET_MAP_CONFIG, toast)


                getMapInitData.value = true

            }


            onMounted(async () => {
                // isLogin.value = await store.dispatch(UserActions.CHECK_USER)
                // if (isLogin.value) {
                    // const user_info = await getUserInfo()
                    // if (user_info.error) {
                    //     await router.push({name: 'login'})
                    // } else {
                    //     store.commit(UserMutations.SET_USER, user_info.user)
                    // }

1                    // await getMapInfoInit()

                // }
                router.push({name: 'print'})
            })

            // watch(() => store.state.router_access_denied_alert, () => {

            //     if (store.state.router_access_denied_alert) {
            //         // alert('دسترسی ندارید')
            //         toast.add({group: 'br', life: 2000, severity: 'error', summary: ' خطا', detail: 'دسترسی ندارید'});

            //         store.commit('set_router_access_denied_alert', false)
            //     }

            // })

            return {
                store, isLogin, getMapInitData,map,sub_map
            }
        },

        data(){
            return{
                loading: false
            }
        },

        props:{
            fullScreen:{
                type:Boolean,
                default:false
            },
            page:{
                type:Boolean,
                default:false
            }
        },

        components: {View,Loader},
        methods: {
            setMassage() {
                alert()
            }
        },
        watch: {
            // map() {
            //     if (!this.fullScreen&&this.map) {
            //         setTimeout(()=>{
            //             this.loading = false
            //         },1000)
            //     }

            // },

            // sub_map(){
            //     if(this.fullScreen&&this.sub_map){
            //         setTimeout(()=>{
            //             this.loading = false
            //         },1000)
            //     }
            // }
        }


    });
</script>


<style>



</style>