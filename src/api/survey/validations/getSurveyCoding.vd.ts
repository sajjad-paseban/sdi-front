import {z} from "zod";

export const getSurveyCodingValidator = z.object({
    title: z.string(),
    alias: z.string()
})

export const getSurveyCodingsValidator = z.array(getSurveyCodingValidator)