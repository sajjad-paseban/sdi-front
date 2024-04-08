import {z} from "zod";



import {LayerRetrieve} from "@/models/Layer.Interface";

import {layerRetrieveValidator} from "@/api/extraInLayer/validations/layerRetrieve.vd";

type layerRetrieveGdModel = z.infer<typeof layerRetrieveValidator>;

export function layerRetrieveTransformer(inputValidated: layerRetrieveGdModel): LayerRetrieve {


    return {...inputValidated}


}