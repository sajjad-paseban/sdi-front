import {z} from "zod";
import {floorUsingArrayValidator} from "@/api/survey/validations/floorUsing.vd";

export const addBusinessUnitValidator = z.object({
    id: z.number()
})
