import {number, z} from "zod";
import {TempVariable} from "@/models/Print.interface";

export const tempGroupValidator = z.object({
    id: z.number(),
    name: z.string(),
})

const variablesValidator: z.ZodType<TempVariable> = z.lazy(() =>
    z.object({
        value: z.string(),
        name: z.string(),
        children:z.array(variablesValidator).optional()
    })
);


export const getInitAddModelValidator = z.object({
    photos: z.array(z.string()),
    groups:z.array(tempGroupValidator),
    temp_sizes:z.array(z.string()),
    heading_temps:z.array(z.any()),
    small_temps:z.array(z.any()),
    footer_temps:z.array(z.any()),
    variables: z.array(variablesValidator),

})



