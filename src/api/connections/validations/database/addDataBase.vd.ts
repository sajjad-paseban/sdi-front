import {z} from "zod";

export const addDatabaseValidator = z.object({
    massage: z.string().min(1),

})




