import { setTokenUpdateAwait, tokenUpdateAwait } from '@/api/config';
import JWTs from "@/componentFunctions/jwt_functions";
export function setInterceptors(Api) {
    Api.interceptors.request.use(async (config) => {
        if (tokenUpdateAwait) {
            return config;
        }
        else {
            if (config.url !== 'jwt/updateToken' && config.url !== 'jwt/login') {
                const user = localStorage.getItem('USER');
                if (typeof user === 'string') {
                    const userJson = JSON.parse(user);
                    const expire = userJson.jwt.expire;
                    const now = Number(new Date()) / 1000;
                    if ((expire - now) < 1800) { //// بعد از 30 دقیقه توکن آپدیت میشود
                        setTokenUpdateAwait(true);
                        const { newConfig } = await JWTs().updateTokenAction(userJson.jwt.access, config);
                        return newConfig ? newConfig : config;
                    }
                    else {
                        return config;
                    }
                }
                else {
                    return config;
                }
            }
            else {
                return config;
            }
        }
    });
}
//# sourceMappingURL=intersceptors.js.map