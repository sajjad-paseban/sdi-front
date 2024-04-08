import {z} from "zod";

import {InitAddress} from "@/models/Survey.interface";
import {getAddressInitValidator} from "@/api/survey/validations/getAddressInit.vd";


type getInitAddressValidatorGdModel = z.infer<typeof getAddressInitValidator>;

export function getInitAddressTransformer(inputValidated: getInitAddressValidatorGdModel): InitAddress {
    return {...inputValidated}
}