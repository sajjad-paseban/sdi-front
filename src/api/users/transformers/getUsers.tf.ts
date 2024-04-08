import {z} from "zod";
import {UserInterface, usersObject} from "@/models/User.interface";
import {getUsersValidator} from "@/api/users/validations/getUsers.vd";

type getUsersGdModel = z.infer<typeof getUsersValidator>;

export function getUsersTransformer(inputValidated: getUsersGdModel): usersObject[] {
    return [...inputValidated]

}