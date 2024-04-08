import {z} from "zod";


import {LayerDatabaseInfo} from "@/models/Layer.Interface";

import {layerDatabaseInfoValidation} from "@/api/layer/validations/layerDatabaseInfo.vd";

type layerDatabaseInfoGdModel = z.infer<typeof layerDatabaseInfoValidation>;

export function layerDatabaseInfoTransformer(inputValidated: layerDatabaseInfoGdModel): LayerDatabaseInfo {


    return {...inputValidated}


}