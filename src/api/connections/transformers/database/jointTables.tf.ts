import {z} from "zod";

import {AnyObject, TableField} from "@/models/Conncections.interface";
import {getTableFieldsValidator} from "@/api/connections/validations/database/getTableFields.vd";
import {joinTablesValidator} from "@/api/connections/validations/database/joinTables.vd";

type joinTablesGdModel = z.infer<typeof joinTablesValidator>;

export function joinTablesTransformer(inputValidated: joinTablesGdModel): AnyObject[] {
    return [...inputValidated]
}