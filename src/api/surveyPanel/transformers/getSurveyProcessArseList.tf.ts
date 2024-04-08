import {z} from "zod";
import {ArseItem, SurveyProcessItem} from "@/models/SurveyPanel.interface";
import GeoJSON from "ol/format/GeoJSON";
import {SurveyProcessListValidator} from "@/api/surveyPanel/validations/getSurveyProcessList.vd";
import {getSurveyProcessArseListValidator} from "@/api/surveyPanel/validations/getSurveyProcessArseList.vd";


type getSurveyProcessArseList = z.infer<typeof getSurveyProcessArseListValidator>;

export function getSurveyProcessArseListTransformer(inputValidated: getSurveyProcessArseList): ArseItem[] {
    const geoJsonFormat = new GeoJSON({})
    const result: ArseItem[] = []

    inputValidated.map((item) => {
        const geometry = geoJsonFormat.readFeature(JSON.parse(item.feature))
        result.push({...item,feature:geometry})
    })

    return result
}