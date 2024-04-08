import { z } from "zod";
export const buildingExtraInfoValidator = z.object({
    id: z.number().optional(),
    direction: z.number(),
    b_number: z.number(),
    name: z.string().nullable(),
    floors_num: z.number(),
    roof_area: z.number(),
    infrastructure_area: z.number(),
    stage_building: z.number().optional(),
    view_type: z.number().optional(),
    building_type: z.number().optional(),
    historical_status: z.number().optional(),
    ceiling_cover: z.number().optional(),
    finish_year: z.number().optional().nullable(),
    explanation: z.string().optional().nullable(),
    code: z.string().optional(),
});
//# sourceMappingURL=buildingextraInfo.vd.js.map