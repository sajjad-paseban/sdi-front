import {number, z} from "zod";
import {TempVariable} from "@/models/Print.interface";


export const uploadTempImageValidator = z.array(z.string())



