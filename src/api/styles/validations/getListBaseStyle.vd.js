import { z } from "zod";
export const getListBaseStyleValidator = z.array(z.object({
    id: z.number(),
    name: z.string(),
    legend: z.string().nullable(),
    geo_type: z.string(),
    user: z.string().nullable(),
    style_type: z.string()
}));
//# sourceMappingURL=getListBaseStyle.vd.js.map