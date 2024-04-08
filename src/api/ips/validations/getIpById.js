import { z } from "zod";
export const getIpByIdValidator = z.object({
    id: z.number(),
    active_time_start: z.number().nullable(),
    active_time_end: z.number().nullable(),
    ip: z.string(),
    is_active: z.boolean(),
    user: z.number().nullable(),
    os: z.string().nullable()
});
//# sourceMappingURL=getIpById.js.map