import {z} from "zod";


import {LayerGroup, LayerGroupInterface} from "@/models/LayerGroup.interface";
import {listLayerGroupValidator} from "@/api/layerGroup/validations/list.vd";

type listGdModel = z.infer<typeof listLayerGroupValidator>;

export function listTransformer(inputValidated: listGdModel): LayerGroupInterface[] {


    return [...inputValidated]


}