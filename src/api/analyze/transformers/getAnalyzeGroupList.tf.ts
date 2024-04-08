import {z} from "zod";

import {AnalyzeGroup} from "@/models/Analyze.interface";
import {analyzeGroupListValidator} from "@/api/analyze/validations/analyzeGroup.vd";

type analyzeGroupListValidatorGdModel = z.infer<typeof analyzeGroupListValidator>;

export function analyzeGroupListTransformer(inputValidated: analyzeGroupListValidatorGdModel): AnalyzeGroup[] {
    return [...inputValidated]
}