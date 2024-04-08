import { newSendRequest } from "@/api/config";
export default {
    addFeature: async function (data, id, toast) {
        const url = 'feature/add';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'addFeature response');
        return result;
    },
    editFeature: async function (data, id, toast) {
        const url = 'feature/edit';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'editFeature response');
        return result;
    },
    deleteFeature: async function (id, toast) {
        const url = 'feature/delete';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteFeature response');
        return result;
    },
    copyFeatures: async function (data, layer_id, toast) {
        const url = 'feature/copy';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, layer_id, toast);
        console.log(result, 'copyFeatures response');
        return result;
    },
    moveFeatures: async function (data, layer_id, toast) {
        const url = 'feature/move';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, layer_id, toast);
        console.log(result, 'moveFeatures response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map