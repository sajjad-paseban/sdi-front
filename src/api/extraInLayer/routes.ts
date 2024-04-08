import {any, z} from "zod";
import {MyApiResponse, newSendRequest} from "@/api/config";
import {layerTreeTransformer} from "@/api/extraInLayer/transformers/layerTree.tf";
import {layerTreeArrayValidator} from "@/api/extraInLayer/validations/getLayerTree.vd";
import {layerRetrieveTransformer} from "@/api/extraInLayer/transformers/layerRetrieve.tf";
import {layerRetrieveValidator} from "@/api/extraInLayer/validations/layerRetrieve.vd";
import {layerInfoValidator} from "@/api/extraInLayer/validations/layerInfo.vd";
import {layerInfoTransformer} from "@/api/extraInLayer/transformers/layerInfo.tf";
import {layerExportTypesListTransformer} from "@/api/extraInLayer/transformers/layerExportTypesList.tf";
import {layerExportTypesListValidator} from "@/api/extraInLayer/validations/layerExportTypesList.vd";
import {LayerExportSd} from "@/api/extraInLayer/SD.Models/layerExport.sd";
import {layerExportTransformer} from "@/api/extraInLayer/transformers/layerExport.tf";
import {layerExportValidator} from "@/api/extraInLayer/validations/layerExport.vd";
import {getLayersTransformer} from "@/api/extraInLayer/transformers/getLayerstf";
import {getLayersValidator} from "@/api/extraInLayer/validations/getLayers.vd";
import {getActiveLayerFieldsValidator} from "@/api/extraInLayer/validations/getActiveLayerFields.vd";
import {getActiveLayerFieldsTransformer} from "@/api/extraInLayer/transformers/getActiveLayerFields.tf";
import {ResponseLayerUpload} from "@/models/Layer.Interface";
import {LayerSortSd} from "@/api/extraInLayer/SD.Models/saveLayersSort.sd";
import {ownLayersListValidator} from "@/api/layer/validations/ownLayersList.vd";
import {ownLayersListTransformer} from "@/api/layer/transformers/ownLayersList.tf";
import {LayersMerge} from "@/api/extraInLayer/SD.Models/mergeLayers.sd";
import {getLayerExtentValidator} from "@/api/extraInLayer/validations/getLayerextent.vd";
import {getLayerExtentTransformer} from "@/api/extraInLayer/transformers/getLayerExtent.tf";


interface route {

    getLayersTree: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getLayerRetrieve: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getLayerExtent: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getLayerInfo: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getLayerExportTypes: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    layerExport: <T1>(data: LayerExportSd, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getLayers: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getActiveLayerFields: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    saveLayersSort: <T1>(data: LayerSortSd, toast?: any) => Promise<MyApiResponse<T1>>;
    layerSortList: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    layerToolsMerge: <T1>(data:LayersMerge,toast?: any) => Promise<MyApiResponse<T1>>;




}

export default {
    getLayersTree: async function <T1>(toast?: any) {
        return;
        const url = 'layer/all/tree';
        type T2 = z.infer<typeof layerTreeArrayValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', layerTreeArrayValidator, layerTreeTransformer, undefined, undefined, toast)
        console.log(result, 'getLayersTree response')
        return result
    },

    getLayerRetrieve: async function <T1>(id: number, toast?: any) {
        const url = 'layer/retrieve';
        type T2 = z.infer<typeof layerRetrieveValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', layerRetrieveValidator, layerRetrieveTransformer, undefined, id, toast)
        console.log(result, 'getLayerRetrieve response')
        return result
    },

    getLayerExtent: async function <T1>(id: number, toast?: any) {
        const url = 'layer/getLayerExtent';
        type T2 = z.infer<typeof getLayerExtentValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getLayerExtentValidator, getLayerExtentTransformer, undefined, id, toast)
        console.log(result, 'getLayerExtent response')
        return result
    },

    getLayerInfo: async function <T1>(id: number, toast?: any) {
        const url = 'layer/info';
        type T2 = z.infer<typeof layerInfoValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', layerInfoValidator, layerInfoTransformer, undefined, id, toast)
        console.log(result, 'getLayerInfo response')
        return result
    },

    getLayerExportTypes: async function <T1>(toast?: any) {
        const url = 'layer/export/get_types';
        type T2 = z.infer<typeof layerExportTypesListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', layerExportTypesListValidator, layerExportTypesListTransformer, undefined, undefined, toast)
        console.log(result, 'getLayerExportTypes response')
        return result
    },

    layerExport: async function <T1>(data: LayerExportSd, id: number, toast?: any) {
        const url = 'layer/export';
        type T2 = z.infer<typeof layerExportValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LayerExportSd>(url, 'put', layerExportValidator, layerExportTransformer, data, id, toast)
        console.log(result, 'layerExport response')
        return result
    },


    getLayers: async function <T1>(toast?: any) {
        const url = 'layer/list';
        type T2 = z.infer<typeof getLayersValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getLayersValidator, getLayersTransformer, undefined, undefined, toast)
        console.log(result, 'getLayers response')
        return result
    },

    getActiveLayerFields: async function <T1>(id: number, toast?: any) {
        const url = 'layer/active_layer/get_fields';
        type T2 = z.infer<typeof getActiveLayerFieldsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getActiveLayerFieldsValidator, getActiveLayerFieldsTransformer, undefined, id, toast)
        console.log(result, 'getActiveLayerFields response')
        return result
    },

    saveLayersSort: async function <T1>(data: LayerSortSd, toast?: any) {
        const url = 'layer/layerSort/save';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, LayerSortSd>(url, 'put', undefined, undefined, data, undefined, toast)
        console.log(result, 'saveLayersSort response')
        return result
    },

    layerSortList: async function <T1>(toast?: any) {
        const url = 'layer/layerSort/list';
        type T2 = z.infer<typeof ownLayersListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', ownLayersListValidator, ownLayersListTransformer, undefined, undefined, toast)
        console.log(result, 'layerSortList response')
        return result
    },

    layerToolsMerge: async function <T1>(data: LayersMerge, toast?: any) {
        const url = 'layer/layerTools/merge';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, LayersMerge>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'layerToolsMerge response')
        return result
    },



} as route