import {MyApiResponse, newSendRequest} from "@/api/config";
import {addFeatureInterface} from "@/api/feature/SD.Models/addFeature";
import {transitionFeatureInterface} from "@/api/feature/SD.Models/transitionFeature";


interface route {

    addFeature: <T1>(data: addFeatureInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editFeature: <T1>(data: addFeatureInterface, id: number[], toast?: any) => Promise<MyApiResponse<T1>>;
    deleteFeature: <T1>( id: number[], toast?: any) => Promise<MyApiResponse<T1>>;

    copyFeatures: <T1>(data: transitionFeatureInterface, layer_id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    moveFeatures: <T1>(data: transitionFeatureInterface, layer_id: number, toast?: any) => Promise<MyApiResponse<T1>>;

}

export default {


    addFeature: async function <T1>(data: addFeatureInterface, id: number, toast?: any) {
        const url = 'feature/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, addFeatureInterface>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'addFeature response')
        return result
    },

    editFeature: async function <T1>(data: addFeatureInterface, id: number[], toast?: any) {
        const url = 'feature/edit';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, addFeatureInterface>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'editFeature response')
        return result
    },

    deleteFeature: async function <T1>( id: number[], toast?: any) {
        const url = 'feature/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteFeature response')
        return result
    },

    copyFeatures: async function <T1>(data: transitionFeatureInterface, layer_id: number, toast?: any) {
        const url = 'feature/copy';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, transitionFeatureInterface>(url, 'post', undefined, undefined, data, layer_id, toast)
        console.log(result, 'copyFeatures response')
        return result
    },

    moveFeatures: async function <T1>(data: transitionFeatureInterface, layer_id: number, toast?: any) {
        const url = 'feature/move';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, transitionFeatureInterface>(url, 'post', undefined, undefined, data, layer_id, toast)
        console.log(result, 'moveFeatures response')
        return result
    },



} as route