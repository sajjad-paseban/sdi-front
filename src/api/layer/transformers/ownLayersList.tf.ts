import {z} from "zod";


import {ownLayersListValidator} from "@/api/layer/validations/ownLayersList.vd";
import {ResponseLayerUpload} from "@/models/Layer.Interface";

type ownLayersListGdModel = z.infer<typeof ownLayersListValidator>;

export function ownLayersListTransformer(inputValidated: ownLayersListGdModel): ResponseLayerUpload[] {


    return [...inputValidated]


}