import { z } from "zod";
export const doorValidator = z.object({
    id: z.number().optional(),
    district: z.number().optional(),
    door_material: z.number(),
    door_type: z.number(),
    door_height: z.number(),
    door_lat: z.number(),
    main_door: z.boolean(),
    door_size: z.number(),
    relation_id: z.number().optional().nullable(),
});
export const doorsValidator = z.array(doorValidator);
//# sourceMappingURL=door.vd.js.map