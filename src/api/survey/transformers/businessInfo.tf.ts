import {z} from "zod";
import {businessInfoValidator} from "@/api/survey/validations/businessInfo.vd";
import {BusinessInfo} from "@/models/Survey.interface";


type businessInfoValidatorGdModel = z.infer<typeof businessInfoValidator>;

export function businessInfoTransformer(inputValidated: businessInfoValidatorGdModel): BusinessInfo {
    return {...inputValidated}
}