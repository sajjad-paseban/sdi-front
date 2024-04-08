import {z} from "zod";

import {MassageUsers} from "@/models/User.interface";
import {SurveyPanelUsersValidator} from "@/api/surveyPanel/validations/users.vd";
import {SurveyPanelUsers} from "@/models/SurveyPanel.interface";

type getUsersGdModel = z.infer<typeof SurveyPanelUsersValidator>;

export function getUsersTransformer(inputValidated:getUsersGdModel):SurveyPanelUsers {
    return {
        ...inputValidated
    }
}