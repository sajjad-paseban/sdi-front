import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
import Api from "@/api/connections/routes";
import { ref } from "vue";
export default function services() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const serviceTypes = ref([]);
    const servicesList = ref([]);
    const service = ref();
    const serviceVersion = ref([]);
    const addServiceAction = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addService(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const checkService = async (data) => {
        const response = await Api.checkService(data, toast);
        if (response.result) {
            if (response.result.massage === 'valid') {
                return true;
            }
        }
        return false;
    };
    const getServiceTypesAction = async () => {
        const response = await Api.getServiceTypes(toast);
        if (response.result) {
            serviceTypes.value = response.result;
        }
    };
    const getServiceVersionAction = async () => {
        const response = await Api.getServiceVersion(toast);
        if (response.result) {
            serviceVersion.value = response.result;
        }
    };
    const getServices = async () => {
        const response = await Api.getServices(toast);
        if (response.result) {
            servicesList.value = response.result;
            return response.result;
        }
    };
    const getServicesById = async (data) => {
        const response = await Api.getServiceById(data, toast);
        if (response.result) {
            service.value = response.result;
            return response.result;
        }
    };
    const deleteService = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteServiceById(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'سرویس حذف شد '
            });
        }
    };
    return {
        addServiceAction,
        serviceTypes,
        getServiceTypesAction,
        getServices,
        servicesList,
        getServicesById,
        service,
        deleteService,
        checkService,
        serviceVersion,
        getServiceVersionAction
    };
}
//# sourceMappingURL=connection_service_functions.js.map