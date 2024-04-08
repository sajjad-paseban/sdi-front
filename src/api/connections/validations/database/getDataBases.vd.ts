import {z} from "zod";
import {getDataBaseByIdValidator} from "@/api/connections/validations/database/getDataBaseById.vd";

export const getDataBasesValidator = z.array(getDataBaseByIdValidator)



