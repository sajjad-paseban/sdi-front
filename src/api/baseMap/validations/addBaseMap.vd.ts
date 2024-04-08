import {z} from "zod";

export const addBaseMapValidator = z.object({
    massage: z.string().min(1),

})