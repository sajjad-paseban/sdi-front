import {z} from "zod";


import {TableIpsInterface} from "@/models/Ips.interface";
import {userIpsValidator} from "@/api/ips/validations/userIps";
import moment from "jalali-moment";

type getUserIpsGdModel = z.infer<typeof userIpsValidator>;

export function getUserIpsTransformer(inputValidated: getUserIpsGdModel): TableIpsInterface[] {


    return inputValidated.map((item) => {
        let x2 = null
        let y2 = null
        if (item.active_time_start && item.active_time_end) {
            const x = new Date(item.active_time_start * 1000).toLocaleDateString('en-US')
            x2 = moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD')
            const y = new Date(item.active_time_end * 1000).toLocaleDateString('en-US')
            y2 = moment.from(y, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD')
        }
        return {...item, active_time_start: x2, active_time_end: y2}
    })
}