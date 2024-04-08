import { z } from "zod";
export const listLayerGroupValidator = z.array(z.object({
    name: z.string(),
    parent: z.number().nullable(),
    id: z.number().optional()
}));
//# sourceMappingURL=list.vd.js.map