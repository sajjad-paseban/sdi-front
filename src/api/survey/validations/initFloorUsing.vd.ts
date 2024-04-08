import {z} from "zod";
import {DarbInfo, Wall} from "@/models/Survey.interface";
import {floorUsingArrayValidator} from "@/api/survey/validations/floorUsing.vd";

export const initFloorUsingValidator = z.object({
    result: floorUsingArrayValidator
})


