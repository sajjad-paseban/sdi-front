import { newSendRequest, sendRequest } from "@/api/config";
import { addDatabaseTransformer } from "@/api/connections/transformers/database/addDataBase.tf";
import { addDatabaseValidator } from "@/api/connections/validations/database/addDataBase.vd";
import { getDataBaseTypesTransformer } from "@/api/connections/transformers/database/getDataBaseTypes.tf";
import { getDataBaseTypesValidator } from "@/api/connections/validations/database/getDataBaseTypes.vd";
import { getDataBasesValidator } from "@/api/connections/validations/database/getDataBases.vd";
import { getDataBasesTransformer } from "@/api/connections/transformers/database/getDataBases.tf";
import { getDataBaseByIdTransformer } from "@/api/connections/transformers/database/getDataBaseById.tf";
import { getDataBaseByIdValidator } from "@/api/connections/validations/database/getDataBaseById.vd";
import { deleteDataBaseByIdTransformer } from "@/api/connections/transformers/database/deleteDataBaseById.tf";
import { deleteDataBaseByIdValidator } from "@/api/connections/validations/database/deleteDataBaseById.vd";
import { checkDataBaseTransformer } from "@/api/connections/transformers/database/checkDataBase.tf";
import { checkDataBaseValidator } from "@/api/connections/validations/database/checkDataBase.vd";
import { addServiceValidator } from "@/api/connections/validations/service/addService.vd";
import { addServiceTransformer } from "@/api/connections/transformers/service/addService.tf";
import { checkServiceValidator } from "@/api/connections/validations/service/checkService.vd";
import { checkServiceTransformer } from "@/api/connections/transformers/service/checkService.tf";
import { getServiceTypesValidator } from "@/api/connections/validations/service/getServiceTypes.vd";
import { getServiceTypesTransformer } from "@/api/connections/transformers/service/getServiceTypes.tf";
import { getServicesValidator } from "@/api/connections/validations/service/getServices.vd";
import { getServicesTransformer } from "@/api/connections/transformers/service/getServices.tf";
import { getServiceByIdValidator } from "@/api/connections/validations/service/getServiceById.vd";
import { getServiceByIdTransformer } from "@/api/connections/transformers/service/getServiceById.tf";
import { deleteServiceByIdValidator } from "@/api/connections/validations/service/deleteServiceById.vd";
import { deleteServiceByIdTransformer } from "@/api/connections/transformers/service/deleteServiceById.tf";
import { getServiceVersionValidator } from "@/api/connections/validations/service/getServiceVersion.vd";
import { getServiceVersionTransformer } from "@/api/connections/transformers/service/getServiceVersion.tf";
import { addExternalApiValidator } from "@/api/connections/validations/externalApi/addExternalApi.vd";
import { addExternalApiTransformer } from "@/api/connections/transformers/ExternalApi/addExternalApi.tf";
import { getExternalApiMethodsValidator } from "@/api/connections/validations/externalApi/getExternalApiMethods.vd";
import { getExternalApiMethodsTransformer } from "@/api/connections/transformers/ExternalApi/getExternalApiMethods.tf";
import { getExternalApisValidator } from "@/api/connections/validations/externalApi/getExternalApis.vd";
import { getExternalApisTransformer } from "@/api/connections/transformers/ExternalApi/getExternalApis.tf";
import { getExternalApiByIdValidator } from "@/api/connections/validations/externalApi/getExternalApiById.vd";
import { getExternalApiByIdTransformer } from "@/api/connections/transformers/ExternalApi/getExternalApiById.tf";
import { deleteExternalApiByIdValidator } from "@/api/connections/validations/externalApi/deleteExternalApiById.vd";
import { deleteExternalApiByIdTransformer } from "@/api/connections/transformers/ExternalApi/deleteExternalApiById.tf";
import { getDataBaseTablesTransformer } from "@/api/connections/transformers/database/getDataBaseTables.tf";
import { getDataBaseTablesValidator } from "@/api/connections/validations/database/getDataBaseTables.vd";
import { getTableFieldsTransformer } from "@/api/connections/transformers/database/getTableFields.tf";
import { getTableFieldsValidator } from "@/api/connections/validations/database/getTableFields.vd";
import { joinTablesTransformer } from "@/api/connections/transformers/database/jointTables.tf";
import { joinTablesValidator } from "@/api/connections/validations/database/joinTables.vd";
export default {
    addDatabase: async function (data, toast) {
        const url = 'connections/database';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', addDatabaseValidator, addDatabaseTransformer, data, toast);
        console.log(result, 'addDatabase response');
        return result;
    },
    checkDatabase: async function (data, toast) {
        const url = 'connections/checkDatabase';
        const result = await sendRequest(url, 'post', checkDataBaseValidator, checkDataBaseTransformer, data, toast);
        console.log(result, 'checkDatabase response');
        return result;
    },
    getDataBaseTypes: async function (toast) {
        const url = 'connections/getDatabaseTypes';
        const result = await sendRequest(url, 'get', getDataBaseTypesValidator, getDataBaseTypesTransformer, undefined, toast);
        console.log(result, 'getDataBaseTypes response');
        return result;
    },
    getDataBases: async function (toast) {
        const url = 'connections/database';
        const result = await sendRequest(url, 'get', getDataBasesValidator, getDataBasesTransformer, undefined, toast);
        console.log(result, 'getDataBases response');
        return result;
    },
    getDataBaseById: async function (data, toast) {
        const url = 'connections/database';
        const result = await sendRequest(url, 'get', getDataBaseByIdValidator, getDataBaseByIdTransformer, data, toast);
        console.log(result, 'getDataBaseById response');
        return result;
    },
    deleteDataBaseById: async function (data, toast) {
        const url = 'connections/deleteDataBase';
        const result = await sendRequest(url, 'post', deleteDataBaseByIdValidator, deleteDataBaseByIdTransformer, data, toast);
        console.log(result, 'deleteDataBaseById response');
        return result;
    },
    getDataBaseTables: async function (id, toast) {
        const url = 'layer/additional/get_tables';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getDataBaseTablesValidator, getDataBaseTablesTransformer, undefined, id, toast);
        console.log(result, 'getDataBaseTables response');
        return result;
    },
    getTableFields: async function (id, data, toast) {
        const url = 'layer/additional/get_fields';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getTableFieldsValidator, getTableFieldsTransformer, data, id, toast);
        console.log(result, 'getTableFields response');
        return result;
    },
    sampleJoinTables: async function (data, toast) {
        const url = 'connections/sampleJoinTables';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', joinTablesValidator, joinTablesTransformer, data, undefined, toast);
        console.log(result, 'addBaseModelStyle response');
        return result;
    },
    saveJoinTables: async function (data, toast) {
        const url = 'connections/saveJoinTables';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'saveJoinTables response');
        return result;
    },
    // ---------------------------------------------------
    addService: async function (data, toast) {
        const url = 'connections/service';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', addServiceValidator, addServiceTransformer, data, toast);
        console.log(result, 'addService response');
        return result;
    },
    checkService: async function (data, toast) {
        const url = 'connections/checkService';
        const result = await sendRequest(url, 'post', checkServiceValidator, checkServiceTransformer, data, toast);
        console.log(result, 'checkService response');
        return result;
    },
    getServiceTypes: async function (toast) {
        const url = 'connections/getServiceTypes';
        const result = await sendRequest(url, 'get', getServiceTypesValidator, getServiceTypesTransformer, undefined, toast);
        console.log(result, 'getServiceTypes response');
        return result;
    },
    getServiceVersion: async function (toast) {
        const url = 'connections/getServiceVersion';
        const result = await sendRequest(url, 'get', getServiceVersionValidator, getServiceVersionTransformer, undefined, toast);
        console.log(result, 'getServiceVersion response');
        return result;
    },
    getServices: async function (toast) {
        const url = 'connections/service';
        const result = await sendRequest(url, 'get', getServicesValidator, getServicesTransformer, undefined, toast);
        console.log(result, 'getServices response');
        return result;
    },
    getServiceById: async function (data, toast) {
        const url = 'connections/service';
        const result = await sendRequest(url, 'get', getServiceByIdValidator, getServiceByIdTransformer, data, toast);
        console.log(result, 'getServiceById response');
        return result;
    },
    deleteServiceById: async function (data, toast) {
        const url = 'connections/deleteService';
        const result = await sendRequest(url, 'post', deleteServiceByIdValidator, deleteServiceByIdTransformer, data, toast);
        console.log(result, 'deleteServiceById response');
        return result;
    },
    // ---------------------------------------------------
    addExternalApi: async function (data, toast) {
        const url = 'connections/externalApi';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', addExternalApiValidator, addExternalApiTransformer, data, toast);
        console.log(result, 'addExternalApi response');
        return result;
    },
    getExternalApiMethods: async function (toast) {
        const url = 'connections/getExternalApiMethods';
        const result = await sendRequest(url, 'get', getExternalApiMethodsValidator, getExternalApiMethodsTransformer, undefined, toast);
        console.log(result, 'getExternalApiMethods response');
        return result;
    },
    getExternalApis: async function (toast) {
        const url = 'connections/externalApi';
        const result = await sendRequest(url, 'get', getExternalApisValidator, getExternalApisTransformer, undefined, toast);
        console.log(result, 'getExternalApis response');
        return result;
    },
    getExternalApiById: async function (data, toast) {
        const url = 'connections/externalApi';
        const result = await sendRequest(url, 'get', getExternalApiByIdValidator, getExternalApiByIdTransformer, data, toast);
        console.log(result, 'getExternalApiById response');
        return result;
    },
    getExternalApiByName: async function (data, toast) {
        const url = 'connections/getExternalApiByName';
        const result = await sendRequest(url, 'get', getExternalApiByIdValidator, getExternalApiByIdTransformer, data, toast);
        console.log(result, 'getExternalApiByName response');
        return result;
    },
    deleteExternalApiById: async function (data, toast) {
        const url = 'connections/deleteExternalApi';
        const result = await sendRequest(url, 'post', deleteExternalApiByIdValidator, deleteExternalApiByIdTransformer, data, toast);
        console.log(result, 'deleteExternalApiById response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map