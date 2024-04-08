import {z} from "zod";
import {MassageConnection} from "@/models/Conncections.interface";
import {checkServiceValidator} from "@/api/connections/validations/service/checkService.vd";

type checkServiceGdModel = z.infer<typeof checkServiceValidator>;

export function checkServiceTransformer(inputValidated: checkServiceGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}