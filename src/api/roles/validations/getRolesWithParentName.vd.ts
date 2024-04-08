import {z} from "zod";

export const getRolesWithParentNameObjectValidator = z.object({
    id:z.number(),
    name: z.string().min(1),
    role_code:z.string(),
    is_admin: z.boolean(),
    is_active: z.boolean(),
    is_superuser: z.boolean(),
    parent: z.string().nullable(),
})
export const getRolesWithParentNameValidator = z.array(getRolesWithParentNameObjectValidator)

