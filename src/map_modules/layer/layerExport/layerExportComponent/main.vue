<template>

    <div style="background-color:#f3f3f3;width: 100%;height: 100%" dir="rtl" class="pa-1 px-2 pt-0 mt-n1">
        <div style="height: 100%">
            <v-row class="ma-0 pa-0">
                <v-btn size="small" variant="tonal" color="primary" class="rounded-lg mr-3 mt-2">خروجی از
                    لایه
                </v-btn>
            </v-row>
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
                <div v-if="initData" class="rounded-lg mt-n4 pt-4 "
                     style="width: 100%;height: calc(100% - 22px);">

                    <div style="width: 100%;height:100%;" class="pa-3">
                        <v-form style="width: 100%;height: 100%" ref="exportForm">
                            <v-card class="rounded-lg" height="100%">
                                <v-row class="ma-0 pa-0 myForm" style="height: 100%;width: 100%" align="center"
                                       justify="center">
                                    <v-col cols="12" sm="11">

                                        <v-row class="ma-0 pa-0" justify="center">
                                            <v-col cols="12" sm="4">
                                                <v-autocomplete

                                                        :items="layerExportTypesList"
                                                        density="compact"
                                                        v-model="exportType"
                                                        variant="solo"
                                                        :rules="nameRule"
                                                        required
                                                >
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                                        <p class="">نوع خروجی</p>
                                                    </template>
                                                </v-autocomplete>
                                            </v-col>
                                        </v-row>
                                        <div style="height: 80px"></div>
                                        <v-row class="ma-0 pa-0" justify="center">

                                            <v-btn
                                                    variant="tonal"
                                                    prepend-icon="mdi-content-save"
                                                    style="font-weight: bold !important"
                                                    rounded="lg"
                                                    size="small"
                                                    class="mt-1"
                                                    color="primary"
                                                    @click="exportBtn"
                                            >
                                                خروجی
                                            </v-btn>

                                        </v-row>


                                    </v-col>
                                </v-row>

                            </v-card>
                        </v-form>

                    </div>


                </div>
            </v-fade-transition>


        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import extra_layer_functions from "@/componentFunctions/extra_layer_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {useStore} from "vuex";


    export default defineComponent({
        name: "MainExportLayer",
        setup() {
            const {getLayerExportTypes, layerExportTypesList, layerExport, layerExportLink} = extra_layer_functions()
            const store = useStore()
            const exportForm = ref<VForm>()
            const {nameRule} = rules()

            const initData = ref(false)

            onMounted(async () => {
                await getLayerExportTypes()
                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                initData, layerExportTypesList, exportForm, nameRule, layerExport, layerExportLink, store
            }
        },
        props: {
            layerId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                exportType: null as string | null
            }
        },
        methods: {
            async exportBtn() {
                if (this.exportForm) {
                    const res = await this.exportForm.validate()
                    if (res.valid && this.exportType) {
                        await this.layerExport({export_type: this.exportType}, this.layerId)
                        console.log(this.store.state.Backend + this.layerExportLink, 'download link')
                        if (this.layerExportLink) {
                            const link = document.createElement('a')
                            link.href = this.store.state.layerExportLink + this.layerExportLink
                            link.download = 'layer.zip'
                            link.click()
                        }

                    }
                }
            }
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
