import {z} from "zod";
import {DarbInfo, Wall} from "@/models/Survey.interface";
import Feature from "ol/Feature";

export const elevatorValidator = z.object({
    feature:z.any(),
    area: z.number(),
    floors:z.array(z.object({
        floor: z.number(),
        value: z.boolean()
    }))

})


export const elevatorsValidator =z.array(elevatorValidator)