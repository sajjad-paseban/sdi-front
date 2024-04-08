import {MyApiResponse, newSendRequest} from "@/api/config";
import {z} from "zod";
import {addFeatureInterface} from "@/api/feature/SD.Models/addFeature";
import {getArseInfoListValidator} from "@/api/survey/validations/getArseInfo.vd";
import {getArseInfoTransformer} from "@/api/survey/transformers/getArseInfo.tf";
import {AddProgressFeatureInterface} from "@/api/survey/SD.Models/addProgressFeature.sd";
import {getProgressInfoValidator} from "@/api/survey/validations/getProgressInfo.vd";
import {getProgressInfoTransformer} from "@/api/survey/transformers/getProgressInfo.tf";
import {getSurveyLayersValidator} from "@/api/survey/validations/getSurveyLayers.vd";
import {getSurveyLayersTransformer} from "@/api/survey/transformers/getSurveyLayers.tf";
import {getSurveyCodingsValidator} from "@/api/survey/validations/getSurveyCoding.vd";
import {getSurveyCodingTransformer} from "@/api/survey/transformers/getSurveycoding.tf";
import {GetEnumsTableSdInterface} from "@/api/survey/SD.Models/getEnumsTable.sd";
import {getEnumsTableValidator} from "@/api/survey/validations/getEnumsTable.vd";
import {getEnumsTableTransformer} from "@/api/survey/transformers/getEnumsTable.tf";
import {addArseInterface} from "@/api/survey/SD.Models/addArse.sd";
import {saveItemValidator} from "@/api/survey/validations/saveItem.vd";
import {saveItemTransformer} from "@/api/survey/transformers/saveItem.tf";
import {
    Aparteman,
    ApartmentAddress,
    ApartmentRegistration, Archive, BusinessInfo, BusinessPerson, BusinessUnitInfo, BusinessVacation,
    District, Facilities,
    FloorInfo,
    Owner, Person
} from "@/models/Survey.interface";
import {addDistrictsInterface} from "@/api/survey/SD.Models/addِDistricts.sd";
import {addArseExtraInterface} from "@/api/survey/SD.Models/addArseExtra.sd";
import {addBuildingInterface} from "@/api/survey/SD.Models/addBuilding.sd";
import {addProgressInterface} from "@/api/survey/SD.Models/addProgress.sd";
import {addProgressTransformer} from "@/api/survey/transformers/addProgress.tf";
import {addProgressValidator} from "@/api/survey/validations/addProgress.vd";
import {addBuildingFloorInterface} from "@/api/survey/SD.Models/addBuildingFloor.sd";
import {addStairCaseInterface} from "@/api/survey/SD.Models/addStaircase.sd";
import {arseValidator} from "@/api/survey/validations/Arse.vd";
import {getArseTransformer} from "@/api/survey/transformers/getArse.tf";
import {floorsCommonsInterface} from "@/api/survey/SD.Models/floorCommons.sd";
import {initFloorUsingValidator} from "@/api/survey/validations/initFloorUsing.vd";
import {initFloorUsingTransformer} from "@/api/survey/transformers/initFloorUsing.tf";
import {addFloorUsingInterface} from "@/api/survey/SD.Models/addFloorUsing.sd";
import {addFloorUsingTransformer} from "@/api/survey/transformers/addFloorUsing.tf";
import {addFloorUsingValidator} from "@/api/survey/validations/addFloorUsing.vd";
import {getApartmentListValidator, getApartmentValidator} from "@/api/survey/validations/getApartmentsList.vd";
import {getApartmentListTransformer} from "@/api/survey/transformers/getApartmentList.tf";
import {getApartmentItemTransformer} from "@/api/survey/transformers/getApartmentItem.tf";
import {addBusinessUnitInterface} from "@/api/survey/SD.Models/addBusinessUnit.sd";
import {addBusinessUnitValidator} from "@/api/survey/validations/addBusinessUnit.vd";
import {addBusinessUnitTransformer} from "@/api/survey/transformers/addBusinessUnit.tf";
import {businessUnitInfoListTransformer} from "@/api/survey/transformers/businessUnitInfoList.tf";
import {businessUnitInfoArrayValidator} from "@/api/survey/validations/businessUnitInfo.vd";
import {getBusinessUnitCodeTransformer} from "@/api/survey/transformers/getBusinessUnitCode.tf";
import {getBusinessUnitCodeValidator} from "@/api/survey/validations/getBusinessUnitCode.vd";
import {boardInterface} from "@/api/survey/SD.Models/board.sd";
import {businessBoardListValidator} from "@/api/survey/validations/businessBoards.vd";
import {businessBoardTransformer} from "@/api/survey/transformers/businessBoard.tf";
import {apartmentPersonListValidator} from "@/api/survey/validations/apartmentPerson.vd";
import {getPersonListTransformer} from "@/api/survey/transformers/getPersonList.tf";
import {businessPersonArrayValidator} from "@/api/survey/validations/businessPerson.vd";
import {addArchiveGroupListValidator} from "@/api/survey/validations/getArchiveGroup.vd";
import {getArchiveGroupTransformer} from "@/api/survey/transformers/getArchiveGroup.tf";
import {getArchiveImagesListTransformer} from "@/api/survey/transformers/getArchiveImagesList.tf";
import {getArchiveListInterface} from "@/api/survey/SD.Models/getArchiveList.sd";
import {
    getArchiveImagesListValidator,
    getArchiveImageValidator
} from "@/api/survey/validations/getArchiveImagesList.vd";
import {getArchiveImageItemTransformer} from "@/api/survey/transformers/getArchiveImageItem.tf";
import {getArseCodeLocationValidator} from "@/api/survey/validations/getArseCodeLocation.vd";
import {getArseCodeLocationTransformer} from "@/api/survey/transformers/getArseCodeLocation.tf";
import {getAddressInitValidator} from "@/api/survey/validations/getAddressInit.vd";
import {getInitAddressTransformer} from "@/api/survey/transformers/getInitAddress.tf";
import {getRegistrationValuesInterface} from "@/api/survey/SD.Models/getRegistrationValues.sd";
import {getRegistrationValuesValidator} from "@/api/survey/validations/getRegistrationValues.vd";
import {getRegistrationValuesTransformer} from "@/api/survey/transformers/getRegistrationValues.tf";
import {AddApartmentFeatureInterface} from "@/api/survey/SD.Models/addApartmentFeature.sd";
import {ChangeBlockStatus} from "@/api/surveyPanel/SD.Models/changeBlockStatus.sd";
import {ChangeArseStatusSd} from "@/api/survey/SD.Models/changeArseStatus.sd";
import {getInitArseStatusValidator} from "@/api/survey/validations/getInitArseLog.vd";
import {initArseStatusTransformer} from "@/api/survey/transformers/initArseStatus.tf";
import {getAccessInterface} from "@/api/survey/SD.Models/getAccess.sd";

interface route {

    getArseFeatureInfo: <T1>(data: addFeatureInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getArseCodeLocation: <T1>(data: addFeatureInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getInitAddress: <T1>(data: addFeatureInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getProgressFeatureInfo: <T1>(data: AddProgressFeatureInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getSurveyLayers: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getSurveyCoding: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    getEnumsTable: <T1>(data: GetEnumsTableSdInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    // ---------------------------
    getSurveyAccess: <T1>(data: getAccessInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    addArse: <T1>(data: addArseInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    editArse: <T1>(data: addArseInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    saveDistricts: <T1>(data: addDistrictsInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    saveArseExtraInfo: <T1>(data: addArseExtraInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    setArseAddress: <T1>(data: ApartmentAddress, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    setArseOwners: <T1>(data: Owner[], id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteArse: <T1>(code: string, toast?: any) => Promise<MyApiResponse<T1>>;


    addBuilding: <T1>(data: addBuildingInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editBuilding: <T1>(data: addBuildingInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteBuilding: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addProgress: <T1>(data: addProgressInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteProgress: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addBuildingFloor: <T1>(data: addBuildingFloorInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    buildingStaircase: <T1>(data: addStairCaseInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;

    getArse: <T1>(id: string | string[], toast?: any) => Promise<MyApiResponse<T1>>;
    getArseFromExternal: <T1>(id: string | string[], toast?: any) => Promise<MyApiResponse<T1>>;

    addFloorCommons: <T1>(data: floorsCommonsInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addFloorInfo: <T1>(data: FloorInfo, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getInitFloorUsing: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addFloorUsing: <T1>(data: addFloorUsingInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;


    initApartments: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getApartments: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getApartmentItem: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    setApartmentAddress: <T1>(data: ApartmentAddress, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    setOwners: <T1>(data: Owner[], id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    setRegistration: <T1>(data: ApartmentRegistration, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getRegistrationValues: <T1>(data: getRegistrationValuesInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    updateApartment: <T1>(data: Aparteman, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    setDistricts: <T1>(data: District[], id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    setFacilities: <T1>(data: Facilities[], id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    saveApartmentFeature: <T1>(data: AddApartmentFeatureInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;


    addBusinessUnit: <T1>(data: addBusinessUnitInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getBusinessUnitList: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editBusinessUnitInfo: <T1>(data: BusinessUnitInfo, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addBusiness: <T1>(data: BusinessInfo, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editBusiness: <T1>(data: BusinessInfo, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getBusinessUnitCode: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    saveBoards: <T1>(data: boardInterface, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    addBusinessPerson: <T1>(data: BusinessPerson[], toast?: any) => Promise<MyApiResponse<T1>>;
    addBusinessVacation: <T1>(data: BusinessVacation[], toast?: any) => Promise<MyApiResponse<T1>>;

    addPerson: <T1>(data: Person, toast?: any) => Promise<MyApiResponse<T1>>;
    getPersonsList: <T1>(id: string, toast?: any) => Promise<MyApiResponse<T1>>;

    getArchiveGroup: <T1>(toast?: any) => Promise<MyApiResponse<T1>>;
    addImageArchive: <T1>(data: Archive, toast?: any) => Promise<MyApiResponse<T1>>;
    getArchiveImagesList: <T1>(data: getArchiveListInterface, toast?: any) => Promise<MyApiResponse<T1>>;
    getArchiveImageItem: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    editImageArchive: <T1>(data: Archive, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    deleteImageArchive: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;

    changeArseStatus: <T1>(data: ChangeArseStatusSd, id: number, toast?: any) => Promise<MyApiResponse<T1>>;
    getInitArseStatus: <T1>(id: number, toast?: any) => Promise<MyApiResponse<T1>>;

}

export default {


    getArseFeatureInfo: async function <T1>(data: addFeatureInterface, toast?: any) {
        const url = 'survey/getArseFeatureInfo';
        type T2 = z.infer<typeof getArseInfoListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addFeatureInterface>(url, 'post', getArseInfoListValidator, getArseInfoTransformer, data, undefined, toast)
        console.log(result, 'getArseFeatureInfo response')
        return result
    },

    getInitAddress: async function <T1>(data: addFeatureInterface, toast?: any) {
        const url = 'survey/getInitAddress';
        type T2 = z.infer<typeof getAddressInitValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addFeatureInterface>(url, 'post', getAddressInitValidator, getInitAddressTransformer, data, undefined, toast)
        console.log(result, 'getInitAddress response')
        return result
    },

    getArseCodeLocation: async function <T1>(data: addFeatureInterface, toast?: any) {
        const url = 'survey/getArseCodeLocation';
        type T2 = z.infer<typeof getArseCodeLocationValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addFeatureInterface>(url, 'post', getArseCodeLocationValidator, getArseCodeLocationTransformer, data, undefined, toast)
        console.log(result, 'getArseCodeLocation response')
        return result
    },


    getProgressFeatureInfo: async function <T1>(data: AddProgressFeatureInterface, toast?: any) {
        const url = 'survey/getProgressFeatureInfo';
        type T2 = z.infer<typeof getProgressInfoValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, AddProgressFeatureInterface>(url, 'post', getProgressInfoValidator, getProgressInfoTransformer, data, undefined, toast)
        console.log(result, 'getProgressFeatureInfo response')
        return result
    },

    getSurveyLayers: async function <T1>(toast?: any) {
        const url = 'survey/getCodeTableValue';
        type T2 = z.infer<typeof getSurveyLayersValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, GetEnumsTableSdInterface>(url, 'get', getSurveyLayersValidator, getSurveyLayersTransformer, {name: 'SurveyLayerManagement'}, undefined, toast)
        console.log(result, 'getSurveyLayers response')
        return result
    },

    getSurveyCoding: async function <T1>(toast?: any) {
        const url = 'survey/getCodeTableValue';
        type T2 = z.infer<typeof getSurveyCodingsValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, GetEnumsTableSdInterface>(url, 'get', getSurveyCodingsValidator, getSurveyCodingTransformer, {name: 'coding'}, undefined, toast)
        console.log(result, 'getSurveyCoding response')
        return result
    },

    getEnumsTable: async function <T1>(data: GetEnumsTableSdInterface, toast?: any) {
        const url = 'survey/getCodeTableValue';
        type T2 = z.infer<typeof getEnumsTableValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, GetEnumsTableSdInterface>(url, 'get', getEnumsTableValidator, getEnumsTableTransformer, data, undefined, toast)
        console.log(result, `getEnumsTable ${data.name} response`)
        return result
    },

    addArse: async function <T1>(data: addArseInterface, toast?: any) {
        const url = 'survey/createArse';
        type T2 = z.infer<typeof saveItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addArseInterface>(url, 'post', saveItemValidator, saveItemTransformer, data, undefined, toast)
        console.log(result, 'addArse response')
        return result
    },

    editArse: async function <T1>(data: addArseInterface, id: number, toast?: any) {
        const url = 'survey/editArse';
        type T2 = z.infer<typeof saveItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addArseInterface>(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast)
        console.log(result, 'editArse response')
        return result
    },

    saveDistricts: async function <T1>(data: addDistrictsInterface, id: number, toast?: any) {
        const url = 'survey/createDistricts';
        type T2 = z.infer<typeof saveItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addDistrictsInterface>(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast)
        console.log(result, 'saveDistricts response')
        return result
    },

    saveArseExtraInfo: async function <T1>(data: addArseExtraInterface, id: number, toast?: any) {
        const url = 'survey/createArseExtraInfo';
        type T2 = z.infer<typeof saveItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addArseExtraInterface>(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast)
        console.log(result, 'saveArseExtraInfo response')
        return result
    },


    setArseAddress: async function <T1>(data: ApartmentAddress, id: number, toast?: any) {
        const url = 'survey/setArseAddress';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, ApartmentAddress>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'setArseAddress response')
        return result
    },

    setArseOwners: async function <T1>(data: Owner[], id: number, toast?: any) {
        const url = 'survey/setArseOwners';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, Owner[]>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'setArseOwners response')
        return result
    },

    addBuilding: async function <T1>(data: addBuildingInterface, id: number, toast?: any) {
        const url = 'survey/addBuilding';
        type T2 = z.infer<typeof saveItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addBuildingInterface>(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast)
        console.log(result, 'addBuilding response')
        return result
    },
    editBuilding: async function <T1>(data: addBuildingInterface, id: number, toast?: any) {
        const url = 'survey/editBuilding';
        type T2 = z.infer<typeof saveItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addBuildingInterface>(url, 'put', saveItemValidator, saveItemTransformer, data, id, toast)
        console.log(result, 'editBuilding response')
        return result
    },
    deleteBuilding: async function <T1>(id: number, toast?: any) {
        const url = 'survey/deleteBuilding';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteBuilding response')
        return result
    },
    addProgress: async function <T1>(data: addProgressInterface, toast?: any) {
        const url = 'survey/addProgress';
        type T2 = z.infer<typeof addProgressValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addProgressInterface>(url, 'post', addProgressValidator, addProgressTransformer, data, undefined, toast)
        console.log(result, 'addProgress response')
        return result
    },
    deleteProgress: async function <T1>(id: number, toast?: any) {
        const url = 'survey/deleteProgress';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteProgress response')
        return result
    },
    addBuildingFloor: async function <T1>(data: addBuildingFloorInterface, id: number, toast?: any) {
        const url = 'survey/buildingFloorInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, addBuildingFloorInterface>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'addBuildingFloor response')
        return result
    },
    buildingStaircase: async function <T1>(data: addStairCaseInterface, id: number, toast?: any) {
        const url = 'survey/buildingStaircase';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, addStairCaseInterface>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'addStairCaseInterface response')
        return result
    },

    getArse: async function <T1>(id: string | string[], toast?: any) {
        const url = 'survey/getArse';
        type T2 = z.infer<typeof arseValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', arseValidator, getArseTransformer, undefined, id, toast)
        console.log(result, 'getArse response')
        return result
    },
    getArseFromExternal: async function <T1>(id: string | string[], toast?: any) {
        const url = 'survey/getArseFromExternal';
        type T2 = z.infer<typeof arseValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', arseValidator, getArseTransformer, undefined, id, toast)
        console.log(result, 'getArseFromExternal response')
        return result
    },

    addFloorCommons: async function <T1>(data: floorsCommonsInterface, id: number, toast?: any) {
        const url = 'survey/floorCommons';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, floorsCommonsInterface>(url, 'put', undefined, undefined, data, id, toast)
        console.log(result, 'addFloorCommons response')
        return result
    },
    addFloorInfo: async function <T1>(data: FloorInfo, id: number, toast?: any) {
        const url = 'survey/floorInfo';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, FloorInfo>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'addFloorInfo response')
        return result
    },
    addFloorUsing: async function <T1>(data: addFloorUsingInterface, id: number, toast?: any) {
        const url = 'survey/floorUsing';
        type T2 = z.infer<typeof addFloorUsingValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addFloorUsingInterface>(url, 'put', addFloorUsingValidator, addFloorUsingTransformer, data, id, toast)
        console.log(result, 'addFloorUsing response')
        return result
    },
    getInitFloorUsing: async function <T1>(id: number, toast?: any) {
        const url = 'survey/floorInitUsing';
        type T2 = z.infer<typeof initFloorUsingValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', initFloorUsingValidator, initFloorUsingTransformer, undefined, id, toast)
        console.log(result, 'getInitFloorUsing response')
        return result
    },

    getApartments: async function <T1>(id: number, toast?: any) {
        const url = 'survey/getApartments';
        type T2 = z.infer<typeof getApartmentListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getApartmentListValidator, getApartmentListTransformer, undefined, id, toast)
        console.log(result, 'getApartments response')
        return result
    },
    getApartmentItem: async function <T1>(id: number, toast?: any) {
        const url = 'survey/getApartment';
        type T2 = z.infer<typeof getApartmentValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getApartmentValidator, getApartmentItemTransformer, undefined, id, toast)
        console.log(result, 'getApartmentItem response')
        return result
    },
    setApartmentAddress: async function <T1>(data: ApartmentAddress, id: number, toast?: any) {
        const url = 'survey/setApartmentAddress';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, ApartmentAddress>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'setApartmentAddress response')
        return result
    },
    setRegistration: async function <T1>(data: ApartmentRegistration, id: number, toast?: any) {
        const url = 'survey/setRegistration';

        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, ApartmentRegistration>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'setRegistration response')
        return result
    },
    getRegistrationValues: async function <T1>(data: getRegistrationValuesInterface, toast?: any) {
        const url = 'survey/calculateRegistrationValues';
        type T2 = z.infer<typeof getRegistrationValuesValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, getRegistrationValuesInterface>(url, 'get', getRegistrationValuesValidator, getRegistrationValuesTransformer, data, undefined, toast)
        console.log(result, 'getRegistrationValues response')
        return result
    },


    setOwners: async function <T1>(data: Owner[], id: number, toast?: any) {
        const url = 'survey/setOwners';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, Owner[]>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'setOwners response')
        return result
    },
    updateApartment: async function <T1>(data: Aparteman, id: number, toast?: any) {
        const url = 'survey/updateApartment';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, Aparteman>(url, 'put', undefined, undefined, data, id, toast)
        console.log(result, 'updateApartment response')
        return result
    },

    saveApartmentFeature: async function <T1>(data: AddApartmentFeatureInterface, id: number, toast?: any) {
        const url = 'survey/saveApartmentFeature';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, AddApartmentFeatureInterface>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'saveApartmentFeature response')
        return result
    },

    setDistricts: async function <T1>(data: District[], id: number, toast?: any) {
        const url = 'survey/setDistricts';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, District[]>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'apartment setDistricts response')
        return result
    },

    setFacilities: async function <T1>(data: Facilities[], id: number, toast?: any) {
        const url = 'survey/setFacilities';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, Facilities[]>(url, 'post', undefined, undefined, data, id, toast)
        console.log(result, 'apartment setFacilities response')
        return result
    },

    addBusinessUnit: async function <T1>(data: addBusinessUnitInterface, toast?: any) {
        const url = 'survey/addBusinessUnit';
        type T2 = z.infer<typeof addBusinessUnitValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, addBusinessUnitInterface>(url, 'post', addBusinessUnitValidator, addBusinessUnitTransformer, data, undefined, toast)
        console.log(result, 'addBusinessUnit response')
        return result
    },
    getBusinessUnitList: async function <T1>(id: number, toast?: any) {
        const url = 'survey/businessUnitList';
        type T2 = z.infer<typeof businessUnitInfoArrayValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', businessUnitInfoArrayValidator, businessUnitInfoListTransformer, undefined, id, toast)
        console.log(result, 'getBusinessUnitList response')
        return result
    },

    editBusinessUnitInfo: async function <T1>(data: BusinessUnitInfo, id: number, toast?: any) {
        const url = 'survey/editBusinessUnit';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, BusinessUnitInfo>(url, 'put', undefined, undefined, data, id, toast)
        console.log(result, 'editBusinessUnitInfo response')
        return result
    },

    addBusiness: async function <T1>(data: BusinessInfo, id: number, toast?: any) {
        const url = 'survey/addBusiness';
        type T2 = z.infer<typeof saveItemValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, BusinessInfo>(url, 'post', saveItemValidator, saveItemTransformer, data, id, toast)
        console.log(result, 'addBusiness response')
        return result
    },

    editBusiness: async function <T1>(data: BusinessInfo, id: number, toast?: any) {
        const url = 'survey/business';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, BusinessInfo>(url, 'put', undefined, undefined, data, id, toast)
        console.log(result, 'editBusiness response')
        return result
    },

    getBusinessUnitCode: async function <T1>(id: number, toast?: any) {
        const url = 'survey/getBusinessUnitCode';
        type T2 = z.infer<typeof getBusinessUnitCodeValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getBusinessUnitCodeValidator, getBusinessUnitCodeTransformer, undefined, id, toast)
        console.log(result, 'getBusinessUnitCode response')
        return result
    },
    saveBoards: async function <T1>(data: boardInterface, id: number, toast?: any) {
        const url = 'survey/board';
        type T2 = z.infer<typeof businessBoardListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, boardInterface>(url, 'post', businessBoardListValidator, businessBoardTransformer, data, id, toast)
        console.log(result, 'saveBoards-listBoard response')
        return result
    },


    addPerson: async function <T1>(data: Person, toast?: any) {
        const url = 'peoples/addPerson';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, Person>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'addPerson response')
        return result
    },

    getPersonsList: async function <T1>(id: string, toast?: any) {
        const url = 'peoples/searchPerson';
        type T2 = z.infer<typeof apartmentPersonListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', apartmentPersonListValidator, getPersonListTransformer, undefined, id, toast)
        console.log(result, 'getPersonsList response')
        return result
    },

    addBusinessPerson: async function <T1>(data: BusinessPerson[], toast?: any) {
        const url = 'survey/addBusinessPerson';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, BusinessPerson[]>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'addBusinessPerson response')
        return result
    },

    addBusinessVacation: async function <T1>(data: BusinessVacation[], toast?: any) {
        const url = 'survey/addBusinessVacation';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, BusinessVacation[]>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'addBusinessVacation response')
        return result
    },

    getArchiveGroup: async function <T1>(toast?: any) {
        const url = 'survey/archiveGroup';
        type T2 = z.infer<typeof addArchiveGroupListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', addArchiveGroupListValidator, getArchiveGroupTransformer, undefined, undefined, toast)
        console.log(result, 'getArchiveGroup response')
        return result
    },

    addImageArchive: async function <T1>(data: Archive, toast?: any) {
        const url = 'survey/addImageArchive';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, Archive>(url, 'post', undefined, undefined, data, undefined, toast, true, true)
        console.log(result, 'addImageArchive response')
        return result
    },

    getArchiveImagesList: async function <T1>(data: getArchiveListInterface, toast?: any) {
        const url = 'survey/archiveImagesList';
        type T2 = z.infer<typeof getArchiveImagesListValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, getArchiveListInterface>(url, 'post', getArchiveImagesListValidator, getArchiveImagesListTransformer, data, undefined, toast)
        console.log(result, 'getArchiveImagesList response')
        return result
    },

    getArchiveImageItem: async function <T1>(id: number, toast?: any) {
        const url = 'survey/archiveImage';
        type T2 = z.infer<typeof getArchiveImageValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getArchiveImageValidator, getArchiveImageItemTransformer, undefined, id, toast)
        console.log(result, 'getArchiveImageItem response')
        return result
    },

    editImageArchive: async function <T1>(data: Archive, id: number, toast?: any) {
        const url = 'survey/editImageArchive';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, Archive>(url, 'put', undefined, undefined, data, id, toast, true, true)
        console.log(result, 'editImageArchive response')
        return result
    },

    deleteImageArchive: async function <T1>(id: number, toast?: any) {
        const url = 'survey/deleteImageArchive';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'delete', undefined, undefined, undefined, id, toast)
        console.log(result, 'deleteImageArchive response')
        return result
    },
    initApartments: async function <T1>(id: number, toast?: any) {
        const url = 'survey/initApartments';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, undefined>(url, 'get', undefined, undefined, undefined, id, toast)
        console.log(result, 'initApartments response')
        return result
    },

    changeArseStatus: async function <T1>(data: ChangeArseStatusSd, id: number, toast?: any) {
        const url = 'survey/changeArseStatus';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, ChangeArseStatusSd>(url, 'post', undefined, undefined, data, id, toast, true, true)
        console.log(result, 'ChangeArseStatusSd response')
        return result
    },

    getInitArseStatus: async function <T1>(id: number, toast?: any) {
        const url = 'survey/initArseStatus';
        type T2 = z.infer<typeof getInitArseStatusValidator>;
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, T2, undefined>(url, 'get', getInitArseStatusValidator, initArseStatusTransformer, undefined, id, toast)
        console.log(result, 'getInitArseStatus response')
        return result
    },

    getSurveyAccess: async function <T1>(data: getAccessInterface, toast?: any) {
        const url = 'survey/addArseAccess';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, getAccessInterface>(url, 'post', undefined, undefined, data, undefined, toast)
        console.log(result, 'getSurveyAccess response')
        return result
    },

    deleteArse: async function <T1>(code: string, toast?: any) {
        const url = 'survey/deleteArse';
        //T1:تایپ دیتای خروجی مورد نظر ما
        //T2:تایپ دیتای خروجی از بکند
        //T3:تایپ دیتای ارسالی به بکند
        const result: MyApiResponse<T1> = await newSendRequest<T1, undefined, getAccessInterface>(url, 'delete', undefined, undefined, undefined, code, toast)
        console.log(result, 'deleteArse response')
        return result
    },


} as route

