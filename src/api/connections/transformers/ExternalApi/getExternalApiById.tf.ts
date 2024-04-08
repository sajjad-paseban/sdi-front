import {z} from "zod";
import {ExternalApiInterface, ServiceInterface} from "@/models/Conncections.interface";
import {getExternalApiByIdValidator} from "@/api/connections/validations/externalApi/getExternalApiById.vd";

type getExternalApiByIdGdModel = z.infer<typeof getExternalApiByIdValidator>;

export function getExternalApiByIdTransformer(inputValidated: getExternalApiByIdGdModel): ExternalApiInterface {
    return {...inputValidated,headers:inputValidated.api_headers,params:inputValidated.api_params}
}