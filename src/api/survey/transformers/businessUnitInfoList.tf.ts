import {z} from "zod";
import {businessUnitInfoArrayValidator} from "@/api/survey/validations/businessUnitInfo.vd";
import {BusinessUnitInfo} from "@/models/Survey.interface";


type businessUnitInfoListValidatorGdModel = z.infer<typeof businessUnitInfoArrayValidator>;

export function businessUnitInfoListTransformer(inputValidated: businessUnitInfoListValidatorGdModel): BusinessUnitInfo[] {
    return [...inputValidated]
}