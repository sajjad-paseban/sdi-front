import {z} from "zod";
import {apartmentPersonValidator} from "@/api/survey/validations/apartmentPerson.vd";


export const apartmentOwnerValidator = z.object({


    ownership_unit_type:z.number().nullable(),
    ownership_type: z.number().nullable(),
    ownership_status: z.number().nullable(),
    ownership_value:z.string(),
    ownership_done:z.boolean(),

    begin_date: z.string().nullable(),
    end_date: z.string().nullable(),
    person:apartmentPersonValidator.nullable()
})

export const apartmentOwnersListValidator =z.array(apartmentOwnerValidator)