import {z} from "zod";


import {LayerFields} from "@/models/Layer.Interface";
import {getLayerFieldsValidator} from "@/api/layer/validations/getLayerFields.vd";

type getLayerFieldsGdModel = z.infer<typeof getLayerFieldsValidator>;

export function getLayerFieldsTransformer(inputValidated: getLayerFieldsGdModel): LayerFields[] {


    return [...inputValidated]


}