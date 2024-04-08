import {z} from "zod";
import {layerExportTypesListValidator} from "@/api/extraInLayer/validations/layerExportTypesList.vd";

type layerExportTypesListGdModel = z.infer<typeof layerExportTypesListValidator>;

export function layerExportTypesListTransformer(inputValidated: layerExportTypesListGdModel): string[] {
    return [...inputValidated]
}