import { z } from "zod";
import { ApiResType } from "@/models/Conncections.interface";
export const getExternalApiParamsValidator = z.object({
    api: z.number(),
    name: z.string(),
    requirement: z.boolean(),
    fixed_value: z.boolean(),
    value: z.string().nullable().optional()
});
export const getExternalApiByIdValidator = z.object({
    id: z.number(),
    topic: z.string(),
    method: z.string(),
    depend_api: z.number().nullable().optional(),
    address: z.string(),
    description: z.string().nullable().optional(),
    api_headers: z.array(getExternalApiParamsValidator).min(0),
    api_params: z.array(getExternalApiParamsValidator).min(0),
    resType: z.nativeEnum(ApiResType)
});
//# sourceMappingURL=getExternalApiById.vd.js.map