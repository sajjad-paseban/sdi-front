import {z} from "zod";

import {DataBaseInterface, MassageConnection} from "@/models/Conncections.interface";
import {deleteServiceByIdValidator} from "@/api/connections/validations/service/deleteServiceById.vd";

type deleteServiceByIdGdModel = z.infer<typeof deleteServiceByIdValidator>;

export function deleteServiceByIdTransformer(inputValidated: deleteServiceByIdGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}