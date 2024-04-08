import {z, ZodAny} from "zod";



export const getArseLogValidator = z.object({
    user: z.number(),
    created_at: z.string(),
    status: z.string(),
})


export const getArseLogListValidator = z.array(getArseLogValidator)