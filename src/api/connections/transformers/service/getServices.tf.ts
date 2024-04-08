import {z} from "zod";

import {ServiceInterface} from "@/models/Conncections.interface";
import {getServicesValidator} from "@/api/connections/validations/service/getServices.vd";

type getServicesGdModel = z.infer<typeof getServicesValidator>;

export function getServicesTransformer(inputValidated: getServicesGdModel): ServiceInterface[] {
    return [...inputValidated]
}