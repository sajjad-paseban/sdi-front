import {z} from "zod";

import {SaveStyle} from "@/models/Style.interface";
import {saveStyleValidator} from "@/api/styles/validations/saveStyle.vd";

type saveStyleGdModel = z.infer<typeof saveStyleValidator>;

export function saveStyleTransformer(inputValidated: saveStyleGdModel): SaveStyle {


    return {...inputValidated}


}