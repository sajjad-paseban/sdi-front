<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                style="height: 100%; width: 100%; background-color: #f3f3f33b"
        >
            <div class="pa-2 mysub">
                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        در این بخش با انتخاب و پر کردن فیلد های زیر میتوانید نقش مورد نظر
                        خود را ایجاد نمایید .
                    </p>
                </v-row>
                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        توجه شود که کد نقش نباید تکراری باشد . و در صورت فعال کردن گزینه نقش
                        اصلی ، این نقش به عنوان یکی از نقش های اصلی سیستم قرار میگیرد
                    </p>
                </v-row>
            </div>
            <v-row class="ma-0 pa-0 addRole" justify="center">
                <v-col cols="12" md="10" class="py-8">

                    <v-fade-transition>
                        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                            <v-progress-circular
                                    :size="50"
                                    color="primary"
                                    indeterminate
                            ></v-progress-circular>
                        </v-row>
                    </v-fade-transition>

                    <v-form v-if="initData" ref="myAddRoleForm" class="myForm" style="width: 100%; height: 100%">
                        <v-row
                                class="ma-0 pa-2 rounded elevation-2"
                                style="background-color: white"
                        >
                            <v-col class="ma-0 pa-0" cols="12">
                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field density="compact" variant="solo" :rules="nameRule" required
                                                      v-model="role['name']">
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام نقش</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                v-model="role['role_code']"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-numeric"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">کد نقش</p>
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
                                                v-model="role.parent"

                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">گروه نقش</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="4">
                                        <v-switch
                                                color="primary"
                                                label="نقش اصلی"
                                                hide-details
                                                v-model="role['is_admin']"
                                        ></v-switch>
                                    </v-col>

                                    <v-col cols="4">
                                        <v-switch
                                                color="primary"
                                                label="وضعیت نقش"
                                                v-model="role['is_active']"
                                                hide-details
                                        ></v-switch>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-switch
                                                color="primary"
                                                label="نقش در برنامه"
                                                v-model="role['app_user']"
                                                hide-details
                                        ></v-switch>
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
                                        size="small"
                                        @click="addRole"
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
    import role from "@/componentFunctions/roles_functions";
    import {Role} from "@/models/Role.interface";
    import {defineComponent, onMounted, ref} from "vue";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import Api from "@/api/roles/routes";

    import {useToast} from "primevue/usetoast";

    export default defineComponent({
        name: "addRoleComponent",

        setup() {


            const {rolesWithParentName, getRolesWithParentName, addRoleAction} = role()
            const {nameRule} = rules()
            const toast = useToast()

            const initData = ref(false)
            const myAddRoleForm = ref<VForm>()

            onMounted(async () => {
                await getRolesWithParentName()
                initData.value = true

            })

            return {
                rolesWithParentName, initData, nameRule, myAddRoleForm, toast, addRoleAction
            }
        },
        components: {},
        data() {
            return {
                show: false,

                role: {
                    name: '',
                    role_code: null,
                    is_admin: false,
                    is_active: true,
                    app_user:false,
                    parent: null,
                } as Role,

            };
        },
        props: {},
        methods: {

            addRole: async function () {
                if (this.myAddRoleForm) {
                    const res = await this.myAddRoleForm.validate()

                    if (res.valid) {
                        // console.log(this.role)
                        await this.addRoleAction(this.role)

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
