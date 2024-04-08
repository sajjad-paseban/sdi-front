<template>
    <v-slide-y-transition>
        <div
                style="
        height: 100%;
        width: 100%;
        background-color: #f3f3f3;
        overflow: auto;
      "
        >
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
                    <v-col cols="12" class="py-2">
                        <v-form ref="myAddService" class="myForm" style="width: 100%; height: 100%">
                            <v-row
                                    class="ma-0 pa-2 rounded-lg elevation-2"
                                    justify="center"
                                    style="background-color: white"
                            >
                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.topic" density="compact" variant="solo"
                                                      required :rules="nameRule">
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">عنوان سرویس</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-autocomplete
                                                v-model="service.type"
                                                :items="serviceTypes"
                                                density="compact"
                                                variant="solo"
                                                required
                                                :rules="nameRule"

                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نوع</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-autocomplete
                                                v-model="service.version"
                                                :items="serviceVersion"
                                                density="compact"
                                                variant="solo"
                                                required
                                                :rules="nameRule"

                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نسخه</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.layers" density="compact" variant="solo" :rules="nameRule"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">لایه ها</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.styles" density="compact" variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">استایل ها</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.format_option" density="compact" variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">فرمت آپشن ها</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.crs" density="compact" variant="solo" :rules="nameRule"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">crs</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.user_name" density="compact" variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام کاربری</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.password" density="compact" variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">رمز اتصال</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field v-model="service.geo_field_name" density="compact" variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام فیلد جئومتری</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field v-model="service.apiKey" density="compact" variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">کلید اتصال</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" class="ma-0 textArea">
                                        <v-textarea
                                                v-model="service.address"
                                                :rules="nameRule"
                                                dir="rtl"
                                                no-resize
                                                rows="5"
                                                background-color="light-blue"
                                                color="black"
                                                hint=""
                                                persistent-hint
                                                placeholder="آدرس"
                                                variant="solo"
                                        >
                                        </v-textarea>
                                    </v-col>
                                    <v-col cols="12" class="ma-0 textArea">
                                        <v-textarea
                                                v-model="service.wfs_address"
                                                :rules="nameRule"
                                                dir="rtl"
                                                no-resize
                                                rows="5"
                                                background-color="light-blue"
                                                color="black"
                                                hint=""
                                                persistent-hint
                                                placeholder="آدرس wfs"
                                                variant="solo"
                                        >
                                        </v-textarea>
                                    </v-col>
                                </v-row>
                            </v-row>
                            <v-row class="ma-0 pa-0 mt-2" justify="end">
                                <v-fade-transition>
                                    <div v-if="checkResult===1" class="rounded-lg connectionCheckError ">
                                        <v-row style="height:100%" class="ma-0 pa-0" justify="center" align="center">
                                            خطا در ارتباط
                                        </v-row>
                                    </div>
                                    <div v-if="checkResult===2" class="rounded-lg connectionCheckSuccess ">
                                        <v-row style="height:100%" class="ma-0 pa-0" justify="center" align="center">
                                            ارتباط موفق
                                        </v-row>
                                    </div>
                                </v-fade-transition>


                                <v-spacer></v-spacer>
                                <v-btn
                                        :loading="checkServiceLoading"
                                        @click="checkServiceAction"
                                        class="elevation-1 ml-2"
                                        variant="tonal"
                                        append-icon="mdi-connection"
                                        style="font-weight: bold !important; font-size: 10px"
                                        rounded="lg"
                                        size="small"
                                        color="primary"
                                >بررسی ارتباط
                                </v-btn>
                                <v-btn
                                        class="elevation-1"
                                        variant="tonal"
                                        append-icon="mdi-content-save"
                                        style="font-weight: bold !important; font-size: 10px"
                                        rounded="lg"
                                        @click="saveService"
                                        size="small"
                                        color="primary"
                                >ذخیره
                                </v-btn
                                >
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
    import services from "@/componentFunctions/connection_service_functions";
    import {useStore} from "vuex";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import {ServiceInterface} from "@/models/Conncections.interface";
    import {useToast} from "primevue/usetoast";


    export default defineComponent({
        name: "editServiceComponent",
        components: {},
        props: {
            id: {
                type: Number,
                required: true,
                default: 0
            }
        },
        setup(props, {emit}) {
            const {getServiceTypesAction, addServiceAction, serviceTypes,
                checkService, getServiceVersionAction,getServicesById,service, serviceVersion} = services()

            const initData = ref(false)
            const store = useStore()
            const {nameRule, textNumber} = rules()
            const myAddService = ref<VForm>()
            const toast = useToast()

            onMounted(async () => {

                if (props.id === 0) {
                    emit("closeDialog", false);
                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'سرویس انتخاب نشده است '
                    });
                }

                await getServicesById({id: props.id})


                await getServiceTypesAction()
                await getServiceVersionAction()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                addServiceAction,
                serviceTypes,
                initData,
                store,
                nameRule,
                myAddService,
                textNumber,
                checkService,
                serviceVersion,
                service
            }
        },
        data() {
            return {

                checkResult: 0,
                checkServiceLoading: false,
            };
        },

        methods: {
            async saveService() {
                if (this.myAddService) {
                    const res = await this.myAddService.validate()

                    if (res.valid&&this.service) {
                        // console.log(this.myDataForm)
                        let response = await this.addServiceAction(this.service)

                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'سرویس اضافه شد '
                            });
                            this.$emit("closeDialog", false);
                        }
                    }

                }
            },

            async checkServiceAction() {
                if (this.myAddService) {
                    const res = await this.myAddService.validate()

                    if (res.valid && this.service) {
                        this.checkServiceLoading = true
                        const result = await this.checkService(this.service)
                        this.checkServiceLoading = false
                        if (result) {
                            this.checkResult = 2
                        } else {
                            this.checkResult = 1
                        }
                        setTimeout(() => {
                            this.checkResult = 0
                        }, 2000)
                    }
                }
            }
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
