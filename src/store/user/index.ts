import {Module} from "vuex";
import {UserStates} from "@/store/user/types";
import {RootState} from "@/store/types";
import {getters} from "@/store/user/getters";
import {mutations} from "@/store/user/mutations";
import {actions} from "@/store/user/actions";


const state: UserStates = {
    first_name: "",
    image: '',
    is_active: false,
    jwt: {access: "", expire: 0},
    last_name: "",
    role: {
        is_admin: false,
        is_active: false,
        is_superuser: false,
        access: [],
        accessRoutes:[],
        accessApis:[]

    },
    user_name: ""
}


export const user: Module<UserStates, RootState> = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}