import {z} from "zod";

import {GetMapConfigInterface, MapConfigInterface} from "@/models/MapConfig.interface";
import {getMapConfigByIdValidator} from "@/api/mapConfig/validations/getMapConfigById.vd";

type getMapConfigByIdGdModel = z.infer<typeof getMapConfigByIdValidator>;

export function getMapConfigByIdTransformer(inputValidated:getMapConfigByIdGdModel):GetMapConfigInterface {
    return {...inputValidated}
}