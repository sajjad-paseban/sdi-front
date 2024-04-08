import {MyApiResponse, sendRequest} from "@/api/config";
import {z} from "zod";

import {getRolesWithParentNameValidator} from "@/api/roles/validations/getRolesWithParentName.vd";
import {getRolesWithParentNameTransformer} from "@/api/roles/transformers/getRolesWithParentName.tf";

import {Role} from "@/models/Role.interface";

import {addRoleTransformer} from "@/api/roles/transformers/addRole.tf";
import {addRoleValidator} from "@/api/roles/validations/addRole.vd";
import {editRoleAccessValidator} from "@/api/roles/validations/editRoleAccess.vd";
import {editRoleAccessTransformer} from "@/api/roles/transformers/editRoleAccess.tf";
import {EditRoleAccessSDModel} from "@/api/roles/SD.Models/editRoleAccess.sd";
import {getRolesByIdValidator} from "@/api/roles/validations/getRoleById.vd";
import {getRolesByIdTransformer} from "@/api/roles/transformers/getRoleById.tf";
import {getRoleByIdSDModel} from "@/api/roles/SD.Models/getRoleById.sd";
import {deleteRoleTransformer} from "@/api/roles/transformers/deleteRole.tf";
import {deleteRoleValidator} from "@/api/roles/validations/deleteRole.vd";
import {DeleteRoleSd} from "@/api/roles/SD.Models/deleteRole.sd";

import {getRolesTreeValidator} from "@/api/roles/validations/getRolesTree.vd";
import {getRolesTreeTransformer} from "@/api/roles/transformers/getRolesTree.tf";


interface route {

    getRolesWithParentName: <T1>(toast: any) => Promise<MyApiResponse<T1>>;
    getRolesById: <T1>(data:getRoleByIdSDModel,toast: any) => Promise<MyApiResponse<T1>>;
    addRole: <T1>(data:Role, toast: any) => Promise<MyApiResponse<T1>>;
    editRoleAccess: <T1>(data:EditRoleAccessSDModel, toast: any) => Promise<MyApiResponse<T1>>;
    deleteRole: <T1>(data:DeleteRoleSd, toast: any) => Promise<MyApiResponse<T1>>;
    getRolesTree: <T1>(toast: any) => Promise<MyApiResponse<T1>>;

}

export default {

    getRolesWithParentName: async function <T1>(toast?: any) {
        const url = 'access/getUserRoles';
        type T2 = z.infer<typeof getRolesWithParentNameValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getRolesWithParentNameValidator, getRolesWithParentNameTransformer, undefined, toast)
        console.log(result, 'getRolesWithParentName response')
        return result

    },

    addRole:async function <T1>(data:Role, toast?: any) {
        const url = 'user/role';
        type T2 = z.infer<typeof addRoleValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post',addRoleValidator , addRoleTransformer, data, toast)
        console.log(result, 'addRole response')
        return result

    },

    editRoleAccess:async function <T1>(data:EditRoleAccessSDModel, toast?: any) {
        const url = 'user/editRoleAccess';
        type T2 = z.infer<typeof editRoleAccessValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post',editRoleAccessValidator , editRoleAccessTransformer, data, toast)
        console.log(result, 'editRoleAccess response')
        return result

    },

    getRolesById : async function <T1>(data:getRoleByIdSDModel,toast?: any) {
        const url = 'user/getRolesWithParentName';
        type T2 = z.infer<typeof getRolesByIdValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getRolesByIdValidator, getRolesByIdTransformer, data, toast)
        console.log(result, 'getRolesById response')
        return result

    },

    deleteRole:async function <T1>(data:DeleteRoleSd,toast?: any) {
        const url = 'user/deleteRole';
        type T2 = z.infer<typeof deleteRoleValidator>;

        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'post', deleteRoleValidator, deleteRoleTransformer, data, toast)
        console.log(result, 'deleteRole response')
        return result

    },

    getRolesTree: async function <T1>(toast?: any) {
        const url = 'user/getAllRolesTree';
        type T2 = z.infer<typeof getRolesTreeValidator>;
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await sendRequest<T1, T2>(url, 'get', getRolesTreeValidator, getRolesTreeTransformer, undefined, toast)
        console.log(result, 'getRolesTree response')
        return result

    },

} as route

