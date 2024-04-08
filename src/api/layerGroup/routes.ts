import {z} from "zod";
import {MyApiResponse, newSendRequest} from "../config";
import {LayerGroupInterface} from "@/models/LayerGroup.interface";
import {addLayerGroupValidator} from "@/api/layerGroup/validations/add.vd";
import {saveTransformer} from "@/api/layerGroup/transformers/save.tf";
import {listLayerGroupValidator} from "@/api/layerGroup/validations/list.vd";
import {listTransformer} from "@/api/layerGroup/transformers/list.tf";
import {getBaseStyleItemValidator} from "@/api/styles/validations/getItemBaseStyle.vd";
import {getItemBaseStyleTransformer} from "@/api/styles/transformers/getItemBaseStyle.tf";
import {getItemValidator} from "@/api/layerGroup/validations/getItem.vd";
import {getItemTransformer} from "@/api/layerGroup/transformers/getItem.tf";
import {BaseStyleInterface} from "@/models/Style.interface";
import {saveStyleValidator} from "@/api/styles/validations/saveStyle.vd";
import {saveStyleTransformer} from "@/api/styles/transformers/saveStyle.tf";


interface route {


    addLayerGroup: <T1>(data: LayerGroupInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    listLayerGroup: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    deleteLayerGroup: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getItemLayerGroup: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editLayerGroup: <T1>(data: LayerGroupInterface,id: number, toast?: any) => Promise<MyApiResponse<T1>>;


}

export default {


    addLayerGroup: async function <T1>(data: LayerGroupInterface, toast?: any) {
        const url = 'layerGroup/add';
        type T2 = z.infer<typeof addLayerGroupValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LayerGroupInterface>(url, 'post', addLayerGroupValidator, saveTransformer, data, undefined, toast)
        console.log(result, 'addLayerGroup response')
        return result
    },

    listLayerGroup: async function <T1>(toast?: any) {
        const url = 'layerGroup/list';
        type T2 = z.infer<typeof listLayerGroupValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', listLayerGroupValidator, listTransformer, undefined, undefined, toast)
        console.log(result, 'listLayerGroup response')
        return result
    },

    deleteLayerGroup: async function <T1>(id: number, toast?: any) {
        const url = 'layerGroup/delete';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteLayerGroup response')
        return result
    },

    getItemLayerGroup: async function <T1>(id: number, toast?: any) {
        const url = 'layerGroup/item';
        type T2 = z.infer<typeof getItemValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getItemValidator, getItemTransformer, undefined, id, toast)
        console.log(result, 'getItemLayerGroup response')
        return result
    },

    editLayerGroup: async function <T1>(data: LayerGroupInterface,id: number, toast?: any) {
        const url = 'layerGroup/update';
        type T2 = z.infer<typeof addLayerGroupValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LayerGroupInterface>(url, 'put', addLayerGroupValidator, saveTransformer, data, id, toast)
        console.log(result, 'editLayerGroup response')
        return result
    },


} as route