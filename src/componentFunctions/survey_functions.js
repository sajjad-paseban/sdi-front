import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import wfs_functions from "@/components/openLayers/componentFunctions/wfs_functions";
import source_functions from "@/components/openLayers/componentFunctions/source";
import { StoreActions } from "@/store";
import Api from "@/api/survey/routes";
import { ref } from "vue";
export default function survey_functions() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const { getFeatureByField } = wfs_functions();
    const { getJsonFeaturesInfo } = source_functions();
    const arseInfoListData = ref([]);
    const getArseInfo = ref();
    const initFloorUsingList = ref([]);
    const apartmentList = ref([]);
    const apartmentItem = ref();
    const businessUnitInfoList = ref([]);
    const boardsList = ref([]);
    const personsList = ref([]);
    const archiveGroupList = ref([]);
    const archiveImagesList = ref([]);
    const archiveImageItem = ref();
    const arseCodeLocation = ref();
    const initAddressValue = ref();
    const registrationValues = ref();
    const arseInitStatus = ref();
    const correctFloat = (data, name) => {
        console.log(data[name], 'vcvv');
        let value = data[name];
        if (typeof data[name] === 'number') {
            console.log(data[name]);
            value = String(data[name]);
        }
        console.log(value);
        const numbers = value.split('.');
        console.log(numbers, 'sss');
        if (numbers.length > 1) {
            console.log(numbers[0]);
            if (numbers[0] === '') {
                numbers[0] = '0';
                data[name] = parseFloat(numbers.join('.'));
                console.log(data);
            }
        }
    };
    const changeCodeDisplay = (code, type) => {
        const x = [2, 2, 4, 6, 2, 3];
        let loop = 0;
        if (type == 'building') {
            loop = 4;
        }
        if (type == 'apartment') {
            loop = 5;
        }
        if (type == 'job') {
            loop = 6;
        }
        if (type == 'arse') {
            loop = 3;
        }
        for (let i = 0; i < loop; i++) {
            const array = code.split('-');
            let text = array[(array.length - 1)];
            text = text.substring(0, x[i]) + '-' + text.substring(x[i]);
            array[(array.length - 1)] = text;
            code = array.join('-');
        }
        return code;
    };
    const getBolockFeature = async () => {
        let layer = null;
        store.getters.getLayers.map((layerItem) => {
            if (layerItem.code === '1001')
                layer = layerItem;
        });
        const featureInfo = {
            name: 'code',
            value: '1'
        };
        if (layer) {
            const res = await getFeatureByField(layer, featureInfo.name, featureInfo.value);
            const resFeatures = await getJsonFeaturesInfo(res);
            return resFeatures;
        }
        else {
            return [];
        }
    };
    const getArseFeatureInfo = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getArseFeatureInfo(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            arseInfoListData.value = response.result;
        }
    };
    const getArseCodeLocation = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getArseCodeLocation(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            arseCodeLocation.value = response.result;
        }
    };
    const getProgressFeatureInfo = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getProgressFeatureInfo(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            return response.result;
        }
    };
    const getEnumsTable = async (data) => {
        const response = await Api.getEnumsTable(data, toast);
        if (response.result) {
            return response.result;
        }
        else {
            return [];
        }
    };
    const addArse = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addArse(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const editArse = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editArse(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const saveDistricts = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveDistricts(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const saveArseExtraInfo = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveArseExtraInfo(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const addBuilding = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addBuilding(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const editBuilding = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editBuilding(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const deleteBuilding = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteBuilding(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addProgress = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addProgress(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response;
    };
    const deleteProgress = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteProgress(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addBuildingFloor = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addBuildingFloor(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addBuildingStaircase = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.buildingStaircase(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getArse = async (id) => {
        const response = await Api.getArse(id, toast);
        if (response.result) {
            getArseInfo.value = response.result;
        }
        return response.text.length === 0;
    };
    const getArseFromExternal = async (id) => {
        const response = await Api.getArseFromExternal(id, toast);
        if (response.result) {
            getArseInfo.value = response.result;
        }
        return response.text.length === 0;
    };
    const addFloorCommons = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addFloorCommons(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addFloorInfo = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addFloorInfo(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getInitFloorUsing = async (id) => {
        const response = await Api.getInitFloorUsing(id, toast);
        if (response.result) {
            initFloorUsingList.value = response.result;
        }
    };
    const addFloorUsing = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addFloorUsing(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            initFloorUsingList.value = response.result;
        }
        return response.text.length === 0;
    };
    const getApartments = async (id) => {
        const response = await Api.getApartments(id, toast);
        if (response.result) {
            apartmentList.value = response.result;
        }
        return response.text.length === 0;
    };
    const getApartmentItem = async (id) => {
        const response = await Api.getApartmentItem(id, toast);
        if (response.result) {
            apartmentItem.value = response.result;
        }
        return response.text.length === 0;
    };
    const setApartmentAddress = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.setApartmentAddress(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const setOwners = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.setOwners(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const setRegistration = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.setRegistration(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const updateApartment = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.updateApartment(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const apartmentSetDistricts = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.setDistricts(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const apartmentSetFacilities = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.setFacilities(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addBusinessUnit = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addBusinessUnit(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result;
    };
    const getBusinessUnitList = async (id) => {
        const response = await Api.getBusinessUnitList(id, toast);
        if (response.result) {
            businessUnitInfoList.value = response.result;
        }
        return response.text.length === 0;
    };
    const editBusinessUnitInfo = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editBusinessUnitInfo(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addBusiness = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addBusiness(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.result?.id;
    };
    const editBusiness = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editBusiness(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getBusinessUnitCode = async (id) => {
        const response = await Api.getBusinessUnitCode(id, toast);
        return response.result;
    };
    const saveBoards = async (data, id) => {
        if (data.boards) {
            await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        }
        const response = await Api.saveBoards(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            boardsList.value = response.result;
        }
        return response.text.length === 0;
    };
    const getPersons = async (code) => {
        const response = await Api.getPersonsList(code, toast);
        if (response.result) {
            personsList.value = response.result;
        }
        return response.text.length === 0;
    };
    const addPerson = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addPerson(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addBusinessPerson = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addBusinessPerson(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const addBusinessVacation = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addBusinessVacation(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getArchiveGroup = async () => {
        const response = await Api.getArchiveGroup(toast);
        if (response.result) {
            archiveGroupList.value = response.result;
        }
        return response.text.length === 0;
    };
    const addImageArchive = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.addImageArchive(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getArchiveImagesList = async (data) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.getArchiveImagesList(data, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        if (response.result) {
            archiveImagesList.value = response.result;
        }
        return response.text.length === 0;
    };
    const getArchiveImageItem = async (id) => {
        const response = await Api.getArchiveImageItem(id, toast);
        if (response.result) {
            archiveImageItem.value = response.result;
        }
        return response.text.length === 0;
    };
    const editImageArchive = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.editImageArchive(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const deleteImageArchive = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteImageArchive(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const initApartments = async (id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.initApartments(id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const setArseAddress = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.setArseAddress(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const setArseOwners = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.setArseOwners(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getInitAddress = async (data) => {
        const response = await Api.getInitAddress(data, toast);
        if (response.result) {
            initAddressValue.value = response.result;
        }
        return response.text.length === 0;
    };
    const getRegistrationValues = async (data) => {
        const response = await Api.getRegistrationValues(data, toast);
        if (response.result) {
            registrationValues.value = response.result;
        }
        return response.text.length === 0;
    };
    const saveApartmentFeature = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.saveApartmentFeature(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const changeArseStatus = async (data, id) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.changeArseStatus(data, id, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    const getInitArseStatus = async (id) => {
        const response = await Api.getInitArseStatus(id, toast);
        if (response.result) {
            arseInitStatus.value = response.result;
        }
        return response.text.length === 0;
    };
    const getSurveyAccess = async (data) => {
        const response = await Api.getSurveyAccess(data, toast);
        return response.text.length === 0;
    };
    const deleteArse = async (code) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: true });
        const response = await Api.deleteArse(code, toast);
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, { type: 'simple', active: false });
        return response.text.length === 0;
    };
    return {
        getSurveyAccess, deleteArse,
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
    };
}
//# sourceMappingURL=survey_functions.js.map