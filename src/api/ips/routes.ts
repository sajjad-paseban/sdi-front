import {MyApiResponse, sendRequest} from "@/api/config";
import {z} from "zod";


import {AddUserSd} from "@/api/users/SD.Models/addUser.sd";
import {addUserValidator} from "@/api/users/validations/addUser.vd";
import {addUserTransformer} from "@/api/users/transformers/addUser.tf";
import {addIpTransformer} from "@/api/ips/transformers/addIp.tf";
import {addIpValidator} from "@/api/ips/validations/addIp.vd";
import {GetIpById, IpsInterface} from "@/models/Ips.interface";
import {GetUserIpsSd} from "@/api/ips/SD.Models/getUserIps.sd";
import {userIpsValidator} from "@/api/ips/validations/userIps";
import {getUserIpsTransformer} from "@/api/ips/transformers/getUserIps.tf";
import {getIpsTransformer} from "@/api/ips/transformers/ips.tf";
import {ipsValidator} from "@/api/ips/validations/ips";
import {DeleteIpSd} from "@/api/ips/SD.Models/deleteIp.sd";
import {deleteIpTransformer} from "@/api/ips/transformers/deleteIp.tf";
import {deleteIpValidator} from "@/api/ips/validations/deleteIp.vd";
import {getIpByIdValidator} from "@/api/ips/validations/getIpById";
import {getIpByIdTransformer} from "@/api/ips/transformers/getIpById.tf";
import {GetIpByIdSd} from "@/api/ips/SD.Models/getIpById.sd";



interface route {


    addIp: <T1>(data:IpsInterface, toast: any) => Promise<MyApiResponse<T1>>;
    getUserIps: <T1>(data:GetUserIpsSd, toast: any) => Promise<MyApiResponse<T1>>;
    getIps: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    deleteIp: <T1>(data:DeleteIpSd, toast: any) => Promise<MyApiResponse<T1>>;
    getIpById: <T1>(data:GetIpByIdSd, toast: any) => Promise<MyApiResponse<T1>>;

}

export default {



    addIp:async function <T1>(data:IpsInterface, toast?: any) {
        const url = 'ip/ip';
        type T2 = z.infer<typeof addIpValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post',addIpValidator , addIpTransformer, data, toast)
        console.log(result, 'addIp response')
        return result
    },

    getUserIps:async function <T1>(data:GetUserIpsSd, toast?: any) {
        const url = 'ip/getUserIps';
        type T2 = z.infer<typeof userIpsValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get',userIpsValidator , getUserIpsTransformer, data, toast)
        console.log(result, 'getUserIps response')
        return result
    },

    getIps:async function <T1>(toast?: any) {
        const url = 'ip/ip';
        type T2 = z.infer<typeof ipsValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get',ipsValidator , getIpsTransformer, undefined, toast)
        console.log(result, 'getIps response')
        return result
    },

    deleteIp:async function <T1>(data:DeleteIpSd, toast?: any) {
        const url = 'ip/deleteIp';
        type T2 = z.infer<typeof deleteIpValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post',deleteIpValidator , deleteIpTransformer, data, toast)
        console.log(result, 'deleteIp response')
        return result
    },

    getIpById:async function <T1>(data:GetIpByIdSd, toast?: any) {
        const url = 'ip/getIpById';
        type T2 = z.infer<typeof getIpByIdValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2,GetIpByIdSd>(url, 'get',getIpByIdValidator , getIpByIdTransformer, data, toast)
        console.log(result, 'getIpById response')
        return result
    },


} as route

