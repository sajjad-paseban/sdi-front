import {z} from "zod";


import {MassageUsers} from "@/models/User.interface";
import {deleteUserValidator} from "@/api/users/validations/deleteUser.vd";

type deleteUserGdModel = z.infer<typeof deleteUserValidator>;

export function deleteUserTransformer(inputValidated:deleteUserGdModel):MassageUsers {
    return {
        massage: inputValidated.massage
    }
}