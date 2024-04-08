import {z} from "zod";
import {AnalyzeExportFileType, AnalyzeExportType} from "@/models/Analyze.interface";
import {analyzeGroupItemValidator} from "@/api/analyze/validations/analyzeGroup.vd";
import {getProcessItemValidator} from "@/api/analyze/validations/getProcessItem.vd";

export const filterResultFeatureValidator = z.object({
    type:z.string(),
    id:z.string(),
    geometry:z.object({}).passthrough(),
    geometry_name:z.string(),
    properties:z.object({}).passthrough(),
    layer:z.string().optional(),
    index:z.number().optional()
})

export const filterResultFeaturesValidator = z.array(filterResultFeatureValidator)