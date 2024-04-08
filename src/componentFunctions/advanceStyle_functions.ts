import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import Api from "@/api/styles/routes";

import {ref} from "vue";
import {AdvanceStyle, BaseStyleInterface, SaveStyle} from "@/models/Style.interface";
import {StoreActions} from "@/store";




export default function advanceStyle() {

    const toast = useToast()
    const router = useRouter()
    const store = useStore()

    const filterTypes = ref<string[]>([])
    const filterOperators = ref<string[]>([])
    const advanceStyleItem = ref<AdvanceStyle>()

    const getListFilterTypes = async () => {
        const response = await Api.getListFilterTypes<string[]>(toast)
        if (response.result) {
            filterTypes.value = response.result
        }
    }

    const getListFilterOperators = async () => {
        const response = await Api.getListFilterOperators<string[]>(toast)
        if (response.result) {
            filterOperators.value = response.result
        }
    }

    const addAdvanceModelStyle = async (data: AdvanceStyle) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addAdvanceModelStyle<SaveStyle>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result;
    }

    const getItemAdvanceStyle = async (id: number) => {

        const response = await Api.getItemAdvanceStyle<AdvanceStyle>(id, toast)


        if (response.result) {
            advanceStyleItem.value = response.result
        }
    }

    const editAdvanceModelStyle = async (data: AdvanceStyle,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editAdvanceModelStyle<AdvanceStyle>(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result;
    }

    return {
        getListFilterOperators,getListFilterTypes,filterTypes,filterOperators,addAdvanceModelStyle,getItemAdvanceStyle,advanceStyleItem,editAdvanceModelStyle
    }
}