import {z, ZodAny} from "zod";
import {user} from "@/api/users/validations/getUsers.vd";
import {getLayerValidator} from "@/api/extraInLayer/validations/getLayers.vd";
import {getSurveyProcessArseListValidator} from "@/api/surveyPanel/validations/getSurveyProcessArseList.vd";


export const getSurveyProcessBlockValidator = z.object({
    id: z.number(),
    explanation: z.string().nullable(),
    code: z.string(),
    status: z.string(),
    block_arse: getSurveyProcessArseListValidator,
    update_date:z.string()

})

export const getSurveyProcessBlockListValidator = z.array(getSurveyProcessBlockValidator)