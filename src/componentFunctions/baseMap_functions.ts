

import {ref, onMounted} from 'vue';
import Api from '@/api/baseMap/routes'
import {useToast} from "primevue/usetoast";
import {BaseMapInterface, MassageBaseMap} from "@/models/BaseMap.interface";
import {AddBaseMapSd} from "@/api/baseMap/SD.Models/addBaseMap.sd";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {DeleteAccessSDModel} from "@/api/access/SD.Models/deleteAccess.sd";
import {MassageAccess} from "@/models/Access.interface";
import {DeleteBaseMapSd} from "@/api/baseMap/SD.Models/deleteBaseMap.sd";
import {AddAccessSDModel} from "@/api/access/SD.Models/addAccess.sd";
import {StoreActions} from "@/store";

export default function baseMap() {

    const toast = useToast()
    const router = useRouter()
    const store = useStore()

    const baseMaps = ref<BaseMapInterface[]>([])
    const baseMapObject =ref<BaseMapInterface>({id:0,image:null,name:'',address:'',code:'',online:false,default:false})

    const addBaseMap = async (data:AddBaseMapSd)=>{
        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:true})
        const response = await Api.addBaseMap<MassageBaseMap>(data,toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:false})
        if (response.result) {
            router.push({name:'manageBaseMapList'})
            toast.add({group: 'tr', life: 7000, severity: 'success', summary: ' نتیجه دخواست', detail: 'نقشه زیرین اضافه شد '});
        }
    }

    const getBaseMaps =async ()=>{
        const response = await Api.getBaseMaps<BaseMapInterface[]>(toast)
        if (response.result) {
            baseMaps.value = response.result
            const parsed = JSON.stringify(baseMaps.value);

            if (localStorage.getItem('BASE_MAPS')) {
                localStorage.removeItem('BASE_MAPS')
            }
            localStorage.setItem('BASE_MAPS', parsed);
        }
    }

    const deleteBaseMap = async (data: DeleteBaseMapSd) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:true})
        const response = await Api.deleteBaseMaps<MassageBaseMap>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:false})
        if (response.result) {

            toast.add({
                group: 'tr',
                life: 7000,
                severity: 'success',
                summary: ' نتیجه درخواست',
                detail: 'نقشه زیرین حذف شد .'
            });
            return true
        } else {
            return false
        }
    }

    const getEditItem = async (name:string)=>{
        const response = await Api.getEditBaseMap<BaseMapInterface>({data: name}, toast)
        if (response.result) {
            baseMapObject.value = response.result

        }else {
            router.push({name:'manageBaseMapList'})
        }
    }

    const editBaseMap = async (data: AddBaseMapSd)=>{
        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:true})
        const response = await Api.editBaseMap<MassageAccess>(data, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:false})
        return !!response.result;
    }


    const getActiveBaseMap = async():Promise<BaseMapInterface | null>=>{

        if (baseMaps.value.length == 0){
            await getBaseMaps()
        }
        let active = null
        baseMaps.value.map((item) => {
            if (item.default)
                active =  item
        })
        return active
    }

    return{
        addBaseMap,getBaseMaps,baseMaps,deleteBaseMap,getEditItem,baseMapObject,editBaseMap,getActiveBaseMap
    }
}