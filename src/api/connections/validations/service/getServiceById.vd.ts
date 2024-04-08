import {z} from "zod";

export const getServiceByIdValidator = z.object({
    id:z.number(),
    topic :z.string(),
    version:z.string(),
    apiKey:z.string().nullable().optional(),
    address:z.string(),
    wfs_address:z.string().nullable(),
    user_name:z.string().nullable().optional(),
    password:z.string().nullable().optional(),
    type:z.string(),
    layers:z.string(),
    format_option :z.string().nullable(),
    styles:z.string().nullable(),
    crs:z.string(),
    geo_field_name:z.string()

})



