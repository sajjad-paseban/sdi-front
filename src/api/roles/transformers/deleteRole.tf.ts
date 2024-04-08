import {z} from "zod";

import {MassageRoles} from "@/models/Role.interface";
import { deleteRoleValidator} from "@/api/roles/validations/deleteRole.vd";

type deleteRoleGdModel = z.infer<typeof deleteRoleValidator>;

export function deleteRoleTransformer(inputValidated:deleteRoleGdModel):MassageRoles {
    return {
        massage: inputValidated.massage
    }
}