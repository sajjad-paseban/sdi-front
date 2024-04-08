import {z} from "zod";
import {getExternalApiMethodsValidator} from "@/api/connections/validations/externalApi/getExternalApiMethods.vd";

type getExternalApiMethodsGdModel = z.infer<typeof getExternalApiMethodsValidator>;

export function getExternalApiMethodsTransformer(inputValidated: getExternalApiMethodsGdModel): string[] {
    return [...inputValidated]
}