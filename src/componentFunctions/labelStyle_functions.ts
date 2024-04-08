import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {StoreActions} from "@/store";
import Api from "@/api/styles/routes";
import {BaseStyleInterface, LabelStyleInterface, ListStyles, SaveStyle, StylePattern} from "@/models/Style.interface";
import {ref} from "vue";
import {string} from "zod";


export default function labelStyle() {

    const toast = useToast()
    const router = useRouter()
    const store = useStore()


    const listStyles = ref<ListStyles[]>()
    const listFonts = ref<string[]>()
    const fontStyles = ref<string[]>()
    const fontWights = ref<string[]>()
    const labelStyleItem = ref<LabelStyleInterface>()


    const getListTextStyles = async () => {
        const response = await Api.getListTextStyle<ListStyles[]>(toast)
        if (response.result) {
            listStyles.value = response.result.map((value) => {
                value.legend = store.state.frontUrl + value.legend
                return value
            })
        }
    }


    const getListFonts = async () => {
        const response = await Api.getListFonts<string[]>(toast)
        if (response.result) {
            listFonts.value = response.result
        }
    }

    const getFontStyles = async () => {
        const response = await Api.getFontStyles<string[]>(toast)
        if (response.result) {
            fontStyles.value = response.result
        }
    }

    const getFontWights = async () => {
        const response = await Api.getFontWights<string[]>(toast)
        if (response.result) {
            fontWights.value = response.result
        }
    }

    const addTextStyle = async (data: LabelStyleInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addTextStyle<SaveStyle>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result;

    }

    const getItemLabelStyle = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getItemLabelStyle<LabelStyleInterface>(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            labelStyleItem.value = response.result
        }
    }

    const deleteTextStyle = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteTextStyle(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

    }

    const editTextModelStyle = async (data: LabelStyleInterface,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editTextStyle<SaveStyle>(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result;
    }

    return {
        deleteTextStyle,
        editTextModelStyle,
        listStyles,
        getListTextStyles,
        getListFonts,
        listFonts,
        getFontStyles,
        fontStyles,
        getFontWights,
        fontWights,
        addTextStyle,
        getItemLabelStyle,
        labelStyleItem
    }
}