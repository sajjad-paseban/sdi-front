import {z} from "zod";



export const getItemAdvanceValidator =z.object({
    rules:z.array(z.object({
        filter_type:z.string(),
        style:z.object({
            min_zoom: z.number().nullable(),
            max_zoom:z.number().nullable(),
            polygon:z.object({
                color:z.string().nullable(),
                pattern:z.string().nullable(),
                pattern_color:z.string().nullable()
            }).nullable(),
            edge:z.object({
                color:z.string().nullable(),
                pattern:z.string().nullable(),
                width:z.number().nullable()
            }).nullable(),

            point:z.object({
                icon:z.string().nullable(),
                size:z.number().nullable()
            }).nullable()

        }),
        conditions:z.array(z.object({
            operator:z.string(),
            value:z.string()
        }))

    })),
    id:z.number(),
    prop:z.number()
})




