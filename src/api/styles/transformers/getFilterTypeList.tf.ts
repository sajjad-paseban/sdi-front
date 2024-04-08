import {z} from "zod";

import {getFilterTypeListValidator} from "@/api/styles/validations/getFilterTypesList.vd";

type getFilterTypeLisGdModel = z.infer<typeof getFilterTypeListValidator>;

export function getFilterTypeListTransformer(inputValidated: getFilterTypeLisGdModel): string[] {


    return [...inputValidated]


}