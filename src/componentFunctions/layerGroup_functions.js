import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
import Api from "@/api/layerGroup/routes";
import { ref } from "vue";
export default function layerGroupFunctions() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const layerGroupList = ref([]);
    const groupItem = ref();
    const add = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addLayerGroup(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const list = async () => {
        const response = await Api.listLayerGroup(toast);
        if (response.result) {
            layerGroupList.value = response.result;
        }
    };
    const deleteLayerGroup = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteLayerGroup(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
    };
    const getItemLayerGroup = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getItemLayerGroup(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            groupItem.value = response.result;
        }
    };
    const editLayerGroup = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editLayerGroup(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    return {
        add, list, layerGroupList, deleteLayerGroup, getItemLayerGroup, groupItem, editLayerGroup
    };
}
//# sourceMappingURL=layerGroup_functions.js.map