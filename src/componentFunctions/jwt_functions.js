import { setHeader, setTokenUpdateAwait } from "@/api/config";
import routes from "@/api/jwt/routes";
import store from "@/store";
export default function JWTs() {
    // const store = useStore()
    const updateTokenAction = async (access, config) => {
        const response = await routes.updateToken({
            access: access
        }, undefined);
        let user = null;
        if (response.result) {
            user = response.result;
            console.log(user, 'user token updated');
            setHeader(user.jwt.access);
            if (config && config.headers) {
                if (config.headers.Authorization) {
                    config.headers.Authorization = user.jwt.access;
                }
            }
            const parsed = JSON.stringify(user);
            if (localStorage.getItem('USER')) {
                localStorage.removeItem('USER');
            }
            localStorage.setItem('USER', parsed);
            setTokenUpdateAwait(false);
            return { newConfig: config, newUser: user };
        }
        else {
            console.log(response.text);
            setTokenUpdateAwait(false);
            window.location.replace(store.state.frontUrl + 'login?error=' + 'توکن کاربر عوض شده است');
            return { newConfig: config, newUser: user };
        }
    };
    const getUserInfo = async () => {
        const response = await routes.getUserInfo(undefined);
        let user = null;
        if (response.result) {
            user = response.result;
            const parsed = JSON.stringify(user);
            if (localStorage.getItem('USER')) {
                localStorage.removeItem('USER');
            }
            localStorage.setItem('USER', parsed);
            return { error: false, user: user };
        }
        else {
            return { error: true, user: null };
        }
    };
    const logout = async () => {
        await routes.logout(undefined);
    };
    return {
        updateTokenAction, getUserInfo, logout
    };
}
//# sourceMappingURL=jwt_functions.js.map