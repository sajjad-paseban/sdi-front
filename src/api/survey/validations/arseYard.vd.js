import { z } from "zod";
import { treesValidator } from "@/api/survey/validations/trees.vd";
export const yardValidator = z.object({
    water_supply_source: z.number().nullable(),
    watering_type: z.number().nullable(),
    well_number: z.number(),
    well_type: z.number().nullable(),
    garden_area: z.number().nullable(),
    yard_trees: treesValidator,
    feature: z.string().optional().nullable(),
    relation_id: z.number().optional().nullable(),
});
//# sourceMappingURL=arseYard.vd.js.map