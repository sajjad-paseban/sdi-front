import { newSendRequest } from "@/api/config";
import { addLayerGroupValidator } from "@/api/layerGroup/validations/add.vd";
import { saveTransformer } from "@/api/layerGroup/transformers/save.tf";
import { listLayerGroupValidator } from "@/api/layerGroup/validations/list.vd";
import { listTransformer } from "@/api/layerGroup/transformers/list.tf";
import { getItemValidator } from "@/api/layerGroup/validations/getItem.vd";
import { getItemTransformer } from "@/api/layerGroup/transformers/getItem.tf";
import { getInitAddModelTransformer } from "@/api/print/transformers/getInitAddModel.tf";
import { getInitAddModelValidator } from "@/api/print/validations/getInitAddModel.vd";
import { uploadTempImageValidator } from "@/api/print/validations/uploadTempImage.vd";
import { uploadTempImageTransformer } from "@/api/print/transformers/uploadTempImage.tf";
import { previewModelValidator } from "@/api/print/validations/previewModel.vd";
import { previewModelTransformer } from "@/api/print/transformers/previewModel.tf";
import { getTempListValidator, getTempValidator } from "@/api/print/validations/getTemps.vd";
import { getTempItemTransformer, getTempsTransformer } from "@/api/print/transformers/getTemps.tf";
export default {
    previewFormData: async function (data, toast) {
        const url = 'print/templatePreview';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', previewModelValidator, previewModelTransformer, data, undefined, toast);
        console.log(result, 'setPrintFormData response');
        return result;
    },
    addTempGroup: async function (data, toast) {
        const url = 'print/groupAdd';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', addLayerGroupValidator, saveTransformer, data, undefined, toast);
        console.log(result, 'addTempGroup response');
        return result;
    },
    listTempGroup: async function (toast) {
        const url = 'print/groupList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', listLayerGroupValidator, listTransformer, undefined, undefined, toast);
        console.log(result, 'listTempGroup response');
        return result;
    },
    deleteTempGroup: async function (id, toast) {
        const url = 'print/groupDelete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteTempGroup response');
        return result;
    },
    getItemTempGroup: async function (id, toast) {
        const url = 'print/groupItem';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getItemValidator, getItemTransformer, undefined, id, toast);
        console.log(result, 'getItemTempGroup response');
        return result;
    },
    editTempGroup: async function (data, id, toast) {
        const url = 'print/groupUpdate';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', addLayerGroupValidator, saveTransformer, data, id, toast);
        console.log(result, 'editTempGroup response');
        return result;
    },
    //----------------------//
    getInitAddModel: async function (data, toast) {
        const url = 'print/init_data';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getInitAddModelValidator, getInitAddModelTransformer, data, undefined, toast);
        console.log(result, 'getInitAddModel response');
        return result;
    },
    saveFormData: async function (data, toast) {
        const url = 'print/templateAdd';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'saveFormData response');
        return result;
    },
    saveEditFormData: async function (data, id, toast) {
        const url = 'print/templateUpdate';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'saveEditFormData response');
        return result;
    },
    uploadTempImage: async function (data, toast) {
        const url = 'print/uploadImageTemp';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', uploadTempImageValidator, uploadTempImageTransformer, data, undefined, toast, true, true);
        console.log(result, 'uploadTempImage response');
        return result;
    },
    uploadModelImage: async function (data, id, toast) {
        const url = 'print/uploadImage';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', uploadTempImageValidator, uploadTempImageTransformer, data, id, toast, true, true);
        console.log(result, 'uploadTempImage response');
        return result;
    },
    removeImageGallery: async function (data, toast) {
        const url = 'print/removeImage';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, data, undefined, toast);
        console.log(result, 'removeImageGallery response');
        return result;
    },
    getTemps: async function (data, toast) {
        const url = 'print/templateList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getTempListValidator, getTempsTransformer, data, undefined, toast);
        console.log(result, 'getTemps response');
        return result;
    },
    deleteTemp: async function (id, toast) {
        const url = 'print/templateDelete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteTemp response');
        return result;
    },
    getItemTemp: async function (id, toast) {
        const url = 'print/templateItem';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getTempValidator, getTempItemTransformer, undefined, id, toast);
        console.log(result, 'getItemTemp response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map