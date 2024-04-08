import { z } from "zod";
export const getRolesTreeValidator = z.array(z.object({
    id: z.number().min(1),
    name: z.string().min(1),
    children: z.array(z.any()).nullable()
}));
//# sourceMappingURL=getRolesTree.vd.js.map