import {number, z} from "zod";


export const layerDatabaseInfoValidation = z.object({
    database_id: number(),
    table_name: z.string(),

})




