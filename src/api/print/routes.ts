import {addFeatureInterface} from "@/api/feature/SD.Models/addFeature";
import {z} from "zod";
import {getArseInfoListValidator} from "@/api/survey/validations/getArseInfo.vd";
import {MyApiResponse, newSendRequest} from "@/api/config";
import {getArseInfoTransformer} from "@/api/survey/transformers/getArseInfo.tf";
import {LayerGroupInterface} from "@/models/LayerGroup.interface";
import {addLayerGroupValidator} from "@/api/layerGroup/validations/add.vd";
import {saveTransformer} from "@/api/layerGroup/transformers/save.tf";
import {listLayerGroupValidator} from "@/api/layerGroup/validations/list.vd";
import {listTransformer} from "@/api/layerGroup/transformers/list.tf";
import {getItemValidator} from "@/api/layerGroup/validations/getItem.vd";
import {getItemTransformer} from "@/api/layerGroup/transformers/getItem.tf";
import {getInitAddModelTransformer} from "@/api/print/transformers/getInitAddModel.tf";
import {getInitAddModelInterface} from "@/api/print/SD.Models/getInitAddModel.sd";
import {getInitAddModelValidator} from "@/api/print/validations/getInitAddModel.vd";
import { UploadTempImageInterface} from "@/api/print/SD.Models/uploadTempImage.sd";
import {uploadTempImageValidator} from "@/api/print/validations/uploadTempImage.vd";
import {uploadTempImageTransformer} from "@/api/print/transformers/uploadTempImage.tf";
import {RemoveImageSdInterface} from "@/api/print/SD.Models/removeImage.sd";
import {PreviewModelSdModelInterface} from "@/api/print/SD.Models/previewModel.sd";
import {previewModelValidator} from "@/api/print/validations/previewModel.vd";
import {previewModelTransformer} from "@/api/print/transformers/previewModel.tf";
import {PrintTemplate} from "@/models/Print.interface";
import {GetTempsSdInterface} from "@/api/print/SD.Models/getTemps.sd";
import {getTempListValidator, getTempValidator} from "@/api/print/validations/getTemps.vd";
import {getTempItemTransformer, getTempsTransformer} from "@/api/print/transformers/getTemps.tf";


interface route {

    previewFormData: <T1>(data: PreviewModelSdModelInterface, toast?: any) => Promise<MyApiResponse<T1>>;

    addTempGroup: <T1>(data: LayerGroupInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    listTempGroup: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    deleteTempGroup: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getItemTempGroup: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editTempGroup: <T1>(data: LayerGroupInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;

    getInitAddModel: <T1>(data: getInitAddModelInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    uploadTempImage: <T1>(data: UploadTempImageInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    removeImageGallery: <T1>(data: RemoveImageSdInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    uploadModelImage: <T1>(data: UploadTempImageInterface,id:number, toast?: any) => Promise<MyApiResponse<T1>>;


    saveEditFormData: <T1>(data: PrintTemplate,id:number, toast?: any) => Promise<MyApiResponse<T1>>;
    saveFormData: <T1>(data: PrintTemplate, toast?: any) => Promise<MyApiResponse<T1>>;
    getTemps: <T1>(data: GetTempsSdInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteTemp: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getItemTemp: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;

}

export default {

    previewFormData: async function <T1>(data: PreviewModelSdModelInterface, toast?: any) {
        const url = 'print/templatePreview';
        type T2 = z.infer<typeof previewModelValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, PreviewModelSdModelInterface>(url, 'post', previewModelValidator, previewModelTransformer, data, undefined, toast)
        console.log(result, 'setPrintFormData response')
        return result
    },


    addTempGroup: async function <T1>(data: LayerGroupInterface, toast?: any) {
        const url = 'print/groupAdd';
        type T2 = z.infer<typeof addLayerGroupValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LayerGroupInterface>(url, 'post', addLayerGroupValidator, saveTransformer, data, undefined, toast)
        console.log(result, 'addTempGroup response')
        return result
    },

    listTempGroup: async function <T1>(toast?: any) {
        const url = 'print/groupList';
        type T2 = z.infer<typeof listLayerGroupValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', listLayerGroupValidator, listTransformer, undefined, undefined, toast)
        console.log(result, 'listTempGroup response')
        return result
    },

    deleteTempGroup: async function <T1>(id: number, toast?: any) {
        const url = 'print/groupDelete';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteTempGroup response')
        return result
    },

    getItemTempGroup: async function <T1>(id: number, toast?: any) {
        const url = 'print/groupItem';
        type T2 = z.infer<typeof getItemValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getItemValidator, getItemTransformer, undefined, id, toast)
        console.log(result, 'getItemTempGroup response')
        return result
    },

    editTempGroup: async function <T1>(data: LayerGroupInterface, id: number, toast?: any) {
        const url = 'print/groupUpdate';
        type T2 = z.infer<typeof addLayerGroupValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LayerGroupInterface>(url, 'put', addLayerGroupValidator, saveTransformer, data, id, toast)
        console.log(result, 'editTempGroup response')
        return result
    },

    //----------------------//
    getInitAddModel: async function <T1>(data: getInitAddModelInterface, toast?: any) {
        const url = 'print/init_data';
        type T2 = z.infer<typeof getInitAddModelValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, getInitAddModelInterface>(url, 'get', getInitAddModelValidator, getInitAddModelTransformer, data, undefined, toast)
        console.log(result, 'getInitAddModel response')
        return result
    },

    saveFormData: async function <T1>(data: PrintTemplate, toast?: any) {
        const url = 'print/templateAdd';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, PrintTemplate>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'saveFormData response')
        return result
    },

    saveEditFormData: async function <T1>(data: PrintTemplate,id:number, toast?: any) {
        const url = 'print/templateUpdate';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, PrintTemplate>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'saveEditFormData response')
        return result
    },

    uploadTempImage: async function <T1>(data: UploadTempImageInterface, toast?: any) {
        const url = 'print/uploadImageTemp';
        type T2 = z.infer<typeof uploadTempImageValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, UploadTempImageInterface>(url, 'post', uploadTempImageValidator, uploadTempImageTransformer, data, undefined, toast,true,true)
        console.log(result, 'uploadTempImage response')
        return result
    },
    uploadModelImage: async function <T1>(data: UploadTempImageInterface,id:number, toast?: any) {
        const url = 'print/uploadImage';
        type T2 = z.infer<typeof uploadTempImageValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, UploadTempImageInterface>(url, 'post', uploadTempImageValidator, uploadTempImageTransformer, data, id, toast,true,true)
        console.log(result, 'uploadTempImage response')
        return result
    },

    removeImageGallery: async function <T1>(data:RemoveImageSdInterface, toast?: any) {
        const url = 'print/removeImage';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined,RemoveImageSdInterface>(url, 'delete', undefined, undefined, data,undefined, toast)
        console.log(result, 'removeImageGallery response')
        return result
    },

    getTemps: async function <T1>(data: GetTempsSdInterface, toast?: any) {
        const url = 'print/templateList';
        type T2 = z.infer<typeof getTempListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, GetTempsSdInterface>(url, 'get', getTempListValidator, getTempsTransformer, data, undefined, toast)
        console.log(result, 'getTemps response')
        return result
    },
    deleteTemp: async function <T1>(id: number, toast?: any) {
        const url = 'print/templateDelete';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteTemp response')
        return result
    },
    getItemTemp: async function <T1>(id: number, toast?: any) {
        const url = 'print/templateItem';
        type T2 = z.infer<typeof getTempValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getTempValidator, getTempItemTransformer, undefined, id, toast)
        console.log(result, 'getItemTemp response')
        return result
    },


} as route

