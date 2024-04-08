import {z} from "zod";
import {getDataBaseByIdValidator} from "@/api/connections/validations/database/getDataBaseById.vd";
import {DataBaseInterface} from "@/models/Conncections.interface";

type getDataBaseByIdGdModel = z.infer<typeof getDataBaseByIdValidator>;

export function getDataBaseByIdTransformer(inputValidated: getDataBaseByIdGdModel): DataBaseInterface {
    return {...inputValidated}
}