import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/layerGroup/routes";
import {LayerGroup, LayerGroupInterface} from "@/models/LayerGroup.interface";
import {BaseStyleInterface, SaveStyle, StylePattern} from "@/models/Style.interface";
import { ref } from "vue";


export default function layerGroupFunctions() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const layerGroupList = ref<LayerGroupInterface[]>([])
    const groupItem = ref<LayerGroupInterface>()


    const add = async (data: LayerGroupInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addLayerGroup<LayerGroup>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const list = async () => {
        const response = await Api.listLayerGroup<LayerGroupInterface[]>(toast)
        if (response.result) {
            layerGroupList.value = response.result
        }
    }

    const deleteLayerGroup = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteLayerGroup(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

    }

    const getItemLayerGroup= async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getItemLayerGroup<LayerGroupInterface>(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            groupItem.value = response.result
        }
    }

    const editLayerGroup = async (data: LayerGroupInterface,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editLayerGroup<LayerGroup>(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    return {
        add,list,layerGroupList,deleteLayerGroup,getItemLayerGroup,groupItem,editLayerGroup
    }
}