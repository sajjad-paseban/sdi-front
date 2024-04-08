import {z} from "zod";
import {addFloorUsingValidator} from "@/api/survey/validations/addFloorUsing.vd";
import {floorUsage} from "@/models/Survey.interface";
import {addBusinessUnitValidator} from "@/api/survey/validations/addBusinessUnit.vd";


type addBusinessUnitValidatorGdModel = z.infer<typeof addBusinessUnitValidator>;

export function addBusinessUnitTransformer(inputValidated: addBusinessUnitValidatorGdModel): number {
    return inputValidated.id

}