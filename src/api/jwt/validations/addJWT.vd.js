import { z } from "zod";
export const addJWTValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=addJWT.vd.js.map