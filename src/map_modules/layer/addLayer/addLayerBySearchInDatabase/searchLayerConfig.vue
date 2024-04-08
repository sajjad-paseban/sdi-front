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
                            <p style="font-size: 10px; line-height: 20px">
                                در این قسمت با پر کردن موارد زیر ، تنظیمات اولیه ایجاد لایه اعمال میشود .
                            </p>
                        </v-row>
                    </div>

                    <v-form class="myForm rounded-lg elevation-2 py-3" ref="AddLayerForm"
                            style="width: 100%;background-color: #f3f3f3;height: max-content">

                        <v-row class="ma-0 mt-4 pa-0">
                            <v-col class=" myFile" cols="12" >
                                <v-row class="ma-0 pa-0">
                                    <v-btn
                                            variant="tonal"
                                            @click="selectDatabaseDialog=true"
                                            prepend-icon="mdi-database-search"
                                            style="font-weight: bold !important;"
                                            size="small"
                                            color="primary"
                                            class="elevation-1 mt-1 mx-1"
                                    >انتخاب پایگاه داده
                                    </v-btn>
                                    <v-btn
                                            :disabled="!database"
                                            variant="tonal"
                                            @click="makeLayerDialog=true"
                                            prepend-icon="mdi-table"
                                            style="font-weight: bold !important;"
                                            size="small"
                                            color="primary"
                                            class="elevation-1 mt-1 mx-1"
                                    >ایجاد لایه
                                    </v-btn>
                                </v-row>

                            </v-col>



                            <v-spacer/>
                            <v-spacer/>
                        </v-row>

                        <v-row class="ma-0 mt-4  pa-0">
                            <v-col cols="12" sm="6" md="4" lg="3">
                                <v-text-field
                                        :disabled="!layerData"
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
                                        :disabled="!layerData"
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
                                        :disabled="!layerData"
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
    <simple-dialog
            :show="makeLayerDialog"
            topic=""
            width="70vw"
            height="80dvh"
            @closeDialog="makeLayerDialog = false"
    >
        <div
                class=""
                dir="rtl"
                style="
            overflow: auto;
            height: 100%;
            background-color: #dee2e62b;">
            <v-row class="ma-0 pa-2" align="center" style="height: 100%">
                <v-card
                        width="100%"
                        height="75dvh"
                        class="ma-0 pa-0 elevation-0"
                        style="overflow-y: auto;background-color: rgba(180,180,180,0)!important;"
                >

                    <searchInLayer v-if="database" @saveSearch="getSearchLayer" :databaseId="database"></searchInLayer>

                </v-card>
            </v-row>

        </div>
    </simple-dialog>

    <simple-dialog
            :show="selectDatabaseDialog"
            topic=""
            width="50vw"
            height="40dvh"
            @closeDialog="selectDatabaseDialog = false"
    >
        <div
                class=""
                dir="rtl"
                style="
            overflow: auto;
            height: 100%;
            background-color: #dee2e62b;">
            <v-row class="ma-0 pa-2" align="center" style="height: 100%">
                <v-card
                        width="100%"
                        height="35dvh"
                        class="ma-0 pa-0 elevation-0"
                        style="overflow-y: auto;background-color: rgba(180,180,180,0)!important;"
                >

                    <searchDatabaseComponent @saveDatabase="getDatabase"></searchDatabaseComponent>

                </v-card>
            </v-row>

        </div>
    </simple-dialog>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import layerGroupFunctions from "@/componentFunctions/layerGroup_functions";
    import layer_functions from "@/componentFunctions/layer_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {
        EmptyLayerInterface,
        Layer_types,
        LayerInterface,
        ResponseLayerUpload, SearchInDatabaseLayerInterface,
        SearchInLayerInterface
    } from "@/models/Layer.Interface";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import searchInLayer from  '@/map_modules/layer/addLayer/addLayerBySearchInDatabase/search.vue'
    import searchDatabaseComponent from  '@/map_modules/layer/addLayer/addLayerBySearchInDatabase/searchDatabase.vue'
    import {resultSimpleLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleLayerSearch.sd";
    import {resultSimpleDatabaseLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleDatabaseLayerSearch.sd";


    export default defineComponent({
        name: "searchLayerConfig",
        components: {SimpleDialog,searchInLayer,searchDatabaseComponent},
        setup() {
            const {list, layerGroupList} = layerGroupFunctions()
            const{addLayerBySearchInDatabaseLayer} = layer_functions()

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
                layerGroupList, initData, AddLayerForm, nameRule,layerTypesList,addLayerBySearchInDatabaseLayer
            }
        },
        data() {
            return {
                layer: {} as SearchInDatabaseLayerInterface,
                makeLayerDialog:false,
                selectDatabaseDialog:false,
                database :null as null|number,
                show: false,
                layerData :null as null|resultSimpleDatabaseLayerSearchSd
            };
        },

        methods: {
            async nextPageFunc(): Promise<{result:boolean,data:ResponseLayerUpload|null}> {
                if (this.AddLayerForm) {
                    const res = await this.AddLayerForm.validate()
                    if (res.valid) {
                        if (this.layerData){
                            this.layer.layer_data = this.layerData
                            const response = await this.addLayerBySearchInDatabaseLayer(this.layer)
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
                        }else {
                                this.$toast.add({
                                    group: 'br',
                                    life: 7000,
                                    severity: 'error',
                                    summary: 'خطا',
                                    detail: 'جدول ایجاد نشده است.'
                                });
                        }

                        return {result:false,data:null}
                    }
                }
                return {result:false,data:null}
            },

            getSearchLayer(data:resultSimpleDatabaseLayerSearchSd){
                this.makeLayerDialog = false
                this.layerData = data
            },

            getDatabase(data:number){
                if (data!== 0){
                    this.selectDatabaseDialog = false
                    this.database = data
                    this.$toast.add({group: 'tr', life: 7000, severity: 'success', summary: ' نتیجه', detail: 'دیتابیس انتخاب شد.'});

                }
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
