import {z} from "zod";

import {ProgressInfo} from "@/models/Survey.interface";
import {getProgressInfoValidator} from "@/api/survey/validations/getProgressInfo.vd";

type getProgressInfoValidatorGdModel = z.infer<typeof getProgressInfoValidator>;

export function getProgressInfoTransformer(inputValidated: getProgressInfoValidatorGdModel): ProgressInfo {
    return {...inputValidated}
}