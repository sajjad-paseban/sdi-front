import {z} from "zod";

export const analyzeGroupItemValidator = z.object({
    id: z.number(),
    name: z.string()
})

export const analyzeGroupListValidator = z.array(analyzeGroupItemValidator)