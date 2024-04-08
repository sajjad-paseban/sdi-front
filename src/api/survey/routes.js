import { newSendRequest } from "@/api/config";
import { getArseInfoListValidator } from "@/api/survey/validations/getArseInfo.vd";
import { getArseInfoTransformer } from "@/api/survey/transformers/getArseInfo.tf";
import { getProgressInfoValidator } from "@/api/survey/validations/getProgressInfo.vd";
import { getProgressInfoTransformer } from "@/api/survey/transformers/getProgressInfo.tf";
import { getSurveyLayersValidator } from "@/api/survey/validations/getSurveyLayers.vd";
import { getSurveyLayersTransformer } from "@/api/survey/transformers/getSurveyLayers.tf";
import { getSurveyCodingsValidator } from "@/api/survey/validations/getSurveyCoding.vd";
import { getSurveyCodingTransformer } from "@/api/survey/transformers/getSurveycoding.tf";
import { getEnumsTableValidator } from "@/api/survey/validations/getEnumsTable.vd";
import { getEnumsTableTransformer } from "@/api/survey/transformers/getEnumsTable.tf";
import { saveItemValidator } from "@/api/survey/validations/saveItem.vd";
import { saveItemTransformer } from "@/api/survey/transformers/saveItem.tf";
import { addProgressTransformer } from "@/api/survey/transformers/addProgress.tf";
import { addProgressValidator } from "@/api/survey/validations/addProgress.vd";
import { arseValidator } from "@/api/survey/validations/Arse.vd";
import { getArseTransformer } from "@/api/survey/transformers/getArse.tf";
import { initFloorUsingValidator } from "@/api/survey/validations/initFloorUsing.vd";
import { initFloorUsingTransformer } from "@/api/survey/transformers/initFloorUsing.tf";
import { addFloorUsingTransformer } from "@/api/survey/transformers/addFloorUsing.tf";
import { addFloorUsingValidator } from "@/api/survey/validations/addFloorUsing.vd";
import { getApartmentListValidator, getApartmentValidator } from "@/api/survey/validations/getApartmentsList.vd";
import { getApartmentListTransformer } from "@/api/survey/transformers/getApartmentList.tf";
import { getApartmentItemTransformer } from "@/api/survey/transformers/getApartmentItem.tf";
import { addBusinessUnitValidator } from "@/api/survey/validations/addBusinessUnit.vd";
import { addBusinessUnitTransformer } from "@/api/survey/transformers/addBusinessUnit.tf";
import { businessUnitInfoListTransformer } from "@/api/survey/transformers/businessUnitInfoList.tf";
import { businessUnitInfoArrayValidator } from "@/api/survey/validations/businessUnitInfo.vd";
import { getBusinessUnitCodeTransformer } from "@/api/survey/transformers/getBusinessUnitCode.tf";
import { getBusinessUnitCodeValidator } from "@/api/survey/validations/getBusinessUnitCode.vd";
import { businessBoardListValidator } from "@/api/survey/validations/businessBoards.vd";
import { businessBoardTransformer } from "@/api/survey/transformers/businessBoard.tf";
import { apartmentPersonListValidator } from "@/api/survey/validations/apartmentPerson.vd";
import { getPersonListTransformer } from "@/api/survey/transformers/getPersonList.tf";
import { addArchiveGroupListValidator } from "@/api/survey/validations/getArchiveGroup.vd";
import { getArchiveGroupTransformer } from "@/api/survey/transformers/getArchiveGroup.tf";
import { getArchiveImagesListTransformer } from "@/api/survey/transformers/getArchiveImagesList.tf";
import { getArchiveImagesListValidator, getArchiveImageValidator } from "@/api/survey/validations/getArchiveImagesList.vd";
import { getArchiveImageItemTransformer } from "@/api/survey/transformers/getArchiveImageItem.tf";
import { getArseCodeLocationValidator } from "@/api/survey/validations/getArseCodeLocation.vd";
import { getArseCodeLocationTransformer } from "@/api/survey/transformers/getArseCodeLocation.tf";
import { getAddressInitValidator } from "@/api/survey/validations/getAddressInit.vd";
import { getInitAddressTransformer } from "@/api/survey/transformers/getInitAddress.tf";
import { getRegistrationValuesValidator } from "@/api/survey/validations/getRegistrationValues.vd";
import { getRegistrationValuesTransformer } from "@/api/survey/transformers/getRegistrationValues.tf";
import { getInitArseStatusValidator } from "@/api/survey/validations/getInitArseLog.vd";
import { initArseStatusTransformer } from "@/api/survey/transformers/initArseStatus.tf";
export default {
    getArseFeatureInfo: async function (data, toast) {
        const url = 'survey/getArseFeatureInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', getArseInfoListValidator, getArseInfoTransformer, data, undefined, toast);
        console.log(result, 'getArseFeatureInfo response');
        return result;
    },
    getInitAddress: async function (data, toast) {
        const url = 'survey/getInitAddress';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', getAddressInitValidator, getInitAddressTransformer, data, undefined, toast);
        console.log(result, 'getInitAddress response');
        return result;
    },
    getArseCodeLocation: async function (data, toast) {
        const url = 'survey/getArseCodeLocation';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', getArseCodeLocationValidator, getArseCodeLocationTransformer, data, undefined, toast);
        console.log(result, 'getArseCodeLocation response');
        return result;
    },
    getProgressFeatureInfo: async function (data, toast) {
        const url = 'survey/getProgressFeatureInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', getProgressInfoValidator, getProgressInfoTransformer, data, undefined, toast);
        console.log(result, 'getProgressFeatureInfo response');
        return result;
    },
    getSurveyLayers: async function (toast) {
        const url = 'survey/getCodeTableValue';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getSurveyLayersValidator, getSurveyLayersTransformer, { name: 'SurveyLayerManagement' }, undefined, toast);
        console.log(result, 'getSurveyLayers response');
        return result;
    },
    getSurveyCoding: async function (toast) {
        const url = 'survey/getCodeTableValue';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getSurveyCodingsValidator, getSurveyCodingTransformer, { name: 'coding' }, undefined, toast);
        console.log(result, 'getSurveyCoding response');
        return result;
    },
    getEnumsTable: async function (data, toast) {
        const url = 'survey/getCodeTableValue';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getEnumsTableValidator, getEnumsTableTransformer, data, undefined, toast);
        console.log(result, `getEnumsTable ${data.name} response`);
        return result;
    },
    addArse: async function (data, toast) {
        const url = 'survey/createArse';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', saveItemValidator, saveItemTransformer, data, undefined, toast);
        console.log(result, 'addArse response');
        return result;
    },
    editArse: async function (data, id, toast) {
        const url = 'survey/editArse';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast);
        console.log(result, 'editArse response');
        return result;
    },
    saveDistricts: async function (data, id, toast) {
        const url = 'survey/createDistricts';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast);
        console.log(result, 'saveDistricts response');
        return result;
    },
    saveArseExtraInfo: async function (data, id, toast) {
        const url = 'survey/createArseExtraInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast);
        console.log(result, 'saveArseExtraInfo response');
        return result;
    },
    setArseAddress: async function (data, id, toast) {
        const url = 'survey/setArseAddress';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'setArseAddress response');
        return result;
    },
    setArseOwners: async function (data, id, toast) {
        const url = 'survey/setArseOwners';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'setArseOwners response');
        return result;
    },
    addBuilding: async function (data, id, toast) {
        const url = 'survey/addBuilding';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast);
        console.log(result, 'addBuilding response');
        return result;
    },
    editBuilding: async function (data, id, toast) {
        const url = 'survey/editBuilding';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast);
        console.log(result, 'editBuilding response');
        return result;
    },
    deleteBuilding: async function (id, toast) {
        const url = 'survey/deleteBuilding';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteBuilding response');
        return result;
    },
    addProgress: async function (data, toast) {
        const url = 'survey/addProgress';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', addProgressValidator, addProgressTransformer, data, undefined, toast);
        console.log(result, 'addProgress response');
        return result;
    },
    deleteProgress: async function (id, toast) {
        const url = 'survey/deleteProgress';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteProgress response');
        return result;
    },
    addBuildingFloor: async function (data, id, toast) {
        const url = 'survey/buildingFloorInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'addBuildingFloor response');
        return result;
    },
    buildingStaircase: async function (data, id, toast) {
        const url = 'survey/buildingStaircase';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'addStairCaseInterface response');
        return result;
    },
    getArse: async function (id, toast) {
        const url = 'survey/getArse';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', arseValidator, getArseTransformer, undefined, id, toast);
        console.log(result, 'getArse response');
        return result;
    },
    getArseFromExternal: async function (id, toast) {
        const url = 'survey/getArseFromExternal';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', arseValidator, getArseTransformer, undefined, id, toast);
        console.log(result, 'getArseFromExternal response');
        return result;
    },
    addFloorCommons: async function (data, id, toast) {
        const url = 'survey/floorCommons';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, id, toast);
        console.log(result, 'addFloorCommons response');
        return result;
    },
    addFloorInfo: async function (data, id, toast) {
        const url = 'survey/floorInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'addFloorInfo response');
        return result;
    },
    addFloorUsing: async function (data, id, toast) {
        const url = 'survey/floorUsing';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', addFloorUsingValidator, addFloorUsingTransformer, data, id, toast);
        console.log(result, 'addFloorUsing response');
        return result;
    },
    getInitFloorUsing: async function (id, toast) {
        const url = 'survey/floorInitUsing';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', initFloorUsingValidator, initFloorUsingTransformer, undefined, id, toast);
        console.log(result, 'getInitFloorUsing response');
        return result;
    },
    getApartments: async function (id, toast) {
        const url = 'survey/getApartments';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getApartmentListValidator, getApartmentListTransformer, undefined, id, toast);
        console.log(result, 'getApartments response');
        return result;
    },
    getApartmentItem: async function (id, toast) {
        const url = 'survey/getApartment';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getApartmentValidator, getApartmentItemTransformer, undefined, id, toast);
        console.log(result, 'getApartmentItem response');
        return result;
    },
    setApartmentAddress: async function (data, id, toast) {
        const url = 'survey/setApartmentAddress';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'setApartmentAddress response');
        return result;
    },
    setRegistration: async function (data, id, toast) {
        const url = 'survey/setRegistration';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'setRegistration response');
        return result;
    },
    getRegistrationValues: async function (data, toast) {
        const url = 'survey/calculateRegistrationValues';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getRegistrationValuesValidator, getRegistrationValuesTransformer, data, undefined, toast);
        console.log(result, 'getRegistrationValues response');
        return result;
    },
    setOwners: async function (data, id, toast) {
        const url = 'survey/setOwners';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'setOwners response');
        return result;
    },
    updateApartment: async function (data, id, toast) {
        const url = 'survey/updateApartment';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, id, toast);
        console.log(result, 'updateApartment response');
        return result;
    },
    saveApartmentFeature: async function (data, id, toast) {
        const url = 'survey/saveApartmentFeature';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'saveApartmentFeature response');
        return result;
    },
    setDistricts: async function (data, id, toast) {
        const url = 'survey/setDistricts';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'apartment setDistricts response');
        return result;
    },
    setFacilities: async function (data, id, toast) {
        const url = 'survey/setFacilities';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast);
        console.log(result, 'apartment setFacilities response');
        return result;
    },
    addBusinessUnit: async function (data, toast) {
        const url = 'survey/addBusinessUnit';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', addBusinessUnitValidator, addBusinessUnitTransformer, data, undefined, toast);
        console.log(result, 'addBusinessUnit response');
        return result;
    },
    getBusinessUnitList: async function (id, toast) {
        const url = 'survey/businessUnitList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', businessUnitInfoArrayValidator, businessUnitInfoListTransformer, undefined, id, toast);
        console.log(result, 'getBusinessUnitList response');
        return result;
    },
    editBusinessUnitInfo: async function (data, id, toast) {
        const url = 'survey/editBusinessUnit';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, id, toast);
        console.log(result, 'editBusinessUnitInfo response');
        return result;
    },
    addBusiness: async function (data, id, toast) {
        const url = 'survey/addBusiness';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', saveItemValidator, saveItemTransformer, data, id, toast);
        console.log(result, 'addBusiness response');
        return result;
    },
    editBusiness: async function (data, id, toast) {
        const url = 'survey/business';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, id, toast);
        console.log(result, 'editBusiness response');
        return result;
    },
    getBusinessUnitCode: async function (id, toast) {
        const url = 'survey/getBusinessUnitCode';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getBusinessUnitCodeValidator, getBusinessUnitCodeTransformer, undefined, id, toast);
        console.log(result, 'getBusinessUnitCode response');
        return result;
    },
    saveBoards: async function (data, id, toast) {
        const url = 'survey/board';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', businessBoardListValidator, businessBoardTransformer, data, id, toast);
        console.log(result, 'saveBoards-listBoard response');
        return result;
    },
    addPerson: async function (data, toast) {
        const url = 'peoples/addPerson';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'addPerson response');
        return result;
    },
    getPersonsList: async function (id, toast) {
        const url = 'peoples/searchPerson';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', apartmentPersonListValidator, getPersonListTransformer, undefined, id, toast);
        console.log(result, 'getPersonsList response');
        return result;
    },
    addBusinessPerson: async function (data, toast) {
        const url = 'survey/addBusinessPerson';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'addBusinessPerson response');
        return result;
    },
    addBusinessVacation: async function (data, toast) {
        const url = 'survey/addBusinessVacation';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'addBusinessVacation response');
        return result;
    },
    getArchiveGroup: async function (toast) {
        const url = 'survey/archiveGroup';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', addArchiveGroupListValidator, getArchiveGroupTransformer, undefined, undefined, toast);
        console.log(result, 'getArchiveGroup response');
        return result;
    },
    addImageArchive: async function (data, toast) {
        const url = 'survey/addImageArchive';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast, true, true);
        console.log(result, 'addImageArchive response');
        return result;
    },
    getArchiveImagesList: async function (data, toast) {
        const url = 'survey/archiveImagesList';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', getArchiveImagesListValidator, getArchiveImagesListTransformer, data, undefined, toast);
        console.log(result, 'getArchiveImagesList response');
        return result;
    },
    getArchiveImageItem: async function (id, toast) {
        const url = 'survey/archiveImage';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getArchiveImageValidator, getArchiveImageItemTransformer, undefined, id, toast);
        console.log(result, 'getArchiveImageItem response');
        return result;
    },
    editImageArchive: async function (data, id, toast) {
        const url = 'survey/editImageArchive';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'put', undefined, undefined, data, id, toast, true, true);
        console.log(result, 'editImageArchive response');
        return result;
    },
    deleteImageArchive: async function (id, toast) {
        const url = 'survey/deleteImageArchive';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, id, toast);
        console.log(result, 'deleteImageArchive response');
        return result;
    },
    initApartments: async function (id, toast) {
        const url = 'survey/initApartments';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', undefined, undefined, undefined, id, toast);
        console.log(result, 'initApartments response');
        return result;
    },
    changeArseStatus: async function (data, id, toast) {
        const url = 'survey/changeArseStatus';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, id, toast, true, true);
        console.log(result, 'ChangeArseStatusSd response');
        return result;
    },
    getInitArseStatus: async function (id, toast) {
        const url = 'survey/initArseStatus';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'get', getInitArseStatusValidator, initArseStatusTransformer, undefined, id, toast);
        console.log(result, 'getInitArseStatus response');
        return result;
    },
    getSurveyAccess: async function (data, toast) {
        const url = 'survey/addArseAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'post', undefined, undefined, data, undefined, toast);
        console.log(result, 'getSurveyAccess response');
        return result;
    },
    deleteArse: async function (code, toast) {
        const url = 'survey/deleteArse';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result = await newSendRequest(url, 'delete', undefined, undefined, undefined, code, toast);
        console.log(result, 'deleteArse response');
        return result;
    },
};
//# sourceMappingURL=routes.js.map