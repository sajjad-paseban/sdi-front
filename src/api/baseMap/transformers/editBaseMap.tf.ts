import {z} from "zod";
import {getEditBaseMapValidator} from "@/api/baseMap/validations/editBaseMap.vd";
import {BaseMapInterface} from "@/models/BaseMap.interface";


type getEditBaseMapGdModel = z.infer<typeof getEditBaseMapValidator>;
export function getEditBaseMapTransformer(inputValidated:getEditBaseMapGdModel):BaseMapInterface {
    return {
        ...inputValidated
    }
}
