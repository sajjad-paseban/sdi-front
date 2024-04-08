import { z } from "zod";
export const ipValidator = z.object({
    id: z.number(),
    active_time_start: z.number().nullable(),
    active_time_end: z.number().nullable(),
    ip: z.string(),
    is_active: z.boolean(),
    user: z.number().nullable(),
    os: z.string().nullable()
});
export const ipsValidator = z.array(ipValidator);
//# sourceMappingURL=ips.js.map