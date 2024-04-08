import {z} from "zod";


export const deleteAccessValidator = z.object({
    massage: z.string().min(1),

})