import { z } from "zod";
export const checkServiceValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=checkService.vd.js.map