import {z} from "zod";
import {getInitAddModelValidator} from "@/api/print/validations/getInitAddModel.vd";
import {InitDataPrintAdd} from "@/models/Print.interface";


type getInitAddModelValidatorGdModel = z.infer<typeof getInitAddModelValidator>;

export function getInitAddModelTransformer(inputValidated: getInitAddModelValidatorGdModel): InitDataPrintAdd {
    return {...inputValidated}

}