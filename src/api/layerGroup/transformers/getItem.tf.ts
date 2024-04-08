import {z} from "zod";
import {getItemValidator} from "@/api/layerGroup/validations/getItem.vd";
import {LayerGroupInterface} from "@/models/LayerGroup.interface";

type getItemGdModel = z.infer<typeof getItemValidator>;

export function getItemTransformer(inputValidated: getItemGdModel): LayerGroupInterface {


    return {...inputValidated}


}