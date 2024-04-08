import {z} from "zod";

import {GetMapConfigInterface} from "@/models/MapConfig.interface";
import {getMapConfigsValidator} from "@/api/mapConfig/validations/getMapConfigs.vd";

type getMapConfigsGdModel = z.infer<typeof getMapConfigsValidator>;

export function getMapConfigsTransformer(inputValidated:getMapConfigsGdModel):GetMapConfigInterface[] {
    return [...inputValidated]
}