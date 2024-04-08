import {z} from "zod";
import {DarbInfo, Wall} from "@/models/Survey.interface";

export const wallValidator = z.object({
    wall_type: z.number().nullable(),
    wall_height: z.number().nullable(),
    wall_lat: z.number().nullable(),
    wall_creation: z.string().optional().nullable(),
    relation_id:z.number().optional().nullable(),
})

