import { z } from "zod";
export const getBaseStyleItemValidator = z.object({
    name: z.string(),
    min_zoom: z.number().nullable(),
    max_zoom: z.number().nullable(),
    polygon: z.object({
        color: z.string().nullable(),
        pattern: z.string().nullable(),
        pattern_color: z.string().nullable()
    }).nullable(),
    edge: z.object({
        color: z.string().nullable(),
        pattern: z.string().nullable(),
        width: z.number().nullable()
    }).nullable(),
    point: z.object({
        icon: z.string().nullable(),
        size: z.number().nullable()
    }).nullable()
});
//# sourceMappingURL=getItemBaseStyle.vd.js.map