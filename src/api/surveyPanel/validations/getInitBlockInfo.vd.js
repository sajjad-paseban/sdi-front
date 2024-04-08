import { z } from "zod";
export const InitBlockInfoValidator = z.array(z.object({
    status: z.string(),
    person: z.string(),
    explanation: z.string().nullable(),
    update_date: z.string(),
    images: z.array(z.string())
}));
//# sourceMappingURL=getInitBlockInfo.vd.js.map