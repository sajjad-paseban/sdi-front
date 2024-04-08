import { newSendRequest } from "../config";
import { uploadLayerValidator } from "@/api/layer/validations/uploadLayer.vd";
import { uploadLayerTransformer } from "@/api/layer/transformers/uploadLayer.tf";
import { getLayerFieldsValidator } from "@/api/layer/validations/getLayerFields.vd";
import { getLayerFieldsTransformer } from "@/api/layer/transformers/getLayerFields.tf";
import { layerDatabaseInfoValidation } from "@/api/layer/validations/layerDatabaseInfo.vd";
import { layerDatabaseInfoTransformer } from "@/api/layer/transformers/layerDatabaseInfo.tf";
import { ownLayersListValidator } from "@/api/layer/validations/ownLayersList.vd";
import { ownLayersListTransformer } from "@/api/layer/transformers/ownLayersList.tf";
import { getSimpleLayerSearchConditionsTransformer } from "@/api/layer/transformers/getSimpleLayerSearchConditions.tf";
import { getSimpleLayerSearchConditionsVd } from "@/api/layer/validations/getSimpleLayerSearchConditions.vd";
import { joinTablesValidator } from "@/api/connections/validations/database/joinTables.vd";
import { joinTablesTransformer } from "@/api/connections/transformers/database/jointTables.tf";
import { getLayerStylesValidator } from "@/api/layer/validations/getLayerStyles.vd";
import { getLayerStylesTransformer } from "@/api/layer/transformers/getLayerStyles.tf";
export default {
    uploadLayer: async function (data, toast) {
        const url = 'layer/upload';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast, true);
        console.log(result, 'uploadLayer response');
        return result;
    },
    getLayerFields: async function (id, toast) {
        const url = 'layer/get_fields';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getLayerFieldsValidator, getLayerFieldsTransformer, undefined, id, toast);
        console.log(result, 'getLayerFields response');
        return result;
    },
    getLayerDatabaseInfo: async function (id, toast) {
        const url = 'layer/get_layer_database_info';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', layerDatabaseInfoValidation, layerDatabaseInfoTransformer, undefined, id, toast);
        console.log(result, 'getLayerDatabaseInfo response');
        return result;
    },
    deleteLayerMetaData: async function (id, toast) {
        const url = 'layer/metaData/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteLayerMetaData response');
        return result;
    },
    addLayerMetaData: async function (data, toast) {
        const url = 'layer/metaData/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'addLayerMetaData response');
        return result;
    },
    editLayerMetaData: async function (data, id, toast) {
        const url = 'layer/metaData/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, id, toast);
        console.log(result, 'editLayerMetaData response');
        return result;
    },
    saveLayerMetaDataChoices: async function (data, toast) {
        const url = 'layer/metaData/choice';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'saveLayerMetaDataChoices response');
        return result;
    },
    saveAddLayerByFile: async function (data, toast) {
        const url = 'layer/addLayerByFile';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'saveAddLayerByFile response');
        return result;
    },
    editAddLayerByFile: async function (data, toast) {
        const url = 'layer/editLayerByFile';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'editAddLayerByFile response');
        return result;
    },
    addEmptyLayer: async function (data, toast) {
        const url = 'layer/makeEmptyLayer';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast);
        console.log(result, 'addEmptyLayer response');
        return result;
    },
    ownLayersList: async function (toast) {
        const url = 'layer/own_layers_list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', ownLayersListValidator, ownLayersListTransformer, undefined, undefined, toast);
        console.log(result, 'ownLayersList response');
        return result;
    },
    getSimpleLayerSearchConditions: async function (toast) {
        const url = 'layer/get_simple_condition';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getSimpleLayerSearchConditionsVd, getSimpleLayerSearchConditionsTransformer, undefined, undefined, toast);
        console.log(result, 'getSimpleLayerSearchConditions response');
        return result;
    },
    resultSimpleLayerSearch: async function (data, toast) {
        const url = 'layer/get_result_simple_condition';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', joinTablesValidator, joinTablesTransformer, data, undefined, toast);
        console.log(result, 'resultSimpleLayerSearch response');
        return result;
    },
    resultSimpleDatabaseLayerSearch: async function (data, toast) {
        const url = 'layer/get_result_simple_condition_in_database';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', joinTablesValidator, joinTablesTransformer, data, undefined, toast);
        console.log(result, 'resultSimpleDatabaseLayerSearch response');
        return result;
    },
    addLayerBySearchInLayer: async function (data, toast) {
        const url = 'layer/add_layer_by_search_in_layer';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast);
        console.log(result, 'addLayerBySearchInLayer response');
        return result;
    },
    addLayerBySearchInDatabaseLayer: async function (data, toast) {
        const url = 'layer/add_layer_by_search_in_database_layer';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast);
        console.log(result, 'addLayerBySearchInDatabaseLayer response');
        return result;
    },
    addServiceLayer: async function (data, toast) {
        const url = 'layer/service/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast);
        console.log(result, 'addServiceLayer response');
        return result;
    },
    updateServiceLayer: async function (data, id, toast) {
        const url = 'layer/service/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', uploadLayerValidator, uploadLayerTransformer, data, id, toast);
        console.log(result, 'updateServiceLayer response');
        return result;
    },
    updateLayerConfig: async function (data, id, toast) {
        const url = 'layer/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', uploadLayerValidator, uploadLayerTransformer, data, id, toast);
        console.log(result, 'updateLayerConfig response');
        return result;
    },
    getLayerStyles: async function (id, toast) {
        const url = 'layer/style';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getLayerStylesValidator, getLayerStylesTransformer, undefined, id, toast);
        console.log(result, 'getLayerStyles response');
        return result;
    },
    deleteLayer: async function (data, id, toast) {
        const url = 'layer/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, data, id, toast);
        console.log(result, 'deleteLayer response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map