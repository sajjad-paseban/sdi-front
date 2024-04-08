<template>
    <v-slide-y-transition>
        <div style="
        height: 100%;
        width: 100%;
        background-color: #f3f3f3;
        overflow: auto;
      ">
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
                        <v-form ref="myAddDatabase" class="myForm" style="width: 100%; height: 100%">
                            <v-row
                                    class="ma-0 pa-2 rounded-lg elevation-2"
                                    justify="center"
                                    style="background-color: white"
                            >

                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field :rules="nameRule" v-model="myDataForm.topic" density="compact"
                                                      variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">عنوان پایگاه داده</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4">
                                        <v-autocomplete
                                                :items="databaseTypes"
                                                density="compact"
                                                v-model="myDataForm.type"
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
                                        <v-text-field :rules="nameRule" v-model="myDataForm.host" density="compact"
                                                      variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">هاست</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                required
                                                :rules="textNumber"
                                                type="text"
                                                v-model="myDataForm.port"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-numeric"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">پورت</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field :rules="nameRule" v-model="myDataForm.user_name" density="compact"
                                                      variant="solo"
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
                                        <v-text-field v-model="myDataForm.password" density="compact" variant="solo"
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
                                        <v-text-field :rules="nameRule" v-model="myDataForm.db_name" density="compact"
                                                      variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام پایگاه داده</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col v-if="myDataForm.type==='Postgres'" cols="12" md="6" lg="4" class="ma-0">
                                        <v-text-field :rules="nameRule" v-model="myDataForm.schema" density="compact"
                                                      variant="solo"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">schema</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>

                            </v-row>
                            <v-row class="ma-0 pa-0 mt-2" justify="end">
                                <v-btn
                                        class="elevation-1"
                                        variant="tonal"
                                        append-icon="mdi-content-save"
                                        style="font-weight: bold !important; font-size: 10px"
                                        rounded="lg"
                                        @click="saveDatabase"
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
    import databases from "@/componentFunctions/connection_database_functions";
    import {useStore} from "vuex";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import {DataBaseInterface} from "@/models/Conncections.interface";

    export default defineComponent({
        name: "addDataBasesComponent",
        components: {},

        setup() {
            const {getDataBaseTypesAction, addDatabaseAction, databaseTypes} = databases()

            const initData = ref(false)
            const store = useStore()
            const {nameRule,textNumber} = rules()
            const myAddDatabase = ref<VForm>()

            onMounted(async () => {
                await getDataBaseTypesAction()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {addDatabaseAction, databaseTypes, initData, store, nameRule, myAddDatabase,textNumber}
        },

        data() {
            return {

                myDataForm: {type: 'Postgres'} as DataBaseInterface,
            };
        },

        methods: {
            async saveDatabase() {
                if (this.myAddDatabase) {
                    const res = await this.myAddDatabase.validate()

                    if (res.valid) {
                        let response =  await this.addDatabaseAction(this.myDataForm)

                        if (response){
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'دیتابیس اضافه شد '
                            });
                            this.$emit("closeDialog", false);
                        }
                    }
                }

            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
