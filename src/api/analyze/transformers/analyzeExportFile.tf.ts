import {z} from "zod";

import {FeatureResult} from "@/models/Analyze.interface";
import {filterResultFeaturesValidator} from "@/api/analyze/validations/filterResult.vd";
import {analyze_export_fileValidator} from "@/api/analyze/validations/analyze_export_file.vd";

type analyzeExportFiletValidatorGdModel = z.infer<typeof analyze_export_fileValidator>;

export function analyzeExportFiletTransformer(inputValidated: analyzeExportFiletValidatorGdModel): string {
    return inputValidated
}