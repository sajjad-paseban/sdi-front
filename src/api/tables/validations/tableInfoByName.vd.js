import { z } from "zod";
export const tableInfoByNameValidator = z.array(z.object({
    model: z.string(),
    pk: z.number(),
    fields: z.object({})
}));
//# sourceMappingURL=tableInfoByName.vd.js.map