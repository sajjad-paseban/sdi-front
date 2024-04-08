<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center" justify="start">
                <p class="font-weight-bold pr-4"> انتخاب نوع خروجی</p>
            </v-row>
        </v-toolbar>
        <div style="height: calc(100% - 48px);overflow-y: hidden" class="bg-grey-lighten-2">
            <v-row class="ma-0 pa-0 " style="height:100%;width:100%;overflow-y: auto" justify="center" align="center">
                <v-col cols="12" sm="6" style="height: 90%;" class="">
                    <v-row class="pa-0 ma-0 " style="height: 100%">
                        <div style="height:65%;width:100%"
                             class="myForm bg-white rounded-lg elevation-3 d-flex align-center pr-5">
                            <v-radio-group class="font-weight-bold  text-black" color="dark_blue" v-model="exportType">
                                <v-radio class="" label="نمایش در نقشه" :value="modelExportTypeEnums.Json"></v-radio>
                                <v-radio label="خروجی فایل لایه" :value="modelExportTypeEnums.File"></v-radio>
                                <v-radio label="خروجی اکسل" :value="modelExportTypeEnums.Exel"></v-radio>
                                <v-radio label="به عنوان ورودی مدل دیگر" :value="modelExportTypeEnums.InputModel"></v-radio>
                            </v-radio-group>
                        </div>
                        <div style="height:5%;width:100%" class=""></div>
                        <v-slide-y-transition>
                            <div v-if="exportType==='File'" style="height:30%;width:100%"
                                 class="myForm bg-white rounded-lg elevation-3">
                                <v-row class="ma-0 pa-0" align="center" style="height:100%" justify="center">
                                    <v-col cols="12" sm="8">
                                        <v-autocomplete

                                                :items="exportFileList"
                                                density="compact"
                                                v-model="fileExportType"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">انتخاب نوع خروجی لایه</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-slide-y-transition>

                    </v-row>

                </v-col>
            </v-row>
        </div>


    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {AddAnalyze, ModelExportTypeEnums, ModelFileExportTypeEnums} from "@/models/Analyze.interface";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import {useToast} from "primevue/usetoast";


    export default defineComponent({
        name: "SetModelOutputComponent",
        components: {},
        setup() {
            const store = useStore()
            const router = useRouter()
            const toast = useToast()

            const modelExportTypeEnums = ModelExportTypeEnums
            const exportFileList = ref<string[]>(Object.values(ModelFileExportTypeEnums))

            return {
                store, router,modelExportTypeEnums,exportFileList,toast
            }
        },
        data() {
            return {
                exportType: 'Json',
                fileExportType:null
            };
        },
        props: {},
        methods: {
            nextPageFunc(analyze: AddAnalyze) {
                if (this.exportType === ModelExportTypeEnums.File && this.fileExportType=== null){
                    this.toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'تنظیمات ورودی ها اعمال نشده است'
                    });
                    return{
                        result:false
                    }
                }else {
                    analyze.export_type = {
                        file_type:this.fileExportType,
                        type:this.exportType
                    }
                    return {
                        result: true
                    }
                }


            }
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
