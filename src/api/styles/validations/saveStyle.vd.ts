import {number, z} from "zod";


export const saveStyleValidator =z.object({
    id:number()
})