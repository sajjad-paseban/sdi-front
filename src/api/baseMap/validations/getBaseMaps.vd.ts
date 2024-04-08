import {z} from "zod";



export const getBaseMapsObjectValidator = z.object({
    id:z.number(),
    code:z.string(),
    name:z.string(),
    address:z.string(),
    default:z.boolean(),
    online:z.boolean(),
    image:z.string().nullable()
})

export const getBaseMapsValidator = z.array(getBaseMapsObjectValidator)