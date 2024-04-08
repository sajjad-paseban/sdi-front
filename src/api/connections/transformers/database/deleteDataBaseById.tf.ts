import {z} from "zod";
import {getDataBaseByIdValidator} from "@/api/connections/validations/database/getDataBaseById.vd";
import {DataBaseInterface, MassageConnection} from "@/models/Conncections.interface";
import {deleteDataBaseByIdValidator} from "@/api/connections/validations/database/deleteDataBaseById.vd";

type deleteDataBaseByIdGdModel = z.infer<typeof deleteDataBaseByIdValidator>;

export function deleteDataBaseByIdTransformer(inputValidated: deleteDataBaseByIdGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}