import {z} from "zod";

import {LayerStyles} from "@/models/Layer.Interface";
import {getLayerStylesValidator} from "@/api/layer/validations/getLayerStyles.vd";

type getLayerStylesGdModel = z.infer<typeof getLayerStylesValidator>;

export function getLayerStylesTransformer(inputValidated: getLayerStylesGdModel): LayerStyles {


    return {...inputValidated}


}