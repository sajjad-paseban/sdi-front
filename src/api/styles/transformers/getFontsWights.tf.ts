import {z} from "zod";


import {getFontsWightsValidator} from "@/api/styles/validations/getFontsWights.vd";

type getFontsWightsGdModel = z.infer<typeof getFontsWightsValidator>;

export function getFontsWightsTransformer(inputValidated: getFontsWightsGdModel): string[] {


    return [...inputValidated]


}