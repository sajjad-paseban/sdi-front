import {z} from "zod";


export const layerExportValidator = z.object({
    file:z.string()
})