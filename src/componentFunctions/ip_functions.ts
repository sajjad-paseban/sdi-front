import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/ips/routes";
import {GetIpById, IpsInterface, MassageIps, TableIpsInterface} from "@/models/Ips.interface";
import {GetUserIpsSd} from "@/api/ips/SD.Models/getUserIps.sd";
import {ref} from "vue";
import {DeleteIpSd} from "@/api/ips/SD.Models/deleteIp.sd";
import {GetIpByIdSd} from "@/api/ips/SD.Models/getIpById.sd";
import moment from "jalali-moment";


export default function ips() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const ipsList = ref<TableIpsInterface[]>([])
    const getIp = ref<GetIpById>()
    const userIps = ref<TableIpsInterface[]>([])

    const convertedDate =(date:string[]): number[]=> {
        return [new Date(moment.from(date[0], 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')).getTime()/1000,
            new Date(moment.from(date[1], 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD')).getTime()/1000]
    }

    const addIpAction = async (data: IpsInterface) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addIp(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const getUserIps = async (data: GetUserIpsSd) => {
        const response = await Api.getUserIps<TableIpsInterface[]>(data, toast)
        if (response.result) {
            userIps.value = response.result
        }
    }

    const getIps = async () => {
        const response = await Api.getIps<TableIpsInterface[]>(toast)
        if (response.result) {
            ipsList.value = response.result
            return response.result
        }
    }

    const deleteIp = async (data: DeleteIpSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteIp<MassageIps>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'آیپی حذف شد '
            });
            return true
        } else {
            return false
        }
    }

    const getIpById = async (data: GetIpByIdSd) => {
        const response = await Api.getIpById<GetIpById>(data, toast)
        if (response.result) {
            getIp.value = response.result
            return response.result
        }
    }


    return {
        addIpAction, getUserIps, userIps, getIps, ipsList, deleteIp, getIpById, getIp,convertedDate
    }
}