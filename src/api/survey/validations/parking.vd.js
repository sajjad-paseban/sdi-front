import { z } from "zod";
import { ParkingAndStoreEnums } from "@/models/Survey.interface";
export const parkingValidator = z.object({
    id: z.number().optional(),
    kind: z.nativeEnum(ParkingAndStoreEnums),
    area: z.number(),
    numbers: z.number(),
    relation_id: z.number().optional().nullable(),
});
//# sourceMappingURL=parking.vd.js.map