import { z } from "zod";
export const elevatorValidator = z.object({
    feature: z.any(),
    area: z.number(),
    floors: z.array(z.object({
        floor: z.number(),
        value: z.boolean()
    }))
});
export const elevatorsValidator = z.array(elevatorValidator);
//# sourceMappingURL=elevator.vd.js.map