import {z, ZodAny} from "zod";
import {user} from "@/api/users/validations/getUsers.vd";
import {getLayerValidator} from "@/api/extraInLayer/validations/getLayers.vd";
import {SurveyProcessItem} from "@/models/SurveyPanel.interface";
import Feature from "ol/Feature";
import {CheckerValidator} from "@/api/surveyPanel/validations/users.vd";


export const SurveyProcessItemValidator = z.object({
    id:z.number(),
    feature:z.string(),
    completing:z.number(),
    finalConfirm:z.number(),
    code:z.string(),
    start_date:z.string(),
    end_date:z.string(),
    lock_in_place:z.boolean(),
    estimated_features:z.number(),
    referral_to_survey:z.number(),
    checker:CheckerValidator
})

export const SurveyProcessListValidator = z.array(SurveyProcessItemValidator)