import {z} from "zod";


export const getLabelStyleItemValidator =z.object({
    name:z.string(),
    min_zoom: z.number().nullable(),
    max_zoom:z.number().nullable(),

    id:z.number().optional(),

    font_family:z.string(),
    font_size:z.number(),
    font_style:z.string(),
    font_weight:z.string(),

    halo_fill:z.string(),
    halo_radius:z.number(),

    fill_color:z.string(),
    line_placement:z.boolean().nullable(),

    labels:z.array(z.string()).optional()


})




