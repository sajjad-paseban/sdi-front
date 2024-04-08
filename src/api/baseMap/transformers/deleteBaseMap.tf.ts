import {z} from "zod";
import {MassageBaseMap} from "@/models/BaseMap.interface";
import {deleteBaseMapValidator} from "@/api/baseMap/validations/deleteBaseMap.vd";

type deleteBaseMapGdModel = z.infer<typeof deleteBaseMapValidator>;

export function deleteBaseMapTransformer(inputValidated:deleteBaseMapGdModel):MassageBaseMap {
    return {
        massage: inputValidated.massage
    }
}