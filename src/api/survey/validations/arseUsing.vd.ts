import {z} from "zod";

export const arseUsingValidator = z.object({
    main_use: z.number(),
    area: z.number(),
    relation_id:z.number().optional().nullable(),
})


export const arseUsingArrayValidator =z.array(arseUsingValidator)