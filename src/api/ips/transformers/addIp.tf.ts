import {z} from "zod";

import {addIpValidator} from "@/api/ips/validations/addIp.vd";
import {MassageIps} from "@/models/Ips.interface";

type addIpGdModel = z.infer<typeof addIpValidator>;

export function addIpTransformer(inputValidated:addIpGdModel):MassageIps {
    return {
        massage: inputValidated.massage
    }
}