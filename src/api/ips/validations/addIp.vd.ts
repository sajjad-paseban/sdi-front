import {z} from "zod";

export const addIpValidator = z.object({
    massage: z.string().min(1),

})




