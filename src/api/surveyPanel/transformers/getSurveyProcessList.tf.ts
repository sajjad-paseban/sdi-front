import {z} from "zod";
import {SurveyProcessItem} from "@/models/SurveyPanel.interface";
import GeoJSON from "ol/format/GeoJSON";
import {
    SurveyProcessItemValidator,
    SurveyProcessListValidator
} from "@/api/surveyPanel/validations/getSurveyProcessList.vd";


type getSurveyProcessList = z.infer<typeof SurveyProcessListValidator>;

export function getSurveyProcessListTransformer(inputValidated: getSurveyProcessList): SurveyProcessItem[] {
    const geoJsonFormat = new GeoJSON({})
    const result: SurveyProcessItem[] = []

    inputValidated.map((item) => {
        const geometry = geoJsonFormat.readFeature(JSON.parse(item.feature))
        result.push({...item, feature: geometry})
    })

    return result
}

