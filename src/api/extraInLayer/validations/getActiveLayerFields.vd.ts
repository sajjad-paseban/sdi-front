import {number, z} from "zod";
import {LayerFieldTypes} from "@/models/Layer.Interface";


export const getActiveLayerFieldsValidator = z.array(z.object({
    id: number(),
    name: z.string(),
    p_topic: z.string().nullable(),
    e_topic: z.string(),
    type: z.nativeEnum(LayerFieldTypes),
    is_required: z.boolean(),
    layer_field_choices:z.array(z.string()).nullable()
}))




