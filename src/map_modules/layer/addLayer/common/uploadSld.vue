<template>
    <simple-dialog
            :show="showDialog"
            topic="آپلود sld"
            width="300px"
            height="70vh"
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
            <v-card width="100%" height="100%">
                <v-form ref="addFileStyleForm">

                    <!--                    <v-row class="ma-0 pa-0" justify="center" align="center">
                                            <v-col class=" myFile " cols="12">
                                                <v-text-field :rules="nameRule" v-model="name" density="compact" variant="solo"
                                                              required>
                                                    <template v-slot:prepend-inner>
                                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                                    </template>

                                                    <template v-slot:label>
                                                        &lt;!&ndash; <p  class="text-primary">نام لایه</p> &ndash;&gt;
                                                        <p class="">نام فایل</p>
                                                    </template>


                                                </v-text-field>

                                            </v-col>
                                        </v-row>-->
                    <v-row class="ma-0 pa-0" justify="center" align="center">
                        <v-col class=" myFile " cols="12">
                            <v-file-input
                                    label="انتخاب فایل"
                                    chips
                                    color="primary"
                                    prepend-inner-icon="mdi-paperclip"
                                    variant="solo"
                                    density="compact"
                                    prepend-icon=""
                                    show-size
                                    v-model="file"
                            >
                            </v-file-input>

                        </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0" justify="end">
                        <v-btn
                                class=""
                                @click="saveFile"
                                variant="text"
                                style="
                font-weight: bold !important;
                font-size: 10px;
                margin-inline: 10px !important;
              "
                                rounded="lg"
                                color="info"
                        >ذخیره
                        </v-btn>
                    </v-row>
                </v-form>

            </v-card>
        </div>
    </simple-dialog>
</template>

<script lang="ts">
    import {defineComponent, ref} from "vue";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import rules from "@/componentFunctions/rules_functions";
    import fileStyle from "@/componentFunctions/fileStyle_functions";
    import VForm from "@/models/VForm.interface";
    import {number} from "zod";

    export default defineComponent({
        name: "UploadSldComponent",
        components: {SimpleDialog},

        setup() {
            const {addFileStyle, updateFileStyle} = fileStyle()
            const {nameRule} = rules()
            const addFileStyleForm = ref<VForm>()

            return {nameRule, addFileStyle, addFileStyleForm, updateFileStyle}
        },

        data() {
            return {
                showDialog: false,
                file: [] as File[],


            };
        },
        props: {
            show: Boolean,
            layerId: {
                type: Number,
                required: true
            }, id: {
                type: Number,
                default: 0
            },
        },
        methods: {

            async saveFile() {
                if (this.addFileStyleForm) {
                    const res = await this.addFileStyleForm.validate()

                    if (res.valid && this.file.length > 0) {
                        let response
                        if (this.id !== 0) {
                            response = await this.updateFileStyle({
                                name: String(this.layerId) + '_file',
                                file: this.file[0],
                                layer_id: this.layerId
                            }, this.id)
                        } else {
                            response = await this.addFileStyle({
                                name: String(this.layerId) + '_file',
                                file: this.file[0],
                                layer_id: this.layerId
                            })
                        }

                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'مدل فایل لایه اضافه شد '
                            });

                            this.$emit('setLayerModelId', response.id)
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
