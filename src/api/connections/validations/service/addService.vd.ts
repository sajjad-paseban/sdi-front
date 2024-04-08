import {z} from "zod";

export const addServiceValidator = z.object({
    massage: z.string().min(1),

})




