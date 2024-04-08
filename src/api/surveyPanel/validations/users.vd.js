import { z } from "zod";
import { user } from "@/api/users/validations/getUsers.vd";
import { getLayerValidator } from "@/api/extraInLayer/validations/getLayers.vd";
export const CheckerValidator = z.object({
    id: z.number(),
    user: user,
    code: z.string(),
    edit_access: z.boolean().optional()
});
export const ManagerValidator = z.object({
    id: z.number(),
    user: user,
    code: z.string()
});
export const SurveyPersonValidator = z.object({
    id: z.number(),
    user: user,
    code: z.string(),
    arse_layer: getLayerValidator.nullable(),
    building_layer: getLayerValidator.nullable(),
    extra_layer: getLayerValidator.nullable(),
    apartment_layer: getLayerValidator.nullable()
});
export const SurveyPanelUsersValidator = z.object({
    checkers: z.array(CheckerValidator),
    managers: z.array(ManagerValidator),
    surveys: z.array(SurveyPersonValidator),
});
//# sourceMappingURL=users.vd.js.map