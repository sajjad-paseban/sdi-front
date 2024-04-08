import {z} from "zod";

import {Archive} from "@/models/Survey.interface";
import {getArchiveImageValidator} from "@/api/survey/validations/getArchiveImagesList.vd";



type getArchiveImageItemValidatorGdModel = z.infer<typeof getArchiveImageValidator>;

export function getArchiveImageItemTransformer(inputValidated: getArchiveImageItemValidatorGdModel): Archive {
    return {...inputValidated}

}