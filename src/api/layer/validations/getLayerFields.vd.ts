import {number, z} from "zod";
import {LayerFieldTypes} from "@/models/Layer.Interface";


export const getLayerFieldsValidator = z.array(z.object({
    id: number(),
    name: z.string(),
    p_topic: z.string().nullable(),
    text_model_style:z.number().nullable(),
    advance_model_style:z.number().nullable(),
    e_topic: z.string(),
    type: z.nativeEnum(LayerFieldTypes),
    is_required: z.boolean(),
    is_geometry: z.boolean(),
    is_active: z.boolean(),
    is_unique:z.boolean(),
    active_label: z.boolean(),
    layer_field_choices:z.array(z.string()).nullable()
}))




