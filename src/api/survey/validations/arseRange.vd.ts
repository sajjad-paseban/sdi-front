import {z} from "zod";

export const arseRangeValidator = z.object({
    code_texture_type_master_group: z.number(),
    code_texture_type_slave_group: z.number(),
    area: z.number(),
    relation_id:z.number().optional().nullable(),
})


export const arseRangeArrayValidator =z.array(arseRangeValidator)