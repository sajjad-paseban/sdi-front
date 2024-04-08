import { z } from "zod";
export const getRolesByIdValidator = z.object({
    id: z.number(),
    name: z.string().min(1),
    role_code: z.string(),
    is_admin: z.boolean(),
    is_active: z.boolean(),
    app_user: z.boolean(),
    parent: z.number().nullable(),
});
//# sourceMappingURL=getRoleById.vd.js.map