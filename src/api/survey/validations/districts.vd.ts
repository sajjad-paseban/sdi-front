import {z} from "zod";
import {DarbInfo, Wall} from "@/models/Survey.interface";
import {doorsValidator} from "@/api/survey/validations/door.vd";
import {wallValidator} from "@/api/survey/validations/wall.vd";

export const districtValidator = z.object({
    id: z.number().optional(),
    direction: z.number(),
    num: z.number(),
    long: z.number(),
    adjacent_type: z.number().nullable(),

    gozar_lat: z.number().nullable().optional(),
    bar_long: z.number().nullable().optional(),
    front_area: z.number().nullable().optional(),
    maabar_code: z.string().optional().nullable(),
    maabar_lat: z.number().nullable().optional(),
    maabar_long: z.number().nullable().optional(),
    main_maabar: z.boolean().optional(),

    bezel_area: z.number().nullable().optional(),
    has_bezel: z.boolean().nullable().optional(),
    explanation: z.string().optional().nullable(),

    doors: doorsValidator.optional(),
    wall : wallValidator.optional().nullable(),

    relation_id:z.number().optional().nullable(),
})

export const districtsValidator = z.array(districtValidator)
