import {z} from "zod";
import {DarbInfo, Tree, Wall} from "@/models/Survey.interface";
import {treesValidator} from "@/api/survey/validations/trees.vd";
import {user} from "@/api/users/validations/getUsers.vd";
import {Layer_types} from "@/models/Layer.Interface";
import {ArseStatusEnums} from "@/models/SurveyPanel.interface";


export const ArseLogValidator = z.object({
    id:z.number(),
    arse_log_image:z.array(z.object({image:z.string()})),
    user:z.object({
        user_type:z.string(),
        info:user
    }),
    status:z.nativeEnum(ArseStatusEnums),
    explanation:z.string(),
    created_at:z.string(),
    arse:z.number()
})
export const getInitArseStatusValidator = z.object({

    previous_log:z.array(ArseLogValidator),
    current_user:z.object({
        user_type:z.string(),
        info:user
    }),

})

