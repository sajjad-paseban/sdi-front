import {z} from "zod";
import {MassageConnection} from "@/models/Conncections.interface";
import {addExternalApiValidator} from "@/api/connections/validations/externalApi/addExternalApi.vd";

type addExternalApiGdModel = z.infer<typeof addExternalApiValidator>;

export function addExternalApiTransformer(inputValidated: addExternalApiGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}