import {z} from "zod";
import {getInitAddModelValidator} from "@/api/print/validations/getInitAddModel.vd";
import {InitDataPrintAdd} from "@/models/Print.interface";
import {uploadTempImageValidator} from "@/api/print/validations/uploadTempImage.vd";


type uploadTempImageValidatorGdModel = z.infer<typeof uploadTempImageValidator>;

export function uploadTempImageTransformer(inputValidated: uploadTempImageValidatorGdModel): string[] {
    return [...inputValidated]

}