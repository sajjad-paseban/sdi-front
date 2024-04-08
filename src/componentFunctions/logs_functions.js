import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import Api from "@/api/logs/routes";
import { default as Api2 } from "@/api/jwt/routes";
import { ref } from "vue";
import { StoreActions } from "@/store";
export default function logs() {
    const toast = useToast();
    const store = useStore();
    const RequestLogs = ref([]);
    const loggedUsers = ref([]);
    const getLogs = async () => {
        const response = await Api.getLogs(toast);
        if (response.result) {
            RequestLogs.value = response.result;
            return response.result;
        }
    };
    const getLoggedUserView = async () => {
        const response = await Api2.getLoggedUserView(toast);
        if (response.result) {
            loggedUsers.value = response.result;
            return response.result;
        }
    };
    const logoutManuallyUser = async (data) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api2.logoutManuallyUser(data, toast);
        store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    return {
        getLogs, RequestLogs, getLoggedUserView, loggedUsers, logoutManuallyUser
    };
}
//# sourceMappingURL=logs_functions.js.map