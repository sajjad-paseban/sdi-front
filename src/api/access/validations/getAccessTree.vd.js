import { z } from "zod";
export const getAccessTreeValidator = z.array(z.object({
    id: z.number().min(1),
    e_name: z.string().min(1),
    children: z.array(z.any()).nullable()
}));
//# sourceMappingURL=getAccessTree.vd.js.map