import {z} from "zod";

export const addExternalApiValidator = z.object({
    massage: z.string().min(1),

})




