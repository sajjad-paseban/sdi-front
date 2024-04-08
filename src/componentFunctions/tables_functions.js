import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Api from "@/api/tables/routes";
import { ref } from "vue";
import { StoreActions } from "@/store";
export default function tables() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const tablesName = ref([]);
    const tableInfo = ref([]);
    const getTablesName = async () => {
        const response = await Api.getTables(toast);
        if (response.result) {
            tablesName.value = response.result;
            return response.result;
        }
    };
    const getTableInfoByName = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getTableInfoByName(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            tableInfo.value = response.result;
            return response.result;
        }
    };
    return {
        getTablesName, tablesName, getTableInfoByName, tableInfo
    };
}
//# sourceMappingURL=tables_functions.js.map