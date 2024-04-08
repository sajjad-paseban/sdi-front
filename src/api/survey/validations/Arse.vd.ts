import {z} from "zod";
import {buildingFloorsValidator} from "@/api/survey/validations/buildingFloor.vd";
import {buildingExtraInfoValidator} from "@/api/survey/validations/buildingextraInfo.vd";
import Feature from "ol/Feature";
import {ArseRange, ArseUsingType, District, ParkingAndStore, SelectedBuilding, Yard} from "@/models/Survey.interface";
import {districtsValidator} from "@/api/survey/validations/districts.vd";
import {parkingValidator} from "@/api/survey/validations/parking.vd";
import {arseUsingArrayValidator} from "@/api/survey/validations/arseUsing.vd";
import {arseRangeArrayValidator} from "@/api/survey/validations/arseRange.vd";
import {yardValidator} from "@/api/survey/validations/arseYard.vd";
import {buildingsValidator} from "@/api/survey/validations/building.vd";
import {apartmentAddressValidator} from "@/api/survey/validations/apartmentAddress.vd";
import {apartmentOwnersListValidator} from "@/api/survey/validations/apartmentOwner.vd";

export const arseValidator = z.object({

    id:z.number().optional(),
    area: z.number(),
    geometry:z.string().optional(),
    code_location: z.number(),
    code_physical_natures: z.number(),
    explanation: z.string().nullable(),
    code:z.string().optional().nullable(),
    districts:districtsValidator.optional(),
    arse_parking: parkingValidator.optional().nullable(),
    arse_using: arseUsingArrayValidator.optional(),
    arse_range: arseRangeArrayValidator.optional(),
    arse_yard: yardValidator.optional().nullable(),
    buildings:buildingsValidator.optional(),
    relation_id:z.number().optional().nullable(),
    arse_address: apartmentAddressValidator.nullable().optional(),
    arse_owner: apartmentOwnersListValidator.optional(),
})

