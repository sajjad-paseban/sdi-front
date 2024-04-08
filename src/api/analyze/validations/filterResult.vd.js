import { z } from "zod";
export const filterResultFeatureValidator = z.object({
    type: z.string(),
    id: z.string(),
    geometry: z.object({}).passthrough(),
    geometry_name: z.string(),
    properties: z.object({}).passthrough(),
    layer: z.string().optional(),
    index: z.number().optional()
});
export const filterResultFeaturesValidator = z.array(filterResultFeatureValidator);
//# sourceMappingURL=filterResult.vd.js.map