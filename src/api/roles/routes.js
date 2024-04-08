import { sendRequest } from "@/api/config";
import { getRolesWithParentNameValidator } from "@/api/roles/validations/getRolesWithParentName.vd";
import { getRolesWithParentNameTransformer } from "@/api/roles/transformers/getRolesWithParentName.tf";
import { addRoleTransformer } from "@/api/roles/transformers/addRole.tf";
import { addRoleValidator } from "@/api/roles/validations/addRole.vd";
import { editRoleAccessValidator } from "@/api/roles/validations/editRoleAccess.vd";
import { editRoleAccessTransformer } from "@/api/roles/transformers/editRoleAccess.tf";
import { getRolesByIdValidator } from "@/api/roles/validations/getRoleById.vd";
import { getRolesByIdTransformer } from "@/api/roles/transformers/getRoleById.tf";
import { deleteRoleTransformer } from "@/api/roles/transformers/deleteRole.tf";
import { deleteRoleValidator } from "@/api/roles/validations/deleteRole.vd";
import { getRolesTreeValidator } from "@/api/roles/validations/getRolesTree.vd";
import { getRolesTreeTransformer } from "@/api/roles/transformers/getRolesTree.tf";
export default {
    getRolesWithParentName: async function (toast) {
        const url = 'access/getUserRoles';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getRolesWithParentNameValidator, getRolesWithParentNameTransformer, undefined, toast);
        console.log(result, 'getRolesWithParentName response');
        return result;
    },
    addRole: async function (data, toast) {
        const url = 'user/role';
        const result = await sendRequest(url, 'post', addRoleValidator, addRoleTransformer, data, toast);
        console.log(result, 'addRole response');
        return result;
    },
    editRoleAccess: async function (data, toast) {
        const url = 'user/editRoleAccess';
        const result = await sendRequest(url, 'post', editRoleAccessValidator, editRoleAccessTransformer, data, toast);
        console.log(result, 'editRoleAccess response');
        return result;
    },
    getRolesById: async function (data, toast) {
        const url = 'user/getRolesWithParentName';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getRolesByIdValidator, getRolesByIdTransformer, data, toast);
        console.log(result, 'getRolesById response');
        return result;
    },
    deleteRole: async function (data, toast) {
        const url = 'user/deleteRole';
        const result = await sendRequest(url, 'post', deleteRoleValidator, deleteRoleTransformer, data, toast);
        console.log(result, 'deleteRole response');
        return result;
    },
    getRolesTree: async function (toast) {
        const url = 'user/getAllRolesTree';
        //     //T1:تایپ دیتای خروجی مورد نظر ما
        //     //T2:تایپ دیتای خروجی از بکند
        //     //T3:تایپ دیتای ارسالی به بکند
        const result = await sendRequest(url, 'get', getRolesTreeValidator, getRolesTreeTransformer, undefined, toast);
        console.log(result, 'getRolesTree response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map