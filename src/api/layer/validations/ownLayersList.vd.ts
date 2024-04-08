import {number, z} from "zod";
import {Layer_types} from "@/models/Layer.Interface";

export const ownLayersListValidator = z.array(z.object({
    id: number(),
    name:z.string(),
    type_layer:z.nativeEnum(Layer_types)

}))




