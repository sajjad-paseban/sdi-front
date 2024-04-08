import { setHeader } from "@/api/config";
import { default as Router } from '@/router/index';
export var UserMutations;
(function (UserMutations) {
    UserMutations["SET_USERNAME"] = "SET_USERNAME";
    UserMutations["SET_USER"] = "SET_USER";
    UserMutations["CLEAR_USER"] = "CLEAR_USER";
})(UserMutations || (UserMutations = {}));
// function setAccessApis(access:Access[]) {
//
// }
function setAccessRoutes(access, accessRouts) {
    if (access.parent) {
        const parentRoute = setAccessRoutes(access.parent, accessRouts);
        let path = access.e_name;
        Router.getRoutes().map((route) => {
            if (route.name === access.e_name) {
                path = route.path;
            }
        });
        const route = path;
        if (accessRouts.indexOf(route) === -1) {
            accessRouts.push(route);
        }
        return route;
    }
    else {
        let route = '';
        if (access.e_name == 'home') {
            route = '/';
        }
        else {
            route = `/${access.e_name}`;
        }
        if (accessRouts.indexOf(route) === -1) {
            accessRouts.push(route);
        }
        return '';
    }
}
export const mutations = {
    [UserMutations.SET_USERNAME](state, payload) {
        state.user_name = payload;
    },
    [UserMutations.CLEAR_USER](state) {
        state = {
            first_name: "",
            image: '',
            is_active: false,
            jwt: { access: "", expire: 0 },
            last_name: "",
            role: {
                is_admin: false,
                is_active: false,
                is_superuser: false,
                access: [],
                accessRoutes: [],
                accessApis: []
            },
            user_name: ""
        };
    },
    [UserMutations.SET_USER](state, payload) {
        state.user_name = payload.user_name;
        state.role = payload.role;
        state.first_name = payload.first_name;
        state.last_name = payload.last_name;
        state.image = payload.image;
        state.jwt = payload.jwt;
        state.is_active = payload.is_active;
        const parentRoute = '/';
        const accessRouts = [];
        state.role.access.forEach((item) => {
            setAccessRoutes(item, accessRouts);
        });
        state.role.accessRoutes = accessRouts;
        // const accessApis :string[] = []
        // setAccessApis()
        // ----------set token to api header------//
        setHeader(payload.jwt.access);
        const parsed = JSON.stringify(payload);
        if (localStorage.getItem('USER')) {
            localStorage.removeItem('USER');
        }
        localStorage.setItem('USER', parsed);
    }
};
//# sourceMappingURL=mutations.js.map