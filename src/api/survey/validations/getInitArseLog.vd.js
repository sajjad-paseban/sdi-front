import { z } from "zod";
import { user } from "@/api/users/validations/getUsers.vd";
import { ArseStatusEnums } from "@/models/SurveyPanel.interface";
export const ArseLogValidator = z.object({
    id: z.number(),
    arse_log_image: z.array(z.object({ image: z.string() })),
    user: z.object({
        user_type: z.string(),
        info: user
    }),
    status: z.nativeEnum(ArseStatusEnums),
    explanation: z.string(),
    created_at: z.string(),
    arse: z.number()
});
export const getInitArseStatusValidator = z.object({
    previous_log: z.array(ArseLogValidator),
    current_user: z.object({
        user_type: z.string(),
        info: user
    }),
});
//# sourceMappingURL=getInitArseLog.vd.js.map