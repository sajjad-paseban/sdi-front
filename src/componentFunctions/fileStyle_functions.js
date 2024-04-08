import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { StoreActions } from "@/store";
import Api from "@/api/styles/routes";
export default function fileStyle() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const addFileStyle = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.uploadSld(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    const updateFileStyle = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editUploadSld(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    return {
        addFileStyle, updateFileStyle
    };
}
//# sourceMappingURL=fileStyle_functions.js.map