import {z} from "zod";
import {getUserByUserNameValidator} from "@/api/users/validations/getUserByUserName.vd";
import {UserInterface} from "@/models/User.interface";

type getUserByIdGdModel = z.infer<typeof getUserByUserNameValidator>;

export function getUserByUserNameTransformer(inputValidated: getUserByIdGdModel): UserInterface {
    return {...inputValidated}

}