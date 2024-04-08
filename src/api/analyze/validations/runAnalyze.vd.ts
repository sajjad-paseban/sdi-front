import {z} from "zod";

export const runAnalyzeValidator = z.object({
    result:z.any(),
    feature:z.any(),
})

export const runAnalyzeListValidator = z.array(runAnalyzeValidator)