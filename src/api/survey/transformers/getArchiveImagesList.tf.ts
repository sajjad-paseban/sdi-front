import {z} from "zod";
import {getArchiveImagesListValidator} from "@/api/survey/validations/getArchiveImagesList.vd";
import {Archive} from "@/models/Survey.interface";



type getArchiveImagesListValidatorGdModel = z.infer<typeof getArchiveImagesListValidator>;

export function getArchiveImagesListTransformer(inputValidated: getArchiveImagesListValidatorGdModel): Archive[] {
    return [...inputValidated]

}