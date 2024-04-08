import {z} from "zod";

import GeoJSON from "ol/format/GeoJSON";
import {CheckerProcessItem, ProcessListItem} from "@/models/SurveyPanel.interface";
import {ProcessItemValidator, ProcessListValidator} from "@/api/surveyPanel/validations/getProcessList.vd";



type getProcessList = z.infer<typeof ProcessListValidator>;

export function getProcessListTransformer(inputValidated: getProcessList): ProcessListItem[] {
    const geoJsonFormat = new GeoJSON({})
    const result: ProcessListItem[] = []

    inputValidated.map((item) => {
        const geometry = geoJsonFormat.readFeature(JSON.parse(item.feature))
        result.push({...item,feature:geometry})
    })

    return result
}


type getProcessItem = z.infer<typeof ProcessItemValidator>;

export function getProcessItemTransformer(inputValidated: getProcessItem): ProcessListItem {
    const geoJsonFormat = new GeoJSON({})
    const geometry = geoJsonFormat.readFeature(JSON.parse(inputValidated.feature))
    return {...inputValidated,feature:geometry}
}