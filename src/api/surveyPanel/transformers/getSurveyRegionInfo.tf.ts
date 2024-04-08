import {z} from "zod";

import {MassageUsers} from "@/models/User.interface";
import {SurveyPanelUsersValidator} from "@/api/surveyPanel/validations/users.vd";
import {SurveyPanelUsers, SurveyRegionInfo} from "@/models/SurveyPanel.interface";
import {SurveyRegionInfoListValidator} from "@/api/surveyPanel/validations/getSurveyRegionInfo.vd";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";

type getSurveyRegionInfoList = z.infer<typeof SurveyRegionInfoListValidator>;

export function getSurveyRegionInfoTransformer(inputValidated: getSurveyRegionInfoList): SurveyRegionInfo[] {
    const geoJsonFormat = new GeoJSON({})

    const result: SurveyRegionInfo[] = []

    inputValidated.map((item) => {
        const TFeatures: Feature[] = []
        item.features.map((feature: string) => {
            let geometry: any = null
            geometry = geoJsonFormat.readFeature(JSON.parse(feature))
            TFeatures.push(geometry)
        })

        result.push({...item,features:TFeatures})
    })
    return result
}