<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <p v-if="topicShow" class="font-weight-bold pr-4 header_font">انتخاب مقدار عددی</p>

            </v-row>
        </v-toolbar>
        <div style="height: calc(100% - 49px) ;overflow-y: hidden" class="bg-grey-lighten-2">

            <v-row class="ma-0 pa-0 " style="height:100%;width: 100%">
                <v-row class="pa-0 ma-0 pa-2"
                       style="overflow-y: auto;height: calc(100% - 50px);width: 100%;margin-top: 10px!important;"
                       justify="center" align="center">
                    <v-col cols="10" sm="5" class="bg-white rounded-lg elevation-3 myForm">
                        <v-form ref="processNumberInputForm">
                            <v-text-field
                                    density="compact"
                                    variant="solo"
                                    v-model="value"
                                    type="number"
                                    :rules="nameRule"
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="primary" icon="mdi-numeric"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                    <p class="">مقدار عددی</p>
                                </template>
                            </v-text-field>
                        </v-form>

                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0 border-t" style="height: 40px;width: 100%" align="center" justify="end">
                    <v-btn @click="saveBtn" class="font-weight-bold ml-2" variant="tonal" color="dark_blue" height="30px" size="x-small">
                        ذخیره
                        <v-icon class="mr-1">mdi-content-save</v-icon>
                    </v-btn>
                </v-row>
            </v-row>


        </div>
        <v-divider></v-divider>
    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import {AnalyzeListItem, ProcessOutput} from "@/models/Analyze.interface";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";


    export default defineComponent({
        name: "SetNumberAsModelInputComponent",
        components: {},
        setup() {
            const store = useStore()
            const router = useRouter()

            const processNumberInputForm = ref<VForm>()
            const {nameRule, floatRule} = rules()

            return {
                store, router, processNumberInputForm, nameRule
            }
        },
        data() {
            return {
                value:null,
                topicShow: true,
            };
        },
        props: {},
        emits:['getFeaturesData'],
        methods: {
            async saveBtn() {
                if (this.processNumberInputForm) {
                    const res = await this.processNumberInputForm.validate()

                    if (res.valid) {
                        this.$emit('getFeaturesData',{
                            type:'number',
                            data:this.value
                        })

                        this.$toast.add({
                            group: 'tr',
                            life: 2000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'تنظیمات اعمال شد'
                        });
                        this.$router.push({name: 'setModelInput'})
                    }
                }
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @media only screen and (max-width: 600px) {
        .header_font {
            font-size: 10px;
        }
    }
</style>
