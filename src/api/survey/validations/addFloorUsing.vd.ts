import {z} from "zod";
import {floorUsingArrayValidator} from "@/api/survey/validations/floorUsing.vd";

export const addFloorUsingValidator = z.object({
    floor_using: floorUsingArrayValidator
})
