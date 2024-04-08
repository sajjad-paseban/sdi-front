import {z} from "zod";

export const checkDataBaseValidator = z.object({
    massage: z.string().min(1),

})




