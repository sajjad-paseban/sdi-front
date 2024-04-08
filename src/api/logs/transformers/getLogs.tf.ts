import {z} from "zod";

import {getLogsValidator} from "@/api/logs/validations/getLogs.vd";
import {LogsInterface} from "@/models/Logs.interface";
import moment from "jalali-moment";

type getLogsGdModel = z.infer<typeof getLogsValidator>;

export function getLogsTransformer(inputValidated: getLogsGdModel): LogsInterface[] {


    return inputValidated.map((item) => {
        let x2 = null

        const x = new Date(item.created_at * 1000).toLocaleDateString('en-US')
        x2 = moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD')

        return {...item, created_at: x2}
    })


}