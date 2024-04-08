import {z} from "zod";
import {AnalyzeExportFileType, AnalyzeExportType} from "@/models/Analyze.interface";
import {analyzeGroupItemValidator} from "@/api/analyze/validations/analyzeGroup.vd";
import {getProcessItemValidator} from "@/api/analyze/validations/getProcessItem.vd";

export const getEnumsValidator = z.array(z.string())

