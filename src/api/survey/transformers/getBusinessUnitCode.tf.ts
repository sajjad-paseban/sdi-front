import {z} from "zod";

import {getBusinessUnitCodeValidator} from "@/api/survey/validations/getBusinessUnitCode.vd";


type getBusinessUnitCodeValidatorGdModel = z.infer<typeof getBusinessUnitCodeValidator>;

export function getBusinessUnitCodeTransformer(inputValidated: getBusinessUnitCodeValidatorGdModel): string {
    return inputValidated

}