import {z} from "zod";
import {MassageStaticJWT} from "@/models/staticJWT.interface";
import {logoutManuallyUserValidator} from "@/api/jwt/validations/logoutManuallyUser.vd";

type logoutManuallyUserGdModel = z.infer<typeof logoutManuallyUserValidator>;

export function logoutManuallyUserTransformer(inputValidated:logoutManuallyUserGdModel):MassageStaticJWT {
    return {
        massage: inputValidated.massage
    }
}