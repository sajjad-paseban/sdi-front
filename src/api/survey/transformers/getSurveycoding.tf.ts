import {z} from "zod";
import {getSurveyCodingsValidator} from "@/api/survey/validations/getSurveyCoding.vd";
import {CodingTableRecord} from "@/store/survey/types";



type getSurveyCodingValidatorGdModel = z.infer<typeof getSurveyCodingsValidator>;

export function getSurveyCodingTransformer(inputValidated: getSurveyCodingValidatorGdModel): CodingTableRecord[] {

    return [...inputValidated]
}