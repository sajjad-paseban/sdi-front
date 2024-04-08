import {z} from "zod";

export const deleteExternalApiByIdValidator = z.object({
    massage: z.string().min(1),

})



