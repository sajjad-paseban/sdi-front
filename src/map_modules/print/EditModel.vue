<template>

    <div style="height: 100%;width:100%;display: flex;flex-direction: row;flex-wrap: wrap;align-content: flex-start;justify-content: flex-start;"
         class="pa-2">
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
            <v-layout v-if="initData" style="height: 100%;width:100%;" class="">
                <v-btn id="myRotate" @click="drawer=!drawer"
                       style="position: absolute;z-index: 10000001;top:50%;transition: 0.2s;" density="compact"
                       icon="mdi-cog" color="info" class="elevation-0" :style="drawer?'left:245px':'left:10px'"></v-btn>
                <v-navigation-drawer
                        v-model="drawer"
                        permanent
                        location="left"
                        class="rounded-lg elevation-2 ml-1 mt-1"
                        style="height:calc(100% - 5px)"
                >

                    <div style="height: 100%" class="pa-1 ">
                        <v-row class="ma-0 pa-0 px-2 myForm pt-2 rounded-lg  " justify="center"
                               style="height:calc(100%);overflow-y: auto ">
                            <v-col cols="12" class="ma-0 pa-0 px-1">
                                <v-btn @click="openDialog('قالب های نمونه')" class="font-weight-bold rounded-lg"
                                       style="height:30px;width:100%"
                                       variant="tonal" color="dark_blue">
                                    قالب ها
                                </v-btn>
                            </v-col>
                            <ExpandPanelComponent style="height: calc(100% - 35px)" class="" id="expandId"
                                                  v-if="initDataAddModel&&printTemp"
                                                  :items="[{name:'تنظیمات قالب '},{name:'متغیر ها'},{name:'آرشیو عکس ها'},{name:'قالب های کوچک'},{name:'سربرگ ها'},{name:'پاورقی ها'}]">
                                <template #item="{item}">
                                    <v-row v-if="item.name==='تنظیمات قالب '" class="ma-0 pa-0 rounded-lg "
                                           :style="`height:${expandHeight+50}px`"
                                           style="overflow-y: auto;display: flex;align-content: flex-start;width:100%"
                                           justify="center">
                                        <v-col cols="12">
                                            <v-text-field
                                                    density="compact"
                                                    v-model="printTemp.name"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">نام</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete
                                                    :items="initDataAddModel.groups"
                                                    item-value="id"
                                                    v-model="printTemp.print_template_group"
                                                    item-title="name"
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                            >
                                                >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>
                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="text-blue-darken-4">
                                                        {{ 'انتخاب گروه' }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-autocomplete

                                                    :items="initDataAddModel.temp_sizes"
                                                    v-model="printTemp.temp_size"
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                            >
                                                >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>
                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="text-blue-darken-4">
                                                        {{ 'اندازه صفحه' }}</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>

                                    </v-row>
                                    <v-row v-if="item.name==='متغیر ها'" class="ma-0 pa-0 rounded-lg">
                                        <v-col cols="12" class="ma-0 pa-0">
                                            <v-text-field
                                                    density="compact"
                                                    v-model="searchVariablesValue"
                                                    @update:model-value="searchVariablesInput"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">جستجو</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-divider class="mb-1"/>
                                        <v-row :style="`height:${expandHeight}px`"
                                               style="width:100%;overflow-y: auto;display: flex;flex-direction: row;align-content: flex-start"
                                               class="pa-0 px-1 ma-0"
                                        >
                                            <div :draggable="true" @dragstart="onDragStart($event,i.value)"
                                                 v-for="i in searchVariables"
                                                 style="height: 30px;width:calc(100% - 6px);cursor: pointer;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
                                                 class="rounded elevation-2 bg-white my-1">
                                                <p class="text-center font-weight-bold mt-1 " style="font-size: 11px">
                                                    {{ i.name }}</p>
                                            </div>
                                        </v-row>

                                    </v-row>
                                    <v-row v-if="item.name==='آرشیو عکس ها'" class="ma-0 pa-0 rounded-lg"
                                           style="display: flex;align-content: flex-start">
                                        <v-col cols="12" class="ma-0 pa-0">
                                            <v-btn variant="tonal" color="dark_blue"
                                                   style="width:100%;height:25px;font-size: 12px"
                                                   @click="openDialog('آرشیو تصاویر')"
                                                   class="font-weight-bold">تنظیمات آرشیو
                                            </v-btn>
                                        </v-col>
                                        <v-divider class="my-1"/>
                                        <v-row :style="`height:${expandHeight}px`"
                                               style="width:100%;overflow-y: auto;display: flex;flex-direction: row;align-content: flex-start"
                                               class="pa-0 px-1 ma-0"
                                               justify="center">
                                            <div :draggable="true" @dragstart="onImageDragStart($event,i)"
                                                 v-for="i in initDataAddModel.photos"
                                                 style="height: 30px;width:calc(100% - 6px);cursor: pointer"
                                                 class="rounded elevation-2 bg-white my-1">
                                                <v-row class="ma-0 pa-0"
                                                       style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
                                                       justify="center">
                                                    <v-avatar size="30" class="">
                                                        <v-img src="@/assets/icons/image.png" alt="John"></v-img>
                                                    </v-avatar>
                                                    <v-spacer/>
                                                    <p class="text-center font-weight-bold mt-2" dir="ltr"
                                                       style="font-size: 11px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width:100px">
                                                        {{ i.split('/')[i.split('/').length - 1] }}</p>
                                                    <v-spacer/>
                                                </v-row>

                                            </div>
                                        </v-row>

                                    </v-row>
                                    <v-row v-if="item.name==='قالب های کوچک'" class="ma-0 pa-0 rounded-lg">
                                        <v-col cols="12" class="ma-0 pa-0">
                                            <v-text-field
                                                    density="compact"
                                                    v-model="searchSmallTempsValue"
                                                    @update:model-value="searchSmallTempsInput"
                                                    variant="solo"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                    <p class="">جستجو</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-divider class="mb-1"/>
                                        <v-row :style="`height:${expandHeight}px`"
                                               style=";width:100%;overflow-y: auto;display: flex;flex-direction: row;align-content: flex-start;"
                                               class="pa-0 px-1 ma-0"
                                               justify="center">
                                            <div :draggable="true" @dragstart="onHeaderDragStart($event,i.temp_value)"
                                                 @dragend="onHeaderDragEnd($event,i.temp_value)"
                                                 v-for="i in searchSmallTemps"
                                                 style="height: 30px;width:calc(100% - 6px);cursor: pointer;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
                                                 class="rounded elevation-2 bg-white my-1">
                                                <p class="text-center font-weight-bold mt-1 " style="font-size: 11px">
                                                    {{ i.name }}</p>
                                            </div>
                                        </v-row>

                                    </v-row>
                                    <v-row v-if="item.name==='سربرگ ها'" class="ma-0 pa-0 rounded-lg">
                                        <v-row :style="`height:${expandHeight+50}px`"
                                               style="width:100%;overflow-y: auto;display: flex;flex-direction: row;align-content: flex-start"
                                               class="pa-0 px-1 ma-0"
                                        >
                                            <div :draggable="true" @dragstart="onHeaderDragStart($event,i.temp_value)"
                                                 @dragend="onHeaderDragEnd($event,i.temp_value)"
                                                 v-for="i in initDataAddModel.heading_temps"
                                                 style="height: 30px;width:calc(100% - 6px);cursor: pointer;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
                                                 class="rounded elevation-2 bg-white my-1">
                                                <p class="text-center font-weight-bold mt-1 " style="font-size: 11px">
                                                    {{ i.name }}</p>
                                            </div>
                                        </v-row>

                                    </v-row>
                                    <v-row v-if="item.name==='پاورقی ها'" class="ma-0 pa-0 rounded-lg">
                                        <v-row :style="`height:${expandHeight+50}px`"
                                               style="width:100%;overflow-y: auto;display: flex;flex-direction: row;align-content: flex-start"
                                               class="pa-0 px-1 ma-0"
                                        >
                                            <div :draggable="true" @dragstart="onHeaderDragStart($event,i.temp_value)"
                                                 @dragend="onHeaderDragEnd($event,i.temp_value)"
                                                 v-for="i in initDataAddModel.footer_temps"
                                                 style="height: 30px;width:calc(100% - 6px);cursor: pointer;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
                                                 class="rounded elevation-2 bg-white my-1">
                                                <p class="text-center font-weight-bold mt-1 " style="font-size: 11px">
                                                    {{ i.name }}</p>
                                            </div>
                                        </v-row>

                                    </v-row>

                                </template>
                                <template #title="{item}">
                                    <p class="pr-3 font-weight-bold" style="font-size: 12px">{{ item.name }}</p>
                                </template>
                            </ExpandPanelComponent>


                        </v-row>
                    </div>
                </v-navigation-drawer>

                <v-main style="height:100%;width:100%;">

                    <div ref="editorRef" class=""
                         style="overflow: auto;height:calc(100% - 50px);width:calc(100% - 20px)">
                        <div class="border elevation-2 rounded-lg"
                             style="width: max-content;text-align: right!important;">

                            <Editor v-if="show"
                                    api-key="no-api-key"
                                    :init="init"
                                    style=""
                                    v-model="editorData"
                            />


                        </div>

                    </div>
                    <v-divider class="mt-2"/>
                    <v-row class="ma-0 pa-0 pl-6  " justify="end" style="height:40px" align="center">
                        <div style="height:35px;width: 60%" class="myForm">
                            <v-row class="ma-0 pa-0  mr-1 myForm" style="height:100%;" v-if="printTemp"
                                   align="start" justify="start">
                                <v-col class="hidCheckBoxDetail" cols="4" sm="4">
                                    <v-checkbox v-model="printTemp.small_temp"
                                                class="mr-n2  bg-white elevation-2 rounded" color="dark_blue"
                                    >
                                        <template v-slot:label>
                                            <p class="font-weight-bold mt-1 d-none d-md-block" style="font-size: 11px">
                                                قالب کوچک</p>
                                        </template>
                                    </v-checkbox>

                                </v-col>

                                <v-col cols="4" class="hidCheckBoxDetail" sm="4">
                                    <v-checkbox v-model="printTemp.header_temp" color="dark_blue"
                                                class=" bg-white elevation-2 rounded"
                                    >
                                        <template v-slot:label>
                                            <p class="font-weight-bold mt-1 d-none d-md-block" style="font-size: 11px">
                                                سربرگ</p>
                                        </template>
                                    </v-checkbox>

                                </v-col>
                                <v-col cols="4" class="hidCheckBoxDetail" sm="4">
                                    <v-checkbox v-model="printTemp.footer_temp" color="dark_blue"
                                                class=" bg-white elevation-2 rounded"
                                    >
                                        <template v-slot:label>
                                            <p class="font-weight-bold mt-1 d-none d-md-block" style="font-size: 11px">
                                                پاورقی</p>
                                        </template>
                                    </v-checkbox>

                                </v-col>


                            </v-row>
                        </div>

                        <v-spacer/>
                        <v-btn @click="saveBtn" variant="tonal" density="compact" class="font-weight-bold"
                               color="dark_blue">ذخیره
                        </v-btn>
                    </v-row>

                </v-main>
            </v-layout>
        </v-fade-transition>


        <simple-dialog
                :show="dialog"
                :topic="activeDialog"
                width="50dvw"
                height="70dvh"
                @closeDialog="dialog=false"
        >
            <div style="width: 50dvw;height:68dvh" v-if="initDataAddModel&&printTemp">
                <GalleryComponent :temp-id="printTemp.id" :init-images="initDataAddModel.photos" @updateLinks="updateLinks"
                                  v-if="activeDialog=='آرشیو تصاویر'"></GalleryComponent>

                <TempsSampleComponent @select-temp="selectTemp"
                                      v-if="activeDialog=='قالب های نمونه'"
                                      :model_variable="model_variable"></TempsSampleComponent>
            </div>

        </simple-dialog>


    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";

import GalleryComponent from "@/map_modules/print/common/Gallery.vue";
import TempsSampleComponent from "@/map_modules/print/common/TempsSample.vue";
import {useStore} from "vuex";
import Editor from '@tinymce/tinymce-vue'
import ExpandPanelComponent from "@/components/common/expandPanel.vue";
import print_functions from "@/componentFunctions/print_functions";
import {useRoute, useRouter} from "vue-router";
import {PrintTemplate, TempVariable} from "@/models/Print.interface";
import SimpleDialog from "@/components/common/simpleDialog.vue";


export default defineComponent({


    name: "EditModelComponent",
    components: {SimpleDialog, ExpandPanelComponent, Editor, GalleryComponent, TempsSampleComponent},
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()

        const {
            previewFormData,
            previewFormDataValue,
            getInitAddModel,
            initDataAddModel,saveEditFormData,getItemTemp,tempItem
        } = print_functions()

        const editorRef = ref<HTMLElement>()
        const expandHeight = ref<number>(0)
        const initData = ref(false)
        const model_variable = ref('')
        const searchVariables = ref<TempVariable[]>([])
        const searchSmallTemps = ref<PrintTemplate[]>([])
        const dialog = ref(false)
        const activeDialog = ref<string>('')
        const printTemp = ref<PrintTemplate>()
        const editorData=ref('')

        function initPrintTemp() {
            if (initDataAddModel.value && 'groups' in initDataAddModel.value) {
                printTemp.value = {
                    footer_temp: false,
                    header_temp: false,
                    model_variable: model_variable.value,
                    name: '',
                    print_template_group: initDataAddModel.value.groups[0].id,
                    small_temp: false,
                    temp_size: null,
                    temp_value: ""
                }
            }


        }

        onMounted(async () => {
            if (route.params.model && route.params.id && typeof route.params.model === 'string' && typeof route.params.id === 'string') {
                model_variable.value = route.params.model
                await getInitAddModel({id: parseInt(route.params.id), model_variable: route.params.model})
                initPrintTemp()
                await getItemTemp(parseInt(route.params.id))
                console.log(route.params.model, 'model_variable')
                if (tempItem.value&&tempItem.value){
                    printTemp.value = tempItem.value
                    editorData.value = tempItem.value.temp_value
                }
                initData.value = true
            }
        })

        return {editorData,
            activeDialog, dialog, model_variable, previewFormDataValue, printTemp, saveEditFormData, searchSmallTemps,
            store, editorRef, previewFormData, expandHeight, initData, initDataAddModel, searchVariables, router
        }
    },


    data() {
        return {
            show: false,
            firstInitSize: false,


            initPreviewData: false,
            editorData_catch: '',

            init: {
                selector: 'textarea#open-source-plugins',
                plugins: 'export preview autoresize  importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons',

                menubar: 'file edit view insert format tools table help',

                toolbar: "undo redo accordion accordionremove |  fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | preview  code fullscreen myPreview | save print | pagebreak anchor codesample | ltr rtl",
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
                init_instance_callback: async (editor) => {
                    editor.on('BeforeExecCommand', async (e) => {
                        if (e.command == "mcePreview") {
                            //store content prior to changing.

                            if (!this.initPreviewData) {

                                e.preventDefault();
                                const res = await this.previewFormData({data: this.editorData,model:this.model_variable})
                                this.initPreviewData = true
                                editor.execCommand('mcePreview');

                            } else {
                                this.editorData_catch = this.editorData;
                                editor.setContent(this.previewFormDataValue);
                            }

                        }
                    });
                    editor.on("ExecCommand", (e) => {
                        if (e.command == "mcePreview" && this.initPreviewData) {
                            //Restore initial content.
                            // console.log(this.editorData_catch, '2')
                            this.editorData = this.editorData_catch
                            editor.setContent(this.editorData);
                            this.initPreviewData = false

                        }
                    });
                }


            },

            drawer: true,

            searchVariablesValue: '',
            searchSmallTempsValue: '',

        };
    },
    props: {},
    methods: {
        onDragStart(event: DragEvent, value: string) {
            const last = value.slice(-2)
            if (last == '#]') {
                value = value.replace('#]', '</br></br>#]')
            } else if (last == 'T]') {
                value = value.replace('#T]', '</br></br>#T]')
            }
            event.dataTransfer.setData('text/html', `<span>${value}</span>`);
            console.log("drag start")
        },
        onImageDragStart(event: DragEvent, src: string) {
            event.dataTransfer.setData('text/html', `<p><img class="undefined" src="${src}" alt=""></p>`);
            console.log("drag start")
        },

        onHeaderDragStart(event: DragEvent, value: string) {
            event.dataTransfer.setData('text', '!!!!');
            console.log("drag start")
        },
        onHeaderDragEnd(event: DragEvent, value: string) {
            this.editorData = this.editorData.replace(`<p>!!!!</p>`, value)
            console.log("drag end")
        },

        openDialog(name: string) {
            this.dialog = true
            this.activeDialog = name
        },

        selectTemp(value: string) {
            this.editorData = value
            this.dialog = false
        },

        getPaperSizePx(size: string, vertical = true) {
            let x_px = 0
            let y_px = 0

            const dpi = 96
            const cm = dpi / 2.54;

            if (size === 'a4') {
                if (vertical) {
                    y_px = cm * (29.7);
                    x_px = cm * (21);
                } else {
                    y_px = cm * (21);
                    x_px = cm * (29.7);
                }
            } else if (size === 'a5') {
                if (vertical) {
                    y_px = cm * (21);
                    x_px = cm * (14.8);
                } else {
                    y_px = cm * (14.8);
                    x_px = cm * (21);
                }
            }

            return [x_px - 70, y_px]
        },
        setEditorSize(value: string) {
            let [x, y] = [0, 0]
            if (value === 'a4 - عمودی') {
                [x, y] = this.getPaperSizePx('a4', true)
            } else if (value === 'a5 - عمودی') {
                [x, y] = this.getPaperSizePx('a5', true)
            } else if (value === 'a4 - افقی') {
                [x, y] = this.getPaperSizePx('a4', false)
            } else {
                [x, y] = this.getPaperSizePx('a5', false)
            }


            this.show = false
            this.init['min_height'] = y
            this.init['width'] = x
            this.init['max_height'] = y


            setTimeout(() => {
                this.show = true
            }, 100)

        },
        initSize() {
            setTimeout(() => {
                if (this.editorRef) {
                    console.log(this.editorRef.offsetHeight, this.editorRef.offsetWidth, this.editorRef)
                    this.show = false
                    this.init['min_height'] = this.editorRef.offsetHeight - 5
                    this.init['width'] = this.editorRef.offsetWidth - 5
                    this.init['max_height'] = this.editorRef.offsetHeight - 5


                    setTimeout(() => {
                        this.show = true
                    }, 100)
                }
            }, 200)

        },

        async saveBtn() {
            // console.log(this.editorData, 'print result')
            // console.log(this.printTemp, 'print result')

            if (this.printTemp) {
                if (!this.printTemp.name) {
                    this.$toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: 'خطا',
                        detail: 'نام قالب وارد نشده است'
                    });
                } else {
                    this.printTemp.temp_value = this.editorData

                    if (this.printTemp.id){
                        const res = await this.saveEditFormData(this.printTemp,this.printTemp.id)
                        if (res) {
                            this.$toast.add({
                                group: 'tr',
                                life: 4000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'تغییرات ذخیره شد'
                            });

                            setTimeout(async () => {
                                await this.router.push({name: 'printList'})
                            },500)
                        }
                    }

                }


            }

        },

        searchVariablesInput(value: string) {

            if (this.initDataAddModel) {
                this.searchVariables = this.initDataAddModel.variables.filter((item) => {
                    return item.name.includes(value);
                })
            }

        },
        searchSmallTempsInput(value: string) {

            if (this.initDataAddModel) {
                this.searchSmallTemps = this.initDataAddModel.small_temps.filter((item) => {
                    return item.name?.includes(value);
                })
            }

        },


        screenResizeHandler() {
            setTimeout(() => {
                const element = document.getElementById('expandId')
                if (element) {
                    this.expandHeight = element.offsetHeight - 380
                }

            }, 1000)
        },
        getVarFromVariables(input: TempVariable[], output: TempVariable[]) {
            input.map((item) => {
                output.push(item)
                if (item.children) {
                    this.getVarFromVariables(item.children, output)
                }
            })
        },

        updateLinks(data: string[]) {
            console.log(data)
            if (this.initDataAddModel) {
                this.initDataAddModel.photos = data
                data.map((i) => {
                    console.log()
                })
            }
            this.dialog = false
        }
    },

    created() {
        window.addEventListener("resize", this.screenResizeHandler);
    },
    unmounted() {
        window.removeEventListener("resize", this.screenResizeHandler);
    },

    mounted() {

        this.screenResizeHandler()
    },
    watch: {
        initData(){
            if (this.initData){
                this.initSize()
            }
        },
        drawer() {
            if (this.printTemp && this.printTemp.temp_size) {
                this.setEditorSize(this.printTemp.temp_size)
            } else {
                this.initSize()
            }

        },

        initDataAddModel() {
            if (this.initDataAddModel) {
                const variables = [...this.initDataAddModel.variables]
                const new_var: TempVariable[] = []
                this.getVarFromVariables(variables, new_var)
                this.initDataAddModel.variables = new_var
                this.searchVariables = new_var
                this.searchSmallTemps = this.initDataAddModel.small_temps
            }

        },
        'printTemp.temp_size'(newVal, oldVal) {
            console.log(newVal)
            this.setEditorSize(newVal)
        }
    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.tox .tox-promotion {

    display: none;
}

.tox-statusbar__branding {
    display: none
}

.tox .tox-dialog--width-lg {
    height: 80dvh !important;

}

.tox .tox-dialog-wrap__backdrop {
    background-color: rgb(149 149 149 / 75%) !important;

}

.tox .tox-mbtn__select-label {

    font-weight: bold !important;
    font-family: 'IRANSansWeb_UltraLight' !important;

}

.tox .tox-collection__item-label {
    font-weight: bold !important;
    font-family: 'IRANSansWeb_UltraLight' !important;
}

.tox {
    font-weight: bold !important;
    font-family: 'IRANSansWeb_UltraLight' !important;
}

.tox .tox-label, .tox .tox-toolbar-label {
    font-weight: bold !important;
    font-family: 'IRANSansWeb_UltraLight' !important;
}

.tox .tox-button {
    font-family: 'IRANSansWeb_UltraLight' !important;
}

.myForm .hidCheckBoxDetail .v-input__details {
    display: none !important;
}

.tox-dialog__body{
  text-align: left!important;
}


#myRotate:hover {
    transform: rotate(90deg);
}

</style>
