import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import Api from "@/api/analyze/routes";
import {
    AnalyzeFilter,
    AnalyzeGroup,
    AnalyzeListItem,
    AnalyzeRunResult,
    FeatureResult,
    ProcessItem
} from "@/models/Analyze.interface";
import { ref } from "vue";
import {FilterResult} from "@/api/analyze/SD.Models/filterResult.sd";
import {StoreActions} from "@/store";

export default function analyze_functions() {

    const toast = useToast()
    const router = useRouter()
    const store = useStore()

    const analyzeListValue = ref<AnalyzeListItem[]>([])
    const analyzeItemValue = ref<AnalyzeListItem>()
    const analyzeGroupListValue = ref<AnalyzeGroup[]>([])
    const processListValue = ref<ProcessItem[]>([])
    const processInputTypesValue = ref<string[]>([])
    const processOutputTypesValue = ref<string[]>([])
    const filtersListValue = ref<AnalyzeFilter[]>([])
    const filterResultFeatures = ref<FeatureResult[]>([])
    const AnalyzeOutputTypesValue = ref<string[]>([])
    const AnalyzeExportFileTypesValue = ref<string[]>([])
    const runAnalyzeResultValueList = ref<AnalyzeRunResult[]>([])



    const getAnalyzeList = async () => {
        const response = await Api.getAnalyzeList<AnalyzeListItem[]>(toast)
        if (response.result) {
            analyzeListValue.value = response.result
        }
    }

    const getAnalyzeItem = async (id:number) => {
        const response = await Api.getAnalyzeItem<AnalyzeListItem>(id,toast)
        if (response.result) {
            analyzeItemValue.value = response.result
        }
    }

    const runAnalyzeResult = async (id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.runAnalyzeResult<AnalyzeRunResult[]>(id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            runAnalyzeResultValueList.value = response.result
        }
    }

    const getAnalyzeGroupList = async () => {
        const response = await Api.getAnalyzeGroupList<AnalyzeGroup[]>(toast)
        if (response.result) {
            analyzeGroupListValue.value = response.result
        }
    }

    const getProcessList = async () => {
        const response = await Api.getProcessList<ProcessItem[]>(toast)
        if (response.result) {
            processListValue.value = response.result
        }
    }

    const getProcessInputTypes = async () => {
        const response = await Api.getProcessInputTypes<string[]>(toast)
        if (response.result) {
            processInputTypesValue.value = response.result
        }
    }

    const getProcessOutputTypes = async () => {
        const response = await Api.getProcessOutputTypes<string[]>(toast)
        if (response.result) {
            processOutputTypesValue.value = response.result
        }
    }

    const getFiltersList = async () => {
        const response = await Api.getFiltersList<AnalyzeFilter[]>(toast)
        if (response.result) {
            filtersListValue.value = response.result
        }
    }

    const getFilterResult = async (data:FilterResult) => {

        const response = await Api.getFilterResult<FeatureResult[]>(data,toast)
        if (response.result) {
            filterResultFeatures.value = response.result
        }
    }

    const getAnalyzeOutputTypes = async () => {
        const response = await Api.getProcessInputTypes<string[]>(toast)
        if (response.result) {
            AnalyzeOutputTypesValue.value = response.result
        }
    }
    const getAnalyzeExportFileTypes = async () => {
        const response = await Api.getProcessInputTypes<string[]>(toast)
        if (response.result) {
            AnalyzeExportFileTypesValue.value = response.result
        }
    }

    const addAnalyzeModel = async (data:any) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addAnalyzeModel(data,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const analyze_export_file = async (data:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.analyze_export_file(data,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            return response.result
        }
    }

    const deleteAnalyzeModel = async (data:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteAnalyzeModel(data,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }







    return {
        getAnalyzeList,analyzeListValue,
        getAnalyzeGroupList,analyzeGroupListValue,
        getProcessList,processListValue,
        processInputTypesValue,getProcessInputTypes,
        getProcessOutputTypes,processOutputTypesValue,
        filtersListValue,getFiltersList,
        filterResultFeatures,getFilterResult,
        AnalyzeExportFileTypesValue,getAnalyzeExportFileTypes,
        AnalyzeOutputTypesValue,getAnalyzeOutputTypes,
        addAnalyzeModel,
        getAnalyzeItem,analyzeItemValue,
        runAnalyzeResult,runAnalyzeResultValueList,
        analyze_export_file,deleteAnalyzeModel
    }

}