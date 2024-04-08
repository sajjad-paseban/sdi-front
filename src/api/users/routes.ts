import {MyApiResponse, sendRequest} from "@/api/config";
import {z} from "zod";


import {AddUserSd} from "@/api/users/SD.Models/addUser.sd";
import {addUserValidator} from "@/api/users/validations/addUser.vd";
import {addUserTransformer} from "@/api/users/transformers/addUser.tf";
import {GetUsersSd} from "@/api/users/SD.Models/getUsers.sd";
import {getUsersValidator} from "@/api/users/validations/getUsers.vd";


import {getUsersTransformer} from "@/api/users/transformers/getUsers.tf";
import {getUserByUserNameTransformer} from "@/api/users/transformers/getUserByUserName.tf";
import {getUserByUserNameValidator} from "@/api/users/validations/getUserByUserName.vd";
import {deleteUserTransformer} from "@/api/users/transformers/deleteUser.tf";
import {deleteUserValidator} from "@/api/users/validations/deleteUser.vd";
import {DeleteUserSd} from "@/api/users/SD.Models/deleteUser.sd";


interface route {


    addUser: <T1>(data:AddUserSd, toast: any) => Promise<MyApiResponse<T1>>;
    getUsers: <T1>( toast: any) => Promise<MyApiResponse<T1>>;
    getUserByUserName: <T1>(data:GetUsersSd, toast: any) => Promise<MyApiResponse<T1>>;
    deleteUser:<T1>(data:DeleteUserSd, toast: any) => Promise<MyApiResponse<T1>>;
}

export default {



    addUser:async function <T1>(data:AddUserSd, toast?: any) {
        const url = 'user/user';
        type T2 = z.infer<typeof addUserValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post',addUserValidator , addUserTransformer, data, toast)
        console.log(result, 'addUser response')
        return result

    },
    getUsers: async function <T1>(toast?: any) {
        const url = 'user/user';
        type T2 = z.infer<typeof getUsersValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getUsersValidator, getUsersTransformer, undefined, toast)
        console.log(result, 'getUsers response')
        return result
    },

    getUserByUserName: async function <T1>(data:GetUsersSd,toast?: any) {
        const url = 'user/user';
        type T2 = z.infer<typeof getUserByUserNameValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getUserByUserNameValidator, getUserByUserNameTransformer, data, toast)
        console.log(result, 'getUserById response')
        return result
    },

    deleteUser: async function <T1>(data:DeleteUserSd,toast?: any) {
        const url = 'user/deleteUser';
        type T2 = z.infer<typeof deleteUserValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', deleteUserValidator, deleteUserTransformer, data, toast)
        console.log(result, 'deleteUser response')
        return result
    },



} as route

