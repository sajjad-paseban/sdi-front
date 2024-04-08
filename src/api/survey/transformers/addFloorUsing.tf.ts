import {z} from "zod";
import {addFloorUsingValidator} from "@/api/survey/validations/addFloorUsing.vd";
import {floorUsage} from "@/models/Survey.interface";


type addFloorUsingValidatorGdModel = z.infer<typeof addFloorUsingValidator>;

export function addFloorUsingTransformer(inputValidated: addFloorUsingValidatorGdModel): floorUsage[] {
    return [...inputValidated.floor_using]

}