import { z } from "zod";
export const addUserValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=addUser.vd.js.map