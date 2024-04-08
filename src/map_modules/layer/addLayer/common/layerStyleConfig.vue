<template>
    <v-slide-y-transition>
        <div v-if="show" class="py-1" style="height: 100%">

            <v-row class="ma-0 pa-0" align="center" justify="center" style="height: 100%">

                <v-col cols="12" sm="3" align="center">
                    <v-card

                            @click="menuHandler(1)"
                            :color="iconBack"
                            class="ma-0 pa-0 styleBtn elevation-0"
                            max-width="124"
                            max-height="100"
                    >
                        <v-img src="@/assets/icons/seting.png" height="60px"></v-img>
                        <v-card-text class="ma-0 pa-0 text-black"> تنظیمات پایه</v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="3" align="center">
                    <v-card
                            @click="menuHandler(2)"
                            :color="iconBack"
                            class="ma-0 pa-0 styleBtn elevation-0"
                            max-width="124"
                            max-height="100"
                    >
                        <v-img src="@/assets/icons/text.png" height="60px"></v-img>

                        <v-card-text class="ma-0 pa-0"> تنظیمات لیبل</v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="3" align="center">
                    <v-card
                            @click="menuHandler(3)"
                            :color="iconBack"
                            class="ma-0 pa-0 styleBtn elevation-0"
                            max-width="124"
                            max-height="100"
                    >
                        <v-img src="@/assets/icons/sld.png" height="60px"></v-img>
                        <v-card-text class="ma-0 pa-0"> آپلود sld فایل</v-card-text>
                    </v-card>

                </v-col>

                <v-col cols="12" sm="3" align="center">
                    <v-card
                            @click="menuHandler(4)"
                            :color="iconBack"
                            class="ma-0 pa-0 styleBtn elevation-0"
                            max-width="124"
                            max-height="100"
                    >
                        <v-img src="@/assets/icons/writeSld.png" height="60px"></v-img>
                        <v-card-text class="ma-0 pa-0"> نوشتن sld</v-card-text>
                    </v-card>
                </v-col>

            </v-row>

        </div>
    </v-slide-y-transition>

    <base-layer-style
            v-if="layerType&&show"
            :show="showDialog['baseStyle']"
            @hide="showDialog['baseStyle'] = false"
            :layerTypeProp="layerType"
            :layer-id="layerId"
            :id="showDialog['baseStyle']?layerBaseModelId:0"
            @setLayerModelId="setBaseLayerModelId"
    ></base-layer-style>

    <label-layer-style
            v-if="layerType&&show"
            :show="showDialog['labelStyle']"
            @hide="showDialog['labelStyle'] = false"
            @setLayerModelId="setLabelLayerModelId"
            :layer-id="layerId"
            :id="showDialog['labelStyle']?layerLabelModelId:0"
    ></label-layer-style>

    <upload-sld
            v-if="layerType&&show&&layerId"
            :show="showDialog['uploadSld']"
            @setLayerModelId="setFileLayerModelId"
            @hide="showDialog['uploadSld'] = false"
            :layer-id="layerId"
            :id="showDialog['uploadSld']?layerFileModelId:0"
    ></upload-sld>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import LabelLayerStyle from "@/map_modules/layer/addLayer/common/labelLayerStyle.vue";
    import BaseLayerStyle from "@/map_modules/layer/addLayer/common/baseLayerStyle.vue";
    import uploadSld from "@/map_modules/layer/addLayer/common/uploadSld.vue";

    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import {Layer_types, ResponseLayerUpload} from "@/models/Layer.Interface";
    import layer_functions from "@/componentFunctions/layer_functions";

    export default defineComponent({
        name: "layerStyleConfig",
        components: {BaseLayerStyle, LabelLayerStyle, uploadSld},

        setup() {

            const router = useRouter()
            const route = useRoute()
            const toast = useToast()

            const layerId = ref<number>()
            const show = ref<boolean>(false)
            const layerType = ref<Layer_types>(Layer_types.Polygon)


            onMounted(() => {
                if (!route.params.id) {

                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'لایه مشخص نیست'
                    });
                    router.go(-1)
                } else {
                    layerId.value = parseInt(String(route.params.id))
                    layerType.value = String(route.params.layer_type) as Layer_types
                }

                setTimeout(() => {
                    show.value = true;
                }, 100);
            })
            return {layerType, layerId, show}
        },

        data() {
            return {


                iconBack: '#ffffff00',

                showDialog: {
                    baseStyle: false,
                    labelStyle: false,
                    uploadSld: false,
                    writeSld: false
                },

                layerBaseModelId: 0 as number ,
                layerLabelModelId: 0 as number,
                layerFileModelId: 0 as number
            };
        },
        props: {
            msg: String,
        },
        methods: {
            menuHandler: function (value: number) {
                if (value == 1) {
                    this.showDialog["baseStyle"] = true;
                } else if (value == 2) {
                    this.showDialog["labelStyle"] = true;
                } else if (value == 3) {
                    this.showDialog["uploadSld"] = true;
                } else if (value == 4) {
                    this.showDialog["writeSld"] = true;
                }

            },

            async nextPageFunc(): Promise<{ result: boolean, data: ResponseLayerUpload | null }> {
                if (this.layerId){
                    if (this.layerFileModelId !== 0 || (this.layerBaseModelId !== 0 && this.layerLabelModelId !== 0)) {
                        this.$toast.add({
                            group: 'tr',
                            life: 7000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'تنظیمات استایل لایه اعمال شد .'
                        });

                        return {result: true, data: {type_layer:this.layerType,id:this.layerId,name:''}}
                    }
                }
                this.$toast.add({
                    group: 'br',
                    life: 7000,
                    severity: 'error',
                    summary: ' خطا در دخواست',
                    detail: 'تنظیمات استایل به درستی اعمال نشده است .'
                });
                return {result: false, data: null}
            },
            setLabelLayerModelId(data: number) {
                this.layerFileModelId = 0
                this.layerLabelModelId = data
            },
            setBaseLayerModelId(data: number) {
                this.layerFileModelId = 0
                this.layerBaseModelId = data
            },
            setFileLayerModelId(data: number) {
                this.layerBaseModelId = 0
                this.layerLabelModelId = 0
                this.layerFileModelId = data
            },
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .styleBtn .v-card-text {
        font-size: 11px !important;
        font-weight: 600 !important;
        text-align: center !important;
        color: rgb(0, 0, 0) !important;
    }
</style>
