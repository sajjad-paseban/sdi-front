<template>
    <v-slide-y-transition>
        <div class="py-1" style="height: 100%">

            <v-row v-if="!show" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-fade-transition>
                <v-card
                        class="ma-0 pa-2"
                        style="height: 100%; overflow: auto"
                        v-if="show"
                >
                    <div class="px-2 mysub">
                        <v-row class="ma-0 pa-0 pr-2">
                            <p class="" style="font-size: 10px; line-height: 20px">
                                برای ایجاد لایه از طریق جستجو در لایه های پایگاه داده انتخابی ، ابتدا باید پایگاه داده مد نظر خود را انتخاب کنید .
                            </p>
                        </v-row>
                    </div>

                    <v-form ref="databaseForm" class="myForm" style="width: 100%;height:calc(100% - 23px) ">
                        <v-row class="ma-0 px-2" style="height: calc(100% - 45px)" align="center">
                            <v-col cols="12" md="6" >
                                <v-autocomplete
                                        :items="databasesList"
                                        item-value="id"
                                        item-title="topic"
                                        v-model="selectedDatabase"

                                        density="compact"
                                        :rules="nameRule"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-database"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">انتخاب دیتابیس</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>


                        <v-row class="ma-0 pa-0 pt-1 " justify="end" align="end">
                            <v-btn
                                    @click="saveSelectDatabase"
                                    class="mt-4 font-weight-bold" variant="text" size="x-small"
                                    color="primary">
                                ذخیره
                            </v-btn>
                        </v-row>
                    </v-form>

                </v-card>
            </v-fade-transition>
        </div>
    </v-slide-y-transition>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import databases from "@/componentFunctions/connection_database_functions";
    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";




    export default defineComponent({
        name: "searchDatabaseComponent",
        components: {},
        setup() {
            const {databasesList, getDatabases} = databases()

            const {nameRule} = rules()
            const databaseForm = ref<VForm>()

            const show = ref<boolean>(false)
            onMounted(async () => {

                await getDatabases()
                setTimeout(() => {
                    show.value = true;

                }, 300);
            })
            return{
                show,
                databasesList,
                nameRule,
                databaseForm
            }
        },
        data() {
            return {
                selectedDatabase :null

            };
        },


        methods: {
            async saveSelectDatabase() {

                if (this.databaseForm) {
                    const res = await this.databaseForm.validate()
                    if (res.valid) {
                        this.$emit('saveDatabase',this.selectedDatabase)
                    }
                }

            }
        },
        emits: ['saveDatabase'],
        watch: {

        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
