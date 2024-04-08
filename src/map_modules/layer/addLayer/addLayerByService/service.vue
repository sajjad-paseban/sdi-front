<template>
    <v-slide-y-transition>
        <div v-if="show" class="py-1" style="height: 100%">

            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
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
                        v-if="initData"
                        class="ma-0 pa-0"
                        style="height: 100%; display: grid; overflow: auto"
                >
                    <div class="pa-2 mysub">
                        <v-row class="ma-0 pa-0">
                            <p style="font-size: 10px; line-height: 20px">
                                ابتدا سرویس خود را که از قسمت تنظیمات وارد شده است را انتخاب کنید .
                            </p>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <p style="font-size: 10px; line-height: 20px">
                                در این قسمت با پر کردن موارد زیر ، تنظیمات اولیه ایجاد لایه اعمال میشود .
                            </p>
                        </v-row>

                    </div>
                    <v-row class="ma-0 pt-0 px-2" style="align-items: center; height: 100%">
                        <v-form ref="addLayerServiceForm" class="myForm rounded-lg elevation-2 py-3"
                                style="width: 100%;background-color: #f3f3f3;height: max-content">

                            <v-row class="ma-0 pa-0 ">
                                <v-col cols="12" md="4" lg="3">
                                    <v-autocomplete
                                            :items="servicesList  "
                                            density="compact"
                                            variant="solo"
                                            item-value="id"
                                            item-title="topic"
                                            v-model="layer.service_id"
                                            required
                                            :rules="nameRule"
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-cast-connected"/>
                                        </template>

                                        <template v-slot:label>

                                            <p class="">انتخاب سرویس</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0 pa-0">
                                <v-col cols="12" md="4" lg="3">
                                    <v-text-field
                                            density="compact"
                                            variant="solo"
                                            v-model="layer.layer_name"
                                            required
                                            :rules="nameRule"
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">نام لایه</p>
                                        </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="4" lg="3">
                                    <v-text-field
                                            density="compact"
                                            variant="solo"
                                            required
                                            type="number"
                                            v-model="layer.layer_code"
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-numeric"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">کد لایه</p>
                                        </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="4" lg="3">
                                    <v-autocomplete
                                            v-model="layer.layer_type"
                                            :items="layerTypesList"
                                            density="compact"
                                            item-title="name"
                                            variant="solo"
                                            item-value="id"
                                            :rules="nameRule"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-sitemap"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">نوع لایه</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>

                                <v-col cols="12" md="4" lg="3">
                                    <v-autocomplete
                                            v-model="layer.layer_group_id"
                                            :items="layerGroupList"
                                            density="compact"
                                            item-title="name"
                                            variant="solo"
                                            item-value="id"
                                            :rules="nameRule"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-sitemap"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">گروه لایه</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-row>
                </v-card>
            </v-fade-transition>


        </div>
    </v-slide-y-transition>
</template>
<script lang="ts">

    import {defineComponent, onMounted, ref} from "vue";
    import {Layer_types, ResponseLayerUpload, ServiceLayerInterface} from "@/models/Layer.Interface";
    import services from "@/componentFunctions/connection_service_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import layerGroupFunctions from "@/componentFunctions/layerGroup_functions";
    import layer_functions from "@/componentFunctions/layer_functions";

    export default defineComponent({
        name: "serviceComponent",
        components: {},

        setup() {
            const {servicesList, getServices} = services()
            const {list, layerGroupList} = layerGroupFunctions()
            const {addServiceLayer} = layer_functions()

            const initData = ref(false)
            const layerTypesList = ref(Object.values(Layer_types))

            const addLayerServiceForm = ref<VForm>()
            const {nameRule} = rules()

            onMounted(async () => {
                await getServices()
                await list()

                setTimeout(() => {
                    initData.value = true
                }, 300)


            })

            return {
                servicesList, initData, addLayerServiceForm, nameRule, layerGroupList, layerTypesList, addServiceLayer
            }
        },
        data() {
            return {
                valid: false,

                layer: {} as ServiceLayerInterface,

                show: false,
            };
        },
        props: {},
        methods: {
            async nextPageFunc(): Promise<{ result: boolean, data: ResponseLayerUpload | null }> {
                if (this.addLayerServiceForm) {
                    const res = await this.addLayerServiceForm.validate()
                    if (res.valid) {

                        const response = await this.addServiceLayer(this.layer)
                        if (response.text.length === 0) {
                            return {result: true, data: null}
                        }
                        return {result: false, data: null}
                    }
                }
                return {result: false, data: null}
            }
        },

        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 100);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
