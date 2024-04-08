import { SurveyPanelUsersValidator } from "@/api/surveyPanel/validations/users.vd";
import { newSendRequest } from "@/api/config";
import { getUsersTransformer } from "@/api/surveyPanel/transformers/getUsers.tf";
import { getSurveyRegionInfoTransformer } from "@/api/surveyPanel/transformers/getSurveyRegionInfo.tf";
import { SurveyRegionInfoListValidator } from "@/api/surveyPanel/validations/getSurveyRegionInfo.vd";
import { CheckerRegionInfoListValidator } from "@/api/surveyPanel/validations/getCheckerRegionInfo.vd";
import { getCheckerRegionInfoTransformer } from "@/api/surveyPanel/transformers/getCheckerRegionInfo.tf";
import { getSurveyProcessListTransformer } from "@/api/surveyPanel/transformers/getSurveyProcessList.tf";
import { SurveyProcessListValidator } from "@/api/surveyPanel/validations/getSurveyProcessList.vd";
import { getCheckerProcessListTransformer } from "@/api/surveyPanel/transformers/getCheckerProcessList.tf";
import { CheckerProcessListValidator } from "@/api/surveyPanel/validations/getCheckerProcessList.vd";
import { getProcessItemTransformer, getProcessListTransformer } from "@/api/surveyPanel/transformers/getProcessList.tf";
import { ProcessItemValidator, ProcessListValidator } from "@/api/surveyPanel/validations/getProcessList.vd";
import { ArsePreviewValidator } from "@/api/surveyPanel/validations/getArsePreview.vd";
import { getArsePreviewTransformer } from "@/api/surveyPanel/transformers/getArsePreview.tf";
import { getSurveyProcessBlockListTransformer } from "@/api/surveyPanel/transformers/getSurveyProcessBlockList.tf";
import { getSurveyProcessBlockListValidator } from "@/api/surveyPanel/validations/getSurveyProcessBlockList.vd";
import { getInitBlockInfoTransformer } from "@/api/surveyPanel/transformers/getInitBlockInfo.tf";
import { InitBlockInfoValidator } from "@/api/surveyPanel/validations/getInitBlockInfo.vd";
import { GetUserInfoValidator } from "@/api/surveyPanel/validations/getUserInfo.vd";
import { getUserInfoTransformer } from "@/api/surveyPanel/transformers/getUserInfo.tf";
export default {
    getUserInfo: async function (toast) {
        const url = 'panel_survey/getUserInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', GetUserInfoValidator, getUserInfoTransformer, undefined, undefined, toast);
        console.log(result, 'getUserInfo response');
        return result;
    },
    getUsers: async function (toast) {
        const url = 'panel_survey/syncUsers';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', SurveyPanelUsersValidator, getUsersTransformer, undefined, undefined, toast);
        console.log(result, 'getUsers response');
        return result;
    },
    getSurveyRegionInfo: async function (toast) {
        const url = 'panel_survey/getSurveyRegionInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', SurveyRegionInfoListValidator, getSurveyRegionInfoTransformer, undefined, undefined, toast);
        console.log(result, 'getSurveyRegionInfo response');
        return result;
    },
    getCheckerRegionInfo: async function (toast) {
        const url = 'panel_survey/getCheckerRegionInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', CheckerRegionInfoListValidator, getCheckerRegionInfoTransformer, undefined, undefined, toast);
        console.log(result, 'getCheckerRegionInfo response');
        return result;
    },
    getSurveyProcessList: async function (id, toast) {
        const url = 'panel_survey/getSurveyProcessList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', SurveyProcessListValidator, getSurveyProcessListTransformer, undefined, id, toast);
        console.log(result, 'getSurveyProcessList response');
        return result;
    },
    getSurveyProcessBlockList: async function (id, toast) {
        const url = 'panel_survey/getSurveyProcessBlockList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getSurveyProcessBlockListValidator, getSurveyProcessBlockListTransformer, undefined, id, toast);
        console.log(result, 'getSurveyProcessBlockList response');
        return result;
    },
    getCheckerProcessList: async function (id, toast) {
        const url = 'panel_survey/getCheckerProcessList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', CheckerProcessListValidator, getCheckerProcessListTransformer, undefined, id, toast);
        console.log(result, 'getCheckerProcessList response');
        return result;
    },
    getCheckerProcessBlockList: async function (id, toast) {
        const url = 'panel_survey/getCheckerProcessBlockList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getSurveyProcessBlockListValidator, getSurveyProcessBlockListTransformer, undefined, id, toast);
        console.log(result, 'getCheckerProcessBlockList response');
        return result;
    },
    getProcessBlockList: async function (id, toast) {
        const url = 'panel_survey/getProcessBlockList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getSurveyProcessBlockListValidator, getSurveyProcessBlockListTransformer, undefined, id, toast);
        console.log(result, 'getProcessBlockList response');
        return result;
    },
    getProcessList: async function (toast) {
        const url = 'panel_survey/processList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', ProcessListValidator, getProcessListTransformer, undefined, undefined, toast);
        console.log(result, 'getProcessList response');
        return result;
    },
    addProcess: async function (data, toast) {
        const url = 'panel_survey/addProcess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'addProcess response');
        return result;
    },
    retrieveProcess: async function (id, toast) {
        const url = 'panel_survey/retrieveProcess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', ProcessItemValidator, getProcessItemTransformer, undefined, id, toast);
        console.log(result, 'retrieveProcess response');
        return result;
    },
    updateProcess: async function (data, id, toast) {
        const url = 'panel_survey/updateProcess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, id, toast);
        console.log(result, 'updateProcess response');
        return result;
    },
    deleteProcess: async function (id, toast) {
        const url = 'panel_survey/processDelete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteProcess response');
        return result;
    },
    addSurveyPersonLayers: async function (id, toast) {
        const url = 'panel_survey/addSurveyPersonLayers';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', undefined, undefined, undefined, id, toast);
        console.log(result, 'addSurveyPersonLayers response');
        return result;
    },
    get_arse_preview: async function (code, toast) {
        const url = 'panel_survey/previewArse';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', ArsePreviewValidator, getArsePreviewTransformer, undefined, code, toast);
        console.log(result, 'get_arse_preview response');
        return result;
    },
    changeBlockStatus: async function (data, id, toast) {
        const url = 'panel_survey/changeBlockStatus';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast, true, true);
        console.log(result, 'changeBlockStatus response');
        return result;
    },
    getInitBlockStatus: async function (id, toast) {
        const url = 'panel_survey/initBlockStatus';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', InitBlockInfoValidator, getInitBlockInfoTransformer, undefined, id, toast);
        console.log(result, 'getInitBlockStatus response');
        return result;
    },
    changeCheckerAccess: async function (data, id, toast) {
        const url = 'panel_survey/changeCheckerAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'changeCheckerAccess response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map