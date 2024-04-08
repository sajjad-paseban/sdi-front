import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/users/routes";
import {AddUserSd} from "@/api/users/SD.Models/addUser.sd";
import {UserInterface, usersObject} from "@/models/User.interface";
import {ref} from "vue";
import {GetUsersSd} from "@/api/users/SD.Models/getUsers.sd";
import {DeleteRoleSd} from "@/api/roles/SD.Models/deleteRole.sd";
import {MassageRoles} from "@/models/Role.interface";
import {DeleteUserSd} from "@/api/users/SD.Models/deleteUser.sd";

export default function users() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const usersList = ref<usersObject[]>()
    const user = ref<UserInterface>()

    const addUserAction = async (data: AddUserSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addUser(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            router.push({name: 'mangeUsersList'})
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'کاربر اضافه شد '
            });

        }
    }

    const getUsers = async () => {
        const response = await Api.getUsers<usersObject[]>(toast)
        if (response.result) {
            usersList.value = response.result
            return response.result
        }
    }

    const getUserByUserName = async (data: GetUsersSd) => {
        const response = await Api.getUserByUserName<UserInterface>(data, toast)
        if (response.result) {
            user.value = response.result
        }
    }

    const deleteUser = async (data: DeleteUserSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteUser<MassageRoles>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'کاربر حذف شد '
            });
            return true
        } else {
            return false
        }
    }

    return {
        addUserAction, getUsers, usersList, user, getUserByUserName,deleteUser
    }
}