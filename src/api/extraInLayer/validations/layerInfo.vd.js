import { z } from "zod";
export const layerInfoValidator = z.object({
    name: z.string(),
    type_layer: z.string(),
    created_at: z.number(),
    features_length: z.number(),
    imported_type: z.string(),
    projection: z.string(),
});
//# sourceMappingURL=layerInfo.vd.js.map