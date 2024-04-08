import {z} from "zod";
import {getBaseStyleItemValidator} from "@/api/styles/validations/getItemBaseStyle.vd";
import {BaseStyleInterface} from "@/models/Style.interface";

type getItemBaseStyleGdModel = z.infer<typeof getBaseStyleItemValidator>;

export function getItemBaseStyleTransformer(inputValidated: getItemBaseStyleGdModel): BaseStyleInterface {


    return {...inputValidated}


}