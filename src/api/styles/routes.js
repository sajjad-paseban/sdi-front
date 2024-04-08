import { newSendRequest } from "../config";
import { getBaseStyleItemValidator } from "@/api/styles/validations/getItemBaseStyle.vd";
import { getItemBaseStyleTransformer } from "@/api/styles/transformers/getItemBaseStyle.tf";
import { getListBaseStyleValidator } from "@/api/styles/validations/getListBaseStyle.vd";
import { getListBaseStyleTransformer } from "@/api/styles/transformers/getListBaseStyle.tf";
import { getStylePatternValidator } from "@/api/styles/validations/getStylePattern.vd";
import { getStylePatternTransformer } from "@/api/styles/transformers/getStylePattern.tf";
import { saveStyleValidator } from "@/api/styles/validations/saveStyle.vd";
import { saveStyleTransformer } from "@/api/styles/transformers/saveStyle.tf";
import { getFontsListValidator } from "@/api/styles/validations/getFontsList.vd";
import { getFontsListTransformer } from "@/api/styles/transformers/getFontsList.tf";
import { getFontStylesTransformer } from "@/api/styles/transformers/getFontStyles.tf";
import { getFontStylesValidator } from "@/api/styles/validations/getFontStyles.vd";
import { getFontsWightsTransformer } from "@/api/styles/transformers/getFontsWights.tf";
import { getFontsWightsValidator } from "@/api/styles/validations/getFontsWights.vd";
import { getItemLabelStyleTransformer } from "@/api/styles/transformers/getItemLabelStyle.tf";
import { getLabelStyleItemValidator } from "@/api/styles/validations/getItemLabelStyle.vd";
import { getFilterTypeListTransformer } from "@/api/styles/transformers/getFilterTypeList.tf";
import { getFilterTypeListValidator } from "@/api/styles/validations/getFilterTypesList.vd";
import { getFilterOperatorListTransformer } from "@/api/styles/transformers/getFilterOperatorList.tf";
import { getFilterOperatorsListValidator } from "@/api/styles/validations/getFilterOperatorsList.vd";
import { getItemAdvanceValidator } from "@/api/styles/validations/getItemAdvanceStyle.vd";
import { getItemAdvanceStyleTransformer } from "@/api/styles/transformers/getItemAdvanceStyle.tf";
export default {
    getItemBaseStyle: async function (id, toast) {
        const url = 'style/base/item';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getBaseStyleItemValidator, getItemBaseStyleTransformer, undefined, id, toast);
        console.log(result, 'getItemBaseStyle response');
        return result;
    },
    getListBaseStyle: async function (data, toast) {
        const url = 'style/base/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getListBaseStyleValidator, getListBaseStyleTransformer, data, undefined, toast);
        console.log(result, 'getListBaseStyle response');
        return result;
    },
    getLinePattern: async function (toast) {
        const url = 'style/pattern/line';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getStylePatternValidator, getStylePatternTransformer, undefined, undefined, toast);
        console.log(result, 'getLinePattern response');
        return result;
    },
    getPolygonPattern: async function (toast) {
        const url = 'style/pattern/polygon';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getStylePatternValidator, getStylePatternTransformer, undefined, undefined, toast);
        console.log(result, 'getPolygonPattern response');
        return result;
    },
    addBaseModelStyle: async function (data, toast) {
        const url = 'style/base/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast);
        console.log(result, 'addBaseModelStyle response');
        return result;
    },
    deleteBaseStyle: async function (id, toast) {
        const url = 'style/base/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteBaseStyle response');
        return result;
    },
    editBaseModelStyle: async function (data, id, toast) {
        const url = 'style/base/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast);
        console.log(result, 'editBaseModelStyle response');
        return result;
    },
    //-------------------------------------------------------------------------------------//
    getListTextStyle: async function (toast) {
        const url = 'style/text/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getListBaseStyleValidator, getListBaseStyleTransformer, undefined, undefined, toast);
        console.log(result, 'getListTextStyle response');
        return result;
    },
    getListFonts: async function (toast) {
        const url = 'style/fonts/list';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getFontsListValidator, getFontsListTransformer, undefined, undefined, toast);
        console.log(result, 'getListFonts response');
        return result;
    },
    getFontStyles: async function (toast) {
        const url = 'style/fonts/styles';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getFontStylesValidator, getFontStylesTransformer, undefined, undefined, toast);
        console.log(result, 'getFontStyles response');
        return result;
    },
    getFontWights: async function (toast) {
        const url = 'style/fonts/wights';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getFontsWightsValidator, getFontsWightsTransformer, undefined, undefined, toast);
        console.log(result, 'getFontWights response');
        return result;
    },
    addTextStyle: async function (data, toast) {
        const url = 'style/text/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast);
        console.log(result, 'addTextStyle response');
        return result;
    },
    getItemLabelStyle: async function (id, toast) {
        const url = 'style/text/item';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getLabelStyleItemValidator, getItemLabelStyleTransformer, undefined, id, toast);
        console.log(result, 'getItemLabelStyle response');
        return result;
    },
    uploadSld: async function (data, toast) {
        const url = 'style/file/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast, true);
        console.log(result, 'uploadSld response');
        return result;
    },
    editUploadSld: async function (data, id, toast) {
        const url = 'style/file/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast, true);
        console.log(result, 'uploadSld response');
        return result;
    },
    deleteTextStyle: async function (id, toast) {
        const url = 'style/text/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteTextStyle response');
        return result;
    },
    editTextStyle: async function (data, id, toast) {
        const url = 'style/text/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast);
        console.log(result, 'editBaseTextStyle response');
        return result;
    },
    getListFilterTypes: async function (toast) {
        const url = 'style/filter/type';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getFilterTypeListValidator, getFilterTypeListTransformer, undefined, undefined, toast);
        console.log(result, 'getListFilterTypes response');
        return result;
    },
    getListFilterOperators: async function (toast) {
        const url = 'style/filter/operators';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getFilterOperatorsListValidator, getFilterOperatorListTransformer, undefined, undefined, toast);
        console.log(result, 'getListFilterOperators response');
        return result;
    },
    //-------------------------------------------------------------------------------------//
    addAdvanceModelStyle: async function (data, toast) {
        const url = 'style/advance/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', saveStyleValidator, saveStyleTransformer, data, undefined, toast);
        console.log(result, 'addAdvanceModelStyle response');
        return result;
    },
    editAdvanceModelStyle: async function (data, id, toast) {
        const url = 'style/advance/update';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveStyleValidator, saveStyleTransformer, data, id, toast);
        console.log(result, 'editAdvanceModelStyle response');
        return result;
    },
    getItemAdvanceStyle: async function (id, toast) {
        const url = 'style/advance/item';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getItemAdvanceValidator, getItemAdvanceStyleTransformer, undefined, id, toast);
        console.log(result, 'getItemAdvanceStyle response');
        return result;
    },
    //-------------------------------------------------------------------------------------//
    setStyleToLayer: async function (data, toast) {
        const url = 'style/addLayerStyle';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'addTextStyle response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map