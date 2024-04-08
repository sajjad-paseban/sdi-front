import {z} from "zod";

export const deleteRoleValidator = z.object({
    massage: z.string().min(1),

})