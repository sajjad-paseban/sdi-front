<template>
    <div style="height:100%;width:100%" class="">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3 pb-1">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <v-col cols="8" sm="4" style="height: 80%">

                    <v-text-field
                            density="compact"
                            variant="solo"
                            required
                            v-model="searchTextValue"
                            @update:model-value="searchTemp"
                            clearable
                    >
                        <template v-slot:prepend-inner>
                            <v-icon color="dark_blue" icon="mdi-magnify"/>
                        </template>

                        <template v-slot:label>
                            <!-- <p  class="text-primary">نام لایه</p> -->
                            <p class="">جستجو قالب</p>
                        </template>
                    </v-text-field>

                </v-col>

            </v-row>


        </v-toolbar>
        <div style="height:calc(100% - 55px);width:100%">
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
                <v-row v-if="initData" class="pa-0 ma-0"
                       style="overflow-y: auto;height: calc(100% - 10px);margin-top: 10px!important;align-content: flex-start">
                    <v-col :key="index" v-for="(i,index) in searchGetTempsList" cols="12"
                           sm="4" md="3">
                        <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                                <v-card :elevation="isHovering ? 10 : 2" height="100" class="border rounded-lg"
                                        v-bind="props"
                                        :color="isHovering ? 'card_active' : undefined">
                                    <div style="height: 100%;width: 100%">
                                        <div style="height: 60%;width: 100%">
                                            <v-row class="pa-0 ma-0 pa-1 mr-n1" style="height:45%;font-size: 11px"
                                                   align="center">
                                                <v-col style="height:80%" cols="6" class="ma-0  font-weight-bold">
                                                    نام : {{ i.name }}
                                                </v-col>
                                                <v-col style="height:80%" cols="6"
                                                       class="ma-0   font-weight-bold">
                                                    گروه :{{ getGroupNameById(i.print_template_group) }}
                                                </v-col>

                                            </v-row>
                                            <v-row class="pa-0 ma-0 pa-1 mr-n1" style="height:45%;font-size: 11px"
                                                   align="center">

                                                <v-col style="height:80%" cols="6"
                                                       class="ma-0   font-weight-bold">
                                                    متغیر :{{ i.model_variable }}
                                                </v-col>
                                                <v-col style="height:80%" cols="6"
                                                       class="ma-0   font-weight-bold">
                                                    کد :{{ i.id }}
                                                </v-col>
                                            </v-row>

                                        </div>
                                        <v-divider class="font-weight-bold"/>

                                        <div style="height: calc(40% - 2px);width: 100%">
                                            <v-row class="ma-0 pa-0" style="height: 100%" align="center"
                                                   justify="start">
                                                <v-btn
                                                        variant="text"
                                                        size="x-small"
                                                        color="white"
                                                        class=""
                                                        @click="router().push({name:'editModel',params:{model:i.model_variable,id:i.id}})"
                                                        style="font-weight: bold !important;"
                                                        v-tooltip.bottom="'ویرایش'"
                                                >
                                                    <v-avatar size="20" class="">
                                                        <v-img
                                                                class=""
                                                                src="@/assets/icons/edit.png"
                                                                alt="John"
                                                        ></v-img>
                                                    </v-avatar>
                                                </v-btn>
                                                <v-btn v-if="i.id"
                                                        variant="text"
                                                        size="x-small"
                                                        color="white"
                                                        class=""
                                                        @click="deletePrintModel(i.id)"
                                                        style="font-weight: bold !important;"
                                                        v-tooltip.bottom="'حذف'"
                                                >
                                                    <v-avatar size="20" class="">
                                                        <v-img
                                                                class=""
                                                                src="@/assets/icons/delete.png"
                                                                alt="John"
                                                        ></v-img>
                                                    </v-avatar>
                                                </v-btn>
                                                <v-btn
                                                        variant="text"
                                                        @click="previewTemp(i)"
                                                        size="x-small"
                                                        color="white"
                                                        class=""
                                                        style="font-weight: bold !important;"
                                                        v-tooltip.bottom="'پیش نمایش'"
                                                >

                                                    <v-img
                                                            height="20"
                                                            width="20"
                                                            class=""
                                                            src="@/assets/icons/see.png"
                                                            alt="John"
                                                    ></v-img>

                                                </v-btn>

                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </template>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-fade-transition>

            <v-main v-show="false" class="border elevation-2 rounded-lg"
                 style="width: 400px;height:400px;;text-align: right!important;">

                <Editor
                        api-key="no-api-key"
                        :init="init"
                        style=""
                        v-model="editorData"
                />


            </v-main>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";

import {useStore} from "vuex";
import print_functions from "@/componentFunctions/print_functions";
import {PrintTemplate} from "@/models/Print.interface";
import tinymce from "tinymce";
import Editor from '@tinymce/tinymce-vue'
import router from "@/router";

export default defineComponent({
    name: "LayerComponent",
    components: {Editor},
    setup() {
        const store = useStore()
        const {getTemps, getTempsList} = print_functions()
        const {list, tempGroupList,deleteTemp,previewFormData,previewFormDataValue} = print_functions()


        const initData = ref(false)
        const searchGetTempsList = ref<PrintTemplate[]>([])
        const editorData = ref('')

        onMounted(async () => {
            await getTemps({})
            searchGetTempsList.value = [...getTempsList.value]
            await list()
            initData.value = true
        })

        return {
            store, initData, getTempsList, tempGroupList, searchGetTempsList,deleteTemp,getTemps,editorData,previewFormData,previewFormDataValue
        }
    },
    data() {
        return {
            searchTextValue: '',
            init: {
                selector: 'textarea#open-source-plugins',
                plugins: 'export preview',

                menubar: 'file edit view insert format tools table help',

                toolbar: "preview",
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                image_advtab: true,
                link_list: [],
                image_list: [],
                image_class_list: [],
                min_height: 400,
                max_height: 400,
                directionality: 'ltr',
                resize: false,
                importcss_append: true,
                file_picker_callback: (callback, value, meta) => {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === 'file') {
                        callback('https://www.google.com/logos/google.jpg', {text: 'My text'});
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === 'image') {
                        callback('https://www.google.com/logos/google.jpg', {alt: 'My alt text'});
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === 'media') {
                        callback('movie.mp4', {source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg'});
                    }
                },

                Template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                Template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',

                image_caption: true,

                noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link image table',
                content_style: 'body { font-family:Tahoma; font-size:16px }',
                language: 'fa',


            },
        };
    },
    props: {},
    methods: {
        router() {
            return router
        },
        getGroupNameById(id: number) {
            let res = ''
            if (this.tempGroupList) {
                this.tempGroupList.map((item) => {
                    if (item.id === id) {
                        res = item.name
                    }
                })
            }
            return res
        },
        searchTemp(value: string|null) {
            if (value === null) {
                this.searchGetTempsList = this.getTempsList
            }else {
                if (this.getTempsList) {
                    this.searchGetTempsList = this.getTempsList.filter((item) => {
                        return item.name?.includes(value);
                    })
                }
            }


        },
        deletePrintModel(modelId:number){
            this.store.commit('setConfirmDialog', {
                massage: 'آیا حذف مورد تایید است ؟',
                topic: 'اخطار',
                active:true,
                accept: async () => {
                    console.log(modelId)
                    const res = await this.deleteTemp(modelId)
                    if (res){
                        await this.getTemps({})
                        this.searchGetTempsList = [...this.getTempsList]
                    }


                },
                reject: () => {
                    console.log('reject')
                },
            })
        },
        async previewTemp(i: PrintTemplate) {


            await this.previewFormData({data: i.temp_value,model:i.model_variable})
            this.editorData = this.previewFormDataValue
            setTimeout(() => {
                tinymce.activeEditor?.execCommand('mcePreview')
            }, 100)

        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tox .tox-dialog--width-lg {
    height: 80dvh !important;
    width:80dvw!important;
}
.tox .tox-dialog-wrap__backdrop {
    background-color: rgb(0 0 0 / 51%)!important;
}

@media only screen and (max-width: 700px) {
    .tox .tox-dialog--width-lg {
        top:10dvh!important;
        height: 80dvh !important;
        width:80dvw!important;
    }
}
</style>
