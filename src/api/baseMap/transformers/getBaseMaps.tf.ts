import {z} from "zod";

import {BaseMapInterface} from "@/models/BaseMap.interface";
import {getBaseMapsValidator} from "@/api/baseMap/validations/getBaseMaps.vd";


type getBaseMapsGdModel = z.infer<typeof getBaseMapsValidator>;

export function getBaseMapsTransformer(inputValidated:getBaseMapsGdModel):BaseMapInterface[] {

    return inputValidated.map((item) => {
        return {
            ...item
        }
    })
}