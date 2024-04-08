import {z} from "zod";

import {SaveItem} from "@/models/Survey.interface";
import {saveItemValidator} from "@/api/survey/validations/saveItem.vd";


type saveItemValidatorGdModel = z.infer<typeof saveItemValidator>;

export function saveItemTransformer(inputValidated: saveItemValidatorGdModel): SaveItem {
    return {...inputValidated}
}