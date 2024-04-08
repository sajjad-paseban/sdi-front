import {z} from "zod";

import {GetKeyById} from "@/models/staticJWT.interface";
import moment from "jalali-moment";
import {getKeyByIdValidator} from "@/api/jwt/validations/getKeyById.vd";

type getKeyByIdGdModel = z.infer<typeof getKeyByIdValidator>;

export function getKeyByIdTransformer(inputValidated: getKeyByIdGdModel): GetKeyById {

    const date:(string)[] = []
    const x = new Date(inputValidated.start_time * 1000).toLocaleDateString('en-US')
    date.push(moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'))
    const y = new Date(inputValidated.expire * 1000).toLocaleDateString('en-US')
    date.push(moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'))
    return {
        ...inputValidated,
        date:date
    }
}