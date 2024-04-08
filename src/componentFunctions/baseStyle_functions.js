import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { StoreActions } from "@/store";
import Api from "@/api/styles/routes";
import { ref } from "vue";
export default function baseStyle() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const baseStyleItem = ref();
    const listStyles = ref();
    const linePatterns = ref();
    const polygonPatterns = ref();
    const getItemBaseStyle = async (id) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getItemBaseStyle(id, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            baseStyleItem.value = response.result;
        }
    };
    const getListBaseStyles = async (data) => {
        const response = await Api.getListBaseStyle({ geo_type: data }, toast);
        if (response.result) {
            listStyles.value = response.result.map((value) => {
                value.legend = store.state.geoUrl + value.legend;
                return value;
            });
        }
    };
    const getLinePattern = async () => {
        const response = await Api.getLinePattern(toast);
        if (response.result) {
            linePatterns.value = response.result;
        }
    };
    const getPolygonPattern = async () => {
        const response = await Api.getPolygonPattern(toast);
        if (response.result) {
            polygonPatterns.value = response.result;
        }
    };
    const addBaseModelStyle = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addBaseModelStyle(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    const editBaseModelStyle = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editBaseModelStyle(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    const deleteBaseStyle = async (id) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteBaseStyle(id, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
    };
    return {
        baseStyleItem,
        getItemBaseStyle,
        getListBaseStyles,
        listStyles,
        getLinePattern,
        getPolygonPattern,
        linePatterns,
        polygonPatterns,
        addBaseModelStyle,
        deleteBaseStyle,
        editBaseModelStyle
    };
}
//# sourceMappingURL=baseStyle_functions.js.map