import GeoJSON from "ol/format/GeoJSON";
import { getSurveyProcessArseListTransformer } from "@/api/surveyPanel/transformers/getSurveyProcessArseList.tf";
export function getSurveyProcessBlockListTransformer(inputValidated) {
    const geoJsonFormat = new GeoJSON({});
    const result = [];
    inputValidated.map((item) => {
        result.push({ ...item, block_arse: getSurveyProcessArseListTransformer(item.block_arse) });
    });
    return result;
}
//# sourceMappingURL=getSurveyProcessBlockList.tf.js.map