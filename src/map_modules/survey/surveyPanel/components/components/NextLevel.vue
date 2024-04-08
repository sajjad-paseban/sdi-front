<template>

    <div style="height:100%;width:100%;overflow-y: hidden;display: flex;flex-direction: column;justify-content: space-between;"
         class="myForm pa-2 bg-grey-lighten-3">
        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
            <v-fade-transition>
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-fade-transition>
        </v-row>

        <div v-if="initData" style="height: calc(50% - 10px);width:100%"
             class="border-t rounded-lg elevation-3 bg-grey-lighten-4">
            <p class="pa-2 font-weight-bold bg-grey-lighten-1 rounded-t-lg " style="font-size:12px">مراحل قبل</p>
            <div style="height: calc(100% - 35px)" v-if="initBlockInfo_clone&&initBlockInfo_clone.length>0" id="table"
                 class="metaTable elevation-2 border-t rounded-b-lg">
                <EditableTable
                        ref="editTable"
                        :headers="headers"
                        :items="initBlockInfo_clone"
                        :checkBox="false"
                        :height="height"
                        :filter-activate="tableFilterActivate"
                        :action="actions"
                        @actionClick="actionsClick"
                ></EditableTable>
            </div>
        </div>
        <div v-if="initData" style="height: 50%;width:100%" class="rounded-lg ">
            <v-row class="ma-0 rounded-lg  " style="height:calc(100% - 150px);min-height: 126px">
                <v-textarea
                        dir="rtl"
                        v-model="explanation"
                        no-resize
                        background-color="light-blue"
                        color="black"
                        hint=""
                        persistent-hint
                        label="شرح ارجاع جدید"
                        variant="solo"
                >
                </v-textarea>
            </v-row>
            <div style="width:100%;height: 70px;position: relative" class="myForm pr-12">
                <v-btn
                        v-tooltip.left="'آپلود عکس'"
                        icon="mdi-upload"
                        color="info"
                        density="compact"
                        dark
                        style="position: absolute;right:8px;top:20px"
                        :loading="isSelecting"
                        @click="handleFileImport"
                >

                </v-btn>
                <input
                        ref="uploader"
                        v-show="false"
                        class="d-none"
                        type="file"
                        @change="onFileChanged"
                        accept="image/png, image/jpeg, image/bmp"
                >
                <v-row class="pa-0 ma-0 rounded bg-white elevation-2" style="height:100%"
                       :justify="imagesSources.length==0?'center':'start'" align="center">
                    <p v-if="imagesSources.length==0" class="font-weight-bold" style="font-size:14px">تصویری وجود
                        ندارد</p>
                    <v-hover v-for="(image,index) in imagesSources" v-else>
                        <template v-slot:default="{ isHovering, props }">

                            <v-img
                                    v-bind="props"
                                    class="rounded-lg mx-2"
                                    max-height="60"
                                    max-width="60"
                                    height="60"
                                    width="60"
                                    cover
                                    :src="image"
                            >
                                <v-fade-transition>
                                    <v-btn @click="removeImage(index)" v-if="isHovering" class="" size="small"
                                           style="position: absolute;right:5px;top:18px"
                                           density="compact" color="error" icon="mdi-close"></v-btn>
                                </v-fade-transition>
                                <v-fade-transition>
                                    <v-btn @click="showSimple(index)" v-if="isHovering" style="position: absolute;left:5px;top:20px"
                                           density="compact" size="small" color="black" icon="mdi-eye-outline"></v-btn>
                                </v-fade-transition>
                            </v-img>
                        </template>
                    </v-hover>

                </v-row>

            </div>
            <v-row class="pa-0 ma-0" style="height: 50px;" align="center">
                <v-btn @click="saveBtn(null)" variant="text" color="error" size="small" class="font-weight-bold mt-4">انصراف</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="saveBtn(BlockStatusEnums.ReferralToChecker)" v-if="block.status== BlockStatusEnums.Completing||block.status==BlockStatusEnums.ReturnToSurvey"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4">ارجاع به کنترلر
                </v-btn>
                <v-btn @click="saveBtn(BlockStatusEnums.ReferralToManager)" v-if="block.status== BlockStatusEnums.ReferralToChecker||block.status==BlockStatusEnums.ReturnToChecker"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4 mx-2">ارجاع به مدیر
                </v-btn>
                <v-btn @click="saveBtn(BlockStatusEnums.ReturnToSurvey)" v-if="block.status== BlockStatusEnums.ReferralToChecker||block.status==BlockStatusEnums.ReturnToChecker"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4">بازگشت به ممیز کار
                </v-btn>
                <v-btn @click="saveBtn(BlockStatusEnums.FinalConfirm)" v-if="block.status== BlockStatusEnums.ReferralToManager" variant="tonal" color="info"
                       size="small" class="font-weight-bold mt-4 mx-2">تایید نهایی
                </v-btn>
                <v-btn @click="saveBtn(BlockStatusEnums.ReturnToChecker)" v-if="block.status== BlockStatusEnums.ReferralToManager" variant="tonal" color="info"
                       size="small" class="font-weight-bold mt-4">بازگشت به کنترلر
                </v-btn>
            </v-row>


        </div>


    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {DoFilterResult, KeyModel} from "@/map_modules/survey/surveyPanel/components/myFilter/myFilterModels";
import {BlockItem, BlockLog, BlockStatusEnums} from "@/models/SurveyPanel.interface";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";
import {Ref} from "vue/dist/vue";
import EditableTable from "@/components/common/editableTable.vue";
import jalali from "jalali-moment";
import VueViewer from "v-viewer";


export default defineComponent({
    name: "NextLevelComponent",

    components: {EditableTable},

    props: {
        block: {
            type: Object as PropType<BlockItem>,
            required: true
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const initData = ref(true)
        const {changeBlockStatus, getInitBlockStatus, initBlockInfo} = survey_panel_functions()
        const explanation= ref('')
        const initBlockInfo_clone = ref<any[]>([])
        const headers = ref([
            {text: "مرحله", value: "status", width: "10%"},
            {text: "تاریخ", value: "update_date", width: "10%"},
            {text: "زمان", value: "update_time", update_time: "10%"},
            {text: "نام فرد", value: "person", width: "10%"},
            {text: "توضیحات", value: "explanation", width: "40%"},

        ])

        function getDate(data: string) {
            return jalali(data).locale('fa').format('YYYY/M/D')
        }

        onMounted(async () => {

            await getInitBlockStatus(props.block.id)
            initBlockInfo_clone.value = initBlockInfo.value.map((item) => {
                return {...item, update_date: getDate(item.update_date), update_time: item.update_time.split('.')[0]}
            })
        })

        return {
            store,
            toast,
            router,
            route, initBlockInfo, headers, initBlockInfo_clone,
            initData, changeBlockStatus, explanation

        }
    },

    data() {
        return {
            tableFilterActivate: false,

            height: "",  //  برای اندازه ازتفاع جدول //
            actions: [
                {
                    text: "مشاهده عکس ها",
                    icon: "mdi-image",
                    color: "info",
                },


            ],

            isSelecting: false,
            imagesSources: [],
            imagesFiles:[] as File[],



        }
    },

    computed: {
        BlockStatusEnums() {
            return BlockStatusEnums
        }
    },
    emits: [],
    methods: {
        screenResizeHandler() {
            let x: any = document.getElementById("table");
            this.height = String(x.offsetHeight);
            console.log(this.height)
        },

        handleFileImport() {
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, {once: true});

            // Trigger click on the FileInput
            this.$refs.uploader.click();
        },
        onFileChanged(value: any) {
            var reader = new FileReader();
            console.log(value)
            reader.onload = (e: any) => {
                this.imagesSources.push(e.target.result)
            };
            this.imagesFiles.push(value.target.files[0])
            reader.readAsDataURL(value.target.files[0]);
            // Do whatever you need with the file, liek reading it with FileReader
        },

        async removeImage(index: number) {
            this.imagesSources.splice(index, 1)
            this.imagesFiles.splice(index, 1)
        },
        showSimple(index: number) {
            const data = this.imagesSources.map((img)=>{
                return{url:img}
            })

            this.$viewerApi({
                images: data,
                options: {
                    toolbar: true,
                    url: 'url',
                    initialViewIndex: index,

                },
            })
        },

        async saveBtn(status:BlockStatusEnums | null) {
            if (status==null){
                this.$emit('close')
            }else {
                if (this.explanation == '') {
                    this.toast.add({
                        group: 'br',
                        life: 3000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'اطلاعات فرم تکمیل نیست'
                    });
                } else {

                    const data = {
                        files: this.imagesFiles ? this.imagesFiles : [],
                        text: this.explanation,
                        status: status
                    }
                    const res = await this.changeBlockStatus(data, this.block.id)

                    if (res) {
                        this.toast.add({
                            group: 'tr',
                            life: 3000,
                            severity: 'success',
                            summary: ' نتیجه عملیات',
                            detail: "تغیرات ذخیره شد."
                        });
                        this.$emit('close')
                    }
                }
            }

        },
        async actionsClick(value: string, item: any, items: any) {
            const data = item.images.map((img)=>{
                return {url:`${this.store.state.backendUrl.slice(0, -1)}${img}`}
            })
            this.$viewerApi({
                images: data,
                options: {
                    toolbar: true,
                    url: 'url',
                    initialViewIndex: 0,

                },
            })
        }

    },
    //  برای اندازه ازتفاع جدول //
    created() {
        window.addEventListener("resize", this.screenResizeHandler);
    },
    unmounted() {
        window.removeEventListener("resize", this.screenResizeHandler);
    },
    //  برای اندازه ازتفاع جدول //
    mounted() {

    },
    watch: {
        initBlockInfo_clone() {
            setTimeout(() => {
                this.screenResizeHandler()
            }, 200)
        }
    }

});
</script>


<style>


</style>
