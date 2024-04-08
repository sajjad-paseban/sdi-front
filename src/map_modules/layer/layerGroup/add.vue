<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                style="height: 100%; width: 100%; background-color: #f3f3f33b;   overflow: auto;"
        >
            <div class="pa-2 mysub">
                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        در این بخش با انتخاب و پر کردن فیلد های زیر میتوانید گروه مورد نظر
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
                    <v-form ref="addLayerGroupForm" class="myForm" style="width: 100%; height: 100%">
                        <v-row
                                class="ma-0 pa-2 rounded-lg elevation-2"
                                style="background-color: white"
                        >
                            <v-col class="ma-0 pa-0" cols="12">
                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field v-model="name" density="compact" variant="solo" :rules="nameRule"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام گروه</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>


                                </v-row>
                                <v-row class="pa-0 ma-0">


                                    <v-col cols="12" sm="4">
                                        <v-autocomplete
                                                :disabled="!activeParent"
                                                v-model="parent_id"
                                                :items="layerGroupList"
                                                density="compact"
                                                item-title="name"
                                                variant="solo"
                                                item-value="id"
                                                :rules="activeParent?nameRule:[]"

                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <p class="">گروه والد</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="12" sm="2" class="mb-n8">
                                        <v-switch v-model="activeParent" color="primary" density="compact">
                                            <template v-slot:prepend>
                                                <p class="text-caption">والد دارد</p>
                                            </template>
                                        </v-switch>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-spacer></v-spacer>
                                </v-row>


                            </v-col>

                            <v-row class="ma-0 pa-0 mt-2" justify="end">
                                <v-btn
                                        class="elevation-1"
                                        variant="tonal"
                                        append-icon="mdi-content-save"
                                        style="font-weight: bold !important; font-size: 10px"
                                        rounded="lg"
                                        @click="saveLayerGroup"
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
    import layerGroupFunctions from "@/componentFunctions/layerGroup_functions";

    export default defineComponent({
        name: "addUserComponent",
        components: {},


        setup() {

            const {add,list,layerGroupList} = layerGroupFunctions()

            const {nameRule} = rules()
            const toast = useToast()
            const addLayerGroupForm = ref<VForm>()

            const initData = ref(false)
            onMounted(async () => {
                await list()
                setTimeout(() => {
                    initData.value = true
                }, 300)

            })
            return {
                nameRule, toast, addLayerGroupForm, initData,
                add,layerGroupList
            }
        },


        data() {
            return {
                show: false,
                activeParent: false,

                name: '' as string,
                parent_id: null as number | null

            };
        },
        props: {},
        methods: {
            async saveLayerGroup() {
                if (this.addLayerGroupForm) {
                    const res = await this.addLayerGroupForm.validate()
                    if (res.valid) {

                        const response = await this.add({name: this.name, parent: this.activeParent?this.parent_id:null})
                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'گروه لایه اضافه شد '
                            });

                            this.$router.push({name:'groupLayerList'})

                        }
                    }
                }
            },
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
