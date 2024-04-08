import {z} from "zod";

import {StylePattern} from "@/models/Style.interface";
import {getStylePatternValidator} from "@/api/styles/validations/getStylePattern.vd";

type getStylePatternGdModel = z.infer<typeof getStylePatternValidator>;

export function getStylePatternTransformer(inputValidated: getStylePatternGdModel): StylePattern[] {


    return [...inputValidated]


}