import {z, ZodAny} from "zod";

export const tableInfoByNameValidator = z.array(z.object({
    model:z.string(),
    pk:z.number(),
    fields:z.object({})
}))


