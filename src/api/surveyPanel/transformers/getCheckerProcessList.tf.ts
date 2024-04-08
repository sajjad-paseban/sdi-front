import {z} from "zod";

import GeoJSON from "ol/format/GeoJSON";
import {CheckerProcessItem} from "@/models/SurveyPanel.interface";
import {CheckerProcessListValidator} from "@/api/surveyPanel/validations/getCheckerProcessList.vd";



type getCheckerProcessList = z.infer<typeof CheckerProcessListValidator>;

export function getCheckerProcessListTransformer(inputValidated: getCheckerProcessList): CheckerProcessItem[] {
    const geoJsonFormat = new GeoJSON({})
    const result: CheckerProcessItem[] = []

    inputValidated.map((item) => {
        const geometry = geoJsonFormat.readFeature(JSON.parse(item.feature))
        result.push({...item,feature:geometry})
    })

    return result
}