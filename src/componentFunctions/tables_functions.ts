import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Api from "@/api/tables/routes";
import {LogsInterface} from "@/models/Logs.interface";
import {ref} from "vue";
import {TableInfoInterface} from "@/models/Table.interface";
import {TableInfoByNameSd} from "@/api/tables/SD.Models/tableInfoByName.sd";
import {StoreActions} from "@/store";

export default function tables(){

    const toast = useToast()
    const store = useStore()
    const router = useRouter()


    const tablesName = ref<string[]>([])
    const tableInfo = ref<TableInfoInterface[]>([])

    const getTablesName = async () => {
        const response = await Api.getTables<string[]>(toast)
        if (response.result) {
            tablesName.value = response.result
            return response.result
        }
    }


    const getTableInfoByName = async (data:TableInfoByNameSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getTableInfoByName<TableInfoInterface[]>(data,toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            tableInfo.value = response.result
            return response.result
        }
    }

    return{
        getTablesName,tablesName,getTableInfoByName,tableInfo
    }


}