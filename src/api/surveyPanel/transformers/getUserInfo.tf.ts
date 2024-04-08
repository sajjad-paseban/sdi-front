import {z} from "zod";
import {GetUserInfoValidator} from "@/api/surveyPanel/validations/getUserInfo.vd";
import {PanelUser} from "@/models/SurveyPanel.interface";


type getUserInfoValidator = z.infer<typeof GetUserInfoValidator>;

export function getUserInfoTransformer(inputValidated: getUserInfoValidator): PanelUser {
    return {...inputValidated}
}

