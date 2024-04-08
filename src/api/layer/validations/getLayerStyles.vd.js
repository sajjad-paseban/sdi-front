import { z } from "zod";
import { getListBaseStyleValidator } from "@/api/styles/validations/getListBaseStyle.vd";
export const getLayerStylesValidator = z.object({
    id: z.number(),
    styles: getListBaseStyleValidator
});
//# sourceMappingURL=getLayerStyles.vd.js.map