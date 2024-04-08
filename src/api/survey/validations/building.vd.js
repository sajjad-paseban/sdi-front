import { z } from "zod";
import { buildingFloorsValidator } from "@/api/survey/validations/buildingFloor.vd";
import { buildingExtraInfoValidator } from "@/api/survey/validations/buildingextraInfo.vd";
import { progressesValidator } from "@/api/survey/validations/progress.vd";
import { elevatorsValidator } from "@/api/survey/validations/elevator.vd";
export const buildingValidator = z.object({
    id: z.number(),
    feature: z.any(),
    building_floor: buildingFloorsValidator.optional(),
    progressInfo: progressesValidator.optional(),
    elevator_info: elevatorsValidator.optional().nullable(),
    staircase_info: elevatorsValidator.optional().nullable(),
    extra_info: buildingExtraInfoValidator
});
export const buildingsValidator = z.array(buildingValidator);
//# sourceMappingURL=building.vd.js.map