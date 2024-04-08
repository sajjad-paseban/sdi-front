import {z, ZodAny} from "zod";
import {CheckerValidator} from "@/api/surveyPanel/validations/users.vd";



export const CheckerProcessItemValidator = z.object({
    id:z.number(),
    feature:z.string(),
    referral_to_survey:z.number(),
    referral_to_manager:z.number(),
    referral_to_checker:z.number(),
    finalConfirm:z.number(),
    code:z.string(),
    start_date:z.string(),
    end_date:z.string(),
    lock_in_place:z.boolean(),
    estimated_features:z.number(),
    survey_person:CheckerValidator
})

export const CheckerProcessListValidator = z.array(CheckerProcessItemValidator)