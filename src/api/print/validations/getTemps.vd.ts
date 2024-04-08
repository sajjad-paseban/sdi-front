import {number, z} from "zod";
import {TempVariable} from "@/models/Print.interface";


export const getTempValidator = z.object({
    id:z.number().optional(),
    name: z.string().nullable(),
    print_template_group: z.number(),
    temp_size: z.string().nullable(),
    small_temp: z.number(),
    header_temp: z.number(),
    footer_temp: z.number(),
    model_variable: z.string(),
    feature_model_layer: z.number().nullable().optional(),
    temp_value: z.string()

})


export const getTempListValidator = z.array(getTempValidator)
