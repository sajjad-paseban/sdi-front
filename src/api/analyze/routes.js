import { newSendRequest } from "@/api/config";
import { analyzeItemValidator, analyzeListValidator } from "@/api/analyze/validations/analyze.vd";
import { analyzeListTransformer } from "@/api/analyze/transformers/getAnalyzeList.tf";
import { analyzeGroupListValidator } from "@/api/analyze/validations/analyzeGroup.vd";
import { analyzeGroupListTransformer } from "@/api/analyze/transformers/getAnalyzeGroupList.tf";
import { processListValidator } from "@/api/analyze/validations/getProcessItem.vd";
import { processListTransformer } from "@/api/analyze/transformers/getProcessList.tf";
import { getEnumsTransformer } from "@/api/analyze/transformers/getEnums.tf";
import { getEnumsValidator } from "@/api/analyze/validations/getEnums.vd";
import { filtersListValidator } from "@/api/analyze/validations/getFilterItem.vd";
import { filtersListTransformer } from "@/api/analyze/transformers/getFiltersList.tf";
import { filterResultFeaturesValidator } from "@/api/analyze/validations/filterResult.vd";
import { filterResultListTransformer } from "@/api/analyze/transformers/filterResult.tf";
import { analyzeItemTransformer } from "@/api/analyze/transformers/getAnalyzeItem.tf";
import { runAnalyzeListValidator } from "@/api/analyze/validations/runAnalyze.vd";
import { runAnalyzeResultTransformer } from "@/api/analyze/transformers/runAnalyzeResult.tf";
import { analyze_export_fileValidator } from "@/api/analyze/validations/analyze_export_file.vd";
import { analyzeExportFiletTransformer } from "@/api/analyze/transformers/analyzeExportFile.tf";
export default {
    getAnalyzeList: async function (toast) {
        const url = 'analyze/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', analyzeListValidator, analyzeListTransformer, undefined, undefined, toast);
        console.log(result, 'getAnalyzeList response');
        return result;
    },
    getAnalyzeGroupList: async function (toast) {
        const url = 'analyze/analyzeGroup/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', analyzeGroupListValidator, analyzeGroupListTransformer, undefined, undefined, toast);
        console.log(result, 'getAnalyzeGroupList response');
        return result;
    },
    getProcessList: async function (toast) {
        const url = 'analyze/process/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', processListValidator, processListTransformer, undefined, undefined, toast);
        console.log(result, 'getProcessList response');
        return result;
    },
    getProcessInputTypes: async function (toast) {
        const url = 'analyze/getProcessInputTypes';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast);
        console.log(result, 'getProcessInputTypes response');
        return result;
    },
    getProcessOutputTypes: async function (toast) {
        const url = 'analyze/getProcessOutputTypes';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast);
        console.log(result, 'getProcessOutputTypes response');
        return result;
    },
    getFiltersList: async function (toast) {
        const url = 'analyze/filter/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', filtersListValidator, filtersListTransformer, undefined, undefined, toast);
        console.log(result, 'getFiltersList response');
        return result;
    },
    getFilterResult: async function (data, toast) {
        const url = 'analyze/filter/result';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', filterResultFeaturesValidator, filterResultListTransformer, data, undefined, toast);
        console.log(result, 'getFilterResult response');
        return result;
    },
    getAnalyzeOutputTypes: async function (toast) {
        const url = 'analyze/get_analyze_output_types';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast);
        console.log(result, 'getAnalyzeOutputTypes response');
        return result;
    },
    getAnalyzeExportFileTypes: async function (toast) {
        const url = 'analyze/get_analyze_export_file_type';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getEnumsValidator, getEnumsTransformer, undefined, undefined, toast);
        console.log(result, 'getAnalyzeExportFileTypes response');
        return result;
    },
    addAnalyzeModel: async function (data, toast) {
        const url = 'analyze/create';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'addAnalyzeModel response');
        return result;
    },
    getAnalyzeItem: async function (id, toast) {
        const url = 'analyze/retrieve';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', analyzeItemValidator, analyzeItemTransformer, undefined, id, toast);
        console.log(result, 'getAnalyzeItem response');
        return result;
    },
    runAnalyzeResult: async function (id, toast) {
        const url = 'analyze/run';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', runAnalyzeListValidator, runAnalyzeResultTransformer, undefined, id, toast);
        console.log(result, 'runAnalyzeResult response');
        return result;
    },
    analyze_export_file: async function (id, toast) {
        const url = 'analyze/analyze_export_file';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', analyze_export_fileValidator, analyzeExportFiletTransformer, undefined, id, toast);
        console.log(result, 'analyze_export_file response');
        return result;
    },
    deleteAnalyzeModel: async function (id, toast) {
        const url = 'analyze/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteAnalyzeModel response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map