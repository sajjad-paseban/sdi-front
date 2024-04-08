import {z} from "zod";

import {getSimpleLayerSearchConditionsVd} from "@/api/layer/validations/getSimpleLayerSearchConditions.vd";

type getSimpleLayerSearchConditionsGdModel = z.infer<typeof getSimpleLayerSearchConditionsVd>;

export function getSimpleLayerSearchConditionsTransformer(inputValidated: getSimpleLayerSearchConditionsGdModel): string[] {


    return [...inputValidated]
}