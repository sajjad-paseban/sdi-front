import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {StoreActions} from "@/store";
import Api from "@/api/styles/routes";
import {BaseStyleInterface, ListStyles, SaveStyle, StylePattern} from "@/models/Style.interface";
import {ref} from "vue";



export default function baseStyle() {

    const toast = useToast()
    const router = useRouter()
    const store = useStore()

    const baseStyleItem = ref<BaseStyleInterface>()
    const listStyles = ref<ListStyles[]>()
    const linePatterns = ref<StylePattern[]>()
    const polygonPatterns = ref<StylePattern[]>()

    const getItemBaseStyle = async (id: number) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getItemBaseStyle<BaseStyleInterface>(id, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            baseStyleItem.value = response.result
        }
    }

    const getListBaseStyles = async (data: string) => {
        const response = await Api.getListBaseStyle<ListStyles[]>({geo_type: data}, toast)
        if (response.result) {
            listStyles.value = response.result.map((value)=>{
                value.legend = store.state.geoUrl + value.legend
                return value
            })
        }
    }

    const getLinePattern = async () => {
            const response = await Api.getLinePattern<StylePattern[]>(toast)
            if (response.result) {
                linePatterns.value = response.result
            }
        }

    const getPolygonPattern = async () => {
        const response = await Api.getPolygonPattern<StylePattern[]>(toast)
        if (response.result) {
            polygonPatterns.value = response.result
        }
    }

    const addBaseModelStyle = async (data: BaseStyleInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addBaseModelStyle<SaveStyle>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result;
    }

    const editBaseModelStyle = async (data: BaseStyleInterface,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editBaseModelStyle<SaveStyle>(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result;
    }

    const deleteBaseStyle = async (id: number) => {
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteBaseStyle(id, toast)
        store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

    }


    return {
        baseStyleItem,
        getItemBaseStyle,
        getListBaseStyles,
        listStyles,
        getLinePattern,
        getPolygonPattern,
        linePatterns,
        polygonPatterns,
        addBaseModelStyle,
        deleteBaseStyle,
        editBaseModelStyle
    }
}