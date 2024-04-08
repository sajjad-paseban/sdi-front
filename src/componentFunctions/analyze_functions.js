import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Api from "@/api/analyze/routes";
import { ref } from "vue";
import { StoreActions } from "@/store";
export default function analyze_functions() {
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const analyzeListValue = ref([]);
    const analyzeItemValue = ref();
    const analyzeGroupListValue = ref([]);
    const processListValue = ref([]);
    const processInputTypesValue = ref([]);
    const processOutputTypesValue = ref([]);
    const filtersListValue = ref([]);
    const filterResultFeatures = ref([]);
    const AnalyzeOutputTypesValue = ref([]);
    const AnalyzeExportFileTypesValue = ref([]);
    const runAnalyzeResultValueList = ref([]);
    const getAnalyzeList = async () => {
        const response = await Api.getAnalyzeList(toast);
        if (response.result) {
            analyzeListValue.value = response.result;
        }
    };
    const getAnalyzeItem = async (id) => {
        const response = await Api.getAnalyzeItem(id, toast);
        if (response.result) {
            analyzeItemValue.value = response.result;
        }
    };
    const runAnalyzeResult = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.runAnalyzeResult(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            runAnalyzeResultValueList.value = response.result;
        }
    };
    const getAnalyzeGroupList = async () => {
        const response = await Api.getAnalyzeGroupList(toast);
        if (response.result) {
            analyzeGroupListValue.value = response.result;
        }
    };
    const getProcessList = async () => {
        const response = await Api.getProcessList(toast);
        if (response.result) {
            processListValue.value = response.result;
        }
    };
    const getProcessInputTypes = async () => {
        const response = await Api.getProcessInputTypes(toast);
        if (response.result) {
            processInputTypesValue.value = response.result;
        }
    };
    const getProcessOutputTypes = async () => {
        const response = await Api.getProcessOutputTypes(toast);
        if (response.result) {
            processOutputTypesValue.value = response.result;
        }
    };
    const getFiltersList = async () => {
        const response = await Api.getFiltersList(toast);
        if (response.result) {
            filtersListValue.value = response.result;
        }
    };
    const getFilterResult = async (data) => {
        const response = await Api.getFilterResult(data, toast);
        if (response.result) {
            filterResultFeatures.value = response.result;
        }
    };
    const getAnalyzeOutputTypes = async () => {
        const response = await Api.getProcessInputTypes(toast);
        if (response.result) {
            AnalyzeOutputTypesValue.value = response.result;
        }
    };
    const getAnalyzeExportFileTypes = async () => {
        const response = await Api.getProcessInputTypes(toast);
        if (response.result) {
            AnalyzeExportFileTypesValue.value = response.result;
        }
    };
    const addAnalyzeModel = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addAnalyzeModel(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    const analyze_export_file = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.analyze_export_file(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            return response.result;
        }
    };
    const deleteAnalyzeModel = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteAnalyzeModel(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length <= 0;
    };
    return {
        getAnalyzeList, analyzeListValue,
        getAnalyzeGroupList, analyzeGroupListValue,
        getProcessList, processListValue,
        processInputTypesValue, getProcessInputTypes,
        getProcessOutputTypes, processOutputTypesValue,
        filtersListValue, getFiltersList,
        filterResultFeatures, getFilterResult,
        AnalyzeExportFileTypesValue, getAnalyzeExportFileTypes,
        AnalyzeOutputTypesValue, getAnalyzeOutputTypes,
        addAnalyzeModel,
        getAnalyzeItem, analyzeItemValue,
        runAnalyzeResult, runAnalyzeResultValueList,
        analyze_export_file, deleteAnalyzeModel
    };
}
//# sourceMappingURL=analyze_functions.js.map