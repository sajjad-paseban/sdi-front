<template>

    <v-slide-y-transition>
        <div v-if="show" class="py-1" style="height: 100%;width: 100%">

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
                        class="ma-0 pa-2 pb-3"

                        style="; height: 100%;display: grid;;"
                >
                    <div class="pa-2 mysub">
                        <v-row class="ma-0 pa-0">
                            <p style="font-size: 10px; line-height: 20px">
                                در این قسمت با پر کردن موارد زیر ، تنظیمات اولیه ایجاد لایه اعمال میشود .
                            </p>
                        </v-row>
                    </div>

                    <v-form class="myForm rounded-lg elevation-2 py-3" ref="AddLayerForm"
                            style="width: 100%;background-color: #f3f3f3;height: max-content">



                        <v-row class="ma-0 mt-4  pa-0">
                            <v-col cols="12" sm="6" md="4" lg="3">
                                <v-text-field
                                        density="compact"
                                        variant="solo"
                                        v-model="layer.layer_name"
                                        :rules="nameRule"
                                        required
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

                            <v-col cols="12" sm="6" md="4" lg="3">
                                <v-text-field
                                        density="compact"
                                        v-model="layer.layer_code"
                                        variant="solo"
                                        required
                                        type="number"
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


                </v-card>
            </v-fade-transition>

        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import layerGroupFunctions from "@/componentFunctions/layerGroup_functions";
    import layer_functions from "@/componentFunctions/layer_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {EmptyLayerInterface, Layer_types, LayerInterface, ResponseLayerUpload} from "@/models/Layer.Interface";

    export default defineComponent({
        name: "layerConfig",
        components: {},
        setup() {
            const {list, layerGroupList} = layerGroupFunctions()
            const{addEmptyLayer} = layer_functions()

            const AddLayerForm = ref<VForm>()
            const {nameRule} = rules()
            const layerTypesList = ref(Object.values(Layer_types))

            const initData = ref(false)
            onMounted(async () => {
                await list()

                setTimeout(() => {
                    initData.value = true
                }, 300)


            })

            return {
                layerGroupList, initData, AddLayerForm, nameRule,addEmptyLayer,layerTypesList
            }
        },
        data() {
            return {
                layer: {} as EmptyLayerInterface,

                show: false,
            };
        },
        props: {},
        methods: {
            async nextPageFunc(): Promise<{result:boolean,data:ResponseLayerUpload|null}> {
                if (this.AddLayerForm) {
                    const res = await this.AddLayerForm.validate()
                    if (res.valid) {
                        const response = await this.addEmptyLayer(this.layer)
                        if (response.text.length === 0 && response.result) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'لایه آپلود شد '
                            });

                            return {result:true,data:response.result}
                        }
                        return {result:false,data:null}
                    }
                }
                return {result:false,data:null}
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
