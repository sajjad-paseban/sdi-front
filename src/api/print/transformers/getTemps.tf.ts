import {z} from "zod";

import {PrintTemplate} from "@/models/Print.interface";
import {getTempListValidator, getTempValidator} from "@/api/print/validations/getTemps.vd";


type getTempsValidatorGdModel = z.infer<typeof getTempListValidator>;
type getTempItemValidatorGdModel = z.infer<typeof getTempValidator>;

export function getTempsTransformer(inputValidated: getTempsValidatorGdModel): PrintTemplate[] {
    return [...inputValidated]

}

export function getTempItemTransformer(inputValidated: getTempItemValidatorGdModel): PrintTemplate {
    return {...inputValidated}

}