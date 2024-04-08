<template>
    <simple-dialog
            :show="showDialog"
            topic="نوشتن sld"
            width="50vw"
            height="90vh"
            @closeDialog="$emit('hide', false)"
    >
        <div
                style="
        height: 100%;
        width: 100%;
        background-color: #f3f3f3;
        overflow: auto;
      "
        >
            <v-form ref="writeForm">
                <v-card width="100%" height="100%">

                    <v-row class="ma-0 pa-0 mt-n2" justify="center" align="center" style=" height: calc(100% - 40px)">
                        <v-col class="  ma-0 pa-0  " cols="12" sm="11" style="height: 100%">
                            <v-row class=" pa-0 ma-0 mt-3 mb-n3 ">
                                <v-col cols="12" md="4" style="align-self: center" class="myForm">
                                    <v-text-field v-model="name" class="" :rules="nameRule" density="compact" variant="solo"
                                                  required>
                                        <template v-slot:prepend-inner>
                                            <v-icon color="primary" icon="mdi-format-color-text"/>
                                        </template>

                                        <template v-slot:label>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="">نام فایل </p>
                                        </template>


                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dir="ltr" class="ma-0 px-2 pa-2 " style="height:calc(100% - 60px);">

                                <CodeEditor  font_size="12px"  style="width: 100%" :language_selector="true" :languages="[['xml', 'xml']]" v-model="sldText" value=""></CodeEditor>

                            </v-row>

                        </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0" justify="end">
                        <v-btn
                                class="mt-4"
                                variant="text"
                                style="
                font-weight: bold !important;
                font-size: 10px;
                margin-inline: 10px !important;
              "
                                rounded="lg"
                                color="info"
                                @click="saveTextSld"
                        >ذخیره
                        </v-btn>
                    </v-row>
                </v-card>
            </v-form>

        </div>
    </simple-dialog>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import SimpleDialog from "@/components/common/simpleDialog.vue";

    import rules from "@/componentFunctions/rules_functions";
    import VForm from "@/models/VForm.interface";
    import fileStyle from "@/componentFunctions/fileStyle_functions";
    import CodeEditor from 'simple-code-editor';
    export default defineComponent({
        name: "WriteSldComponent",
        components: {SimpleDialog,CodeEditor},

        setup() {
            const {addFileStyle} = fileStyle()

            const {nameRule} = rules()
            const writeForm = ref<VForm>()

            return {nameRule, writeForm,addFileStyle}
        },
        data() {
            return {
                showDialog: false,
                sldText: null as string | null,

                name:null as string|null

            };
        },
        props: {
            show: Boolean,
        },
        methods: {
            getText(): string | null {
                return this.sldText
            },

            async saveTextSld() {
                if (this.writeForm) {
                    const res = await this.writeForm.validate()

                    if (res.valid && this.sldText && this.name) {
                        const file = new Blob([this.sldText]);
                        console.log(this.sldText)
                        const response = await this.addFileStyle({name: this.name, file:  new File([file], "name.sld"),layer_id:1})

                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'مدل اضافه شد '
                            });

                            this.$emit('hide', false)
                        }
                    }
                }
            }
        },
        watch: {
            show() {
                this.showDialog = this.show;
            },
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
