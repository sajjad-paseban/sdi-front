<template>
    <div dir="rtl" style="height:100%;width:100%;overflow-y: auto;min-width: 300px" class="pa-2 rounded-lg">
        <div v-if="users_clone.length>0" id="table" class="metaTable elevation-2 border-t rounded-lg">
            <EditableTable
                    ref="editTable"
                    :headers="headers"
                    :items="users_clone"
                    :action="actions"
                    :checkBox="false"
                    :height="height"
                    :filter-activate="tableFilterActivate"
                    @actionClick="actionsClick"
            ></EditableTable>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import {SurveyPerson} from "@/models/SurveyPanel.interface";
import EditableTable from "@/components/common/editableTable.vue";
import {SurveyMutations} from "@/store/survey/mutations";
import survey_panel_functions from "@/componentFunctions/surveyPanel_functions";


export default defineComponent({
    name: "SurveyUsersComponent",

    components: {
        EditableTable

    },

    props:{
      users:{
          type:Array as PropType<SurveyPerson[]>,
          required:true
      }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()

        const {addSurveyPersonLayers} = survey_panel_functions()


        const users_clone = ref<any[]>([])
        const headers = ref([
            {text: "نام", value: "first_name", width: "15%"},
            {text: "نام خانوادگی", value: "last_name", width: "15%"},
            {text: "کد", value: "code", width: "15%"},
            {text: "شماره تلفن", value: "phone", width: "10%"},
            {text: "لایه های ممیزی", value: "has_layers", width: "10%"},

        ])

        onMounted(()=>{
            props.users.map((item)=>{
                users_clone.value.push({
                    first_name:item.user.first_name,
                    last_name:item.user.last_name,
                    code:item.code,
                    phone:item.user.phone,
                    has_layers:!!item.arse_layer,
                    id:item.id
                })
            })
            console.log(users_clone.value)
        })

        return {
            store, toast, router, route,users_clone,headers,addSurveyPersonLayers
        }
    },

    data() {
        return {
            // /-------table data---------/
            tableFilterActivate: false,

            height: "",  //  برای اندازه ازتفاع جدول //

            actions: [
                {
                    text: "اضافه کردن لایه",
                    icon: "mdi-layers-plus",
                    color: "info",
                },
                {
                    text: "لیست محدوده ها",
                    icon: "mdi-clipboard-list",
                    color: "success",
                }

            ],
        }
    },
    emits:['updateUsersList'],
    methods: {
        screenResizeHandler() {
            let x: any = document.getElementById("table");
            this.height = String(x.offsetHeight);
            console.log(this.height)
        },


        async actionsClick(value: string, item: any, items: any) {
            if (value == 'لیست محدوده ها') {
                this.store.commit(SurveyMutations.SET_MAP_DISABLE, false)
                console.log(this.store.getters.getMapDisable)
                await this.router.push({
                    name: 'allUserExtentsList',
                    params: {id: item.id, name: `${item.first_name} ${item.last_name}`}
                })
            } else if (value == 'اضافه کردن لایه') {
                if (item.has_layers){
                    this.toast.add({
                        group: 'br',
                        life: 3000,
                        severity: 'error',
                        summary: 'نتیجه درخواست',
                        detail: "لایه ها از قبل ایجاد شده است"
                    })
                }else {
                    const res = await this.addSurveyPersonLayers(item.id)
                    if (res){
                        item.has_layers = true
                        this.toast.add({group: 'tr', life: 4000, severity: 'success', summary: ' نتیجه در دخواست', detail: 'لایه های کاربر اضافه شد.'});
                        this.$emit('updateUsersList',true)
                    }
                }

            }
        }
    },

    watch: {
        users_clone(){
            if (this.users_clone.length>0){
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
