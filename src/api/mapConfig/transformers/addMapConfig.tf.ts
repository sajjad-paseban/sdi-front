import {z} from "zod";


import {addMapConfigValidator} from "@/api/mapConfig/validations/addMapConfig.vd";
import {MassageMapConfig} from "@/models/MapConfig.interface";

type addMapConfigGdModel = z.infer<typeof addMapConfigValidator>;

export function addMapConfigTransformer(inputValidated:addMapConfigGdModel):MassageMapConfig {
    return {
        massage: inputValidated.massage
    }
}