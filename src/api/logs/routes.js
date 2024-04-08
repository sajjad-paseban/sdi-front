import { getLogsValidator } from "@/api/logs/validations/getLogs.vd";
import { getLogsTransformer } from "@/api/logs/transformers/getLogs.tf";
import { sendRequest } from "../config";
export default {
    getLogs: async function (toast) {
        const url = 'log/logView';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getLogsValidator, getLogsTransformer, undefined, toast);
        console.log(result, 'getLogs response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map