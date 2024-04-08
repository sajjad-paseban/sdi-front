import {z} from "zod";
import {getEnumsTableValidator} from "@/api/survey/validations/getEnumsTable.vd";
import {EnumsTableItem} from "@/models/Survey.interface";


type getEnumsTableValidatorGdModel = z.infer<typeof getEnumsTableValidator>;

export function getEnumsTableTransformer(inputValidated: getEnumsTableValidatorGdModel): EnumsTableItem[] {

    return inputValidated.map((item) => {
        if (!item.title) {
            item.title = 'نامشخص'
        }
        return item
    })
}