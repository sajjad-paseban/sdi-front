import { z } from "zod";
import { CheckerValidator } from "@/api/surveyPanel/validations/users.vd";
export const SurveyProcessItemValidator = z.object({
    id: z.number(),
    feature: z.string(),
    completing: z.number(),
    finalConfirm: z.number(),
    code: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    lock_in_place: z.boolean(),
    estimated_features: z.number(),
    referral_to_survey: z.number(),
    checker: CheckerValidator
});
export const SurveyProcessListValidator = z.array(SurveyProcessItemValidator);
//# sourceMappingURL=getSurveyProcessList.vd.js.map