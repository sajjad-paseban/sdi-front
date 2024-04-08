import {MyApiResponse, newSendRequest, sendRequest} from "../config";


import {z} from "zod";
import {getAccessValidator} from "@/api/access/validations/getAccesses.vd";
import {getAccessTransformer} from "@/api/access/transformers/getAccess.tf";
import {getAllRoutesValidator} from "@/api/access/validations/getAllRoutes.vd";
import {getAllRoutesTransformer} from "@/api/access/transformers/getAllRoutes.tf";

import {getAccessWithParentNameValidator} from "@/api/access/validations/getAccessWithParentName.vd";
import {getAccessWithParentNameTransformer} from "@/api/access/transformers/getAccessWithParentName.tf";
import {getAccessTreeValidator} from "@/api/access/validations/getAccessTree.vd";
import {getAccessTreeTransformer} from "@/api/access/transformers/getAccessTree.tf";
import {deleteAccessValidator} from "@/api/access/validations/deleteAccess.vd";
import {deleteAccessTransformer} from "@/api/access/transformers/deleteAccess.tf";
import {DeleteAccessSDModel} from "@/api/access/SD.Models/deleteAccess.sd";
import {EditAccessItemSDModel} from "@/api/access/SD.Models/editAccess.sd";
import {editAccessValidator, getEditAccessValidator} from "@/api/access/validations/editAccess.vd";
import {editAccessTransformer, getEditAccessTransformer} from "@/api/access/transformers/editAccess.tf";
import {AddAccessSDModel} from "@/api/access/SD.Models/addAccess.sd";
import {GetRoleAccessByName} from "@/api/access/SD.Models/getRoleAccessByName";
import {getRoleAccessByNameValidator} from "@/api/access/validations/getRoleAccessByName.vd";
import {getRoleAccessByNameTransformer} from "@/api/access/transformers/getRoleAccessByName.tf";
import {accessLayerTreeArrayValidator} from "@/api/access/validations/accessLayerTree.vd";
import {accessLayerTreeTransformer} from "@/api/access/transformers/accessLayerTree.tf";
import {AccessLayerTree} from "@/models/Access.interface";
import {ownLayersListValidator} from "@/api/layer/validations/ownLayersList.vd";
import {ownLayersListTransformer} from "@/api/layer/transformers/ownLayersList.tf";

interface route {
    getAccesses: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getAccessWithParentName: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getAccessTree: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    addAccess: <T1>(data:AddAccessSDModel, toast: any) => Promise<MyApiResponse<T1>>;
    editAccess: <T1>(data:AddAccessSDModel,toast: any) => Promise<MyApiResponse<T1>>;
    getEditAccess: <T1>(data:EditAccessItemSDModel,toast: any) => Promise<MyApiResponse<T1>>;
    deleteAccess: <T1>(data:DeleteAccessSDModel,toast: any) => Promise<MyApiResponse<T1>>;
    getAllRoutes: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getRoleAccessByName: <T1>(data:GetRoleAccessByName, toast: any) => Promise<MyApiResponse<T1>>;
    getLayerTreeAccess: <T1>(id:number, toast: any) => Promise<MyApiResponse<T1>>;
    saveRoleLayerAccess: <T1>(data:AccessLayerTree[],id:number, toast: any) => Promise<MyApiResponse<T1>>;
    CreateInitAccess: <T1>(data:any, toast: any) => Promise<MyApiResponse<T1>>;
    getRoleLayerAccessShow: <T1>(toast: any) => Promise<MyApiResponse<T1>>;



}

export default {



    getAccessTree: async function <T1>(toast?: any) {
        const url = 'access/getAllAccessTree';
        type T2 = z.infer<typeof getAccessTreeValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getAccessTreeValidator, getAccessTreeTransformer, undefined, toast)
        console.log(result, 'getAccessTree response')
        return result

    },

    getAccessWithParentName: async function <T1>(toast?: any) {
        const url = 'access/getAccessWithParentName';
        type T2 = z.infer<typeof getAccessWithParentNameValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getAccessWithParentNameValidator, getAccessWithParentNameTransformer, undefined, toast)
        console.log(result, 'getAccessWithParentName response')
        return result

    },

    getAccesses: async function <T1>(toast?: any) {
        const url = 'access/access';
        type T2 = z.infer<typeof getAccessValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getAccessValidator, getAccessTransformer, undefined, toast)
        console.log(result, 'getAccesses response')
        return result

    },

    addAccess:async function <T1>(data:AddAccessSDModel, toast?: any) {
        const url = 'access/access';
        type T2 = z.infer<typeof getAccessValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', getAccessValidator, getAccessTransformer, data, toast)
        console.log(result, 'addAccess response')
        return result

    },

    editAccess:async function <T1>(data:AddAccessSDModel,toast?: any) {
        const url = 'access/editAccess';
        type T2 = z.infer<typeof editAccessValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', editAccessValidator, editAccessTransformer, data, toast)
        console.log(result, 'editAccess response')
        return result

    },

    getEditAccess:async function <T1>(data:EditAccessItemSDModel,toast?: any) {
        const url = 'access/editAccess';
        type T2 = z.infer<typeof getEditAccessValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getEditAccessValidator, getEditAccessTransformer, data, toast)
        console.log(result, 'getEditAccess response')
        return result

    },

    deleteAccess:async function <T1>(data:DeleteAccessSDModel,toast?: any) {
        const url = 'access/deleteAccess';
        type T2 = z.infer<typeof deleteAccessValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', deleteAccessValidator, deleteAccessTransformer, data, toast)
        console.log(result, 'deleteAccess response')
        return result

    },

    getAllRoutes: async function <T1>(toast?: any) {
        const url = 'access/getAllRoutes'
        type T2 = z.infer<typeof getAllRoutesValidator>
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getAllRoutesValidator, getAllRoutesTransformer, undefined, toast)
        console.log(result, 'getAllRoutes response')
        return result
    },

    getRoleAccessByName:async function <T1>(data:GetRoleAccessByName, toast?: any) {
        const url = 'access/getRoleAccessByName';
        type T2 = z.infer<typeof getRoleAccessByNameValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getRoleAccessByNameValidator, getRoleAccessByNameTransformer, data, toast)
        console.log(result, 'getRoleAccessByName response')
        return result

    },


    getLayerTreeAccess: async function <T1>(id: number, toast?: any) {
        const url = 'access/getLayerTreeAccess';
        type T2 = z.infer<typeof accessLayerTreeArrayValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', accessLayerTreeArrayValidator, accessLayerTreeTransformer, undefined, id, toast)
        console.log(result, 'getLayerTreeAccess response')
        return result
    },

    saveRoleLayerAccess: async function <T1>(data:AccessLayerTree[],id: number, toast?: any) {
        const url = 'access/saveRoleLayerAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, AccessLayerTree[]>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'saveRoleLayerAccess response')
        return result
    },

    CreateInitAccess: async function <T1>(data:any, toast?: any) {
        const url = 'access/CreateInitAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, any>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'CreateInitAccess response')
        return result
    },


    getRoleLayerAccessShow: async function <T1>(toast?: any) {
        const url = 'access/getRoleLayerAccessShow';
        type T2 = z.infer<typeof ownLayersListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', ownLayersListValidator, ownLayersListTransformer, undefined, undefined, toast)
        console.log(result, 'getRoleLayerAccessShow response')
        return result
    },

} as route

