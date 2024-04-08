import {z} from "zod";

export const deleteJWTValidator= z.object({
    massage: z.string().min(1),
})