<template>

    <div dir="rtl" class="mt-n1 setting_nav font-weight-bold" style="z-index: 1000;height: 100%">
        <v-list-item

                class="mr-n4 "
                two-line
                style="font-weight: bold!important;font-size: 12px!important;width:max-content"
                :prepend-avatar="store.getters.getUser.image?store.state.backendUrl+store.getters.getUser.image:store.state.frontUrl+'/icons/person.png'"
                :title="store.getters.getUser.first_name + ' ' + store.getters.getUser.last_name"

        >
            <template v-slot:subtitle>
                <p style="width:max-content;font-size:9px;white-space: nowrap;overflow: hidden;" class=" ml-4">{{'نام کاربری : '+store.getters.getUser.user_name}}</p>
            </template>
        </v-list-item>


        <v-list height="calc(100% - 90px)" style="overflow-y: auto;background-color: white!important;"
                class="rounded-lg elevation-1 border" density="compact" nav
                @click:select="listClick">

            <v-list-item :active="false" @click="router.push({'name':'userPanel'})" density="compact"  title="پنل کاربری"
                         value="home">
                <template v-slot:prepend>
                    <v-avatar size="22" class="" >
                        <v-img src="@/assets/icons/dashboard.png" alt="John"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>


        </v-list>
        <div style="height: 40px;width: 100%;">
            <v-row class="ma-0 pa-0 " style="height: 100%" justify="center" align="end">

                <v-btn
                        @click="logOut"
                        style="height: 30px;width: 100%"
                        prepend-icon="mdi-logout"
                        color="error"
                >
                    خروج
                </v-btn>
            </v-row>

        </div>
    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted} from "vue";
    import {useStore} from "vuex";
    import JWTs from "@/componentFunctions/jwt_functions";
    import router from "@/router";
    import {useRouter} from "vue-router";


    export default defineComponent({
        name: "settingMenu",
        components: {},
        setup() {
            const store = useStore()
            const {logout} = JWTs()
            const router = useRouter()

            onMounted(() => {
                console.log(store.getters.getUser)
            })
            return {store,logout,router}
        },
        data() {
            return {
                listValue: [],
            };
        },


        methods: {

            listClick: function (i: {
                'id': string
            }) {

                console.log(i);

                setTimeout(() => {
                    this.$emit('closeSideBar')
                }, 300)
            },

            logOut(){
                this.logout()
                setTimeout(() => {
                    this.$emit('closeSideBar')
                }, 300)
                setTimeout(() => {
                    this.$router.push({name:'login'})
                }, 1000)
            }
        },
    });
</script>
<style>
    .setting_nav .v-list-item-subtitle {
        font-weight: bold !important;
        font-size: 10px!important;
        min-width: 105px!important;
    }
    .v-list-item-title {
        font-weight: bold !important;
    }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->

