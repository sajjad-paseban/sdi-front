import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/connections/routes";
import {AnyObject, DataBaseInterface, MassageConnection, TableField} from "@/models/Conncections.interface";
import {ref} from "vue";
import {GetDatabaseByIdSd} from "@/api/connections/SD.Models/getDatabaseById.sd";
import {DeleteIpSd} from "@/api/ips/SD.Models/deleteIp.sd";
import {MassageIps} from "@/models/Ips.interface";
import {deleteDatabaseByIdSd} from "@/api/connections/SD.Models/deleteDatabaseById.sd";
import {JoinTablesSD} from "@/api/connections/SD.Models/joinTables.sd";


export default function databases() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const databaseTypes = ref<string[]>([])
    const databasesList = ref<DataBaseInterface[]>([])
    const database = ref<DataBaseInterface>()
    const dataBaseTables = ref<string[]>([])
    const tableFieldsList = ref<TableField[]>([])
    const sampleJoinTableList = ref<AnyObject[]>([])

    const addDatabaseAction = async (data: DataBaseInterface) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addDatabase<MassageConnection>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const checkDatabase = async (data: DataBaseInterface) => {

        const response = await Api.checkDatabase<MassageConnection>(data, toast)

        if (response.result) {
            if (response.result.massage === 'valid') {
                return true
            }
        }

        return false
    }


    const getDataBaseTypesAction = async () => {
        const response = await Api.getDataBaseTypes<string[]>(toast)
        if (response.result) {
            databaseTypes.value = response.result
        }
    }

    const getDatabases = async () => {
        const response = await Api.getDataBases<DataBaseInterface[]>(toast)
        if (response.result) {
            databasesList.value = response.result
            return response.result
        }
    }

    const getDatabasesById = async (data: GetDatabaseByIdSd) => {
        const response = await Api.getDataBaseById<DataBaseInterface>(data, toast)
        if (response.result) {
            database.value = response.result
            return response.result
        }
    }

    const deleteDataBase = async (data: deleteDatabaseByIdSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteDataBaseById<MassageConnection>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'دیتابیس حذف شد '
            });

        }
    }

    const getDataBaseTables = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getDataBaseTables<string[]>(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            dataBaseTables.value = response.result
            return response.result
        }
    }

    const getTableFields = async (name: string, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getTableFields<TableField[]>(id, {name: name}, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            tableFieldsList.value = response.result
            return response.result
        }
    }

    const getSampleJoinTables = async (data: JoinTablesSD) => {

        const response = await Api.sampleJoinTables<AnyObject[]>(data, toast)

        if (response.result) {
            sampleJoinTableList.value = response.result
            return response.result
        }
    }

    const saveJoinTables = async (data: JoinTablesSD) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveJoinTables(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0
    }


    return {
        addDatabaseAction,
        databaseTypes,
        getDataBaseTypesAction,
        getDatabases,
        databasesList,
        getDatabasesById,
        database,
        deleteDataBase,
        checkDatabase,
        getDataBaseTables,
        dataBaseTables,
        getTableFields, tableFieldsList,
        sampleJoinTableList, getSampleJoinTables, saveJoinTables
    }
}