import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/layer/routes";
import {default as StyleApi} from "@/api/styles/routes";
import {
    EmptyLayerInterface,
    LayerDatabaseInfo,
    LayerFields,
    LayerInterface, LayerStyles,
    ResponseLayerUpload, SearchInDatabaseLayerInterface, SearchInLayerInterface, ServiceLayerInterface
} from "@/models/Layer.Interface";
import {SetStyleToLayerSd} from "@/api/styles/SD.Models/setStyleToLayer.sd";
import {ListStyles} from "@/models/Style.interface";
import {ref} from "vue";
import {LayerMetaDataChoicesSd} from "@/api/layer/SD.Models/layerMetaDataChoices.sd";
import {SaveAddLayerByFileSd} from "@/api/layer/SD.Models/saveAddLayerByFile.sd";
import {resultSimpleLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleLayerSearch.sd";
import {resultSimpleDatabaseLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleDatabaseLayerSearch.sd";
import {UpdateLayerConfigSd} from "@/api/layer/SD.Models/updateLayerConfig.sd";
import {DeleteLayerSd} from "@/api/layer/SD.Models/deleteLayer.sd";


export default function layer_functions() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const layerFieldsList = ref<LayerFields[]>()
    const layerDatabaseInfo = ref<LayerDatabaseInfo>()
    const ownLayersListData = ref<ResponseLayerUpload[]>([])
    const searchLayerConditionsList = ref<string[]>([])
    const resultSimpleLayerSearchList = ref<any[]>([])
    const resultSimpleDatabaseLayerSearchList = ref<any[]>([])
    const layerStylesList = ref<LayerStyles>()

    const uploadLayer = async (data: LayerInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.uploadLayer<ResponseLayerUpload>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const setStyleToLayer = async (data: SetStyleToLayerSd) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await StyleApi.setStyleToLayer(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const getLayerFields = async (id: number) => {
        const response = await Api.getLayerFields<LayerFields[]>(id, toast)
        if (response.result) {
            layerFieldsList.value = response.result
        }
    }

    const getLayerDatabaseInfo = async (id: number) => {
        const response = await Api.getLayerDatabaseInfo<LayerDatabaseInfo>(id, toast)
        if (response.result) {
            layerDatabaseInfo.value = response.result
        }
    }

    const deleteLayerMetaData = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteLayerMetaData(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addLayerMetaData = async (data: LayerFields) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addLayerMetaData<string>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const editLayerMetaData = async (data: LayerFields, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editLayerMetaData<string>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const saveLayerMetaDataChoices = async (data: LayerMetaDataChoicesSd) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveLayerMetaDataChoices<string>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const saveAddLayerByFile = async (data: SaveAddLayerByFileSd) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveAddLayerByFile<string>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const editAddLayerByFile = async (data: SaveAddLayerByFileSd) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editAddLayerByFile<string>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addEmptyLayer = async (data: EmptyLayerInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addEmptyLayer<ResponseLayerUpload>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const ownLayersList = async () => {
        const response = await Api.ownLayersList<ResponseLayerUpload[]>(toast)
        if (response.result) {
            ownLayersListData.value = response.result
        }
    }

    const searchLayerConditions = async () => {
        const response = await Api.getSimpleLayerSearchConditions<string[]>(toast)
        if (response.result) {
            searchLayerConditionsList.value = response.result
        }
    }

    const resultSimpleLayerSearch = async (data: resultSimpleLayerSearchSd) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.resultSimpleLayerSearch<any[]>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            resultSimpleLayerSearchList.value = response.result
        }
    }

    const resultSimpleDatabaseLayerSearch = async (data: resultSimpleDatabaseLayerSearchSd) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.resultSimpleDatabaseLayerSearch<any[]>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            resultSimpleDatabaseLayerSearchList.value = response.result
        }
    }

    const addLayerBySearchInLayer = async (data: SearchInLayerInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addLayerBySearchInLayer<ResponseLayerUpload>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const addLayerBySearchInDatabaseLayer = async (data: SearchInDatabaseLayerInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addLayerBySearchInDatabaseLayer<ResponseLayerUpload>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const addServiceLayer = async (data: ServiceLayerInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addServiceLayer<ResponseLayerUpload>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const updateServiceLayer = async (data: ServiceLayerInterface,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.updateServiceLayer<ResponseLayerUpload>(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const updateLayerConfig = async (data: UpdateLayerConfigSd,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.updateLayerConfig<ResponseLayerUpload>(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const getLayerStyles = async (id:number) => {
        const response = await Api.getLayerStyles<LayerStyles>(id, toast)
        if (response.result) {
            layerStylesList.value = response.result
        }
    }

    const deleteLayer = async (data: DeleteLayerSd,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteLayer(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    return {
        deleteLayer,updateServiceLayer,
        layerStylesList,getLayerStyles,
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
        saveLayerMetaDataChoices, saveAddLayerByFile, editAddLayerByFile,addEmptyLayer,
        ownLayersList, ownLayersListData,
        searchLayerConditions, searchLayerConditionsList,
        resultSimpleLayerSearch, resultSimpleLayerSearchList,
        addLayerBySearchInLayer,
        resultSimpleDatabaseLayerSearchList,resultSimpleDatabaseLayerSearch,
        addLayerBySearchInDatabaseLayer,
        addServiceLayer
    }
}