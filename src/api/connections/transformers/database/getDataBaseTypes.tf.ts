import {z} from "zod";

import {getDataBaseTypesValidator} from "@/api/connections/validations/database/getDataBaseTypes.vd";

type getDataBaseTypesGdModel = z.infer<typeof getDataBaseTypesValidator>;

export function getDataBaseTypesTransformer(inputValidated: getDataBaseTypesGdModel): string[] {
    return [...inputValidated]
}