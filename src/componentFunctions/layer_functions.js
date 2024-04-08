import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
import Api from "@/api/layer/routes";
import { default as StyleApi } from "@/api/styles/routes";
import { ref } from "vue";
export default function layer_functions() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const layerFieldsList = ref();
    const layerDatabaseInfo = ref();
    const ownLayersListData = ref([]);
    const searchLayerConditionsList = ref([]);
    const resultSimpleLayerSearchList = ref([]);
    const resultSimpleDatabaseLayerSearchList = ref([]);
    const layerStylesList = ref();
    const uploadLayer = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.uploadLayer(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const setStyleToLayer = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await StyleApi.setStyleToLayer(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    const getLayerFields = async (id) => {
        const response = await Api.getLayerFields(id, toast);
        if (response.result) {
            layerFieldsList.value = response.result;
        }
    };
    const getLayerDatabaseInfo = async (id) => {
        const response = await Api.getLayerDatabaseInfo(id, toast);
        if (response.result) {
            layerDatabaseInfo.value = response.result;
        }
    };
    const deleteLayerMetaData = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteLayerMetaData(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addLayerMetaData = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addLayerMetaData(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const editLayerMetaData = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editLayerMetaData(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const saveLayerMetaDataChoices = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveLayerMetaDataChoices(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const saveAddLayerByFile = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveAddLayerByFile(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const editAddLayerByFile = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editAddLayerByFile(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addEmptyLayer = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addEmptyLayer(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const ownLayersList = async () => {
        const response = await Api.ownLayersList(toast);
        if (response.result) {
            ownLayersListData.value = response.result;
        }
    };
    const searchLayerConditions = async () => {
        const response = await Api.getSimpleLayerSearchConditions(toast);
        if (response.result) {
            searchLayerConditionsList.value = response.result;
        }
    };
    const resultSimpleLayerSearch = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.resultSimpleLayerSearch(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            resultSimpleLayerSearchList.value = response.result;
        }
    };
    const resultSimpleDatabaseLayerSearch = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.resultSimpleDatabaseLayerSearch(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            resultSimpleDatabaseLayerSearchList.value = response.result;
        }
    };
    const addLayerBySearchInLayer = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addLayerBySearchInLayer(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const addLayerBySearchInDatabaseLayer = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addLayerBySearchInDatabaseLayer(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const addServiceLayer = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addServiceLayer(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const updateServiceLayer = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.updateServiceLayer(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const updateLayerConfig = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.updateLayerConfig(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const getLayerStyles = async (id) => {
        const response = await Api.getLayerStyles(id, toast);
        if (response.result) {
            layerStylesList.value = response.result;
        }
    };
    const deleteLayer = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteLayer(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    return {
        deleteLayer, updateServiceLayer,
        layerStylesList, getLayerStyles,
        updateLayerConfig,
        uploadLayer,
        setStyleToLayer,
        getLayerFields,
        layerFieldsList,
        getLayerDatabaseInfo,
        layerDatabaseInfo,
        deleteLayerMetaData,
        addLayerMetaData,
        editLayerMetaData,
        saveLayerMetaDataChoices, saveAddLayerByFile, editAddLayerByFile, addEmptyLayer,
        ownLayersList, ownLayersListData,
        searchLayerConditions, searchLayerConditionsList,
        resultSimpleLayerSearch, resultSimpleLayerSearchList,
        addLayerBySearchInLayer,
        resultSimpleDatabaseLayerSearchList, resultSimpleDatabaseLayerSearch,
        addLayerBySearchInDatabaseLayer,
        addServiceLayer
    };
}
//# sourceMappingURL=layer_functions.js.map