import {z} from "zod";
import {MyApiResponse, sendRequest} from "../config";
import {getTablesValidator} from "@/api/tables/validations/getTables.vd";
import {getTablesTransformer} from "@/api/tables/transformers/getTables.tf";
import {TableInfoByNameSd} from "@/api/tables/SD.Models/tableInfoByName.sd";
import {tableInfoByNameTransformer} from "@/api/tables/transformers/tableInfoByName.tf";
import {tableInfoByNameValidator} from "@/api/tables/validations/tableInfoByName.vd";


interface route {


    getTables: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getTableInfoByName: <T1>(data: TableInfoByNameSd, toast?: any) => Promise<MyApiResponse<T1>>;

}

export default {


    getTables: async function <T1>(toast?: any) {
        const url = 'table/getTables';
        type T2 = z.infer<typeof getTablesValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getTablesValidator, getTablesTransformer, undefined, toast)
        console.log(result, 'getTables response')
        return result
    },

    getTableInfoByName: async function <T1>(data: TableInfoByNameSd, toast?: any) {
        const url = 'table/tableInfoByName';
        type T2 = z.infer<typeof tableInfoByNameValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, TableInfoByNameSd>(url, 'get', tableInfoByNameValidator, tableInfoByNameTransformer, data, toast)
        console.log(result, 'getTableInfoByName response')
        return result
    },


} as route

