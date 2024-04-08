import {ActionTree} from "vuex";
import {UserStates} from "@/store/user/types";
import {RootState} from "@/store/types";
import {UserMutations} from "@/store/user/mutations";
import {RouteLocationNormalized} from "vue-router";
import {useToast} from "primevue/usetoast";
import router from "@/router";
import store from "..";


export enum UserActions {
    CHECK_ACCESS = 'CHECK_ACCESS',
    CHECK_USER = 'CHECK_USER'
}

export const actions: ActionTree<UserStates, RootState> = {

    [UserActions.CHECK_ACCESS](context, to: RouteLocationNormalized): boolean {
        let fullPath = to.fullPath

        const route = to.matched[(to.matched.length) - 1]
        fullPath = route.path
        const res: boolean = context.state.role.accessRoutes.indexOf(fullPath) > -1
        if (!res) {
            console.log(to, 'به این صفحه دسترسی ندارید')
            console.log(to.fullPath, 'به این صفحه دسترسی ندارید')


        }
        return res
    },

    [UserActions.CHECK_USER]({commit}): boolean {
        //-----set user from localstorage---//
        const user = localStorage.getItem('USER')

        if (typeof user === 'string') {
            const userData: UserStates = JSON.parse(user)

            const now = Number(new Date()) / 1000
            if ((userData.jwt.expire - now) > 0) {
                console.log(userData, 'user exist in local')

                commit(UserMutations.SET_USER, userData)

                return true
            } else {
                try {
                    const toast = useToast()
                    toast.add({group: 'br', life: 5000, severity: 'error', summary: ' خطا', detail: 'توکن منقضی شده است'});
                }catch (e) {
                    window.alert('توکن منقضی شده است')
                }

                router.push({name: 'login'})
            }


        }
        return false
    }


}