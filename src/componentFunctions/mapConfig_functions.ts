import { ref } from "vue"
import {GetMapConfigInterface, MapConfigInterface, MassageMapConfig} from "@/models/MapConfig.interface";
import {StoreActions} from "@/store";
import Api from "@/api/mapConfig/routes";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {getMapConfigsSDModel} from "@/api/mapConfig/SD.Models/getMapConfigs.sd";

export default function mapConfig() {

    const toast = useToast()
    const router = useRouter()
    const store = useStore()

    const mapConfig = ref<MapConfigInterface>()
    const mapConfigs = ref<GetMapConfigInterface[]>()

    const addMapConfig = async (data:MapConfigInterface) => {

        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:true})
        const response = await Api.addMapConfig<MassageMapConfig>(data,toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING,{type:'simple',active:false})
        if (response.result) {
            router.push({name:'manageRolesList'})
            toast.add({group: 'tr', life: 7000, severity: 'success', summary: ' نتیجه درخواست', detail: 'تنظیمات نقشه برای نقش اعمال شد '});
        }
    }

    const getMapConfigs = async () => {
        const response = await Api.getMapConfigs<GetMapConfigInterface[]>(toast)

        if (response.result) {
            mapConfigs.value=response.result
            return response.result
        }else {
            null
        }

    }

    const getMapConfigById = async (data:getMapConfigsSDModel) => {

        const response = await Api.getMapConfigById<GetMapConfigInterface>(data,toast)

        if (response.result) {
            return response.result
        }else {
            null
        }
    }

    return{
        addMapConfig,mapConfigs,getMapConfigs,getMapConfigById
    }
}