<template>

    <v-locale-provider rtl>
        <v-container
                class=" pa-0 ma-0 fill-height"
                fluid>


            <v-fade-transition mode="out-in">
                <v-img
                        src="@/assets/cImages/loginBackground.jpg"
                        height="100vh"
                        cover
                        class="bg-grey-lighten-2"
                >
                    <v-row class="pa-0 ma-0 " no-gutters style="height: 100dvh" align="center" justify="center">
                        <v-col cols="9">
                            <v-card :color="'rgba(255,255,255,0.66)'" height="80dvh" class="rounded-xl">
                                <v-row class="pa-0 ma-0" style="height: 100%">
                                    <v-col cols="12" md="6">

                                        <v-slide-x-transition>
                                            <v-row v-if="showForm" style="height: 100%" align="center"
                                                   justify="center">

                                                <v-col style="height: 90%;position: relative" cols="12" md="8">
                                                    <v-form ref="loginForm" style="height: 100%;width: 100%">
                                                        <v-card height="100%"
                                                                class="rounded-lg bg-grey-lighten-3 myForm"
                                                                style="overflow-y: auto">
                                                            <div style="height: 10%"></div>
                                                            <v-row class="ma-0 pa-0"
                                                                   justify="center">
                                                                <v-col cols="10" class="py-0 my-0">
                                                                    <v-text-field
                                                                            v-model="user_name"
                                                                            density="compact"
                                                                            variant="solo"
                                                                            :rules="[
                                                                            v => !!v || 'مقدار نام کاربری خالی نمیتواند باشد '
                                                                          ]"
                                                                            required
                                                                    >
                                                                        <template v-slot:prepend-inner>
                                                                            <v-icon color="primary"
                                                                                    icon="mdi-account"/>
                                                                        </template>

                                                                        <template v-slot:label>
                                                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                                                            <p class="">نام کاربری</p>
                                                                        </template>
                                                                    </v-text-field>
                                                                </v-col>
                                                                <v-col cols="10" class="py-0 my-0">
                                                                    <v-text-field
                                                                            autocomplete="on"
                                                                            density="compact"
                                                                            variant="solo"
                                                                            v-model="password"
                                                                            :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                                                            :type="showPass ? 'text' : 'password'"
                                                                            @click:appendInner="showPass = !showPass"
                                                                            required
                                                                            :rules="[
                                                                            v => !!v || 'مقدار پسورد خالی نمیتواند باشد '
                                                                          ]"
                                                                    >
                                                                        <template v-slot:prepend-inner>
                                                                            <v-icon color="primary"
                                                                                    icon="mdi-lock"/>
                                                                        </template>

                                                                        <template v-slot:label>
                                                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                                                            <p class=""> رمز ورود</p>
                                                                        </template>
                                                                    </v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="ma-0 pa-0"  justify="center">
                                                                <v-col class="pa-0 ma-0" cols="10">
                                                                    <v-row class="pa-0 ma-0" >
                                                                        <v-col cols="12" lg="6" style="height: 44px">
                                                                            <v-checkbox color="primary"
                                                                                        v-model="closeAllSession"
                                                                                        label="بستن سایر نشست ها "></v-checkbox>
                                                                        </v-col>
                                                                        <v-col cols="12" lg="4" style="height: 44px">
                                                                            <v-checkbox color="primary" v-model="guest"
                                                                                        label="ورود مهمان "></v-checkbox>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>


                                                            </v-row>

                                                            <v-row justify="center">
                                                                <v-col cols="10">
                                                                    <v-btn
                                                                            class="elevation-1"
                                                                            variant="tonal"

                                                                            :loading="loginLoading"
                                                                            style="font-weight: bold;width: 100%"
                                                                            rounded="lg"
                                                                            @click="login"
                                                                            color="primary"
                                                                    >ورود
                                                                    </v-btn
                                                                    >
                                                                </v-col>
                                                            </v-row>

                                                            <v-row justify="center" class="mt-4">
                                                                <v-col cols="10">

                                                                    <div class="elevation-2 rounded-lg  pa-2 "
                                                                         style="background-color: rgba(251,140,0,0.28)">
                                                                        <p style="font-size:10px;line-height: 20px;">
                                                                            در صورتی که نام کاربری یا گذر واژه خود
                                                                            را ۵
                                                                            مرتبه متوالی به صورت اشتباه وارد کنید ،
                                                                            دسترسی
                                                                            شما از این آدرس به مدت ۵ دقیقه غیر فعال
                                                                            میشود.
                                                                        </p>
                                                                    </div>
                                                                </v-col>

                                                            </v-row>
                                                            <v-slide-y-transition>
                                                                <v-row v-if="showLoginAlert" justify="center"
                                                                       class="mt-2">
                                                                    <v-col cols="10">

                                                                        <div class="elevation-2 rounded-lg  pa-2 "
                                                                             style="background-color: rgba(251,0,0,0.28)">
                                                                            <p style="font-size:10px;line-height: 20px;">
                                                                                {{loginAlertText}}
                                                                            </p>
                                                                        </div>
                                                                    </v-col>

                                                                </v-row>
                                                            </v-slide-y-transition>
                                                        </v-card>
                                                    </v-form>

                                                </v-col>
                                            </v-row>
                                        </v-slide-x-transition>


                                    </v-col>
                                    <v-col cols="0" md="6" class="pa-0 ma-0 hidImage">
                                        <v-img
                                                src="@/assets/gifs/login.gif"
                                                height="100%"
                                                cover
                                                class="bg-grey-lighten-2"
                                        ></v-img>
                                    </v-col>
                                </v-row>
                            </v-card>

                        </v-col>

                    </v-row>


                </v-img>
            </v-fade-transition>

        </v-container>
    </v-locale-provider>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import {UserMutations} from "@/store/user/mutations";
    import routes from "../api/jwt/routes";
    import {UserStates} from "@/store/user/types";
    import {useToast} from "primevue/usetoast";
    import {MyApiResponse, setHeader} from "@/api/config";
    import VForm from "@/models/VForm.interface";




    // Components

    export default defineComponent({
        name: "loginComponent",
        setup() {

            const store = useStore();
            const toast = useToast()
            const loginForm = ref<VForm>()

            onMounted(()=>{
                loginForm.value

                const urlParams= new URL(window.location.href)
                const error = urlParams.searchParams.get('error')
                if(error){
                    toast.add({group: 'br', life: 7000, severity: 'error', summary: ' خطا در دخواست', detail: String(error)});
                }
            })
            return {
                store,toast,loginForm
            }
        },

        data() {
            return {
                showForm: false,

                user_name: '',
                password: '',
                loginLoading: false,
                guest: false,
                closeAllSession: false,

                showLoginAlert: false,
                loginAlertText: '',

                showPass: false,
                loading: false
            };
        },
        methods: {
            async login() {
                this.loginLoading = true
                this.showLoginAlert = false

                //----------------//
                if (this.guest) {
                    this.user_name = 'superUser'
                    this.password = 'admin'
                }
                //----------------//

                setHeader('')

                if (this.loginForm){
                    this.loginLoading = true
                    const res = await this.loginForm.validate()
                    console.log(res.valid)
                    if (res.valid) {

                        const response:MyApiResponse<UserStates> = await routes.login<UserStates>({
                            user_name: this.user_name,
                            password: this.password
                        },this.toast)

                        if (response.result){
                            let user = response.result

                            this.store.commit(UserMutations.SET_USER, user)

                            this.$router.push({name: 'home'})
                        }


                    }
                    this.loginLoading = false
                }





            },

        },

        components: {},
        mounted() {
            setTimeout(() => {
                this.showForm = true
            }, 800)

        }


    });
</script>


<style scoped>



    @media only screen and (max-width: 960px) {
        .hidImage {
            display: none;
        }
    }
</style>
