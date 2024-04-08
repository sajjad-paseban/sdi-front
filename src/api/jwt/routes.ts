import Api, {MyApiResponse, sendRequest} from "../config";
import LoginSdModel from "@/api/jwt/SD.Models/login.sd.model";
import {loginValidator} from "@/api/jwt/validations/login.vd";
import {z} from "zod";
import {loginTransformer} from "@/api/jwt/transformers/login.tf";
import UpdateTokenSdModel from "@/api/jwt/SD.Models/updateToken.sd.model";
import {addJWTValidator} from "@/api/jwt/validations/addJWT.vd";
import {addJWTTransformer} from "@/api/jwt/transformers/addJWT.tf";
import {GetKeyById, StaticJWTInterface, TableStaticJWTInterface} from "@/models/staticJWT.interface";
import {keysValidator} from "@/api/jwt/validations/getKeys.vd";
import {getKeysTransformer} from "@/api/jwt/transformers/getKeys.tf";
import {getKeyByIdTransformer} from "@/api/jwt/transformers/getKeyById.tf";
import {getKeyByIdValidator} from "@/api/jwt/validations/getKeyById.vd";
import {GetKeyByIdSd} from "@/api/jwt/SD.Models/getKeyById.sd";
import {deleteJWTTransformer} from "@/api/jwt/transformers/deleteJWT.tf";
import {deleteJWTValidator} from "@/api/jwt/validations/deleteJWT.vd";
import {DeleteJWTSd} from "@/api/jwt/SD.Models/deleteJWT.sd";
import {loggedUserValidator} from "@/api/jwt/validations/loggedUser.vd";
import {loggedUserTransformer} from "@/api/jwt/transformers/loggedUser.tf";
import {logoutManuallyUserTransformer} from "@/api/jwt/transformers/logoutManuallyUser.tf";
import {logoutManuallyUserValidator} from "@/api/jwt/validations/logoutManuallyUser.vd";
import {LogoutManuallyUserSd} from "@/api/jwt/SD.Models/logoutManuallyUser.sd";

interface route {

    updateToken: <T1>(data?: UpdateTokenSdModel, toast?: any) => Promise<MyApiResponse<T1>>;
    login: <T1>(data?: LoginSdModel, toast?: any) => Promise<MyApiResponse<T1>>;
    addStaticJwt: <T1>(data?: StaticJWTInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getKeys: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getKeyById: <T1>(data?: GetKeyByIdSd, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteJWT: <T1>(data?: DeleteJWTSd, toast?: any) => Promise<MyApiResponse<T1>>;
    getLoggedUserView: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    logoutManuallyUser: <T1>(data?: LogoutManuallyUserSd, toast?: any) => Promise<MyApiResponse<T1>>;
    getUserInfo: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    logout: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;


}

export default {


    login: async function <T1>(data?: LoginSdModel, toast?: any) {
        const url = 'jwt/login';
        type T2 = z.infer<typeof loginValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, LoginSdModel>(url, 'post', loginValidator, loginTransformer, data, toast)
        console.log(result, 'login response')
        return result

    },

    updateToken: async function <T1>(data?: UpdateTokenSdModel, toast?: any) {
        const url = 'jwt/updateToken';
        type T2 = z.infer<typeof loginValidator>;
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, UpdateTokenSdModel>(url, 'post', loginValidator, loginTransformer, data, toast)
        console.log(result, 'updateToken response')
        return result
    },

    addStaticJwt: async function <T1>(data?: StaticJWTInterface, toast?: any) {
        const url = 'jwt/staticJWTView';
        type T2 = z.infer<typeof addJWTValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, StaticJWTInterface>(url, 'post', addJWTValidator, addJWTTransformer, data, toast)
        console.log(result, 'addStaticJwt response')
        return result
    },

    getKeys: async function <T1>(toast?: any) {
        const url = 'jwt/staticJWTView';
        type T2 = z.infer<typeof keysValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, TableStaticJWTInterface[]>(url, 'get', keysValidator, getKeysTransformer, undefined, toast)
        console.log(result, 'getKeys response')
        return result
    },

    getKeyById: async function <T1>(data?: GetKeyByIdSd, toast?: any) {
        const url = 'jwt/staticJWTView';
        type T2 = z.infer<typeof getKeyByIdValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, GetKeyByIdSd>(url, 'get', getKeyByIdValidator, getKeyByIdTransformer, data, toast)
        console.log(result, 'getKeyById response')
        return result
    },

    deleteJWT: async function <T1>(data?: DeleteJWTSd, toast?: any) {
        const url = 'jwt/deleteStaticJWT';
        type T2 = z.infer<typeof deleteJWTValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, DeleteJWTSd>(url, 'post', deleteJWTValidator, deleteJWTTransformer, data, toast)
        console.log(result, 'deleteJWT response')
        return result
    },

    getLoggedUserView: async function <T1>(toast?: any) {
        const url = 'jwt/loggedUserView';
        type T2 = z.infer<typeof loggedUserValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, TableStaticJWTInterface[]>(url, 'get', loggedUserValidator, loggedUserTransformer, undefined, toast)
        console.log(result, 'getLoggedUserView response')
        return result
    },

    logoutManuallyUser: async function <T1>(data?: LogoutManuallyUserSd, toast?: any) {
        const url = 'jwt/logoutManually';
        type T2 = z.infer<typeof logoutManuallyUserValidator>;

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, LogoutManuallyUserSd>(url, 'post', logoutManuallyUserValidator, logoutManuallyUserTransformer, data, toast)
        console.log(result, 'deleteJWT response')
        return result
    },

    getUserInfo: async function <T1>(toast?: any) {
        const url = 'jwt/getUserInfo';
        type T2 = z.infer<typeof loginValidator>;
        const result: MyApiResponse<T1> = await sendRequest<T1, T2, undefined>(url, 'get', loginValidator, loginTransformer, undefined, toast)
        console.log(result, 'getUserInfo response')
        return result
    },

    logout: async function <T1>(toast?: any) {
        const url = 'jwt/logout';
        const result: MyApiResponse<T1> = await sendRequest<T1, undefined, undefined>(url, 'get', undefined, undefined, undefined, toast)
        console.log(result, 'logout response')
        return result
    },

} as route

