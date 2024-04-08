import {z} from "zod";
import {MassageConnection} from "@/models/Conncections.interface";
import {addServiceValidator} from "@/api/connections/validations/service/addService.vd";

type addServiceGdModel = z.infer<typeof addServiceValidator>;

export function addServiceTransformer(inputValidated: addServiceGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}