import { z } from "zod";
export const loggedUserValidator = z.array(z.object({
    fixed_token: z.string(),
    row_number: z.number(),
    created_at: z.number(),
    expire: z.number(),
    ip: z.string(),
    user: z.string().nullable(),
    os: z.string(),
    browser: z.string(),
    is_active: z.boolean(),
    device_model: z.string(),
}));
//# sourceMappingURL=loggedUser.vd.js.map