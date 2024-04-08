import { z } from "zod";
export const addProgressValidator = z.object({
    progress: z.array(z.object({ id: z.number() }))
});
//# sourceMappingURL=addProgress.vd.js.map