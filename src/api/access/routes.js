import { newSendRequest, sendRequest } from "../config";
import { getAccessValidator } from "@/api/access/validations/getAccesses.vd";
import { getAccessTransformer } from "@/api/access/transformers/getAccess.tf";
import { getAllRoutesValidator } from "@/api/access/validations/getAllRoutes.vd";
import { getAllRoutesTransformer } from "@/api/access/transformers/getAllRoutes.tf";
import { getAccessWithParentNameValidator } from "@/api/access/validations/getAccessWithParentName.vd";
import { getAccessWithParentNameTransformer } from "@/api/access/transformers/getAccessWithParentName.tf";
import { getAccessTreeValidator } from "@/api/access/validations/getAccessTree.vd";
import { getAccessTreeTransformer } from "@/api/access/transformers/getAccessTree.tf";
import { deleteAccessValidator } from "@/api/access/validations/deleteAccess.vd";
import { deleteAccessTransformer } from "@/api/access/transformers/deleteAccess.tf";
import { editAccessValidator, getEditAccessValidator } from "@/api/access/validations/editAccess.vd";
import { editAccessTransformer, getEditAccessTransformer } from "@/api/access/transformers/editAccess.tf";
import { getRoleAccessByNameValidator } from "@/api/access/validations/getRoleAccessByName.vd";
import { getRoleAccessByNameTransformer } from "@/api/access/transformers/getRoleAccessByName.tf";
import { accessLayerTreeArrayValidator } from "@/api/access/validations/accessLayerTree.vd";
import { accessLayerTreeTransformer } from "@/api/access/transformers/accessLayerTree.tf";
import { ownLayersListValidator } from "@/api/layer/validations/ownLayersList.vd";
import { ownLayersListTransformer } from "@/api/layer/transformers/ownLayersList.tf";
export default {
    getAccessTree: async function (toast) {
        const url = 'access/getAllAccessTree';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getAccessTreeValidator, getAccessTreeTransformer, undefined, toast);
        console.log(result, 'getAccessTree response');
        return result;
    },
    getAccessWithParentName: async function (toast) {
        const url = 'access/getAccessWithParentName';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getAccessWithParentNameValidator, getAccessWithParentNameTransformer, undefined, toast);
        console.log(result, 'getAccessWithParentName response');
        return result;
    },
    getAccesses: async function (toast) {
        const url = 'access/access';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getAccessValidator, getAccessTransformer, undefined, toast);
        console.log(result, 'getAccesses response');
        return result;
    },
    addAccess: async function (data, toast) {
        const url = 'access/access';
        const result = await sendRequest(url, 'post', getAccessValidator, getAccessTransformer, data, toast);
        console.log(result, 'addAccess response');
        return result;
    },
    editAccess: async function (data, toast) {
        const url = 'access/editAccess';
        const result = await sendRequest(url, 'post', editAccessValidator, editAccessTransformer, data, toast);
        console.log(result, 'editAccess response');
        return result;
    },
    getEditAccess: async function (data, toast) {
        const url = 'access/editAccess';
        const result = await sendRequest(url, 'get', getEditAccessValidator, getEditAccessTransformer, data, toast);
        console.log(result, 'getEditAccess response');
        return result;
    },
    deleteAccess: async function (data, toast) {
        const url = 'access/deleteAccess';
        const result = await sendRequest(url, 'post', deleteAccessValidator, deleteAccessTransformer, data, toast);
        console.log(result, 'deleteAccess response');
        return result;
    },
    getAllRoutes: async function (toast) {
        const url = 'access/getAllRoutes';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getAllRoutesValidator, getAllRoutesTransformer, undefined, toast);
        console.log(result, 'getAllRoutes response');
        return result;
    },
    getRoleAccessByName: async function (data, toast) {
        const url = 'access/getRoleAccessByName';
        const result = await sendRequest(url, 'get', getRoleAccessByNameValidator, getRoleAccessByNameTransformer, data, toast);
        console.log(result, 'getRoleAccessByName response');
        return result;
    },
    getLayerTreeAccess: async function (id, toast) {
        const url = 'access/getLayerTreeAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', accessLayerTreeArrayValidator, accessLayerTreeTransformer, undefined, id, toast);
        console.log(result, 'getLayerTreeAccess response');
        return result;
    },
    saveRoleLayerAccess: async function (data, id, toast) {
        const url = 'access/saveRoleLayerAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'saveRoleLayerAccess response');
        return result;
    },
    CreateInitAccess: async function (data, toast) {
        const url = 'access/CreateInitAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'CreateInitAccess response');
        return result;
    },
    getRoleLayerAccessShow: async function (toast) {
        const url = 'access/getRoleLayerAccessShow';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', ownLayersListValidator, ownLayersListTransformer, undefined, undefined, toast);
        console.log(result, 'getRoleLayerAccessShow response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map