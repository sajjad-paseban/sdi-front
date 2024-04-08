import {MyApiResponse, newSendRequest, sendRequest} from "@/api/config";
import {z} from "zod";

import {AnyObject, DataBaseInterface, ExternalApiInterface, ServiceInterface} from "@/models/Conncections.interface";
import {addDatabaseTransformer} from "@/api/connections/transformers/database/addDataBase.tf";
import {addDatabaseValidator} from "@/api/connections/validations/database/addDataBase.vd";
import {getDataBaseTypesTransformer} from "@/api/connections/transformers/database/getDataBaseTypes.tf";
import {getDataBaseTypesValidator} from "@/api/connections/validations/database/getDataBaseTypes.vd";
import {getDataBasesValidator} from "@/api/connections/validations/database/getDataBases.vd";
import {getDataBasesTransformer} from "@/api/connections/transformers/database/getDataBases.tf";
import {getDataBaseByIdTransformer} from "@/api/connections/transformers/database/getDataBaseById.tf";
import {getDataBaseByIdValidator} from "@/api/connections/validations/database/getDataBaseById.vd";
import {GetDatabaseByIdSd} from "@/api/connections/SD.Models/getDatabaseById.sd";
import {deleteDataBaseByIdTransformer} from "@/api/connections/transformers/database/deleteDataBaseById.tf";
import {deleteDataBaseByIdValidator} from "@/api/connections/validations/database/deleteDataBaseById.vd";
import {deleteDatabaseByIdSd} from "@/api/connections/SD.Models/deleteDatabaseById.sd";
import {checkDataBaseTransformer} from "@/api/connections/transformers/database/checkDataBase.tf";
import {checkDataBaseValidator} from "@/api/connections/validations/database/checkDataBase.vd";
import {GetServiceByIdSd} from "@/api/connections/SD.Models/getServiceById.sd";
import {deleteServiceByIdSd} from "@/api/connections/SD.Models/deleteServiceById.sd";
import {addServiceValidator} from "@/api/connections/validations/service/addService.vd";
import {addServiceTransformer} from "@/api/connections/transformers/service/addService.tf";
import {checkServiceValidator} from "@/api/connections/validations/service/checkService.vd";
import {checkServiceTransformer} from "@/api/connections/transformers/service/checkService.tf";
import {getServiceTypesValidator} from "@/api/connections/validations/service/getServiceTypes.vd";
import {getServiceTypesTransformer} from "@/api/connections/transformers/service/getServiceTypes.tf";
import {getServicesValidator} from "@/api/connections/validations/service/getServices.vd";
import {getServicesTransformer} from "@/api/connections/transformers/service/getServices.tf";
import {getServiceByIdValidator} from "@/api/connections/validations/service/getServiceById.vd";
import {getServiceByIdTransformer} from "@/api/connections/transformers/service/getServiceById.tf";
import {deleteServiceByIdValidator} from "@/api/connections/validations/service/deleteServiceById.vd";
import {deleteServiceByIdTransformer} from "@/api/connections/transformers/service/deleteServiceById.tf";
import {getServiceVersionValidator} from "@/api/connections/validations/service/getServiceVersion.vd";
import {getServiceVersionTransformer} from "@/api/connections/transformers/service/getServiceVersion.tf";
import {GetExternalApiByIdSd} from "@/api/connections/SD.Models/getExternalApiById.sd";
import {deleteExternalApiByIdSd} from "@/api/connections/SD.Models/deleteExternalApiById.sd";
import {addExternalApiValidator} from "@/api/connections/validations/externalApi/addExternalApi.vd";
import {addExternalApiTransformer} from "@/api/connections/transformers/ExternalApi/addExternalApi.tf";
import {getExternalApiMethodsValidator} from "@/api/connections/validations/externalApi/getExternalApiMethods.vd";
import {getExternalApiMethodsTransformer} from "@/api/connections/transformers/ExternalApi/getExternalApiMethods.tf";
import {getExternalApisValidator} from "@/api/connections/validations/externalApi/getExternalApis.vd";
import {getExternalApisTransformer} from "@/api/connections/transformers/ExternalApi/getExternalApis.tf";
import {getExternalApiByIdValidator} from "@/api/connections/validations/externalApi/getExternalApiById.vd";
import {getExternalApiByIdTransformer} from "@/api/connections/transformers/ExternalApi/getExternalApiById.tf";
import {deleteExternalApiByIdValidator} from "@/api/connections/validations/externalApi/deleteExternalApiById.vd";
import {deleteExternalApiByIdTransformer} from "@/api/connections/transformers/ExternalApi/deleteExternalApiById.tf";
import {getLayerFieldsValidator} from "@/api/layer/validations/getLayerFields.vd";
import {getLayerFieldsTransformer} from "@/api/layer/transformers/getLayerFields.tf";
import {getDataBaseTablesTransformer} from "@/api/connections/transformers/database/getDataBaseTables.tf";
import {getDataBaseTablesValidator} from "@/api/connections/validations/database/getDataBaseTables.vd";
import {getTableFieldsTransformer} from "@/api/connections/transformers/database/getTableFields.tf";
import {getTableFieldsValidator} from "@/api/connections/validations/database/getTableFields.vd";
import {GetTableFieldsSD} from "@/api/connections/SD.Models/getTableFields.sd";
import {BaseStyleInterface} from "@/models/Style.interface";
import {saveStyleValidator} from "@/api/styles/validations/saveStyle.vd";
import {saveStyleTransformer} from "@/api/styles/transformers/saveStyle.tf";
import {joinTablesTransformer} from "@/api/connections/transformers/database/jointTables.tf";
import {joinTablesValidator} from "@/api/connections/validations/database/joinTables.vd";
import {JoinTablesSD} from "@/api/connections/SD.Models/joinTables.sd";
import {GetExternalApiByNameSd} from "@/api/connections/SD.Models/getExternalApiByName.sd";


interface route {


    addDatabase: <T1>(data: DataBaseInterface, toast: any) => Promise<MyApiResponse<T1>>;
    checkDatabase: <T1>(data: DataBaseInterface, toast: any) => Promise<MyApiResponse<T1>>;
    getDataBaseTypes: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getDataBases: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getDataBaseById: <T1>(data: GetDatabaseByIdSd, toast: any) => Promise<MyApiResponse<T1>>;
    deleteDataBaseById: <T1>(data: deleteDatabaseByIdSd, toast: any) => Promise<MyApiResponse<T1>>;
    getDataBaseTables: <T1>(id: number, toast: any) => Promise<MyApiResponse<T1>>;
    getTableFields: <T1>(id: number,data:GetTableFieldsSD, toast: any) => Promise<MyApiResponse<T1>>;
    sampleJoinTables: <T1>(data:JoinTablesSD, toast: any) => Promise<MyApiResponse<T1>>;
    saveJoinTables: <T1>(data:JoinTablesSD, toast: any) => Promise<MyApiResponse<T1>>;

    // -----------------------------------
    addService: <T1>(data: ServiceInterface, toast: any) => Promise<MyApiResponse<T1>>;
    checkService: <T1>(data: ServiceInterface, toast: any) => Promise<MyApiResponse<T1>>;
    getServiceTypes: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getServiceVersion: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getServices: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getServiceById: <T1>(data: GetServiceByIdSd, toast: any) => Promise<MyApiResponse<T1>>;
    deleteServiceById: <T1>(data: deleteServiceByIdSd, toast: any) => Promise<MyApiResponse<T1>>;
    // -----------------------------------
    addExternalApi: <T1>(data: ExternalApiInterface, toast: any) => Promise<MyApiResponse<T1>>;
    checkExternalApi: <T1>(data: ExternalApiInterface, toast: any) => Promise<MyApiResponse<T1>>;
    getExternalApiMethods: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getExternalApis: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getExternalApiById: <T1>(data: GetExternalApiByIdSd, toast: any) => Promise<MyApiResponse<T1>>;
    getExternalApiByName: <T1>(data: GetExternalApiByNameSd, toast: any) => Promise<MyApiResponse<T1>>;
    deleteExternalApiById: <T1>(data: deleteExternalApiByIdSd, toast: any) => Promise<MyApiResponse<T1>>;

}

export default {

    addDatabase: async function <T1>(data: DataBaseInterface, toast?: any) {
        const url = 'connections/database';
        type T2 = z.infer<typeof addDatabaseValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', addDatabaseValidator, addDatabaseTransformer, data, toast)
        console.log(result, 'addDatabase response')
        return result
    },

    checkDatabase: async function <T1>(data: DataBaseInterface, toast?: any) {
        const url = 'connections/checkDatabase';
        type T2 = z.infer<typeof checkDataBaseValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', checkDataBaseValidator, checkDataBaseTransformer, data, toast)
        console.log(result, 'checkDatabase response')
        return result
    },

    getDataBaseTypes: async function <T1>(toast?: any) {
        const url = 'connections/getDatabaseTypes';
        type T2 = z.infer<typeof getDataBaseTypesValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getDataBaseTypesValidator, getDataBaseTypesTransformer, undefined, toast)
        console.log(result, 'getDataBaseTypes response')
        return result
    },

    getDataBases: async function <T1>(toast?: any) {
        const url = 'connections/database';
        type T2 = z.infer<typeof getDataBasesValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getDataBasesValidator, getDataBasesTransformer, undefined, toast)
        console.log(result, 'getDataBases response')
        return result
    },

    getDataBaseById: async function <T1>(data: GetDatabaseByIdSd, toast?: any) {
        const url = 'connections/database';
        type T2 = z.infer<typeof getDataBaseByIdValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getDataBaseByIdValidator, getDataBaseByIdTransformer, data, toast)
        console.log(result, 'getDataBaseById response')
        return result
    },

    deleteDataBaseById: async function <T1>(data: deleteDatabaseByIdSd, toast?: any) {
        const url = 'connections/deleteDataBase';
        type T2 = z.infer<typeof deleteDataBaseByIdValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', deleteDataBaseByIdValidator, deleteDataBaseByIdTransformer, data, toast)
        console.log(result, 'deleteDataBaseById response')
        return result
    },

    getDataBaseTables: async function <T1>(id: number, toast?: any) {
        const url = 'layer/additional/get_tables';
        type T2 = z.infer<typeof getDataBaseTablesValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getDataBaseTablesValidator, getDataBaseTablesTransformer, undefined, id, toast)
        console.log(result, 'getDataBaseTables response')
        return result},

    getTableFields: async function <T1>(id: number,data:GetTableFieldsSD, toast?: any) {
        const url = 'layer/additional/get_fields';
        type T2 = z.infer<typeof getTableFieldsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, GetTableFieldsSD>(url, 'get', getTableFieldsValidator, getTableFieldsTransformer, data, id, toast)
        console.log(result, 'getTableFields response')
        return result},

    sampleJoinTables: async function <T1>(data: JoinTablesSD, toast?: any) {
        const url = 'connections/sampleJoinTables';
        type T2 = z.infer<typeof joinTablesValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, JoinTablesSD>(url, 'post', joinTablesValidator, joinTablesTransformer, data, undefined, toast)
        console.log(result, 'addBaseModelStyle response')
        return result
    },

    saveJoinTables: async function <T1>(data: JoinTablesSD, toast?: any) {
        const url = 'connections/saveJoinTables';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, JoinTablesSD>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'saveJoinTables response')
        return result
    },


    // ---------------------------------------------------

    addService: async function <T1>(data: ServiceInterface, toast?: any) {
        const url = 'connections/service';
        type T2 = z.infer<typeof addServiceValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', addServiceValidator, addServiceTransformer, data, toast)
        console.log(result, 'addService response')
        return result
    },

    checkService: async function <T1>(data: ServiceInterface, toast?: any) {
        const url = 'connections/checkService';
        type T2 = z.infer<typeof checkServiceValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', checkServiceValidator, checkServiceTransformer, data, toast)
        console.log(result, 'checkService response')
        return result
    },

    getServiceTypes: async function <T1>(toast?: any) {
        const url = 'connections/getServiceTypes';
        type T2 = z.infer<typeof getServiceTypesValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getServiceTypesValidator, getServiceTypesTransformer, undefined, toast)
        console.log(result, 'getServiceTypes response')
        return result
    },

    getServiceVersion: async function <T1>(toast?: any) {
        const url = 'connections/getServiceVersion';
        type T2 = z.infer<typeof getServiceVersionValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getServiceVersionValidator, getServiceVersionTransformer, undefined, toast)
        console.log(result, 'getServiceVersion response')
        return result
    },

    getServices: async function <T1>(toast?: any) {
        const url = 'connections/service';
        type T2 = z.infer<typeof getServicesValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getServicesValidator, getServicesTransformer, undefined, toast)
        console.log(result, 'getServices response')
        return result
    },

    getServiceById: async function <T1>(data: GetServiceByIdSd, toast?: any) {
        const url = 'connections/service';
        type T2 = z.infer<typeof getServiceByIdValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getServiceByIdValidator, getServiceByIdTransformer, data, toast)
        console.log(result, 'getServiceById response')
        return result
    },

    deleteServiceById: async function <T1>(data: deleteServiceByIdSd, toast?: any) {
        const url = 'connections/deleteService';
        type T2 = z.infer<typeof deleteServiceByIdValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', deleteServiceByIdValidator, deleteServiceByIdTransformer, data, toast)
        console.log(result, 'deleteServiceById response')
        return result
    },

    // ---------------------------------------------------

    addExternalApi: async function <T1>(data: ExternalApiInterface, toast?: any) {
        const url = 'connections/externalApi';
        type T2 = z.infer<typeof addExternalApiValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', addExternalApiValidator, addExternalApiTransformer, data, toast)
        console.log(result, 'addExternalApi response')
        return result
    },

    getExternalApiMethods: async function <T1>(toast?: any) {
        const url = 'connections/getExternalApiMethods';
        type T2 = z.infer<typeof getExternalApiMethodsValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getExternalApiMethodsValidator, getExternalApiMethodsTransformer, undefined, toast)
        console.log(result, 'getExternalApiMethods response')
        return result
    },

    getExternalApis: async function <T1>(toast?: any) {
        const url = 'connections/externalApi';
        type T2 = z.infer<typeof getExternalApisValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getExternalApisValidator, getExternalApisTransformer, undefined, toast)
        console.log(result, 'getExternalApis response')
        return result
    },

    getExternalApiById: async function <T1>(data: GetExternalApiByIdSd, toast?: any) {
        const url = 'connections/externalApi';
        type T2 = z.infer<typeof getExternalApiByIdValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getExternalApiByIdValidator, getExternalApiByIdTransformer, data, toast)
        console.log(result, 'getExternalApiById response')
        return result
    },

    getExternalApiByName: async function <T1>(data: GetExternalApiByNameSd, toast?: any) {
        const url = 'connections/getExternalApiByName';
        type T2 = z.infer<typeof getExternalApiByIdValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getExternalApiByIdValidator, getExternalApiByIdTransformer, data, toast)
        console.log(result, 'getExternalApiByName response')
        return result
    },

    deleteExternalApiById: async function <T1>(data: deleteExternalApiByIdSd, toast?: any) {
        const url = 'connections/deleteExternalApi';
        type T2 = z.infer<typeof deleteExternalApiByIdValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', deleteExternalApiByIdValidator, deleteExternalApiByIdTransformer, data, toast)
        console.log(result, 'deleteExternalApiById response')
        return result
    },
} as route

