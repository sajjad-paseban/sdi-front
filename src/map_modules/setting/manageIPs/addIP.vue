<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                style="height: 100%; width: 100%; background-color: #f3f3f33b;   overflow: auto;"
        >
            <div class="pa-2 mysub">
                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        در این بخش با انتخاب و پر کردن فیلد های زیر میتوانید آیپی مورد نظر
                        خود را ایجاد نمایید .
                    </p>
                </v-row>
            </div>
            <v-row class="ma-0 pa-0" justify="center">
                <v-col cols="12" md="10" class="py-2">
                    <v-form ref="myAddIpForm" class="myForm" style="width: 100%; height: 100%">
                        <v-row
                                class="ma-0 pa-2 rounded-lg elevation-2"
                                style="background-color: white"
                        >
                            <v-col class="ma-0 pa-0" cols="12">
                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                required
                                                v-model="ip"
                                                type="text"
                                                :rules="ipRole"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-numeric"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">آیپی</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4" class="rounded-lg">
                                        <date-picker range color="rgb(var(--v-theme-primary))" v-model="date"
                                                     placeholder="انتخاب تاریخ"></date-picker>
                                    </v-col>
                                </v-row>


                                <v-row class="pa-0 ma-0">
                                    <v-col cols="5" class="pa-0 ma-0">
                                        <v-checkbox v-model="is_active" label="فعال"></v-checkbox>

                                    </v-col>


                                </v-row>
                            </v-col>

                            <v-row class="ma-0 pa-0 mt-2" justify="end">
                                <v-btn
                                        class="elevation-1"
                                        variant="tonal"
                                        append-icon="mdi-content-save"
                                        style="font-weight: bold !important; font-size: 10px"
                                        @click="saveIp"
                                        rounded="lg"
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
    import {defineComponent, ref} from "vue";
    import moment from 'jalali-moment'
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import ips from "@/componentFunctions/ip_functions";


    export default defineComponent({
        name: "addUserComponent",
        components: {},

        setup() {
            const {addIpAction,convertedDate} = ips()
            const {nameRule,ipRole} = rules()
            const myAddIpForm = ref<VForm>()

            return {
                nameRule, myAddIpForm, addIpAction,ipRole,convertedDate
            }
        },

        data() {
            return {
                show: false,

                date: [] as string[],
                ip: '',
                is_active: false


            };
        },
        props: {},
        methods: {


            async saveIp() {
                if (this.myAddIpForm) {
                    const res = await this.myAddIpForm.validate()
                    let response
                    if (res.valid) {
                        if (this.date[0]) {
                            const date = this.convertedDate(this.date)
                            response = await this.addIpAction({
                                ip: this.ip,
                                is_active: this.is_active,
                                active_time_start: date[0],
                                active_time_end: date[1]
                            })
                        } else {
                            response =  await this.addIpAction({ip: this.ip, is_active: this.is_active})
                        }

                        if (response){
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'آیپی اضافه شد '
                            });
                            this.$router.push({name: 'manageIPsList'})
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
