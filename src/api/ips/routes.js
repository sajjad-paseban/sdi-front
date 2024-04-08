import { sendRequest } from "@/api/config";
import { addIpTransformer } from "@/api/ips/transformers/addIp.tf";
import { addIpValidator } from "@/api/ips/validations/addIp.vd";
import { userIpsValidator } from "@/api/ips/validations/userIps";
import { getUserIpsTransformer } from "@/api/ips/transformers/getUserIps.tf";
import { getIpsTransformer } from "@/api/ips/transformers/ips.tf";
import { ipsValidator } from "@/api/ips/validations/ips";
import { deleteIpTransformer } from "@/api/ips/transformers/deleteIp.tf";
import { deleteIpValidator } from "@/api/ips/validations/deleteIp.vd";
import { getIpByIdValidator } from "@/api/ips/validations/getIpById";
import { getIpByIdTransformer } from "@/api/ips/transformers/getIpById.tf";
export default {
    addIp: async function (data, toast) {
        const url = 'ip/ip';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', addIpValidator, addIpTransformer, data, toast);
        console.log(result, 'addIp response');
        return result;
    },
    getUserIps: async function (data, toast) {
        const url = 'ip/getUserIps';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', userIpsValidator, getUserIpsTransformer, data, toast);
        console.log(result, 'getUserIps response');
        return result;
    },
    getIps: async function (toast) {
        const url = 'ip/ip';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', ipsValidator, getIpsTransformer, undefined, toast);
        console.log(result, 'getIps response');
        return result;
    },
    deleteIp: async function (data, toast) {
        const url = 'ip/deleteIp';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', deleteIpValidator, deleteIpTransformer, data, toast);
        console.log(result, 'deleteIp response');
        return result;
    },
    getIpById: async function (data, toast) {
        const url = 'ip/getIpById';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getIpByIdValidator, getIpByIdTransformer, data, toast);
        console.log(result, 'getIpById response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map