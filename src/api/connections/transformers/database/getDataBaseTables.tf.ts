import {z} from "zod";
import {getDataBasesValidator} from "@/api/connections/validations/database/getDataBases.vd";
import {DataBaseInterface} from "@/models/Conncections.interface";
import {getDataBaseTablesValidator} from "@/api/connections/validations/database/getDataBaseTables.vd";

type getDataBaseTablesGdModel = z.infer<typeof getDataBaseTablesValidator>;

export function getDataBaseTablesTransformer(inputValidated: getDataBaseTablesGdModel): string[] {
    return [...inputValidated]
}