import { z } from "zod";
import { user } from "@/api/users/validations/getUsers.vd";
export const GetUserInfoValidator = z.object({
    id: z.number(),
    user_type: z.string(),
    info: user
});
//# sourceMappingURL=getUserInfo.vd.js.map