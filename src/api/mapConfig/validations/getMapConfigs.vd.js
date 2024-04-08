import { z } from "zod";
import { getMapConfigByIdValidator } from "@/api/mapConfig/validations/getMapConfigById.vd";
export const getMapConfigsValidator = z.array(getMapConfigByIdValidator);
//# sourceMappingURL=getMapConfigs.vd.js.map