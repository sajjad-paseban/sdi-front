import GeoJSON from "ol/format/GeoJSON";
export function getSurveyProcessListTransformer(inputValidated) {
    const geoJsonFormat = new GeoJSON({});
    const result = [];
    inputValidated.map((item) => {
        const geometry = geoJsonFormat.readFeature(JSON.parse(item.feature));
        result.push({ ...item, feature: geometry });
    });
    return result;
}
//# sourceMappingURL=getSurveyProcessList.tf.js.map