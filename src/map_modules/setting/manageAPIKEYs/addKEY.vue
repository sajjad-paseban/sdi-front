<template>
    <v-slide-y-transition>
        <div

                style="
        height: 100%;
        width: 100%;
        background-color: #f3f3f33b;
        overflow: auto;
      "
        >
            <div class="pa-2 mysub">
                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        در این صفحه به کاربران پیشرفته این امکان را میدهد که بدون لاگین مردن
                        بتوانند از Api های سیستم در برنامه خود استفاده کنند .
                    </p>
                </v-row>

                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        برای استفاده باید مدت اعتبار و نوع متد و تعداد در خواست و کاربر مورد
                        نظر انتخاب شود
                    </p>
                </v-row>
            </div>
            <v-row v-if="!initData" class="pa-4 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-fade-transition>
                <v-row v-if="initData" class="ma-0 pa-0" justify="center">
                    <v-col cols="10" md="8" class="">
                        <v-form ref="myAddJWTApi" class="myForm" style="width: 100%; height: 100%">
                            <v-row
                                    class="ma-0 pa-2 rounded-lg elevation-2"
                                    justify="space-around"
                                    align="center"
                                    style="background-color: white"
                            >
                                <v-col class="ma-0 mt-2 pa-0" cols="7">
                                    <v-row class="pa-0 ma-0">
                                        <v-col cols="12">
                                            <v-autocomplete
                                                    :items="usersList"
                                                    item-value="id"
                                                    item-title="user_name"
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                                    v-model="myDataForm.user"
                                                    class="mt-4"
                                                    :rules="floatRule"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">نام کاربری</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" class="rounded-lg">
                                            <date-picker
                                                    range
                                                    color="rgb(var(--v-theme-primary))"
                                                    v-model="date"
                                                    placeholder="مدت زمان اعتبار"
                                            ></date-picker>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                                    v-model="myDataForm.max_request_per_min"
                                                    type="number"
                                                    class="mt-4"
                                                    :rules="floatRule"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class=""> تعداد درخواست در دقیقه</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="pa-0 ma-0">
                                            <v-checkbox v-model="myDataForm.is_active" label="فعال"></v-checkbox>

                                        </v-col>


                                    </v-row>
                                </v-col>

                                <v-col class="ma-0 pa-0" cols="7">
                                    <v-row class="ma-0 pa-0 mt-2" justify="end">
                                        <v-btn
                                                class="elevation-1 ml-2 mt-2"
                                                variant="tonal"
                                                append-icon="mdi-content-save"
                                                style="font-weight: bold !important; font-size: 10px"
                                                @click="saveJWT"
                                                rounded="lg"
                                                size="small"
                                                color="primary"
                                        >ذخیره
                                        </v-btn
                                        >
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-fade-transition>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import users from "@/componentFunctions/user_functions";

    import {StaticJWTInterface} from "@/models/staticJWT.interface";
    import ips from "@/componentFunctions/ip_functions";
    import staticJWTs from "@/componentFunctions/staticJWT_functions";

    export default defineComponent({
        name: "addKEYComponent",
        components: {},

        setup() {

            const {getUsers, usersList} = users()
            const {convertedDate} = ips()
            const {addJWTAction}=staticJWTs()

            const store = useStore()
            const initData = ref(false)
            const {nameRule, textNumber, floatRule} = rules()
            const myAddJWTApi = ref<VForm>()

            onMounted(async () => {
                await getUsers()

                console.log(usersList.value)

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {initData, myAddJWTApi, nameRule, textNumber, usersList, floatRule, convertedDate,addJWTAction}
        },

        data() {
            return {
                show: false,

                date: [] as string[],

                myDataForm: {max_request_per_min: 0, is_active: true} as StaticJWTInterface,
            };
        },
        props: {},
        methods: {
            async saveJWT() {
                if (this.myAddJWTApi) {
                    const res = await this.myAddJWTApi.validate()

                    if (res.valid&& this.myDataForm.user) {

                        if (this.date[0]) {
                            const date = this.convertedDate(this.date)
                            this.myDataForm.start_time=date[0]
                            this.myDataForm.expire = date[1]
                            console.log(this.myDataForm)

                            const response = await this.addJWTAction(this.myDataForm)

                            if (response){
                                this.$toast.add({
                                    group: 'tr',
                                    life: 7000,
                                    severity: 'success',
                                    summary: ' نتیجه درخواست',
                                    detail: 'کلید اضافه شد '
                                });
                                this.$router.push({name: 'manageKEYsList'})
                            }
                        }
                    }

                }
            },

        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
