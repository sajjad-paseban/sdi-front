import {z} from "zod";


import {LayerGroup} from "@/models/LayerGroup.interface";
import {addLayerGroupValidator} from "@/api/layerGroup/validations/add.vd";

type saveGdModel = z.infer<typeof addLayerGroupValidator>;

export function saveTransformer(inputValidated: saveGdModel): LayerGroup {


    return {...inputValidated}


}