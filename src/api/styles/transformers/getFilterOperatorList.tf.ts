import {z} from "zod";

import {
    getFilterOperatorsListValidator,
} from "@/api/styles/validations/getFilterOperatorsList.vd";

type getFilterOperatorListGdModel = z.infer<typeof getFilterOperatorsListValidator>;

export function getFilterOperatorListTransformer(inputValidated: getFilterOperatorListGdModel): string[] {


    return [...inputValidated]


}