import {z} from "zod";
import {SurveyPanelUsersValidator} from "@/api/surveyPanel/validations/users.vd";
import {MyApiResponse, newSendRequest} from "@/api/config";
import {getUsersTransformer} from "@/api/surveyPanel/transformers/getUsers.tf";
import {getSurveyRegionInfoTransformer} from "@/api/surveyPanel/transformers/getSurveyRegionInfo.tf";
import {SurveyRegionInfoListValidator} from "@/api/surveyPanel/validations/getSurveyRegionInfo.vd";
import {CheckerRegionInfoListValidator} from "@/api/surveyPanel/validations/getCheckerRegionInfo.vd";
import {getCheckerRegionInfoTransformer} from "@/api/surveyPanel/transformers/getCheckerRegionInfo.tf";
import {
    getSurveyProcessListTransformer
} from "@/api/surveyPanel/transformers/getSurveyProcessList.tf";
import {SurveyProcessListValidator} from "@/api/surveyPanel/validations/getSurveyProcessList.vd";
import {getSurveyProcessArseListTransformer} from "@/api/surveyPanel/transformers/getSurveyProcessArseList.tf";
import {getSurveyProcessArseListValidator} from "@/api/surveyPanel/validations/getSurveyProcessArseList.vd";
import {getCheckerProcessListTransformer} from "@/api/surveyPanel/transformers/getCheckerProcessList.tf";
import {CheckerProcessListValidator} from "@/api/surveyPanel/validations/getCheckerProcessList.vd";
import {getProcessItemTransformer, getProcessListTransformer} from "@/api/surveyPanel/transformers/getProcessList.tf";
import {ProcessItemValidator, ProcessListValidator} from "@/api/surveyPanel/validations/getProcessList.vd";
import {AddProcessItem} from "@/api/surveyPanel/SD.Models/addProcess.sd";
import {ArsePreviewValidator} from "@/api/surveyPanel/validations/getArsePreview.vd";
import {getArsePreviewTransformer} from "@/api/surveyPanel/transformers/getArsePreview.tf";
import {getSurveyProcessBlockListTransformer} from "@/api/surveyPanel/transformers/getSurveyProcessBlockList.tf";
import {getSurveyProcessBlockListValidator} from "@/api/surveyPanel/validations/getSurveyProcessBlockList.vd";
import {UploadTempImageInterface} from "@/api/print/SD.Models/uploadTempImage.sd";
import {uploadTempImageValidator} from "@/api/print/validations/uploadTempImage.vd";
import {uploadTempImageTransformer} from "@/api/print/transformers/uploadTempImage.tf";
import {ChangeBlockStatus} from "@/api/surveyPanel/SD.Models/changeBlockStatus.sd";
import {getInitBlockInfoTransformer} from "@/api/surveyPanel/transformers/getInitBlockInfo.tf";
import {InitBlockInfoValidator} from "@/api/surveyPanel/validations/getInitBlockInfo.vd";
import {GetUserInfoValidator} from "@/api/surveyPanel/validations/getUserInfo.vd";
import {getUserInfoTransformer} from "@/api/surveyPanel/transformers/getUserInfo.tf";
import {ChangeCheckerAccessSd} from "@/api/surveyPanel/SD.Models/changeCheckerAccess.sd";


interface route {

    getUserInfo: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getUsers: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getSurveyRegionInfo: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getCheckerRegionInfo: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getSurveyProcessList: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getSurveyProcessBlockList: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getCheckerProcessList: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getCheckerProcessBlockList: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getProcessList: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getProcessBlockList: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addProcess: <T1>(data: AddProcessItem, toast?: any) => Promise<MyApiResponse<T1>>;
    updateProcess: <T1>(data: AddProcessItem, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    retrieveProcess: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteProcess: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addSurveyPersonLayers: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    get_arse_preview: <T1>(code: string, toast?: any) => Promise<MyApiResponse<T1>>;
    changeBlockStatus: <T1>(data: ChangeBlockStatus, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getInitBlockStatus: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    changeCheckerAccess: <T1>(data: ChangeCheckerAccessSd, id: number, toast?: any) => Promise<MyApiResponse<T1>>;


}

export default {

    getUserInfo: async function <T1>(toast?: any) {
        const url = 'panel_survey/getUserInfo';
        type T2 = z.infer<typeof GetUserInfoValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', GetUserInfoValidator, getUserInfoTransformer, undefined, undefined, toast)
        console.log(result, 'getUserInfo response')
        return result
    },


    getUsers: async function <T1>(toast?: any) {
        const url = 'panel_survey/syncUsers';
        type T2 = z.infer<typeof SurveyPanelUsersValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', SurveyPanelUsersValidator, getUsersTransformer, undefined, undefined, toast)
        console.log(result, 'getUsers response')
        return result
    },

    getSurveyRegionInfo: async function <T1>(toast?: any) {
        const url = 'panel_survey/getSurveyRegionInfo';
        type T2 = z.infer<typeof SurveyRegionInfoListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', SurveyRegionInfoListValidator, getSurveyRegionInfoTransformer, undefined, undefined, toast)
        console.log(result, 'getSurveyRegionInfo response')
        return result
    },

    getCheckerRegionInfo: async function <T1>(toast?: any) {
        const url = 'panel_survey/getCheckerRegionInfo';
        type T2 = z.infer<typeof CheckerRegionInfoListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', CheckerRegionInfoListValidator, getCheckerRegionInfoTransformer, undefined, undefined, toast)
        console.log(result, 'getCheckerRegionInfo response')
        return result
    },

    getSurveyProcessList: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/getSurveyProcessList';
        type T2 = z.infer<typeof SurveyProcessListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', SurveyProcessListValidator, getSurveyProcessListTransformer, undefined, id, toast)
        console.log(result, 'getSurveyProcessList response')
        return result
    },

    getSurveyProcessBlockList: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/getSurveyProcessBlockList';
        type T2 = z.infer<typeof getSurveyProcessBlockListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getSurveyProcessBlockListValidator, getSurveyProcessBlockListTransformer, undefined, id, toast)
        console.log(result, 'getSurveyProcessBlockList response')
        return result
    },

    getCheckerProcessList: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/getCheckerProcessList';
        type T2 = z.infer<typeof CheckerProcessListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', CheckerProcessListValidator, getCheckerProcessListTransformer, undefined, id, toast)
        console.log(result, 'getCheckerProcessList response')
        return result
    },

    getCheckerProcessBlockList: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/getCheckerProcessBlockList';
        type T2 = z.infer<typeof getSurveyProcessBlockListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getSurveyProcessBlockListValidator, getSurveyProcessBlockListTransformer, undefined, id, toast)
        console.log(result, 'getCheckerProcessBlockList response')
        return result
    },

    getProcessBlockList: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/getProcessBlockList';
        type T2 = z.infer<typeof getSurveyProcessBlockListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getSurveyProcessBlockListValidator, getSurveyProcessBlockListTransformer, undefined, id, toast)
        console.log(result, 'getProcessBlockList response')
        return result
    },


    getProcessList: async function <T1>(toast?: any) {
        const url = 'panel_survey/processList';
        type T2 = z.infer<typeof ProcessListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', ProcessListValidator, getProcessListTransformer, undefined, undefined, toast)
        console.log(result, 'getProcessList response')
        return result
    },

    addProcess: async function <T1>(data: AddProcessItem, toast?: any) {
        const url = 'panel_survey/addProcess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, AddProcessItem>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'addProcess response')
        return result
    },

    retrieveProcess: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/retrieveProcess';
        type T2 = z.infer<typeof ProcessItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', ProcessItemValidator, getProcessItemTransformer, undefined, id, toast)
        console.log(result, 'retrieveProcess response')
        return result
    },

    updateProcess: async function <T1>(data: AddProcessItem, id: number, toast?: any) {
        const url = 'panel_survey/updateProcess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, AddProcessItem>(url, 'put', undefined, undefined, data, id, toast)
        console.log(result, 'updateProcess response')
        return result
    },

    deleteProcess: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/processDelete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteProcess response')
        return result
    },

    addSurveyPersonLayers: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/addSurveyPersonLayers';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'get', undefined, undefined, undefined, id, toast)
        console.log(result, 'addSurveyPersonLayers response')
        return result
    },

    get_arse_preview: async function <T1>(code: string, toast?: any) {
        const url = 'panel_survey/previewArse';
        type T2 = z.infer<typeof ArsePreviewValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', ArsePreviewValidator, getArsePreviewTransformer, undefined, code, toast)
        console.log(result, 'get_arse_preview response')
        return result
    },

    changeBlockStatus: async function <T1>(data: ChangeBlockStatus, id: number, toast?: any) {
        const url = 'panel_survey/changeBlockStatus';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, ChangeBlockStatus>(url, 'post', undefined, undefined, data, id, toast, true, true)
        console.log(result, 'changeBlockStatus response')
        return result
    },

    getInitBlockStatus: async function <T1>(id: number, toast?: any) {
        const url = 'panel_survey/initBlockStatus';
        type T2 = z.infer<typeof InitBlockInfoValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', InitBlockInfoValidator, getInitBlockInfoTransformer, undefined, id, toast)
        console.log(result, 'getInitBlockStatus response')
        return result
    },

    changeCheckerAccess: async function <T1>(data: ChangeCheckerAccessSd, id: number, toast?: any) {
        const url = 'panel_survey/changeCheckerAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, ChangeCheckerAccessSd>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'changeCheckerAccess response')
        return result
    },

} as route

