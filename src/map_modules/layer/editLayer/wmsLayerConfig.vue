<template>
    <v-slide-y-transition>
        <div v-if="show" class="pa-2" style="height: 100%">

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
                                در این قسمت با پر کردن موارد زیر ، تنظیمات اولیه ویرایش لایه اعمال میشود .
                            </p>
                        </v-row>

                    </div>
                    <v-row class="ma-0 pt-0 px-2" style="align-items: center; height: 100%">
                        <v-form ref="editLayerForm" class="myForm rounded-lg elevation-2 py-3"
                                style="width: 100%;background-color: #f3f3f3;height: max-content">

                            <v-row class="ma-0 pa-0 ">
                                <v-col cols="12" md="4" lg="3">
                                    <v-autocomplete
                                            :items="servicesList"
                                            v-model="layerRetrieve.service_profile.id"
                                            density="compact"
                                            variant="solo"
                                            item-value="id"
                                            item-title="topic"

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
                                            v-model="layerRetrieve.name"
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
                                            v-model="layerRetrieve.code"
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

                                            :items="layerTypesList"
                                            v-model="layerRetrieve.type_layer"
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

                                            :items="layerGroupList"
                                            density="compact"
                                            item-title="name"
                                            variant="solo"
                                            item-value="id"
                                            v-model="layerRetrieve.id"
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
    import {
        EmptyLayerInterface,
        Layer_types,
        ResponseLayerUpload,
        ServiceLayerInterface
    } from "@/models/Layer.Interface";
    import layerGroupFunctions from "@/componentFunctions/layerGroup_functions";
    import layer_functions from "@/componentFunctions/layer_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import extra_layer_functions from "@/componentFunctions/extra_layer_functions";
    import {UpdateLayerConfigSd} from "@/api/layer/SD.Models/updateLayerConfig.sd";
    import services from "@/componentFunctions/connection_service_functions";

    export default defineComponent({
        name: "wmsLayerConfigComponent",
        components: {},
        setup() {
            const {list, layerGroupList} = layerGroupFunctions()
            const {layerRetrieve, getLayerRetrieve} = extra_layer_functions()
            const {updateServiceLayer} = layer_functions()
            const {servicesList, getServices} = services()
            const layerTypesList = ref(Object.values(Layer_types))

            const editLayerForm = ref<VForm>()
            const router = useRouter()
            const route = useRoute()
            const toast = useToast()
            const {nameRule} = rules()
            const layerId = ref<number>(0)

            const initData = ref(false)
            onMounted(async () => {

                if (!route.params.id) {

                    toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'لایه مشخص نیست'
                    });
                    router.go(-1)
                } else {

                    if (typeof route.params.id === 'string') {
                        layerId.value = parseInt(route.params.id)
                        await getLayerRetrieve(parseInt(route.params.id))
                    }
                    await list()
                    await getServices()

                    setTimeout(() => {
                        initData.value = true
                    }, 300)
                }

            })

            return {
                layerGroupList, initData, nameRule, editLayerForm, layerRetrieve, updateServiceLayer, layerId,servicesList,layerTypesList
            }
        },
        data() {
            return {
                valid: false,

                layer: {} as EmptyLayerInterface,
                show: false,
            };
        },
        props: {},
        methods: {
            async nextPageFunc(): Promise<{ result: boolean, data: ResponseLayerUpload | null }> {
                if (this.editLayerForm) {
                    const res = await this.editLayerForm.validate()
                    if (res.valid && this.layerRetrieve && this.layerRetrieve.service_profile) {
                        console.log(this.layerRetrieve)
                        const data: ServiceLayerInterface = {
                            layer_code: this.layerRetrieve.code,
                            layer_group_id: this.layerRetrieve.layer_group.id,
                            layer_name: this.layerRetrieve.name,
                            service_id: this.layerRetrieve.service_profile.id,
                            layer_type: this.layerRetrieve.type_layer,
                        }
                        const response = await this.updateServiceLayer(data, this.layerId)
                        if (response.text.length === 0 && response.result) {
                            return {result: true, data: response.result}
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
<style></style>
