import {z} from "zod";


import {ActiveLayerFields, LayerFields} from "@/models/Layer.Interface";
import {getActiveLayerFieldsValidator} from "@/api/extraInLayer/validations/getActiveLayerFields.vd";

type getActiveLayerFieldsGdModel = z.infer<typeof getActiveLayerFieldsValidator>;

export function getActiveLayerFieldsTransformer(inputValidated: getActiveLayerFieldsGdModel): ActiveLayerFields[] {


    return [...inputValidated]


}