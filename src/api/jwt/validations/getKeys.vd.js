import { z } from "zod";
export const keyValidator = z.object({
    id: z.number(),
    user: z.string(),
    access_token: z.string(),
    is_active: z.boolean(),
    start_time: z.number(),
    expire: z.number(),
    max_request_per_min: z.number()
});
export const keysValidator = z.array(keyValidator);
//# sourceMappingURL=getKeys.vd.js.map