import { newSendRequest } from "@/api/config";
import { layerTreeTransformer } from "@/api/extraInLayer/transformers/layerTree.tf";
import { layerTreeArrayValidator } from "@/api/extraInLayer/validations/getLayerTree.vd";
import { layerRetrieveTransformer } from "@/api/extraInLayer/transformers/layerRetrieve.tf";
import { layerRetrieveValidator } from "@/api/extraInLayer/validations/layerRetrieve.vd";
import { layerInfoValidator } from "@/api/extraInLayer/validations/layerInfo.vd";
import { layerInfoTransformer } from "@/api/extraInLayer/transformers/layerInfo.tf";
import { layerExportTypesListTransformer } from "@/api/extraInLayer/transformers/layerExportTypesList.tf";
import { layerExportTypesListValidator } from "@/api/extraInLayer/validations/layerExportTypesList.vd";
import { layerExportTransformer } from "@/api/extraInLayer/transformers/layerExport.tf";
import { layerExportValidator } from "@/api/extraInLayer/validations/layerExport.vd";
import { getLayersTransformer } from "@/api/extraInLayer/transformers/getLayerstf";
import { getLayersValidator } from "@/api/extraInLayer/validations/getLayers.vd";
import { getActiveLayerFieldsValidator } from "@/api/extraInLayer/validations/getActiveLayerFields.vd";
import { getActiveLayerFieldsTransformer } from "@/api/extraInLayer/transformers/getActiveLayerFields.tf";
import { ownLayersListValidator } from "@/api/layer/validations/ownLayersList.vd";
import { ownLayersListTransformer } from "@/api/layer/transformers/ownLayersList.tf";
import { getLayerExtentValidator } from "@/api/extraInLayer/validations/getLayerextent.vd";
import { getLayerExtentTransformer } from "@/api/extraInLayer/transformers/getLayerExtent.tf";
export default {
    getLayersTree: async function (toast) {
        return;
        const url = 'layer/all/tree';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', layerTreeArrayValidator, layerTreeTransformer, undefined, undefined, toast);
        console.log(result, 'getLayersTree response');
        return result;
    },
    getLayerRetrieve: async function (id, toast) {
        const url = 'layer/retrieve';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', layerRetrieveValidator, layerRetrieveTransformer, undefined, id, toast);
        console.log(result, 'getLayerRetrieve response');
        return result;
    },
    getLayerExtent: async function (id, toast) {
        const url = 'layer/getLayerExtent';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getLayerExtentValidator, getLayerExtentTransformer, undefined, id, toast);
        console.log(result, 'getLayerExtent response');
        return result;
    },
    getLayerInfo: async function (id, toast) {
        const url = 'layer/info';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', layerInfoValidator, layerInfoTransformer, undefined, id, toast);
        console.log(result, 'getLayerInfo response');
        return result;
    },
    getLayerExportTypes: async function (toast) {
        const url = 'layer/export/get_types';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', layerExportTypesListValidator, layerExportTypesListTransformer, undefined, undefined, toast);
        console.log(result, 'getLayerExportTypes response');
        return result;
    },
    layerExport: async function (data, id, toast) {
        const url = 'layer/export';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', layerExportValidator, layerExportTransformer, data, id, toast);
        console.log(result, 'layerExport response');
        return result;
    },
    getLayers: async function (toast) {
        const url = 'layer/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getLayersValidator, getLayersTransformer, undefined, undefined, toast);
        console.log(result, 'getLayers response');
        return result;
    },
    getActiveLayerFields: async function (id, toast) {
        const url = 'layer/active_layer/get_fields';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getActiveLayerFieldsValidator, getActiveLayerFieldsTransformer, undefined, id, toast);
        console.log(result, 'getActiveLayerFields response');
        return result;
    },
    saveLayersSort: async function (data, toast) {
        const url = 'layer/layerSort/save';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, undefined, toast);
        console.log(result, 'saveLayersSort response');
        return result;
    },
    layerSortList: async function (toast) {
        const url = 'layer/layerSort/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', ownLayersListValidator, ownLayersListTransformer, undefined, undefined, toast);
        console.log(result, 'layerSortList response');
        return result;
    },
    layerToolsMerge: async function (data, toast) {
        const url = 'layer/layerTools/merge';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'layerToolsMerge response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map