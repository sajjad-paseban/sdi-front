import { z } from "zod";
export const getAddressInitValidator = z.object({
    major_street: z.string().nullable(),
    minor_street: z.string().nullable(),
    alley: z.string().nullable(),
});
//# sourceMappingURL=getAddressInit.vd.js.map