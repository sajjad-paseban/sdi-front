import {z} from "zod";

export const apartmentRegistrationValidator = z.object({
    area:z.number().nullable(),
    share_arse_area:z.number().nullable(),
    share_area:z.number().nullable(),
    assigned_area:z.number().nullable(),
    yard_parking_area:z.number().nullable(),
    yard_parking_number:z.number().nullable(),
    persons_number:z.number().nullable(),
    description:z.string().nullable()
})
