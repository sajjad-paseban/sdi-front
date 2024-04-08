import { sendRequest } from "@/api/config";
import { addUserValidator } from "@/api/users/validations/addUser.vd";
import { addUserTransformer } from "@/api/users/transformers/addUser.tf";
import { getUsersValidator } from "@/api/users/validations/getUsers.vd";
import { getUsersTransformer } from "@/api/users/transformers/getUsers.tf";
import { getUserByUserNameTransformer } from "@/api/users/transformers/getUserByUserName.tf";
import { getUserByUserNameValidator } from "@/api/users/validations/getUserByUserName.vd";
import { deleteUserTransformer } from "@/api/users/transformers/deleteUser.tf";
import { deleteUserValidator } from "@/api/users/validations/deleteUser.vd";
export default {
    addUser: async function (data, toast) {
        const url = 'user/user';
        const result = await sendRequest(url, 'post', addUserValidator, addUserTransformer, data, toast);
        console.log(result, 'addUser response');
        return result;
    },
    getUsers: async function (toast) {
        const url = 'user/user';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getUsersValidator, getUsersTransformer, undefined, toast);
        console.log(result, 'getUsers response');
        return result;
    },
    getUserByUserName: async function (data, toast) {
        const url = 'user/user';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getUserByUserNameValidator, getUserByUserNameTransformer, data, toast);
        console.log(result, 'getUserById response');
        return result;
    },
    deleteUser: async function (data, toast) {
        const url = 'user/deleteUser';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'post', deleteUserValidator, deleteUserTransformer, data, toast);
        console.log(result, 'deleteUser response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map