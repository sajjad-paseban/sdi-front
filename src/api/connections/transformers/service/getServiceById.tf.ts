import {z} from "zod";

import { ServiceInterface} from "@/models/Conncections.interface";
import {getServiceByIdValidator} from "@/api/connections/validations/service/getServiceById.vd";

type getServiceByIdGdModel = z.infer<typeof getServiceByIdValidator>;

export function getServiceByIdTransformer(inputValidated: getServiceByIdGdModel): ServiceInterface {
    return {...inputValidated}
}