import {z} from "zod";

import {TableField} from "@/models/Conncections.interface";
import {getTableFieldsValidator} from "@/api/connections/validations/database/getTableFields.vd";

type getTableFieldsGdModel = z.infer<typeof getTableFieldsValidator>;

export function getTableFieldsTransformer(inputValidated: getTableFieldsGdModel): TableField[] {
    return [...inputValidated]
}