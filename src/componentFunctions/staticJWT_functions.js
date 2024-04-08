import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { StoreActions } from "@/store";
import Api from "@/api/jwt/routes";
import { ref } from "vue";
export default function staticJWTs() {
    const toast = useToast();
    const store = useStore();
    const keysList = ref([]);
    const key = ref();
    const addJWTAction = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addStaticJwt(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const getKeys = async () => {
        const response = await Api.getKeys(toast);
        if (response.result) {
            keysList.value = response.result;
            return response.result;
        }
    };
    const getKeyById = async (data) => {
        const response = await Api.getKeyById(data, toast);
        if (response.result) {
            key.value = response.result;
            return response.result;
        }
    };
    const deleteJWT = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteJWT(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'کلید حذف شد '
            });
            return true;
        }
        else {
            return false;
        }
    };
    return {
        addJWTAction, getKeys, keysList, getKeyById, key, deleteJWT
    };
}
//# sourceMappingURL=staticJWT_functions.js.map