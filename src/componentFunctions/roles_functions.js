import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import Api from "@/api/roles/routes";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
export default function role() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const editRole = ref();
    const rolesWithParentName = ref([]);
    const rolesTree = ref();
    const getRolesWithParentName = async () => {
        const response = await Api.getRolesWithParentName(toast);
        if (response.result) {
            rolesWithParentName.value = response.result;
            return response.result;
        }
    };
    const addRoleAction = async (role) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addRole(role, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            router.push({ name: 'manageRolesList' });
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'نقش اضافه شد '
            });
        }
    };
    const editRoleAccess = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editRoleAccess(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    const getRolesById = async (data) => {
        const response = await Api.getRolesById(data, toast);
        if (response.result) {
            editRole.value = response.result;
        }
    };
    const deleteRole = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteRole(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'نقش حذف شد '
            });
            return true;
        }
        else {
            return false;
        }
    };
    const getRolesTree = async () => {
        const response = await Api.getRolesTree(toast);
        if (response.result) {
            rolesTree.value = response.result;
            return response.result;
        }
    };
    return {
        getRolesWithParentName, rolesWithParentName, addRoleAction, editRoleAccess, editRole, getRolesById, deleteRole, rolesTree, getRolesTree
    };
}
//# sourceMappingURL=roles_functions.js.map