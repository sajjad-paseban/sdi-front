import {z} from "zod";

import {AdvanceStyle} from "@/models/Style.interface";
import {getItemAdvanceValidator} from "@/api/styles/validations/getItemAdvanceStyle.vd";

type getItemAdvanceStyleGdModel = z.infer<typeof getItemAdvanceValidator>;

export function getItemAdvanceStyleTransformer(inputValidated: getItemAdvanceStyleGdModel): AdvanceStyle {


    return {...inputValidated}


}