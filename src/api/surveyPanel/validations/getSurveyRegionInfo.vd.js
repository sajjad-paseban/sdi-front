import { z } from "zod";
import { user } from "@/api/users/validations/getUsers.vd";
export const SurveyRegionInfoValidator = z.object({
    id: z.number(),
    user: user,
    code: z.string(),
    all_estimated_features: z.number(),
    features_done: z.number(),
    biggest_end_date: z.string().nullable(),
    features: z.array(z.string()),
});
export const SurveyRegionInfoListValidator = z.array(SurveyRegionInfoValidator);
//# sourceMappingURL=getSurveyRegionInfo.vd.js.map