import { z } from "zod";
export const addServiceValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=addService.vd.js.map