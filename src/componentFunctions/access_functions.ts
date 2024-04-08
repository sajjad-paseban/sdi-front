import {ref, onMounted} from 'vue';
import Api from '@/api/access/routes'
import {useToast} from "primevue/usetoast";
import {
    Access,
    AccessLayerTree,
    AccessWithParentName,
    MassageAccess,
    MyApi,
    TreeAccess
} from "@/models/Access.interface";
import {DeleteAccessSDModel} from "@/api/access/SD.Models/deleteAccess.sd";

import {useStore} from "vuex";
import {StoreActions} from "@/store";
import {AddAccessSDModel} from "@/api/access/SD.Models/addAccess.sd";
import GeoJSONFeature from "ol/format/GeoJSON";
import {default as Feature_Api} from "@/api/feature/routes";


export default function access() {

    const accesses = ref<Access[]>([])
    const apis = ref<MyApi[]>([])
    const accessesTree = ref<TreeAccess[]>([])
    const accessWithParentName = ref<AccessWithParentName[]>([])
    const roleAccess = ref<number[]>([])
    const roleLayersAccess = ref<AccessLayerTree[]>([])

    const toast = useToast()
    const store = useStore()


    const getAccesses = async () => {

        const response = await Api.getAccesses<Access[]>(toast)

        if (response.result) {
            accesses.value = [...response.result]
        }

    }

    const getAllApis = async () => {
        const response = await Api.getAllRoutes<MyApi[]>(toast)
        if (response.result) {
            apis.value = response.result

        }
    }

    const getAccessWithParentName = async () => {
        const response = await Api.getAccessWithParentName<AccessWithParentName[]>(toast)
        if (response.result) {
            accessWithParentName.value = response.result
            return response.result

        }
    }

    const getAccessTree = async () => {
        const response = await Api.getAccessTree<TreeAccess[]>(toast)
        if (response.result) {
            accessesTree.value = response.result
            return response.result
        }
    }

    const deleteAccess = async (data: DeleteAccessSDModel) => {
        const response = await Api.deleteAccess<MassageAccess>(data, toast)
        if (response.result) {

            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'دسترسی حذف شد .'
            });
            return true
        } else {
            return false
        }
    }

    const getRoleAccessByName = async (role: number) => {
        const response = await Api.getRoleAccessByName<number[]>({id: role}, toast)

        if (response.result) {
            roleAccess.value = response.result
            return response.result
        }
    }

    const editAccess = async (data: AddAccessSDModel) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editAccess<MassageAccess>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const getRoleLayerAccess = async (id: number) => {
        const response = await Api.getLayerTreeAccess<AccessLayerTree[]>(id, toast)
        if (response.result) {
            roleLayersAccess.value = response.result
            return response.result
        }

    }

    const saveRoleLayerAccess = async (data: AccessLayerTree[], id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveRoleLayerAccess(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const createInitAccess = async (data:any)=>{
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.CreateInitAccess(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    return {
        accesses,
        apis,
        getAccessWithParentName,
        getAllApis,
        getAccesses,
        accessWithParentName,
        getAccessTree,
        accessesTree,
        deleteAccess,
        createInitAccess,
        editAccess, getRoleAccessByName, roleAccess, getRoleLayerAccess, roleLayersAccess,saveRoleLayerAccess
    }

}