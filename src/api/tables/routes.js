import { sendRequest } from "../config";
import { getTablesValidator } from "@/api/tables/validations/getTables.vd";
import { getTablesTransformer } from "@/api/tables/transformers/getTables.tf";
import { tableInfoByNameTransformer } from "@/api/tables/transformers/tableInfoByName.tf";
import { tableInfoByNameValidator } from "@/api/tables/validations/tableInfoByName.vd";
export default {
    getTables: async function (toast) {
        const url = 'table/getTables';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getTablesValidator, getTablesTransformer, undefined, toast);
        console.log(result, 'getTables response');
        return result;
    },
    getTableInfoByName: async function (data, toast) {
        const url = 'table/tableInfoByName';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', tableInfoByNameValidator, tableInfoByNameTransformer, data, toast);
        console.log(result, 'getTableInfoByName response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map