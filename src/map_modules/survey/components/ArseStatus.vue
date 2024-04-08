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
            <div style="height: calc(100% - 35px)" v-if="table_data&&table_data.length>0" id="table"
                 class="metaTable elevation-2 border-t rounded-b-lg">
                <EditableTable
                        ref="editTable"
                        :headers="headers"
                        :items="table_data"
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
                                    <v-btn @click="showSimple(index)" v-if="isHovering"
                                           style="position: absolute;left:5px;top:20px"
                                           density="compact" size="small" color="black" icon="mdi-eye-outline"></v-btn>
                                </v-fade-transition>
                            </v-img>
                        </template>
                    </v-hover>

                </v-row>

            </div>
            <v-row class="pa-0 ma-0" style="height: 50px;" align="center">
                <v-btn @click="saveBtn(null)" variant="text" color="error" size="small" class="font-weight-bold mt-4">
                    انصراف
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!can_add_status" @click="saveBtn(ArseStatusEnums.Complete)" v-if="currentUser.user_type==PanelUserType.Survey"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4">برداشت کامل
                </v-btn>
                <v-btn :disabled="!can_add_status" @click="saveBtn(ArseStatusEnums.NotPresentOwner)"
                       v-if="currentUser.user_type==PanelUserType.Survey"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4 mx-2">عدم حضور مالک
                </v-btn>
                <v-btn :disabled="!can_add_status" @click="saveBtn(ArseStatusEnums.NoAccess)" v-if="currentUser.user_type==PanelUserType.Survey"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4">عدم دسترسی
                </v-btn>
                <v-btn :disabled="!can_add_status" @click="saveBtn(ArseStatusEnums.ConfirmController)"
                       v-if="currentUser.user_type==PanelUserType.Checker"
                       size="small" class="font-weight-bold mt-4 mx-2">تایید کنترلر
                </v-btn>
                <v-btn :disabled="!can_add_status" @click="saveBtn(ArseStatusEnums.RejectController)"
                       v-if="currentUser.user_type==PanelUserType.Checker"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4">عدم تایید کنترلر
                </v-btn>
                <v-btn :disabled="!can_add_status" @click="saveBtn(ArseStatusEnums.ConfirmManager)"
                       v-if="currentUser.user_type==PanelUserType.Manager"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4 mx-2">تایید مدیر
                </v-btn>
                <v-btn :disabled="!can_add_status" @click="saveBtn(ArseStatusEnums.RejectManager)"
                       v-if="currentUser.user_type==PanelUserType.Manager"
                       variant="tonal" color="info" size="small" class="font-weight-bold mt-4 mx-2">عدم تایید مدیر
                </v-btn>
            </v-row>


        </div>

    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {DoFilterResult, KeyModel} from "@/map_modules/survey/surveyPanel/components/myFilter/myFilterModels";
import {ArseStatusEnums, BlockItem, BlockLog, BlockStatusEnums, PanelUserType} from "@/models/SurveyPanel.interface";
import survey_functions from "@/componentFunctions/survey_functions";
import EditableTable from "@/components/common/editableTable.vue";
import jalali from "jalali-moment";
import {usersObject} from "@/models/User.interface";


export default defineComponent({
    name: "ArseStatusComponent",
    computed: {
        PanelUserType() {
            return PanelUserType
        },
        ArseStatusEnums() {
            return ArseStatusEnums
        }
    },

    components: {EditableTable},

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {changeArseStatus, getInitArseStatus, arseInitStatus,} = survey_functions()

        const initData = ref(false)
        const table_data = ref<any[]>([])
        const explanation = ref('')
        const can_add_status = ref(true)
        const currentUser = ref<{ user_type: string, info: usersObject }>() as Ref<{
            user_type: string,
            info: usersObject
        }>
        const arse = store.getters.getArseInfo
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
            await getInitArseStatus(store.getters.getArseInfo.id)
            if (arseInitStatus.value) {
                currentUser.value = arseInitStatus.value.current_user
                table_data.value = arseInitStatus.value.previous_log.map((item) => {
                    return {
                        update_date: getDate(item.created_at.split('T')[0]),
                        update_time: item.created_at.split('T')[1].split('.')[0],
                        person: `${item.user.info.first_name} ${item.user.info.last_name}`,
                        explanation: item.explanation,
                        images: item.arse_log_image.map((img) => {
                            return img.image
                        }),
                        status: item.status
                    }
                })
                if(arseInitStatus.value.previous_log.length>0){
                    if (arseInitStatus.value.previous_log[0].user.info.id == currentUser.value.info.id){
                        can_add_status.value = false
                    }

                }
            }


            initData.value = true
        })

        return {
            store,
            toast,
            router,
            route, table_data, headers, explanation,
            initData, changeArseStatus, arseInitStatus, currentUser,can_add_status,arse

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
            imagesFiles: [] as File[],


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
            const data = this.imagesSources.map((img) => {
                return {url: img}
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
        async saveBtn(status: ArseStatusEnums | null) {
            if (status == null) {
                this.$emit('close')
            } else {
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
                    const res = await this.changeArseStatus(data, this.arse.id)

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
        table_data() {
            setTimeout(() => {
                this.screenResizeHandler()
            }, 200)
        }
    }

});
</script>


<style>


</style>
