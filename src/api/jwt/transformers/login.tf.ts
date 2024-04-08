
//T1:تایپ دیتای خروجی مورد نظر ما
//T2:تایپ دیتای خروجی از بکند
import {Role, UserStates} from "@/store/user/types";
import {z} from "zod";
import {loginValidator} from "@/api/jwt/validations/login.vd";

type LoginGdModel = z.infer<typeof loginValidator>;

export function loginTransformer(inputValidated:LoginGdModel):UserStates{
    const role:Role= {...inputValidated.role,accessRoutes:[],accessApis:[]}

    const result :UserStates={...inputValidated,role:role}

    console.log(result,'transport result')
    return result

}