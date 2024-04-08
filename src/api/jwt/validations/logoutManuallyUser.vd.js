import { z } from "zod";
export const logoutManuallyUserValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=logoutManuallyUser.vd.js.map