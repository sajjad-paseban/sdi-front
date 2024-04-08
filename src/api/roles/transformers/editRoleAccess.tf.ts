import {z} from "zod";
import {MassageRoles} from "@/models/Role.interface";
import {editRoleAccessValidator} from "@/api/roles/validations/editRoleAccess.vd";

type editRoleAccessGdModel = z.infer<typeof editRoleAccessValidator>;

export function editRoleAccessTransformer(inputValidated:editRoleAccessGdModel):MassageRoles {
    return {
        massage: inputValidated.massage
    }
}