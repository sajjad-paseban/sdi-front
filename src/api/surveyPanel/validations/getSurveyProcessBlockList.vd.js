import { z } from "zod";
import { getSurveyProcessArseListValidator } from "@/api/surveyPanel/validations/getSurveyProcessArseList.vd";
export const getSurveyProcessBlockValidator = z.object({
    id: z.number(),
    explanation: z.string().nullable(),
    code: z.string(),
    status: z.string(),
    block_arse: getSurveyProcessArseListValidator,
    update_date: z.string()
});
export const getSurveyProcessBlockListValidator = z.array(getSurveyProcessBlockValidator);
//# sourceMappingURL=getSurveyProcessBlockList.vd.js.map