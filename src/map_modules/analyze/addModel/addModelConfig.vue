<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center" justify="start">
                <p class="font-weight-bold pr-4"> شروع ایجاد مدل</p>
            </v-row>
        </v-toolbar>
        <div style="height: calc(100% - 48px);overflow-y: hidden" class="bg-grey-lighten-2">
            <v-row class="ma-0 pa-0 " style="height:100%;width:100%;overflow-y: auto" justify="center" align="center">
                <v-col cols="12" sm="7" style="height: 100%;" class="d-flex align-center">

                    <div class=" myForm" style="height: 90%;width: 100%">
                        <v-form ref="analyzeConfigForm">
                            <v-row class="ma-0 pa-0 pt-3 bg-blue-grey-lighten-5 rounded-lg elevation-3" justify="center">
                                <v-col cols="12" sm="5">
                                    <v-text-field
                                            density="compact"
                                            variant="solo"
                                            v-model="data.name"
                                            :rules="nameRule"
                                            required
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">نام مدل</p>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-autocomplete
                                            :items="analyzeGroupListValue"
                                            density="compact"
                                            v-model="data.group_id"
                                            item-title="name"
                                            :rules="nameRule"
                                            variant="solo"
                                            item-value="id"

                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-sitemap"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">گروه</p>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="10">
                                    <v-textarea
                                            dir="rtl"
                                            no-resize
                                            class="font-weight-bold text-black"
                                            rows="5"
                                            v-model="data.des"
                                            background-color="light-blue"
                                            color="black"
                                            hint=""
                                            :rules="nameRule"
                                            persistent-hint
                                            placeholder="توضیحات مدل"
                                            variant="solo"
                                    >
                                    </v-textarea
                                    >
                                </v-col>
                            </v-row>
                        </v-form>

                    </div>

                </v-col>
            </v-row>
        </div>


    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import {AddAnalyze} from "@/models/Analyze.interface";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";


    export default defineComponent({
        name: "AddModelConfigComponent",
        components: {},
        setup() {
            const store = useStore()
            const router = useRouter()

            const analyzeConfigForm = ref<VForm>()
            const {nameRule} = rules()

            const {getAnalyzeGroupList, analyzeGroupListValue} = analyze_functions()

            onMounted(async () => {
                await getAnalyzeGroupList()
            })

            return {
                store, router, analyzeGroupListValue, analyzeConfigForm,nameRule
            }
        },
        data() {
            return {
                data:{
                    name:'',
                    des:'',
                } as {
                    name:string,
                    des:string,
                    group_id:number
                }
            };
        },
        props: {},
        methods: {

            async nextPageFunc(analyze: AddAnalyze) {

                if (this.analyzeConfigForm) {
                    const res = await this.analyzeConfigForm.validate()

                    if (res.valid && this.data.group_id !== null) {
                        analyze.config = {...this.data}
                        return {
                            result: true,
                            data: null
                        }
                    }else {
                        return {
                            result: false,
                            data: null
                        }
                    }
                }

            }
        },


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
