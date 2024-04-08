import {MyApiResponse, newSendRequest, sendRequest} from "@/api/config";
import {z} from "zod";
import {addMapConfigValidator} from "@/api/mapConfig/validations/addMapConfig.vd";
import {addMapConfigTransformer} from "@/api/mapConfig/transformers/addMapConfig.tf";
import {MapConfigInterface} from "@/models/MapConfig.interface";
import {getMapConfigsValidator} from "@/api/mapConfig/validations/getMapConfigs.vd";
import {getMapConfigsTransformer} from "@/api/mapConfig/transformers/getMapConfigs.tf";
import {getMapConfigsSDModel} from "@/api/mapConfig/SD.Models/getMapConfigs.sd";
import {getMapConfigByIdValidator} from "@/api/mapConfig/validations/getMapConfigById.vd";
import {getMapConfigByIdTransformer} from "@/api/mapConfig/transformers/getMapConfigById.tf";


interface route {


    addMapConfig: <T1>(data: MapConfigInterface, toast: any) => Promise<MyApiResponse<T1>>;
    getMapConfigs: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getMapConfigById: <T1>(data: getMapConfigsSDModel, toast: any) => Promise<MyApiResponse<T1>>;
    getRoleMapConfig: <T1>(toast: any) => Promise<MyApiResponse<T1>>;

}

export default {


    addMapConfig: async function <T1>(data: MapConfigInterface, toast?: any) {
        const url = 'mapConfig/mapConfig';
        type T2 = z.infer<typeof addMapConfigValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', addMapConfigValidator, addMapConfigTransformer, data, toast)
        console.log(result, 'addMapConfig response')
        return result
    },

    getMapConfigs: async function <T1>(toast?: any) {
        const url = 'mapConfig/mapConfig';
        type T2 = z.infer<typeof getMapConfigsValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getMapConfigsValidator, getMapConfigsTransformer, undefined, toast)
        console.log(result, 'getMapConfigs response')
        return result
    },

    getMapConfigById: async function <T1>(data: getMapConfigsSDModel, toast?: any) {
        const url = 'mapConfig/mapConfig';
        type T2 = z.infer<typeof getMapConfigByIdValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getMapConfigByIdValidator, getMapConfigByIdTransformer, data, toast)
        console.log(result, 'getMapConfigs response')
        return result
    },

    getRoleMapConfig: async function <T1>(toast?: any) {
        const url = 'mapConfig/getRoleMapConfig';
        type T2 = z.infer<typeof getMapConfigByIdValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getMapConfigByIdValidator, getMapConfigByIdTransformer, undefined, undefined, toast)
        console.log(result, 'getRoleMapConfig response')
        return result
    },


} as route

