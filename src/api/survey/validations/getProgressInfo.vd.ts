import {z} from "zod";
import {AnalyzeExportFileType, AnalyzeExportType} from "@/models/Analyze.interface";
import {analyzeGroupItemValidator} from "@/api/analyze/validations/analyzeGroup.vd";
import {getProcessItemValidator} from "@/api/analyze/validations/getProcessItem.vd";

export const getProgressInfoValidator = z.object({
    direction:z.number(),
    area:z.number(),
    in_maabar:z.boolean(),
})

