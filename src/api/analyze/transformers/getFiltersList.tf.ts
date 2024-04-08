import {z} from "zod";

import {AnalyzeFilter} from "@/models/Analyze.interface";
import {filtersListValidator} from "@/api/analyze/validations/getFilterItem.vd";


type filtersListValidatorGdModel = z.infer<typeof filtersListValidator>;

export function filtersListTransformer(inputValidated: filtersListValidatorGdModel): AnalyzeFilter[] {
    return [...inputValidated]
}