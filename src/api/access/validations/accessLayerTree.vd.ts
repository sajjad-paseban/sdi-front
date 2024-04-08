import {number, z} from "zod";
import {AccessLayerTree} from "@/models/Access.interface";

const accessLayerTreeValidator: z.ZodType<AccessLayerTree> = z.lazy(() =>
    z.object({
        id: z.number(),
        name: z.string(),
        image: z.string().nullable(),
        is_service:z.boolean().optional(),
        children: z.array(accessLayerTreeValidator).optional().nullable(),
        layer_access:z.object({
            id:z.number().nullable(),
            show:z.boolean().nullable(),
            active_layer:z.boolean().nullable(),
            edit:z.boolean().nullable(),
            delete:z.boolean().nullable(),
        }).optional()
    })
);

export const accessLayerTreeArrayValidator = z.array(accessLayerTreeValidator)