import { z } from "zod";
export const editAccessValidator = z.object({
    massage: z.string().min(1),
});
export const getEditAccessValidator = z.object({
    f_name: z.string().min(1),
    e_name: z.string().min(1),
    is_active: z.boolean(),
    parent: z.number().nullable(),
    apis: z.array(z.string())
});
//# sourceMappingURL=editAccess.vd.js.map