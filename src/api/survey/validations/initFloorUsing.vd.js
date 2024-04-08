import { z } from "zod";
import { floorUsingArrayValidator } from "@/api/survey/validations/floorUsing.vd";
export const initFloorUsingValidator = z.object({
    result: floorUsingArrayValidator
});
//# sourceMappingURL=initFloorUsing.vd.js.map