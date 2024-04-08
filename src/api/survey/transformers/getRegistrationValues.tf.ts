import {z} from "zod";
import {getRegistrationValuesValidator} from "@/api/survey/validations/getRegistrationValues.vd";
import {RegistrationValues} from "@/models/Survey.interface";


type getRegistrationValuesValidatorGdModel = z.infer<typeof getRegistrationValuesValidator>;

export function getRegistrationValuesTransformer(inputValidated: getRegistrationValuesValidatorGdModel): RegistrationValues {
    return {...inputValidated}
}