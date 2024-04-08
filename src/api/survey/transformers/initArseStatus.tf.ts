import {z} from "zod";
import {getInitArseStatusValidator} from "@/api/survey/validations/getInitArseLog.vd";
import {InitArseStatus} from "@/models/Survey.interface";
type initArseStatusValidatorGdModel = z.infer<typeof getInitArseStatusValidator>;

export function initArseStatusTransformer(inputValidated: initArseStatusValidatorGdModel): InitArseStatus {
    return {...inputValidated}
}