import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ActiveLayerFields, LayerInfo, LayerRetrieve, LayerTree, ResponseLayerUpload} from "@/models/Layer.Interface";

import Api from "@/api/extraInLayer/routes";
import {ref} from "vue";
import {StoreActions} from "@/store";
import {LayerExportSd} from "@/api/extraInLayer/SD.Models/layerExport.sd";
import {LayerSortSd} from "@/api/extraInLayer/SD.Models/saveLayersSort.sd";
import {LayersMerge} from "@/api/extraInLayer/SD.Models/mergeLayers.sd";

export default function extra_layer_functions() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const layersTreeList = ref<LayerTree[]>([])
    const layerRetrieve = ref<LayerRetrieve>()
    const layerInfo = ref<LayerInfo>()
    const layerExportTypesList = ref<string[]>([])
    const layerExportLink = ref<string>()
    const activeLayerFieldsList = ref<ActiveLayerFields[]>([])
    const layerSortListData = ref<ResponseLayerUpload[]>([])


    const getLayersTree = async () => {
        const response = await Api.getLayersTree<LayerTree[]>(toast)
        if (response.result) {
            layersTreeList.value = response.result
            const parsed = JSON.stringify(layersTreeList.value);

            if (localStorage.getItem('LAYERS_TREE')) {
                localStorage.removeItem('LAYERS_TREE')
            }
            localStorage.setItem('LAYERS_TREE', parsed);
        }
    }

    const getLayerRetrieve = async (id: number) => {
        const response = await Api.getLayerRetrieve<LayerRetrieve>(id, toast)
        if (response.result) {
            layerRetrieve.value = response.result
        }
    }

    const getLayerInfo = async (id: number) => {
        const response = await Api.getLayerInfo<LayerInfo>(id, toast)
        if (response.result) {
            layerInfo.value = response.result
        }
    }

    const getLayerExportTypes = async () => {
        const response = await Api.getLayerExportTypes<string[]>(toast)
        if (response.result) {
            layerExportTypesList.value = response.result
        }
    }

    const layerExport = async (data:LayerExportSd,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.layerExport<string>(data,id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            layerExportLink.value = response.result
        }
    }

    const getActiveLayerFields = async (id: number) => {
        const response = await Api.getActiveLayerFields<ActiveLayerFields[]>(id, toast)
        if (response.result) {
            activeLayerFieldsList.value = response.result
        }
    }

    const saveLayersSort = async (data:LayerSortSd) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveLayersSort(data,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const layerSortList = async () => {
        const response = await Api.layerSortList<ResponseLayerUpload[]>(toast)
        if (response.result) {
            layerSortListData.value = response.result
        }
    }


    const getLayerExtent = async (id:number) => {
        const response = await Api.getLayerExtent<string>(id,toast)
        if (response.result) {
            return response.result
        }else {
            return null
        }
    }


    const layerToolsMerge = async (data:LayersMerge) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.layerToolsMerge(data,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    return {
        layerToolsMerge,getLayerExtent,
        getActiveLayerFields,activeLayerFieldsList,
        getLayersTree, layersTreeList,
        layerRetrieve, getLayerRetrieve,
        getLayerInfo, layerInfo,
        getLayerExportTypes,layerExportTypesList,
        layerExport,layerExportLink,saveLayersSort,
        layerSortList,layerSortListData
    }
}