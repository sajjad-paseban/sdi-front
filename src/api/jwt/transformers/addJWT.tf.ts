import {z} from "zod";
import {addJWTValidator} from "@/api/jwt/validations/addJWT.vd";
import {MassageStaticJWT} from "@/models/staticJWT.interface";

type addJWTGdModel = z.infer<typeof addJWTValidator>;

export function addJWTTransformer(inputValidated:addJWTGdModel):MassageStaticJWT {
    return {
        massage: inputValidated.massage
    }
}