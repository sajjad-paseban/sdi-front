import {z} from "zod";
import { ListStyles} from "@/models/Style.interface";
import {getListBaseStyleValidator} from "@/api/styles/validations/getListBaseStyle.vd";

type getListBaseStyleGdModel = z.infer<typeof getListBaseStyleValidator>;

export function getListBaseStyleTransformer(inputValidated: getListBaseStyleGdModel): ListStyles[] {


    return [...inputValidated]


}