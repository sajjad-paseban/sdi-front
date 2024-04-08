import {z} from "zod";
import {MyApiResponse, newSendRequest} from "../config";
import {getBaseStyleItemValidator} from "@/api/styles/validations/getItemBaseStyle.vd";
import {getItemBaseStyleTransformer} from "@/api/styles/transformers/getItemBaseStyle.tf";
import {getListBaseStyleValidator} from "@/api/styles/validations/getListBaseStyle.vd";
import {getListBaseStyleTransformer} from "@/api/styles/transformers/getListBaseStyle.tf";
import {getStylePatternValidator} from "@/api/styles/validations/getStylePattern.vd";
import {getStylePatternTransformer} from "@/api/styles/transformers/getStylePattern.tf";
import {GetListBaseStyleSd} from "@/api/styles/SD.Models/getListBaseStyle.sd";
import {AdvanceStyle, BaseStyleInterface, FileSld, LabelStyleInterface} from "@/models/Style.interface";
import {saveStyleValidator} from "@/api/styles/validations/saveStyle.vd";
import {saveStyleTransformer} from "@/api/styles/transformers/saveStyle.tf";
import {getFontsListValidator} from "@/api/styles/validations/getFontsList.vd";
import {getFontsListTransformer} from "@/api/styles/transformers/getFontsList.tf";
import {getFontStylesTransformer} from "@/api/styles/transformers/getFontStyles.tf";
import {getFontStylesValidator} from "@/api/styles/validations/getFontStyles.vd";
import {getFontsWightsTransformer} from "@/api/styles/transformers/getFontsWights.tf";
import {getFontsWightsValidator} from "@/api/styles/validations/getFontsWights.vd";
import {getItemLabelStyleTransformer} from "@/api/styles/transformers/getItemLabelStyle.tf";
import {getLabelStyleItemValidator} from "@/api/styles/validations/getItemLabelStyle.vd";
import {SetStyleToLayerSd} from "@/api/styles/SD.Models/setStyleToLayer.sd";
import {getFilterTypeListTransformer} from "@/api/styles/transformers/getFilterTypeList.tf";
import {getFilterTypeListValidator} from "@/api/styles/validations/getFilterTypesList.vd";
import {getFilterOperatorListTransformer} from "@/api/styles/transformers/getFilterOperatorList.tf";
import {getFilterOperatorsListValidator} from "@/api/styles/validations/getFilterOperatorsList.vd";
import {getItemAdvanceValidator} from "@/api/styles/validations/getItemAdvanceStyle.vd";
import {getItemAdvanceStyleTransformer} from "@/api/styles/transformers/getItemAdvanceStyle.tf";


interface route {


    getItemBaseStyle: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteBaseStyle: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getListBaseStyle: <T1>(data: GetListBaseStyleSd, toast?: any) => Promise<MyApiResponse<T1>>;
    getPolygonPattern: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getLinePattern: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    addBaseModelStyle: <T1>(data: BaseStyleInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    editBaseModelStyle: <T1>(data: BaseStyleInterface,id: number, toast?: any) => Promise<MyApiResponse<T1>>;

    getListTextStyle: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getListFonts: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getFontStyles: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getFontWights: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    addTextStyle: <T1>(data: LabelStyleInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getItemLabelStyle: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteTextStyle: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editTextStyle: <T1>(data: LabelStyleInterface,id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getListFilterTypes: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getListFilterOperators: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;

    addAdvanceModelStyle: <T1>(data: AdvanceStyle, toast?: any) => Promise<MyApiResponse<T1>>;
    getItemAdvanceStyle: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editAdvanceModelStyle: <T1>(data: AdvanceStyle,id: number, toast?: any) => Promise<MyApiResponse<T1>>;

    uploadSld: <T1>(data: FileSld, toast?: any) => Promise<MyApiResponse<T1>>;
    editUploadSld: <T1>(data: FileSld,id:number, toast?: any) => Promise<MyApiResponse<T1>>;
    setStyleToLayer: <T1>(data: SetStyleToLayerSd, toast?: any) => Promise<MyApiResponse<T1>>;

}

export default {


    getItemBaseStyle: async function <T1>(id: number, toast?: any) {
        const url = 'style/base/item';
        type T2 = z.infer<typeof getBaseStyleItemValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getBaseStyleItemValidator, getItemBaseStyleTransformer, undefined, id, toast)
        console.log(result, 'getItemBaseStyle response')
        return result
    },

    getListBaseStyle: async function <T1>(data: GetListBaseStyleSd, toast?: any) {
        const url = 'style/base/list';
        type T2 = z.infer<typeof getListBaseStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, GetListBaseStyleSd>(url, 'get', getListBaseStyleValidator, getListBaseStyleTransformer, data, undefined, toast)
        console.log(result, 'getListBaseStyle response')
        return result
    },

    getLinePattern: async function <T1>(toast?: any) {
        const url = 'style/pattern/line';
        type T2 = z.infer<typeof getStylePatternValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getStylePatternValidator, getStylePatternTransformer, undefined, undefined, toast)
        console.log(result, 'getLinePattern response')
        return result
    },

    getPolygonPattern: async function <T1>(toast?: any) {
        const url = 'style/pattern/polygon';
        type T2 = z.infer<typeof getStylePatternValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getStylePatternValidator, getStylePatternTransformer, undefined, undefined, toast)
        console.log(result, 'getPolygonPattern response')
        return result
    },

    addBaseModelStyle: async function <T1>(data: BaseStyleInterface, toast?: any) {
        const url = 'style/base/add';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, BaseStyleInterface>(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast)
        console.log(result, 'addBaseModelStyle response')
        return result
    },

    deleteBaseStyle: async function <T1>(id: number, toast?: any) {
        const url = 'style/base/delete';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteBaseStyle response')
        return result
    },

    editBaseModelStyle: async function <T1>(data: BaseStyleInterface,id: number, toast?: any) {
        const url = 'style/base/update';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, BaseStyleInterface>(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast)
        console.log(result, 'editBaseModelStyle response')
        return result
    },
    //-------------------------------------------------------------------------------------//
    getListTextStyle: async function <T1>(toast?: any) {
        const url = 'style/text/list';
        type T2 = z.infer<typeof getListBaseStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getListBaseStyleValidator, getListBaseStyleTransformer, undefined, undefined, toast)
        console.log(result, 'getListTextStyle response')
        return result
    },

    getListFonts: async function <T1>(toast?: any) {
        const url = 'style/fonts/list';
        type T2 = z.infer<typeof getFontsListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getFontsListValidator, getFontsListTransformer, undefined, undefined, toast)
        console.log(result, 'getListFonts response')
        return result
    },
    getFontStyles: async function <T1>(toast?: any) {
        const url = 'style/fonts/styles';
        type T2 = z.infer<typeof getFontStylesValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getFontStylesValidator, getFontStylesTransformer, undefined, undefined, toast)
        console.log(result, 'getFontStyles response')
        return result
    },

    getFontWights: async function <T1>(toast?: any) {
        const url = 'style/fonts/wights';
        type T2 = z.infer<typeof getFontsWightsValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getFontsWightsValidator, getFontsWightsTransformer, undefined, undefined, toast)
        console.log(result, 'getFontWights response')
        return result
    },
    addTextStyle: async function <T1>(data: LabelStyleInterface, toast?: any) {
        const url = 'style/text/add';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LabelStyleInterface>(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast)
        console.log(result, 'addTextStyle response')
        return result
    },
    getItemLabelStyle: async function <T1>(id: number, toast?: any) {
        const url = 'style/text/item';
        type T2 = z.infer<typeof getLabelStyleItemValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getLabelStyleItemValidator, getItemLabelStyleTransformer, undefined, id, toast)
        console.log(result, 'getItemLabelStyle response')
        return result
    },

    uploadSld: async function <T1>(data: FileSld, toast?: any) {
        const url = 'style/file/add';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, FileSld>(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast,true)
        console.log(result, 'uploadSld response')
        return result
    },
    editUploadSld: async function <T1>(data: FileSld,id:number, toast?: any) {
        const url = 'style/file/update';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, FileSld>(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast,true)
        console.log(result, 'uploadSld response')
        return result
    },

    deleteTextStyle: async function <T1>(id: number, toast?: any) {
        const url = 'style/text/delete';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteTextStyle response')
        return result
    },
    editTextStyle: async function <T1>(data: LabelStyleInterface,id: number, toast?: any) {
        const url = 'style/text/update';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, LabelStyleInterface>(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast)
        console.log(result, 'editBaseTextStyle response')
        return result
    },

    getListFilterTypes: async function <T1>(toast?: any) {
        const url = 'style/filter/type';
        type T2 = z.infer<typeof getFilterTypeListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getFilterTypeListValidator, getFilterTypeListTransformer, undefined, undefined, toast)
        console.log(result, 'getListFilterTypes response')
        return result
    },
    getListFilterOperators: async function <T1>(toast?: any) {
        const url = 'style/filter/operators';
        type T2 = z.infer<typeof getFilterOperatorsListValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getFilterOperatorsListValidator, getFilterOperatorListTransformer, undefined, undefined, toast)
        console.log(result, 'getListFilterOperators response')
        return result
    },
    //-------------------------------------------------------------------------------------//
    addAdvanceModelStyle: async function <T1>(data: AdvanceStyle, toast?: any) {
        const url = 'style/advance/add';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, AdvanceStyle>(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast)
        console.log(result, 'addAdvanceModelStyle response')
        return result
    },
    editAdvanceModelStyle: async function <T1>(data: AdvanceStyle,id: number, toast?: any) {
        const url = 'style/advance/update';
        type T2 = z.infer<typeof saveStyleValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, AdvanceStyle>(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast)
        console.log(result, 'editAdvanceModelStyle response')
        return result
    },
    getItemAdvanceStyle: async function <T1>(id: number, toast?: any) {
        const url = 'style/advance/item';
        type T2 = z.infer<typeof getItemAdvanceValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2>(url, 'get', getItemAdvanceValidator, getItemAdvanceStyleTransformer, undefined, id, toast)
        console.log(result, 'getItemAdvanceStyle response')
        return result
    },

    //-------------------------------------------------------------------------------------//
    setStyleToLayer: async function <T1>(data: SetStyleToLayerSd, toast?: any) {
        const url = 'style/addLayerStyle';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, SetStyleToLayerSd>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'addTextStyle response')
        return result
    },


} as route