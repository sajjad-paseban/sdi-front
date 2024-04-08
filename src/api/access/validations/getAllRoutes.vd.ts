import {z} from "zod";
import {API_TYPE} from "@/models/Access.interface";

export const getAllRoutesValidator = z.array(z.object({
    id:z.number(),
    text:z.string()
}))