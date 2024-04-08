import {z} from "zod";
import {ParkingAndStoreEnums} from "@/models/Survey.interface";

export const storeValidator = z.object({
    id:z.number().optional(),
    kind: z.nativeEnum(ParkingAndStoreEnums),
    area: z.number(),
    numbers: z.number()
})


export const storeArrayValidator =z.array(storeValidator)