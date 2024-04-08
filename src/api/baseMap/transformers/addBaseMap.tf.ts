import {z} from "zod";

import {addBaseMapValidator} from "@/api/baseMap/validations/addBaseMap.vd";
import {MassageBaseMap} from "@/models/BaseMap.interface";

type addBaseMapGdModel = z.infer<typeof addBaseMapValidator>;

export function addBaseMapTransformer(inputValidated:addBaseMapGdModel):MassageBaseMap {
    return {
        massage: inputValidated.massage
    }
}