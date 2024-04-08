import {z} from "zod";

import {floorUsingArrayValidator} from "@/api/survey/validations/floorUsing.vd";
import {buildingExtraInfoValidator} from "@/api/survey/validations/buildingextraInfo.vd";
import {apartmentAddressValidator} from "@/api/survey/validations/apartmentAddress.vd";
import {apartmentRegistrationValidator} from "@/api/survey/validations/apartmentRegistration.vd";
import {apartmentOwnersListValidator} from "@/api/survey/validations/apartmentOwner.vd";
import {districtsValidator} from "@/api/survey/validations/districts.vd";
import {apartmentFacilitiesListValidator} from "@/api/survey/validations/apartmentFacilities.vd";

export const getApartmentValidator = z.object({


    id: z.number(),
    area: z.number(),
    code: z.string(),
    geometry:z.string().optional().nullable(),
    floor_using: floorUsingArrayValidator,
    share_arse_area: z.number().nullable(),
    share_area: z.number().nullable(),
    yard_parking_area: z.number(),
    yard_parking_number: z.number(),
    persons_number: z.number(),
    description: z.string().nullable(),
    fill_info_date: z.string().nullable(),
    survey_description: z.number().nullable(),
    floor_type: z.number(),
    parking_floor_type: z.number().nullable(),
    store_floor_type: z.number().nullable(),
    building: buildingExtraInfoValidator,
    apartment_address: apartmentAddressValidator.nullable().optional(),
    apartment_registration: apartmentRegistrationValidator.nullable().optional(),
    apartment_owner: apartmentOwnersListValidator.optional(),
    apartment_districts:districtsValidator.optional().nullable(),
    apartment_facilities:apartmentFacilitiesListValidator.optional().nullable()

})


export const getApartmentListValidator = z.array(getApartmentValidator)