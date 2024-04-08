import {z} from "zod";

export const getRoleAccessByNameValidator = z.array(z.number())