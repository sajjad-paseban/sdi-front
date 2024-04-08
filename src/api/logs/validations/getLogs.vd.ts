import {z} from "zod";

export const getLogValidator = z.object({
    row_number:z.number(),
    created_at:z.number(),
    ip:z.string(),
    user:z.string().nullable(),
    os:z.string(),
    description:z.string(),
    browser:z.string(),
    method:z.string(),
    is_response:z.boolean(),
    has_file:z.boolean(),
    has_error:z.boolean()
})

export const getLogsValidator = z.array(getLogValidator)
