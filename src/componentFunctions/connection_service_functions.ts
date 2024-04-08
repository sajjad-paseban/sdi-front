import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/connections/routes";
import {ServiceInterface, MassageConnection} from "@/models/Conncections.interface";
import {ref} from "vue";
import {GetServiceByIdSd} from "@/api/connections/SD.Models/getServiceById.sd";
import {DeleteIpSd} from "@/api/ips/SD.Models/deleteIp.sd";
import {MassageIps} from "@/models/Ips.interface";
import {deleteServiceByIdSd} from "@/api/connections/SD.Models/deleteServiceById.sd";


export default function services() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const serviceTypes = ref<string[]>([])
    const servicesList = ref<ServiceInterface[]>([])
    const service = ref<ServiceInterface>()
    const serviceVersion = ref<string[]>([])


    const addServiceAction = async (data: ServiceInterface) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addService<MassageConnection>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const checkService = async (data: ServiceInterface) => {

        const response = await Api.checkService<MassageConnection>(data, toast)

        if (response.result){
            if (response.result.massage === 'valid') {
                return true
            }
        }

        return false
    }

    const getServiceTypesAction = async () => {
        const response = await Api.getServiceTypes<string[]>(toast)
        if (response.result) {
            serviceTypes.value = response.result
        }
    }

    const getServiceVersionAction = async () => {
        const response = await Api.getServiceVersion<string[]>(toast)
        if (response.result) {
            serviceVersion.value = response.result
        }
    }

    const getServices = async () => {
        const response = await Api.getServices<ServiceInterface[]>(toast)
        if (response.result) {
            servicesList.value = response.result
            return response.result
        }
    }

    const getServicesById = async (data: GetServiceByIdSd) => {
        const response = await Api.getServiceById<ServiceInterface>(data, toast)
        if (response.result) {
            service.value = response.result
            return response.result
        }
    }

    const deleteService = async (data: deleteServiceByIdSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteServiceById<MassageConnection>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'سرویس حذف شد '
            });

        }
    }


    return {
        addServiceAction,
        serviceTypes,
        getServiceTypesAction,
        getServices,
        servicesList,
        getServicesById,
        service,
        deleteService,
        checkService,
        serviceVersion,
        getServiceVersionAction
    }
}