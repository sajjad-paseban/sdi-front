import { z } from "zod";
export const getAllRoutesValidator = z.array(z.object({
    id: z.number(),
    text: z.string()
}));
//# sourceMappingURL=getAllRoutes.vd.js.map