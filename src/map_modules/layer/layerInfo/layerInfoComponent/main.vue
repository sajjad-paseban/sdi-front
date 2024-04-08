<template>

    <div style="background-color:#f3f3f3;width: 100%;height: 100%" dir="rtl" class="pa-1 px-2 pt-0 mt-n1">
        <div style="height: 100%">
            <v-row class="ma-0 pa-0">
                <v-btn size="small" variant="tonal" color="primary" class="rounded-lg mr-2 mt-2">اطلاعات
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
                <div v-if="initData"  class="rounded-lg mt-n4 pt-4 elevation-3"
                     style="width: 100%;height: calc(100% - 22px);">
                    <div style="width: 100%;height:100%;" class="pa-2" >

                        <v-row
                                class="ma-0 px-2 metaBtn mb-4 mt-2"
                                style=" white-space: nowrap !important"
                        >
                            <v-btn

                                    @click="editFeature"
                                    prepend-icon="mdi-pencil-outline"
                                    variant="tonal"
                                    style="font-weight: bold !important"
                                    rounded
                                    color="info"
                                    size="x-small"
                                    class="elevation-1 ml-2"
                            >ویرایش لایه
                            </v-btn>

                            <v-btn
                                    variant="tonal"
                                    prepend-icon="mdi-trash-can-outline"
                                    style="font-weight: bold !important"
                                    rounded
                                    @click="deleteFeature"
                                    size="x-small"
                                    color="error"
                                    class="elevation-1 ml-2"
                            >حذف لایه
                            </v-btn>

                        </v-row>
                        <v-card class="rounded-lg">
                            <v-table density="compact">
                                <thead>

                                </thead>
                                <tbody>
                                <tr
                                        v-for="(value, name, index) in layerInfo"
                                        :key="index"
                                >
                                    <td>{{ tableNames[index] }}</td>
                                    <td>{{ value }}</td>
                                </tr>
                                </tbody>
                            </v-table>
                        </v-card>

                    </div>


                </div>
            </v-fade-transition>


        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import extra_layer_functions from "@/componentFunctions/extra_layer_functions";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";


    export default defineComponent({
        name: "MainLayerInfo",

        setup(props){
            const { getLayerInfo, layerInfo} = extra_layer_functions()
            const router = useRouter()
            const route = useRoute()
            const toast = useToast()


            const initData = ref(false)

            onMounted(async ()=>{
                if (props.layerId) {
                    await getLayerInfo(props.layerId)
                }

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return{
                initData,layerInfo,getLayerInfo
            }
        },

        props: {
            layerId:{
                type:Number,
                required:true
            }
        },
        data(){
            return{
                tableNames:['نام','زمان ایجاد','نوع لایه','تعداد عارضه','سیستم مختصات','نوع ذخیره']
            }
        },
        methods:{
            editFeature(){

                if (this.layerInfo &&this.layerInfo.imported_type === 'wms'){
                    this.$router.push({
                        name: 'editWmsLayerConfig',
                        params: {id: this.layerId}
                    });
                }else {
                    this.$router.push({
                        name: 'editLayerConfig',
                        params: {id: this.layerId}
                    });
                }
            },
            deleteFeature(){
                this.$router.push({
                    name: 'deleteLayer',
                    params: {id: this.layerId}
                });
            }
        },
        watch:{
            async layerId(){
                this.initData = false
                if (this.layerId) {
                    await this.getLayerInfo(this.layerId)
                }

                setTimeout(() => {
                    this.initData = true
                }, 300)
            }
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .v-table > .v-table__wrapper > table > tbody > tr > td,
    .v-table > .v-table__wrapper > table > thead > tr > td,
    .v-table > .v-table__wrapper > table > tfoot > tr > td {
        font-size: 10px !important;
    }

    .v-table > .v-table__wrapper > table > tbody > tr > td,
    .v-table > .v-table__wrapper > table > tbody > tr > th,
    .v-table > .v-table__wrapper > table > thead > tr > td,
    .v-table > .v-table__wrapper > table > thead > tr > th,
    .v-table > .v-table__wrapper > table > tfoot > tr > td,
    .v-table > .v-table__wrapper > table > tfoot > tr > th {
        padding: 3px 8px !important;
    }
    .v-table--density-compact > .v-table__wrapper > table > tbody > tr > td,
    .v-table--density-compact > .v-table__wrapper > table > thead > tr > td,
    .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
        height: 21px !important;
    }


</style>
