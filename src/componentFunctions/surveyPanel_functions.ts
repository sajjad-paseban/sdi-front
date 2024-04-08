import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Api from "@/api/surveyPanel/routes";
import {
    ArseItem, BlockItem, CheckerProcessItem,
    CheckerRegionInfo, initBlockInfo, PanelUser, ProcessListItem,
    SurveyPanelUsers,
    SurveyProcessItem,
    SurveyRegionInfo
} from "@/models/SurveyPanel.interface";
import {Ref, ref} from "vue";
import jalali from "jalali-moment";
import {StoreActions} from "@/store";
import {AddProcessItem} from "@/api/surveyPanel/SD.Models/addProcess.sd";
import {ChangeBlockStatus} from "@/api/surveyPanel/SD.Models/changeBlockStatus.sd";
import {ChangeCheckerAccessSd} from "@/api/surveyPanel/SD.Models/changeCheckerAccess.sd";


const processItem = ref<AddProcessItem>() as  Ref<AddProcessItem>
const survey_panel_functions = () => {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const panelUsers = ref<SurveyPanelUsers>()
    const surveyRegionInfoList = ref<SurveyRegionInfo[]>([]) as Ref<SurveyRegionInfo[]>
    const checkerRegionInfoList = ref<CheckerRegionInfo[]>([]) as Ref<CheckerRegionInfo[]>
    const surveyProcessList = ref<SurveyProcessItem[]>([]) as Ref<SurveyProcessItem[]>
    const checkerProcessList = ref<CheckerProcessItem[]>([]) as Ref<CheckerProcessItem[]>
    const surveyProcessBlockList = ref<BlockItem[]>([]) as Ref<BlockItem[]>
    const checkerProcessBlockList = ref<BlockItem[]>([]) as Ref<BlockItem[]>
    const processBlockList = ref<BlockItem[]>([]) as Ref<BlockItem[]>
    const processList = ref<ProcessListItem[]>([]) as Ref<ProcessListItem[]>
    const processItemValue = ref<ProcessListItem>() as Ref<ProcessListItem>
    const initBlockInfo=ref<initBlockInfo[]>() as Ref<initBlockInfo[]>



    function getDate(data: string):string {
        return jalali(data).locale('fa').format('YYYY/M/D')
    }

    const getUserInfoPanel = async () => {
        const response = await Api.getUserInfo<PanelUser>(toast)
        if (response.result) {
            return response.result
        }else {
            return null
        }
    }

    const getPanelUsers = async () => {
        const response = await Api.getUsers<SurveyPanelUsers>(toast)
        if (response.result) {
            panelUsers.value = response.result
        }
    }

    const getSurveyRegionInfo = async () => {
        const response = await Api.getSurveyRegionInfo<SurveyRegionInfo[]>(toast)
        if (response.result) {
            surveyRegionInfoList.value = response.result
        }
    }

    const getCheckerRegionInfo = async () => {
        const response = await Api.getCheckerRegionInfo<CheckerRegionInfo[]>(toast)
        if (response.result) {
            checkerRegionInfoList.value = response.result
        }
    }

    const getSurveyProcessList = async (id:number) => {
        const response = await Api.getSurveyProcessList<SurveyProcessItem[]>(id,toast)
        if (response.result) {
            surveyProcessList.value = response.result
        }
    }

    const getCheckerProcessList = async (id:number) => {
        const response = await Api.getCheckerProcessList<CheckerProcessItem[]>(id,toast)
        if (response.result) {
            checkerProcessList.value = response.result
        }
    }

    const getSurveyProcessBlockList = async (id:number) => {
        const response = await Api.getSurveyProcessBlockList<BlockItem[]>(id,toast)
        if (response.result) {
            surveyProcessBlockList.value = response.result
        }
    }

    const getCheckerProcessBlockList = async (id:number) => {
        const response = await Api.getCheckerProcessBlockList<BlockItem[]>(id,toast)
        if (response.result) {
            checkerProcessBlockList.value = response.result
        }
    }

    const getProcessBlockList = async (id:number) => {
        const response = await Api.getProcessBlockList<BlockItem[]>(id,toast)
        if (response.result) {
            processBlockList.value = response.result
        }
    }

    const getProcessList = async () => {

        const response = await Api.getProcessList<ProcessListItem[]>(toast)

        if (response.result) {
            processList.value = response.result
        }
    }

    const addProcess = async (data:AddProcessItem) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addProcess(data,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const getProcessItem = async (id:number) => {

        const response = await Api.retrieveProcess<ProcessListItem>(id,toast)

        if (response.result) {
            processItemValue.value = response.result
        }
        return response.text.length === 0;
    }

    const updateProcess = async (data:AddProcessItem,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.updateProcess(data,id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const deleteProcess = async (id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteProcess(id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addSurveyPersonLayers = async (id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addSurveyPersonLayers(id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const get_arse_preview = async (code:string) => {
        const response = await Api.get_arse_preview<string>(code,toast)
        return response.result;
    }

    const changeBlockStatus = async (data:ChangeBlockStatus,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.changeBlockStatus(data,id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const getInitBlockStatus = async (id:number) => {
        const response = await Api.getInitBlockStatus<initBlockInfo[]>(id,toast)
        if (response.result) {
            initBlockInfo.value = response.result
        }
    }

    const changeCheckerAccess = async (data:ChangeCheckerAccessSd,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.changeCheckerAccess(data,id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    return {
        getUserInfoPanel,changeCheckerAccess,
        getInitBlockStatus,initBlockInfo,
        getProcessBlockList,processBlockList,
        get_arse_preview,changeBlockStatus,
        getProcessItem,processItemValue,deleteProcess,addSurveyPersonLayers,
        addProcess,updateProcess,
        getProcessList,processList,
        getCheckerProcessBlockList,checkerProcessBlockList,
        getCheckerProcessList,checkerProcessList,
        getPanelUsers, panelUsers,
        getSurveyRegionInfo,surveyRegionInfoList,
        getCheckerRegionInfo,checkerRegionInfoList,
        getSurveyProcessList,surveyProcessList,
        getSurveyProcessBlockList,surveyProcessBlockList,getDate,
        processItem,
    }
}
export default survey_panel_functions