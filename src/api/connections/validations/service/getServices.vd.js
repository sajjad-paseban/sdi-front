import { z } from "zod";
import { getServiceByIdValidator } from "@/api/connections/validations/service/getServiceById.vd";
export const getServicesValidator = z.array(getServiceByIdValidator);
//# sourceMappingURL=getServices.vd.js.map