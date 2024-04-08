import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Api from "@/api/surveyPanel/routes";
import { ref } from "vue";
import jalali from "jalali-moment";
import { StoreActions } from "@/store";
const processItem = ref();
const survey_panel_functions = () => {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const panelUsers = ref();
    const surveyRegionInfoList = ref([]);
    const checkerRegionInfoList = ref([]);
    const surveyProcessList = ref([]);
    const checkerProcessList = ref([]);
    const surveyProcessBlockList = ref([]);
    const checkerProcessBlockList = ref([]);
    const processBlockList = ref([]);
    const processList = ref([]);
    const processItemValue = ref();
    const initBlockInfo = ref();
    function getDate(data) {
        return jalali(data).locale('fa').format('YYYY/M/D');
    }
    const getUserInfoPanel = async () => {
        const response = await Api.getUserInfo(toast);
        if (response.result) {
            return response.result;
        }
        else {
            return null;
        }
    };
    const getPanelUsers = async () => {
        const response = await Api.getUsers(toast);
        if (response.result) {
            panelUsers.value = response.result;
        }
    };
    const getSurveyRegionInfo = async () => {
        const response = await Api.getSurveyRegionInfo(toast);
        if (response.result) {
            surveyRegionInfoList.value = response.result;
        }
    };
    const getCheckerRegionInfo = async () => {
        const response = await Api.getCheckerRegionInfo(toast);
        if (response.result) {
            checkerRegionInfoList.value = response.result;
        }
    };
    const getSurveyProcessList = async (id) => {
        const response = await Api.getSurveyProcessList(id, toast);
        if (response.result) {
            surveyProcessList.value = response.result;
        }
    };
    const getCheckerProcessList = async (id) => {
        const response = await Api.getCheckerProcessList(id, toast);
        if (response.result) {
            checkerProcessList.value = response.result;
        }
    };
    const getSurveyProcessBlockList = async (id) => {
        const response = await Api.getSurveyProcessBlockList(id, toast);
        if (response.result) {
            surveyProcessBlockList.value = response.result;
        }
    };
    const getCheckerProcessBlockList = async (id) => {
        const response = await Api.getCheckerProcessBlockList(id, toast);
        if (response.result) {
            checkerProcessBlockList.value = response.result;
        }
    };
    const getProcessBlockList = async (id) => {
        const response = await Api.getProcessBlockList(id, toast);
        if (response.result) {
            processBlockList.value = response.result;
        }
    };
    const getProcessList = async () => {
        const response = await Api.getProcessList(toast);
        if (response.result) {
            processList.value = response.result;
        }
    };
    const addProcess = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addProcess(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getProcessItem = async (id) => {
        const response = await Api.retrieveProcess(id, toast);
        if (response.result) {
            processItemValue.value = response.result;
        }
        return response.text.length === 0;
    };
    const updateProcess = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.updateProcess(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const deleteProcess = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteProcess(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addSurveyPersonLayers = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addSurveyPersonLayers(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const get_arse_preview = async (code) => {
        const response = await Api.get_arse_preview(code, toast);
        return response.result;
    };
    const changeBlockStatus = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.changeBlockStatus(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getInitBlockStatus = async (id) => {
        const response = await Api.getInitBlockStatus(id, toast);
        if (response.result) {
            initBlockInfo.value = response.result;
        }
    };
    const changeCheckerAccess = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.changeCheckerAccess(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    return {
        getUserInfoPanel, changeCheckerAccess,
        getInitBlockStatus, initBlockInfo,
        getProcessBlockList, processBlockList,
        get_arse_preview, changeBlockStatus,
        getProcessItem, processItemValue, deleteProcess, addSurveyPersonLayers,
        addProcess, updateProcess,
        getProcessList, processList,
        getCheckerProcessBlockList, checkerProcessBlockList,
        getCheckerProcessList, checkerProcessList,
        getPanelUsers, panelUsers,
        getSurveyRegionInfo, surveyRegionInfoList,
        getCheckerRegionInfo, checkerRegionInfoList,
        getSurveyProcessList, surveyProcessList,
        getSurveyProcessBlockList, surveyProcessBlockList, getDate,
        processItem,
    };
};
export default survey_panel_functions;
//# sourceMappingURL=surveyPanel_functions.js.map