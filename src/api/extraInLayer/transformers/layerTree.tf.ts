import {z} from "zod";


import {ownLayersListValidator} from "@/api/layer/validations/ownLayersList.vd";
import {LayerTree, ResponseLayerUpload} from "@/models/Layer.Interface";
import {getLayerFieldsValidator} from "@/api/layer/validations/getLayerFields.vd";
import {layerTreeArrayValidator} from "@/api/extraInLayer/validations/getLayerTree.vd";

type layerTreeGdModel = z.infer<typeof layerTreeArrayValidator>;

export function layerTreeTransformer(inputValidated: layerTreeGdModel): LayerTree[] {


    return [...inputValidated]


}