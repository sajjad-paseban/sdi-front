import { number, z } from "zod";
const layerTreeValidator = z.lazy(() => z.object({
    id: number(),
    name: z.string(),
    image: z.string().nullable(),
    is_service: z.boolean().optional(),
    is_point: z.boolean().optional(),
    layers: z.array(layerTreeValidator).optional().nullable(),
    children: z.array(layerTreeValidator).optional().nullable()
}));
export const layerTreeArrayValidator = z.array(layerTreeValidator);
//# sourceMappingURL=getLayerTree.vd.js.map