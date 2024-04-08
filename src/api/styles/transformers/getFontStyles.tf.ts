import {z} from "zod";
import {getFontStylesValidator} from "@/api/styles/validations/getFontStyles.vd";

type getFontStylesGdModel = z.infer<typeof getFontStylesValidator>;

export function getFontStylesTransformer(inputValidated: getFontStylesGdModel): string[] {


    return [...inputValidated]


}