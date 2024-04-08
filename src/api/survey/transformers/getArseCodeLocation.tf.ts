import {z} from "zod";

import {getArseCodeLocationValidator} from "@/api/survey/validations/getArseCodeLocation.vd";

type getArseCodeLocationValidatorGdModel = z.infer<typeof getArseCodeLocationValidator>;

export function getArseCodeLocationTransformer(inputValidated: getArseCodeLocationValidatorGdModel): number {

    return inputValidated.data


}