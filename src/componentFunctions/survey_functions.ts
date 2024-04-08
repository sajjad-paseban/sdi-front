import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {LayerItem} from "@/store/openLayer/types";
import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
import source_functions from "@/components/openLayers/componentFunctions/source";
import Feature from 'ol/Feature.js';
import {StoreActions} from "@/store";
import Api from "@/api/survey/routes";
import {LayerGroup} from "@/models/LayerGroup.interface";
import {addFeatureInterface} from "@/api/feature/SD.Models/addFeature";
import {ref} from "vue";
import {
    Aparteman, ApartmentAddress, ApartmentRegistration, Archive, ArchiveGroup,
    Arse, BusinessBoard, BusinessInfo, BusinessPerson, BusinessUnitInfo, BusinessVacation,
    District,
    EnumsTableItem, Facilities,
    FloorInfo,
    floorUsage, InitAddress, InitArseStatus, Owner, Person,
    ProgressInfo, RegistrationValues,
    SaveItem
} from "@/models/Survey.interface";
import {AddProgressFeatureInterface} from "@/api/survey/SD.Models/addProgressFeature.sd";
import {GetEnumsTableSdInterface} from "@/api/survey/SD.Models/getEnumsTable.sd";
import {addArseInterface} from "@/api/survey/SD.Models/addArse.sd";
import {addDistrictsInterface} from "@/api/survey/SD.Models/addِDistricts.sd";
import {addArseExtraInterface} from "@/api/survey/SD.Models/addArseExtra.sd";
import {addBuildingInterface} from "@/api/survey/SD.Models/addBuilding.sd";
import {addProgressInterface} from "@/api/survey/SD.Models/addProgress.sd";
import {addBuildingFloorInterface} from "@/api/survey/SD.Models/addBuildingFloor.sd";
import {addStairCaseInterface} from "@/api/survey/SD.Models/addStaircase.sd";
import {floorsCommonsInterface} from "@/api/survey/SD.Models/floorCommons.sd";
import {Ref} from "vue/dist/vue";
import {addFloorUsingInterface} from "@/api/survey/SD.Models/addFloorUsing.sd";
import {addBusinessUnitInterface} from "@/api/survey/SD.Models/addBusinessUnit.sd";
import {boardInterface} from "@/api/survey/SD.Models/board.sd";
import {getArchiveListInterface} from "@/api/survey/SD.Models/getArchiveList.sd";
import {getRegistrationValuesInterface} from "@/api/survey/SD.Models/getRegistrationValues.sd";
import {AddApartmentFeatureInterface} from "@/api/survey/SD.Models/addApartmentFeature.sd";
import {ChangeArseStatusSd} from "@/api/survey/SD.Models/changeArseStatus.sd";
import {getAccessInterface} from "@/api/survey/SD.Models/getAccess.sd";


export default function survey_functions() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const {getFeatureByField} = wfs_functions()
    const {getJsonFeaturesInfo} = source_functions()

    const arseInfoListData = ref<District[]>([])
    const getArseInfo = ref<Arse>()
    const initFloorUsingList = ref<floorUsage[]>([]) as Ref<floorUsage[]>
    const apartmentList = ref<Aparteman[]>([]) as Ref<Aparteman[]>
    const apartmentItem = ref<Aparteman>() as Ref<Aparteman>
    const businessUnitInfoList = ref<BusinessUnitInfo[]>([]) as Ref<BusinessUnitInfo[]>
    const boardsList = ref<BusinessBoard[]>([]) as Ref<BusinessBoard[]>
    const personsList = ref<Person[]>([]) as Ref<Person[]>
    const archiveGroupList = ref<ArchiveGroup[]>([]) as Ref<ArchiveGroup[]>
    const archiveImagesList = ref<Archive[]>([]) as Ref<Archive[]>
    const archiveImageItem = ref<Archive>() as Ref<Archive>
    const arseCodeLocation = ref<number>()
    const initAddressValue = ref<InitAddress>()
    const registrationValues = ref<RegistrationValues>()
    const arseInitStatus = ref<InitArseStatus>() as Ref<InitArseStatus>


    const correctFloat = (data: any, name: string) => {
        console.log(data[name], 'vcvv')
        let value = data[name]
        if (typeof data[name] === 'number') {
            console.log(data[name])
            value = String(data[name])

        }
        console.log(value)
        const numbers = value.split('.')
        console.log(numbers, 'sss')
        if (numbers.length > 1) {
            console.log(numbers[0])
            if (numbers[0] === '') {
                numbers[0] = '0'
                data[name] = parseFloat(numbers.join('.'))
                console.log(data)
            }
        }
    }

    const changeCodeDisplay = (code: string, type: string) => {
        const x = [2, 2, 4, 6, 2, 3]
        let loop = 0
        if (type == 'building') {
            loop = 4
        }

        if (type == 'apartment') {
            loop = 5
        }

        if (type == 'job') {
            loop = 6
        }

        if (type == 'arse') {
            loop = 3
        }

        for (let i = 0; i < loop; i++) {
            const array = code.split('-')
            let text = array[(array.length - 1)]
            text = text.substring(0, x[i]) + '-' + text.substring(x[i]);
            array[(array.length - 1)] = text
            code = array.join('-')
        }
        return code
    }

    const getBolockFeature = async (): Promise<Feature[]> => {

        let layer: LayerItem | null = null
        store.getters.getLayers.map((layerItem: LayerItem) => {
            if (layerItem.code === '1001')
                layer = layerItem
        })
        const featureInfo = {
            name: 'code',
            value: '1'
        }

        if (layer) {
            const res = await getFeatureByField(layer, featureInfo.name, featureInfo.value)
            const resFeatures = await getJsonFeaturesInfo(res)
            return resFeatures
        } else {
            return []
        }


    }

    const getArseFeatureInfo = async (data: addFeatureInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getArseFeatureInfo<District[]>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            arseInfoListData.value = response.result
        }
    }


    const getArseCodeLocation = async (data: addFeatureInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getArseCodeLocation<number>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})

        if (response.result) {
            arseCodeLocation.value = response.result
        }
    }


    const getProgressFeatureInfo = async (data: AddProgressFeatureInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getProgressFeatureInfo<ProgressInfo>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            return response.result
        }
    }

    const getEnumsTable = async (data: GetEnumsTableSdInterface): Promise<EnumsTableItem[]> => {
        const response = await Api.getEnumsTable<EnumsTableItem[]>(data, toast)

        if (response.result) {
            return response.result
        } else {
            return []
        }
    }


    const addArse = async (data: addArseInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addArse<SaveItem>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const editArse = async (data: addArseInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editArse<SaveItem>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const saveDistricts = async (data: addDistrictsInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveDistricts<SaveItem>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }


    const saveArseExtraInfo = async (data: addArseExtraInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveArseExtraInfo<SaveItem>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const addBuilding = async (data: addBuildingInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addBuilding<SaveItem>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const editBuilding = async (data: addBuildingInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editBuilding<SaveItem>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }

    const deleteBuilding = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteBuilding(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addProgress = async (data: addProgressInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addProgress(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response;
    }


    const deleteProgress = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteProgress(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addBuildingFloor = async (data: addBuildingFloorInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addBuildingFloor(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addBuildingStaircase = async (data: addStairCaseInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.buildingStaircase(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const getArse = async (id: string | string[]) => {
        const response = await Api.getArse<Arse>(id, toast)
        if (response.result) {
            getArseInfo.value = response.result
        }
        return response.text.length === 0;
    }

    const getArseFromExternal = async (id: string | string[]) => {
        const response = await Api.getArseFromExternal<Arse>(id, toast)
        if (response.result) {
            getArseInfo.value = response.result
        }
        return response.text.length === 0;
    }

    const addFloorCommons = async (data: floorsCommonsInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addFloorCommons(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addFloorInfo = async (data: FloorInfo, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addFloorInfo(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const getInitFloorUsing = async (id: number) => {
        const response = await Api.getInitFloorUsing<floorUsage[]>(id, toast)
        if (response.result) {
            initFloorUsingList.value = response.result
        }
    }


    const addFloorUsing = async (data: addFloorUsingInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addFloorUsing<floorUsage[]>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            initFloorUsingList.value = response.result
        }
        return response.text.length === 0;
    }


    const getApartments = async (id: number) => {
        const response = await Api.getApartments<Aparteman[]>(id, toast)
        if (response.result) {
            apartmentList.value = response.result
        }
        return response.text.length === 0;
    }

    const getApartmentItem = async (id: number) => {
        const response = await Api.getApartmentItem<Aparteman>(id, toast)
        if (response.result) {
            apartmentItem.value = response.result
        }
        return response.text.length === 0;
    }

    const setApartmentAddress = async (data: ApartmentAddress, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.setApartmentAddress(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const setOwners = async (data: Owner[], id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.setOwners(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const setRegistration = async (data: ApartmentRegistration, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.setRegistration(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const updateApartment = async (data: Aparteman, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.updateApartment(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const apartmentSetDistricts = async (data: District[], id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.setDistricts(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const apartmentSetFacilities = async (data: Facilities[], id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.setFacilities(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const addBusinessUnit = async (data: addBusinessUnitInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addBusinessUnit<number>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result;
    }


    const getBusinessUnitList = async (id: number) => {
        const response = await Api.getBusinessUnitList<BusinessUnitInfo[]>(id, toast)
        if (response.result) {
            businessUnitInfoList.value = response.result
        }
        return response.text.length === 0;
    }

    const editBusinessUnitInfo = async (data: BusinessUnitInfo, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editBusinessUnitInfo(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const addBusiness = async (data: BusinessInfo, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addBusiness<SaveItem>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.result?.id;
    }
    const editBusiness = async (data: BusinessInfo, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editBusiness(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const getBusinessUnitCode = async (id: number) => {
        const response = await Api.getBusinessUnitCode<string>(id, toast)
        return response.result;
    }

    const saveBoards = async (data: boardInterface, id: number) => {
        if (data.boards) {
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        }
        const response = await Api.saveBoards<BusinessBoard[]>(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            boardsList.value = response.result
        }
        return response.text.length === 0;
    }

    const getPersons = async (code: string) => {
        const response = await Api.getPersonsList<Person[]>(code, toast)
        if (response.result) {
            personsList.value = response.result
        }
        return response.text.length === 0;
    }

    const addPerson = async (data: Person) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addPerson(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const addBusinessPerson = async (data: BusinessPerson[]) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addBusinessPerson(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const addBusinessVacation = async (data: BusinessVacation[]) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addBusinessVacation(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const getArchiveGroup = async () => {
        const response = await Api.getArchiveGroup<ArchiveGroup[]>(toast)
        if (response.result) {
            archiveGroupList.value = response.result
        }
        return response.text.length === 0;
    }

    const addImageArchive = async (data: Archive) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.addImageArchive(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const getArchiveImagesList = async (data: getArchiveListInterface) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.getArchiveImagesList<Archive[]>(data, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        if (response.result) {
            archiveImagesList.value = response.result
        }
        return response.text.length === 0;
    }

    const getArchiveImageItem = async (id: number) => {
        const response = await Api.getArchiveImageItem<Archive>(id, toast)
        if (response.result) {
            archiveImageItem.value = response.result
        }
        return response.text.length === 0;
    }

    const editImageArchive = async (data: Archive, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.editImageArchive(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const deleteImageArchive = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteImageArchive(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const initApartments = async (id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.initApartments(id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const setArseAddress = async (data: ApartmentAddress, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.setArseAddress(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const setArseOwners = async (data: Owner[], id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.setArseOwners(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const getInitAddress = async (data: addFeatureInterface) => {
        const response = await Api.getInitAddress<InitAddress>(data, toast)
        if (response.result) {
            initAddressValue.value = response.result
        }
        return response.text.length === 0;
    }

    const getRegistrationValues = async (data: getRegistrationValuesInterface) => {
        const response = await Api.getRegistrationValues<RegistrationValues>(data, toast)
        if (response.result) {
            registrationValues.value = response.result
        }
        return response.text.length === 0;
    }

    const saveApartmentFeature = async (data: AddApartmentFeatureInterface, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.saveApartmentFeature(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    const changeArseStatus = async (data: ChangeArseStatusSd, id: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.changeArseStatus(data, id, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }

    const getInitArseStatus = async (id: number) => {
        const response = await Api.getInitArseStatus<InitArseStatus>(id, toast)
        if (response.result) {
            arseInitStatus.value = response.result
        }
        return response.text.length === 0;
    }

    const getSurveyAccess = async (data: getAccessInterface) => {
        const response = await Api.getSurveyAccess(data, toast)

        return response.text.length === 0;
    }

    const deleteArse = async (code: string) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Api.deleteArse(code, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length === 0;
    }


    return {
        getSurveyAccess,deleteArse,
        getInitArseStatus, arseInitStatus,
        saveApartmentFeature, changeArseStatus,
        getRegistrationValues, registrationValues,
        getInitAddress, initAddressValue,
        setArseAddress, setArseOwners,
        initApartments, getArseFromExternal,
        editImageArchive, deleteImageArchive,
        getArchiveImageItem, archiveImageItem,
        getArchiveImagesList, archiveImagesList,
        addImageArchive,
        getArchiveGroup, archiveGroupList,
        changeCodeDisplay,
        addBusinessVacation,
        addBusinessPerson,
        addPerson, getPersons, personsList,
        saveBoards, boardsList,
        getBusinessUnitCode,
        addBusiness, editBusiness,
        editBusinessUnitInfo,
        businessUnitInfoList, getBusinessUnitList,
        addBusinessUnit,
        apartmentSetDistricts, apartmentSetFacilities,
        setApartmentAddress, setOwners, setRegistration, updateApartment,
        apartmentItem, getApartmentItem,
        apartmentList, getApartments,
        addFloorUsing,
        initFloorUsingList, getInitFloorUsing,
        getArse, getArseInfo, addFloorCommons, addFloorInfo,
        deleteProgress, addBuildingFloor, addBuildingStaircase,
        getBolockFeature,
        getArseFeatureInfo, arseInfoListData,
        getProgressFeatureInfo,
        getEnumsTable,
        addArse, editArse,
        saveDistricts,
        saveArseExtraInfo, addBuilding, editBuilding, deleteBuilding,
        addProgress,
        correctFloat,
        getArseCodeLocation, arseCodeLocation,
    }
}
