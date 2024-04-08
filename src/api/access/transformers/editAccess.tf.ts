import {z} from "zod";
import {deleteAccessValidator} from "@/api/access/validations/deleteAccess.vd";
import {MassageAccess} from "@/models/Access.interface";
import {editAccessValidator, getEditAccessValidator} from "@/api/access/validations/editAccess.vd";
import {AddAccessSDModel} from "@/api/access/SD.Models/addAccess.sd";


type editAccessGdModel = z.infer<typeof editAccessValidator>;

export function editAccessTransformer(inputValidated:editAccessGdModel):MassageAccess {
    return {
        massage: inputValidated.massage
    }
}

type getEditAccessGdModel = z.infer<typeof getEditAccessValidator>;
export function getEditAccessTransformer(inputValidated:getEditAccessGdModel):AddAccessSDModel {
    return {
        ...inputValidated
    }
}