import { z } from "zod";
import { AnalyzeExportFileType, AnalyzeExportType } from "@/models/Analyze.interface";
import { analyzeGroupItemValidator } from "@/api/analyze/validations/analyzeGroup.vd";
import { getProcessItemValidator } from "@/api/analyze/validations/getProcessItem.vd";
export const analyzeItemValidator = z.object({
    id: z.number(),
    name: z.string(),
    export_type: z.nativeEnum(AnalyzeExportType),
    export_file_type: z.nativeEnum(AnalyzeExportFileType).nullable(),
    des: z.string(),
    group: analyzeGroupItemValidator,
    process: getProcessItemValidator
});
export const analyzeListValidator = z.array(analyzeItemValidator);
//# sourceMappingURL=analyze.vd.js.map