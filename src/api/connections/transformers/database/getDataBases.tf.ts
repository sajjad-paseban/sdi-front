import {z} from "zod";
import {getDataBasesValidator} from "@/api/connections/validations/database/getDataBases.vd";
import {DataBaseInterface} from "@/models/Conncections.interface";

type getDataBasesGdModel = z.infer<typeof getDataBasesValidator>;

export function getDataBasesTransformer(inputValidated: getDataBasesGdModel): DataBaseInterface[] {
    return [...inputValidated]
}