import { z } from "zod";
export const getProgressInfoValidator = z.object({
    direction: z.number(),
    area: z.number(),
    in_maabar: z.boolean(),
});
//# sourceMappingURL=getProgressInfo.vd.js.map