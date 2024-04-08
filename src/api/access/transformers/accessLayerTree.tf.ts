import {z} from "zod";



import {LayerTree} from "@/models/Layer.Interface";

import {accessLayerTreeArrayValidator} from "@/api/access/validations/accessLayerTree.vd";
import {AccessLayerTree} from "@/models/Access.interface";

type accessLayerTreeGdModel = z.infer<typeof accessLayerTreeArrayValidator>;

export function accessLayerTreeTransformer(inputValidated: accessLayerTreeGdModel): AccessLayerTree[] {


    return [...inputValidated]


}