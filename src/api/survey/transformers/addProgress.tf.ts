import {z} from "zod";
import {addProgressValidator} from "@/api/survey/validations/addProgress.vd";


type addProgressValidatorGdModel = z.infer<typeof addProgressValidator>;

export function addProgressTransformer(inputValidated: addProgressValidatorGdModel): { progress: { id: number }[] } {
    return {...inputValidated}
}