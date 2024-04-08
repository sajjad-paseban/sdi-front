import {z, ZodAny} from "zod";
import {user} from "@/api/users/validations/getUsers.vd";
import {getLayerValidator} from "@/api/extraInLayer/validations/getLayers.vd";


export const ArsePreviewValidator = z.object({
    data:z.string()
})

