import { z } from "zod";
export const deleteAccessValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=deleteAccess.vd.js.map