import { ref } from 'vue';
import Api from '@/api/access/routes';
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { StoreActions } from "@/store";
export default function access() {
    const accesses = ref([]);
    const apis = ref([]);
    const accessesTree = ref([]);
    const accessWithParentName = ref([]);
    const roleAccess = ref([]);
    const roleLayersAccess = ref([]);
    const toast = useToast();
    const store = useStore();
    const getAccesses = async () => {
        const response = await Api.getAccesses(toast);
        if (response.result) {
            accesses.value = [...response.result];
        }
    };
    const getAllApis = async () => {
        const response = await Api.getAllRoutes(toast);
        if (response.result) {
            apis.value = response.result;
        }
    };
    const getAccessWithParentName = async () => {
        const response = await Api.getAccessWithParentName(toast);
        if (response.result) {
            accessWithParentName.value = response.result;
            return response.result;
        }
    };
    const getAccessTree = async () => {
        const response = await Api.getAccessTree(toast);
        if (response.result) {
            accessesTree.value = response.result;
            return response.result;
        }
    };
    const deleteAccess = async (data) => {
        const response = await Api.deleteAccess(data, toast);
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'دسترسی حذف شد .'
            });
            return true;
        }
        else {
            return false;
        }
    };
    const getRoleAccessByName = async (role) => {
        const response = await Api.getRoleAccessByName({ id: role }, toast);
        if (response.result) {
            roleAccess.value = response.result;
            return response.result;
        }
    };
    const editAccess = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editAccess(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const getRoleLayerAccess = async (id) => {
        const response = await Api.getLayerTreeAccess(id, toast);
        if (response.result) {
            roleLayersAccess.value = response.result;
            return response.result;
        }
    };
    const saveRoleLayerAccess = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveRoleLayerAccess(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    const createInitAccess = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.CreateInitAccess(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    return {
        accesses,
        apis,
        getAccessWithParentName,
        getAllApis,
        getAccesses,
        accessWithParentName,
        getAccessTree,
        accessesTree,
        deleteAccess,
        createInitAccess,
        editAccess, getRoleAccessByName, roleAccess, getRoleLayerAccess, roleLayersAccess, saveRoleLayerAccess
    };
}
//# sourceMappingURL=access_functions.js.map