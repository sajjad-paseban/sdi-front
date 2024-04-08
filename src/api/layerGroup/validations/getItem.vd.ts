import {z} from "zod";


export const getItemValidator =z.object({
    name:z.string(),
    id: z.number(),
    parent:z.number().nullable(),
})




