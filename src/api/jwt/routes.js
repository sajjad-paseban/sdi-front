import { sendRequest } from "../config";
import { loginValidator } from "@/api/jwt/validations/login.vd";
import { loginTransformer } from "@/api/jwt/transformers/login.tf";
import { addJWTValidator } from "@/api/jwt/validations/addJWT.vd";
import { addJWTTransformer } from "@/api/jwt/transformers/addJWT.tf";
import { keysValidator } from "@/api/jwt/validations/getKeys.vd";
import { getKeysTransformer } from "@/api/jwt/transformers/getKeys.tf";
import { getKeyByIdTransformer } from "@/api/jwt/transformers/getKeyById.tf";
import { getKeyByIdValidator } from "@/api/jwt/validations/getKeyById.vd";
import { deleteJWTTransformer } from "@/api/jwt/transformers/deleteJWT.tf";
import { deleteJWTValidator } from "@/api/jwt/validations/deleteJWT.vd";
import { loggedUserValidator } from "@/api/jwt/validations/loggedUser.vd";
import { loggedUserTransformer } from "@/api/jwt/transformers/loggedUser.tf";
import { logoutManuallyUserTransformer } from "@/api/jwt/transformers/logoutManuallyUser.tf";
import { logoutManuallyUserValidator } from "@/api/jwt/validations/logoutManuallyUser.vd";
export default {
    login: async function (data, toast) {
        const url = 'jwt/login';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', loginValidator, loginTransformer, data, toast);
        console.log(result, 'login response');
        return result;
    },
    updateToken: async function (data, toast) {
        const url = 'jwt/updateToken';
        const result = await sendRequest(url, 'post', loginValidator, loginTransformer, data, toast);
        console.log(result, 'updateToken response');
        return result;
    },
    addStaticJwt: async function (data, toast) {
        const url = 'jwt/staticJWTView';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', addJWTValidator, addJWTTransformer, data, toast);
        console.log(result, 'addStaticJwt response');
        return result;
    },
    getKeys: async function (toast) {
        const url = 'jwt/staticJWTView';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', keysValidator, getKeysTransformer, undefined, toast);
        console.log(result, 'getKeys response');
        return result;
    },
    getKeyById: async function (data, toast) {
        const url = 'jwt/staticJWTView';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getKeyByIdValidator, getKeyByIdTransformer, data, toast);
        console.log(result, 'getKeyById response');
        return result;
    },
    deleteJWT: async function (data, toast) {
        const url = 'jwt/deleteStaticJWT';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', deleteJWTValidator, deleteJWTTransformer, data, toast);
        console.log(result, 'deleteJWT response');
        return result;
    },
    getLoggedUserView: async function (toast) {
        const url = 'jwt/loggedUserView';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', loggedUserValidator, loggedUserTransformer, undefined, toast);
        console.log(result, 'getLoggedUserView response');
        return result;
    },
    logoutManuallyUser: async function (data, toast) {
        const url = 'jwt/logoutManually';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', logoutManuallyUserValidator, logoutManuallyUserTransformer, data, toast);
        console.log(result, 'deleteJWT response');
        return result;
    },
    getUserInfo: async function (toast) {
        const url = 'jwt/getUserInfo';
        const result = await sendRequest(url, 'get', loginValidator, loginTransformer, undefined, toast);
        console.log(result, 'getUserInfo response');
        return result;
    },
    logout: async function (toast) {
        const url = 'jwt/logout';
        const result = await sendRequest(url, 'get', undefined, undefined, undefined, toast);
        console.log(result, 'logout response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map