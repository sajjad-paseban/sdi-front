import {z} from "zod";

import {layerInfoValidator} from "@/api/extraInLayer/validations/layerInfo.vd";
import {LayerInfo} from "@/models/Layer.Interface";
import moment from "jalali-moment";

type layerInfoGdModel = z.infer<typeof layerInfoValidator>;

export function layerInfoTransformer(inputValidated: layerInfoGdModel): LayerInfo {
    const x = new Date(inputValidated.created_at * 1000).toLocaleDateString('en-US')
    const x2 = moment.from(x, 'en', 'MM/DD/YYYY').locale('fa').format('YYYY/MM/DD')

    return {...inputValidated,created_at:x2}


}