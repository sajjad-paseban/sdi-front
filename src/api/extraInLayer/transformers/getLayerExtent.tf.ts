import {z} from "zod";
import {getLayerExtentValidator} from "@/api/extraInLayer/validations/getLayerextent.vd";


type getLayerExtentGdModel = z.infer<typeof getLayerExtentValidator>;

export function getLayerExtentTransformer(inputValidated: getLayerExtentGdModel): string {


    return inputValidated


}