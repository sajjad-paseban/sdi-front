import {z, ZodAny} from "zod";


const accessValidator = z.object({
    e_name: z.string().min(1),
    f_name: z.string().min(1),
    parent: z.object({

    }).nullable()

})


const roleValidator = z.object({
    is_active: z.boolean(),
    is_admin: z.boolean(),
    is_superuser: z.boolean(),
    access: z.array(accessValidator)

})

const jwtValidator = z.object({
    access: z.string(),
    expire: z.number()
})

export const loginValidator = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    user_name: z.string().min(1),
    image: z.string().nullable(),
    is_active: z.boolean(),
    role: roleValidator,
    jwt: jwtValidator

})



