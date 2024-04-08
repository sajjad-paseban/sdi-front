import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import Api from "@/api/logs/routes";
import {default as Api2} from "@/api/jwt/routes";
import {LoggedUserInterface, LogsInterface, MassageLogs} from "@/models/Logs.interface";
import {ref} from "vue";
import {LogoutManuallyUserSd} from "@/api/jwt/SD.Models/logoutManuallyUser.sd";
import {StoreActions} from "@/store";


export default function logs() {

    const toast = useToast()
    const store = useStore()

    const RequestLogs = ref<LogsInterface[]>([])
    const loggedUsers = ref<LoggedUserInterface[]>([])

    const getLogs = async () => {
        const response = await Api.getLogs<LogsInterface[]>(toast)
        if (response.result) {
            RequestLogs.value = response.result
            return response.result
        }
    }

    const getLoggedUserView = async () => {
        const response = await Api2.getLoggedUserView<LoggedUserInterface[]>(toast)
        if (response.result) {
            loggedUsers.value = response.result
            return response.result
        }
    }

    const logoutManuallyUser = async (data: LogoutManuallyUserSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api2.logoutManuallyUser<MassageLogs>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    return {
        getLogs, RequestLogs, getLoggedUserView, loggedUsers,logoutManuallyUser
    }
}