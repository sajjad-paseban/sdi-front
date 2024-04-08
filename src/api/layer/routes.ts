import {z} from "zod";
import {MyApiResponse, newSendRequest} from "../config";
import {
    EmptyLayerInterface,
    LayerFields,
    LayerInterface,
    SearchInDatabaseLayerInterface,
    SearchInLayerInterface, ServiceLayerInterface
} from "@/models/Layer.Interface";
import {uploadLayerValidator} from "@/api/layer/validations/uploadLayer.vd";
import {uploadLayerTransformer} from "@/api/layer/transformers/uploadLayer.tf";
import {getLayerFieldsValidator} from "@/api/layer/validations/getLayerFields.vd";
import {getLayerFieldsTransformer} from "@/api/layer/transformers/getLayerFields.tf";
import {layerDatabaseInfoValidation} from "@/api/layer/validations/layerDatabaseInfo.vd";
import {layerDatabaseInfoTransformer} from "@/api/layer/transformers/layerDatabaseInfo.tf";
import {LayerMetaDataChoicesSd} from "@/api/layer/SD.Models/layerMetaDataChoices.sd";
import {SaveAddLayerByFileSd} from "@/api/layer/SD.Models/saveAddLayerByFile.sd";
import {ownLayersListValidator} from "@/api/layer/validations/ownLayersList.vd";
import {ownLayersListTransformer} from "@/api/layer/transformers/ownLayersList.tf";
import {getSimpleLayerSearchConditionsTransformer} from "@/api/layer/transformers/getSimpleLayerSearchConditions.tf";
import {getSimpleLayerSearchConditionsVd} from "@/api/layer/validations/getSimpleLayerSearchConditions.vd";
import {resultSimpleLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleLayerSearch.sd";
import {joinTablesValidator} from "@/api/connections/validations/database/joinTables.vd";
import {joinTablesTransformer} from "@/api/connections/transformers/database/jointTables.tf";
import {resultSimpleDatabaseLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleDatabaseLayerSearch.sd";
import {UpdateLayerConfigSd} from "@/api/layer/SD.Models/updateLayerConfig.sd";
import {getLayerStylesValidator} from "@/api/layer/validations/getLayerStyles.vd";
import {getLayerStylesTransformer} from "@/api/layer/transformers/getLayerStyles.tf";
import {DeleteLayerSd} from "@/api/layer/SD.Models/deleteLayer.sd";


interface route {


    uploadLayer: <T1>(data: LayerInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getLayerFields: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getLayerDatabaseInfo: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteLayerMetaData: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addLayerMetaData: <T1>(data: LayerFields, toast?: any) => Promise<MyApiResponse<T1>>;
    editLayerMetaData: <T1>(data: LayerFields, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    saveLayerMetaDataChoices: <T1>(data: LayerMetaDataChoicesSd, toast?: any) => Promise<MyApiResponse<T1>>;
    saveAddLayerByFile: <T1>(data: SaveAddLayerByFileSd, toast?: any) => Promise<MyApiResponse<T1>>;
    editAddLayerByFile: <T1>(data: SaveAddLayerByFileSd, toast?: any) => Promise<MyApiResponse<T1>>;
    addEmptyLayer: <T1>(data: EmptyLayerInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    ownLayersList: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getSimpleLayerSearchConditions: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    resultSimpleLayerSearch: <T1>(data: resultSimpleLayerSearchSd, toast?: any) => Promise<MyApiResponse<T1>>;
    resultSimpleDatabaseLayerSearch: <T1>(data: resultSimpleDatabaseLayerSearchSd, toast?: any) => Promise<MyApiResponse<T1>>;
    addLayerBySearchInLayer: <T1>(data: SearchInLayerInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    addLayerBySearchInDatabaseLayer: <T1>(data: SearchInDatabaseLayerInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    addServiceLayer: <T1>(data: ServiceLayerInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    updateServiceLayer: <T1>(data: ServiceLayerInterface,id:number, toast?: any) => Promise<MyApiResponse<T1>>;
    updateLayerConfig: <T1>(data: UpdateLayerConfigSd, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getLayerStyles: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteLayer: <T1>(data: DeleteLayerSd, id: number, toast?: any) => Promise<MyApiResponse<T1>>;


}

export default {


    uploadLayer: async function <T1>(data: LayerInterface, toast?: any) {
        const url = 'layer/upload';
        type T2 = z.infer<typeof uploadLayerValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LayerInterface>(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast, true)
        console.log(result, 'uploadLayer response')
        return result
    },

    getLayerFields: async function <T1>(id: number, toast?: any) {
        const url = 'layer/get_fields';
        type T2 = z.infer<typeof getLayerFieldsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getLayerFieldsValidator, getLayerFieldsTransformer, undefined, id, toast)
        console.log(result, 'getLayerFields response')
        return result
    },

    getLayerDatabaseInfo: async function <T1>(id: number, toast?: any) {
        const url = 'layer/get_layer_database_info';
        type T2 = z.infer<typeof layerDatabaseInfoValidation>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', layerDatabaseInfoValidation, layerDatabaseInfoTransformer, undefined, id, toast)
        console.log(result, 'getLayerDatabaseInfo response')
        return result
    },

    deleteLayerMetaData: async function <T1>(id: number, toast?: any) {
        const url = 'layer/metaData/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteLayerMetaData response')
        return result
    },

    addLayerMetaData: async function <T1>(data: LayerFields, toast?: any) {
        const url = 'layer/metaData/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, LayerFields>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'addLayerMetaData response')
        return result
    },

    editLayerMetaData: async function <T1>(data: LayerFields, id: number, toast?: any) {
        const url = 'layer/metaData/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, LayerFields>(url, 'put', undefined, undefined, data, id, toast)
        console.log(result, 'editLayerMetaData response')
        return result
    },

    saveLayerMetaDataChoices: async function <T1>(data: LayerMetaDataChoicesSd, toast?: any) {
        const url = 'layer/metaData/choice';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, LayerMetaDataChoicesSd>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'saveLayerMetaDataChoices response')
        return result
    },

    saveAddLayerByFile: async function <T1>(data: SaveAddLayerByFileSd, toast?: any) {
        const url = 'layer/addLayerByFile';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, SaveAddLayerByFileSd>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'saveAddLayerByFile response')
        return result
    },

    editAddLayerByFile: async function <T1>(data: SaveAddLayerByFileSd, toast?: any) {
        const url = 'layer/editLayerByFile';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, SaveAddLayerByFileSd>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'editAddLayerByFile response')
        return result
    },

    addEmptyLayer: async function <T1>(data: EmptyLayerInterface, toast?: any) {
        const url = 'layer/makeEmptyLayer';
        type T2 = z.infer<typeof uploadLayerValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, EmptyLayerInterface>(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast)
        console.log(result, 'addEmptyLayer response')
        return result
    },

    ownLayersList: async function <T1>(toast?: any) {
        const url = 'layer/own_layers_list';
        type T2 = z.infer<typeof ownLayersListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', ownLayersListValidator, ownLayersListTransformer, undefined, undefined, toast)
        console.log(result, 'ownLayersList response')
        return result
    },

    getSimpleLayerSearchConditions: async function <T1>(toast?: any) {
        const url = 'layer/get_simple_condition';
        type T2 = z.infer<typeof getSimpleLayerSearchConditionsVd>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getSimpleLayerSearchConditionsVd, getSimpleLayerSearchConditionsTransformer, undefined, undefined, toast)
        console.log(result, 'getSimpleLayerSearchConditions response')
        return result
    },

    resultSimpleLayerSearch: async function <T1>(data: resultSimpleLayerSearchSd, toast?: any) {
        const url = 'layer/get_result_simple_condition';
        type T2 = z.infer<typeof joinTablesValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, resultSimpleLayerSearchSd>(url, 'post', joinTablesValidator, joinTablesTransformer, data, undefined, toast)
        console.log(result, 'resultSimpleLayerSearch response')
        return result
    },

    resultSimpleDatabaseLayerSearch: async function <T1>(data: resultSimpleDatabaseLayerSearchSd, toast?: any) {
        const url = 'layer/get_result_simple_condition_in_database';
        type T2 = z.infer<typeof joinTablesValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, resultSimpleDatabaseLayerSearchSd>(url, 'post', joinTablesValidator, joinTablesTransformer, data, undefined, toast)
        console.log(result, 'resultSimpleDatabaseLayerSearch response')
        return result
    },

    addLayerBySearchInLayer: async function <T1>(data: SearchInLayerInterface, toast?: any) {
        const url = 'layer/add_layer_by_search_in_layer';
        type T2 = z.infer<typeof uploadLayerValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, SearchInLayerInterface>(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast)
        console.log(result, 'addLayerBySearchInLayer response')
        return result
    },

    addLayerBySearchInDatabaseLayer: async function <T1>(data: SearchInDatabaseLayerInterface, toast?: any) {
        const url = 'layer/add_layer_by_search_in_database_layer';
        type T2 = z.infer<typeof uploadLayerValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, SearchInDatabaseLayerInterface>(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast)
        console.log(result, 'addLayerBySearchInDatabaseLayer response')
        return result
    },

    addServiceLayer: async function <T1>(data: ServiceLayerInterface, toast?: any) {
        const url = 'layer/service/add';
        type T2 = z.infer<typeof uploadLayerValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, ServiceLayerInterface>(url, 'post', uploadLayerValidator, uploadLayerTransformer, data, undefined, toast)
        console.log(result, 'addServiceLayer response')
        return result
    },

    updateServiceLayer: async function <T1>(data: ServiceLayerInterface,id:number, toast?: any) {
        const url = 'layer/service/update';
        type T2 = z.infer<typeof uploadLayerValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, ServiceLayerInterface>(url, 'put', uploadLayerValidator, uploadLayerTransformer, data, id, toast)
        console.log(result, 'updateServiceLayer response')
        return result
    },

    updateLayerConfig: async function <T1>(data: UpdateLayerConfigSd, id: number, toast?: any) {
        const url = 'layer/update';
        type T2 = z.infer<typeof uploadLayerValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, UpdateLayerConfigSd>(url, 'put', uploadLayerValidator, uploadLayerTransformer, data, id, toast)
        console.log(result, 'updateLayerConfig response')
        return result
    },

    getLayerStyles: async function <T1>(id: number, toast?: any) {
        const url = 'layer/style';
        type T2 = z.infer<typeof getLayerStylesValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getLayerStylesValidator, getLayerStylesTransformer, undefined, id, toast)
        console.log(result, 'getLayerStyles response')
        return result
    },

    deleteLayer: async function <T1>(data: DeleteLayerSd, id: number, toast?: any) {
        const url = 'layer/delete';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, DeleteLayerSd>(url, 'delete', undefined, undefined, data, id, toast)
        console.log(result, 'deleteLayer response')
        return result
    },

} as route