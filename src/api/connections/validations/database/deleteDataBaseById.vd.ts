import {z} from "zod";

export const deleteDataBaseByIdValidator = z.object({
    massage: z.string().min(1),

})



