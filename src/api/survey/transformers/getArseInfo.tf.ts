import {z} from "zod";

import {FeatureResult} from "@/models/Analyze.interface";
import {filterResultFeaturesValidator} from "@/api/analyze/validations/filterResult.vd";
import {getArseInfoListValidator} from "@/api/survey/validations/getArseInfo.vd";
import {District} from "@/models/Survey.interface";

type getArseInfoValidatorGdModel = z.infer<typeof getArseInfoListValidator>;

export function getArseInfoTransformer(inputValidated: getArseInfoValidatorGdModel): District[] {
    return [...inputValidated]
}