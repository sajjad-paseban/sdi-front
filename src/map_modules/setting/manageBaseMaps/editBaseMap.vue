<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                style="height: 100%; width: 100%; background-color: #f3f3f33b;   overflow: auto;"
        >
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
                <div v-show="initShow" class="pa-2 mysub">
                    <v-row class="ma-0 pa-0">
                        <p style="font-size: 10px; line-height: 20px">
                            در این بخش با انتخاب و پر کردن فیلد های زیر میتوانید نقشه زیرین مورد نظر
                            خود را ایجاد نمایید .
                        </p>
                    </v-row>
                </div>
            </v-fade-transition>


            <v-fade-transition>
                <v-row v-show="initShow" class="ma-0 pa-0" justify="center">
                    <v-col cols="12" md="10" class="py-2">
                        <v-form ref="addBaseMapForm" class="myForm" style="width: 100%; height: 100%">
                            <v-row
                                    class="ma-0 pa-2 rounded-lg elevation-2"
                                    style="background-color: white"
                            >
                                <v-col class="ma-0 pa-0" cols="12">
                                    <v-row class="pa-0 ma-0">
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                                    type="text"
                                                    v-model="baseMapObject.code"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">شناسه</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                                    v-model="baseMapObject.name"
                                                    type="text"
                                                    :rules="nameRule"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">نام</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                    </v-row>

                                    <v-row class="ma-0 px-2 pa-2 textArea">
                                        <v-textarea
                                                dir="rtl"
                                                no-resize
                                                required
                                                rows="2"
                                                background-color="light-blue"
                                                color="black"
                                                hint=""
                                                v-model="baseMapObject.address"
                                                persistent-hint
                                                :rules="nameRule"
                                                placeholder="آدرس فراخوانی"
                                                variant="solo"
                                        >
                                        </v-textarea>


                                    </v-row>
                                    <v-row class="pa-0 ma-0">
                                        <v-col class="ma-0 py-2" cols="6" md="4">
                                            <v-file-input
                                                    label="انتخاب تصویر"
                                                    chips
                                                    v-model="baseMapImageFile"
                                                    prepend-inner-icon="mdi-paperclip"
                                                    variant="solo"
                                                    density="compact"
                                                    prepend-icon=""
                                                    show-size
                                                    @change="addImage"
                                                    accept="image/png, image/jpeg, image/bmp"
                                            >
                                            </v-file-input>
                                        </v-col>

                                        <v-col cols="4" v-if="baseMapObject" align="center">
                                            <v-img
                                                    class="rounded-lg"
                                                    max-height="90"
                                                    max-width="90"
                                                    :src="store.state.backendUrl+baseMapObject.image"
                                            ></v-img>
                                        </v-col>
                                    </v-row>


                                    <v-row class="pa-0 ma-0">
                                        <v-col cols="5" class="pa-0 ma-0">
                                            <v-checkbox v-model="baseMapObject.default" label="پیشفرض"></v-checkbox>

                                        </v-col>

                                        <v-col cols="5" class="pa-0 ma-0">
                                            <v-checkbox v-model="baseMapObject.online" label="آنلاین"></v-checkbox>

                                        </v-col>


                                    </v-row>
                                </v-col>

                                <v-row class="ma-0 pa-0 mt-2" justify="end">
                                    <v-btn
                                            class="elevation-1"
                                            variant="tonal"
                                            append-icon="mdi-content-save"
                                            style="font-weight: bold !important; font-size: 10px"
                                            rounded="lg"
                                            size="small"
                                            @click="addBaseMapAction"
                                            color="primary"
                                    >ذخیره
                                    </v-btn
                                    >
                                </v-row>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-fade-transition>


        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import {BaseMapInterface} from "@/models/BaseMap.interface";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import baseMap from "@/componentFunctions/baseMap_functions";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import {useStore} from "vuex";

    export default defineComponent({
        name: "editBaseMapComponent",
        components: {},

        setup(){

            const {addBaseMap,getEditItem,baseMapObject,editBaseMap} = baseMap()

            const addBaseMapForm = ref<VForm>()
            const {nameRule}= rules()
            const store = useStore()

            const route = useRoute()
            const router = useRouter()
            const toast = useToast()

            const initData = ref(false)
            const baseMapImageSrc= ref<string|null>(null)



            onMounted(async ()=>{
                if (!route.params.data) {

                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'نقشه زیرین انتخاب نشده است '
                    });
                    router.go(-1)
                } else {
                    await getEditItem(String(route.params.data))
                    baseMapImageSrc.value = baseMapObject.value.image
                    initData.value=true

                }
            })

            return{
                addBaseMapForm,nameRule,addBaseMap,baseMapObject,initData,baseMapImageSrc,editBaseMap,store
            }
        },

        data() {
            return {
                show: false,

                initShow:false,

                baseMapImageFile:[],




            };
        },
        props: {},
        methods: {
            addImage: function (value: any) {
                var reader = new FileReader();
                reader.onload = (e: any) => {
                    this.baseMapImageSrc = e.target.result;
                };
                reader.readAsDataURL(value.target.files[0]);
            },

            async addBaseMapAction() {
                if (this.addBaseMapForm) {

                    const res = await this.addBaseMapForm.validate()

                    if (res.valid) {



                        const response = await this.editBaseMap({...this.baseMapObject,image:this.baseMapImageFile[0],old_name:String(this.$route.params.data)})

                        if (response) {
                            this.$router.push({name: 'manageBaseMapList'})
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه دخواست',
                                detail: 'نقشه زیرین ویرایش شد '
                            });

                        }
                    }
                }

            },

        },
        watch:{

            initData(){
                if(this.initData){
                    setTimeout(()=>{
                        this.initShow = true
                    },300)
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 200);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
