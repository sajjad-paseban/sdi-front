import {z} from "zod";

export const userIpValidator = z.object({
    id: z.number(),
    active_time_start:z.number().nullable(),
    active_time_end:z.number().nullable(),
    ip:z.string(),
    is_active:z.boolean(),
    user:z.number(),
    os:z.string().nullable()
})

export const userIpsValidator = z.array(userIpValidator)