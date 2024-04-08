import {z} from "zod";
import {ArsePreviewValidator} from "@/api/surveyPanel/validations/getArsePreview.vd";


type getArsePreviewValidator = z.infer<typeof ArsePreviewValidator>;

export function getArsePreviewTransformer(inputValidated: getArsePreviewValidator): string {
    return inputValidated.data
}

