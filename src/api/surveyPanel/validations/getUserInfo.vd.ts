import {z, ZodAny} from "zod";
import {user} from "@/api/users/validations/getUsers.vd";
import {getLayerValidator} from "@/api/extraInLayer/validations/getLayers.vd";


export const GetUserInfoValidator = z.object({
    id:z.number(),
    user_type:z.string(),
    info:user
})

