import { sendRequest } from "@/api/config";
import { addBaseMapValidator } from "@/api/baseMap/validations/addBaseMap.vd";
import { addBaseMapTransformer } from "@/api/baseMap/transformers/addBaseMap.tf";
import { getBaseMapsValidator } from "@/api/baseMap/validations/getBaseMaps.vd";
import { getBaseMapsTransformer } from "@/api/baseMap/transformers/getBaseMaps.tf";
import { deleteBaseMapValidator } from "@/api/baseMap/validations/deleteBaseMap.vd";
import { deleteBaseMapTransformer } from "@/api/baseMap/transformers/deleteBaseMap.tf";
import { getEditBaseMapValidator } from "@/api/baseMap/validations/editBaseMap.vd";
import { getEditBaseMapTransformer } from "@/api/baseMap/transformers/editBaseMap.tf";
export default {
    addBaseMap: async function (data, toast) {
        return;
        const url = 'baseMap/baseMap';
        const result = await sendRequest(url, 'post', addBaseMapValidator, addBaseMapTransformer, data, toast);
        console.log(result, 'addBaseMap response');
        return result;
    },
    getBaseMaps: async function (toast) {
        return;
        const url = 'baseMap/baseMap';
        const result = await sendRequest(url, 'get', getBaseMapsValidator, getBaseMapsTransformer, undefined, toast);
        console.log(result, 'getBaseMaps response');
        return result;
    },
    deleteBaseMaps: async function (data, toast) {
        const url = 'baseMap/deleteBaseMap';
        const result = await sendRequest(url, 'post', deleteBaseMapValidator, deleteBaseMapTransformer, data, toast);
        console.log(result, 'deleteBaseMaps response');
        return result;
    },
    getEditBaseMap: async function (data, toast) {
        const url = 'baseMap/editBaseMap';
        const result = await sendRequest(url, 'get', getEditBaseMapValidator, getEditBaseMapTransformer, data, toast);
        console.log(result, 'getEditBaseMap response');
        return result;
    },
    editBaseMap: async function (data, toast) {
        const url = 'baseMap/editBaseMap';
        const result = await sendRequest(url, 'post', addBaseMapValidator, addBaseMapTransformer, data, toast);
        console.log(result, 'editBaseMap response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map