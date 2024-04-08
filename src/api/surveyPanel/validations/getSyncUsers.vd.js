import { z } from "zod";
import { CheckerValidator, ManagerValidator } from "@/api/surveyPanel/validations/users.vd";
export const getSyncUsersValidator = z.object({
    id: z.number(),
    feature: z.string(),
    code: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    lock_in_place: z.boolean(),
    estimated_features: z.number(),
    manager: ManagerValidator,
    checker: CheckerValidator,
    survey_person: CheckerValidator
});
//# sourceMappingURL=getSyncUsers.vd.js.map