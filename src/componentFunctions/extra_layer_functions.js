import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Api from "@/api/extraInLayer/routes";
import { ref } from "vue";
import { StoreActions } from "@/store";
export default function extra_layer_functions() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const layersTreeList = ref([]);
    const layerRetrieve = ref();
    const layerInfo = ref();
    const layerExportTypesList = ref([]);
    const layerExportLink = ref();
    const activeLayerFieldsList = ref([]);
    const layerSortListData = ref([]);
    const getLayersTree = async () => {
        const response = await Api.getLayersTree(toast);
        if (response.result) {
            layersTreeList.value = response.result;
            const parsed = JSON.stringify(layersTreeList.value);
            if (localStorage.getItem('LAYERS_TREE')) {
                localStorage.removeItem('LAYERS_TREE');
            }
            localStorage.setItem('LAYERS_TREE', parsed);
        }
    };
    const getLayerRetrieve = async (id) => {
        const response = await Api.getLayerRetrieve(id, toast);
        if (response.result) {
            layerRetrieve.value = response.result;
        }
    };
    const getLayerInfo = async (id) => {
        const response = await Api.getLayerInfo(id, toast);
        if (response.result) {
            layerInfo.value = response.result;
        }
    };
    const getLayerExportTypes = async () => {
        const response = await Api.getLayerExportTypes(toast);
        if (response.result) {
            layerExportTypesList.value = response.result;
        }
    };
    const layerExport = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.layerExport(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            layerExportLink.value = response.result;
        }
    };
    const getActiveLayerFields = async (id) => {
        const response = await Api.getActiveLayerFields(id, toast);
        if (response.result) {
            activeLayerFieldsList.value = response.result;
        }
    };
    const saveLayersSort = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveLayersSort(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    const layerSortList = async () => {
        const response = await Api.layerSortList(toast);
        if (response.result) {
            layerSortListData.value = response.result;
        }
    };
    const getLayerExtent = async (id) => {
        const response = await Api.getLayerExtent(id, toast);
        if (response.result) {
            return response.result;
        }
        else {
            return null;
        }
    };
    const layerToolsMerge = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.layerToolsMerge(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    return {
        layerToolsMerge, getLayerExtent,
        getActiveLayerFields, activeLayerFieldsList,
        getLayersTree, layersTreeList,
        layerRetrieve, getLayerRetrieve,
        getLayerInfo, layerInfo,
        getLayerExportTypes, layerExportTypesList,
        layerExport, layerExportLink, saveLayersSort,
        layerSortList, layerSortListData
    };
}
//# sourceMappingURL=extra_layer_functions.js.map