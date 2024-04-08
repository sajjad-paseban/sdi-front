import {z} from "zod";
import {ExternalApiInterface} from "@/models/Conncections.interface";
import {getExternalApisValidator} from "@/api/connections/validations/externalApi/getExternalApis.vd";

type getExternalApisGdModel = z.infer<typeof getExternalApisValidator>;

export function getExternalApisTransformer(inputValidated: getExternalApisGdModel): ExternalApiInterface[] {
    return inputValidated.map((item) => {
        return {...item, headers: item.api_headers, params: item.api_params}
    })
}