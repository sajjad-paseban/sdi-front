import {z} from "zod";

import {getRolesWithParentNameValidator} from "@/api/roles/validations/getRolesWithParentName.vd";
import {RolesWithParentName} from "@/models/Role.interface";

type getRolesWithParentNameGdModel = z.infer<typeof getRolesWithParentNameValidator>;

export function getRolesWithParentNameTransformer(inputValidated: getRolesWithParentNameGdModel): RolesWithParentName[] {
    return [...inputValidated]

}