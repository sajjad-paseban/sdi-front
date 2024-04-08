import {z} from "zod";
import {Layer_types, LayerTree} from "@/models/Layer.Interface";
import {getItemValidator} from "@/api/layerGroup/validations/getItem.vd";
import {getServiceByIdValidator} from "@/api/connections/validations/service/getServiceById.vd";


export const getLayerValidator = z.object({
    id: z.number(),
    name: z.string(),
    type_layer: z.nativeEnum(Layer_types),
    imported_type: z.string(),
    bbox: z.string(),
    code: z.string().nullable(),
    crs: z.string(),
    table_name: z.string().nullable(),
    layer_group: getItemValidator,
    service_profile: getServiceByIdValidator.nullable()
})

export const getLayersValidator = z.array(getLayerValidator)