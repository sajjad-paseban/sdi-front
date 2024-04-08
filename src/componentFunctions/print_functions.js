import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { StoreActions } from "@/store";
import Api from "@/api/print/routes";
import { ref } from "vue";
export default function print_functions() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const tempGroupList = ref([]);
    const groupItem = ref();
    const initDataAddModel = ref();
    const imagesLinks = ref([]);
    const previewFormDataValue = ref('');
    const getTempsList = ref([]);
    const tempItem = ref();
    async function previewFormData(data) {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.previewFormData(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            previewFormDataValue.value = response.result.data;
        }
    }
    const add = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addTempGroup(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const list = async () => {
        const response = await Api.listTempGroup(toast);
        if (response.result) {
            tempGroupList.value = response.result;
        }
    };
    const deleteTempGroup = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteTempGroup(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
    };
    const getItemTempGroup = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getItemTempGroup(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            groupItem.value = response.result;
        }
    };
    const editTempGroup = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editTempGroup(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return !!response.result;
    };
    const getInitAddModel = async (data) => {
        const response = await Api.getInitAddModel(data, toast);
        if (response.result) {
            initDataAddModel.value = response.result;
        }
    };
    const uploadTempImage = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.uploadTempImage(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            imagesLinks.value = response.result;
        }
    };
    const uploadModelImage = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.uploadModelImage(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            imagesLinks.value = response.result;
        }
    };
    const removeImageGallery = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.removeImageGallery(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const saveFormData = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveFormData(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    async function getTemps(data) {
        const response = await Api.getTemps(data, toast);
        if (response.result) {
            getTempsList.value = response.result;
        }
    }
    const deleteTemp = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteTemp(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    async function getItemTemp(id) {
        const response = await Api.getItemTemp(id, toast);
        if (response.result) {
            tempItem.value = response.result;
        }
        return response.text.length === 0;
    }
    const saveEditFormData = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveEditFormData(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    return {
        saveFormData, getTemps, getTempsList, deleteTemp, getItemTemp, tempItem, uploadModelImage, saveEditFormData,
        getInitAddModel, initDataAddModel, imagesLinks, uploadTempImage, removeImageGallery, previewFormDataValue,
        previewFormData, add, list, tempGroupList, deleteTempGroup, getItemTempGroup, groupItem, editTempGroup
    };
}
//# sourceMappingURL=print_functions.js.map