import {z} from "zod";

import {AnalyzeListItem, AnalyzeRunResult} from "@/models/Analyze.interface";
import {runAnalyzeListValidator, runAnalyzeValidator} from "@/api/analyze/validations/runAnalyze.vd";

type runAnalyzeResultValidatorGdModel = z.infer<typeof runAnalyzeListValidator>;

export function runAnalyzeResultTransformer(inputValidated: runAnalyzeResultValidatorGdModel): AnalyzeRunResult[] {
    return [...inputValidated]
}
