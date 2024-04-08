import {z} from "zod";

import { MassageConnection} from "@/models/Conncections.interface";

import {deleteExternalApiByIdValidator} from "@/api/connections/validations/externalApi/deleteExternalApiById.vd";

type deleteExternalApiByIdGdModel = z.infer<typeof deleteExternalApiByIdValidator>;

export function deleteExternalApiByIdTransformer(inputValidated: deleteExternalApiByIdGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}