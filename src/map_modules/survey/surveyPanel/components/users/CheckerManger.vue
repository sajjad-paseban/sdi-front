<template>
    <div dir="rtl" style="height:100%;width:100%;overflow-y: auto;min-width: 300px" class="pa-2 rounded-lg">
        <div v-if="users_clone.length>0" id="table" class="metaTable elevation-2 border-t rounded-lg">
            <template v-if="userType=='checker'">
                <EditableTable
                        ref="editTable"
                        :headers="c_headers"
                        :items="users_clone"
                        :action="actions"
                        :checkBox="false"
                        :height="height"
                        :filter-activate="tableFilterActivate"
                        @actionClick="actionsClick"
                ></EditableTable>
            </template>
            <template v-else>
                <EditableTable
                        ref="editTable"
                        :headers="m_headers"
                        :items="users_clone"
                        :checkBox="false"
                        :height="height"
                        :filter-activate="tableFilterActivate"
                ></EditableTable>
            </template>

        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {Checker, SurveyPerson} from "@/models/SurveyPanel.interface";
import EditableTable from "@/components/common/editableTable.vue";
import {SurveyMutations} from "@/store/survey/mutations";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";


export default defineComponent({
    name: "SurveyUsersComponent",

    components: {
        EditableTable

    },

    props: {
        users: {
            type: Array as PropType<Checker[]>,
            required: true
        },
        userType: {
            type: String,
            default: 'checker'
        }
    },

    emits:['updateUsers'],

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {changeCheckerAccess} = survey_panel_functions()

        const users_clone = ref<any[]>([])
        const m_headers = ref([
            {text: "نام", value: "first_name", width: "15%"},
            {text: "نام خانوادگی", value: "last_name", width: "15%"},
            {text: "کد", value: "code", width: "15%"},
            {text: "شماره تلفن", value: "phone", width: "10%"},

        ])
        const c_headers = ref([
            {text: "نام", value: "first_name", width: "15%"},
            {text: "نام خانوادگی", value: "last_name", width: "15%"},
            {text: "کد", value: "code", width: "15%"},
            {text: "دسترسی ویرایش عارضه", value: "edit_access", width: "25%"},
            {text: "شماره تلفن", value: "phone", width: "10%"},

        ])

        watch(()=>props.users,()=>{
            users_clone.value = []
            props.users.map((item) => {
                const data:any = {
                    first_name: item.user.first_name,
                    last_name: item.user.last_name,
                    code: item.code,
                    phone: item.user.phone,
                    id: item.id
                }
                if ('edit_access' in item){
                    data['edit_access'] = item['edit_access']
                }
                users_clone.value.push(data)
            })
        })

        onMounted(() => {
            users_clone.value = []
            props.users.map((item) => {
                const data:any = {
                    first_name: item.user.first_name,
                    last_name: item.user.last_name,
                    code: item.code,
                    phone: item.user.phone,
                    id: item.id
                }
                if ('edit_access' in item){
                    data['edit_access'] = item['edit_access']
                }
                users_clone.value.push(data)
            })
            console.log(users_clone.value)
        })

        return {
            store, toast, router, route, users_clone, m_headers,c_headers,changeCheckerAccess
        }
    },

    data() {
        return {
            // /-------table data---------/
            tableFilterActivate: false,

            height: "",  //  برای اندازه ازتفاع جدول //

            actions: [
                {
                    text: "لیست محدوده ها",
                    icon: "mdi-clipboard-list",
                    color: "info",
                },
                {
                    text: "تغییر وضعیت دسترسی ویرایش",
                    icon: "mdi-security",
                    color: "warning",
                }

            ],
        }
    },
    methods: {
        screenResizeHandler() {
            let x: any = document.getElementById("table");
            this.height = String(x.offsetHeight);
            console.log(this.height)
        },


        actionsClick(value: string, item: any, items: any) {
            if (value=='لیست محدوده ها'){
                this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)
                console.log(this.store.getters.getMapDisable)
                this.router.push({name:'allCheckerExtentsList',params:{id:item.id,name:`${item.first_name} ${item.last_name}`}})
            }else {
                this.store.commit('setConfirmDialog', {
                    massage: 'آیا تغییر دسترسی مورد تایید است ؟',
                    topic: 'اخطار',
                    active:true,
                    accept: async () => {

                        const res = await this.changeCheckerAccess({access:!item.edit_access},item.id)
                        if (res){
                            this.$emit('updateUsers')
                        }

                    },
                    reject: () => {
                        console.log('reject')
                    },

                })
            }

        }
    },

    watch: {
        users_clone() {
            if (this.users_clone.length > 0) {
                //  برای اندازه ازتفاع جدول //
                setTimeout(() => {
                    this.screenResizeHandler()
                }, 300);
                //  برای اندازه ازتفاع جدول //
            }
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


});
</script>


<style>
.metaTable {
    height: calc(100% - 10px)
}
</style>
