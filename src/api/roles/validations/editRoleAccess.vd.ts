import {z} from "zod";

export const editRoleAccessValidator = z.object({
    massage: z.string().min(1),

})