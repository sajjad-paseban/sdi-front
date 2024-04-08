import {MyApiResponse, sendRequest} from "@/api/config";
import {z} from "zod";

import {AddBaseMapSd} from "@/api/baseMap/SD.Models/addBaseMap.sd";
import {addBaseMapValidator} from "@/api/baseMap/validations/addBaseMap.vd";
import {addBaseMapTransformer} from "@/api/baseMap/transformers/addBaseMap.tf";
import {getBaseMapsValidator} from "@/api/baseMap/validations/getBaseMaps.vd";
import {getBaseMapsTransformer} from "@/api/baseMap/transformers/getBaseMaps.tf";
import {DeleteBaseMapSd} from "@/api/baseMap/SD.Models/deleteBaseMap.sd";
import {deleteBaseMapValidator} from "@/api/baseMap/validations/deleteBaseMap.vd";
import {deleteBaseMapTransformer} from "@/api/baseMap/transformers/deleteBaseMap.tf";

import {EditBaseMapSdModel} from "@/api/baseMap/SD.Models/editBaseMap.sd";
import {getEditBaseMapValidator} from "@/api/baseMap/validations/editBaseMap.vd";
import {getEditBaseMapTransformer} from "@/api/baseMap/transformers/editBaseMap.tf";



interface route {


    addBaseMap: <T1>(data:AddBaseMapSd, toast: any) => Promise<MyApiResponse<T1>>;
    editBaseMap: <T1>(data:AddBaseMapSd, toast: any) => Promise<MyApiResponse<T1>>;
    getBaseMaps: <T1>( toast: any) => Promise<MyApiResponse<T1>>;
    deleteBaseMaps: <T1>(data:DeleteBaseMapSd,toast: any) => Promise<MyApiResponse<T1>>;
    getEditBaseMap: <T1>(data:EditBaseMapSdModel, toast: any) => Promise<MyApiResponse<T1>>;
}

export default {



    addBaseMap:async function <T1>(data:AddBaseMapSd, toast?: any) {
        return;
        const url = 'baseMap/baseMap';
        type T2 = z.infer<typeof addBaseMapValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post',addBaseMapValidator , addBaseMapTransformer, data, toast)
        console.log(result, 'addBaseMap response')
        return result

    },

    getBaseMaps:async function <T1>( toast?: any) {
        return;
        const url = 'baseMap/baseMap';
        type T2 = z.infer<typeof getBaseMapsValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get',getBaseMapsValidator , getBaseMapsTransformer, undefined, toast)
        console.log(result, 'getBaseMaps response')
        return result

    },

    deleteBaseMaps:async function <T1>(data:DeleteBaseMapSd,toast?: any) {
        const url = 'baseMap/deleteBaseMap';
        type T2 = z.infer<typeof deleteBaseMapValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', deleteBaseMapValidator, deleteBaseMapTransformer, data, toast)
        console.log(result, 'deleteBaseMaps response')
        return result

    },

    getEditBaseMap:async function <T1>(data:EditBaseMapSdModel,toast?: any) {
        const url = 'baseMap/editBaseMap';
        type T2 = z.infer<typeof getEditBaseMapValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getEditBaseMapValidator, getEditBaseMapTransformer, data, toast)
        console.log(result, 'getEditBaseMap response')
        return result

    },

    editBaseMap:async function <T1>(data:AddBaseMapSd, toast?: any) {
        const url = 'baseMap/editBaseMap';
        type T2 = z.infer<typeof addBaseMapValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post',addBaseMapValidator , addBaseMapTransformer, data, toast)
        console.log(result, 'editBaseMap response')
        return result

    },


} as route

