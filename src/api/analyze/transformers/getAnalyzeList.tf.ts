import {z} from "zod";
import {analyzeListValidator} from "@/api/analyze/validations/analyze.vd";
import {AnalyzeListItem} from "@/models/Analyze.interface";

type analyzeListValidatorGdModel = z.infer<typeof analyzeListValidator>;

export function analyzeListTransformer(inputValidated: analyzeListValidatorGdModel): AnalyzeListItem[] {
    return [...inputValidated]
}