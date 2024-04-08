import { z } from "zod";
export const addDatabaseValidator = z.object({
    massage: z.string().min(1),
});
//# sourceMappingURL=addDataBase.vd.js.map