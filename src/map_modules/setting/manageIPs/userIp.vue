<template>
    <v-slide-y-transition>
        <div
                class="pa-1"
                v-if="show"
                style="width: 100%; height: 100%; background-color: #f3f3f33b;overflow: auto"
        >
            <v-row class="ma-0 pa-0 mysub">
                <p style="font-size: 10px; line-height: 20px">
                    با این قابلیت میتوانید آی پی سیستم های دلخواه را در لیست مسدود شده
                    قرار دهید و اجازه استفاده از سامانه را ندهید. این قابلیت برای آی پی
                    های مخرب بسیار کارمد میباشد.
                </p>
            </v-row>

            <v-row class=" pa-0 ma-0 pt-2" justify="center">
                <v-col cols="10" class="pa-0 ma-0">
                    <v-row class=" myForm ma-0 pa-0">
                        <v-col class="ma-0 pa-0" cols="12" md="6" lg="4">
                            <v-autocomplete
                                    :items="usersList"
                                    density="compact"
                                    item-title="user_name"
                                    variant="solo"
                                    item-value="id"
                                    v-model="user_id"

                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="primary" icon="mdi-sitemap"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                    <p class="">کاربر</p>
                                </template>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                </v-col>

            </v-row>

            <v-row style="" class="ma-0 pa-0 addIPClass " justify="center">
                <v-col style="background-color: white;height: 100%" cols="10" class="rounded-lg elevation-2 pa-0 ma-0">

                    <v-row class="pa-0 ma-0">
                        <v-btn
                                variant="text"
                                size="small"
                                color="primary"
                                @click="tableFilterActivate = !tableFilterActivate"
                                style="font-weight: bold !important"
                                v-tooltip.left="'فیلتر'"
                        >
                            <v-avatar size="22" class="">
                                <v-img
                                        class=""
                                        src="@/assets/icons/filter.png"
                                        alt="John"
                                ></v-img>
                            </v-avatar>
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                                :disabled="!user_id"
                                variant="text"
                                size="small"
                                color="primary"
                                @click="addIp = true"
                                style="font-weight: bold !important"
                                v-tooltip.right="'اضافه کردن آیپی'"
                        >
                            <v-avatar size="25" class="">
                                <v-img
                                        class=""
                                        src="@/assets/icons/addRow.png"
                                        alt="John"
                                ></v-img>
                            </v-avatar>
                        </v-btn>
                    </v-row>
                    <div class="ma-0 pa-0 px-2 " style="height:calc(100% - 35px) " id="table">

                        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                            <v-fade-transition>
                                <v-progress-circular
                                        :size="50"
                                        color="primary"
                                        indeterminate
                                ></v-progress-circular>
                            </v-fade-transition>
                        </v-row>

                        <v-slide-y-transition>
                            <EditableTable
                                    v-if="initData"
                                    ref="editTable"
                                    :headers="headers"
                                    :items="userIps"
                                    :checkBox="false"
                                    :height="height"
                                    :action="actions"
                                    @actionClick="actionsClick"
                                    :filter-activate="tableFilterActivate"
                                    style="background-color: white"
                            ></EditableTable>
                        </v-slide-y-transition>
                    </div>
                </v-col>

            </v-row>

        </div>
    </v-slide-y-transition>

    <SimpleDialog
            :show="addIp"
            topic="اضافه کردن سرویس"
            width="50vw"
            height="70vh"
            @closeDialog="addIp = false"
    >
        <div style="height: 100%;width: 100%" class="py-2">
            <Fieldset
                    style="height: max-content; margin-inline: 20px !important"
                    legend="اختصاص آیپی به کاربر"

            >
                <p class="pb-2">
                    تنظیمات ایجاد آیپی را کامل کرده تا آیپی به کاربر اختصاص داده شود.
                </p>

            </Fieldset>

            <v-card style="margin-inline: 20px !important;overflow: auto;" class="mt-2 rounded-lg elevation-3">
                <v-row class="ma-0 pa-0" justify="center">
                    <v-col cols="12" md="12">
                        <v-form ref="myAddIpForm" class="myForm" style="width: 100%; height: 100%">
                            <v-row
                                    class="ma-0 pa-2 "

                            >
                                <v-col class="ma-0 pa-0" cols="12">
                                    <v-row class="pa-0 ma-0">
                                        <v-col cols="12" md="4">
                                            <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                                    v-model="ip"
                                                    type="text"
                                                    :rules="ipRole"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-numeric"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">آیپی</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4" class="rounded-lg">
                                            <date-picker range color="rgb(var(--v-theme-primary))" v-model="date"
                                                         placeholder="انتخاب تاریخ"></date-picker>
                                        </v-col>
                                    </v-row>


                                    <v-row class="pa-0 ma-0">
                                        <v-col cols="5" class="pa-0 ma-0">
                                            <v-checkbox v-model="is_active" label="فعال"></v-checkbox>

                                        </v-col>


                                    </v-row>
                                </v-col>

                                <v-row class="ma-0 pa-0 mt-2" justify="end">
                                    <v-btn
                                            class="elevation-1"
                                            variant="tonal"
                                            append-icon="mdi-content-save"
                                            style="font-weight: bold !important; font-size: 10px"
                                            @click="saveIp"
                                            rounded="lg"
                                            size="small"
                                            color="primary"
                                    >ذخیره
                                    </v-btn
                                    >
                                </v-row>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </div>

    </SimpleDialog>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import Fieldset from "primevue/fieldset";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import EditableTable from "@/components/common/editableTable.vue";
    import users from "@/componentFunctions/user_functions";
    import ips from "@/componentFunctions/ip_functions";
    import {useStore} from "vuex";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import moment from "jalali-moment";

    export default defineComponent({
        name: "addUserComponent",
        components: {Fieldset, SimpleDialog, EditableTable},

        setup() {
            const {getUsers, usersList} = users()
            const {userIps, getUserIps, deleteIp, addIpAction} = ips()
            const {nameRule, ipRole} = rules()

            const initData = ref(true)
            const store = useStore()
            const myAddIpForm = ref<VForm>()

            onMounted(async () => {
                await getUsers()
            })
            return {
                usersList, userIps, getUserIps, initData, store, deleteIp, myAddIpForm, ipRole, nameRule, addIpAction
            }
        },

        data() {
            return {
                show: false,
                addIp: false,

                user_id: null as number | null,

                // --------add ip----------//
                date: [] as string[],
                ip: '',
                is_active: false,

                // --------add ip----------//

                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "شماره", value: "id", width: "5%"},
                    {text: "IP", value: "ip", width: "30%"},
                    {text: "تاریخ شروع", value: "active_time_start", width: "20%"},
                    {text: "تاریخ خاتمه", value: "active_time_end", width: "20%"},
                    {text: "وضعیت", value: "is_active", width: "10%"},
                ],

                actions: [
                    {
                        text: "ویرایش",
                        icon: "mdi-pencil-circle",
                        color: "info",
                    },
                    {
                        text: "حذف",
                        icon: "mdi-trash-can",
                        color: "error",
                    },


                ],

                // /-------table data---------/

            };
        },
        props: {},
        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight);
            },

            actionsClick(value: string, item: any, items: any) {
                if (value == "ویرایش") {
                    this.$router.push({
                        name:'editIp',
                        params:{data:item.id}
                    })
                } else if (value === "حذف") {
                    this.store.commit('setConfirmDialog', {
                        massage: 'آیا حذف مورد تایید است ؟',
                        topic: 'اخطار',
                        active: true,
                        accept: async () => {
                            await this.deleteIp({id: item.id})
                            this.initData = false
                            if (this.user_id){
                                await this.getUserIps({user_id:this.user_id})
                            }
                            this.initData = true
                            this.screenResizeHandler()

                        },
                        reject: () => {
                            console.log('reject')
                        },

                    })
                }
            },

            convertedDate(): number[] {
                return [new Date(moment.from(this.date[0], 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')).getTime() / 1000,
                    new Date(moment.from(this.date[1], 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD')).getTime() / 1000]
            },

            async saveIp() {
                if (this.myAddIpForm) {
                    const res = await this.myAddIpForm.validate()
                    let response
                    if (res.valid) {
                        if (this.date[0]) {
                            const date = this.convertedDate()
                            response = await this.addIpAction({
                                ip: this.ip,
                                is_active: this.is_active,
                                active_time_start: date[0],
                                active_time_end: date[1],
                                user: this.user_id
                            })
                        } else {
                            response = await this.addIpAction({ip: this.ip, is_active: this.is_active, user: this.user_id})
                        }
                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'آیپی اضافه شد '
                            });

                            this.addIp = false
                            this.initData = false
                            if (this.user_id){
                                await this.getUserIps({user_id:this.user_id})
                            }
                            this.initData = true
                            this.screenResizeHandler()

                            this.date = []
                            this.ip = ''
                            this.is_active = false

                        }


                    }
                }
            }
        },

        watch: {
            async user_id() {
                this.initData = false
                console.log(this.user_id)
                if (this.user_id){
                    await this.getUserIps({user_id:this.user_id})
                }
                this.initData = true
                this.screenResizeHandler()
            },

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
            setTimeout(() => {
                this.show = true;
                setTimeout(() => {
                    this.screenResizeHandler()
                }, 100)
            }, 100);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .addIPClass {
        height: calc(100% - 85px);
        margin-top: 0 !important;
    }

    @media only screen and (max-width: 900px) {
        .addIPClass {
            height: calc(100% - 55px);
            min-height: 300px;
            margin-top: 0 !important;
        }
    }
</style>
