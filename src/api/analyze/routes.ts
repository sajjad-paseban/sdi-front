import {MyApiResponse, newSendRequest} from "@/api/config";
import {z} from "zod";
import {analyzeItemValidator, analyzeListValidator} from "@/api/analyze/validations/analyze.vd";
import {analyzeListTransformer} from "@/api/analyze/transformers/getAnalyzeList.tf";
import {analyzeGroupItemValidator, analyzeGroupListValidator} from "@/api/analyze/validations/analyzeGroup.vd";
import {analyzeGroupListTransformer} from "@/api/analyze/transformers/getAnalyzeGroupList.tf";
import {processListValidator} from "@/api/analyze/validations/getProcessItem.vd";
import {processListTransformer} from "@/api/analyze/transformers/getProcessList.tf";
import {getEnumsTransformer} from "@/api/analyze/transformers/getEnums.tf";
import {getEnumsValidator} from "@/api/analyze/validations/getEnums.vd";
import {filtersListValidator, getFilterItemValidator} from "@/api/analyze/validations/getFilterItem.vd";
import {filtersListTransformer} from "@/api/analyze/transformers/getFiltersList.tf";
import {filterResultFeaturesValidator} from "@/api/analyze/validations/filterResult.vd";
import {filterResultListTransformer} from "@/api/analyze/transformers/filterResult.tf";
import {FilterResult} from "@/api/analyze/SD.Models/filterResult.sd";
import {analyzeItemTransformer} from "@/api/analyze/transformers/getAnalyzeItem.tf";
import {runAnalyzeListValidator} from "@/api/analyze/validations/runAnalyze.vd";
import {runAnalyzeResultTransformer} from "@/api/analyze/transformers/runAnalyzeResult.tf";
import {analyze_export_fileValidator} from "@/api/analyze/validations/analyze_export_file.vd";
import {analyzeExportFiletTransformer} from "@/api/analyze/transformers/analyzeExportFile.tf";

interface route {
    getAnalyzeList: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    addAnalyzeModel: <T1>(data: any, toast?: any) => Promise<MyApiResponse<T1>>;
    getAnalyzeGroupList: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getProcessList: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getProcessInputTypes: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getProcessOutputTypes: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getFiltersList: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getFilterResult: <T1>(data: FilterResult, toast?: any) => Promise<MyApiResponse<T1>>;
    getAnalyzeOutputTypes: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getAnalyzeExportFileTypes: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getAnalyzeItem: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    runAnalyzeResult: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    analyze_export_file: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteAnalyzeModel: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;


}

export default {
    getAnalyzeList: async function <T1>(toast?: any) {
        const url = 'analyze/list';
        type T2 = z.infer<typeof analyzeListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', analyzeListValidator, analyzeListTransformer, undefined, undefined, toast)
        console.log(result, 'getAnalyzeList response')
        return result
    },

    getAnalyzeGroupList: async function <T1>(toast?: any) {
        const url = 'analyze/analyzeGroup/list';
        type T2 = z.infer<typeof analyzeGroupListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', analyzeGroupListValidator, analyzeGroupListTransformer, undefined, undefined, toast)
        console.log(result, 'getAnalyzeGroupList response')
        return result
    },

    getProcessList: async function <T1>(toast?: any) {
        const url = 'analyze/process/list';
        type T2 = z.infer<typeof processListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', processListValidator, processListTransformer, undefined, undefined, toast)
        console.log(result, 'getProcessList response')
        return result
    },

    getProcessInputTypes: async function <T1>(toast?: any) {
        const url = 'analyze/getProcessInputTypes';
        type T2 = z.infer<typeof getEnumsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast)
        console.log(result, 'getProcessInputTypes response')
        return result
    },

    getProcessOutputTypes: async function <T1>(toast?: any) {
        const url = 'analyze/getProcessOutputTypes';
        type T2 = z.infer<typeof getEnumsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast)
        console.log(result, 'getProcessOutputTypes response')
        return result
    },

    getFiltersList: async function <T1>(toast?: any) {
        const url = 'analyze/filter/list';
        type T2 = z.infer<typeof filtersListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', filtersListValidator, filtersListTransformer, undefined, undefined, toast)
        console.log(result, 'getFiltersList response')
        return result
    },

    getFilterResult: async function <T1>(data: FilterResult, toast?: any) {
        const url = 'analyze/filter/result';
        type T2 = z.infer<typeof filterResultFeaturesValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, FilterResult>(url, 'post', filterResultFeaturesValidator, filterResultListTransformer, data, undefined, toast)
        console.log(result, 'getFilterResult response')
        return result
    },

    getAnalyzeOutputTypes: async function <T1>(toast?: any) {
        const url = 'analyze/get_analyze_output_types';
        type T2 = z.infer<typeof getEnumsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast)
        console.log(result, 'getAnalyzeOutputTypes response')
        return result
    },

    getAnalyzeExportFileTypes: async function <T1>(toast?: any) {
        const url = 'analyze/get_analyze_export_file_type';
        type T2 = z.infer<typeof getEnumsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast)
        console.log(result, 'getAnalyzeExportFileTypes response')
        return result
    },

    addAnalyzeModel: async function <T1>(data: any, toast?: any) {
        const url = 'analyze/create';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'addAnalyzeModel response')
        return result
    },

    getAnalyzeItem: async function <T1>(id: number, toast?: any) {
        const url = 'analyze/retrieve';
        type T2 = z.infer<typeof analyzeItemValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', analyzeItemValidator, analyzeItemTransformer, undefined, id, toast)
        console.log(result, 'getAnalyzeItem response')
        return result
    },

    runAnalyzeResult: async function <T1>(id: number, toast?: any) {
        const url = 'analyze/run';
        type T2 = z.infer<typeof runAnalyzeListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', runAnalyzeListValidator, runAnalyzeResultTransformer, undefined, id, toast)
        console.log(result, 'runAnalyzeResult response')
        return result
    },


    analyze_export_file: async function <T1>(id: number, toast?: any) {
        const url = 'analyze/analyze_export_file';
        type T2 = z.infer<typeof analyze_export_fileValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', analyze_export_fileValidator, analyzeExportFiletTransformer, undefined, id, toast)
        console.log(result, 'analyze_export_file response')
        return result
    },

    deleteAnalyzeModel: async function <T1>(id: number, toast?: any) {
        const url = 'analyze/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteAnalyzeModel response')
        return result
    },



} as route

