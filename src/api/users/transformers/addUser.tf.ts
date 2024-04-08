import {z} from "zod";

import {addUserValidator} from "@/api/users/validations/addUser.vd";
import {MassageUsers} from "@/models/User.interface";

type addUserGdModel = z.infer<typeof addUserValidator>;

export function addUserTransformer(inputValidated:addUserGdModel):MassageUsers {
    return {
        massage: inputValidated.massage
    }
}