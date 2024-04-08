import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
import Api from "@/api/connections/routes";
import { ref } from "vue";
export default function databases() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const databaseTypes = ref([]);
    const databasesList = ref([]);
    const database = ref();
    const dataBaseTables = ref([]);
    const tableFieldsList = ref([]);
    const sampleJoinTableList = ref([]);
    const addDatabaseAction = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addDatabase(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const checkDatabase = async (data) => {
        const response = await Api.checkDatabase(data, toast);
        if (response.result) {
            if (response.result.massage === 'valid') {
                return true;
            }
        }
        return false;
    };
    const getDataBaseTypesAction = async () => {
        const response = await Api.getDataBaseTypes(toast);
        if (response.result) {
            databaseTypes.value = response.result;
        }
    };
    const getDatabases = async () => {
        const response = await Api.getDataBases(toast);
        if (response.result) {
            databasesList.value = response.result;
            return response.result;
        }
    };
    const getDatabasesById = async (data) => {
        const response = await Api.getDataBaseById(data, toast);
        if (response.result) {
            database.value = response.result;
            return response.result;
        }
    };
    const deleteDataBase = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteDataBaseById(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'دیتابیس حذف شد '
            });
        }
    };
    const getDataBaseTables = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getDataBaseTables(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            dataBaseTables.value = response.result;
            return response.result;
        }
    };
    const getTableFields = async (name, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getTableFields(id, { name: name }, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            tableFieldsList.value = response.result;
            return response.result;
        }
    };
    const getSampleJoinTables = async (data) => {
        const response = await Api.sampleJoinTables(data, toast);
        if (response.result) {
            sampleJoinTableList.value = response.result;
            return response.result;
        }
    };
    const saveJoinTables = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveJoinTables(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
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
    };
}
//# sourceMappingURL=connection_database_functions.js.map