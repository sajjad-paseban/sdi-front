import {ref, onMounted} from 'vue';
import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import Api from "@/api/roles/routes";

import {MassageRoles, Role, RolesWithParentName, TreeRole} from "@/models/Role.interface";
import {useRouter} from "vue-router";
import {EditRoleAccessSDModel} from "@/api/roles/SD.Models/editRoleAccess.sd";
import {StoreActions} from "@/store";
import {getRoleByIdSDModel} from "@/api/roles/SD.Models/getRoleById.sd";
import {DeleteRoleSd} from "@/api/roles/SD.Models/deleteRole.sd";

export default function role() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const editRole = ref<Role>()
    const rolesWithParentName = ref<RolesWithParentName[]>([])
    const rolesTree= ref<TreeRole[]>()

    const getRolesWithParentName = async () => {
        const response = await Api.getRolesWithParentName<RolesWithParentName[]>(toast)
        if (response.result) {
            rolesWithParentName.value = response.result
            return response.result
        }
    }

    const addRoleAction = async (role: Role) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addRole<MassageRoles>(role, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            router.push({name: 'manageRolesList'})
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'نقش اضافه شد '
            });

        }
    }

    const editRoleAccess = async (data: EditRoleAccessSDModel) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editRoleAccess<MassageRoles>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const getRolesById = async (data: getRoleByIdSDModel) => {
        const response = await Api.getRolesById<Role>(data, toast)
        if (response.result) {
            editRole.value = response.result
        }
    }

    const deleteRole = async (data: DeleteRoleSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteRole<MassageRoles>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'نقش حذف شد '
            });
            return true
        } else {
            return false
        }
    }

    const getRolesTree = async () => {
        const response = await Api.getRolesTree<TreeRole[]>(toast)
        if (response.result) {
            rolesTree.value = response.result
            return response.result
        }
    }


    return {
        getRolesWithParentName, rolesWithParentName, addRoleAction, editRoleAccess, editRole, getRolesById,deleteRole,rolesTree,getRolesTree
    }
}