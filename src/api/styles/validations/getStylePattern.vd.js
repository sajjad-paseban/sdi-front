import { z } from "zod";
export const getStylePatternValidator = z.array(z.object({
    name: z.string(),
    legend: z.string()
}));
//# sourceMappingURL=getStylePattern.vd.js.map