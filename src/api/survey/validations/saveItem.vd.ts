import {z} from "zod";

export const saveItemValidator = z.object({
    id:z.number()
})
