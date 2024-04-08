<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                style="height: 100%; width: 100%; background-color: #f3f3f33b;   overflow: auto;"
        >
            <div class="pa-2 mysub">
                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        در این بخش با انتخاب و پر کردن فیلد های زیر میتوانید کاربر مورد نظر
                        خود را ایجاد نمایید .
                    </p>
                </v-row>
            </div>
            <v-fade-transition>
                <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>
            </v-fade-transition>
            <v-row v-if="initData" class="ma-0 pa-0" justify="center">
                <v-col cols="12" md="10" class="py-2">
                    <v-form ref="myAddUserForm" class="myForm" style="width: 100%; height: 100%">
                        <v-row
                                class="ma-0 pa-2 rounded-lg elevation-2"
                                style="background-color: white"
                        >
                            <v-col class="ma-0 pa-0" cols="12">
                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field v-model="user.user_name" density="compact" variant="solo"
                                                      :rules="nameRule" required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام کاربری</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field v-model="user.first_name" density="compact" variant="solo"
                                                      :rules="nameRule" required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field v-model="user.last_name" density="compact" variant="solo"
                                                      :rules="nameRule" required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام خانوادگی</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-autocomplete
                                                :items="rolesWithParentName"
                                                density="compact"
                                                item-title="name"
                                                variant="solo"
                                                item-value="id"
                                                :rules="floatRule"
                                                v-model="user.role"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نقش</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                required
                                                type="text"
                                                :rules="phoneRule"
                                                v-model="user.phone"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-numeric"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">تلفن</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field v-model="user.email" density="compact" variant="solo" required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">ایمیل</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                required
                                                type="number"
                                                v-model="user.connected_device"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-numeric"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">دستگاه های متصل</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field :rules="nameRule" v-model="user.password" density="compact"
                                                      variant="solo" required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">رمز ورود</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row class="ma-0 px-2 pa-2 textArea">
                                    <v-textarea
                                            dir="rtl"
                                            no-resize
                                            v-model="user.address"
                                            rows="5"
                                            background-color="light-blue"
                                            color="black"
                                            hint=""
                                            persistent-hint
                                            placeholder="آدرس"
                                            variant="solo"
                                    >
                                    </v-textarea
                                    >
                                </v-row>

                                <v-row class="pa-0 ma-0">
                                    <v-col class="ma-0 py-2" cols="6" md="4">
                                        <v-file-input
                                                label="انتخاب تصویر"
                                                chips
                                                prepend-inner-icon="mdi-paperclip"
                                                variant="solo"
                                                density="compact"
                                                prepend-icon=""
                                                show-size
                                                v-model="userImageFile"
                                                @change="addImage"
                                                accept="image/png, image/jpeg, image/bmp"
                                        >
                                        </v-file-input>
                                    </v-col>

                                    <v-col cols="4" v-if="personImageSrc" align="center">
                                        <v-img
                                                class="rounded-lg"
                                                max-height="90"
                                                max-width="90"
                                                :src="store.state.backendUrl+personImageSrc"
                                        ></v-img>
                                    </v-col>
                                </v-row>

                                <v-row class="pa-0 ma-0">
                                    <v-col cols="6" sm="4" class="pa-0 ma-0">
                                        <v-checkbox v-model="user.sms_login" label="پیامک ورود به سامانه"></v-checkbox>

                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="6" sm="4" class="pa-0 ma-0">
                                        <v-checkbox v-model="user.is_active" label="وضعیت "></v-checkbox>

                                    </v-col>
                                    <v-col cols="6" sm="4" class="pa-0 ma-0">
                                        <v-checkbox v-model="user.check_ip" label="چک کردن آیپی "></v-checkbox>

                                    </v-col>


                                </v-row>
                            </v-col>

                            <v-row class="ma-0 pa-0 mt-2" justify="end">
                                <v-btn
                                        class="elevation-1"
                                        variant="tonal"
                                        append-icon="mdi-content-save"
                                        style="font-weight: bold !important; font-size: 10px"
                                        rounded="lg"
                                        @click="addUser"
                                        size="small"
                                        color="primary"
                                >ذخیره
                                </v-btn
                                >
                            </v-row>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import rules from "@/componentFunctions/rules_functions";
    import {useToast} from "primevue/usetoast";
    import VForm from "@/models/VForm.interface";
    import role from "@/componentFunctions/roles_functions";
    import {UserInterface} from "@/models/User.interface";
    import users from "@/componentFunctions/user_functions";
    import {useRoute, useRouter} from "vue-router";
    import {useStore} from "vuex";

    export default defineComponent({
        name: "addUserComponent",
        components: {},


        setup() {
            const {getRolesWithParentName, rolesWithParentName} = role()
            const {getUserByUserName, user, addUserAction} = users()
            const {nameRule, floatRule, phoneRule} = rules()
            const toast = useToast()
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            const myAddUserForm = ref<VForm>()

            const personImageSrc = ref<string | null>(null)
            const initData = ref(false)

            onMounted(async () => {

                if (!route.params.data) {

                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'کاربر انتخاب نشده است '
                    });
                    router.go(-1)
                } else {
                    console.log(String(route.params.data))
                    if (typeof route.params.data === 'string') {
                        await getUserByUserName({user_name: String(route.params.data)})

                        if (!user.value) {
                            toast.add({
                                group: 'br',
                                life: 4000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'خطا در گرفتن اطلاعات نقش'
                            });
                            router.go(-1)
                        } else {
                            await getRolesWithParentName()
                            personImageSrc.value = user.value.image
                            setTimeout(() => {
                                initData.value = true
                            }, 300)
                        }
                    }
                }
            })
            return {
                nameRule,
                toast,
                myAddUserForm,
                rolesWithParentName,
                initData,
                floatRule,
                addUserAction,
                phoneRule,
                user,
                personImageSrc,
                store
            }
        },


        data() {
            return {
                show: false,


                userImageFile: [],


            };
        },
        props: {},
        methods: {
            addImage: function (value: any) {
                var reader = new FileReader();
                console.log(value)
                reader.onload = (e: any) => {
                    this.personImageSrc = e.target.result;
                };
                reader.readAsDataURL(value.target.files[0]);
            },

            addUser: async function () {
                if (this.myAddUserForm) {
                    const res = await this.myAddUserForm.validate()

                    if (res.valid && this.user) {
                        console.log(this.user, this.userImageFile)
                        if (this.userImageFile.length > 0) {
                            await this.addUserAction({...this.user, image: this.userImageFile[0]})
                        } else {
                            await this.addUserAction({...this.user, image: null})
                        }


                    }
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 500);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
