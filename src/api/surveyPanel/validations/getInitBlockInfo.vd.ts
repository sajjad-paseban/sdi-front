import {z, ZodAny} from "zod";
import {CheckerValidator, ManagerValidator, SurveyPersonValidator} from "@/api/surveyPanel/validations/users.vd";


export const InitBlockInfoValidator = z.array(z.object({
    status: z.string(),
    person: z.string(),
    explanation: z.string().nullable(),
    update_date: z.string(),
    images: z.array(z.string())
}))

