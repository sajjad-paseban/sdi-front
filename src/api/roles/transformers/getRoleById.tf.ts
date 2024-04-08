import {z} from "zod";

import {Role} from "@/models/Role.interface";
import {getRolesByIdValidator} from "@/api/roles/validations/getRoleById.vd";

type getRolesByIdGdModel = z.infer<typeof getRolesByIdValidator>;

export function getRolesByIdTransformer(inputValidated: getRolesByIdGdModel): Role {
    return {...inputValidated}

}