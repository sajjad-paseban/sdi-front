import {z} from "zod";

import {AnalyzeListItem, ProcessItem} from "@/models/Analyze.interface";
import {processListValidator} from "@/api/analyze/validations/getProcessItem.vd";

type processListValidatorGdModel = z.infer<typeof processListValidator>;

export function processListTransformer(inputValidated: processListValidatorGdModel): ProcessItem[] {
    return [...inputValidated]
}