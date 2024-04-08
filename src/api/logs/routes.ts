
import {getLogsValidator} from "@/api/logs/validations/getLogs.vd";
import {getLogsTransformer} from "@/api/logs/transformers/getLogs.tf";
import {z} from "zod";
import Api, {MyApiResponse, sendRequest} from "../config";


interface route {


    getLogs: <T1>( toast?: any) => Promise<MyApiResponse<T1>>;

}

export default {


    getLogs: async function <T1>(toast?: any) {
        const url = 'log/logView';
        type T2 = z.infer<typeof getLogsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getLogsValidator, getLogsTransformer, undefined, toast)
        console.log(result, 'getLogs response')
        return result
    },



} as route

