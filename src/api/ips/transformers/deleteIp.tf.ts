import {z} from "zod";
import {MassageIps} from "@/models/Ips.interface";
import {deleteIpValidator} from "@/api/ips/validations/deleteIp.vd";

type deleteIpGdModel = z.infer<typeof deleteIpValidator>;

export function deleteIpTransformer(inputValidated:deleteIpGdModel):MassageIps {
    return {
        massage: inputValidated.massage
    }
}