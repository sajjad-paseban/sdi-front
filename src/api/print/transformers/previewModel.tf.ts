import {z} from "zod";
import {previewModelValidator} from "@/api/print/validations/previewModel.vd";
import {PreviewModelSdModelInterface} from "@/api/print/SD.Models/previewModel.sd";


type previewModelValidatorGdModel = z.infer<typeof previewModelValidator>;

export function previewModelTransformer(inputValidated: previewModelValidatorGdModel): PreviewModelSdModelInterface {
    return {...inputValidated}

}