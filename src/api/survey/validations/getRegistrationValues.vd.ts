import {z} from "zod";


export const getRegistrationValuesValidator = z.object({
    share_area: z.number(),
    share_arse_area: z.number(),

})

