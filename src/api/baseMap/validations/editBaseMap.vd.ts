import {z} from "zod";
import {API_TYPE} from "@/models/Access.interface";

export const getEditBaseMapValidator =z.object({
    code: z.string().min(1),
    name: z.string().min(1),
    address: z.string().min(1),
    image: z.string().min(1).nullable(),
    online: z.boolean(),
    default: z.boolean(),
    id:z.number()

})