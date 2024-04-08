import {z} from "zod";
import {getServiceTypesValidator} from "@/api/connections/validations/service/getServiceTypes.vd";

type getServiceTypesGdModel = z.infer<typeof getServiceTypesValidator>;

export function getServiceTypesTransformer(inputValidated: getServiceTypesGdModel): string[] {
    return [...inputValidated]
}