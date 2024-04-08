import { UserMutations } from "@/store/user/mutations";
import { useToast } from "primevue/usetoast";
import router from "@/router";
export var UserActions;
(function (UserActions) {
    UserActions["CHECK_ACCESS"] = "CHECK_ACCESS";
    UserActions["CHECK_USER"] = "CHECK_USER";
})(UserActions || (UserActions = {}));
export const actions = {
    [UserActions.CHECK_ACCESS](context, to) {
        let fullPath = to.fullPath;
        const route = to.matched[(to.matched.length) - 1];
        fullPath = route.path;
        const res = context.state.role.accessRoutes.indexOf(fullPath) > -1;
        if (!res) {
            console.log(to, 'به این صفحه دسترسی ندارید');
            console.log(to.fullPath, 'به این صفحه دسترسی ندارید');
        }
        return res;
    },
    [UserActions.CHECK_USER]({ commit }) {
        //-----set user from localstorage---//
        const user = localStorage.getItem('USER');
        if (typeof user === 'string') {
            const userData = JSON.parse(user);
            const now = Number(new Date()) / 1000;
            if ((userData.jwt.expire - now) > 0) {
                console.log(userData, 'user exist in local');
                commit(UserMutations.SET_USER, userData);
                return true;
            }
            else {
                try {
                    const toast = useToast();
                    toast.add({ group: 'br', life: 5000, severity: 'error', summary: ' خطا', detail: 'توکن منقضی شده است' });
                }
                catch (e) {
                    window.alert('توکن منقضی شده است');
                }
                router.push({ name: 'login' });
            }
        }
        return false;
    }
};
//# sourceMappingURL=actions.js.map