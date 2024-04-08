import {z} from "zod";

import {addRoleValidator} from "@/api/roles/validations/addRole.vd";
import {MassageRoles} from "@/models/Role.interface";

type addRoleGdModel = z.infer<typeof addRoleValidator>;

export function addRoleTransformer(inputValidated:addRoleGdModel):MassageRoles {
    return {
        massage: inputValidated.massage
    }
}