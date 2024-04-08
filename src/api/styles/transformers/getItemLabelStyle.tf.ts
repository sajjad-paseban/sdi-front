import {z} from "zod";

import { LabelStyleInterface} from "@/models/Style.interface";
import {getLabelStyleItemValidator} from "@/api/styles/validations/getItemLabelStyle.vd";

type getItemLabelStyleGdModel = z.infer<typeof getLabelStyleItemValidator>;

export function getItemLabelStyleTransformer(inputValidated: getItemLabelStyleGdModel): LabelStyleInterface {


    return {...inputValidated}


}