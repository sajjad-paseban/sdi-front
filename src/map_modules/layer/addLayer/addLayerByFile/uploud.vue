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
                        class="ma-0 pa-2 pb-3"

                        style="; height: 100%; min-width: 300px;display: grid;overflow: auto;"
                >
                    <div class="pa-2 mysub">
                        <v-row class="ma-0 pa-0">
                            <p style="font-size:10px;line-height: 20px;">
                                بارگزاری انواع لایه با فرمت های Shp , kmz , kml , dwg , dxf , tiff .
                                لطفا برای بارگزاری به نکات زیر توجه نمایید
                            </p>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <p style="font-size:10px;line-height: 20px;">
                                ۱ - هر فایل باید ایتدا از طریق نرم افزار مربوطه به صورت زمین مرجع (
                                ژئورفرنس) ارائه شود
                            </p>
                        </v-row>
                        <v-row class="ma-0 pa-0">
                            <p style="font-size:10px;line-height: 20px;">
                                ۲ - فایل های مربوط به هر لایه باید در یک فایل فشزده (Zip) بارگزاری
                                شود . به طور مثال برای لایه Shp فایل پسوند .shp و .shx و .dbf و .Prj
                                را در یک فایل زیپ در این مرحله بارگزاری شود.
                            </p>
                        </v-row>
                    </div>

                    <v-form class="myForm rounded-lg elevation-2 py-3" ref="uploadForm"
                            style="width: 100%;background-color: #f3f3f3;height: max-content">
                        <v-row class="ma-0 mt-4 pa-0">
                            <v-col class=" myFile" cols="12" sm="6" md="3">
                                <v-select
                                        v-model="layer.type"
                                        chips
                                        clearable
                                        prepend-inner-icon="mdi-bookmark-plus-outline"
                                        variant="solo"
                                        :items="items"
                                        item-title="text"
                                        item-value="value"
                                        :rules="nameRule"
                                        label="انتخاب فرمت فایل آپلودی"
                                        density="compact"
                                        @update:modelValue="selectFileType"
                                ></v-select>
                            </v-col>

                            <v-col class=" myFile " cols="12" sm="6" md="3">
                                <v-file-input
                                        label="انتخاب فایل"
                                        chips
                                        accept=".zip,.rar"
                                        v-model="layerFile"
                                        prepend-inner-icon="mdi-paperclip"
                                        variant="solo"
                                        density="compact"
                                        prepend-icon=""
                                        show-size
                                        :rules="nameRule"
                                >
                                </v-file-input>

                            </v-col>

                            <v-spacer/>
                            <v-spacer/>
                        </v-row>


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
    import {LayerInterface, ResponseLayerUpload} from "@/models/Layer.Interface";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import layer_functions from "@/componentFunctions/layer_functions";

    export default defineComponent({
        name: "uploadComponent",
        components: {},
        setup() {
            const {list, layerGroupList} = layerGroupFunctions()
            const{uploadLayer} = layer_functions()

            const uploadForm = ref<VForm>()
            const {nameRule} = rules()

            const initData = ref(false)
            onMounted(async () => {
                await list()

                setTimeout(() => {
                    initData.value = true
                }, 300)


            })

            return {
                layerGroupList, initData, uploadForm, nameRule,uploadLayer
            }
        },

        data() {
            return {

                show: false,

                items: [
                    {
                        text: "فایل با فرمت SHP",
                        value: "SHP",
                    },
                    {
                        text: "فایل با فرمت  KML ",
                        value: "KML",
                    },
                    {
                        text: "فایل با فرمت  KMZ ",
                        value: "KMZ",
                    },
                    {
                        text: "فایل با فرمت TIFF ",
                        value: "TIFF",
                    },
                    {
                        text: "فایل با فرمت  JSON ",
                        value: "JSON",
                    },
                ],

                fileType: "SHP",

                layer: {} as LayerInterface,

                layerFile:[] as File[]
            };
        },
        props: {
            msg: String,
        },
        methods: {
            selectFileType(data: null | string) {
                if (data) {
                    console.log(data);
                }
            },
            async nextPageFunc(): Promise<{result:boolean,data:ResponseLayerUpload|null}> {
                if (this.uploadForm) {
                    const res = await this.uploadForm.validate()
                    if (res.valid) {
                        this.layer.file = this.layerFile[0]

                        const response = await this.uploadLayer(this.layer)
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
<style>

</style>
