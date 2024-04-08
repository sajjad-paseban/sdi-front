import {z} from "zod";
import {initFloorUsingValidator} from "@/api/survey/validations/initFloorUsing.vd";
import {floorUsage} from "@/models/Survey.interface";



type initFloorUsingValidatorGdModel = z.infer<typeof initFloorUsingValidator>;

export function initFloorUsingTransformer(inputValidated: initFloorUsingValidatorGdModel): floorUsage[] {
    return [...inputValidated.result]
}