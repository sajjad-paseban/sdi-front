import {z} from "zod";

export const deleteServiceByIdValidator = z.object({
    massage: z.string().min(1),

})



