import {z} from "zod";

import {uploadLayerValidator} from "../validations/uploadLayer.vd";
import {ResponseLayerUpload} from "../../../models/Layer.Interface";

type uploadLayerGdModel = z.infer<typeof uploadLayerValidator>;

export function uploadLayerTransformer(inputValidated: uploadLayerGdModel): ResponseLayerUpload {


    return {...inputValidated}


}