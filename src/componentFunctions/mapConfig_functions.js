import { ref } from "vue";
import { StoreActions } from "@/store";
import Api from "@/api/mapConfig/routes";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default function mapConfig() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const mapConfig = ref();
    const mapConfigs = ref();
    const addMapConfig = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addMapConfig(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            router.push({ name: 'manageRolesList' });
            toast.add({ group: 'tr', life: 7000, severity: 'success', summary: ' نتیجه درخواست', detail: 'تنظیمات نقشه برای نقش اعمال شد ' });
        }
    };
    const getMapConfigs = async () => {
        const response = await Api.getMapConfigs(toast);
        if (response.result) {
            mapConfigs.value = response.result;
            return response.result;
        }
        else {
            null;
        }
    };
    const getMapConfigById = async (data) => {
        const response = await Api.getMapConfigById(data, toast);
        if (response.result) {
            return response.result;
        }
        else {
            null;
        }
    };
    return {
        addMapConfig, mapConfigs, getMapConfigs, getMapConfigById
    };
}
//# sourceMappingURL=mapConfig_functions.js.map