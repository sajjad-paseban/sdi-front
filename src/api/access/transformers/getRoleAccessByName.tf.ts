import {z} from "zod";

import {getRoleAccessByNameValidator} from "@/api/access/validations/getRoleAccessByName.vd";

type getRoleAccessByNameGdModel = z.infer<typeof getRoleAccessByNameValidator >;

export function getRoleAccessByNameTransformer(inputValidated:getRoleAccessByNameGdModel):number[]{

    return [...inputValidated]

}