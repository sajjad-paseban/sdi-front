import {number, z} from "zod";
import {LayerTree} from "@/models/Layer.Interface";


const layerTreeValidator: z.ZodType<LayerTree> = z.lazy(() =>
    z.object({
        id: number(),
        name: z.string(),
        image: z.string().nullable(),
        is_service: z.boolean().optional(),
        is_point: z.boolean().optional(),
        layers: z.array(layerTreeValidator).optional().nullable(),
        children: z.array(layerTreeValidator).optional().nullable()
    })
);

export const layerTreeArrayValidator = z.array(layerTreeValidator)