import {z} from "zod";
import {BlockItem} from "@/models/SurveyPanel.interface";
import GeoJSON from "ol/format/GeoJSON";
import {getSurveyProcessBlockListValidator} from "@/api/surveyPanel/validations/getSurveyProcessBlockList.vd";
import {getSurveyProcessArseListTransformer} from "@/api/surveyPanel/transformers/getSurveyProcessArseList.tf";


type getSurveyProcessBlockList = z.infer<typeof getSurveyProcessBlockListValidator>;

export function getSurveyProcessBlockListTransformer(inputValidated: getSurveyProcessBlockList): BlockItem[] {
    const geoJsonFormat = new GeoJSON({})
    const result: BlockItem[] = []

    inputValidated.map((item) => {
        result.push({...item, block_arse: getSurveyProcessArseListTransformer(item.block_arse)})
    })

    return result
}