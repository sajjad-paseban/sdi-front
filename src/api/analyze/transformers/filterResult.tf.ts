import {z} from "zod";

import {FeatureResult} from "@/models/Analyze.interface";
import {filterResultFeaturesValidator} from "@/api/analyze/validations/filterResult.vd";

type filterResultListValidatorGdModel = z.infer<typeof filterResultFeaturesValidator>;

export function filterResultListTransformer(inputValidated: filterResultListValidatorGdModel): FeatureResult[] {
    return [...inputValidated]
}