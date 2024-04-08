import {z} from "zod";

import {CheckerRegionInfo, SurveyRegionInfo} from "@/models/SurveyPanel.interface";
import {
    CheckerRegionInfoListValidator
} from "@/api/surveyPanel/validations/getCheckerRegionInfo.vd";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";

type getCheckerRegionInfoList = z.infer<typeof CheckerRegionInfoListValidator>;

export function getCheckerRegionInfoTransformer(inputValidated: getCheckerRegionInfoList): CheckerRegionInfo[] {
    const geoJsonFormat = new GeoJSON({})

    const result: SurveyRegionInfo[] = []

    inputValidated.map((item) => {
        const TFeatures: Feature[] = []
        item.features.map((feature: string) => {
            let geometry: any = null
            geometry = geoJsonFormat.readFeature(JSON.parse(feature))
            TFeatures.push(geometry)
        })

        result.push({...item, features: TFeatures})
    })
    return result
}