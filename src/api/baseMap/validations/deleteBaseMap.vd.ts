import {z} from "zod";

export const deleteBaseMapValidator = z.object({
    massage: z.string().min(1),

})