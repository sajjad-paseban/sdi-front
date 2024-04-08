import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {StoreActions} from "@/store";
import Api from "@/api/print/routes";
import {LayerGroup, LayerGroupInterface} from "@/models/LayerGroup.interface";
import {Ref, ref} from "vue";
import {getInitAddModelInterface} from "@/api/print/SD.Models/getInitAddModel.sd";
import {InitDataPrintAdd, PrintTemplate} from "@/models/Print.interface";
import { UploadTempImageInterface} from "@/api/print/SD.Models/uploadTempImage.sd";
import {RemoveImageSdInterface} from "@/api/print/SD.Models/removeImage.sd";
import {PreviewModelSdModelInterface} from "@/api/print/SD.Models/previewModel.sd";
import {GetTempsSdInterface} from "@/api/print/SD.Models/getTemps.sd";
import {BusinessUnitInfo} from "@/models/Survey.interface";


export default function print_functions() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const tempGroupList = ref<LayerGroupInterface[]>([])
    const groupItem = ref<LayerGroupInterface>()
    const initDataAddModel = ref<InitDataPrintAdd>()
    const imagesLinks = ref<string[]>([])
    const previewFormDataValue = ref<string>('')
    const getTempsList = ref<PrintTemplate[]>([]) as Ref<PrintTemplate[]>
    const tempItem = ref<PrintTemplate>() as Ref<PrintTemplate>

    async function previewFormData(data:PreviewModelSdModelInterface){
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.previewFormData<PreviewModelSdModelInterface>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            previewFormDataValue.value = response.result.data
        }
    }


    const add = async (data: LayerGroupInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addTempGroup<LayerGroup>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const list = async () => {
        const response = await Api.listTempGroup<LayerGroupInterface[]>(toast)
        if (response.result) {
            tempGroupList.value = response.result
        }
    }

    const deleteTempGroup = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteTempGroup(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

    }

    const getItemTempGroup= async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getItemTempGroup<LayerGroupInterface>(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            groupItem.value = response.result
        }
    }

    const editTempGroup = async (data: LayerGroupInterface,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editTempGroup<LayerGroup>(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return !!response.result;
    }

    const getInitAddModel = async (data:getInitAddModelInterface) => {
        const response = await Api.getInitAddModel<InitDataPrintAdd>(data,toast)
        if (response.result) {
            initDataAddModel.value = response.result
        }
    }

    const uploadTempImage= async (data:UploadTempImageInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.uploadTempImage<string[]>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            imagesLinks.value = response.result
        }
    }

    const uploadModelImage= async (data:UploadTempImageInterface,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.uploadModelImage<string[]>(data, id,toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            imagesLinks.value = response.result
        }
    }


    const removeImageGallery= async (data:RemoveImageSdInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.removeImageGallery(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const saveFormData = async (data: PrintTemplate) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveFormData(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    async function getTemps(data:GetTempsSdInterface){
        const response = await Api.getTemps<PrintTemplate[]>(data, toast)
        if (response.result) {
            getTempsList.value = response.result
        }
    }
    const deleteTemp = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteTemp(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;

    }

    async function getItemTemp(id: number){
        const response = await Api.getItemTemp<PrintTemplate>(id, toast)
        if (response.result) {
            tempItem.value = response.result
        }
        return response.text.length === 0;
    }

    const saveEditFormData = async (data: PrintTemplate,id:number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveEditFormData(data,id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }



    return {
        saveFormData,getTemps,getTempsList,deleteTemp,getItemTemp,tempItem,uploadModelImage,saveEditFormData,
        getInitAddModel,initDataAddModel,imagesLinks,uploadTempImage,removeImageGallery,previewFormDataValue,
        previewFormData, add,list,tempGroupList,deleteTempGroup,getItemTempGroup,groupItem,editTempGroup
    }
}
