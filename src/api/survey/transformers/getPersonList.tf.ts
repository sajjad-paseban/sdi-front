import {z} from "zod";
import {Person} from "@/models/Survey.interface";
import {apartmentPersonListValidator} from "@/api/survey/validations/apartmentPerson.vd";


type getPersonListValidatorGdModel = z.infer<typeof apartmentPersonListValidator>;

export function getPersonListTransformer(inputValidated: getPersonListValidatorGdModel): Person[] {
    return [...inputValidated]

}