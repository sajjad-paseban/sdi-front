import {z} from "zod";



export const user = z.object({
    first_name:z.string(),
    last_name:z.string(),
    user_name:z.string(),
    is_active:z.boolean(),
    phone:z.string(),
    role:z.string(),
    id:z.number(),
    image:z.string().optional().nullable()
})

export const getUsersValidator = z.array(user)