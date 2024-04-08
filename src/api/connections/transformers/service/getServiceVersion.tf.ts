import {z} from "zod";
import {getServiceTypesValidator} from "@/api/connections/validations/service/getServiceTypes.vd";
import {getServiceVersionValidator} from "@/api/connections/validations/service/getServiceVersion.vd";

type getServiceVersionGdModel = z.infer<typeof getServiceVersionValidator>;

export function getServiceVersionTransformer(inputValidated: getServiceVersionGdModel): string[] {
    return [...inputValidated]
}