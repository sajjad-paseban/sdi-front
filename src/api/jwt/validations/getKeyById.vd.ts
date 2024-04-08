import {z} from "zod";

export const getKeyByIdValidator = z.object({
    id:z.number(),
    user:z.number(),
    access_token: z.string(),
    is_active:z.boolean(),
    start_time:z.number(),
    expire:z.number(),
    max_request_per_min:z.number()
})