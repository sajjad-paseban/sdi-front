<template>
    <div style="height:100%;width:100%" class="pa-2 myForm">
        <v-row class="ma-0 pa-0">
            <v-col cols="12" class="px-0">
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
        <v-row class="ma-0 pa-0 pa-1 rounded-lg elevation-2 border-t"
               style="height:calc(100% - 90px);overflow-y: auto;display: flex;align-content: flex-start;">
            <div v-for="(image,index) in imagesFile" :key="index" style="height:100px;width:100px"
                 class="rounded-lg ma-1 elevation-2 bg-grey">
                <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                        <v-img v-bind="props" height="100" width="100" class="rounded-lg" cover :src="image.src">
                            <v-fade-transition>
                                <v-btn @click="removeImage(index)" v-if="isHovering" class="ma-2" size="small"
                                       density="compact" color="error" icon="mdi-close"></v-btn>
                            </v-fade-transition>

                        </v-img>
                    </template>
                </v-hover>

            </div>


        </v-row>
        <v-row class="ma-0 pa-0 pt-1" style="height:30px" justify="end" align="center">
            <v-btn @click="saveBtn" variant="text" style="height:25px" color="dark_blue" class="font-weight-bold">
                ذخیره
            </v-btn>
        </v-row>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {UploadTempImageInterface} from "@/api/print/SD.Models/uploadTempImage.sd";
import print_functions from "@/componentFunctions/print_functions";


export default defineComponent({
    name: "LayerComponent",
    components: {},
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const {imagesLinks, uploadTempImage,removeImageGallery,uploadModelImage} = print_functions()

        const initData = ref(false)
        const imageFile = ref<File[]>([])
        const imagesFile = ref<{ src: string, file: File|null}[]>([])

        function init_initImages(){
            props.initImages.map((link)=>{
                imagesFile.value.push({
                    src:link,
                    file:null
                })
            })

            console.log(imagesFile.value,'initImages')
        }

        onMounted(() => {
            init_initImages()
            setTimeout(() => {
                initData.value = true
            }, 1000)
        })

        return {
            store, initData, router, imageFile, imagesFile, imagesLinks, uploadTempImage,removeImageGallery,uploadModelImage
        }
    },
    data() {
        return {};
    },
    props: {
        initImages: {
            type: Array as PropType<string[]>,
            default:[]
        },
        model_id:{
            type:Number,
            default:0
        },
        tempId:{
            type:Number,
            default:0
        }
    },
    emits: ['updateLinks'],
    methods: {
        addImage: function (value: any) {
            let reader = new FileReader();
            console.log(value)
            reader.onload = (e: any) => {

                this.imagesFile[this.imagesFile.length] = {
                    src: e.target.result,
                    file: value.target.files[0],
                };

            };
            reader.readAsDataURL(value.target.files[0]);
        },
        async removeImage(index: number) {
            if (this.imagesFile[index].file == null){
                await this.removeImageGallery({model_id:this.model_id,path:this.imagesFile[index].src})
            }
            this.imagesFile.splice(index, 1)
            this.$emit('updateLinks', this.imagesLinks)
        },

        async saveBtn() {
            console.log(typeof this.imagesFile)
            const data = {
                files: []
            }
            this.imagesFile.map((image) => {
                if (image.file){
                    data.files.push(image.file)
                }
            })
            if (this.tempId == 0){
                await this.uploadTempImage(data.files)
            }else {
                await this.uploadModelImage(data.files,this.tempId)
            }

            this.$emit('updateLinks', this.imagesLinks)
        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
