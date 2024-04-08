import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { StoreActions } from "@/store";
import Api from "@/api/styles/routes";
import { ref } from "vue";
export default function labelStyle() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const listStyles = ref();
    const listFonts = ref();
    const fontStyles = ref();
    const fontWights = ref();
    const labelStyleItem = ref();
    const getListTextStyles = async () => {
        const response = await Api.getListTextStyle(toast);
        if (response.result) {
            listStyles.value = response.result.map((value) => {
                value.legend = store.state.frontUrl + value.legend;
                return value;
            });
        }
    };
    const getListFonts = async () => {
        const response = await Api.getListFonts(toast);
        if (response.result) {
            listFonts.value = response.result;
        }
    };
    const getFontStyles = async () => {
        const response = await Api.getFontStyles(toast);
        if (response.result) {
            fontStyles.value = response.result;
        }
    };
    const getFontWights = async () => {
        const response = await Api.getFontWights(toast);
        if (response.result) {
            fontWights.value = response.result;
        }
    };
    const addTextStyle = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addTextStyle(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    const getItemLabelStyle = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getItemLabelStyle(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            labelStyleItem.value = response.result;
        }
    };
    const deleteTextStyle = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteTextStyle(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
    };
    const editTextModelStyle = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editTextStyle(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    return {
        deleteTextStyle,
        editTextModelStyle,
        listStyles,
        getListTextStyles,
        getListFonts,
        listFonts,
        getFontStyles,
        fontStyles,
        getFontWights,
        fontWights,
        addTextStyle,
        getItemLabelStyle,
        labelStyleItem
    };
}
//# sourceMappingURL=labelStyle_functions.js.map