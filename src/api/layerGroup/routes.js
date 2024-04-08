import { newSendRequest } from "../config";
import { addLayerGroupValidator } from "@/api/layerGroup/validations/add.vd";
import { saveTransformer } from "@/api/layerGroup/transformers/save.tf";
import { listLayerGroupValidator } from "@/api/layerGroup/validations/list.vd";
import { listTransformer } from "@/api/layerGroup/transformers/list.tf";
import { getItemValidator } from "@/api/layerGroup/validations/getItem.vd";
import { getItemTransformer } from "@/api/layerGroup/transformers/getItem.tf";
export default {
    addLayerGroup: async function (data, toast) {
        const url = 'layerGroup/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', addLayerGroupValidator, saveTransformer, data, undefined, toast);
        console.log(result, 'addLayerGroup response');
        return result;
    },
    listLayerGroup: async function (toast) {
        const url = 'layerGroup/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', listLayerGroupValidator, listTransformer, undefined, undefined, toast);
        console.log(result, 'listLayerGroup response');
        return result;
    },
    deleteLayerGroup: async function (id, toast) {
        const url = 'layerGroup/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteLayerGroup response');
        return result;
    },
    getItemLayerGroup: async function (id, toast) {
        const url = 'layerGroup/item';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getItemValidator, getItemTransformer, undefined, id, toast);
        console.log(result, 'getItemLayerGroup response');
        return result;
    },
    editLayerGroup: async function (data, id, toast) {
        const url = 'layerGroup/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', addLayerGroupValidator, saveTransformer, data, id, toast);
        console.log(result, 'editLayerGroup response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map