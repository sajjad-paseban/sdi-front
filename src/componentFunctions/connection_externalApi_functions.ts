import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/connections/routes";
import {ExternalApiInterface, MassageConnection} from "@/models/Conncections.interface";
import {ref} from "vue";
import {GetExternalApiByIdSd} from "@/api/connections/SD.Models/getExternalApiById.sd";
import {deleteExternalApiByIdSd} from "@/api/connections/SD.Models/deleteExternalApiById.sd";
import {GetExternalApiByNameSd} from "@/api/connections/SD.Models/getExternalApiByName.sd";


export default function ExternalApis() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const ExternalApiMethods = ref<string[]>([])
    const ExternalApisList = ref<ExternalApiInterface[]>([])
    const ExternalApi = ref<ExternalApiInterface>()



    const addExternalApiAction = async (data: ExternalApiInterface) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addExternalApi<MassageConnection>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }



    const getExternalApiMethodsAction = async () => {
        const response = await Api.getExternalApiMethods<string[]>(toast)
        if (response.result) {
            ExternalApiMethods.value = response.result
        }
    }

    const getExternalApis = async () => {
        const response = await Api.getExternalApis<ExternalApiInterface[]>(toast)
        if (response.result) {
            ExternalApisList.value = response.result
            return response.result
        }
    }

    const getExternalApisById = async (data: GetExternalApiByIdSd) => {
        const response = await Api.getExternalApiById<ExternalApiInterface>(data, toast)
        if (response.result) {
            ExternalApi.value = response.result
            return response.result
        }
    }

    const getExternalApisByName = async (data: GetExternalApiByNameSd) => {
        const response = await Api.getExternalApiByName<ExternalApiInterface>(data, toast)
        if (response.result) {
            ExternalApi.value = response.result
            return response.result
        }
    }

    const deleteExternalApi = async (data: deleteExternalApiByIdSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteExternalApiById<MassageConnection>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'api حذف شد '
            });

        }
    }


    return {
        addExternalApiAction,
        ExternalApiMethods,
        getExternalApiMethodsAction,
        getExternalApis,
        ExternalApisList,
        getExternalApisById,
        ExternalApi,
        deleteExternalApi,
        getExternalApisByName

    }
}