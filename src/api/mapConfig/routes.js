import { newSendRequest, sendRequest } from "@/api/config";
import { addMapConfigValidator } from "@/api/mapConfig/validations/addMapConfig.vd";
import { addMapConfigTransformer } from "@/api/mapConfig/transformers/addMapConfig.tf";
import { getMapConfigsValidator } from "@/api/mapConfig/validations/getMapConfigs.vd";
import { getMapConfigsTransformer } from "@/api/mapConfig/transformers/getMapConfigs.tf";
import { getMapConfigByIdValidator } from "@/api/mapConfig/validations/getMapConfigById.vd";
import { getMapConfigByIdTransformer } from "@/api/mapConfig/transformers/getMapConfigById.tf";
export default {
    addMapConfig: async function (data, toast) {
        const url = 'mapConfig/mapConfig';
        const result = await sendRequest(url, 'post', addMapConfigValidator, addMapConfigTransformer, data, toast);
        console.log(result, 'addMapConfig response');
        return result;
    },
    getMapConfigs: async function (toast) {
        const url = 'mapConfig/mapConfig';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getMapConfigsValidator, getMapConfigsTransformer, undefined, toast);
        console.log(result, 'getMapConfigs response');
        return result;
    },
    getMapConfigById: async function (data, toast) {
        const url = 'mapConfig/mapConfig';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getMapConfigByIdValidator, getMapConfigByIdTransformer, data, toast);
        console.log(result, 'getMapConfigs response');
        return result;
    },
    getRoleMapConfig: async function (toast) {
        const url = 'mapConfig/getRoleMapConfig';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getMapConfigByIdValidator, getMapConfigByIdTransformer, undefined, undefined, toast);
        console.log(result, 'getRoleMapConfig response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map