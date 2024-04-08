import {z} from "zod";
import {deleteAccessValidator} from "@/api/access/validations/deleteAccess.vd";
import {MassageAccess} from "@/models/Access.interface";


type deleteAccessGdModel = z.infer<typeof deleteAccessValidator>;

export function deleteAccessTransformer(inputValidated:deleteAccessGdModel):MassageAccess {
    return {
        massage: inputValidated.massage
    }
}