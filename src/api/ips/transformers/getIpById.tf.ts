import {z} from "zod";
import {GetIpById} from "@/models/Ips.interface";
import moment from "jalali-moment";
import {getIpByIdValidator} from "@/api/ips/validations/getIpById";

type getIpByIdGdModel = z.infer<typeof getIpByIdValidator>;

export function getIpByIdTransformer(inputValidated: getIpByIdGdModel): GetIpById {

    const date:(string|null)[] = []
    if (inputValidated.active_time_start && inputValidated.active_time_end) {
        const x = new Date(inputValidated.active_time_start * 1000).toLocaleDateString('en-US')
        date.push(moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'))
        const y = new Date(inputValidated.active_time_end * 1000).toLocaleDateString('en-US')
        date.push(moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD'))
    }

    return {
        ...inputValidated,
        date:date,
        user:inputValidated.user
    }
}