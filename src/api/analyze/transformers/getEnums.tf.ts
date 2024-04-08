import {z} from "zod";

import {getEnumsValidator} from "@/api/analyze/validations/getEnums.vd";


type getEnumsValidatorGdModel = z.infer<typeof getEnumsValidator>;

export function getEnumsTransformer(inputValidated: getEnumsValidatorGdModel): string[] {
    return [...inputValidated]
}