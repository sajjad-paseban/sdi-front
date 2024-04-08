import {GetterTree} from "vuex";
import {UserStates} from "@/store/user/types";
import {RootState} from "@/store/types";

export const getters: GetterTree<UserStates,RootState>={
    getUserAccess(state):boolean{

        const access = state.role.access
        console.log(access,'access of user')

        return true
    },

    getUser(state):UserStates{

        return state
    },

    getExpire(state):number{
        return  state.jwt.expire
    }
}