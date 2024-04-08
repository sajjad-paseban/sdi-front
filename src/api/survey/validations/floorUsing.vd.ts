import {z} from "zod";

export const floorUsingValidator = z.object({

    id: z.number().optional(),
    finish_year: z.string().optional().nullable(),
    height: z.number().optional(),
    beginning_use_time: z.string().optional().nullable(),
    change_floor_using_time: z.string().optional().nullable(),
    effective_in_units_number: z.boolean().optional(),
    sharing: z.boolean(),
    stage_building: z.number().optional().nullable(),
    group_building: z.number().optional().nullable(),
    building_type: z.number().optional().nullable(),
    main_use: z.number(),
    sub_use: z.number(),
    area: z.number(),
    units_number: z.number().nullable()
})


export const floorUsingArrayValidator = z.array(floorUsingValidator)