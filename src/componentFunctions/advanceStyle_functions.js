import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Api from "@/api/styles/routes";
import { ref } from "vue";
import { StoreActions } from "@/store";
export default function advanceStyle() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const filterTypes = ref([]);
    const filterOperators = ref([]);
    const advanceStyleItem = ref();
    const getListFilterTypes = async () => {
        const response = await Api.getListFilterTypes(toast);
        if (response.result) {
            filterTypes.value = response.result;
        }
    };
    const getListFilterOperators = async () => {
        const response = await Api.getListFilterOperators(toast);
        if (response.result) {
            filterOperators.value = response.result;
        }
    };
    const addAdvanceModelStyle = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addAdvanceModelStyle(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    const getItemAdvanceStyle = async (id) => {
        const response = await Api.getItemAdvanceStyle(id, toast);
        if (response.result) {
            advanceStyleItem.value = response.result;
        }
    };
    const editAdvanceModelStyle = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editAdvanceModelStyle(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    return {
        getListFilterOperators, getListFilterTypes, filterTypes, filterOperators, addAdvanceModelStyle, getItemAdvanceStyle, advanceStyleItem, editAdvanceModelStyle
    };
}
//# sourceMappingURL=advanceStyle_functions.js.map