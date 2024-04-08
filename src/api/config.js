import axios from 'axios';
import { z } from "zod";
import { setInterceptors } from "@/api/jwt/intersceptors";
import store from '@/store/index';
const Api = axios.create({
    baseURL: 'http://192.168.0.13/api/v1/',
});
export let tokenUpdateAwait = false;
export function setTokenUpdateAwait(value) {
    tokenUpdateAwait = value;
}
const authErrorsText = ['یوزر پیدا نشد', 'یوزر غیر فعال است', 'توکن یوزر عوض شده است', 'توکن یوزر غیر فعال است', 'کاربرلاگین نیست', 'توکن شما منقضی شده است', 'توکن صحیح نیست'];
//T1:تایپ دیتای خروجی مورد نظر ما
//T2:تایپ دیتای خروجی از بکند
//T3:تایپ دیتای ارسالی به بکند
export async function sendRequest(url, method, validation, transform, dataSend, toast) {
    const myApiResponse = {
        text: [],
    };
    let params;
    if (dataSend) {
        if (method !== 'get') {
            params = new FormData();
            let file = null;
            if (typeof dataSend !== 'string') {
                if (typeof dataSend === 'object') {
                    Object.keys(dataSend).forEach((key, index) => {
                        // 👇️ name Tom 0, country Chile 1
                        // console.log(key, dataSend[key], index);
                        if (dataSend[key] instanceof File) {
                            file = dataSend[key];
                        }
                    });
                }
                params.append("data", JSON.stringify(dataSend));
                if (file) {
                    params.append('file', file);
                }
            }
            else {
                params.append("data", (dataSend));
            }
        }
        else {
            params = dataSend;
        }
    }
    try {
        const response = await Api.request({
            url: url,
            method: method,
            data: params ? params : null,
            params: method === 'get' ? params : null
        });
        console.log(response, 'response of ' + url);
        if (validation) {
            const resValidation = validation.parse(response.data);
            console.log(resValidation, 'validation result');
        }
        if (transform) {
            myApiResponse.result = transform(response.data);
        }
    }
    catch (error) {
        myApiResponse.text = [];
        // check if the error was thrown from axios
        if (axios.isAxiosError(error)) {
            console.log(error);
            if (error.response) {
                // do something
                // or just re-throw the error
                myApiResponse.status = error.response.status;
                if (error.response.data.detail) {
                    myApiResponse.text.push(error.response.data.detail);
                    //---------if error is auth error , user must redirect to login page ---//
                    myApiResponse.text.forEach((error) => {
                        if (authErrorsText.includes(error)) {
                            window.location.replace(`${store.state.frontUrl}login?error=${error}`);
                        }
                    });
                }
                else {
                    if (typeof error.response.data === 'object') {
                        Object.entries(error.response.data).forEach(entry => {
                            const [key, value] = entry;
                            myApiResponse.text.push(key + ' : ' + String(value));
                        });
                    }
                    else {
                        myApiResponse.text.push('خطای نامشخص در اتصال به سرور');
                    }
                }
            }
            else {
                myApiResponse.text.push('خطای اتصال به سرور');
            }
        }
        else if (error instanceof z.ZodError) {
            //zod error handling
            console.log(error.issues, 'zod error');
            error.issues.forEach((error) => {
                myApiResponse.text.push(error.message + ' in ' + error.path.toString());
            });
        }
        else {
            // do something else
            // or creating a new error
            console.log(error);
            myApiResponse.text.push('خطای نامشخص');
        }
        //----------for show error text in toast service-------------//
        if (myApiResponse.text.length > 0) {
            if (toast) {
                myApiResponse.text.forEach((text) => {
                    toast.add({ group: 'br', life: 7000, severity: 'error', summary: ' خطا در دخواست', detail: text });
                });
            }
        }
    }
    return myApiResponse;
}
export async function newSendRequest(url, method, validation, transform, dataSend, itemId, toast, dataFile = false, setNull = false) {
    const myApiResponse = {
        text: [],
    };
    let data;
    let dataForm;
    if (!dataFile) {
        if (dataSend) {
            data = JSON.stringify(dataSend);
            console.log(data, dataSend);
        }
    }
    else {
        dataForm = new FormData();
        if (dataSend && dataSend instanceof Object) {
            Object.keys(dataSend).forEach((key, index) => {
                // 👇️ name Tom 0, country Chile 1
                // console.log(key, dataSend[key], index);
                if (dataSend[key] || dataSend[key] === false) {
                    if (dataSend[key] instanceof Array) {
                        if (dataSend[key].length == 0) {
                            dataForm.append(String(key), '');
                        }
                        else {
                            dataSend[key].map((item, index) => {
                                dataForm.append(`${String(key)}`, item);
                            });
                        }
                    }
                    else {
                        dataForm.append(String(key), dataSend[key]);
                    }
                }
                else if (dataSend[key] === null && setNull) {
                    dataForm.append(String(key), '');
                }
            });
        }
    }
    let id;
    if (itemId) {
        if (Array.isArray(itemId)) {
            if (itemId.length > 0) {
                id = '';
                itemId.map((i) => {
                    id = id + String(i) + '/';
                });
                id = id.slice(0, -1);
            }
        }
        else {
            id = String(itemId);
        }
    }
    try {
        const response = await Api.request({
            url: id ? url + "/" + id : url,
            method: method,
            data: dataSend ? dataFile ? dataForm : dataSend : null,
            params: method.toLowerCase() === 'get' ? dataSend : null
        });
        console.log(response, 'response of ' + url);
        if (validation) {
            const resValidation = validation.parse(response.data);
            console.log(resValidation, 'validation result');
        }
        if (transform) {
            myApiResponse.result = transform(response.data);
        }
    }
    catch (error) {
        myApiResponse.text = [];
        // check if the error was thrown from axios
        if (axios.isAxiosError(error)) {
            console.log(error);
            if (error.response) {
                // do something
                // or just re-throw the error
                myApiResponse.status = error.response.status;
                if (typeof error.response.data == "object" && 'detail' in error.response.data) {
                    myApiResponse.text.push(error.response.data.detail);
                    //---------if error is auth error , user must redirect to login page ---//
                    myApiResponse.text.forEach((error) => {
                        if (authErrorsText.includes(error)) {
                            window.location.replace(`${store.state.frontUrl}/login?error=${error}`);
                        }
                    });
                }
                else {
                    if (Array.isArray(error.response.data)) {
                        error.response.data.map((item) => {
                            let text = '';
                            if (typeof item === 'object') {
                                Object.entries(item).forEach((entry) => {
                                    const [key, value] = entry;
                                    if (Array.isArray(value)) {
                                        text = text + ' ' + value.join(',');
                                    }
                                });
                                myApiResponse.text.push(text);
                            }
                            else if (typeof item === 'string') {
                                myApiResponse.text.push(item);
                            }
                        });
                    }
                    else if (typeof error.response.data === 'object') {
                        Object.entries(error.response.data).forEach(entry => {
                            const [key, value] = entry;
                            myApiResponse.text.push(key + ' : ' + String(value));
                        });
                    }
                    else if (typeof error.response.data === 'string') {
                        myApiResponse.text.push(`${error.response.data.substring(0, 50)} ...`);
                    }
                    else {
                        myApiResponse.text.push('خطای نامشخص در اتصال به سرور');
                    }
                }
            }
            else {
                myApiResponse.text.push('خطای اتصال به سرور');
            }
        }
        else if (error instanceof z.ZodError) {
            //zod error handling
            console.log(error.issues, 'zod error');
            error.issues.forEach((error) => {
                myApiResponse.text.push(error.message + ' in ' + error.path.toString());
            });
        }
        else {
            // do something else
            // or creating a new error
            console.log(error);
            myApiResponse.text.push('خطای نامشخص');
        }
        //----------for show error text in toast service-------------//
        if (myApiResponse.text.length > 0) {
            if (toast) {
                myApiResponse.text.forEach((text) => {
                    if (text == 'Not found.') {
                        text = 'موردی یافت نشد';
                    }
                    toast.add({ group: 'br', life: 7000, severity: 'error', summary: ' خطا در درخواست', detail: text });
                });
            }
        }
    }
    return myApiResponse;
}
export function setHeader(header) {
    Api.defaults.headers.common['Authorization'] = String(header);
}
export function setBaseUrl(ip) {
    Api.defaults.baseURL = ip;
}
setInterceptors(Api);
export default Api;
//# sourceMappingURL=config.js.map