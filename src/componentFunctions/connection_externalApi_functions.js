import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
import Api from "@/api/connections/routes";
import { ref } from "vue";
export default function ExternalApis() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const ExternalApiMethods = ref([]);
    const ExternalApisList = ref([]);
    const ExternalApi = ref();
    const addExternalApiAction = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addExternalApi(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const getExternalApiMethodsAction = async () => {
        const response = await Api.getExternalApiMethods(toast);
        if (response.result) {
            ExternalApiMethods.value = response.result;
        }
    };
    const getExternalApis = async () => {
        const response = await Api.getExternalApis(toast);
        if (response.result) {
            ExternalApisList.value = response.result;
            return response.result;
        }
    };
    const getExternalApisById = async (data) => {
        const response = await Api.getExternalApiById(data, toast);
        if (response.result) {
            ExternalApi.value = response.result;
            return response.result;
        }
    };
    const getExternalApisByName = async (data) => {
        const response = await Api.getExternalApiByName(data, toast);
        if (response.result) {
            ExternalApi.value = response.result;
            return response.result;
        }
    };
    const deleteExternalApi = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteExternalApiById(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'api حذف شد '
            });
        }
    };
    return {
        addExternalApiAction,
        ExternalApiMethods,
        getExternalApiMethodsAction,
        getExternalApis,
        ExternalApisList,
        getExternalApisById,
        ExternalApi,
        deleteExternalApi,
        getExternalApisByName
    };
}
//# sourceMappingURL=connection_externalApi_functions.js.map