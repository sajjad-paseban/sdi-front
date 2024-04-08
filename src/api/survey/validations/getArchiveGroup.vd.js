import { z } from "zod";
export const addArchiveGroupValidator = z.lazy(() => z.object({
    id: z.number(),
    title: z.string(),
    value: z.number(),
    master: z.number().optional(),
    subsystem: z.number().optional(),
    group: z.number().optional(),
    children: z.array(addArchiveGroupValidator).optional(),
    image: z.string().optional()
}));
export const addArchiveGroupListValidator = z.array(addArchiveGroupValidator);
//# sourceMappingURL=getArchiveGroup.vd.js.map