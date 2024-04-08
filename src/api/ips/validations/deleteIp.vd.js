import { z } from "zod";
export const deleteIpValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=deleteIp.vd.js.map