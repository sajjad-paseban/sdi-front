<template>
    <div style="height:100%;width:100%;overflow-y: auto">
        <v-fade-transition>
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-row>
        </v-fade-transition>
        <v-fade-transition>
            <v-row v-if="initData" style="height:100%" class="ma-0 pa-2" justify="center" align="center">
                <v-col cols="12" sm="10" style="height: 95%" class="rounded-lg bg-white elevation-1">

                    <v-row style="height: calc(100% - 46px);overflow-y: auto" class="ma-0 pa-0" v-if="selectImage">

                        <v-col cols="12" sm="7">
                            <v-form class="myForm">
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12" md="7">
                                        <v-text-field
                                                density="compact"
                                                v-model="selectImage.name"
                                                variant="solo"
                                                readonly
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">نام عکس</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="7">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                type="number"
                                                required
                                                v-model="selectImage.page"
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class=""> صفحه</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col dir="rtl" cols="12" md="7">
                                        <v-btn @click="dialog=true" elevation="1" size="small" color="info">انتخاب گروه
                                            بندی عکس
                                        </v-btn>
                                    </v-col>

                                    <v-col cols="12" md="7" class="rounded-lg">
                                        <v-text-field
                                                density="compact"
                                                :rules="nameRule"
                                                v-model="groupName"
                                                readonly
                                                :disabled="!groupName"
                                                variant="solo"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="dark_blue" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-dark_blue">نام لایه</p> -->
                                                <p class="">گروه عکس</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>


                                    <v-col dir="rtl" cols="12" md="7">
                                        <v-checkbox v-model="selectImage.panorama" label="پانوراما"></v-checkbox>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-textarea
                                                dir="rtl"
                                                v-model="selectImage.description"
                                                no-resize
                                                class="font-weight-bold"
                                                rows="6"
                                                background-color="light-blue"
                                                color="black"
                                                hint=""
                                                persistent-hint
                                                label="توضیحات تکمیلی"
                                                variant="solo"
                                        >
                                        </v-textarea>
                                    </v-col>

                                    <v-col dir="rtl" cols="12" md="7">
                                        <v-btn @click="deleteArchiveImage" elevation="1" size="small" color="error"
                                               prepend-icon="mdi-trash-can">
                                            حذف
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                        <v-col cols="12" sm="5" class="text-center" style="overflow-y: hidden">

                            <v-row class="ma-0 pa-0 pt-3" justify="center">
                                <v-col class="ma-0 pa-0 myFile " cols="12" md="7">
                                    <v-file-input
                                            label="انتخاب تصویر"
                                            chips
                                            prepend-inner-icon="mdi-paperclip"
                                            variant="solo"
                                            density="compact"
                                            prepend-icon=""
                                            show-size
                                            @change="addImage"
                                            v-model="imageFile"
                                            accept="image/png, image/jpeg, image/bmp"
                                    >
                                    </v-file-input>
                                </v-col>
                            </v-row>
                            <v-fade-transition>
                                <v-img v-if="imageSource" class="rounded-lg" width="100%" cover :src="imageSource">
                                    <template v-slot:placeholder>
                                        <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                        >
                                            <v-progress-circular
                                                    indeterminate
                                                    color="grey-lighten-5"
                                            ></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-fade-transition>

                            <v-fade-transition>
                                <v-img v-if="!imageSource" class="rounded-lg" width="90%" cover
                                       src="@/assets/gifs/not_found.gif">
                                    <template v-slot:placeholder>
                                        <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                        >
                                            <v-progress-circular
                                                    indeterminate
                                                    color="grey-lighten-5"
                                            ></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-fade-transition>


                        </v-col>
                    </v-row>

                    <v-row class="ma-0 pa-0 pa-2 border-t" justify="end">
                        <v-btn class="font-weight-bold" color="error" size="small" @click="cancelBtn" variant="text">
                            انصراف
                        </v-btn>
                        <v-btn @click="saveImage" class="font-weight-bold" color="info" size="small" variant="tonal">
                            ذخیره
                        </v-btn>
                    </v-row>

                </v-col>
            </v-row>
        </v-fade-transition>

        <simple-dialog
                :show="dialog"
                :topic="'انتخاب لایه'"
                :overLayer="true"
                width="30vw"
                height="80vh"
                @closeDialog="dialog = false"
        >
            <v-card height="100%" class="pa-2">
                <div style="height: calc(100% - 35px)">
                    <ArchiveTree :archive-group-list="archiveGroupList" @treeClick="treeClick" class=""></ArchiveTree>
                </div>
                <v-row class="ma-0 pa-0" justify="end" align="center">
                    <v-btn
                            variant="tonal"
                            prepend-icon="mdi-content-save-move"
                            style="font-weight: bold !important"
                            size="small"
                            color="primary"
                            @click="dialog=false"
                            class="elevation-1  rounded-lg mt-2"
                    >انتخاب
                    </v-btn>
                </v-row>
            </v-card>
        </simple-dialog>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {ArchiveImage} from "@/models/Archive.interface";
import rules from "@/componentFunctions/rules_functions";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import layerTree from "@/map_modules/layer/common/layerTree.vue";
import {LayerTree} from "@/models/Layer.Interface";
import survey_functions from "@/componentFunctions/survey_functions";
import {Archive, ArchiveGroup} from "@/models/Survey.interface";
import ArchiveTree from "@/map_modules/survey/components/archive/archiveTree.vue";


export default defineComponent({
    name: "ArchiveListComponent",

    components: {ArchiveTree, layerTree, SimpleDialog},


    props: {
        inputImages: {
            required: true,
            type: Array as PropType<ArchiveImage[]>,
            default: []
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()
        const {nameRule, floatRule, phoneRule} = rules()
        const {
            getArchiveImageItem,
            archiveImageItem,
            editImageArchive,
            deleteImageArchive,
            getArchiveGroup,
            archiveGroupList
        } = survey_functions()

        const selectImage = ref<Archive>()
        const imageSource = ref('')
        const initData = ref(false)
        const imageFile = ref<File[]>([])
        const groupName = ref('')

        onMounted(async () => {
            const imageId = route.params.id
            if (imageId && typeof imageId === "string") {
                await getArchiveImageItem(parseInt(imageId))
                await getArchiveGroup()
                initData.value = true
            }

        })

        return {
            imageFile, groupName, editImageArchive, deleteImageArchive, archiveGroupList,
            store, toast, router, selectImage, nameRule, imageSource, initData, archiveImageItem
        }
    },

    data() {
        return {
            dialog: false
        }
    },
    methods: {
        addImage: function (value: any) {
            var reader = new FileReader();
            console.log(value)
            reader.onload = (e: any) => {
                this.imageSource = e.target.result;
            };
            reader.readAsDataURL(value.target.files[0]);
        },
        cancelBtn() {
            this.router.go(-1)
        },
        treeClick(item: ArchiveGroup) {
            console.log(item, 'group select')
            if (item.master && item.subsystem && item.group && item.id && this.selectImage) {
                this.selectImage.master = item.master
                this.selectImage.subsystem = item.subsystem
                this.selectImage.group = item.group
                this.selectImage.archive_type = item.id
                this.groupName = item.title
            }
        },

        async saveImage() {
            if (this.selectImage) {
                if (this.imageFile.length > 0) {
                    this.selectImage.file = this.imageFile[0]
                }
                if (this.groupName && this.selectImage.id) {
                    console.log(this.selectImage)
                    const res = await this.editImageArchive(this.selectImage, this.selectImage.id)

                    if (res) {
                        this.toast.add({
                            group: 'tr',
                            life: 3000,
                            severity: 'success',
                            summary: ' نتیجه درخواست',
                            detail: 'اطلاعات ذخیره شد'
                        });
                        this.router.go(-1)
                    }
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 3000,
                        severity: 'error',
                        summary: ' خطا در درخواست',
                        detail: 'اطلاعات تکمیل نیست'
                    });
                }
            }
        },

        async deleteArchiveImage() {
            if (this.selectImage && this.selectImage.id) {
                const res = await this.deleteImageArchive(this.selectImage.id)
                if (res) {
                    this.toast.add({
                        group: 'tr',
                        life: 3000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'اطلاعات ذخیره شد'
                    });
                    this.router.go(-1)
                }
            }
        }

    },

    watch: {
        archiveImageItem() {
            if (this.archiveImageItem && this.archiveImageItem.src && this.archiveImageItem.group_name) {
                this.imageSource = this.archiveImageItem.src
                console.log(this.imageSource)
                this.groupName = this.archiveImageItem.group_name
                this.selectImage = {...this.archiveImageItem}
            }

        }
    },


});
</script>


<style>


</style>
