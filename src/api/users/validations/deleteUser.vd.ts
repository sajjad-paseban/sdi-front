import {z} from "zod";

export const deleteUserValidator = z.object({
    massage: z.string().min(1),

})


