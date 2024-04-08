import {z} from "zod";
import {layerExportTypesListValidator} from "@/api/extraInLayer/validations/layerExportTypesList.vd";
import {layerExportValidator} from "@/api/extraInLayer/validations/layerExport.vd";

type layerExportGdModel = z.infer<typeof layerExportValidator>;

export function layerExportTransformer(inputValidated: layerExportGdModel): string {
    return inputValidated.file
}