import { z } from "zod";
export const getEnumTableValidator = z.object({
    pk: z.number(),
    title: z.string(),
    value: z.number(),
    code: z.number().optional(),
    tatbigh: z.string().optional(),
    code_texturetypemastergroup: z.number().optional()
});
export const getEnumsTableValidator = z.array(getEnumTableValidator);
//# sourceMappingURL=getEnumsTable.vd.js.map