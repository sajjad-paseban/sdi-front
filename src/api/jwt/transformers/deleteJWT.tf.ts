import {z} from "zod";
import {addJWTValidator} from "@/api/jwt/validations/addJWT.vd";
import {MassageStaticJWT} from "@/models/staticJWT.interface";
import {deleteJWTValidator} from "@/api/jwt/validations/deleteJWT.vd";

type deleteJWTGdModel = z.infer<typeof deleteJWTValidator>;

export function deleteJWTTransformer(inputValidated:deleteJWTGdModel):MassageStaticJWT {
    return {
        massage: inputValidated.massage
    }
}