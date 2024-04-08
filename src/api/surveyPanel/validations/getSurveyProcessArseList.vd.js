import { z } from "zod";
import { getArseLogListValidator } from "@/api/surveyPanel/validations/getArseLogList.vd";
export const getSurveyProcessArseValidator = z.object({
    id: z.number(),
    feature: z.string(),
    area: z.number(),
    explanation: z.string().nullable(),
    code: z.string(),
    arse_log: getArseLogListValidator,
    lock_in_place: z.boolean(),
    code_location: z.number(),
    code_physical_natures: z.number()
});
export const getSurveyProcessArseListValidator = z.array(getSurveyProcessArseValidator);
//# sourceMappingURL=getSurveyProcessArseList.vd.js.map