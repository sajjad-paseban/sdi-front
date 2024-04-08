import {z} from "zod";
import {analyzeItemValidator} from "@/api/analyze/validations/analyze.vd";
import {AnalyzeListItem} from "@/models/Analyze.interface";

type analyzeItemValidatorGdModel = z.infer<typeof analyzeItemValidator>;

export function analyzeItemTransformer(inputValidated: analyzeItemValidatorGdModel): AnalyzeListItem {
    return {...inputValidated}
}