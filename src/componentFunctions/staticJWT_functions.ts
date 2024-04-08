import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import { MassageConnection} from "@/models/Conncections.interface";
import {StoreActions} from "@/store";
import Api from "@/api/jwt/routes";
import {GetKeyById, MassageStaticJWT, StaticJWTInterface, TableStaticJWTInterface} from "@/models/staticJWT.interface";
import { ref } from "vue";

import {GetKeyByIdSd} from "@/api/jwt/SD.Models/getKeyById.sd";
import {DeleteJWTSd} from "@/api/jwt/SD.Models/deleteJWT.sd";

export default function staticJWTs() {

    const toast = useToast()
    const store = useStore()

    const keysList= ref<TableStaticJWTInterface[]>([])
    const key = ref<GetKeyById>()

    const addJWTAction = async (data: StaticJWTInterface) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addStaticJwt<MassageStaticJWT>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const getKeys = async () => {
        const response = await Api.getKeys<TableStaticJWTInterface[]>(toast)
        if (response.result) {
            keysList.value = response.result
            return response.result
        }
    }
    const getKeyById = async (data: GetKeyByIdSd) => {
        const response = await Api.getKeyById<GetKeyById>(data, toast)
        if (response.result) {
            key.value = response.result
            return response.result
        }
    }

    const deleteJWT = async (data: DeleteJWTSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteJWT<MassageStaticJWT>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'کلید حذف شد '
            });
            return true
        } else {
            return false
        }
    }

    return{
        addJWTAction,getKeys,keysList,getKeyById,key,deleteJWT
    }
}