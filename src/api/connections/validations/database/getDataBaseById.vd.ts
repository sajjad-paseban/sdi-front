import {z} from "zod";

export const getDataBaseByIdValidator = z.object({
    id:z.number(),
    topic :z.string(),
    db_name:z.string(),
    port:z.string(),
    host:z.string(),
    user_name:z.string(),
    password:z.string(),
    schema:z.string().optional().nullable(),
    type:z.string()

})



