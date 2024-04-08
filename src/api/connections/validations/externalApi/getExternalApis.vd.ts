import {z} from "zod";
import {getExternalApiByIdValidator} from "@/api/connections/validations/externalApi/getExternalApiById.vd";

export const getExternalApisValidator = z.array(getExternalApiByIdValidator)



