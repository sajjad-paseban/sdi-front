import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
import Api from "@/api/users/routes";
import { ref } from "vue";
export default function users() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const usersList = ref();
    const user = ref();
    const addUserAction = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addUser(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            router.push({ name: 'mangeUsersList' });
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'کاربر اضافه شد '
            });
        }
    };
    const getUsers = async () => {
        const response = await Api.getUsers(toast);
        if (response.result) {
            usersList.value = response.result;
            return response.result;
        }
    };
    const getUserByUserName = async (data) => {
        const response = await Api.getUserByUserName(data, toast);
        if (response.result) {
            user.value = response.result;
        }
    };
    const deleteUser = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteUser(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'کاربر حذف شد '
            });
            return true;
        }
        else {
            return false;
        }
    };
    return {
        addUserAction, getUsers, usersList, user, getUserByUserName, deleteUser
    };
}
//# sourceMappingURL=user_functions.js.map