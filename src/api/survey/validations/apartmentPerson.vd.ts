import {z} from "zod";


export const apartmentPersonValidator = z.object({
    id:z.number().optional(),
    code: z.number().nullable(),
    name: z.string(),
    last_name: z.string(),
    father_name: z.string(),
    national_code: z.string(),
    mobile: z.string().nullable(),
    phone: z.string().nullable(),
    birthday: z.string().nullable(),
    address: z.string().nullable(),
    postal_code: z.string().nullable()
})

export const apartmentPersonListValidator =z.array(apartmentPersonValidator)