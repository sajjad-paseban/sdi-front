import { string, z } from "zod";
export const layerRetrieveValidator = z.object({
    id: z.number(),
    name: z.string(),
    type_layer: z.string(),
    code: z.string().nullable(),
    layer_group: z.object({
        id: z.number(),
        name: z.string()
    }),
    imported_type: string(),
    service_profile: z.object({}).passthrough().nullable()
});
//# sourceMappingURL=layerRetrieve.vd.js.map