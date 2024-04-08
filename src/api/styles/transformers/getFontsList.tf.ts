import {z} from "zod";

import {getFontsListValidator} from "@/api/styles/validations/getFontsList.vd";

type getFontsListGdModel = z.infer<typeof getFontsListValidator>;

export function getFontsListTransformer(inputValidated: getFontsListGdModel): string[] {


    return [...inputValidated]


}