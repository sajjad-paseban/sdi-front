import {z} from "zod";

import { TableStaticJWTInterface} from "@/models/staticJWT.interface";
import {keysValidator} from "@/api/jwt/validations/getKeys.vd";
import moment from "jalali-moment";

type getKeysGdModel = z.infer<typeof keysValidator>;

export function getKeysTransformer(inputValidated:getKeysGdModel):TableStaticJWTInterface[] {
    return inputValidated.map((item)=>{
        const x = new Date(item.start_time * 1000).toLocaleDateString('en-US')
        const y = new Date(item.expire * 1000).toLocaleDateString('en-US')
        return{...item,
            start_time:moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'),
            expire:moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD')
        }
    })
}