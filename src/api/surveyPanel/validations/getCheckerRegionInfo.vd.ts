import {z, ZodAny} from "zod";
import {user} from "@/api/users/validations/getUsers.vd";
import {getLayerValidator} from "@/api/extraInLayer/validations/getLayers.vd";


export const CheckerRegionInfoValidator = z.object({
    id: z.number(),
    user: user,
    code: z.string(),
    all_estimated_features: z.number(),
    features_done: z.number(),
    biggest_end_date: z.string().nullable(),
    features: z.array(z.string()),
})

export const CheckerRegionInfoListValidator = z.array(CheckerRegionInfoValidator)