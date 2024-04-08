import {z} from "zod";
import {DarbInfo, Wall} from "@/models/Survey.interface";
import Feature from "ol/Feature";

export const progressValidator = z.object({


    id:z.number().optional(),
    feature:z.any(),
    area: z.number(),
    direction: z.number(),
    building_district_direction: z.number(),
    balcony_type:z.number().optional(),
    lat: z.number(),
    lon: z.number(),
    rain_catcher:z.boolean().optional(),
    in_maabar: z.boolean(),
    floors:z.array(z.object({
        floor: z.number(),
        value: z.boolean()
    }))
})


export const progressesValidator =z.array(progressValidator)